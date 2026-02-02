import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MemoryDemo } from "@/components/memory-demo";
import { Architecture } from "@/components/architecture";
import { UseCases } from "@/components/use-cases";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { SponsoredBar } from "@/components/sponsored-bar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <section className="feature-section light-section">
        <SponsoredBar />
        <MemoryDemo />
        <Architecture />
      </section>
      <UseCases />
      <CTASection />
      <Footer />
    </main>
  );
}
