"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/i18n/language-context";

type CategoryId = "all" | "engineering" | "research" | "caseStudies" | "productUpdates";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const posts = [
  {
    id: "l2-prop-mesh",
    titleKey: "blogPostMeshTitle",
    excerptKey: "blogPostMeshExcerpt",
    date: "2026.02.03",
    readTimeMinutes: 8,
    category: "engineering" as CategoryId,
    cover: `${basePath}/placeholder.jpg`,
    featured: true,
  },
  {
    id: "template-as-memory",
    titleKey: "blogPostTemplateTitle",
    excerptKey: "blogPostTemplateExcerpt",
    date: "2026.01.26",
    readTimeMinutes: 6,
    category: "research" as CategoryId,
    cover: `${basePath}/placeholder.jpg`,
  },
  {
    id: "production-agent-memory",
    titleKey: "blogPostProductionTitle",
    excerptKey: "blogPostProductionExcerpt",
    date: "2026.01.12",
    readTimeMinutes: 7,
    category: "caseStudies" as CategoryId,
    cover: `${basePath}/placeholder.jpg`,
  },
  {
    id: "q4-product-update",
    titleKey: "blogPostUpdatesTitle",
    excerptKey: "blogPostUpdatesExcerpt",
    date: "2025.12.18",
    readTimeMinutes: 4,
    category: "productUpdates" as CategoryId,
    cover: `${basePath}/placeholder.jpg`,
  },
];

export default function TeamBlogPage() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const categories = useMemo(
    () => [
      { id: "all" as CategoryId, label: t("blogCategoryAll") },
      { id: "engineering" as CategoryId, label: t("blogCategoryEngineering") },
      { id: "research" as CategoryId, label: t("blogCategoryResearch") },
      { id: "caseStudies" as CategoryId, label: t("blogCategoryCaseStudies") },
      { id: "productUpdates" as CategoryId, label: t("blogCategoryProductUpdates") },
    ],
    [t]
  );

  const categoryLabels = useMemo(() => {
    const map = new Map<CategoryId, string>();
    categories.forEach((category) => map.set(category.id, category.label));
    return map;
  }, [categories]);

  const visiblePosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const featuredPost = posts.find((post) => post.featured) || posts[0];

  const formatReadTime = (minutes: number) =>
    language === "en" ? `${minutes} min read` : `${minutes} 分钟阅读`;

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
              {t("blogBadge")}
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              {t("blogHeroTitle")}
              <br />
              {t("blogHeroTitleLine2")}
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
              {t("blogHeroSubtitle")}
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                {t("blogFeaturedLabel")}
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {t(featuredPost.titleKey)}
              </h3>
              <p className="mt-3 text-sm text-white/70">{t(featuredPost.excerptKey)}</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-white/60">
                <span>{featuredPost.date}</span>
                <span>{formatReadTime(featuredPost.readTimeMinutes)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section light-section">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">{t("blogFilterLabel")}</p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">
                {t("blogSectionTitle")}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "border border-border/70 bg-transparent text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={t(post.titleKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {categoryLabels.get(post.category)}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">{t(post.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(post.excerptKey)}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{formatReadTime(post.readTimeMinutes)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
