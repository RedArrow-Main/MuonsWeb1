/**
 * Field Ledger style reminder: contemporary agrarian editorialism with deep ink-green foundations,
 * oversized DM Serif headings, Signal Sprout accents, contour-line motifs, and asymmetric story flow.
 */
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Menu,
  Satellite,
  Sprout,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";

// Production media is intentionally served from a fixed public domain with
// compressed files, so the Field Ledger experience remains fast and crawlable.
const mediaOrigin = "https://qirz61kx5dixbar2.public.blob.vercel-storage.com";
const heroImage = `${mediaOrigin}/muons-technology-hero.jpg`;
const sensorImage = `${mediaOrigin}/muons-technology-sensor.jpg`;
const aerialImage = `${mediaOrigin}/muons-technology-aerial.jpg`;
const harvestImage = `${mediaOrigin}/muons-technology-harvest.jpg`;
const edgeInfrastructureImage = `${mediaOrigin}/muons-technology-sensor.jpg`;
const muonsLogo = `${mediaOrigin}/muons-technology-logo-dark.png`;
const muonsSymbol = `${mediaOrigin}/muons-technology-symbol.png`;

const navItems = [
  { label: "Approach", href: "#approach" },
  { label: "Signals", href: "#signals" },
  { label: "AI Model", href: "#predictive-model" },
  { label: "Edge Hardware", href: "#edge-infrastructure" },
  { label: "Impact", href: "#outcomes" },
  { label: "Regenerative", href: "#regenerative" },
  { label: "Security", href: "#security" },
  { label: "Company", href: "#muons" },
];

const signalCards = [
  {
    number: "01",
    title: "Field sensing",
    copy: "Turn local weather, soil, and crop observations into a durable season-long record.",
    icon: Sprout,
  },
  {
    number: "02",
    title: "Operational view",
    copy: "Give teams one shared read on what is happening across every farm and collection point.",
    icon: Satellite,
  },
  {
    number: "03",
    title: "Practical action",
    copy: "Translate early field signals into the next useful move — when it still matters.",
    icon: ArrowUpRight,
  },
];

const fieldLenses = [
  {
    label: "Soil & water",
    record: "Ground condition",
    title: "Start with what is happening below the surface.",
    copy: "Bring moisture, irrigation context, soil observations, and changing field conditions into one usable frame.",
    details: ["Moisture context", "Irrigation notes", "Soil observations"],
  },
  {
    label: "Crop progress",
    record: "Season condition",
    title: "Read the crop as part of the wider season.",
    copy: "Connect crop-stage observations with weather patterns, field activity, and the decisions already made.",
    details: ["Crop-stage notes", "Field activity", "Weather context"],
  },
  {
    label: "Field operations",
    record: "Working record",
    title: "Give every field action its practical context.",
    copy: "Coordinate work in the field with the on-the-ground signals teams need to assess what comes next.",
    details: ["Task history", "Team observations", "Decision handoffs"],
  },
  {
    label: "Season memory",
    record: "Carry-forward record",
    title: "Keep the learning that makes the next season stronger.",
    copy: "Turn individual observations into a durable record that can travel with the farm, the team, and the next plan.",
    details: ["Field histories", "Pattern comparison", "Future planning"],
  },
];

const trustStages = [
  {
    number: "01",
    title: "Field event",
    copy: "A meaningful observation or action becomes part of the seasonal record.",
    label: "Illustrative record context",
    details: ["North block", "Moisture note", "Action logged"],
  },
  {
    number: "02",
    title: "Record chain",
    copy: "Blockchain architecture is intended to help create a more traceable history of that record.",
    label: "Traceability path",
    details: ["Event", "History", "Record"],
  },
  {
    number: "03",
    title: "Shared proof",
    copy: "The record can support clearer conversations with advisors, programs, partners, and future teams.",
    label: "Review-ready context",
    details: ["Grower", "Advisor", "Program"],
  },
];

const leaders = [
  {
    initials: "AJ",
    name: "Andre James",
    role: "Founder & CEO",
    bio: "10+ years of experience in digital transformation across emerging markets. Specialized in designing mission-critical infrastructure and offline-first digital rails for national-scale coordination.",
    linkedin: "https://www.linkedin.com/in/andre-j-a451172a/",
    image: `${mediaOrigin}/muons-technology-andre-james.png`,
  },
  {
    initials: "FK",
    name: "Fred Kamuzinzi",
    role: "Financial Advisor",
    bio: "Brings experience across digital strategy, AI-led systems, and enterprise transformation. Advises Muons on financial readiness, capital strategy, and resilient growth planning.",
    linkedin: "https://www.linkedin.com/in/fred-kamuzinzi/",
    image: `${mediaOrigin}/muons-technology-fred-kamuzinzi.jpg`,
  },
  {
    initials: "GM",
    name: "Gordon Mitchell",
    role: "COO",
    bio: "Operations, market expansion, and business development. Leading operational strategy and market growth initiatives.",
    linkedin: "https://www.linkedin.com/in/gordon-mitchell-527953b/",
    image: `${mediaOrigin}/muons-technology-gordon-mitchell.jpg`,
  },
];

function scrollToSection(target: string) {
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLens, setActiveLens] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.reset();
    toast.success("Your field-notes request is recorded.", {
      description: "Expect occasional Muons intelligence updates from the growing edge.",
    });
  };

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setContactSubmitted(true);
    form.reset();
    toast.success("Message received in this browser.", {
      description: "The form is ready to connect to Muons Technology's recipient inbox.",
    });
  };

  const navigate = (href: string) => {
    setIsOpen(false);
    window.setTimeout(() => scrollToSection(href), 0);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#eceae2] text-[#113128] selection:bg-[#c8ff2b] selection:text-[#113128]">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/10 bg-[#102d25]/95 py-3 shadow-[0_8px_32px_rgba(8,30,24,0.18)] backdrop-blur-xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-8">
          <button
            type="button"
            onClick={() => scrollToSection("#top")}
            className="group flex items-center gap-2.5 text-left"
            aria-label="Muons Technology home"
          >
            <span className="block w-[min(180px,calc(100vw-88px))] sm:w-[240px]"><img src={muonsLogo} alt="Muons Technology" className="h-auto w-full object-contain" /></span>
          </button>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-[#c8ff2b]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <a href="#contact" className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-white/75 transition-colors hover:text-[#c8ff2b]">
              Talk to us
            </a>
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#c8ff2b] px-4 py-2.5 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-[#102d25] transition duration-200 hover:bg-white active:scale-[0.97]"
            >
              See the signals <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white xl:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="absolute inset-x-4 top-[4.7rem] rounded-[1.5rem] border border-white/10 bg-[#102d25] p-3 shadow-2xl xl:hidden">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.href}
                onClick={() => navigate(item.href)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {item.label}
                <ChevronRight className="h-4 w-4 text-[#c8ff2b]" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate("#contact")}
              className="mt-2 w-full rounded-xl bg-[#c8ff2b] px-4 py-3 text-sm font-extrabold text-[#102d25]"
            >
              See the signals
            </button>
          </div>
        )}
      </header>

      <main>
        <section id="top" className="relative min-h-[700px] overflow-hidden bg-[#0b211b] text-white sm:min-h-[800px]">
          <img src={heroImage} alt="Farmer standing in a maize field at sunset" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[69%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,21,0.97)_0%,rgba(7,26,21,0.78)_37%,rgba(7,26,21,0.22)_72%,rgba(7,26,21,0.38)_100%)]" />
          <div className="contours absolute inset-0 opacity-45" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-[700px] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-32 sm:pb-16 sm:pt-36 md:min-h-[800px] md:px-8 md:pb-20 lg:pb-24">
            <div className="max-w-4xl">
              <div className="animate-rise flex max-w-[19rem] items-start gap-3 text-[0.62rem] font-extrabold uppercase leading-5 tracking-[0.2em] text-[#c8ff2b] sm:max-w-none sm:items-center sm:text-[0.68rem] sm:leading-normal sm:tracking-[0.23em]">
                <span className="grid h-6 w-6 place-items-center rounded-full border border-[#c8ff2b]/45 bg-[#c8ff2b]/10"><span className="h-1.5 w-1.5 rounded-full bg-[#c8ff2b]" /></span>
                Regenerative farming starts with healthy soil
              </div>
              <h1 className="animate-rise animate-delay-1 mt-6 max-w-[20rem] font-display text-[clamp(3.35rem,14vw,7.85rem)] font-normal leading-[0.88] tracking-[-0.055em] text-white sm:mt-7 sm:max-w-4xl sm:text-[clamp(3.6rem,8vw,7.85rem)] sm:leading-[0.86]">
                Farmer first ground truth for <em className="font-display text-[#c8ff2b]">global food security.</em>
              </h1>
              <div className="animate-rise animate-delay-2 mt-6 grid max-w-2xl gap-5 sm:mt-8 sm:gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <p className="max-w-xl text-[1rem] leading-7 text-white/78 md:text-[1.08rem]">
                  You know your land best. Muons helps you keep track of the small changes that shape a season, from soil moisture and crop health to the choices that help your farm grow stronger.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection("#signals")}
                    className="group inline-flex items-center gap-3 rounded-full bg-[#c8ff2b] px-5 py-3.5 text-[0.74rem] font-extrabold uppercase tracking-[0.12em] text-[#0d2e24] transition duration-200 hover:bg-white active:scale-[0.97]"
                  >
                    Explore soil health <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </button>
                </div>
              </div>
              <div className="mt-6 flex max-w-[22rem] flex-wrap gap-2 sm:mt-7 sm:max-w-none sm:gap-2.5">
                {["Ground data", "Edge hardware", "Offline intelligence", "Early warning"].map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#09251e]/50 px-3 py-1.5 text-[0.59rem] font-extrabold uppercase tracking-[0.12em] text-white/78 backdrop-blur-sm"><span className={index === 2 ? "h-1.5 w-1.5 rounded-full bg-[#c8ff2b]" : "h-1.5 w-1.5 rounded-full bg-white/45"} />{item}</span>
                ))}
              </div>
            </div>
            <div className="animate-rise animate-delay-3 mt-10 grid max-w-3xl gap-4 border-t border-white/20 pt-5 sm:mt-14 sm:gap-5 sm:grid-cols-3">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/55">A clearer read</p>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/55">A stronger season</p>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/55">A shared direction</p>
            </div>
            <div className="mt-5 flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-[0.55rem] font-bold uppercase tracking-[0.13em] text-white/45 sm:text-[0.6rem] sm:tracking-[0.15em]">
              <span>Field record / 2026.07</span><span className="hidden sm:inline">Parcel: 08 / maize belt</span><span>Signal: active</span>
            </div>
          </div>
        </section>

        <section className="border-y border-[#123329]/10 bg-[#e3e1d7] px-5 py-5 md:px-8">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 text-[#0f3027] sm:flex-row sm:items-center">
            <p className="flex items-center gap-3 text-[0.72rem] font-extrabold uppercase tracking-[0.16em]"><span className="h-2.5 w-2.5 rounded-full bg-[#c8ff2b] shadow-[0_0_0_5px_rgba(200,255,43,0.28)]" /> Build a healthier season from the ground up</p>
            <p className="text-sm font-medium text-[#46645b]">Built for farmers who need useful answers where the work happens.</p>
          </div>
        </section>

        <section aria-label="Muons operating principles" className="overflow-hidden bg-[#0d2d24] px-5 py-3.5 md:px-8">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[0.63rem] font-extrabold uppercase tracking-[0.15em] text-white/67">
            {["Ground data", "Edge hardware", "Offline intelligence", "Early warning"].map((item) => <span key={item} className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#c8ff2b]" />{item}</span>)}
          </div>
        </section>

        <section id="approach" className="relative overflow-hidden bg-[#eceae2] px-5 py-24 md:px-8 md:py-32">
          <div className="absolute right-[-9rem] top-10 h-[31rem] w-[31rem] rounded-full border border-[#123329]/10" aria-hidden="true" />
          <div className="mx-auto grid max-w-[1440px] items-start gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
            <div className="sticky top-28 max-w-sm">
              <p className="section-kicker">The Muons approach</p>
              <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.045em] text-[#113128] md:text-6xl">
                Infrastructure that starts where the data lives.
              </h2>
              <p className="mt-6 text-base leading-7 text-[#406057]">
                The hard part is not gathering more data. It is getting reliable intelligence from the ground to the people who need it, even when connectivity is limited.
              </p>
              <button type="button" onClick={() => scrollToSection("#outcomes")} className="group mt-9 inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[#113128]">
                What changes <span className="grid h-7 w-7 place-items-center rounded-full bg-[#113128] text-[#c8ff2b] transition-transform group-hover:translate-x-1"><ArrowDownRight className="h-4 w-4" /></span>
              </button>
            </div>

            <div className="grid gap-7 md:grid-cols-[0.95fr_1.05fr] md:items-end">
              <figure className="relative mt-10 md:mt-0">
                <div className="overflow-hidden rounded-[1.75rem] bg-[#153c31]">
                  <img src={sensorImage} alt="Agricultural field sensor among crop rows" loading="lazy" decoding="async" className="aspect-[3/4] h-full w-full object-cover transition duration-700 hover:scale-[1.035]" />
                </div>
                <div className="absolute inset-x-4 top-4 flex items-center justify-between border border-white/25 bg-[#10342a]/85 px-3 py-2 text-[0.55rem] font-extrabold uppercase tracking-[0.13em] text-white backdrop-blur-md"><span>Plot 07 / sensor node</span><span className="flex items-center gap-1.5 text-[#c8ff2b]"><i className="h-1.5 w-1.5 rounded-full bg-[#c8ff2b]" /> live</span></div>
                <div className="absolute bottom-11 left-4 h-14 w-20 border-b border-l border-white/70" aria-hidden="true" />
                <div className="absolute bottom-11 right-4 border border-white/25 bg-[#10342a]/85 px-2.5 py-1.5 text-[0.52rem] font-bold uppercase tracking-[0.12em] text-white/85">soil / stable</div>
                <figcaption className="mt-3 flex items-center justify-between text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#557269]">
                  <span>Field record / 01</span>
                  <span>Live context</span>
                </figcaption>
              </figure>
              <div className="pb-3">
                <div className="border-l-2 border-[#c8ff2b] bg-white/55 p-7 shadow-[0_20px_65px_rgba(27,52,43,0.07)] md:p-9">
                  <div className="flex items-center justify-between text-[0.7rem] font-extrabold uppercase tracking-[0.17em] text-[#496b61]"><span>From signal to stewardship</span><span className="text-[#113128]">Memo / 01</span></div>
                  <p className="mt-5 font-display text-[2.25rem] leading-[1.02] tracking-[-0.04em] text-[#113128]">
                    Reliable decisions begin with a shared picture of the ground.
                  </p>
                  <p className="mt-6 text-[0.95rem] leading-7 text-[#496b61]">
                    Muons combines ground agriculture data, offline-first AI, and tamper-evident blockchain records without losing the local detail that makes the signal useful.
                  </p>
                </div>
                <div className="mt-7 flex gap-3 border-t border-[#153c31]/15 pt-5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#113128] text-[#c8ff2b]"><Check className="h-3.5 w-3.5" /></span>
                  <p className="text-sm leading-6 text-[#406057]">A season history you can revisit, compare, and act on across every growing site.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="signals" className="relative overflow-hidden bg-[#113128] px-5 py-24 text-white md:px-8 md:py-32">
          <div className="contours contours--dark absolute inset-0 opacity-35" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div>
                <p className="section-kicker section-kicker--light">The signal system</p>
                <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[0.91] tracking-[-0.05em] text-white md:text-7xl">
                  See food-insecurity risk <span className="text-[#c8ff2b]">before it becomes urgent.</span>
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-white/70 lg:justify-self-end">
                No clutter. No abstract metrics. Just a grounded read of crop, soil, climate, and operating conditions that can help surface risk earlier.
              </p>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-[1.65rem] border border-white/15 bg-white/15 md:grid-cols-3">
              {signalCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.number} className="group min-h-[285px] bg-[#113128]/95 p-7 transition-colors duration-200 hover:bg-[#194337] md:p-8">
                    <div className="flex items-start justify-between">
                      <span className="text-[0.72rem] font-extrabold tracking-[0.17em] text-[#c8ff2b]">{item.number}</span>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition duration-200 group-hover:border-[#c8ff2b] group-hover:bg-[#c8ff2b] group-hover:text-[#113128]"><Icon className="h-4 w-4" /></span>
                    </div>
                    <h3 className="mt-16 font-display text-3xl tracking-[-0.035em] text-white">{item.title}</h3>
                    <p className="mt-4 max-w-xs text-sm leading-6 text-white/67">{item.copy}</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-8 grid overflow-hidden rounded-[1.65rem] border border-white/15 bg-[#0d2e25]/75 lg:grid-cols-[0.98fr_1.02fr]">
              <div className="border-b border-white/15 p-7 lg:border-b-0 lg:border-r md:p-9">
                <div className="flex items-center justify-between"><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#c8ff2b]">{fieldLenses[activeLens].record}</p><span className="text-[0.62rem] font-bold uppercase tracking-[0.13em] text-white/45">Lens 0{activeLens + 1}</span></div>
                <h3 className="mt-6 max-w-lg font-display text-4xl leading-[0.98] tracking-[-0.04em] text-white">{fieldLenses[activeLens].title}</h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/66">{fieldLenses[activeLens].copy}</p>
                <div className="mt-8 grid gap-2 sm:grid-cols-3">
                  {fieldLenses[activeLens].details.map((detail) => <span key={detail} className="border-t border-white/15 pt-3 text-[0.6rem] font-bold uppercase tracking-[0.13em] text-white/58">{detail}</span>)}
                </div>
              </div>
              <div className="p-3 md:p-4" role="tablist" aria-label="Muons data lenses">
                {fieldLenses.map((lens, index) => (
                  <button
                    key={lens.label}
                    type="button"
                    role="tab"
                    aria-selected={activeLens === index}
                    onClick={() => setActiveLens(index)}
                    className={`group flex w-full items-center justify-between border-b border-white/10 px-4 py-5 text-left transition-colors last:border-b-0 md:px-5 ${activeLens === index ? "bg-[#c8ff2b] text-[#113128]" : "text-white hover:bg-white/[0.06]"}`}
                  >
                    <span className="font-display text-2xl tracking-[-0.03em]">{lens.label}</span><span className={`grid h-8 w-8 place-items-center rounded-full border transition-transform group-hover:translate-x-1 ${activeLens === index ? "border-[#113128]/25" : "border-white/25 text-[#c8ff2b]"}`}><ArrowUpRight className="h-3.5 w-3.5" /></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="predictive-model" className="relative overflow-hidden bg-[#dfe4d7] px-5 py-24 md:px-8 md:py-32">
          <div className="absolute right-0 top-0 h-full w-[34%] border-l border-[#123329]/10 bg-[linear-gradient(135deg,transparent_25%,rgba(18,51,41,0.04)_25%,rgba(18,51,41,0.04)_50%,transparent_50%,transparent_75%,rgba(18,51,41,0.04)_75%)] bg-[size:30px_30px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
              <div>
                <p className="section-kicker">Offline first intelligence</p>
                <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[0.93] tracking-[-0.05em] text-[#113128] md:text-7xl">An AI predictive model built for the ground.</h2>
              </div>
              <div className="max-w-2xl lg:justify-self-end">
                <p className="text-[1.05rem] leading-8 text-[#49685e]">Muons reads local agriculture signals to help teams recognize changing field conditions and food insecurity risk earlier. The model is designed to work with imperfect connectivity and return a practical next move, not a black box score.</p>
                <p className="mt-5 border-l-2 border-[#c8ff2b] pl-4 text-sm leading-6 text-[#58776c]">Predictive outputs are decision support. They are reviewed alongside local knowledge, field observations, and the conditions people can see for themselves.</p>
              </div>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-[1.65rem] border border-[#123329]/15 bg-[#123329]/15 md:grid-cols-3">
              <article className="bg-[#f7f6ef] p-7 md:p-9">
                <div className="flex items-center justify-between"><span className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#6b887d]">01 / Inputs</span><Sprout className="h-5 w-5 text-[#113128]" /></div>
                <h3 className="mt-14 font-display text-3xl tracking-[-0.035em] text-[#113128]">Start with ground truth.</h3>
                <p className="mt-4 text-sm leading-7 text-[#4d6c62]">Field observations, soil and water context, crop progress, weather patterns, and operational history create the local record the model can learn from.</p>
              </article>
              <article className="bg-[#123329] p-7 text-white md:p-9">
                <div className="flex items-center justify-between"><span className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#c8ff2b]">02 / Interpretation</span><Satellite className="h-5 w-5 text-[#c8ff2b]" /></div>
                <h3 className="mt-14 font-display text-3xl tracking-[-0.035em] text-white">Find the change early.</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">Offline first AI compares current conditions with the season record to surface patterns that may deserve a closer look from a farmer or field team.</p>
              </article>
              <article className="bg-[#c8ff2b] p-7 text-[#113128] md:p-9">
                <div className="flex items-center justify-between"><span className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#3d5d50]">03 / Output</span><ArrowUpRight className="h-5 w-5 text-[#113128]" /></div>
                <h3 className="mt-14 font-display text-3xl tracking-[-0.035em]">Make the next move useful.</h3>
                <p className="mt-4 text-sm leading-7 text-[#38594d]">The result is a clear signal for review, such as a changing moisture pattern, crop stress concern, or food security risk that needs local attention.</p>
              </article>
            </div>

            <div className="mt-8 flex flex-col gap-5 border-t border-[#123329]/15 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-[#4d6c62]">Muons does not replace agronomists, growers, or public decision makers. It helps them see the evidence sooner and carry a trusted record forward.</p>
              <Link href="/solutions/offline-first-ai-for-farmers" className="inline-flex items-center gap-2 text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-[#113128]">Read the offline AI brief <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        <section id="edge-infrastructure" className="relative overflow-hidden bg-[#0b211b] px-5 py-24 text-white md:px-8 md:py-32">
          <div className="contours contours--dark absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
              <div>
                <p className="section-kicker section-kicker--light">Edge physical infrastructure</p>
                <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[0.93] tracking-[-0.05em] text-white md:text-7xl">Hardware that keeps the signal close to the field.</h2>
              </div>
              <div className="max-w-2xl lg:justify-self-end">
                <p className="text-[1.05rem] leading-8 text-white/72">Muons puts farmer first infrastructure where the data begins: at the field edge, in the collection point, and inside the daily operating rhythm of the people doing the work.</p>
                <p className="mt-5 border-l-2 border-[#c8ff2b] pl-4 text-sm leading-6 text-white/58">The physical layer is designed to extend useful intelligence into places where broadband, cloud access, or a smartphone cannot be assumed.</p>
              </div>
            </div>

            <div className="mt-16 grid gap-7 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[380px] overflow-hidden rounded-[1.7rem] bg-[#153b30] md:min-h-[475px]">
                <img src={edgeInfrastructureImage} alt="Rugged edge computing field node and soil sensor installed beside crop rows" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a15]/90 via-[#071a15]/15 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between border border-white/25 bg-[#0d2d24]/75 px-3 py-2 text-[0.56rem] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-sm"><span>Edge node / plot 07</span><span className="text-[#c8ff2b]">connected locally</span></div>
                <div className="absolute inset-x-6 bottom-6"><span className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#c8ff2b]">Physical layer / 01</span><h3 className="mt-3 max-w-md font-display text-4xl leading-[0.98] tracking-[-0.04em] text-white">The infrastructure begins where the observation happens.</h3></div>
              </div>
              <div className="grid gap-px overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/15 md:grid-cols-3">
                <article className="bg-[#123329] p-7 md:p-8"><div className="flex items-center justify-between"><span className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#c8ff2b]">01 / Sense</span><Sprout className="h-5 w-5 text-[#c8ff2b]" /></div><h3 className="mt-14 font-display text-3xl tracking-[-0.035em] text-white">Capture what matters.</h3><p className="mt-4 text-sm leading-7 text-white/65">Collect soil, water, crop, climate, and operational context without asking the farmer to translate the field into a dashboard first.</p></article>
                <article className="bg-[#173f33] p-7 md:p-8"><div className="flex items-center justify-between"><span className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#c8ff2b]">02 / Compute</span><Satellite className="h-5 w-5 text-[#c8ff2b]" /></div><h3 className="mt-14 font-display text-3xl tracking-[-0.035em] text-white">Keep intelligence close.</h3><p className="mt-4 text-sm leading-7 text-white/65">Support local processing and offline continuity so useful signals can remain available when network conditions change.</p></article>
                <article className="bg-[#c8ff2b] p-7 text-[#113128] md:p-8"><div className="flex items-center justify-between"><span className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#3d5d50]">03 / Carry</span><Check className="h-5 w-5 text-[#113128]" /></div><h3 className="mt-14 font-display text-3xl tracking-[-0.035em]">Keep the record moving.</h3><p className="mt-4 text-sm leading-7 text-[#38594d]">Carry trusted field records between people, devices, and connected moments without losing the context that made them valuable.</p></article>
              </div>
            </div>

            <div className="mt-8 grid gap-7 lg:grid-cols-[0.88fr_1.12fr]">
              <article className="overflow-hidden rounded-[1.7rem] border border-white/15 bg-[#f2f1e9] text-[#113128]">
                <div className="grid gap-0 md:grid-cols-[0.86fr_1.14fr]">
                  <div className="relative min-h-[300px] bg-[#183e33] md:min-h-full"><img src={edgeInfrastructureImage} alt="Root-zone soil sensor and rugged field node beside crops" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#071a15]/80 via-transparent to-transparent" /><span className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#0d2d24]/75 px-3 py-1 text-[0.57rem] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-sm">03 · Product</span><span className="absolute bottom-5 left-5 right-5 font-display text-3xl leading-[0.98] tracking-[-0.035em] text-white">Root Zone Physical AI.</span></div>
                  <div className="p-7 md:p-9"><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#6b887d]">Farmer product</p><h3 className="mt-4 font-display text-4xl leading-[0.98] tracking-[-0.04em]">A clearer read below the surface.</h3><p className="mt-5 text-sm leading-7 text-[#4d6c62]">A small field node watches the root zone, where moisture, salts, and nutrients shape the crop. The goal is simple: give farmers a useful picture of what the soil is doing before a problem becomes expensive.</p><div className="mt-7 grid gap-2 border-t border-[#123329]/15 pt-5 sm:grid-cols-2">{["20–40 cm root zone", "Moisture · pH · EC · salinity", "NPK trends", "LoRaWAN · edge · offline first"].map((item) => <span key={item} className="text-[0.63rem] font-bold uppercase tracking-[0.1em] text-[#55746a]">{item}</span>)}</div><p className="mt-7 border-l-2 border-[#c8ff2b] pl-4 text-sm leading-6 text-[#526f64]">Focus at pre seed: authenticated sensor data plus an offline AI copilot for the work already happening in the field.</p></div>
                </div>
              </article>
              <article className="rounded-[1.7rem] border border-white/15 bg-[#c8ff2b] p-7 text-[#113128] md:p-9"><div className="flex items-center justify-between border-b border-[#123329]/20 pb-4"><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#3e5f52]">Where Muons fits</p><span className="text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-[#3e5f52]">Field to finance</span></div><h3 className="mt-7 max-w-md font-display text-4xl leading-[0.98] tracking-[-0.04em]">The layer that helps good field decisions travel.</h3><div className="mt-8 space-y-5">{[["01", "Ground truth", "Root-zone sensors collect soil, water, crop, and forage context."],["02", "Useful action", "Offline AI helps turn field data into decisions: irrigate, fertilize, graze, harvest, treat, or document."],["03", "Trusted record", "Blockchain records can support tamper-evident, QR-verifiable history."],["04", "Earlier warning", "Permissioned macro data can support food-security awareness and waste reduction."]].map(([number, title, copy]) => <div key={number} className="grid grid-cols-[1.7rem_1fr] gap-3 border-t border-[#123329]/15 pt-4"><span className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#527366]">{number}</span><p className="text-sm leading-6 text-[#3f5f52]"><strong className="font-semibold text-[#113128]">{title}.</strong> {copy}</p></div>)}</div></article>
            </div>

            <article className="mt-8 rounded-[1.7rem] border border-white/15 bg-[#102d25] p-7 text-white md:p-9"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-[#c8ff2b]">06 · Farmer economics</p><h3 className="mt-5 max-w-xl font-display text-4xl leading-[0.98] tracking-[-0.04em]">Protect and increase farmer profitability.</h3><p className="mt-5 max-w-lg text-sm leading-7 text-white/65">A simple pilot benchmark: aim for 2.5% of crop value per acre through savings, protected value, and new revenue. These are pilot targets, not guarantees.</p></div><div className="grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:grid-cols-2"><div className="bg-[#173b31] p-5"><p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#c8ff2b]">Hardware benchmark</p><p className="mt-3 font-display text-3xl">$220 <span className="font-sans text-sm text-white/60">per node</span></p><p className="mt-2 text-sm text-white/60">12.35 acres watched per node · $3.56 per acre per year over five years.</p></div><div className="bg-[#173b31] p-5"><p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#c8ff2b]">Illustrative $1,000 acre</p><p className="mt-3 font-display text-3xl">~$21.44 <span className="font-sans text-sm text-white/60">net target</span></p><p className="mt-2 text-sm text-white/60">$10 saved · $10 protected · $5 new revenue · less $3.56 hardware benchmark.</p></div></div></div></article>
          </div>
        </section>

        <section id="cycle" className="relative overflow-hidden bg-[#e9e8df] px-5 py-24 md:px-8 md:py-32">
          <div className="absolute inset-y-0 right-0 w-[39%] border-l border-[#123329]/8 bg-[linear-gradient(135deg,transparent_25%,rgba(18,51,41,0.035)_25%,rgba(18,51,41,0.035)_50%,transparent_50%,transparent_75%,rgba(18,51,41,0.035)_75%)] bg-[size:28px_28px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="section-kicker">The season cycle</p>
                <h2 className="mt-6 max-w-xl font-display text-5xl leading-[0.94] tracking-[-0.05em] text-[#113128] md:text-6xl">From field observation to a stronger next move.</h2>
              </div>
              <p className="max-w-lg text-base leading-7 text-[#4d6c62] lg:justify-self-end">A useful system should clarify the work in front of people, then carry the record forward when the season turns. Muons keeps that cycle legible.</p>
            </div>
            <div className="mt-16 grid gap-px overflow-hidden border border-[#123329]/15 bg-[#123329]/15 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Observe", "Capture the practical context of the field, while it is happening."],
                ["02", "Interpret", "Bring scattered signals together into a read people can discuss."],
                ["03", "Coordinate", "Connect the next useful action across the people responsible for it."],
                ["04", "Carry forward", "Keep the season record available for the next decision, not buried in it."],
              ].map(([number, title, copy], index) => (
                <article key={number} className={`min-h-[245px] bg-[#e9e8df] p-7 transition-colors hover:bg-white md:p-8 ${index % 2 === 1 ? "lg:translate-y-7 lg:border-t lg:border-[#123329]/15" : ""}`}><div className="flex items-center justify-between"><span className="text-[0.68rem] font-extrabold tracking-[0.15em] text-[#5f7c72]">{number}</span><span className="text-[0.53rem] font-bold uppercase tracking-[0.12em] text-[#739087]">Season note</span></div><h3 className="mt-14 font-display text-3xl tracking-[-0.035em] text-[#113128]">{title}</h3><p className="mt-4 max-w-[15rem] text-sm leading-6 text-[#526f66]">{copy}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="outcomes" className="relative overflow-hidden bg-[#f7f6ef] px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="section-kicker">Outcomes that stay grounded</p>
                <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[0.94] tracking-[-0.05em] text-[#113128] md:text-6xl">
                  More confidence. Better timing. Stronger connection.
                </h2>
              </div>
              <p className="max-w-lg text-[1rem] leading-7 text-[#4e6b62] lg:justify-self-end">
                Muons is built around the decisions that have to happen season after season — from the individual growing block to the regional production plan.
              </p>
            </div>

            <div className="mt-14 grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem] bg-[#183e33] md:min-h-[515px]">
                <img src={aerialImage} alt="Aerial view of irrigated agricultural fields and crop patterns" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092019]/85 via-[#092019]/0 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between border border-white/25 bg-[#0e3127]/75 px-3 py-2 text-[0.56rem] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-sm"><span>Seasonal record / north block</span><span className="text-[#c8ff2b]">parcel 12A</span></div>
                <div className="absolute right-7 top-16 h-24 w-32 rounded-bl-[2rem] border-b border-l border-white/65" aria-hidden="true" />
                <div className="absolute right-7 top-44 flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.13em] text-white/85"><span className="h-1.5 w-1.5 rounded-full bg-[#c8ff2b]" /> irrigation line</div>
                <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
                  <span className="rounded-full border border-white/35 px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-white">Season view</span>
                  <h3 className="mt-5 max-w-md font-display text-[2.5rem] leading-[0.96] tracking-[-0.045em]">A fuller picture of every field, all season long.</h3>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-[1.8rem] bg-[#d9d8cd] p-7 md:p-10">
                <div>
                  <div className="flex items-center justify-between border-b border-[#123329]/15 pb-4">
                    <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.17em] text-[#547067]">Built around practice</p>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#c8ff2b] shadow-[0_0_0_5px_rgba(200,255,43,0.23)]" />
                  </div>
                  <div className="mt-7 space-y-7">
                    {[
                      ["Grow with context", "Use the detail beneath the aggregate to make local decisions that hold up."],
                      ["Coordinate with clarity", "Give field teams, advisors, and partners one useful operating picture."],
                      ["Protect the next season", "Carry learning forward instead of restarting the conversation every year."],
                    ].map(([title, copy], index) => (
                      <div key={title} className="grid grid-cols-[1.85rem_1fr] gap-3">
                        <span className="pt-0.5 text-[0.72rem] font-extrabold tracking-[0.14em] text-[#739087]">0{index + 1}</span>
                        <div>
                          <h3 className="font-display text-2xl tracking-[-0.03em] text-[#113128]">{title}</h3>
                          <p className="mt-2 max-w-sm text-sm leading-6 text-[#4d6a60]">{copy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 border-t border-[#123329]/15 pt-6">
                  <div className="relative"><img src={harvestImage} alt="Farmers examining a fresh corn harvest in the field" loading="lazy" decoding="async" className="h-28 w-full rounded-xl object-cover object-center" /><span className="absolute bottom-2 left-2 rounded-sm bg-[#102d25]/85 px-2 py-1 text-[0.52rem] font-extrabold uppercase tracking-[0.12em] text-white">Harvest note / shared learning</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="regenerative" className="relative overflow-hidden bg-[#ecede3] px-5 py-24 md:px-8 md:py-32">
          <div className="absolute left-0 top-0 h-full w-full opacity-[0.045] [background-image:radial-gradient(#123329_1px,transparent_1px)] [background-size:15px_15px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
              <div>
                <p className="section-kicker">Regenerative agriculture</p>
                <h2 className="mt-6 max-w-xl font-display text-5xl leading-[0.93] tracking-[-0.05em] text-[#113128] md:text-7xl">Healthy soil is the foundation of every strong season.</h2>
              </div>
              <div className="max-w-2xl lg:justify-self-end">
                <p className="text-[1.05rem] leading-8 text-[#49685e]">Regenerative agriculture starts with paying attention to the soil. Cover it, care for it, use water thoughtfully, and learn from each season. Muons helps you keep those observations together so the work you are doing today can strengthen the seasons ahead.</p>
                <p className="mt-5 border-l-2 border-[#c8ff2b] pl-4 text-sm leading-6 text-[#4f6d63]">There is no single right way to care for a farm. The important thing is seeing what is working and carrying that learning forward.</p>
              </div>
            </div>

            <div className="mt-16 grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative overflow-hidden rounded-[1.7rem] bg-[#123329] p-7 text-white md:p-10">
                <div className="contours contours--dark absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4"><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-[#c8ff2b]">American field record</p><span className="rounded-full border border-white/20 px-3 py-1 text-[0.56rem] font-bold uppercase tracking-[0.13em] text-white/67">Growing season</span></div>
                  <div className="mt-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg border border-[#c8ff2b]/45 bg-black/15 p-1"><img src={muonsSymbol} alt="" className="h-full w-full object-contain" /></span><span className="text-[0.57rem] font-extrabold uppercase tracking-[0.16em] text-white/55">Muons record stamp / stewardship log</span></div>
                  <h3 className="mt-8 max-w-lg font-display text-4xl leading-[0.98] tracking-[-0.04em] text-white">The practices are local. The learning should travel.</h3>
                  <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:grid-cols-2">
                    {[
                      ["Soil cover", "Capture the season’s on-the-ground notes around soil condition and field cover."],
                      ["Water awareness", "Connect irrigation activity and moisture observations to the decisions made."],
                      ["Living diversity", "Keep a record of rotations, borders, and field changes worth carrying forward."],
                      ["Season reflection", "Compare what was observed with what the team will try next."],
                    ].map(([title, copy], index) => (
                      <article key={title} className="bg-[#123329]/95 p-5"><span className="text-[0.58rem] font-extrabold tracking-[0.14em] text-[#c8ff2b]">0{index + 1}</span><h4 className="mt-7 font-display text-2xl tracking-[-0.03em] text-white">{title}</h4><p className="mt-3 text-sm leading-6 text-white/60">{copy}</p></article>
                    ))}
                  </div>
                </div>
              </div>
              <aside className="rounded-[1.7rem] border border-[#123329]/12 bg-[#d6d8c9] p-7 md:p-10">
                <div className="flex items-center justify-between border-b border-[#123329]/15 pb-4"><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-[#44675c]">What Muons contributes</p><span className="h-2.5 w-2.5 rounded-full bg-[#c8ff2b] shadow-[0_0_0_5px_rgba(200,255,43,0.23)]" /></div>
                <div className="mt-8 space-y-7">
                  {[
                    ["A useful seasonal record", "Keep practical observations from disappearing when teams, seasons, or locations change."],
                    ["A shared field conversation", "Give growers, advisors, and operators a common basis for discussing what was seen and done."],
                    ["A clearer market story", "Organize stewardship notes into a more coherent record for programs, partners, and future decisions."],
                  ].map(([title, copy], index) => <div key={title} className="grid grid-cols-[1.75rem_1fr] gap-3"><span className="pt-0.5 text-[0.7rem] font-extrabold tracking-[0.14em] text-[#738f84]">0{index + 1}</span><div><h3 className="font-display text-2xl tracking-[-0.03em] text-[#113128]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#4e6d63]">{copy}</p></div></div>)}
                </div>
                <div className="mt-10 border-t border-[#123329]/15 pt-5">
                  <div className="flex items-center justify-between text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-[#58766b]"><span>Field record / stewardship log</span><span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-[#c8ff2b]" /> ready to review</span></div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="border border-[#123329]/12 bg-white/25 p-3"><p className="text-[0.56rem] font-extrabold uppercase tracking-[0.13em] text-[#607e73]">Record inputs</p><p className="mt-2 text-sm font-semibold text-[#17382e]">Soil · water · crop notes</p></div>
                    <div className="border border-[#123329]/12 bg-white/25 p-3"><p className="text-[0.56rem] font-extrabold uppercase tracking-[0.13em] text-[#607e73]">Shared with</p><p className="mt-2 text-sm font-semibold text-[#17382e]">Growers · advisors · teams</p></div>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-[#58766b]">A stronger seasonal record leaves the next conversation with more context than the last.</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="security" className="relative overflow-hidden bg-[#0b211b] px-5 py-24 text-white md:px-8 md:py-32">
          <div className="contours absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="absolute right-[-4rem] top-20 h-72 w-72 rounded-full border border-[#c8ff2b]/15" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <div>
                <p className="section-kicker section-kicker--light">Blockchain &amp; quantum security</p>
                <h2 className="mt-6 max-w-2xl font-display text-5xl leading-[0.92] tracking-[-0.05em] text-white md:text-7xl">Trust matters when the record needs to travel.</h2>
              </div>
              <div className="max-w-2xl lg:justify-self-end">
                <p className="text-[1.05rem] leading-8 text-white/72">Muons is shaping farmer-first edge infrastructure around record integrity: offline AI at the point of work, blockchain-backed continuity, and a clear chain of ground events that can be reviewed and carried forward.</p>
                <p className="mt-5 border-l-2 border-[#c8ff2b] pl-4 text-sm leading-6 text-white/56">The goal is practical trust — not complexity for its own sake. Farmers and operators should be able to understand what was recorded, when it changed, and why it matters.</p>
              </div>
            </div>

            <div className="mt-16 grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <div className="grid h-full gap-px overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/15 md:grid-cols-3">
                {trustStages.map((stage, index) => index === 1 ? (
                  <article key={stage.number} className="group relative h-full min-h-[370px] overflow-hidden bg-[#173f33] p-7 md:p-8">
                    <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full border border-[#c8ff2b]/15 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                    <div className="relative flex items-center justify-between"><span className="text-[0.68rem] font-extrabold tracking-[0.15em] text-[#c8ff2b]">{stage.number}</span><span className="flex items-center gap-2 text-[0.52rem] font-bold uppercase tracking-[0.12em] text-white/40"><i className="h-1.5 w-1.5 rounded-full bg-[#c8ff2b]" />record flow</span></div>
                    <h3 className="relative mt-14 font-display text-3xl tracking-[-0.035em] text-white">{stage.title}</h3>
                    <p className="relative mt-4 text-sm leading-6 text-white/63">{stage.copy}</p>
                    <div className="relative mt-8 border-t border-white/15 pt-4"><p className="text-[0.52rem] font-extrabold uppercase tracking-[0.13em] text-white/42">Continuity note</p><p className="mt-3 text-xs leading-5 text-white/55">Preserve the link between what happened, when it happened, and the decisions that follow.</p></div>
                  </article>
                ) : (
                  <article key={stage.number} className="group relative h-full min-h-[370px] overflow-hidden bg-[#0b211b] p-7 md:p-8">
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-[#c8ff2b]/10 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                    <div className="relative flex items-center justify-between"><span className="text-[0.68rem] font-extrabold tracking-[0.15em] text-[#c8ff2b]">{stage.number}</span><span className="flex items-center gap-2 text-[0.52rem] font-bold uppercase tracking-[0.12em] text-white/40"><i className="h-1.5 w-1.5 rounded-full bg-[#c8ff2b]" />record flow</span></div>
                    <h3 className="relative mt-14 font-display text-3xl tracking-[-0.035em] text-white">{stage.title}</h3>
                    <p className="relative mt-4 text-sm leading-6 text-white/63">{stage.copy}</p>
                    <div className="relative mt-8 border-t border-white/15 pt-4"><p className="text-[0.52rem] font-extrabold uppercase tracking-[0.13em] text-white/42">{stage.label}</p><div className="mt-4 flex flex-wrap gap-1.5">{stage.details.map((detail) => <span key={detail} className="border border-white/15 bg-black/10 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-white/63">{detail}</span>)}</div></div>
                  </article>
                ))}
              </div>
              <aside className="relative h-full overflow-hidden rounded-[1.7rem] border border-[#c8ff2b]/25 bg-[#11342a] p-7 md:p-9">
                <div className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-lg border border-[#c8ff2b]/45 bg-black/15 p-1"><img src={muonsSymbol} alt="" className="h-full w-full object-contain" /></div>
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-[#c8ff2b]">Security posture</p>
                <h3 className="mt-7 max-w-md font-display text-4xl leading-[0.98] tracking-[-0.04em] text-white">Prepared to evolve as the threat landscape does.</h3>
                <div className="mt-8 space-y-5 border-t border-white/15 pt-6">
                  <div className="grid grid-cols-[1.7rem_1fr] gap-3"><span className="text-[0.7rem] font-extrabold tracking-[0.14em] text-[#c8ff2b]">01</span><p className="text-sm leading-6 text-white/67"><strong className="font-semibold text-white">Identity-aware design.</strong> Security planning starts by protecting how people, devices, and records relate.</p></div>
                  <div className="grid grid-cols-[1.7rem_1fr] gap-3"><span className="text-[0.7rem] font-extrabold tracking-[0.14em] text-[#c8ff2b]">02</span><p className="text-sm leading-6 text-white/67"><strong className="font-semibold text-white">Quantum-resilient planning.</strong> Architecture should be ready to adopt stronger cryptographic standards as they mature.</p></div>
                  <div className="grid grid-cols-[1.7rem_1fr] gap-3"><span className="text-[0.7rem] font-extrabold tracking-[0.14em] text-[#c8ff2b]">03</span><p className="text-sm leading-6 text-white/67"><strong className="font-semibold text-white">Plain-language trust.</strong> A sound security approach should make the record easier to trust, not harder to use.</p></div>
                </div>
                <p className="mt-8 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white/40">Architecture direction — not a claim of certification or invulnerability.</p>
              </aside>
            </div>
          </div>
        </section>


        <section id="muons" className="relative overflow-hidden bg-[#102f26] px-5 py-24 text-white md:px-8 md:py-32">
          <div className="contours contours--dark absolute inset-0 opacity-25" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="section-kicker section-kicker--light">About Muons</p>
                <h2 className="mt-6 font-display text-5xl leading-[0.92] tracking-[-0.05em] text-white md:text-7xl">American edge infrastructure for a <span className="text-[#c8ff2b]">food-secure future.</span></h2>
              </div>
              <p className="max-w-2xl text-[1.05rem] leading-8 text-white/73 lg:justify-self-end">Muons Technology is an American patent-pending edge hardware infrastructure company building global food security through offline-first AI, blockchain, and farmer-first physical infrastructure. We use ground agriculture data to help identify food-insecurity risk early.</p>
            </div>

            <div className="grid gap-px bg-white/15 md:grid-cols-3">
              <article className="bg-[#102f26] p-7 md:p-9">
                <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-[#c8ff2b]">01 / Who we are</span>
                <h3 className="mt-8 font-display text-3xl tracking-[-0.035em] text-white">Infrastructure that works at the edge.</h3>
                <p className="mt-5 text-sm leading-7 text-white/66">We bring durable sensing, offline intelligence, and trusted records to the places where connectivity and technical capacity cannot be assumed.</p>
              </article>
              <article className="bg-[#163a30] p-7 md:p-9">
                <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-[#c8ff2b]">02 / Mission</span>
                <h3 className="mt-8 font-display text-3xl tracking-[-0.035em] text-white">Global food security begins with ground truth.</h3>
                <p className="mt-5 text-sm leading-7 text-white/66">The next generation of ag-tech should meet farmers where they are: in the field, at the edge, and often offline.</p>
              </article>
              <article className="bg-[#102f26] p-7 md:p-9">
                <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-[#c8ff2b]">03 / What we do</span>
                <h3 className="mt-8 font-display text-3xl tracking-[-0.035em] text-white">Farmer-first physical infrastructure.</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-white/66">
                  <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8ff2b]" />Build edge hardware and records for disconnected rural environments.</li>
                  <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8ff2b]" />Combine ground agriculture data with offline-first AI to surface practical early-warning signals.</li>
                  <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8ff2b]" />Connect physical infrastructure, AI, and blockchain without putting the burden on the farmer.</li>
                </ul>
              </article>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-7 rounded-[1.45rem] border border-white/15 bg-white/[0.05] p-7 md:flex-row md:items-end md:p-9">
              <div><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-[#c8ff2b]">Headquartered in Delaware</p><p className="mt-4 max-w-2xl font-display text-3xl leading-[0.98] tracking-[-0.03em] text-white">Building values-led agricultural infrastructure with a global operating perspective.</p></div>
              <div className="border-l-2 border-[#c8ff2b] pl-4 text-sm font-bold text-white/72"><p>Delaware, USA</p><p className="mt-1 text-white/45">Email address to be confirmed</p></div>
            </div>
          </div>
        </section>

        <section id="team" className="relative overflow-hidden bg-[#f7f6ef] px-5 py-24 md:px-8 md:py-32">
          <div className="absolute left-[-10rem] top-24 h-80 w-80 rounded-full border border-[#123329]/10" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div><div className="flex items-center justify-between gap-4"><p className="section-kicker">Muons leadership</p><span className="flex items-center gap-2 text-[0.52rem] font-extrabold uppercase tracking-[0.13em] text-[#58776c]"><span className="grid h-7 w-7 place-items-center rounded-md border border-[#123329]/20 bg-white/50 p-0.5"><img src={muonsSymbol} alt="" className="h-full w-full object-contain" /></span>Leadership dossier / 03</span></div><h2 className="mt-6 max-w-xl font-display text-5xl leading-[0.93] tracking-[-0.05em] text-[#113128] md:text-7xl">People building agricultural infrastructure with Muons.</h2></div>
              <p className="max-w-2xl text-[1.02rem] leading-8 text-[#4e6c62] lg:justify-self-end">A multidisciplinary team spanning digital transformation, secure systems, global operations, and agricultural infrastructure. Each portrait is presented as an approved record in the Muons leadership dossier.</p>
            </div>

            <div className="mt-16 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {leaders.map((leader, index) => (
                <article key={leader.name} className={`group overflow-hidden rounded-[1.5rem] border border-[#123329]/12 bg-[#e6e6dc] transition-transform duration-300 hover:-translate-y-1 ${index === 1 ? "xl:mt-10" : index === 2 ? "xl:mt-5" : ""}`}>
                  <div className={`relative aspect-[4/5] overflow-hidden border-b border-[#123329]/12 ${index % 2 === 0 ? "bg-[#153b30] text-white" : "bg-[#d4d7c7] text-[#113128]"}`}>
                    {leader.image ? <><img src={leader.image} alt={`${leader.name}, ${leader.role}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-[#0b211b]/82 via-[#0b211b]/5 to-transparent" /></> : <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(135deg,transparent_30%,rgba(200,255,43,0.22)_30%,rgba(200,255,43,0.22)_31%,transparent_31%)] [background-size:34px_34px]" aria-hidden="true" />}
                    <div className="absolute inset-5 flex items-center justify-between border-b border-current/20 pb-3 text-[0.54rem] font-extrabold uppercase tracking-[0.13em] opacity-70"><span>Muons dossier</span><span>Record 0{index + 1}</span></div>
                    {!leader.image && <div className="absolute inset-0 grid place-items-center"><span className={`grid h-24 w-24 place-items-center rounded-full border text-4xl font-display ${index % 2 === 0 ? "border-[#c8ff2b]/60 bg-black/15 text-[#c8ff2b]" : "border-[#113128]/25 bg-white/20 text-[#113128]"}`}>{leader.initials}</span></div>}
                    <p className="absolute inset-x-5 bottom-5 text-[0.55rem] font-bold uppercase tracking-[0.12em] opacity-70">{leader.image ? "Approved portrait / leadership file" : "Portrait pending / record slot"}</p>
                  </div>
                  <div className="p-6"><p className="text-[0.62rem] font-extrabold uppercase tracking-[0.15em] text-[#607e73]">{leader.role}</p><h3 className="mt-3 font-display text-3xl tracking-[-0.035em] text-[#113128]">{leader.name}</h3><p className="mt-4 text-sm leading-6 text-[#4e6d63]">{leader.bio}</p><a href={leader.linkedin} target="_blank" rel="noreferrer" className="group/link mt-6 inline-flex items-center gap-2 text-[0.62rem] font-extrabold uppercase tracking-[0.13em] text-[#113128]">LinkedIn profile <ArrowUpRight className="h-3.5 w-3.5 text-[#739087] transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" /></a></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-[#123329] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#c8ff2b]/20" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="section-kicker section-kicker--light">Grow the conversation</p>
              <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[0.92] tracking-[-0.05em] text-white md:text-7xl">
                Ready for a more useful view of the season?
              </h2>
              <p className="mt-9 max-w-xl text-xl font-semibold leading-8 text-[#c8ff2b] md:text-2xl">Start a grounded infrastructure conversation for the season ahead.</p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">For growers, cooperatives, public institutions, and mission aligned partners building more resilient food systems, Muons turns ground signals into infrastructure teams can act on.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm md:p-8">
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-[#c8ff2b]">Contact Muons Technology</p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">Tell us what you are building, measuring, or trying to make more resilient. We will use the context to route the conversation well.</p>
              {contactSubmitted ? (
                <div className="mt-6 border-l-2 border-[#c8ff2b] bg-[#0c261f]/70 px-5 py-4" role="status">
                  <p className="text-sm font-bold text-white">Your message is prepared.</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">The recipient inbox is not connected yet. Confirm the Muons contact email and this form can be wired to deliver submissions.</p>
                  <button type="button" onClick={() => setContactSubmitted(false)} className="mt-4 text-[0.65rem] font-extrabold uppercase tracking-[0.13em] text-[#c8ff2b] hover:text-white">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleContact} className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-white/65">Name</label>
                    <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className="w-full rounded-xl border border-white/20 bg-[#0c261f] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#c8ff2b] focus:ring-2 focus:ring-[#c8ff2b]/20" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-white/65">Work email</label>
                    <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="w-full rounded-xl border border-white/20 bg-[#0c261f] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#c8ff2b] focus:ring-2 focus:ring-[#c8ff2b]/20" />
                  </div>
                  <div>
                    <label htmlFor="contact-organization" className="mb-2 block text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-white/65">Organization</label>
                    <input id="contact-organization" name="organization" type="text" autoComplete="organization" placeholder="Farm, cooperative, institution" className="w-full rounded-xl border border-white/20 bg-[#0c261f] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#c8ff2b] focus:ring-2 focus:ring-[#c8ff2b]/20" />
                  </div>
                  <div>
                    <label htmlFor="contact-interest" className="mb-2 block text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-white/65">Conversation area</label>
                    <select id="contact-interest" name="interest" defaultValue="" className="w-full rounded-xl border border-white/20 bg-[#0c261f] px-4 py-3.5 text-sm text-white outline-none focus:border-[#c8ff2b] focus:ring-2 focus:ring-[#c8ff2b]/20">
                      <option value="" disabled>Select one</option>
                      <option value="edge-infrastructure">Edge infrastructure</option>
                      <option value="offline-ai">Offline-first AI</option>
                      <option value="trusted-records">Blockchain and trusted records</option>
                      <option value="partnership">Partnership or investment</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="mb-2 block text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-white/65">Message</label>
                    <textarea id="contact-message" name="message" required rows={4} placeholder="What would you like to make more useful at the edge?" className="w-full resize-y rounded-xl border border-white/20 bg-[#0c261f] px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-white/40 focus:border-[#c8ff2b] focus:ring-2 focus:ring-[#c8ff2b]/20" />
                  </div>
                  <div className="flex flex-col gap-3 pt-1 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-white/48">No marketing list. Just the context needed for a useful reply.</p>
                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c8ff2b] px-5 py-3.5 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-[#113128] transition hover:bg-white active:scale-[0.97]">Send inquiry <ArrowUpRight className="h-3.5 w-3.5" /></button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0c261f] px-5 py-6 text-white/56 md:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 text-[0.67rem] font-bold uppercase tracking-[0.13em] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><img src={muonsLogo} alt="Muons Technology" className="h-auto w-44 object-contain" /><span className="hidden text-white/55 sm:inline">Agricultural infrastructure</span></div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/solutions/edge-agriculture-infrastructure" className="transition-colors hover:text-[#c8ff2b]">Edge infrastructure</Link>
            <Link href="/solutions/offline-first-ai-for-farmers" className="transition-colors hover:text-[#c8ff2b]">Offline-first AI</Link>
            <Link href="/solutions/blockchain-agricultural-records" className="transition-colors hover:text-[#c8ff2b]">Trusted records</Link>
            <Link href="/insights/early-food-insecurity-signals" className="transition-colors hover:text-[#c8ff2b]">Food security field note</Link>
          </div>
          <p>© 2026 Muons Technology. Built for the growing edge.</p>
        </div>
      </footer>
    </div>
  );
}
