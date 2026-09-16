# Contact form delivery

The homepage contact form posts JSON to `contact.php`, which sends the message
with PHP's `mail()`. Hostinger runs PHP, so the site sends its own mail: no
third-party form service, no API key, no monthly submission cap, and no one else
holding your enquiries.

Submissions go to **Andre.James@muonstechnology.com** (set as `RECIPIENT` at the
top of `client/public/contact.php`).

## How it ships

`client/public/contact.php` is copied into `dist/public/` by the Vite build like
any other public file, and the GitHub Action uploads `dist/public/` to
Hostinger's `public_html/`. It ends up at `https://muonstechnology.com/contact.php`.
Nothing extra to configure — no environment variables, no secrets.

Requires PHP 7.4 or newer, which every current Hostinger plan provides. The PHP
version is set in hPanel under **Advanced → PHP Configuration**.

## Testing it

PHP does not run under the Vite dev server, so **the form cannot be tested
locally**. `pnpm run dev` will serve `contact.php` as plain text, the response
will not parse as JSON, and the form will report that the contact service is not
responding. That is expected and is not a bug.

Test it on the deployed site:

1. Submit the form once on `https://muonstechnology.com`.
2. Check Andre's inbox, including spam.
3. If nothing arrives, check hPanel → **Emails → Email Logs**, and the PHP error
   log under **Advanced → PHP Configuration → Error log**. `contact.php` writes a
   line there when `mail()` fails.

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
