"use client";

"use client";

import { Brain, Zap, GitBranch, Layers, ArrowRight, RefreshCw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

export function Architecture() {
  const { t } = useLanguage();
  const architectureFeatures = [
    {
      icon: Zap,
      title: t("architectureFastTitle"),
      subtitle: t("architectureFastSubtitle"),
      description: t("architectureFastDesc"),
      color: "primary",
    },
    {
      icon: GitBranch,
      title: t("architectureDeepTitle"),
      subtitle: t("architectureDeepSubtitle"),
      description: t("architectureDeepDesc"),
      color: "accent",
    },
    {
      icon: RefreshCw,
      title: t("architectureLifecycleTitle"),
      subtitle: t("architectureLifecycleSubtitle"),
      description: t("architectureLifecycleDesc"),
      color: "primary",
    },
  ];

  const microIndexingLayers = [
    {
      layer: "L1",
      name: t("architectureLayerL1"),
      description: t("architectureLayerL1Desc"),
      icon: Database,
    },
    {
      layer: "L2",
      name: t("architectureLayerL2"),
      description: t("architectureLayerL2Desc"),
      icon: GitBranch,
    },
    {
      layer: "L3",
      name: t("architectureLayerL3"),
      description: t("architectureLayerL3Desc"),
      icon: Layers,
    },
  ];
  return (
    <section id="architecture" className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-6">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">{t("architectureLabel")}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            {t("architectureTitle")}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t("architectureSubtitle")}
          </p>
        </div>

        {/* Dual Stream Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {architectureFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
            >
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${feature.color === "primary"
                    ? "bg-gradient-to-br from-primary/10 to-transparent"
                    : "bg-gradient-to-br from-accent/10 to-transparent"
                  }`}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center h-14 w-14 rounded-xl mb-6 ${feature.color === "primary"
                      ? "bg-primary/20 text-primary"
                      : "bg-accent/20 text-accent"
                    }`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p
                  className={`text-sm mb-4 ${feature.color === "primary" ? "text-primary" : "text-accent"
                    }`}
                >
                  {feature.subtitle}
                </p>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Micro-Indexing Architecture */}
        <div className="rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Description */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t("architectureMicroIndexTitle")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("architectureMicroIndexDesc")}
              </p>

              <div className="space-y-4">
                {microIndexingLayers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/40"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                      <span className="font-mono font-bold text-sm">
                        {layer.layer}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {layer.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Diagram */}
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Concentric circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full rounded-full border border-primary/20 animate-pulse" />
                </div>
                <div className="absolute inset-8 flex items-center justify-center">
                  <div className="h-full w-full rounded-full border border-accent/30" />
                </div>
                <div className="absolute inset-16 flex items-center justify-center">
                  <div className="h-full w-full rounded-full border border-primary/40" />
                </div>

                {/* Center brain */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <Brain className="h-12 w-12 text-primary" />
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  {t("architectureLabelStructural")}
                </div>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  {t("architectureLabelLogical")}
                </div>
                <div className="absolute top-28 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  {t("architectureLabelPerceptual")}
                </div>

                {/* Connection lines */}
                <svg
                  className="absolute inset-0 h-full w-full pointer-events-none"
                  viewBox="0 0 100 100"
                >
                  <line
                    x1="50"
                    y1="10"
                    x2="50"
                    y2="35"
                    stroke="url(#gradient1)"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="10"
                    y1="50"
                    x2="35"
                    y2="50"
                    stroke="url(#gradient1)"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="90"
                    y1="50"
                    x2="65"
                    y2="50"
                    stroke="url(#gradient1)"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="50"
                    y1="90"
                    x2="50"
                    y2="65"
                    stroke="url(#gradient1)"
                    strokeWidth="0.5"
                  />
                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="rgba(0,200,200,0.5)" />
                      <stop offset="100%" stopColor="rgba(180,100,200,0.5)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Paper CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            {t("architectureCta")}
          </p>
          <Button
            variant="outline"
            className="group border-primary/30 text-primary hover:bg-primary/10 hover:border-primary bg-transparent"
          >
            {t("architectureReadFullPaper")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span className="ml-2 text-xs opacity-60">({t("comingSoon")})</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
