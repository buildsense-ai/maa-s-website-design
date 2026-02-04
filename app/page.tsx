import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FrontendDemo } from "@/components/frontend-demo";
import { Architecture } from "@/components/architecture";
import { UseCases } from "@/components/use-cases";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { SponsoredBar } from "@/components/sponsored-bar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="home-deep-bg">
        <div className="home-deep-bg__layer" aria-hidden="true" />
        <Hero />
        <section className="-mt-px">
          <FrontendDemo />
        </section>
      </div>
      <section className="feature-section light-section">
        <SponsoredBar />
        <Architecture />
      </section>
      <UseCases />
      <CTASection />
      <Footer />
    </main>
  );
}
