# Hostinger deployment from GitHub

Hostinger deploys this site with its own **Git integration**, which clones a branch into the website's document root.

The source tree has no `index.html` — that only exists after a Vite build — so Hostinger must **not** be pointed at `main`. Pointing it at `main` fills the web root with source and the server answers 403.

Instead, `.github/workflows/deploy-hostinger.yml` builds on every push to `main` and force-pushes the contents of `dist/public/` to a branch called **`deploy`**, whose root is the website itself. Hostinger pulls `deploy`.

## Configure Hostinger

In hPanel → **Advanced → GIT**, create (or edit) the deployment for this website:

| Field | Value |
|---|---|
| Repository | `https://github.com/RedArrow-Main/MuonsWeb1.git` |
| Branch | `deploy` |
| Directory | leave as the website's own root |

The repository is public, so no deploy key is needed. Use **Deploy** for the first pull, and enable auto-deployment (or add the webhook Hostinger shows you to the repository) so later pushes land automatically.

Never point Hostinger at `main`. The `deploy` branch is generated — do not commit to it by hand; anything pushed there is overwritten by the next build.

## Contact form

The contact form is handled by `client/public/contact.php`, which sends through the Microsoft Graph API (the domain's MX and SPF both point at Microsoft 365, and basic auth for SMTP was disabled in April 2026, so mail cannot be sent from the web server directly). Credentials for the Entra app registration live in `muons-contact-config.php` **one level above `public_html`**, uploaded once by hand and never committed; deploys only write into `public_html/`, so they will not disturb it. Needs PHP with cURL. PHP does not run under the Vite dev server, so the form can only be tested on the deployed site. See `CONTACT_FORM.md` for the full Microsoft setup.

If Hostinger requires SFTP rather than FTPS for the account, the workflow’s deployment step must be changed to an SFTP action and the corresponding SSH secrets must be added. Do not change this until the connection type shown in Hostinger hPanel is confirmed.
