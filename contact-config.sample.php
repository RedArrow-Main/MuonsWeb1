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
 *
 * All four values come from the Entra (Azure) app registration. See
 * CONTACT_FORM.md for how to create it.
 */

return [
    // Entra admin centre → the app registration → Overview.
    'tenant_id' => 'REPLACE_WITH_DIRECTORY_TENANT_ID',
    'client_id' => 'REPLACE_WITH_APPLICATION_CLIENT_ID',

    // Certificates & secrets → New client secret. Copy the VALUE, not the ID;
    // it is shown only once. Secrets expire — note the date and renew before
    // it lapses, or the form stops sending.
    'client_secret' => 'REPLACE_WITH_CLIENT_SECRET_VALUE',

    // The mailbox the message is sent AS. Must be a real mailbox in the tenant.
    'sender' => 'Andre.James@muonstechnology.com',

    // Where enquiries are delivered. May be the same mailbox.
    'recipient' => 'Andre.James@muonstechnology.com',
];
