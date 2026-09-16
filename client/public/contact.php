<?php
/**
 * Muons Technology contact endpoint.
 *
 * Deployed to Hostinger's public_html/ as part of dist/public/. The site is
 * otherwise static; this is the only server-side file. It accepts a JSON POST
 * from the homepage contact form and relays it over authenticated SMTP.
 *
 * Mail goes through Microsoft 365, which holds the MX for muonstechnology.com.
 * Sending from inside the tenant means SPF and DKIM align, so messages reach
 * the inbox. Sending directly from this server would fail the domain's
 * `-all` SPF record.
 *
 * Credentials live in muons-contact-config.php ONE LEVEL ABOVE the web root,
 * so they are never web-readable and never in the repository. See
 * CONTACT_FORM.md and contact-config.sample.php.
 *
 * Responses are always JSON: {"success": bool, "message": string}
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as MailerException;

const MAX_BODY_SIZE = 20000;   // bytes; a contact message is never this big
const RATE_WINDOW   = 60;      // seconds
const RATE_MAX      = 3;       // submissions per window, per IP
const SITE_DOMAIN   = 'muonstechnology.com';

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

// --- Configuration ----------------------------------------------------------
$configPath = __DIR__ . '/../muons-contact-config.php';
$config = is_readable($configPath) ? require $configPath : [];

$smtpHost = $config['smtp_host'] ?? getenv('MUONS_SMTP_HOST') ?: 'smtp.office365.com';
$smtpPort = (int) ($config['smtp_port'] ?? getenv('MUONS_SMTP_PORT') ?: 587);
$smtpUser = $config['smtp_user'] ?? getenv('MUONS_SMTP_USER') ?: '';
$smtpPass = $config['smtp_pass'] ?? getenv('MUONS_SMTP_PASS') ?: '';
$recipient = $config['recipient'] ?? getenv('MUONS_RECIPIENT') ?: 'Andre.James@' . SITE_DOMAIN;
// 'tls' (STARTTLS, port 587), 'ssl' (SMTPS, port 465), or 'none' for a
// local relay. Microsoft 365 wants STARTTLS.
$smtpSecure = strtolower((string) ($config['smtp_secure'] ?? getenv('MUONS_SMTP_SECURE') ?: 'tls'));

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
if ($smtpUser === '' || $smtpPass === '') {
    logFailure('SMTP not configured', $fields);
    respond(false, 'The contact service is not configured. Please email us directly.', 503);
}

require __DIR__ . '/lib/phpmailer/Exception.php';
require __DIR__ . '/lib/phpmailer/PHPMailer.php';
require __DIR__ . '/lib/phpmailer/SMTP.php';

$body = "New enquiry from the Muons Technology website.\n\n"
      . "Name:         {$name}\n"
      . "Email:        {$email}\n"
      . "Organization: " . ($org !== '' ? $org : 'Not provided') . "\n"
      . "Interest:     " . ($topic !== '' ? $topic : 'Not selected') . "\n"
      . "Received:     " . gmdate('Y-m-d H:i:s') . " UTC\n"
      . "IP:           {$ip}\n\n"
      . "-------------------------------------------------------------\n\n"
      . $message . "\n";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->Port       = $smtpPort;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->Timeout    = 20;

    if ($smtpSecure === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($smtpSecure === 'none') {
        $mail->SMTPSecure  = '';
        $mail->SMTPAutoTLS = false;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    $mail->CharSet    = PHPMailer::CHARSET_UTF8;

    // Microsoft 365 requires the From address to be the authenticated mailbox
    // (or one it holds Send As rights for), so the sender is the account
    // itself. The visitor goes in Reply-To, so replying reaches them.
    $mail->setFrom($smtpUser, 'Muons Website');
    $mail->addAddress($recipient);
    $mail->addReplyTo($email, $name);

    $mail->Subject = 'Muons website enquiry — ' . ($topic !== '' ? $topic : 'General');
    $mail->Body    = $body;
    $mail->isHTML(false);

    $mail->send();
} catch (MailerException $e) {
    logFailure('SMTP: ' . $mail->ErrorInfo, $fields);
    respond(false, 'We could not deliver that message. Please email us directly.', 502);
} catch (Throwable $e) {
    logFailure('unexpected: ' . $e->getMessage(), $fields);
    respond(false, 'We could not deliver that message. Please email us directly.', 502);
}

respond(true, 'Message sent.');
