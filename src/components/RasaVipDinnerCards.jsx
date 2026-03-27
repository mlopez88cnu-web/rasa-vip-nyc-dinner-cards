import { useState, useRef, useCallback, useEffect } from "react";

/* ── Embedded SVG brand marks ── */
const logos = {
  "Citi": (s) => (
    <svg viewBox="0 0 52 52" width={s} height={s}>
      <rect width="52" height="52" rx="12" fill="#003DA5"/>
      <text x="26" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="16" fill="#ffffff">Citi</text>
      <path d="M18 16 L26 10 L34 16" stroke="#E31837" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  "Wells Fargo": (s) => (
    <svg viewBox="0 0 52 52" width={s} height={s}>
      <rect width="52" height="52" rx="12" fill="#D71E28"/>
      <text x="26" y="32" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="10" fill="#ffffff" letterSpacing="0.5">WELLS</text>
      <rect x="12" y="36" width="28" height="2" rx="1" fill="#FFCD11"/>
    </svg>
  ),
  "Northwestern Mutual": (s) => (
    <svg viewBox="0 0 52 52" width={s} height={s}>
      <rect width="52" height="52" rx="12" fill="#003366"/>
      <text x="26" y="32" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="16" fill="#ffffff">NM</text>
    </svg>
  ),
  "Pfizer": (s) => (
    <svg viewBox="0 0 52 52" width={s} height={s}>
      <rect width="52" height="52" rx="12" fill="#0093D0"/>
      <text x="26" y="33" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="12" fill="#ffffff" letterSpacing="0.5">Pfizer</text>
    </svg>
  ),
  "JP Morgan": (s) => (
    <svg viewBox="0 0 52 52" width={s} height={s}>
      <rect width="52" height="52" rx="12" fill="#00205B"/>
      <text x="26" y="27" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="18" fill="#ffffff">JPM</text>
      <rect x="12" y="33" width="28" height="1.5" rx="0.75" fill="#ffffff" opacity="0.4"/>
      <rect x="16" y="37" width="20" height="1.5" rx="0.75" fill="#ffffff" opacity="0.25"/>
    </svg>
  ),
  "Wakefern Food Corp": (s) => (
    <svg viewBox="0 0 52 52" width={s} height={s}>
      <rect width="52" height="52" rx="12" fill="#D32F2F"/>
      <text x="26" y="32" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="10" fill="#ffffff" letterSpacing="0.5">WFC</text>
    </svg>
  ),
};

function CompanyLogo({ company, size = 52 }) {
  const renderLogo = logos[company];
  if (renderLogo) return <div style={{ flexShrink: 0, lineHeight: 0 }}>{renderLogo(size)}</div>;
  const initials = company.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 12,
      background: "linear-gradient(135deg, #1a1b2e 0%, #252640 100%)",
      border: "1px solid #2a2d45",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono', monospace", fontSize: size * 0.33,
      fontWeight: 700, color: "#7c5cfc", flexShrink: 0,
    }}>{initials}</div>
  );
}

/* ── Guest data ── */
const guests = [
  {
    name: "Srini Masanam",
    photoUrl: "/headshots/Srini Masanam.jpeg",
    title: "Global Head of Surveillance and Data Quality",
    company: "Citi",
    industry: "Financial Services",
    aiStage: "Scaling",
    buildVsBuy: "Mixed",
    agenticReadiness: "High",
    companyBrief: "Citi is aggressively scaling production-grade Generative AI and agentic systems across capital markets and operational functions. They utilize a mixed build/buy approach leveraging open-source models and major vendors like OpenAI and Anthropic, while prioritizing advanced RAG architectures and autonomous agents.",
    conversationStarters: [
      "Citi is actively hiring for roles architecting agentic AI systems using LangChain, LangGraph, and AutoGen — ask how his surveillance domain fits into their autonomous financial modeling vision.",
      "As Global Head of Surveillance and Data Quality, explore how AI-driven data quality intersects with Citi's production RAG pipelines.",
      "Citi's agentic AI frameworks for capital markets are among the most advanced on Wall Street — a direct opening for Rasa's orchestration capabilities."
    ],
    hasLinkedIn: false,
  },
  {
    name: "Bijit Ghosh",
    photoUrl: "/headshots/Bijit Ghosh.jpeg",
    title: "Managing Director AI/ML/Cloud",
    company: "Wells Fargo",
    industry: "Banking & Financial Services",
    aiStage: "Optimizing",
    buildVsBuy: "Mixed",
    agenticReadiness: "High",
    companyBrief: "Wells Fargo has deployed a production-scale virtual assistant 'Fargo' handling over 245 million interactions and is an early adopter of Google Agentspace for employee-facing agents. They've used networks of interacting agents to autonomously re-underwrite 15 years of archived loan documents.",
    conversationStarters: [
      "He's been engaging with enterprise AI agent content, including Coinbase's rapid deployment using LangSmith — ask how Wells Fargo's agent architecture compares and where orchestration gaps remain.",
      "He's tracking LLM reasoning benchmarks like GPT-5 with REPL environments — explore how Wells Fargo evaluates model capabilities for production financial workflows.",
      "Wells Fargo's multi-agent loan re-underwriting system is a standout use case — a natural bridge to Rasa's multi-agent orchestration story."
    ],
    hasLinkedIn: true,
  },
  {
    name: "Asaf Bord",
    photoUrl: "/headshots/Asaf Bord.jpeg",
    title: "GenAI Products",
    company: "Northwestern Mutual",
    industry: "Insurance & Financial Services",
    aiStage: "Scaling",
    buildVsBuy: "Mixed",
    agenticReadiness: "Medium",
    companyBrief: "Northwestern Mutual has integrated AI into production for automated underwriting and advisor recommendations, supported by a centralized Data Science Institute and an internal AI Council for governance. Currently piloting generative AI 'copilots' to enhance advisor productivity.",
    conversationStarters: [
      "He's been sharing insights on RAG testing with LLMs and scaling AI ecosystem testing — ask how Northwestern Mutual approaches quality assurance for their production AI systems.",
      "He's speaking at the AI Engineer Code Summit in NYC — explore what topics he's covering and how they relate to Northwestern Mutual's GenAI product roadmap.",
      "He's actively hiring a Product Lead with a technical background — a signal they're scaling their GenAI team. Great opening for how Rasa fits into their growing stack."
    ],
    hasLinkedIn: true,
  },
  {
    name: "Eugenia Zeibig",
    photoUrl: "/headshots/Eugenia Zeibig.jpeg",
    title: "Marketing Analytics Strategy & Innovation Lead",
    company: "Pfizer",
    industry: "Pharmaceuticals & Life Sciences",
    aiStage: "Scaling",
    buildVsBuy: "Mixed",
    agenticReadiness: "Medium",
    companyBrief: "Pfizer has launched a production generative AI consumer product ('Health Answers') and integrated AI/ML into core clinical trial workflows. A significant partnership with AWS supports their mixed build/buy strategy for production-grade AI governance and R&D acceleration.",
    conversationStarters: [
      "Pfizer's 'Health Answers' platform is a generative AI-powered consumer health interface — ask how the marketing analytics team measures and optimizes AI-driven consumer engagement.",
      "As Marketing Analytics Strategy & Innovation Lead, explore how she sees AI transforming pharmaceutical marketing beyond traditional analytics.",
      "Pfizer's deep AI integration in clinical trials creates unique data governance challenges — a natural bridge to discuss how Rasa's orchestration handles regulated workflows."
    ],
    hasLinkedIn: false,
  },
  {
    name: "Farrah Fogarty",
    photoUrl: "/headshots/Farrah Fogarty.jpeg",
    title: "Senior Vice President (SVP), AI Business Strategist - Consumer",
    company: "Citi",
    industry: "Financial Services",
    aiStage: "Scaling",
    buildVsBuy: "Mixed",
    agenticReadiness: "High",
    companyBrief: "Citi is aggressively scaling production-grade generative and agentic AI solutions for capital markets and consumer banking. With high agentic readiness and a mixed build/buy strategy, they are actively hiring specialized talent to deploy autonomous workflows and scalable LLM-driven data pipelines.",
    conversationStarters: [
      "She's engaged with Bloomberg House Davos content and leadership evolution discussions — a great opener about how AI is reshaping leadership and strategy in consumer banking.",
      "As SVP and AI Business Strategist for Consumer, ask how Citi's consumer division prioritizes which agentic workflows to bring to production first.",
      "Citi has published detailed reports on agentic AI architectures — explore how her consumer-focused strategy aligns with the firm's broader autonomous AI vision."
    ],
    hasLinkedIn: true,
  },
  {
    name: "Nikit Assudani",
    photoUrl: "/headshots/Nikit Assudani.jpeg",
    title: "Vice President: Multi-Cloud Product & Risk Delivery Manager",
    company: "JP Morgan",
    industry: "Financial Services",
    aiStage: "Scaling",
    buildVsBuy: "Mixed",
    agenticReadiness: "High",
    companyBrief: "J.P. Morgan has a dedicated Machine Learning Center of Excellence with over 200 specialists and has deployed a proprietary 'LLM Suite' for internal software development workflows. They focus on internal development for sensitive use cases while integrating external AI tools for developer productivity.",
    conversationStarters: [
      "He's preparing a new season of an AI-focused podcast — ask what topics he's most excited about and what guests would be compelling. A light, personal opener.",
      "J.P. Morgan's 'LLM Suite' functions as a developer copilot for code generation, testing, and brainstorming — explore how multi-cloud infrastructure supports their AI scaling ambitions.",
      "He's engaged with application incident response content — a practical bridge to discuss how agentic AI could automate incident detection and resolution at scale."
    ],
    hasLinkedIn: true,
  },
  {
    name: "Dylan Martis",
    photoUrl: "/headshots/Dylan Martis.jpeg",
    title: "Associate Manager, AI Initiatives",
    company: "Wakefern Food Corp",
    industry: "Retail & Food Distribution",
    aiStage: "Experimenting",
    buildVsBuy: "Buying",
    agenticReadiness: "High",
    companyBrief: "Wakefern is aggressively modernizing retail operations by deploying vendor-led AI solutions for fresh supply chain management and customer loyalty personalization. They are implementing Afresh's 'Fresh Buying' solution which uses AI agents to orchestrate forecasting, vendor selection, and truck building.",
    conversationStarters: [
      "He's been engaging with AI product management learning resources — ask what frameworks he's found most useful as Wakefern builds out their AI initiatives function.",
      "He's enthusiastic about AI in the supply chain — Wakefern's Afresh deployment with AI agents for fresh buying is a direct match for discussing Rasa's orchestration capabilities.",
      "Wakefern's major loyalty go-live is expected mid-2026 — explore what role AI personalization plays and how conversational AI could enhance the customer experience."
    ],
    hasLinkedIn: true,
  },
];

/* ── Styling helpers ── */
const readinessColor = (level) => {
  if (level === "High") return { bg: "#1a3a2a", text: "#4ade80", border: "#2d6b47" };
  if (level === "Medium") return { bg: "#3a2f1a", text: "#fbbf24", border: "#6b5a2d" };
  return { bg: "#3a1a1a", text: "#f87171", border: "#6b2d2d" };
};

const stageColor = (stage) => {
  if (stage === "Scaling") return { bg: "#1a2a3a", text: "#60a5fa", border: "#2d4a6b" };
  if (stage === "Optimizing") return { bg: "#1a2a2a", text: "#2dd4bf", border: "#2d5a4a" };
  if (stage === "Experimenting") return { bg: "#2a1a3a", text: "#c084fc", border: "#4a2d6b" };
  return { bg: "#2a1a3a", text: "#c084fc", border: "#4a2d6b" };
};

function Badge({ label, value, colorFn }) {
  const c = colorFn(value);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 6, fontSize: 12,
      fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
      letterSpacing: "0.03em", background: c.bg, color: c.text,
      border: `1px solid ${c.border}`,
    }}>
      <span style={{ opacity: 0.6, fontWeight: 400, textTransform: "uppercase", fontSize: 10 }}>{label}</span>
      {value}
    </span>
  );
}

function ProfilePhoto({ url, name, size = 52 }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  if (!url || failed) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: "linear-gradient(135deg, #252640 0%, #1a1b2e 100%)",
        border: "2px solid #2a2d45",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: size * 0.33,
        fontWeight: 700, color: "#7c5cfc", flexShrink: 0,
      }}>{initials}</div>
    );
  }

  return (
    <img
      src={url}
      alt={name}
      onError={() => setFailed(true)}
      style={{
        width: size, height: size, borderRadius: "50%",
        objectFit: "cover", flexShrink: 0,
        border: "2px solid #2a2d45",
      }}
    />
  );
}

function GuestCard({ guest, index, total }) {
  return (
    <div style={{
      background: "#0f1117", border: "1px solid #1e2030", borderRadius: 16,
      padding: "clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px) clamp(20px, 4vw, 32px)",
      maxWidth: 720, margin: "0 auto 32px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, #7c5cfc 0%, #5b8def 50%, #4ade80 100%)",
      }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <ProfilePhoto url={guest.photoUrl} name={guest.name} size={80} />
            <CompanyLogo company={guest.company} size={36} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 700, color: "#f0f0f5",
              lineHeight: 1.2, marginBottom: 4,
            }}>{guest.name}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(11px, 2.5vw, 13px)", color: "#8b8fa3", marginBottom: 2,
              wordWrap: "break-word",
            }}>{guest.title}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(11px, 2.5vw, 14px)", color: "#7c5cfc", fontWeight: 600,
            }}>
              {guest.company}
              <span style={{ color: "#3a3d50", margin: "0 8px" }}>|</span>
              <span style={{ color: "#5a5d70", fontWeight: 400, fontSize: "clamp(10px, 2vw, 12px)" }}>{guest.industry}</span>
            </div>
          </div>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: "#3a3d50", textAlign: "right", paddingTop: 4, flexShrink: 0,
        }}>{index + 1} / {total}</div>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        <Badge label="AI Stage" value={guest.aiStage} colorFn={stageColor} />
        <Badge label="Agentic" value={guest.agenticReadiness} colorFn={readinessColor} />
        <Badge label="Strategy" value={guest.buildVsBuy} colorFn={() => ({ bg: "#1a1a2a", text: "#a5a8c0", border: "#2d2d4a" })} />
        {guest.hasLinkedIn && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "4px 10px", borderRadius: 6, fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            background: "#1a2a1a", color: "#4ade80", border: "1px solid #2d4a2d",
          }}>● LinkedIn Intel</span>
        )}
      </div>

      {/* Company Intelligence */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
          textTransform: "uppercase", letterSpacing: "0.12em", color: "#4a4d60", marginBottom: 8,
        }}>Company Intelligence</div>
        <div style={{
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          fontSize: 13.5, lineHeight: 1.65, color: "#c0c3d8",
          padding: "12px 16px", background: "#13141f",
          borderRadius: 10, border: "1px solid #1e2030",
        }}>{guest.companyBrief}</div>
      </div>

      {/* Conversation Starters */}
      <div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
          textTransform: "uppercase", letterSpacing: "0.12em", color: "#4a4d60", marginBottom: 10,
        }}>Conversation Starters</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {guest.conversationStarters.map((starter, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, padding: "10px 14px",
              background: i === 0 ? "#17182a" : "#13141f",
              borderRadius: 10,
              border: i === 0 ? "1px solid #2d2d5a" : "1px solid #1e2030",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                fontWeight: 700, color: i === 0 ? "#7c5cfc" : "#3a3d50",
                minWidth: 18, paddingTop: 1,
              }}>{i + 1}.</div>
              <div style={{
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                fontSize: 13, lineHeight: 1.6,
                color: i === 0 ? "#d0d3e8" : "#9a9db5",
              }}>{starter}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SwipeableCard({ guest, index, total, onNext, onPrev, canNext, canPrev }) {
  const [dragX, setDragX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState(0);
  const touchStart = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsAnimating(true);
    setSlideDir(0);
    setDragX(0);
    const t = setTimeout(() => setIsAnimating(false), 350);
    return () => clearTimeout(t);
  }, [index]);

  const onTouchStart = useCallback((e) => {
    if (isAnimating) return;
    touchStart.current = e.targetTouches[0].clientX;
    setDragX(0);
  }, [isAnimating]);

  const onTouchMove = useCallback((e) => {
    if (touchStart.current === null || isAnimating) return;
    const diff = e.targetTouches[0].clientX - touchStart.current;
    if ((!canPrev && diff > 0) || (!canNext && diff < 0)) {
      setDragX(diff * 0.2);
    } else {
      setDragX(diff);
    }
  }, [isAnimating, canPrev, canNext]);

  const onTouchEnd = useCallback(() => {
    if (touchStart.current === null || isAnimating) return;
    touchStart.current = null;
    const threshold = 60;
    if (dragX < -threshold && canNext) {
      setSlideDir(-1);
      setIsAnimating(true);
      setTimeout(() => { onNext(); }, 250);
    } else if (dragX > threshold && canPrev) {
      setSlideDir(1);
      setIsAnimating(true);
      setTimeout(() => { onPrev(); }, 250);
    } else {
      setDragX(0);
    }
  }, [dragX, isAnimating, canNext, canPrev, onNext, onPrev]);

  let translateX, opacity, transition;
  if (slideDir !== 0) {
    translateX = slideDir < 0 ? "-110%" : "110%";
    opacity = 0;
    transition = "transform 0.25s ease-in, opacity 0.25s ease-in";
  } else if (isAnimating) {
    translateX = "0px";
    opacity = 1;
    transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease-out";
  } else if (dragX !== 0) {
    translateX = `${dragX}px`;
    opacity = 1 - Math.abs(dragX) / 600;
    transition = "none";
  } else {
    translateX = "0px";
    opacity = 1;
    transition = "transform 0.3s ease-out, opacity 0.3s ease-out";
  }

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "pan-y", overflow: "hidden" }}
    >
      <div style={{
        transform: `translateX(${translateX})`,
        opacity,
        transition,
        willChange: "transform, opacity",
      }}>
        <GuestCard guest={guest} index={index} total={total} />
      </div>
    </div>
  );
}

export default function VIPDinnerCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("single");

  const goNext = useCallback(() => {
    setCurrentIndex(i => Math.min(guests.length - 1, i + 1));
  }, []);
  const goPrev = useCallback(() => {
    setCurrentIndex(i => Math.max(0, i - 1));
  }, []);

  return (
    <div style={{
      background: "#0a0b10", minHeight: "100vh", padding: "clamp(12px, 3vw, 24px) clamp(8px, 2vw, 16px)",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 720, margin: "0 auto 28px", textAlign: "center" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
          textTransform: "uppercase", letterSpacing: "0.2em", color: "#7c5cfc", marginBottom: 6,
        }}>Rasa — VIP NYC Dinner Briefing</div>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(18px, 4vw, 22px)", fontWeight: 700, color: "#f0f0f5", marginBottom: 4,
        }}>Guest Intelligence Cards</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#4a4d60",
        }}>{guests.length} Prospects · March 2026</div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {["single", "all"].map(m => (
            <button key={m} onClick={() => setViewMode(m)} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              padding: "6px 14px", borderRadius: 6,
              border: `1px solid ${viewMode === m ? "#7c5cfc" : "#1e2030"}`,
              background: viewMode === m ? "#1a1a3a" : "transparent",
              color: viewMode === m ? "#7c5cfc" : "#4a4d60", cursor: "pointer",
            }}>{m === "single" ? "One at a time" : "View all"}</button>
          ))}
        </div>
      </div>

      {viewMode === "single" ? (
        <>
          <SwipeableCard
            guest={guests[currentIndex]}
            index={currentIndex}
            total={guests.length}
            onNext={goNext}
            onPrev={goPrev}
            canNext={currentIndex < guests.length - 1}
            canPrev={currentIndex > 0}
          />

          <div style={{
            maxWidth: 720, margin: "0 auto",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: 8,
          }}>
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(11px, 2.5vw, 12px)",
                padding: "8px clamp(10px, 2vw, 18px)", borderRadius: 8, border: "1px solid #1e2030",
                background: currentIndex === 0 ? "transparent" : "#13141f",
                color: currentIndex === 0 ? "#2a2d40" : "#8b8fa3",
                cursor: currentIndex === 0 ? "default" : "pointer",
                flexShrink: 0,
              }}>← Prev</button>

            <div style={{ display: "flex", gap: "clamp(3px, 0.8vw, 6px)", flexWrap: "wrap", justifyContent: "center" }}>
              {guests.map((g, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)} title={g.name} style={{
                  width: i === currentIndex ? 24 : 8, height: 8, borderRadius: 4,
                  border: "none", background: i === currentIndex ? "#7c5cfc" : "#1e2030",
                  cursor: "pointer", transition: "all 0.2s ease", padding: 0,
                }} />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={currentIndex === guests.length - 1}
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(11px, 2.5vw, 12px)",
                padding: "8px clamp(10px, 2vw, 18px)", borderRadius: 8, border: "1px solid #1e2030",
                background: currentIndex === guests.length - 1 ? "transparent" : "#13141f",
                color: currentIndex === guests.length - 1 ? "#2a2d40" : "#8b8fa3",
                cursor: currentIndex === guests.length - 1 ? "default" : "pointer",
                flexShrink: 0,
              }}>Next →</button>
          </div>

          <div style={{
            maxWidth: 720, margin: "24px auto 0",
            display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center",
          }}>
            {guests.map((g, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                padding: "4px 10px", borderRadius: 4,
                border: `1px solid ${i === currentIndex ? "#7c5cfc" : "#1a1b25"}`,
                background: i === currentIndex ? "#1a1a3a" : "transparent",
                color: i === currentIndex ? "#7c5cfc" : "#3a3d50",
                cursor: "pointer", whiteSpace: "nowrap",
              }}>{g.name.split(" ")[0]}</button>
            ))}
          </div>
        </>
      ) : (
        <div>
          {guests.map((guest, i) => (
            <GuestCard key={i} guest={guest} index={i} total={guests.length} />
          ))}
        </div>
      )}
    </div>
  );
}
