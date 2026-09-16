# Contact form delivery

The homepage contact form posts JSON to `contact.php`, which relays the message
over authenticated SMTP through **Microsoft 365** using PHPMailer.

This matters: `muonstechnology.com` keeps its MX on Microsoft 365 and publishes
`v=spf1 include:spf.protection.outlook.com -all`. That is a hard fail, and the
Hostinger server is not in it, so mail sent directly from the web server would be
rejected or junked. Sending through the tenant means SPF and DKIM align and the
message reaches the inbox.

Submissions go to **Andre.James@muonstechnology.com**.

## One-time setup

### 1. Allow SMTP AUTH on the mailbox

Microsoft disables authenticated SMTP by default. In the **Microsoft 365 admin
centre** → Users → Active users → Andre James → Mail → **Manage email apps**,
tick **Authenticated SMTP** and save. It can take a few minutes to apply.

If the tenant has Security Defaults enabled, SMTP AUTH stays blocked until
Security Defaults are turned off or a Conditional Access exclusion is made.

### 2. Create an app password

With MFA on the account, the normal password will not work for SMTP. Generate an
app password from the account's security settings and use that instead.

### 3. Upload the credentials file

Copy `contact-config.sample.php` to the server as `muons-contact-config.php`,
fill in the app password, and place it **one level above `public_html`**:

    domains/muonstechnology.com/
      muons-contact-config.php   <-- here, not web-readable
      public_html/
        contact.php

Upload it once by FTP or the hPanel File Manager. The deploy workflow only
writes into `public_html/`, so deploys will not overwrite or remove it.

**Never commit the real file.** It is in `.gitignore`, and keeping it outside the
web root means it cannot be fetched over HTTP even if the PHP handler breaks.

Requires PHP 7.4 or newer (PHP 8 is what the site runs). PHPMailer 6.9.3 is
vendored at `client/public/lib/phpmailer/`, so Composer is not needed.

## Testing it

PHP does not run under the Vite dev server, so **the form cannot be tested
locally**. `pnpm run dev` serves `contact.php` as plain text and the form will
report that the contact service is not responding. That is expected.

Test on the deployed site: submit once, then check the inbox and Junk. If nothing
arrives, the PHP error log records the SMTP error and the full submission, so the
enquiry can be recovered and the cause diagnosed. Find it in hPanel under
**Advanced → PHP Configuration → Error log**.

Common SMTP errors:

| Message | Cause |
|---|---|
| `535 5.7.139 Authentication unsuccessful` | SMTP AUTH not enabled for the mailbox, or Security Defaults blocking it |
| `535` with a correct password | MFA is on and a normal password was used instead of an app password |
| `550 5.7.60 SendAsDenied` | `From` is not the authenticated mailbox |
| Connection timeout | Outbound port 587 blocked; try `'smtp_secure' => 'ssl'` with port 465 |

## Behaviour

- Native HTML validation runs first, then the endpoint re-validates server-side.
- While in flight the submit button is disabled and reads "Sending…".
- On success the form is replaced by a confirmation panel.
- On failure an inline `role="alert"` message appears with the direct mailto
  address as a fallback, and the typed content is preserved so the visitor can
  retry without retyping.
- Mail is sent `From: noreply@muonstechnology.com` with the visitor's address in
  `Reply-To`, so replying in your mail client reaches them directly. Sending
  `From:` the visitor's own address would fail SPF and land in spam.

## Abuse protection

- A hidden `botcheck` honeypot field. Filled means bot: the endpoint returns
  success and silently discards the message.
- Per-IP rate limit of 3 submissions per 60 seconds.
- Requests from other origins are rejected.
- CR/LF is stripped from every value used in a mail header, which is what stops
  header-injection through the name or email field.
- Request bodies over 20 KB and messages over 5000 characters are rejected.

## If mail lands in spam

`mail()` sends through Hostinger's local mail server. Delivery to a mailbox on
the same domain is usually reliable, but if messages land in spam or do not
arrive:

1. Confirm the domain's SPF record includes Hostinger, in hPanel under
   **Emails → DNS Records**.
2. If it still misbehaves, switch `contact.php` to authenticated SMTP with
   PHPMailer using the mailbox credentials from hPanel. That is more reliable
   but introduces a password that must live in a file outside the repository —
   never commit it.

## Not covered

The newsletter subscribe form in the footer is still local-only: it validates,
resets, and shows a toast without sending anywhere.
