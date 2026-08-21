/**
 * Field Ledger SEO page style: restrained editorial reading experience,
 * clear evidence-led sections, and no thin doorway-page patterns.
 */
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { getSeoPage, seoPages } from "@/data/seoPages";

const siteUrl = "https://muonstechnology.com";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function SeoTopic() {
  const [, solutionParams] = useRoute("/solutions/:slug");
  const [, insightParams] = useRoute("/insights/:slug");
  const kind = solutionParams ? "solution" : "insight";
  const slug = solutionParams?.slug ?? insightParams?.slug;
  const page = getSeoPage(kind, slug);

  useEffect(() => {
    if (!page) return;
    const path = `/${page.kind === "solution" ? "solutions" : "insights"}/${page.slug}`;
    const canonical = `${siteUrl}${path}`;
    document.title = `${page.title} | Muons Technology`;
    setMeta("name", "description", page.description);
    setMeta("property", "og:title", `${page.title} | Muons Technology`);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonical);
    setMeta("name", "twitter:title", `${page.title} | Muons Technology`);
    setMeta("name", "twitter:description", page.description);
    let link = document.head.querySelector("link[rel=canonical]") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
    const schemaId = "seo-topic-schema";
    document.getElementById(schemaId)?.remove();
    const schema = document.createElement("script");
    schema.id = schemaId;
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": page.kind === "solution" ? "Service" : "Article",
      name: page.title,
      headline: page.title,
      description: page.description,
      url: canonical,
      provider: { "@type": "Organization", name: "Muons Technology", url: siteUrl },
      author: { "@type": "Organization", name: "Muons Technology", url: siteUrl },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    });
    document.head.appendChild(schema);
  }, [page]);

  if (!page) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#eceae2] px-6 text-[#113128]">
        <div className="max-w-lg text-center">
          <p className="section-kicker">Record not found</p>
          <h1 className="mt-5 font-display text-5xl tracking-[-0.04em]">This field note is not in the file.</h1>
          <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c8ff2b] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em]">Return to Muons <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </main>
    );
  }

  const relatedPages = page.related.map((relatedSlug) => seoPages.find((candidate) => candidate.slug === relatedSlug)).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#eceae2] text-[#113128]">
      <header className="border-b border-[#123329]/12 bg-[#102f26] px-5 py-5 text-white md:px-8">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6">
          <Link href="/" className="font-display text-2xl tracking-[-0.03em]">MUONS<span className="ml-2 font-sans text-[0.52rem] font-bold uppercase tracking-[0.18em] text-[#c8ff2b]">Technology</span></Link>
          <Link href="/" className="inline-flex items-center gap-2 text-[0.62rem] font-extrabold uppercase tracking-[0.13em] text-white/70 transition-colors hover:text-[#c8ff2b]"><ArrowLeft className="h-3.5 w-3.5" /> Main field file</Link>
        </div>
      </header>
      <article className="mx-auto max-w-[1000px] px-5 py-20 md:px-8 md:py-28">
        <p className="section-kicker">{page.eyebrow}</p>
        <h1 className="mt-7 max-w-4xl font-display text-5xl leading-[0.94] tracking-[-0.05em] md:text-7xl">{page.title}</h1>
        <p className="mt-8 max-w-2xl text-xl leading-8 text-[#49685e]">{page.intro}</p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-[#123329]/15 bg-[#123329]/15 md:grid-cols-3">
          {page.sections.map((section, index) => (
            <section key={section.heading} className="bg-[#f7f6ef] p-6 md:p-8">
              <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-[#6a887c]">0{index + 1} / Field record</span>
              <h2 className="mt-8 font-display text-3xl leading-[0.98] tracking-[-0.035em]">{section.heading}</h2>
              <p className="mt-4 text-sm leading-7 text-[#4e6c62]">{section.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-12 border-l-2 border-[#c8ff2b] bg-white/55 p-6 md:p-8">
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#58766b]">Muons Technology / field note</p>
          <p className="mt-4 text-sm leading-7 text-[#4e6c62]">This page describes Muons Technology’s current infrastructure direction. It does not represent a granted patent, a guarantee of outcomes, or a substitute for local agricultural, food-security, legal, or security expertise.</p>
        </div>
        {relatedPages.length > 0 && (
          <nav className="mt-14 border-t border-[#123329]/15 pt-8" aria-label="Related Muons Technology pages">
            <p className="section-kicker">Continue the record</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {relatedPages.map((related) => related && (
                <Link key={related.slug} href={`/${related.kind === "solution" ? "solutions" : "insights"}/${related.slug}`} className="group flex items-center justify-between border border-[#123329]/15 bg-white/45 p-5 transition-colors hover:bg-white">
                  <span className="font-display text-2xl tracking-[-0.03em]">{related.title}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[#6a887c] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </nav>
        )}
      </article>
    </main>
  );
}
