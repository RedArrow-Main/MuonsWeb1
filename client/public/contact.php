<?php
/**
 * Muons Technology contact endpoint.
 *
 * Deployed to Hostinger's public_html/ as part of dist/public/. The site is
 * otherwise static; this is the only server-side file. It accepts a JSON POST
 * from the homepage contact form and emails it to the address below.
 *
 * Responses are always JSON: {"success": bool, "message": string}
 */

declare(strict_types=1);

const RECIPIENT     = 'Andre.James@muonstechnology.com';
const SITE_DOMAIN   = 'muonstechnology.com';
const MAX_BODY_SIZE = 20000;          // bytes; a contact message is never this big
const RATE_WINDOW   = 60;             // seconds
const RATE_MAX      = 3;              // submissions per window, per IP

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(bool $ok, string $message, int $status = 200) {
    http_response_code($status);
    echo json_encode(['success' => $ok, 'message' => $message]);
    exit;
}

/**
 * Strip CR/LF so a submitted value can never inject extra mail headers.
 * This is the critical defence for anything interpolated into a header line.
 */
function headerSafe(string $value): string {
    return trim(str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], ' ', $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

// Same-origin only. Blocks other sites from POSTing through this endpoint.
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

// --- Simple per-IP rate limit -----------------------------------------------
$ip    = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$stamp = sys_get_temp_dir() . '/muons-contact-' . md5($ip);
$hits  = [];
if (is_readable($stamp)) {
    $hits = array_filter(
        (array) json_decode((string) file_get_contents($stamp), true),
        static fn($t) => is_numeric($t) && $t > time() - RATE_WINDOW
    );
}
if (count($hits) >= RATE_MAX) {
    respond(false, 'Too many messages just now. Please try again shortly.', 429);
}
$hits[] = time();
@file_put_contents($stamp, json_encode(array_values($hits)), LOCK_EX);

// --- Compose ----------------------------------------------------------------
$subject = 'Muons website enquiry — ' . ($topic !== '' ? $topic : 'General');

$body = "New enquiry from the Muons Technology website.\n\n"
      . "Name:         {$name}\n"
      . "Email:        {$email}\n"
      . "Organization: " . ($org !== '' ? $org : 'Not provided') . "\n"
      . "Interest:     " . ($topic !== '' ? $topic : 'Not selected') . "\n"
      . "Received:     " . gmdate('Y-m-d H:i:s') . " UTC\n"
      . "IP:           {$ip}\n\n"
      . "-------------------------------------------------------------\n\n"
      . $message . "\n";

// From must be on our own domain or the mail server will reject or spam-file it.
// The visitor's address goes in Reply-To so a reply reaches them directly.
$headers = implode("\r\n", [
    'From: Muons Website <noreply@' . SITE_DOMAIN . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
]);

$sent = @mail(RECIPIENT, $subject, $body, $headers, '-f noreply@' . SITE_DOMAIN);

if (!$sent) {
    // Log the whole submission, not just the failure. The domain's mail is on
    // Microsoft 365 and this server is not in its SPF record, so delivery can
    // fail for reasons outside this script. An enquiry recorded in the PHP
    // error log can still be recovered; one that is only counted cannot.
    error_log(
        'Muons contact form: mail() failed. '
        . 'from=' . $email . ' name=' . $name . ' org=' . $org
        . ' interest=' . $topic
        . ' message=' . str_replace(["\r", "\n"], ' ', $message)
    );
    respond(false, 'We could not deliver that message. Please email us directly.', 502);
}

respond(true, 'Message sent.');
