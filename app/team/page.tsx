"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/i18n/language-context";

export default function TeamPage() {
  const { t } = useLanguage();

  const options = [
    {
      title: t("about"),
      description: t("teamAboutDescription"),
      href: "/team/about",
    },
    {
      title: t("blog"),
      description: t("teamBlogDescription"),
      href: "/team/blog",
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
              {t("teamBadge")}
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              {t("teamHeroTitle")}
              <br />
              {t("teamHeroTitleLine2")}
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
              {t("teamHeroSubtitle")}
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm text-white/70">{t("teamHeroHighlight")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section light-section">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {options.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm transition-transform hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-foreground">{option.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{option.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
