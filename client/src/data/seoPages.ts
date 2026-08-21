/**
 * Field Ledger SEO content model: a small set of evidence-led, human-readable
 * solution and insight pages. Expand only when each page has distinct value.
 */
export type SeoPage = {
  slug: string;
  kind: "solution" | "insight";
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
  related: string[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "edge-agriculture-infrastructure",
    kind: "solution",
    eyebrow: "Solution brief / edge infrastructure",
    title: "Edge Agriculture Infrastructure for Ground-Level Food Security",
    description: "How Muons Technology combines farmer-first physical infrastructure, ground agriculture data, offline-first AI, and trusted records at the edge.",
    intro: "Agricultural infrastructure has to work where the field works: close to the ground, across imperfect connectivity, and alongside the people responsible for the next decision.",
    sections: [
      { heading: "Built for the point of work", body: "Muons Technology is building American patent-pending edge hardware infrastructure that keeps field observations, local conditions, and operational context close to the people using them." },
      { heading: "A dependable path from ground data to action", body: "The edge layer can collect practical agricultural context, make it available to offline-first intelligence, and preserve a record that teams can revisit as the season changes." },
      { heading: "Infrastructure for earlier awareness", body: "The purpose is not to replace farmer judgment. It is to help growers, operators, and institutions identify changing conditions earlier and coordinate a more useful response." },
    ],
    related: ["offline-first-ai-for-farmers", "early-food-insecurity-signals"],
  },
  {
    slug: "offline-first-ai-for-farmers",
    kind: "solution",
    eyebrow: "Solution brief / offline-first intelligence",
    title: "Offline-First AI for Farmers and Field Teams",
    description: "Muons Technology’s offline-first approach brings agricultural intelligence to farmers and operators when broadband, apps, or smartphones cannot be assumed.",
    intro: "Useful intelligence should not disappear when the network does. Offline-first design treats connectivity limits as a starting condition, not a late-stage exception.",
    sections: [
      { heading: "Meet the field where it is", body: "Muons connects ground agriculture data with practical field workflows so teams can work with a useful operating picture in disconnected and low-bandwidth environments." },
      { heading: "Keep the local context", body: "Weather, soil, crop, and operational observations are more useful when they retain the context around who saw what, where it happened, and what decision followed." },
      { heading: "Make intelligence actionable", body: "Offline-first AI is valuable when it helps people prioritize the next move, rather than adding another abstract dashboard to an already complex season." },
    ],
    related: ["edge-agriculture-infrastructure", "blockchain-agricultural-records"],
  },
  {
    slug: "blockchain-agricultural-records",
    kind: "solution",
    eyebrow: "Solution brief / trusted records",
    title: "Blockchain Agricultural Records for Traceable Field Operations",
    description: "Explore how Muons Technology uses blockchain-oriented record continuity to support trusted agricultural data, audit trails, and field-to-decision traceability.",
    intro: "A trusted agricultural record should make continuity easier: what happened, when it happened, what changed, and which decisions came next.",
    sections: [
      { heading: "Record the chain of events", body: "Muons is shaping blockchain-oriented infrastructure around field events and operational handoffs so the record can travel with the farm, the team, and the next season." },
      { heading: "Keep trust practical", body: "Traceability should be understandable to farmers and operators. The aim is a clear, reviewable record rather than complexity for its own sake." },
      { heading: "Designed for evolving security", body: "Muons combines identity-aware planning with a quantum-resilient direction while being clear that the architecture is a development direction, not a claim of certification or invulnerability." },
    ],
    related: ["edge-agriculture-infrastructure", "offline-first-ai-for-farmers"],
  },
  {
    slug: "early-food-insecurity-signals",
    kind: "insight",
    eyebrow: "Field note / global food security",
    title: "How Ground Agriculture Data Can Surface Food-Insecurity Risk Earlier",
    description: "A Muons Technology field note on connecting crop, soil, climate, and operational observations to earlier food-security awareness.",
    intro: "Food insecurity rarely begins as a single visible event. It can emerge through a sequence of changing conditions across fields, water, crop progress, logistics, and local operations.",
    sections: [
      { heading: "Start with ground truth", body: "Early awareness depends on practical observations from the places where food is grown. Ground agriculture data adds local context that broad signals can miss." },
      { heading: "Connect the conditions", body: "Crop progress, soil and water context, weather patterns, and field operations become more useful when they can be read together across the season." },
      { heading: "Support earlier decisions", body: "Muons Technology is building infrastructure intended to help growers, cooperatives, and institutions recognize changing risk earlier and coordinate a grounded response." },
    ],
    related: ["edge-agriculture-infrastructure", "offline-first-ai-for-farmers"],
  },
];

export function getSeoPage(kind: SeoPage["kind"], slug: string | undefined) {
  return seoPages.find((page) => page.kind === kind && page.slug === slug);
}
