"use client";

import { PropMesh } from "@/components/prop-mesh";
import { useLanguage } from "@/lib/i18n/language-context";

export function Hero() {
  const { t } = useLanguage();

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
            {t("heroSotaBadge")}
          </div>

          {/* Headline */}
          <h1 className="hero-title text-balance text-1xl font-medium tracking-wide text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            {t("heroTitle")}
            <br />
            {t("heroTitleLine2")}
          </h1>

          {/* Sub-headline */}
          <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
            {t("heroSubtitle")}
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
