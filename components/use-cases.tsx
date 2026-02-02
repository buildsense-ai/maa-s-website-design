"use client";

"use client";

import {
  Bot,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Heart,
  Code,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function UseCases() {
  const { t } = useLanguage();
  const useCases = [
    {
      icon: Bot,
      title: t("useCaseAgentsTitle"),
      description: t("useCaseAgentsDesc"),
    },
    {
      icon: MessageSquare,
      title: t("useCaseConversationalTitle"),
      description: t("useCaseConversationalDesc"),
    },
    {
      icon: Briefcase,
      title: t("useCaseEnterpriseTitle"),
      description: t("useCaseEnterpriseDesc"),
    },
    {
      icon: GraduationCap,
      title: t("useCaseLearningTitle"),
      description: t("useCaseLearningDesc"),
    },
    {
      icon: Heart,
      title: t("useCaseHealthcareTitle"),
      description: t("useCaseHealthcareDesc"),
    },
    {
      icon: Code,
      title: t("useCaseDeveloperTitle"),
      description: t("useCaseDeveloperDesc"),
    },
  ];
  return (
    <section id="usecases" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 mb-6">
            <Briefcase className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent">{t("useCasesLabel")}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            {t("useCasesTitle")}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t("useCasesSubtitle")}
          </p>
        </div>

        {/* Use Case Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent/50 hover:bg-card/60"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 text-accent mb-4 transition-colors group-hover:bg-accent/20">
                <useCase.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {useCase.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
