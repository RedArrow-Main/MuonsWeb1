<?php
/**
 * Muons contact form credentials — SAMPLE.
 *
 * Copy this to the server as `muons-contact-config.php` and place it ONE LEVEL
 * ABOVE public_html, alongside it rather than inside it:
 *
 *   domains/muonstechnology.com/
 *     ├── muons-contact-config.php   <-- here, NOT web-accessible
 *     └── public_html/
 *         └── contact.php
 *
 * Never commit the real file. It is listed in .gitignore, and it must stay
 * outside public_html so it can never be fetched over HTTP.
 *
 * Upload it once by FTP or hPanel File Manager. The deploy workflow only
 * writes into public_html/, so it will not be touched by future deploys.
 */

return [
    // Microsoft 365. Leave as-is unless the tenant uses a different endpoint.
    'smtp_host' => 'smtp.office365.com',
    'smtp_port' => 587,

    // The mailbox that authenticates AND appears as the sender. Microsoft 365
    // rejects a From address that is not this mailbox (or one it has Send As
    // rights for), so these are deliberately the same account.
    'smtp_user' => 'Andre.James@muonstechnology.com',

    // NOT the normal account password if MFA is enabled — generate an app
    // password in the Microsoft account security settings and use that.
    'smtp_pass' => 'REPLACE_WITH_APP_PASSWORD',

    // Where enquiries are delivered.
    'recipient' => 'Andre.James@muonstechnology.com',
];
