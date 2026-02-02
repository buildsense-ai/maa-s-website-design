"use client";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/lib/i18n/language-context";

export default function OfficeCopilotPage() {
  const { t } = useLanguage();
  const coreLoop = [
    {
      step: t("officeCopilotStep1"),
      title: t("officeCopilotStep1Title"),
      subtitle: t("officeCopilotStep1Subtitle"),
      details: [t("officeCopilotStep1Detail1"), t("officeCopilotStep1Detail2")],
    },
    {
      step: t("officeCopilotStep2"),
      title: t("officeCopilotStep2Title"),
      subtitle: t("officeCopilotStep2Subtitle"),
      details: [t("officeCopilotStep2Detail1"), t("officeCopilotStep2Detail2")],
    },
    {
      step: t("officeCopilotStep3"),
      title: t("officeCopilotStep3Title"),
      subtitle: t("officeCopilotStep3Subtitle"),
      details: [t("officeCopilotStep3Detail1"), t("officeCopilotStep3Detail2")],
    },
  ];

  const dailyFlow = [
    {
      time: t("officeCopilotTime1"),
      title: t("officeCopilotTime1Title"),
      description: t("officeCopilotTime1Desc"),
    },
    {
      time: t("officeCopilotTime2"),
      title: t("officeCopilotTime2Title"),
      description: t("officeCopilotTime2Desc"),
    },
    {
      time: t("officeCopilotTime3"),
      title: t("officeCopilotTime3Title"),
      description: t("officeCopilotTime3Desc"),
    },
    {
      time: t("officeCopilotTime4"),
      title: t("officeCopilotTime4Title"),
      description: t("officeCopilotTime4Desc"),
    },
  ];
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="hero-section">
        <div className="hero-background">
          <div className="glow-orb orb-1" />
          <div className="glow-orb orb-2" />
        </div>
        <div className="office-copilot-bg" aria-hidden="true">
          <div className="office-copilot-bg-grid" />
          <div className="office-copilot-bg-lines" />
          <div className="office-copilot-bg-orb" />
          <div className="office-copilot-bg-cursor" />
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <div className="mb-8 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 backdrop-blur-sm">
              {t("officeCopilotBadge")}
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              {t("officeCopilotHeroTitle")}
              <br />
              {t("officeCopilotHeroTitleLine2")}
            </h1>
            <p className="hero-subtitle mt-6 max-w-2xl text-pretty text-xl md:text-2xl">
              {t("officeCopilotHeroSubtitle")}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="bg-[#6366f1] text-white shadow-[0_10px_28px_rgba(99,102,241,0.55)] hover:bg-[#5b5fe8]"
              >
                {t("officeCopilotDownloadBeta")}
              </Button>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="prop-mesh-wrap" />
          </div>
        </div>
      </section>

      <section className="feature-section light-section">
        <div className="mx-auto max-w-6xl px-6 py-20 space-y-20">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-white/70 to-transparent p-10 shadow-sm">
            <div className="absolute -top-24 right-12 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary mb-6">
                {t("officeCopilotCoreEngineBadge")}
              </div>
              <h2 className="text-3xl font-semibold text-foreground">
                {t("officeCopilotCoreEngineTitle")}
              </h2>
              <div className="mt-6 grid gap-4 text-lg text-muted-foreground md:grid-cols-3">
                <p className="border-l-2 border-primary/30 pl-4">
                  {t("officeCopilotCoreEngineItem1")}
                </p>
                <p className="border-l-2 border-primary/30 pl-4">
                  {t("officeCopilotCoreEngineItem2")}
                </p>
                <p className="border-l-2 border-primary/30 pl-4">
                  {t("officeCopilotCoreEngineItem3")}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-10 shadow-sm">
            <div className="flex items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {t("officeCopilotArchitectureTitle")}
                </h3>
                <p className="mt-2 text-base text-muted-foreground max-w-2xl">
                  {t("officeCopilotArchitectureSubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-8 rounded-3xl border border-border/60 bg-white/80 p-6">
              <svg
                viewBox="0 0 1000 640"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                className="h-auto w-full"
              >
                <defs>
                  <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e1f5fe" stopOpacity="1" />
                    <stop offset="100%" stopColor="#b3e5fc" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="gradTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e0f2f1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#b2dfdb" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e8f5e9" stopOpacity="1" />
                    <stop offset="100%" stopColor="#c8e6c9" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="gradDarkBase" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a5f7a" stopOpacity="1" />
                    <stop offset="100%" stopColor="#103c4a" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="gradHex" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f1f8e9" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="gradGauzMem" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00c6ff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0072ff" stopOpacity="1" />
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <marker
                    id="arrowBlue"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#2b7a9e" />
                  </marker>
                  <marker
                    id="arrowGreen"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#2e8b57" />
                  </marker>
                </defs>

                <text x="500" y="30" fontSize="20" fontWeight="bold" textAnchor="middle" fill="#333">
                  {t("officeCopilotSvgTitle")}
                </text>
                <rect x="50" y="50" width="900" height="100" rx="10" fill="none" stroke="#2b7a9e" strokeWidth="2" />

                <g transform="translate(70, 65)">
                  <rect width="260" height="70" rx="8" fill="url(#gradBlue)" stroke="#81d4fa" strokeWidth="1" />
                  <path d="M20 10 H 40 L 50 20 V 50 H 20 Z M 25 25 H 45 M 25 35 H 45 M 25 45 H 35" fill="#0288d1" opacity="0.8" />
                  <text x="60" y="30" fontSize="16" fontWeight="bold" fill="#0277bd">
                    {t("officeCopilotSvgEditor")}
                  </text>
                  <text x="60" y="50" fontSize="14" fill="#0288d1">
                    {t("officeCopilotSvgEditorSub")}
                  </text>
                </g>

                <g transform="translate(370, 65)">
                  <rect width="260" height="70" rx="8" fill="url(#gradTeal)" stroke="#80cbc4" strokeWidth="1" />
                  <path d="M20 45 L 30 30 L 40 40 L 55 15" fill="none" stroke="#009688" strokeWidth="3" />
                  <circle cx="20" cy="45" r="3" fill="#009688" />
                  <circle cx="30" cy="30" r="3" fill="#009688" />
                  <circle cx="40" cy="40" r="3" fill="#009688" />
                  <circle cx="55" cy="15" r="3" fill="#009688" />
                  <text x="65" y="30" fontSize="16" fontWeight="bold" fill="#00897b">
                    {t("officeCopilotSvgSidebar")}
                  </text>
                  <text x="65" y="50" fontSize="14" fill="#009688">
                    {t("officeCopilotSvgSidebarSub")}
                  </text>
                </g>

                <g transform="translate(670, 65)">
                  <rect width="260" height="70" rx="8" fill="url(#gradGreen)" stroke="#a5d6a7" strokeWidth="1" />
                  <path d="M25 35 C 25 25, 35 25, 35 25 C 35 15, 50 15, 50 25 C 55 25, 55 35, 50 35 Z" fill="#388e3c" opacity="0.8" />
                  <text x="65" y="38" fontSize="16" fontWeight="bold" fill="#2e7d32">
                    {t("officeCopilotSvgCapture")}
                  </text>
                </g>

                <g transform="translate(50, 480)">
                  <rect width="900" height="100" rx="12" fill="url(#gradDarkBase)" />
                  <text x="450" y="125" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#103c4a">
                    {t("officeCopilotSvgFoundation")}
                  </text>

                  <g transform="translate(20, 15)">
                    <rect width="420" height="70" rx="8" fill="rgba(255,255,255,0.1)" />
                    <path d="M10 20 H 30 L 35 15 H 50 V 45 H 10 Z" fill="#b3e5fc" opacity="0.8" />
                    <path d="M30 25 H 50 L 55 20 H 70 V 50 H 30 Z" fill="#b3e5fc" opacity="0.6" transform="translate(15, 5)" />
                    <text x="85" y="42" fontSize="18" fontWeight="bold" fill="#e1f5fe">
                      {t("officeCopilotSvgKnowledgeBase")}
                    </text>
                  </g>

                  <g transform="translate(460, 15)">
                    <rect width="420" height="70" rx="8" fill="rgba(255,255,255,0.1)" />
                    <path d="M10 15 H 40 V 50 H 10 Z M 15 25 H 25 M 15 35 H 35 M 15 45 H 30" fill="none" stroke="#c8e6c9" strokeWidth="2" />
                    <circle cx="35" cy="35" r="5" fill="#c8e6c9" />
                    <text x="65" y="42" fontSize="18" fontWeight="bold" fill="#e8f5e9">
                      {t("officeCopilotSvgWorkingMemory")}
                    </text>
                  </g>
                </g>

                <g transform="translate(350, 200)">
                  <polygon points="150,0 300,87 300,260 150,347 0,260 0,87" fill="url(#gradHex)" stroke="#2b7a9e" strokeWidth="4" />

                  <g transform="translate(50, 70)" opacity="0.9">
                    <circle cx="40" cy="40" r="35" fill="none" stroke="#2b7a9e" strokeWidth="5" strokeDasharray="10,5" />
                    <text x="40" y="35" fontSize="10" textAnchor="middle" fill="#1a5f7a" fontWeight="bold">
                      {t("officeCopilotSvgContextLine1")}
                    </text>
                    <text x="40" y="50" fontSize="10" textAnchor="middle" fill="#1a5f7a" fontWeight="bold">
                      {t("officeCopilotSvgContextLine2")}
                    </text>
                  </g>
                  <g transform="translate(170, 70)" opacity="0.9">
                    <circle cx="40" cy="40" r="35" fill="none" stroke="#2e8b57" strokeWidth="5" strokeDasharray="10,5" />
                    <text x="40" y="35" fontSize="10" textAnchor="middle" fill="#1b5e20" fontWeight="bold">
                      {t("officeCopilotSvgSkillLine1")}
                    </text>
                    <text x="40" y="50" fontSize="10" textAnchor="middle" fill="#1b5e20" fontWeight="bold">
                      {t("officeCopilotSvgSkillLine2")}
                    </text>
                  </g>

                  <text x="150" y="180" fontSize="20" fontWeight="800" textAnchor="middle" fill="#1a5f7a">
                    {t("officeCopilotSvgAiCoreLine1")}
                  </text>
                  <text x="150" y="205" fontSize="20" fontWeight="800" textAnchor="middle" fill="#1a5f7a">
                    {t("officeCopilotSvgAiCoreLine2")}
                  </text>

                  <g transform="translate(30, 230)" filter="url(#glow)">
                    <rect rx="15" width="240" height="45" fill="url(#gradGauzMem)" />
                    <text x="120" y="30" fontSize="16" fontWeight="bold" textAnchor="middle" fill="white" letterSpacing="0.5px">
                      {t("officeCopilotSvgPoweredBy")} <tspan fontWeight="900" fontSize="18">GauzMem MaaS</tspan>
                    </text>
                  </g>
                </g>

                <g strokeWidth="4" fill="none">
                  <path d="M200 150 V 480" stroke="#2b7a9e" markerEnd="url(#arrowBlue)" />
                  <path d="M350 150 V 300 H 380" stroke="#2b7a9e" markerEnd="url(#arrowBlue)" />
                  <path d="M650 150 V 300 H 620" stroke="#2b7a9e" markerEnd="url(#arrowBlue)" />
                  <path d="M800 150 V 480" stroke="#2b7a9e" markerEnd="url(#arrowBlue)" />
                  <path d="M500 547 V 490" stroke="#2b7a9e" markerEnd="url(#arrowBlue)" />
                  <path d="M250 480 V 160" stroke="#2e8b57" markerEnd="url(#arrowGreen)" />
                  <path d="M750 480 V 160" stroke="#2e8b57" markerEnd="url(#arrowGreen)" />
                  <path d="M380 360 H 280 V 160" stroke="#2e8b57" markerEnd="url(#arrowGreen)" />
                  <path d="M620 360 H 720 V 160" stroke="#2e8b57" markerEnd="url(#arrowGreen)" />
                  <path d="M500 200 V 160" stroke="#2e8b57" markerEnd="url(#arrowGreen)" />
                </g>
              </svg>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
              {t("officeCopilotCoreLoopBadge")}
            </div>
            <h2 className="text-3xl font-semibold text-foreground">
              {t("officeCopilotCoreLoopTitle")}
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              {t("officeCopilotCoreLoopSubtitle")}
            </p>
          </div>

          <div className="space-y-6">
            {coreLoop.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {item.step}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="space-y-3 text-base text-muted-foreground lg:max-w-lg">
                    {item.details.map((detail) => (
                      <p key={detail} className="border-l-2 border-primary/20 pl-4 leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="relative py-20 px-6 bg-[#050509] text-white">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/80">
                  {t("officeCopilotDayBadge")}
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white">
                  {t("officeCopilotDayTitle")}
                </h2>
                <p className="mt-3 text-base text-white/70 max-w-xl">
                  {t("officeCopilotDaySubtitle")}
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-4">
              {dailyFlow.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold text-[#8b8dff]">{item.time}</div>
                  <h3 className="mt-2 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-base text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-3xl font-semibold text-white">
              {t("officeCopilotCtaTitle")}
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-3xl mx-auto">
              {t("officeCopilotCtaDesc1")}
            </p>
            <p className="mt-4 text-base text-white/70 max-w-3xl mx-auto">
              {t("officeCopilotCtaDesc2")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-[#6366f1] text-white shadow-[0_10px_28px_rgba(99,102,241,0.55)] hover:bg-[#5b5fe8]"
              >
                {t("officeCopilotDownloadBeta")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
