/**
 * Field Ledger SEO content model: a small set of evidence-led, human-readable
 * solution and insight pages. Expand only when each page has distinct value.
 */
export type SeoPage = {
  slug: string;
  kind: "solution" | "insight";
  eyebrow: string;
  /** The on-page H1. Written for a reader, so it can run long. */
  title: string;
  /** The <title> tag. Kept under ~60 characters so results do not truncate. */
  metaTitle: string;
  description: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
  /** Longer prose beneath the section grid. Substance, not keyword padding. */
  detail: Array<{ heading: string; paragraphs: string[] }>;
  /** Answers to questions a real reader arrives with. */
  faq: Array<{ question: string; answer: string }>;
  related: string[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "edge-agriculture-infrastructure",
    kind: "solution",
    eyebrow: "Solution brief / edge infrastructure",
    title: "Edge Agriculture Infrastructure for Ground-Level Food Security",
    metaTitle: "Edge Agriculture Infrastructure | Muons Technology",
    description: "How Muons Technology combines farmer-first physical infrastructure, ground agriculture data, offline-first AI, and trusted records at the edge.",
    intro: "Agricultural infrastructure has to work where the field works: close to the ground, across imperfect connectivity, and alongside the people responsible for the next decision.",
    sections: [
      { heading: "Built for the point of work", body: "Muons Technology is building American patent-pending edge hardware infrastructure that keeps field observations, local conditions, and operational context close to the people using them." },
      { heading: "A dependable path from ground data to action", body: "The edge layer can collect practical agricultural context, make it available to offline-first intelligence, and preserve a record that teams can revisit as the season changes." },
      { heading: "Infrastructure for earlier awareness", body: "The purpose is not to replace farmer judgment. It is to help growers, operators, and institutions identify changing conditions earlier and coordinate a more useful response." },
    ],
    detail: [
      {
        heading: "Why the edge, and not the cloud alone",
        paragraphs: [
          "Most agricultural software assumes a reliable round trip to a data centre. In practice a great deal of farming happens where that assumption breaks down: at the far end of a field, inside a packhouse with thick walls, on a track between blocks, during the hours when a network is congested or a tower is down. When the round trip fails, the software fails with it, and the person holding the phone goes back to memory and paper.",
          "Edge infrastructure inverts that dependency. Collection, storage, and the first layer of interpretation happen on hardware that is physically present where the work is. Connectivity becomes a way to synchronise and share rather than a precondition for functioning at all. The practical difference is not speed; it is whether the system is available at the moment a decision is being made.",
        ],
      },
      {
        heading: "What sits at the edge",
        paragraphs: [
          "Muons Technology is developing American patent-pending edge hardware intended to sit close to the point of work. The design intent is to capture field observations and local conditions, hold them durably, make them available to on-device intelligence, and reconcile with wider systems when a connection allows.",
          "This is a development direction rather than a description of a finished, certified product. The hardware is patent-pending, not granted, and nothing here should be read as a guarantee of performance in a particular environment.",
        ],
      },
      {
        heading: "Who this is built for",
        paragraphs: [
          "Growers and farm managers who need an operating picture that survives a dead zone. Cooperatives coordinating across members whose connectivity varies enormously. Public institutions and programmes that need a defensible record of what was observed, where, and when.",
          "The common thread is that each of them currently loses information at the point where it is most valuable: the moment of observation. Infrastructure that holds that moment, rather than requiring it to be re-entered later from memory, is the problem being addressed.",
        ],
      },
    ],
    faq: [
      { question: "Does this replace existing farm management software?", answer: "No. The edge layer is concerned with capturing and preserving ground-level context, and making it usable where connectivity is unreliable. It is intended to feed the systems a farm already uses, not to displace them." },
      { question: "What happens when there is no connectivity at all?", answer: "Collection and local interpretation are designed to continue. Reconciliation with wider systems happens when a connection returns. The absence of a network is treated as an ordinary operating condition rather than an error state." },
      { question: "Is the hardware available to buy today?", answer: "Muons Technology is building this infrastructure and the patent application is pending. Availability, specifications, and deployment timelines should be confirmed directly rather than inferred from this page." },
    ],
    related: ["offline-first-ai-for-farmers", "early-food-insecurity-signals"],
  },
  {
    slug: "offline-first-ai-for-farmers",
    kind: "solution",
    eyebrow: "Solution brief / offline-first intelligence",
    title: "Offline-First AI for Farmers and Field Teams",
    metaTitle: "Offline-First AI for Farmers | Muons Technology",
    description: "Muons Technology’s offline-first approach brings agricultural intelligence to farmers and operators when broadband, apps, or smartphones cannot be assumed.",
    intro: "Useful intelligence should not disappear when the network does. Offline-first design treats connectivity limits as a starting condition, not a late-stage exception.",
    sections: [
      { heading: "Meet the field where it is", body: "Muons connects ground agriculture data with practical field workflows so teams can work with a useful operating picture in disconnected and low-bandwidth environments." },
      { heading: "Keep the local context", body: "Weather, soil, crop, and operational observations are more useful when they retain the context around who saw what, where it happened, and what decision followed." },
      { heading: "Make intelligence actionable", body: "Offline-first AI is valuable when it helps people prioritize the next move, rather than adding another abstract dashboard to an already complex season." },
    ],
    detail: [
      {
        heading: "Offline-first is a design stance, not a fallback",
        paragraphs: [
          "A great deal of software treats offline as an exception: a cached screen, a queued action, an apology. Offline-first reverses the default. The device is assumed to be the source of truth for what it has observed, and synchronisation is treated as an eventual reconciliation rather than a prerequisite.",
          "That distinction shows up in the details. What can be computed locally? What must be retained when storage is constrained? When two records disagree after a period apart, which wins, and can a person see why? These questions have to be answered at design time; they cannot be retrofitted onto a system that assumed a network.",
        ],
      },
      {
        heading: "Intelligence that helps someone decide",
        paragraphs: [
          "A model that produces a score no one can act on has not helped. Useful field intelligence tends to answer narrower questions: which block to walk first, whether a change is worth reacting to yet, what has altered since the last visit, what a colleague saw two days ago.",
          "Muons connects ground agriculture data with practical field workflows so teams can work with a useful operating picture in disconnected and low-bandwidth environments. The aim is prioritisation rather than another dashboard competing for attention during an already demanding season.",
        ],
      },
      {
        heading: "Designing for the device people actually carry",
        paragraphs: [
          "Assumptions about hardware quietly exclude people. A workflow needing a recent smartphone, a data plan, and an app store account excludes a large share of the world's growers. Offline-first design has to extend to the constraints of the device itself: modest storage, intermittent power, gloved hands, bright sun, and a screen that may be shared between several people.",
          "None of that is a reason to lower the quality of the intelligence. It is a reason to be careful about where computation happens and what a person is asked to do to obtain it.",
        ],
      },
    ],
    faq: [
      { question: "Does offline-first mean the AI runs entirely on the device?", answer: "Not necessarily. It means the system remains useful without a connection. Where a task is best handled locally it runs locally; heavier work can run elsewhere and reconcile later, without the field experience depending on that round trip." },
      { question: "What happens to data collected while offline?", answer: "It is retained locally with the context around it — who observed it, where, and when — and reconciled when a connection is available. The context is what makes a later reading of the record meaningful." },
      { question: "Is a smartphone required?", answer: "Offline-first design treats connectivity and device limits as starting conditions rather than late-stage exceptions. Specific requirements should be confirmed directly." },
    ],
    related: ["edge-agriculture-infrastructure", "blockchain-agricultural-records"],
  },
  {
    slug: "blockchain-agricultural-records",
    kind: "solution",
    eyebrow: "Solution brief / trusted records",
    title: "Blockchain Agricultural Records for Traceable Field Operations",
    metaTitle: "Blockchain Agricultural Records | Muons Technology",
    description: "Explore how Muons Technology uses blockchain-oriented record continuity to support trusted agricultural data, audit trails, and field-to-decision traceability.",
    intro: "A trusted agricultural record should make continuity easier: what happened, when it happened, what changed, and which decisions came next.",
    sections: [
      { heading: "Record the chain of events", body: "Muons is shaping blockchain-oriented infrastructure around field events and operational handoffs so the record can travel with the farm, the team, and the next season." },
      { heading: "Keep trust practical", body: "Traceability should be understandable to farmers and operators. The aim is a clear, reviewable record rather than complexity for its own sake." },
      { heading: "Designed for evolving security", body: "Muons combines identity-aware planning with a quantum-resilient direction while being clear that the architecture is a development direction, not a claim of certification or invulnerability." },
    ],
    detail: [
      {
        heading: "What a trustworthy record has to do",
        paragraphs: [
          "Traceability is often described as an outcome, but for the people maintaining it, it is a sequence of ordinary moments: an observation, a treatment, a movement, a handover. A record is trustworthy when those moments can be reviewed later by someone who was not present, and when the order in which they happened is not in dispute.",
          "That is a narrower claim than it sounds. It does not mean the record is true — a record can faithfully preserve a mistaken observation. It means the record has not been quietly rewritten after the fact, and that what changed, when, and in what order remains legible.",
        ],
      },
      {
        heading: "Where blockchain-oriented design helps, and where it does not",
        paragraphs: [
          "The useful property is continuity: an append-only sequence that makes silent revision evident. That matters when a record has to travel — between a farm and a buyer, across a season, through a change of staff, into an audit.",
          "It is not a solution to every trust problem. It does not verify that an observation was accurate, it does not remove the need for people who understand the context, and it does not make a system secure by its presence. Complexity introduced without a clear purpose makes a record harder to trust, not easier.",
        ],
      },
      {
        heading: "Identity, security, and honest language",
        paragraphs: [
          "Muons combines identity-aware planning with a quantum-resilient direction. That phrasing is deliberate: it describes where the architecture is heading, not a certification held or a guarantee of invulnerability. Security claims that outrun what has actually been verified are themselves a risk.",
          "For growers and operators, the practical test is simpler. Can you see what happened? Can you show someone else? Does the record still make sense a season later, to a person who was not there? Those questions are the ones the design is answerable to.",
        ],
      },
    ],
    faq: [
      { question: "Does this mean farm data is published on a public blockchain?", answer: "No. The relevant property is record continuity — an append-only sequence where silent revision is evident. How and where records are held is a design question separate from any public ledger." },
      { question: "Is the system quantum-proof?", answer: "No, and that claim should be treated sceptically wherever it appears. Muons describes a quantum-resilient direction: a development posture, not a certification or a guarantee." },
      { question: "Do growers need to understand blockchain to use this?", answer: "No. Traceability should be understandable to farmers and operators as a clear, reviewable record. If using it requires understanding the underlying mechanism, the design has failed." },
    ],
    related: ["edge-agriculture-infrastructure", "offline-first-ai-for-farmers"],
  },
  {
    slug: "early-food-insecurity-signals",
    kind: "insight",
    eyebrow: "Field note / global food security",
    title: "How Ground Agriculture Data Can Surface Food-Insecurity Risk Earlier",
    metaTitle: "Early Food-Insecurity Signals | Muons Technology",
    description: "A Muons Technology field note on connecting crop, soil, climate, and operational observations to earlier food-security awareness.",
    intro: "Food insecurity rarely begins as a single visible event. It can emerge through a sequence of changing conditions across fields, water, crop progress, logistics, and local operations.",
    sections: [
      { heading: "Start with ground truth", body: "Early awareness depends on practical observations from the places where food is grown. Ground agriculture data adds local context that broad signals can miss." },
      { heading: "Connect the conditions", body: "Crop progress, soil and water context, weather patterns, and field operations become more useful when they can be read together across the season." },
      { heading: "Support earlier decisions", body: "Muons Technology is building infrastructure intended to help growers, cooperatives, and institutions recognize changing risk earlier and coordinate a grounded response." },
    ],
    detail: [
      {
        heading: "Insecurity arrives as a sequence, not an event",
        paragraphs: [
          "By the time food insecurity is legible in national statistics, the conditions that produced it are usually months old. The sequence that leads there is ordinary and local: a planting window missed, a water source drawn down further than usual, a treatment deferred because the cost did not work that month, a road that becomes unreliable, a buyer who stops arriving.",
          "Each of those is visible to someone at the time. What is usually missing is not observation but retention — a way for what a person noticed on a particular day to still be available, with its context intact, when a pattern would otherwise only become obvious in aggregate much later.",
        ],
      },
      {
        heading: "What ground data adds to broad signals",
        paragraphs: [
          "Remote sensing and market data cover ground quickly and cheaply, and they are genuinely useful. Their limitation is resolution of meaning: an index can show that a region's vegetation has changed without indicating whether that reflects drought, a shifted planting calendar, a pest, or a deliberate rotation.",
          "Ground agriculture data supplies the local interpretation that distinguishes between those. Crop progress, soil and water context, weather patterns, and field operations become more useful when they can be read together across a season rather than as separate feeds.",
        ],
      },
      {
        heading: "Earlier awareness is only useful if someone can act",
        paragraphs: [
          "A signal that arrives earlier but reaches no one who can respond has changed nothing. The value of earlier awareness depends on whether it reaches a grower deciding what to plant, a cooperative deciding where to direct support, or an institution deciding how to sequence a programme.",
          "Muons Technology is building infrastructure intended to help those groups recognise changing risk earlier and coordinate a grounded response. That is a statement of intent about infrastructure, not a claim to predict food crises or to substitute for local agricultural, food-security, or policy expertise.",
        ],
      },
    ],
    faq: [
      { question: "Can this predict a food crisis?", answer: "No. Nothing here should be read as a claim to predict outcomes. The aim is earlier awareness of changing conditions, so that people who can respond have more time in which to do so." },
      { question: "How is this different from satellite monitoring?", answer: "It is complementary. Remote sensing covers ground quickly; ground observation supplies the local meaning that distinguishes a drought from a shifted planting calendar. Read together they are more useful than either alone." },
      { question: "Who is this intended for?", answer: "Growers, cooperatives, and public institutions coordinating a response — the people for whom a change in conditions implies a decision." },
    ],
    related: ["edge-agriculture-infrastructure", "offline-first-ai-for-farmers"],
  },
];

export function getSeoPage(kind: SeoPage["kind"], slug: string | undefined) {
  return seoPages.find((page) => page.kind === kind && page.slug === slug);
}
