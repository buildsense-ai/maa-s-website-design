import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MemoryDemo } from "@/components/memory-demo";
import { Architecture } from "@/components/architecture";
import { UseCases } from "@/components/use-cases";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <section className="feature-section light-section">
        <div className="collaboration-bar">
          <span className="collab-label">Sponsored by</span>
          <div className="collab-logos">
            <div className="collab-track">
              <div className="collab-group">
                <span className="collab-item">
                  <img src="/collab1.png" alt="Partner 1" />
                </span>
                <span className="collab-item">
                  <img src="/collab2.png" alt="Partner 2" />
                </span>
                <span className="collab-item">
                  <img src="/collab3.png" alt="Partner 3" />
                </span>
                <span className="collab-item">
                  <img src="/collab4.png" alt="Partner 4" />
                </span>
                <span className="collab-item">
                  <img src="/collab5.png" alt="Partner 5" />
                </span>
              </div>
              <div className="collab-group" aria-hidden="true">
                <span className="collab-item">
                  <img src="/collab1.png" alt="Partner 1" />
                </span>
                <span className="collab-item">
                  <img src="/collab2.png" alt="Partner 2" />
                </span>
                <span className="collab-item">
                  <img src="/collab3.png" alt="Partner 3" />
                </span>
                <span className="collab-item">
                  <img src="/collab4.png" alt="Partner 4" />
                </span>
                <span className="collab-item">
                  <img src="/collab5.png" alt="Partner 5" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <MemoryDemo />
        <Architecture />
      </section>
      <UseCases />
      <CTASection />
      <Footer />
    </main>
  );
}
