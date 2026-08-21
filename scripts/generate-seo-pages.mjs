import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputRoot = path.join(root, "dist", "public");
const siteUrl = "https://muons-web1-63hi.vercel.app";

const pages = [
  {
    folder: "solutions/edge-agriculture-infrastructure",
    title: "Edge Agriculture Infrastructure for Ground-Level Food Security | Muons Technology",
    description: "How Muons Technology combines farmer-first physical infrastructure, ground agriculture data, offline-first AI, and trusted records at the edge.",
    type: "Service",
  },
  {
    folder: "solutions/offline-first-ai-for-farmers",
    title: "Offline-First AI for Farmers and Field Teams | Muons Technology",
    description: "Muons Technology brings agricultural intelligence to farmers and operators when broadband, apps, or smartphones cannot be assumed.",
    type: "Service",
  },
  {
    folder: "solutions/blockchain-agricultural-records",
    title: "Blockchain Agricultural Records for Traceable Field Operations | Muons Technology",
    description: "How Muons Technology uses blockchain-oriented record continuity to support trusted agricultural data, audit trails, and field-to-decision traceability.",
    type: "Service",
  },
  {
    folder: "insights/early-food-insecurity-signals",
    title: "How Ground Agriculture Data Can Surface Food-Insecurity Risk Earlier | Muons Technology",
    description: "A Muons Technology field note on connecting crop, soil, climate, and operational observations to earlier food-security awareness.",
    type: "Article",
  },
];

const template = await readFile(path.join(outputRoot, "index.html"), "utf8");

function replaceMeta(html, selector, replacement) {
  return html.replace(selector, replacement);
}

for (const page of pages) {
  const canonical = `${siteUrl}/${page.folder}`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": page.type,
    name: page.title,
    headline: page.title,
    description: page.description,
    url: canonical,
    provider: { "@type": "Organization", name: "Muons Technology", url: siteUrl },
    author: { "@type": "Organization", name: "Muons Technology", url: siteUrl },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  });

  let html = template;
  html = replaceMeta(html, /<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`);
  html = replaceMeta(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${page.description}" />`);
  html = replaceMeta(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`);
  html = replaceMeta(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${page.title}" />`);
  html = replaceMeta(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${page.description}" />`);
  html = replaceMeta(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`);
  html = replaceMeta(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${page.title}" />`);
  html = replaceMeta(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${page.description}" />`);
  html = replaceMeta(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${schema}</script>`);

  const outputPath = path.join(outputRoot, page.folder, "index.html");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log(`Pre-rendered ${pages.length} SEO routes.`);
