"use client";

import { Brain, Zap, GitBranch, Layers, ArrowRight, RefreshCw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const architectureFeatures = [
  {
    icon: Zap,
    title: "Fast Stream",
    subtitle: "System 1",
    description:
      "Instantaneous perception and linear time-series recording. Captures the raw flow of experience in real-time.",
    color: "primary",
  },
  {
    icon: GitBranch,
    title: "Deep Stream",
    subtitle: "System 2",
    description:
      "Asynchronous processing that constructs logical graphs from atomic facts. Enables cross-document reasoning and non-linear associations.",
    color: "accent",
  },
  {
    icon: RefreshCw,
    title: "Lifecycle Metabolism",
    subtitle: "Active Forgetting",
    description:
      "Mimics biological memory with temporal decay, activation-based reinforcement, and hierarchical migration. Keeps the repository high-signal.",
    color: "primary",
  },
];

const microIndexingLayers = [
  {
    layer: "L1",
    name: "Perceptual Stream",
    description: "Raw data chunks indexed by spatio-temporal coordinates",
    icon: Database,
  },
  {
    layer: "L2",
    name: "Logical Stream",
    description: "Atomic facts and entity relationships (The Core)",
    icon: GitBranch,
  },
  {
    layer: "L3",
    name: "Structural Stream",
    description: "Community topics and macro-narratives",
    icon: Layers,
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-6">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">Architecture</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            The Dual-Stream Memory Loom
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Inspired by cognitive science—replicating the human duality of fast
            intuition (System 1) and deep reasoning (System 2).
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
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                  feature.color === "primary"
                    ? "bg-gradient-to-br from-primary/10 to-transparent"
                    : "bg-gradient-to-br from-accent/10 to-transparent"
                }`}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center h-14 w-14 rounded-xl mb-6 ${
                    feature.color === "primary"
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
                  className={`text-sm mb-4 ${
                    feature.color === "primary" ? "text-primary" : "text-accent"
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
                Micro-Indexing Architecture
              </h3>
              <p className="text-muted-foreground mb-6">
                Data is transformed into three parallel strata, enabling
                multi-modal retrieval across semantic, logical, and structural
                dimensions.
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
                  Structural
                </div>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  Logical
                </div>
                <div className="absolute top-28 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  Perceptual
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
            Dive deeper into the technical architecture and benchmark results.
          </p>
          <Button
            variant="outline"
            className="group border-primary/30 text-primary hover:bg-primary/10 hover:border-primary bg-transparent"
          >
            Read the Full Paper
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span className="ml-2 text-xs opacity-60">(Coming Soon)</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
