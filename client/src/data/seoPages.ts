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
  /**
   * Date this page's content last genuinely changed, as YYYY-MM-DD. Feeds
   * <lastmod> in the sitemap. Bump it when the wording changes, not on every
   * deploy: a sitemap where everything changed today gets its lastmod
   * distrusted, and lastmod is the one hint Google actually acts on.
   */
  updated: string;
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
    updated: "2026-09-17",
    related: ["offline-first-ai-for-farmers", "what-is-edge-computing-in-agriculture", "early-food-insecurity-signals"],
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
    updated: "2026-09-17",
    related: ["edge-agriculture-infrastructure", "what-is-edge-computing-in-agriculture", "blockchain-agricultural-records"],
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
    updated: "2026-09-17",
    related: ["farm-records-for-insurance-and-lending", "carbon-credit-verification-farm-records", "who-owns-farm-data"],
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
    updated: "2026-09-17",
    related: ["edge-agriculture-infrastructure", "offline-first-ai-for-farmers", "who-owns-farm-data"],
  },
  {
    slug: "who-owns-farm-data",
    kind: "insight",
    eyebrow: "Field note / data ownership",
    title: "Who Owns Farm Data, and Why the Answer Matters to Growers",
    metaTitle: "Who Owns Farm Data? | Muons Technology",
    description: "A Muons Technology field note on who owns agricultural data, what growers should ask any provider, and why ownership is decided by contract rather than by default.",
    intro: "Ask who owns the data a farm produces and you will get several confident, contradictory answers. The honest one is that it depends almost entirely on what a contract says, and most growers have never been shown that part of the contract.",
    sections: [
      { heading: "There is no default owner", body: "Agricultural data is not covered by a single ownership rule. In most jurisdictions raw measurements are not copyrightable, so what governs is the agreement a grower signed, often without the question being raised." },
      { heading: "Ask the questions early", body: "Who can see it, who can sell it, what happens when the contract ends, and can it be exported in a usable form. A provider who cannot answer plainly has answered." },
      { heading: "Portability is the practical test", body: "Ownership means little if the data cannot leave. The workable question is not who holds the licence but whether a grower can take a complete, readable copy elsewhere." },
    ],
    detail: [
      {
        heading: "Why the question keeps arriving late",
        paragraphs: [
          "Data ownership rarely comes up when a system is adopted. It comes up at the end: when a grower changes provider, when a cooperative dissolves, when land changes hands, or when a buyer asks for history that sits inside a platform nobody can export from any more.",
          "By then the terms were agreed years earlier, usually in a clause nobody read, and the practical answer is whatever the platform's export function happens to support. This is why the useful time to ask is before anything is collected.",
        ],
      },
      {
        heading: "Ownership, licence, and access are three different things",
        paragraphs: [
          "Much confusion comes from treating these as one. A contract may say a grower owns their data while granting the provider a broad, perpetual, transferable licence to use it. Both statements can be true at once, and the licence is usually what determines what actually happens.",
          "Access is different again. A grower may own data and have licensed nothing, yet still be unable to retrieve it in a form any other system can read. Ownership without portability is a legal position rather than a practical one.",
        ],
      },
      {
        heading: "What an honest arrangement looks like",
        paragraphs: [
          "Clear statement that the grower owns what their operation produces. A narrow, specific licence saying exactly what the provider may do with it. Export in an open format, at any time, without charge or negotiation. Deletion on request that actually deletes.",
          "Muons Technology is building infrastructure that keeps field records close to the people who produced them, and treats portability as a property of the system rather than a feature to be requested. That is a design intent, not a legal guarantee: the terms that apply to any deployment are the terms written into that agreement, and growers should read them.",
        ],
      },
    ],
    faq: [
      { question: "Does a farmer automatically own data from their own fields?", answer: "Not automatically. Raw measurements are generally not copyrightable, so ownership is decided by the agreement signed with whoever collects or stores the data. It is worth reading that clause before adopting a system rather than after." },
      { question: "What should I ask a provider before signing?", answer: "Who can see it, who can sell or share it, can I export a complete copy in an open format at any time, what happens to it when the contract ends, and does deletion on request actually delete it." },
      { question: "Is anonymised or aggregated data still mine?", answer: "Usually not, under most agreements. Aggregation is frequently the mechanism by which providers acquire rights that the grower still nominally owns, so it is worth asking specifically how aggregated data may be used and sold." },
    ],
    updated: "2026-09-17",
    related: ["blockchain-agricultural-records", "farm-records-for-insurance-and-lending"],
  },
  {
    slug: "what-is-edge-computing-in-agriculture",
    kind: "insight",
    eyebrow: "Field note / edge computing",
    title: "What Is Edge Computing in Agriculture, in Plain Terms",
    metaTitle: "Edge Computing in Agriculture Explained | Muons",
    description: "A plain explanation of edge computing in agriculture: what it means, where it helps, where it does not, and how it differs from cloud and on-premise systems.",
    intro: "Edge computing means doing the work where the work happens, rather than sending everything to a data centre and waiting for an answer. In agriculture that distinction stops being architectural and becomes practical the moment a signal drops.",
    sections: [
      { heading: "The short definition", body: "Computation happens on hardware physically near the activity: in the field, on the machine, at the shed. The network becomes a way to synchronise rather than a condition of functioning." },
      { heading: "Why farms surface the difference", body: "Fields are where connectivity is worst and decisions are most time-bound. A system that stops working without a network stops working exactly where it was most needed." },
      { heading: "What it is not", body: "Edge is not a replacement for cloud systems, not automatically more secure, and not a reason to avoid connectivity. It is a decision about where a given piece of work belongs." },
    ],
    detail: [
      {
        heading: "Cloud, on-premise, and edge",
        paragraphs: [
          "Cloud means someone else's data centre, reached over the internet: elastic, maintained for you, and useless when the link is down. On-premise means your own servers in your own building: under your control, and your problem to run. Edge means small compute placed at the point of activity, which may be a device on a machine or a unit at the shed.",
          "Most real systems use more than one. The question is not which is correct but which work belongs where: what must survive a dead network, what is worth the round trip, and what only makes sense with the scale a data centre provides.",
        ],
      },
      {
        heading: "Where the edge earns its place on a farm",
        paragraphs: [
          "Capture that cannot be repeated. An observation made in a block with no signal either persists locally or is lost; it cannot be re-observed later from memory with the same fidelity.",
          "Decisions bounded by time. If an answer is needed while someone is standing in the field, a round trip that may not complete is not a dependable part of the workflow.",
          "Volume that is not worth moving. Continuous readings and imagery are often far more useful reduced locally than shipped in full over a connection that is metered or slow.",
        ],
      },
      {
        heading: "Where it does not help",
        paragraphs: [
          "Work that genuinely needs scale — training large models, analysis across many farms and seasons, long-term archival — belongs where that scale exists. Pushing it to the edge trades capability for a property nobody needed.",
          "Edge is also not a security posture in itself. Distributing computation distributes the surface that has to be secured. It can reduce how much data travels, which is useful, but a device in a shed is a device that can be taken.",
          "Muons Technology is building American patent-pending edge hardware infrastructure for agriculture. The direction is to place the work that must survive disconnection at the edge, and leave the rest where it belongs, rather than to claim the edge is where everything should run.",
        ],
      },
    ],
    faq: [
      { question: "Is edge computing the same as offline mode?", answer: "Related but not identical. Offline mode usually means an app tolerates losing its connection. Edge computing means the processing genuinely happens locally, so the local system is complete in itself rather than degraded." },
      { question: "Does edge computing mean I do not need internet?", answer: "No. It means the system keeps working without it. Connectivity is still how records reach colleagues, buyers, and wider systems; the difference is that its absence delays sharing rather than halting work." },
      { question: "Is edge computing more secure?", answer: "Not inherently. Less data in transit can reduce exposure, but computation spread across physical devices is a larger surface to secure, and hardware in a field can be stolen. Security depends on the design, not on the location." },
    ],
    updated: "2026-09-17",
    related: ["edge-agriculture-infrastructure", "offline-first-ai-for-farmers"],
  },
  {
    slug: "farm-records-for-insurance-and-lending",
    kind: "solution",
    eyebrow: "Solution brief / records for finance",
    title: "Farm Records for Crop Insurance, Lenders, and Programme Applications",
    metaTitle: "Farm Records for Insurance and Lending | Muons",
    description: "How dependable field records support crop insurance underwriting, lender conversations, and programme applications, and what makes a record hold up under review.",
    intro: "A farm's record becomes valuable at the moment someone outside the farm has to rely on it: an underwriter pricing risk, a lender assessing a season, a programme officer checking that stated practices happened.",
    sections: [
      { heading: "Records are read by strangers", body: "The test of a record is not whether it makes sense to the person who wrote it. It is whether it holds up when read by someone who was never in the field." },
      { heading: "Continuity beats completeness", body: "A consistent record kept all season is more persuasive than an exhaustive one assembled afterwards. Reviewers are practised at telling the two apart." },
      { heading: "The same record serves several asks", body: "Insurance, lending, programme eligibility, and buyer questions draw on overlapping facts. Kept once, properly, a record can answer all of them." },
    ],
    detail: [
      {
        heading: "What makes a record credible under review",
        paragraphs: [
          "Contemporaneity: it was created at the time, not reconstructed. Specificity: a date, a place, an actor, an observation, rather than a summary. Consistency: the same things recorded the same way across the season. Continuity: the sequence is intact, with no unexplained gaps.",
          "None of this requires sophistication. A plain record kept consistently outperforms a detailed one assembled in a hurry, because a reviewer's first question is always when it was written, and a record made at the time answers it.",
        ],
      },
      {
        heading: "The cost of reconstructing afterwards",
        paragraphs: [
          "Most farms already hold the information, distributed across notebooks, phone photos, text messages, spreadsheets, and memory. The expense is not collection but reassembly: the days spent before a deadline stitching sources together, and the parts that cannot be recovered.",
          "The parts that cannot be recovered are the expensive ones. A practice performed but not evidenced is, for a programme or an underwriter, a practice that did not happen. Nobody is calling the grower dishonest; they simply cannot act on a claim they cannot verify.",
        ],
      },
      {
        heading: "Where Muons fits",
        paragraphs: [
          "Muons Technology is building infrastructure to capture field events where they occur, keep the context around them, and preserve the order in which they happened, so that a record can be reviewed later by someone who was not present.",
          "This is infrastructure, not advice. It does not determine eligibility, set premiums, guarantee approval, or substitute for an agronomist, broker, or adviser. Specific requirements vary by programme, insurer, and jurisdiction, and should be confirmed with them directly.",
        ],
      },
    ],
    faq: [
      { question: "Will better records reduce my insurance premium?", answer: "Not by themselves, and nobody should promise that. Premiums are set by the insurer against their own criteria. Dependable records mean the conversation rests on evidence rather than recollection; how that is weighed is the underwriter's decision." },
      { question: "What records do programmes usually want?", answer: "It varies by programme and jurisdiction, so confirm with the administering body. The recurring themes are what was done, where, when, by whom, and what evidence exists that it happened as stated." },
      { question: "Is a digital record accepted where paper was before?", answer: "Usually, though acceptance depends on the programme. What is generally asked is that the record be legible, attributable, and not silently alterable after the fact." },
    ],
    updated: "2026-09-17",
    related: ["blockchain-agricultural-records", "who-owns-farm-data"],
  },
  {
    slug: "carbon-credit-verification-farm-records",
    kind: "solution",
    eyebrow: "Solution brief / verification records",
    title: "Documenting Regenerative Practice for Carbon Credit Verification",
    metaTitle: "Carbon Credit Verification Records | Muons",
    description: "What verifiers look for when regenerative agricultural practices are claimed for carbon credits, and why documentation, not the practice, is usually what fails.",
    intro: "Most carbon programmes do not fail on the farming. They fail on the evidence: a practice that genuinely happened, and cannot be demonstrated to a verifier's standard a year later.",
    sections: [
      { heading: "The practice and its evidence are separate", body: "Cover cropping, reduced tillage, and rotation are farming decisions. Whether a credit can be issued depends on a second, separate thing: whether they can be shown to have occurred." },
      { heading: "Verifiers are checking for revision", body: "Much of verification is concerned with whether a record could have been adjusted after the fact to fit the claim. Records that make revision evident are worth more than records that are merely detailed." },
      { heading: "Documentation is a season-long habit", body: "Evidence assembled at the end of a season is weaker than evidence created through it, and verifiers are practised at telling which they are reading." },
    ],
    detail: [
      {
        heading: "Why documentation is the usual failure point",
        paragraphs: [
          "A grower who has reduced tillage for three seasons has done the work. Whether a credit follows depends on being able to demonstrate which fields, which dates, which equipment, and what evidence existed at the time — to a third party who was not there and is paid to be sceptical.",
          "This is where projects stall. Not fraud, and rarely carelessness, but a gap between what happened and what can be shown. The farming was real; the record was made later, from memory, in a format that cannot establish when it was created.",
        ],
      },
      {
        heading: "Additionality and baseline, briefly",
        paragraphs: [
          "Most programmes ask whether a practice is additional: happening because of the programme rather than something already underway. Answering that requires evidence of what was done before, which is often the hardest record to produce, since nobody was documenting a baseline they did not know would matter.",
          "The practical consequence is that record-keeping becomes valuable before a project begins. A farm with three years of consistent history entering a programme is in a materially stronger position than one starting from a standing start, whatever the farming.",
        ],
      },
      {
        heading: "What Muons is building toward",
        paragraphs: [
          "Infrastructure that captures field operations as they happen, retains the context around them, and preserves the order in which they occurred, so that what is presented later can be reviewed rather than taken on trust.",
          "To be clear about the limits: Muons does not issue credits, verify projects, or determine eligibility, and nothing here should be read as a claim that using this infrastructure results in credits being granted. Methodologies, verifiers, and registry requirements differ, and should be confirmed with the programme concerned.",
        ],
      },
    ],
    faq: [
      { question: "Does good record-keeping guarantee carbon credits?", answer: "No. Credits depend on the methodology, the verifier, and the registry, and on the practices themselves meeting the programme's criteria. Documentation removes a common reason for failure; it does not determine the outcome." },
      { question: "How far back do records need to go?", answer: "It depends on the methodology, and many require evidence of a baseline before the project period. This is why starting to record consistently before entering a programme is worth more than it appears at the time." },
      { question: "Can I use existing notes and photos?", answer: "Often, to a degree. The usual difficulty is not the format but establishing when they were made and that they have not been adjusted since. Records that carry their own timing and sequence are easier to present." },
    ],
    updated: "2026-09-17",
    related: ["blockchain-agricultural-records", "farm-records-for-insurance-and-lending"],
  },
];

export function getSeoPage(kind: SeoPage["kind"], slug: string | undefined) {
  return seoPages.find((page) => page.kind === kind && page.slug === slug);
}
