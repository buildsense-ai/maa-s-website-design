"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n/language-context";

export default function PricingPage() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t("pricingFree"),
      price: t("pricingFreePriceDisplay"),
      description: t("pricingFreeDescription"),
      features: [t("pricingFreeFeature1"), t("pricingFreeFeature2"), t("pricingFreeFeature3")],
    },
    {
      name: t("pricingPersonal"),
      price: t("pricingPersonalPrice"),
      description: t("pricingPersonalDescription"),
      features: [t("pricingPersonalFeature1"), t("pricingPersonalFeature2"), t("pricingPersonalFeature3")],
    },
    {
      name: t("pricingEnterpriseDisplay"),
      price: t("pricingEnterprisePrice"),
      description: t("pricingEnterpriseDescription"),
      features: [t("pricingEnterpriseFeature1"), t("pricingEnterpriseFeature2"), t("pricingEnterpriseFeature3")],
    },
  ];

  const faqs = [
    {
      question: t("pricingFaqQ1"),
      answer: t("pricingFaqA1"),
    },
    {
      question: t("pricingFaqQ2"),
      answer: t("pricingFaqA2"),
    },
    {
      question: t("pricingFaqQ3"),
      answer: t("pricingFaqA3"),
    },
    {
      question: t("pricingFaqQ4"),
      answer: t("pricingFaqA4"),
    },
    {
      question: t("pricingFaqQ5"),
      answer: t("pricingFaqA5"),
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
              {t("pricingBadge")}
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              {t("pricingHeroTitle")}
              <br />
              {t("pricingHeroTitleLine2")}
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
              {t("pricingHeroSubtitle")}
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="prop-mesh-wrap" />
          </div>
        </div>
      </section>

      <section className="feature-section light-section">
        <div className="mx-auto max-w-6xl px-6 py-20 space-y-16">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-3xl font-bold text-foreground">{plan.price}</p>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">{t("pricingFaq")}</h2>
            <div className="mt-6">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`pricing-faq-${index}`}
                    className="rounded-2xl border border-border/60 bg-white/70 px-6"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
