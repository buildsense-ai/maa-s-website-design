"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { fetchFacts, fetchUnresolved, type Fact } from "@/lib/dashboard-api";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

function ScoreBadge({ score }: { score: number }) {
  const s = score.toFixed(2);
  if (score >= 0.7)
    return <Badge variant="destructive" className="text-[11px]">{s}</Badge>;
  if (score >= 0.4)
    return (
      <Badge variant="outline" className="bg-orange-500/15 text-orange-400 border-orange-500/30 text-[11px]">
        {s}
      </Badge>
    );
  return (
    <Badge variant="outline" className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[11px]">
      {s}
    </Badge>
  );
}

export function FactsPanel({ refreshKey }: { refreshKey: number }) {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("uncomfortable_desc");
  const [minScore, setMinScore] = useState("0");
  const [unresolvedOnly, setUnresolvedOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setError("");
    try {
      if (unresolvedOnly) {
        const data = await fetchUnresolved();
        setFacts(data.facts);
        setTotal(data.total);
      } else {
        const data = await fetchFacts(p, sort, minScore);
        setFacts(data.facts);
        setTotal(data.total);
      }
      setPage(p);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [sort, minScore, unresolvedOnly]);

  useEffect(() => { load(1); }, [refreshKey, sort, minScore, unresolvedOnly, load]);

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={sort} onValueChange={(v) => setSort(v)}>
          <SelectTrigger size="sm" className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uncomfortable_desc">Sort: Uncomfortable (high first)</SelectItem>
            <SelectItem value="newest">Sort: Newest</SelectItem>
            <SelectItem value="oldest">Sort: Oldest</SelectItem>
          </SelectContent>
        </Select>

        <Select value={minScore} onValueChange={(v) => setMinScore(v)}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All scores</SelectItem>
            <SelectItem value="0.4">Score ≥ 0.4</SelectItem>
            <SelectItem value="0.6">Score ≥ 0.6</SelectItem>
            <SelectItem value="0.7">Score ≥ 0.7</SelectItem>
          </SelectContent>
        </Select>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <Checkbox
            checked={unresolvedOnly}
            onCheckedChange={(v) => setUnresolvedOnly(!!v)}
          />
          Unresolved only
        </label>

        <span className="text-xs text-muted-foreground">{total} facts</span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
        </div>
      ) : error ? (
        <p className="py-20 text-center text-sm text-muted-foreground">Failed: {error}</p>
      ) : !facts.length ? (
        <p className="py-20 text-center text-sm text-muted-foreground">No facts found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="w-20">Score</TableHead>
              {unresolvedOnly ? (
                <TableHead>Matched</TableHead>
              ) : (
                <>
                  <TableHead className="w-14">Rels</TableHead>
                  <TableHead className="w-28">Created</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {facts.map((f) => (
              <TableRow key={f.fact_id}>
                <TableCell className="font-mono text-xs">{f.fact_id}</TableCell>
                <TableCell className="max-w-lg text-sm">{f.content}</TableCell>
                <TableCell>
                  <ScoreBadge score={f.uncomfortable_score || 0} />
                </TableCell>
                {unresolvedOnly ? (
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(f.matched || []).map((m, i) => (
                        <Badge key={i} variant="destructive" className="text-[11px]">{m}</Badge>
                      ))}
                    </div>
                  </TableCell>
                ) : (
                  <>
                    <TableCell className="text-xs">{f.relation_count || 0}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {(f.created_at || "").slice(0, 16)}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      {!unresolvedOnly && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => load(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <span className="text-xs text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => load(page + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
