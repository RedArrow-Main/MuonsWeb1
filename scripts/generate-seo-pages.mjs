/**
 * Pre-render the curated SEO routes.
 *
 * The site is a client-rendered SPA, so a crawler that does not execute
 * JavaScript sees only the shell. This writes a real HTML file per route with
 * that route's metadata, structured data, and a readable summary of its own
 * content in <noscript> — rather than the homepage's, which every route
 * previously carried.
 *
 * Content comes from client/src/data/seoPages.ts, so the pages and the
 * pre-render cannot drift apart.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputRoot = path.join(root, "dist", "public");
const siteUrl = "https://muonstechnology.com";

/**
 * Load the page data from the TypeScript source, so the pages and the
 * pre-render cannot drift apart. esbuild is already a dependency and strips the
 * types reliably, which regex-parsing the file would not.
 */
async function loadPages() {
  const entry = path.join(root, "client", "src", "data", "seoPages.ts");
  const result = await build({
    entryPoints: [entry],
    bundle: false,
    write: false,
    format: "esm",
    platform: "node",
    loader: { ".ts": "ts" },
  });
  const code = result.outputFiles[0].text;
  const module = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
  return module.seoPages;
}

const escape = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const template = await readFile(path.join(outputRoot, "index.html"), "utf8");
const pages = await loadPages();

for (const page of pages) {
  const folder = `${page.kind === "solution" ? "solutions" : "insights"}/${page.slug}`;
  const canonical = `${siteUrl}/${folder}/`;

  const schema = {
    "@context": "https://schema.org",
    "@type": page.kind === "solution" ? "Service" : "Article",
    name: page.title,
    headline: page.title,
    description: page.description,
    url: canonical,
    provider: { "@type": "Organization", name: "Muons Technology", url: siteUrl },
    author: { "@type": "Organization", name: "Muons Technology", url: siteUrl },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const faqSchema = page.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
      }
    : null;

  // What a crawler without JavaScript reads. Previously every route served the
  // homepage's summary, so all five looked like duplicates.
  const noscript = [
    `<main>`,
    `<h1>${escape(page.title)}</h1>`,
    `<p>${escape(page.intro)}</p>`,
    ...page.sections.map((s) => `<h2>${escape(s.heading)}</h2><p>${escape(s.body)}</p>`),
    ...(page.detail ?? []).map(
      (d) => `<h2>${escape(d.heading)}</h2>${d.paragraphs.map((p) => `<p>${escape(p)}</p>`).join("")}`
    ),
    ...(page.faq?.length
      ? [`<h2>Common questions</h2><dl>`,
         ...page.faq.map((f) => `<dt>${escape(f.question)}</dt><dd>${escape(f.answer)}</dd>`),
         `</dl>`]
      : []),
    `<nav aria-label="Related Muons Technology pages"><a href="/">Muons Technology home</a>`,
    ...(page.related ?? []).map((slug) => {
      const target = pages.find((p) => p.slug === slug);
      if (!target) return "";
      const href = `/${target.kind === "solution" ? "solutions" : "insights"}/${target.slug}/`;
      return `<a href="${href}">${escape(target.title)}</a>`;
    }),
    `</nav></main>`,
  ].join("");

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.metaTitle)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escape(page.description)}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escape(page.metaTitle)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escape(page.description)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${page.kind === "solution" ? "website" : "article"}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escape(page.metaTitle)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escape(page.description)}" />`);

  // The id matches the node SeoTopic removes before appending its own, so the
  // rendered page carries one block rather than two.
  const schemaTags =
    `<script type="application/ld+json" id="seo-topic-schema">${JSON.stringify(schema)}</script>` +
    (faqSchema ? `<script type="application/ld+json" id="seo-topic-faq">${JSON.stringify(faqSchema)}</script>` : "");
  // Keep the site-wide Organization block and add this page's markup after
  // it, rather than replacing it: the organisation is still the publisher.
  html = html.replace(
    /(<script type="application\/ld\+json">[\s\S]*?<\/script>)/,
    `$1${schemaTags}`
  );

  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${noscript}</noscript>`);

  const outputPath = path.join(outputRoot, folder, "index.html");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log(`Pre-rendered ${pages.length} SEO routes.`);
