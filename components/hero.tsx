"use client";

import { PropMesh } from "@/components/prop-mesh";

export function Hero() {
  return (
    <section className="hero-section">
      {/* Gradient Mesh Background */}
      <div className="hero-background">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-copy">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 backdrop-blur-sm">
            The SOTA Memory System for AI
          </div>

          {/* Headline */}
          <h1 className="hero-title text-balance text-1xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Memory that Evolves,
            <br />
            Not just stores.
          </h1>

          {/* Sub-headline */}
          <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
            GauzMem provides an associative L2 Prop Mesh for LLMs—turning sparse
            user inputs into dense, persistent context.
          </p>
        </div>

        {/* L2 Prop Mesh Visual */}
        <div className="hero-visual" aria-hidden="true">
          <div className="prop-mesh-wrap">
            <PropMesh />
          </div>
        </div>
      </div>
    </section>
  );
}
