# Contact form delivery

The homepage contact form posts JSON to `contact.php`, which sends the message
through the **Microsoft Graph API** using OAuth 2.0 client credentials.

Why Graph and not SMTP: `muonstechnology.com` keeps its MX on Microsoft 365 and
publishes `v=spf1 include:spf.protection.outlook.com -all`. That is a hard fail,
and the Hostinger server is not in it, so mail sent directly from the web server
would be rejected or junked. Microsoft also finished disabling basic
authentication for SMTP AUTH on **30 April 2026**, so app passwords no longer
work for SMTP either. Graph sends from inside the tenant, so SPF and DKIM align
and the message reaches the inbox.

Submissions go to **contact@muonstechnology.com**.

## One-time setup

### 1. Register an application

In the **Microsoft Entra admin centre** → Identity → Applications → App
registrations → **New registration**:

- Name: `Muons Website Contact Form`
- Supported account types: **Accounts in this organizational directory only**
- Redirect URI: leave blank (this is a daemon app, no sign-in)

From the app's **Overview** page copy the **Application (client) ID**.

You do not need the Directory (tenant) ID: Microsoft accepts the primary domain
in its place, so `tenant_id` is `muonstechnology.com`. The GUID works equally
well if you prefer it.

### 2. Grant Mail.Send

In the app → **API permissions** → Add a permission → Microsoft Graph →
**Application permissions** → search `Mail.Send` → add it.

Then click **Grant admin consent for Muons Technology**. The permission does
nothing until the Status column reads **Granted**.

This step needs Global Administrator, Privileged Role Administrator, or Cloud
Application Administrator. A normal user account can create the registration and
add the permission, but cannot consent to it — the button will be unavailable.
If your account shows "No roles assigned", someone else has to do this step.

### 3. Restrict it to one mailbox (strongly recommended)

`Mail.Send` as an application permission allows sending as **any** mailbox in
the tenant. Scope it down to the one mailbox with an application access policy,
in Exchange Online PowerShell:

```powershell
New-ApplicationAccessPolicy `
  -AppId <application-client-id> `
  -PolicyScopeGroupId contact@muonstechnology.com `
  -AccessRight RestrictAccess `
  -Description "Restrict the website contact form to one mailbox"
```

Without this, a leaked client secret would let someone send mail as anyone in
the organisation.

### 4. Create a client secret

App → **Certificates & secrets** → **New client secret**. Choose the shortest
expiry that is practical. Copy the **Value** immediately — it is shown only
once, and the Secret ID is not the secret.

**Secrets expire.** When it lapses the form stops sending and the PHP error log
records `AADSTS7000222`. Put the expiry date in a calendar now.

### 5. Upload the credentials file

Copy `contact-config.sample.php` to the server as `muons-contact-config.php`,
fill in the four values, and place it **one level above `public_html`**:

    domains/muonstechnology.com/
      muons-contact-config.php   <-- here, not web-readable
      public_html/
        contact.php

Upload it once by FTP or the hPanel File Manager. The deploy workflow only
writes into `public_html/`, so deploys will not overwrite or remove it.

**Never commit the real file.** It is in `.gitignore`, and keeping it outside
the web root means it cannot be fetched over HTTP even if the PHP handler
breaks.

Requires PHP 7.4+ (the site runs PHP 8) with the cURL extension, which
Hostinger enables by default. No Composer and no vendored library.

## Testing it

PHP does not run under the Vite dev server, so **the form cannot be tested
locally**. `pnpm run dev` serves `contact.php` as plain text and the form will
report that the contact service is not responding. That is expected.

Test on the deployed site: submit once, then check the inbox and Junk. If
nothing arrives, the PHP error log records the Graph error and the full
submission, so the enquiry can be recovered and the cause diagnosed. Find it in
hPanel under **Advanced → PHP Configuration → Error log**.

Common errors:

| Logged error | Cause |
|---|---|
| `AADSTS7000215` | Wrong client secret — the Secret ID was copied instead of the Value |
| `AADSTS7000222` | The client secret has expired; create a new one |
| `AADSTS700016` | Wrong client ID, or the app is in a different tenant |
| `sendMail 403` with `ErrorAccessDenied` | Admin consent for `Mail.Send` was never granted |
| `sendMail 403` after adding the access policy | The policy excludes the sender mailbox; check the AppId and mailbox in step 3 |
| `sendMail 404` | The `sender` address is not a real mailbox in the tenant |

## Behaviour

- Native HTML validation runs first, then the endpoint re-validates server-side.
- While in flight the submit button is disabled and reads "Sending…".
- On success the form is replaced by a confirmation panel.
- On failure an inline `role="alert"` message appears with the direct mailto
  address as a fallback, and the typed content is preserved so the visitor can
  retry without retyping.
- Mail is sent as the configured mailbox with the visitor's address in
  `replyTo`, so replying in Outlook reaches them directly. Sending as the
  visitor's own address is not possible through Graph and would fail SPF anyway.
- `saveToSentItems` is false, so website enquiries do not clutter Sent Items.
- The OAuth token is cached on disk until shortly before it expires, so a burst
  of submissions does not request a new token each time.

## Abuse protection

- A hidden `botcheck` honeypot field. Filled means bot: the endpoint returns
  success and silently discards the message.
- Per-IP rate limit of 3 submissions per 60 seconds.
- Requests from other origins are rejected.
- CR/LF is stripped from every value used in a mail header, which is what stops
  header-injection through the name or email field.
- Request bodies over 20 KB and messages over 5000 characters are rejected.

## Renewing the client secret

This is the one piece of scheduled maintenance. When the secret expires the form
stops sending, visitors see the failure message with the mailto fallback, and
the PHP error log fills with `AADSTS7000222`. Submissions are still written to
that log, so nothing is lost, but nobody is notified.

To renew: create a new client secret in the app registration, update
`client_secret` in `muons-contact-config.php` on the server, and delete the old
secret. No redeploy is needed — the config file is read on every request.

## Not covered

The newsletter subscribe form in the footer is still local-only: it validates,
resets, and shows a toast without sending anywhere.
