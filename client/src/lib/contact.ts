/**
 * Field Ledger reminder: contact delivery stays inside the Muons deploy.
 *
 * The site is static, but Hostinger runs PHP, so `client/public/contact.php`
 * ships alongside it in dist/public and does the sending. No third-party form
 * service, no access key, no monthly submission cap. See CONTACT_FORM.md.
 */

export const CONTACT_INBOX = "contact@muonstechnology.com";

const ENDPOINT = "/contact.php";

/** Honeypot field name. contact.php discards any submission that fills it. */
export const HONEYPOT_FIELD = "botcheck";

const interestLabels: Record<string, string> = {
  "edge-infrastructure": "Edge infrastructure",
  "offline-ai": "Offline-first AI",
  "trusted-records": "Blockchain and trusted records",
  partnership: "Partnership or investment",
};

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function sendContactMessage(
  form: HTMLFormElement
): Promise<ContactResult> {
  const entries = new FormData(form);
  const interest = String(entries.get("interest") ?? "");

  const payload = {
    name: String(entries.get("name") ?? "").trim(),
    email: String(entries.get("email") ?? "").trim(),
    organization: String(entries.get("organization") ?? "").trim(),
    interest: interestLabels[interest] ?? "",
    message: String(entries.get("message") ?? "").trim(),
    [HONEYPOT_FIELD]: entries.get(HONEYPOT_FIELD) ?? "",
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // contact.php always answers with JSON, including for its error statuses.
    // Anything else means PHP did not run (for example the local dev server,
    // which serves the file as plain text), so report it rather than guess.
    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!result) {
      return {
        ok: false,
        error: "The contact service is not responding correctly.",
      };
    }

    if (!response.ok || !result.success) {
      return {
        ok: false,
        error:
          result.message ||
          "We could not deliver that message. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "That message did not reach us. Check your connection and try again.",
    };
  }
}
