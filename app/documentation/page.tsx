"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DocumentationPage() {
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
              Documentation
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              API Documentation
              <br />
              is coming soon.
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
              This placeholder will evolve into a full API reference, SDK guides,
              and integration recipes.
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="prop-mesh-wrap" />
          </div>
        </div>
      </section>

      <section className="feature-section light-section">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-10 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">API Reference</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              We are preparing a full API reference. Expect endpoints for memory
              ingestion, retrieval, and evaluation with code examples.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
