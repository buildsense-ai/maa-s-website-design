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
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [{ label: t("documentation"), href: "/documentation" }];

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
                  {t("product")}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[220px]">
                <DropdownMenuItem asChild>
                  <Link href="/">{t("memoryAsAService")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/product/office-copilot">{t("aiOfficeCopilot")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="text-sm text-muted-foreground">{t("product")}</span>
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
                  {t("team")}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[200px]">
                <DropdownMenuItem asChild>
                  <Link href="/team/about">{t("about")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/team/blog">{t("blog")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="text-sm text-muted-foreground">{t("team")}</span>
          )}

          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("resources")}
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
                <DropdownMenuItem>
                  <span className="text-sm text-muted-foreground">{t("research")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="text-sm text-muted-foreground">{t("resources")}</span>
          )}
        </div>

        {/* CTA Button & Language Switcher */}
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
              {t("readThePaper")}
            </Button>
          </Link>
          <Button
            size="sm"
            className={`relative overflow-hidden transition-all ${isLightSection
              ? "bg-indigo-700 text-white shadow-[0_8px_18px_rgba(30,41,59,0.25)] hover:bg-indigo-600"
              : "bg-[#6366f1] text-white shadow-[0_10px_28px_rgba(99,102,241,0.55)] hover:shadow-[0_14px_36px_rgba(99,102,241,0.65)]"
              }`}
          >
            <span className="relative z-10">{t("requestEarlyAccess")}</span>
          </Button>

          {/* Language Switcher */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "zh" : "en")}
            className={`text-sm transition-colors ${isLightSection
              ? "text-slate-600 hover:text-slate-900"
              : "text-white/70 hover:text-white"
              }`}
          >
            <Languages className="h-4 w-4 mr-2" />
            {language === "en" ? "中文" : "EN"}
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
                {t("product")}
              </div>
              <Link
                href="/"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("memory")}
              </Link>
              <Link
                href="/product/office-copilot"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("officeCopilot")}
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
                {t("team")}
              </div>
              <Link
                href="/team/about"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("about")}
              </Link>
              <Link
                href="/team/blog"
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("blog")}
              </Link>
            </div>

            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground/70">
                {t("resources")}
              </div>
              <a
                href="https://github.com/buildsense-ai"
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
              <span className="block text-sm text-muted-foreground">
                {t("research")}
              </span>
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
                  {t("readThePaper")}
                </Button>
              </Link>
              <Button
                size="sm"
                className={`w-full transition-all ${isLightSection
                  ? "bg-indigo-700 text-white shadow-[0_8px_18px_rgba(30,41,59,0.25)]"
                  : "bg-[#6366f1] text-white shadow-[0_10px_28px_rgba(99,102,241,0.55)]"
                  }`}
              >
                {t("requestEarlyAccess")}
              </Button>

              {/* Mobile Language Switcher */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "zh" : "en")}
                className="w-full"
              >
                <Languages className="h-4 w-4 mr-2" />
                {language === "en" ? "中文" : "EN"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
