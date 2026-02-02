"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl">
        <div className="rounded-3xl border border-primary/30 bg-card/50 backdrop-blur-sm p-12 md:p-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">Early Access Available</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl mb-6">
            Ready to Give Your AI{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Persistent Memory
            </span>
            ?
          </h2>

          {/* Subtext */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join the waitlist and be among the first to integrate GauzMem into
            your AI applications. Transform how your agents remember, associate,
            and learn.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground px-10 py-6 text-base shadow-[0_0_40px_rgba(0,200,200,0.4)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,200,200,0.6)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Request Early Access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-6 text-base border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 bg-transparent"
            >
              Schedule a Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <p className="mt-8 text-sm text-muted-foreground/60">
            No credit card required • Free tier available • Enterprise support
          </p>
        </div>
      </div>
    </section>
  );
}
