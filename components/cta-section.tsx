"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366f1]/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl">
        <div className="relative rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/14 via-transparent to-[#6366f1]/6 opacity-70 pointer-events-none" />
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6366f1]/30 bg-[#6366f1]/10 px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-[#6366f1]" />
              <span className="text-sm text-[#6366f1]">{t("ctaEarlyAccessBadge")}</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl mb-6">
              {t("ctaTitle")}{" "}
              <span className="bg-gradient-to-r from-foreground to-[#6366f1] bg-clip-text text-transparent">
                {t("ctaPersistentMemory")}
              </span>
              ?
            </h2>

            {/* Subtext */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              {t("ctaSubtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="group relative bg-[#6366f1] text-white px-10 py-6 text-base transition-colors hover:bg-[#5b5fe8]"
              >
                <span className="flex items-center gap-2">
                  {t("ctaRequestAccess")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-6 text-base border-[#6366f1]/30 text-[#6366f1] hover:bg-[#6366f1]/10 hover:border-[#6366f1] bg-transparent"
              >
                {t("ctaScheduleDemo")}
              </Button>
            </div>

            {/* Trust indicators */}
            <p className="mt-8 text-sm text-muted-foreground/60">
              {t("ctaTrustIndicators")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
