"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { label: "Documentation", href: "/documentation" },
    { label: "Pricing", href: "/pricing" },
    { label: "Company", href: "/company" },
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const featureSection = document.querySelector(".feature-section");
      if (!featureSection) return;
      const top = featureSection.getBoundingClientRect().top;
      setIsLightSection(top <= 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-white bg-white px-2 py-0.5 text-lg font-semibold tracking-tight text-black">
              GauzMem
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Product
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[220px]">
                <DropdownMenuItem asChild>
                  <Link href="/">Memory</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/product/writer-agent">Writer Agent</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="text-sm text-muted-foreground">Product</span>
          )}

          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Resources
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[220px]">
                <DropdownMenuItem asChild>
                  <a
                    href="https://github.com/buildsense-ai"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="text-sm text-muted-foreground">Resources</span>
          )}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/documentation">
            <Button
              variant="outline"
              size="sm"
              className={`border border-transparent bg-transparent text-sm transition-colors ${isLightSection
                ? "border-slate-300/70 text-slate-600 hover:text-slate-900 hover:border-slate-400"
                : "border-white/20 text-white/70 hover:text-white hover:border-white/40"
                }`}
            >
              Read the Paper
            </Button>
          </Link>
          <Button
            size="sm"
            className={`relative overflow-hidden transition-all ${isLightSection
              ? "bg-indigo-700 text-white shadow-[0_8px_18px_rgba(30,41,59,0.25)] hover:bg-indigo-600"
              : "bg-[#6366f1] text-white shadow-[0_10px_28px_rgba(99,102,241,0.55)] hover:shadow-[0_14px_36px_rgba(99,102,241,0.65)]"
              }`}
          >
            <span className="relative z-10">Request Early Access</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-4 space-y-4">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground/70">
                Product
              </div>
              <Link
                href="/"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Memory
              </Link>
              <Link
                href="/product/writer-agent"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Writer Agent
              </Link>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground/70">
                Resources
              </div>
              <a
                href="https://github.com/buildsense-ai"
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/documentation" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-full border border-transparent bg-transparent text-sm ${isLightSection
                    ? "border-slate-300/70 text-slate-600"
                    : "border-white/20 text-white/70"
                    }`}
                >
                  Read the Paper
                </Button>
              </Link>
              <Button
                size="sm"
                className={`w-full transition-all ${isLightSection
                  ? "bg-indigo-700 text-white shadow-[0_8px_18px_rgba(30,41,59,0.25)]"
                  : "bg-[#6366f1] text-white shadow-[0_10px_28px_rgba(99,102,241,0.55)]"
                  }`}
              >
                Request Early Access
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
