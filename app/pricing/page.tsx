"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with memory fundamentals.",
    features: ["1 workspace", "Basic memory ingestion", "Community support"],
  },
  {
    name: "Personal",
    price: "$29",
    description: "For builders running memory-heavy workflows.",
    features: ["5 workspaces", "Graph + vector retrieval", "Workflow templates"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Security, scale, and tailored deployments.",
    features: ["Unlimited workspaces", "Dedicated infra", "Priority support"],
  },
];

const faqs = [
  {
    question: "What is included in the Free plan?",
    answer:
      "Free includes core memory ingestion and retrieval so you can validate workflows.",
  },
  {
    question: "Can I upgrade later?",
    answer: "Yes, you can upgrade at any time without losing data.",
  },
  {
    question: "Do you offer enterprise onboarding?",
    answer: "Yes. Enterprise includes onboarding and architecture reviews.",
  },
];

export default function PricingPage() {
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
              Pricing
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Plans for teams
              <br />
              building memory.
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
              Start with Free and scale to enterprise-grade memory infrastructure.
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
            <h2 className="text-2xl font-semibold text-foreground">FAQ</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-border/60 bg-white/70 p-4">
                  <p className="text-sm font-semibold text-foreground">{faq.question}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
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
