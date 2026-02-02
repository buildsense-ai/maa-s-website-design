"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/i18n/language-context";

export default function CompanyPage() {
  const { t } = useLanguage();

  const highlights = [
    {
      title: t("companyWhoWeAre"),
      description: t("companyWhoWeAreDesc"),
    },
    {
      title: t("companyWhatWeBuild"),
      description: t("companyWhatWeBuildDesc"),
    },
    {
      title: t("companyHowWeWork"),
      description: t("companyHowWeWorkDesc"),
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
        <div className="hero-content">
          <div className="hero-copy">
            <div className="mb-8 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 backdrop-blur-sm">
              {t("companyBadge")}
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              {t("companyHeroTitle")}
              <br />
              {t("companyHeroTitleLine2")}
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
              {t("companyHeroSubtitle")}
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
