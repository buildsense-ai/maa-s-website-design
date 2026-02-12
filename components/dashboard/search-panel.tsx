"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { searchBundles, type SearchBundle } from "@/lib/dashboard-api";
import { Loader2, Search } from "lucide-react";

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchBundle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const bundles = await searchBundles(q);
      setResults(bundles);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search memories..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={handleSearch} disabled={loading} className="gap-1.5">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Search
        </Button>
      </div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
        </div>
      )}

      {error && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          Search failed: {error}
        </p>
      )}

      {!loading && !error && searched && !results.length && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No results found
        </p>
      )}

      {!loading &&
        results.map((b, i) => (
          <Card key={i} className="gap-3 py-4">
            <CardContent className="space-y-2 px-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  {(b.facts || []).map((f, fi) => (
                    <p key={fi} className="text-sm leading-relaxed">
                      {f.content}
                    </p>
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className="ml-3 shrink-0 bg-primary/10 text-primary text-[11px]"
                >
                  score: {(b.relevance_score || 0).toFixed(3)}
                </Badge>
              </div>

              {/* Chunk previews */}
              {(b.chunks || []).slice(0, 2).map((c, ci) => (
                <div
                  key={ci}
                  className="border-l-2 border-border pl-3 text-xs text-muted-foreground leading-relaxed"
                >
                  {(c.content || "").slice(0, 200)}...
                </div>
              ))}

              <div className="flex gap-3 text-[11px] text-muted-foreground">
                <span>facts: {(b.facts || []).length}</span>
                <span>chunks: {(b.chunks || []).length}</span>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
