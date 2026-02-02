"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const highlights = [
  {
    title: "Who we are",
    description:
      "buildsense ai is a memory infrastructure company focused on long-term context for AI systems.",
  },
  {
    title: "What we build",
    description:
      "We build GauzMem, a memory-as-a-service stack that combines retrieval, metabolism, and evaluation.",
  },
  {
    title: "How we work",
    description:
      "We partner with teams building AI-native workflows across research, productivity, and enterprise.",
  },
];

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="hero-section">
        <div className="hero-background">
          <div className="glow-orb orb-1" />
          <div className="glow-orb orb-2" />
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <div className="mb-8 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 backdrop-blur-sm">
              Company
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              buildsense ai
              <br />
              Memory-first systems.
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
              We believe memory is the missing infrastructure for AI. Our mission
              is to make long-term context reliable, interpretable, and
              production-ready.
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="prop-mesh-wrap" />
          </div>
        </div>
      </section>

      <section className="feature-section light-section">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
