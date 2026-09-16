# Hostinger deployment from GitHub

The repository includes `.github/workflows/deploy-hostinger.yml`. Every push to `main`, or a manual workflow run from the **Actions** tab, will install dependencies, build the Vite/React site, and upload `dist/public/` to Hostinger’s `public_html/` directory over FTPS.

## Add the required GitHub secrets

In GitHub, open **RedArrow-Main/MuonsWeb1 → Settings → Secrets and variables → Actions → New repository secret**. Add these three repository secrets:

| Secret | Value |
|---|---|
| `HOSTINGER_FTP_SERVER` | Hostinger’s FTP hostname from hPanel, such as the server value shown under FTP Accounts |
| `HOSTINGER_FTP_USERNAME` | The Hostinger FTP username for the website |
| `HOSTINGER_FTP_PASSWORD` | The Hostinger FTP password |

Use the exact values shown in Hostinger hPanel. Do not put credentials in source files, commits, issues, or workflow logs.

## First deployment

1. In Hostinger hPanel, make sure the domain is connected to the website and that the target directory is `public_html`.
2. Create or confirm the FTP account and note its hostname, username, and password.
3. Add the three GitHub Actions secrets listed above.
4. Open the repository’s **Actions** tab and select **Deploy Muons Technology to Hostinger**.
5. Choose **Run workflow** on `main`.
6. After the job succeeds, open the domain over `https://` and verify the homepage, contact section, footer, and direct `/solutions/...` and `/insights/...` URLs.

The workflow uses FTPS on port 21 and does not run a Node.js server on Hostinger. The website is served as static files. `client/public/.htaccess` is copied into `dist/public/` at build time and provides the React fallback for direct application routes, the security headers, and cache control.

## Contact form

The contact form is handled by `client/public/contact.php`, which sends through the Microsoft Graph API (the domain's MX and SPF both point at Microsoft 365, and basic auth for SMTP was disabled in April 2026, so mail cannot be sent from the web server directly). Credentials for the Entra app registration live in `muons-contact-config.php` **one level above `public_html`**, uploaded once by hand and never committed; deploys only write into `public_html/`, so they will not disturb it. Needs PHP with cURL. PHP does not run under the Vite dev server, so the form can only be tested on the deployed site. See `CONTACT_FORM.md` for the full Microsoft setup.

If Hostinger requires SFTP rather than FTPS for the account, the workflow’s deployment step must be changed to an SFTP action and the corresponding SSH secrets must be added. Do not change this until the connection type shown in Hostinger hPanel is confirmed.
