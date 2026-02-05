"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function Footer() {
  const { t } = useLanguage();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const footerLinks = {
    product: [
      { label: t("footerArchitecture"), href: "#architecture" },
      { label: t("footerDemo"), href: "#demo" },
      { label: t("footerUseCases"), href: "#usecases" },
      { label: t("footerPricing"), href: "#" },
    ],
    developers: [
      { label: t("documentation"), href: "#" },
      { label: t("footerApiReference"), href: "#" },
      { label: t("footerSdk"), href: "#" },
      { label: t("footerChangelog"), href: "#" },
    ],
    company: [
      { label: t("footerAbout"), href: "#" },
      { label: t("footerBlog"), href: "#" },
      { label: t("footerCareers"), href: "#" },
      { label: t("footerContact"), href: "#" },
    ],
  };

  return (
    <footer className="relative border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="relative h-[48px] w-[48px] transition-transform group-hover:scale-105">
                <Image
                  src={`${basePath}/logo_gm.svg`}
                  alt="GauzMem Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="rounded-md border border-white bg-white px-2 py-0.5 text-lg font-semibold text-black transition-colors group-hover:bg-white/90">
                GauzMem
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              {t("footerDescription")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footerProduct")}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footerDevelopers")}</h4>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footerCompany")}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 GauzMem. {t("footerRights")}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footerPrivacyPolicy")}
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footerTermsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
