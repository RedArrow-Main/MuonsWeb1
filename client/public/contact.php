<?php
/**
 * Muons Technology contact endpoint.
 *
 * Deployed to Hostinger's public_html/ as part of dist/public/. The site is
 * otherwise static; this is the only server-side file. It accepts a JSON POST
 * from the homepage contact form and sends it through the Microsoft Graph API.
 *
 * Why Graph rather than SMTP: muonstechnology.com keeps its MX on Microsoft 365
 * and publishes `v=spf1 include:spf.protection.outlook.com -all`, so mail sent
 * straight from this server would fail SPF. Microsoft also finished disabling
 * basic authentication for SMTP AUTH on 30 April 2026, so app passwords no
 * longer work. Graph uses OAuth 2.0 client credentials and sends from inside
 * the tenant, so SPF and DKIM align.
 *
 * Credentials live in muons-contact-config.php ONE LEVEL ABOVE the web root,
 * so they are never web-readable and never in the repository. See
 * CONTACT_FORM.md and contact-config.sample.php.
 *
 * Responses are always JSON: {"success": bool, "message": string}
 */

declare(strict_types=1);

const MAX_BODY_SIZE = 20000;   // bytes; a contact message is never this big
const RATE_WINDOW   = 60;      // seconds
const RATE_MAX      = 3;       // submissions per window, per IP
const SITE_DOMAIN   = 'muonstechnology.com';
const HTTP_TIMEOUT  = 15;      // seconds, per Microsoft call

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(bool $ok, string $message, int $status = 200) {
    http_response_code($status);
    echo json_encode(['success' => $ok, 'message' => $message]);
    exit;
}

/** Strip CR/LF so a submitted value can never inject extra mail headers. */
function headerSafe(string $value): string {
    return trim(str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], ' ', $value));
}

/**
 * Record a submission that could not be sent, so it can still be recovered.
 * A failed enquiry in the log beats an enquiry that only got counted.
 */
function logFailure(string $why, array $f) {
    error_log(sprintf(
        'Muons contact form FAILED (%s) from=%s name=%s org=%s interest=%s message=%s',
        $why, $f['email'] ?? '', $f['name'] ?? '', $f['org'] ?? '', $f['topic'] ?? '',
        str_replace(["\r", "\n"], ' ', $f['message'] ?? '')
    ));
}

/** POST and decode JSON. Returns [status, decodedBody, transportError]. */
function httpPost(string $url, $body, array $headers): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => is_string($body) ? $body : http_build_query($body),
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => HTTP_TIMEOUT,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);
    $raw    = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err    = curl_error($ch);
    curl_close($ch);

    return [$status, json_decode((string) $raw, true), $err];
}

/**
 * Client-credentials token for Graph, cached on disk until shortly before it
 * expires so a burst of submissions does not mint a token each time.
 */
function graphToken(array $cfg, array $fields): string {
    $cacheFile = sys_get_temp_dir() . '/muons-graph-token-' . md5($cfg['client_id']);

    if (is_readable($cacheFile)) {
        $cached = json_decode((string) file_get_contents($cacheFile), true);
        if (is_array($cached) && ($cached['expires'] ?? 0) > time() + 60 && !empty($cached['token'])) {
            return (string) $cached['token'];
        }
    }

    [$status, $body, $err] = httpPost(
        'https://login.microsoftonline.com/' . rawurlencode($cfg['tenant_id']) . '/oauth2/v2.0/token',
        [
            'client_id'     => $cfg['client_id'],
            'client_secret' => $cfg['client_secret'],
            'scope'         => 'https://graph.microsoft.com/.default',
            'grant_type'    => 'client_credentials',
        ],
        ['Content-Type: application/x-www-form-urlencoded']
    );

    if ($err !== '') {
        logFailure('token transport: ' . $err, $fields);
        respond(false, 'We could not deliver that message. Please email us directly.', 502);
    }
    if ($status !== 200 || empty($body['access_token'])) {
        // AADSTS7000222 = expired client secret, the most likely failure here.
        logFailure('token HTTP ' . $status . ': ' . ($body['error_description'] ?? 'no token'), $fields);
        respond(false, 'We could not deliver that message. Please email us directly.', 502);
    }

    @file_put_contents($cacheFile, json_encode([
        'token'   => $body['access_token'],
        'expires' => time() + (int) ($body['expires_in'] ?? 3600),
    ]), LOCK_EX);
    @chmod($cacheFile, 0600);

    return (string) $body['access_token'];
}

// --- Configuration ----------------------------------------------------------
$configPath = __DIR__ . '/../muons-contact-config.php';
$config = is_readable($configPath) ? require $configPath : [];

$cfg = [
    // Microsoft accepts the primary domain in place of the tenant GUID.
    'tenant_id'     => $config['tenant_id']     ?? getenv('MUONS_TENANT_ID')     ?: SITE_DOMAIN,
    'client_id'     => $config['client_id']     ?? getenv('MUONS_CLIENT_ID')     ?: '',
    'client_secret' => $config['client_secret'] ?? getenv('MUONS_CLIENT_SECRET') ?: '',
    'sender'        => $config['sender']        ?? getenv('MUONS_SENDER')        ?: 'contact@' . SITE_DOMAIN,
    'recipient'     => $config['recipient']     ?? getenv('MUONS_RECIPIENT')     ?: 'contact@' . SITE_DOMAIN,
];

// --- Request gate -----------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $host = parse_url($origin, PHP_URL_HOST) ?? '';
    if ($host !== SITE_DOMAIN && $host !== 'www.' . SITE_DOMAIN) {
        respond(false, 'Request blocked.', 403);
    }
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > MAX_BODY_SIZE) {
    respond(false, 'That message could not be read.', 400);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(false, 'That message could not be read.', 400);
}

// Honeypot: real people leave this empty.
if (!empty($data['botcheck'])) {
    respond(true, 'Thank you.');   // Look successful; deliver nothing.
}

$name    = headerSafe((string) ($data['name'] ?? ''));
$email   = headerSafe((string) ($data['email'] ?? ''));
$org     = headerSafe((string) ($data['organization'] ?? ''));
$topic   = headerSafe((string) ($data['interest'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    respond(false, 'Please complete the required fields.', 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'That email address does not look right.', 422);
}
if (mb_strlen($message) > 5000) {
    respond(false, 'That message is too long. Please shorten it.', 422);
}

$fields = ['email' => $email, 'name' => $name, 'org' => $org, 'topic' => $topic, 'message' => $message];

// --- Per-IP rate limit ------------------------------------------------------
$ip    = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$stamp = sys_get_temp_dir() . '/muons-contact-' . md5($ip);
$hits  = [];
if (is_readable($stamp)) {
    $hits = array_filter(
        (array) json_decode((string) file_get_contents($stamp), true),
        static function ($t) { return is_numeric($t) && $t > time() - RATE_WINDOW; }
    );
}
if (count($hits) >= RATE_MAX) {
    respond(false, 'Too many messages just now. Please try again shortly.', 429);
}
$hits[] = time();
@file_put_contents($stamp, json_encode(array_values($hits)), LOCK_EX);

// --- Send -------------------------------------------------------------------
if ($cfg['tenant_id'] === '' || $cfg['client_id'] === '' || $cfg['client_secret'] === '') {
    logFailure('Graph not configured', $fields);
    respond(false, 'The contact service is not configured. Please email us directly.', 503);
}

if (!function_exists('curl_init')) {
    logFailure('php curl extension missing', $fields);
    respond(false, 'The contact service is unavailable. Please email us directly.', 503);
}

$token = graphToken($cfg, $fields);

// Every submitted value is escaped before it reaches the markup: the body is
// HTML, so an unescaped angle bracket would let a visitor inject tags into a
// message a colleague opens.
$e = function (string $v): string {
    return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$rows = [
    ['Name',         $e($name)],
    ['Email',        '<a href="mailto:' . $e($email) . '" style="color:#1b6b4f;text-decoration:none;">' . $e($email) . '</a>'],
    ['Organization', $org !== '' ? $e($org) : '<span style="color:#8a9a93;">Not provided</span>'],
    ['Interest',     $topic !== '' ? $e($topic) : '<span style="color:#8a9a93;">Not selected</span>'],
];

$rowsHtml = '';
foreach ($rows as [$label, $value]) {
    $rowsHtml .= '<tr>'
        . '<td style="padding:10px 0;width:130px;vertical-align:top;font:600 12px/1.4 -apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6a887c;">'
        . $label . '</td>'
        . '<td style="padding:10px 0;vertical-align:top;font:400 15px/1.5 -apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;color:#113128;">'
        . $value . '</td>'
        . '</tr>';
}

// Tables and inline styles throughout: Outlook ignores stylesheets and modern
// layout, so this is the shape that survives every mail client.
$body = '<!doctype html><html><body style="margin:0;padding:0;background:#eceae2;">'
  . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eceae2;padding:24px 12px;">'
  . '<tr><td align="center">'
  . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#f7f6ef;border:1px solid rgba(18,51,41,.15);border-radius:14px;overflow:hidden;">'

  // Header
  . '<tr><td style="background:#113128;padding:22px 28px;">'
  // The official wordmark. It is light artwork on transparency, so it sits on
  // the dark header. Many clients block remote images by default, hence the
  // alt text and an explicit light colour so that fallback stays readable.
  . '<img src="https://muonstechnology.com/media/muons-technology-logo-dark.png"'
  . ' alt="Muons Technology" width="170" height="45"'
  . ' style="display:block;border:0;outline:none;text-decoration:none;width:170px;height:45px;color:#ffffff;font:700 18px/45px Georgia,serif;">'
  . '<div style="margin-top:10px;font:800 11px/1.4 -apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.62);">New website enquiry</div>'
  . '</td></tr>'
  . '<tr><td style="height:3px;background:#c8ff2b;line-height:3px;font-size:0;">&nbsp;</td></tr>'

  // Fields
  . '<tr><td style="padding:22px 28px 6px;">'
  . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $rowsHtml . '</table>'
  . '</td></tr>'

  // Message
  . '<tr><td style="padding:14px 28px 4px;">'
  . '<div style="font:800 11px/1.4 -apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#6a887c;margin-bottom:10px;">Message</div>'
  . '<div style="border-left:3px solid #c8ff2b;background:#ffffff;padding:16px 18px;font:400 15px/1.65 -apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;color:#2c4a40;white-space:pre-wrap;word-break:break-word;">'
  . nl2br($e($message))
  . '</div></td></tr>'

  // Reply hint
  . '<tr><td style="padding:18px 28px 4px;">'
  . '<div style="font:400 13px/1.5 -apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;color:#4e6c62;">'
  . 'Replying to this email goes straight to <strong style="color:#113128;">' . $e($name) . '</strong>.'
  . '</div></td></tr>'

  // Footer
  . '<tr><td style="padding:20px 28px 24px;">'
  . '<div style="border-top:1px solid rgba(18,51,41,.13);padding-top:14px;font:400 11px/1.6 -apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;color:#8a9a93;">'
  . 'Sent from the contact form at muonstechnology.com<br>'
  . 'Received ' . gmdate('j M Y, H:i') . ' UTC &nbsp;&middot;&nbsp; IP ' . $e($ip)
  . '</div></td></tr>'

  . '</table></td></tr></table></body></html>';

// The message is sent as the configured mailbox. The visitor goes in replyTo,
// so replying in Outlook reaches them directly.
$payload = [
    'message' => [
        'subject'      => 'Muons website enquiry — ' . ($topic !== '' ? $topic : 'General'),
        'body'         => ['contentType' => 'HTML', 'content' => $body],
        'toRecipients' => [['emailAddress' => ['address' => $cfg['recipient']]]],
        'replyTo'      => [['emailAddress' => ['address' => $email, 'name' => $name]]],
    ],
    'saveToSentItems' => false,
];

[$status, $response, $err] = httpPost(
    'https://graph.microsoft.com/v1.0/users/' . rawurlencode($cfg['sender']) . '/sendMail',
    json_encode($payload, JSON_UNESCAPED_UNICODE),
    ['Authorization: Bearer ' . $token, 'Content-Type: application/json']
);

if ($err !== '') {
    logFailure('sendMail transport: ' . $err, $fields);
    respond(false, 'We could not deliver that message. Please email us directly.', 502);
}

// Graph answers 202 Accepted on success and returns no body.
if ($status !== 202) {
    $detail = $response['error']['message'] ?? ('HTTP ' . $status);
    logFailure('sendMail ' . $status . ': ' . $detail, $fields);
    respond(false, 'We could not deliver that message. Please email us directly.', 502);
}

respond(true, 'Message sent.');
