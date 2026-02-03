"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/translations";

export default function TeamAboutPage() {
  const { t } = useLanguage();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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

  const members: Array<{
    name: string;
    roleKey: TranslationKey;
    image: string;
  }> = [
      {
        name: "Hanyuan Zhu",
        roleKey: "teamMemberRoleResearch",
        image: `${basePath}/headshot.png`,
      },
      {
        name: "Hongxuan Zhang",
        roleKey: "teamMemberRoleEngineering",
        image: `${basePath}/headshot.png`,
      },
      {
        name: "Zhanglong Guo",
        roleKey: "teamMemberRoleEngineering",
        image: `${basePath}/headshot.png`,
      },
      {
        name: "Guowei Chen",
        roleKey: "teamMemberRoleResearch",
        image: `${basePath}/headshot.png`,
      },
      {
        name: "Zijian Wang",
        roleKey: "teamMemberRoleEngineering",
        image: `${basePath}/headshot.png`,
      },
      {
        name: "Yunqi Zha",
        roleKey: "teamMemberRoleProduct",
        image: `${basePath}/headshot.png`,
      },
    ];

  const firstRowMembers = members.slice(0, 2);
  const secondRowMembers = members.slice(2);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="hero-section">
        <div className="hero-background">
          <div className="glow-orb orb-1" />
          <div className="glow-orb orb-2" />
        </div>
        <div className="team-hero-bg" aria-hidden="true">
          <div className="team-hero-grid" />
          <div className="team-hero-orb" />
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <div className="mb-8 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 backdrop-blur-sm">
              {t("companyBadge")}
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              {t("companyHeroTitle")}
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
              {t("companyHeroSubtitle")}
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <svg
              className="h-[320px] w-full"
              viewBox="0 0 520 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.2">
                <path d="M70 150 L170 110" />
                <path d="M170 110 L290 150" />
                <path d="M290 150 L410 110" />
                <path d="M170 110 L170 210" />
                <path d="M290 150 L290 210" />
                <path d="M410 110 L410 210" />
              </g>
              <g>
                <circle cx="70" cy="150" r="28" fill="rgba(99,102,241,0.25)" />
                <circle cx="70" cy="150" r="18" fill="rgba(255,255,255,0.12)" />
                <circle cx="170" cy="110" r="32" fill="rgba(99,102,241,0.28)" />
                <circle cx="170" cy="110" r="20" fill="rgba(255,255,255,0.16)" />
                <circle cx="290" cy="150" r="30" fill="rgba(99,102,241,0.22)" />
                <circle cx="290" cy="150" r="18" fill="rgba(255,255,255,0.14)" />
                <circle cx="410" cy="110" r="28" fill="rgba(99,102,241,0.26)" />
                <circle cx="410" cy="110" r="18" fill="rgba(255,255,255,0.12)" />
                <circle cx="170" cy="210" r="24" fill="rgba(99,102,241,0.22)" />
                <circle cx="170" cy="210" r="14" fill="rgba(255,255,255,0.12)" />
                <circle cx="290" cy="210" r="24" fill="rgba(99,102,241,0.22)" />
                <circle cx="290" cy="210" r="14" fill="rgba(255,255,255,0.12)" />
                <circle cx="410" cy="210" r="24" fill="rgba(99,102,241,0.22)" />
                <circle cx="410" cy="210" r="14" fill="rgba(255,255,255,0.12)" />
              </g>
              <g fill="rgba(255,255,255,0.65)">
                <circle cx="70" cy="134" r="6" />
                <rect x="62" y="146" width="16" height="18" rx="6" />
                <circle cx="170" cy="92" r="7" />
                <rect x="161" y="106" width="18" height="20" rx="7" />
                <circle cx="290" cy="134" r="6" />
                <rect x="282" y="146" width="16" height="18" rx="6" />
                <circle cx="410" cy="92" r="6" />
                <rect x="402" y="104" width="16" height="20" rx="6" />
                <circle cx="170" cy="194" r="5" />
                <rect x="164" y="204" width="12" height="16" rx="5" />
                <circle cx="290" cy="194" r="5" />
                <rect x="284" y="204" width="12" height="16" rx="5" />
                <circle cx="410" cy="194" r="5" />
                <rect x="404" y="204" width="12" height="16" rx="5" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section className="feature-section light-section team-highlights">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="team-highlight-card">
                <div className="team-highlight-tag">{item.title}</div>
                <p className="team-highlight-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-section light-section team-members">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-semibold text-foreground">
            {t("teamMembersTitle")}
          </h2>
          <div className="mt-12 space-y-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {firstRowMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`text-center ${index === 0 ? "lg:col-start-2" : "lg:col-start-3"}`}
                >
                  <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border border-border/60 bg-white/70 shadow-sm">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t(member.roleKey)}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {secondRowMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border border-border/60 bg-white/70 shadow-sm">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t(member.roleKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
