"use client";

import { useEffect, useState } from "react";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchChunks, fetchChunkFacts, type Chunk, type Fact } from "@/lib/dashboard-api";
import { Loader2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function ScoreBadge({ score }: { score: number }) {
  const s = score.toFixed(2);
  if (score >= 0.7) return <Badge variant="destructive" className="text-[11px]">{s}</Badge>;
  if (score >= 0.4) return <Badge className="bg-orange-500/15 text-orange-400 border-orange-500/30 text-[11px]" variant="outline">{s}</Badge>;
  return <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[11px]" variant="outline">{s}</Badge>;
}

export function ChunksPanel({ refreshKey }: { refreshKey: number }) {
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedChunk, setSelectedChunk] = useState<number | null>(null);
  const [chunkFacts, setChunkFacts] = useState<Fact[]>([]);
  const [factsLoading, setFactsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setSelectedChunk(null);
    fetchChunks()
      .then((c) => { if (!cancelled) setChunks(c); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [refreshKey]);

  const handleChunkClick = async (chunkId: number) => {
    setSelectedChunk(chunkId);
    setFactsLoading(true);
    try {
      const facts = await fetchChunkFacts(chunkId);
      setChunkFacts(facts);
    } catch {
      setChunkFacts([]);
    } finally {
      setFactsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading chunks...</span>
      </div>
    );
  }

  if (error) {
    return <p className="py-20 text-center text-sm text-muted-foreground">Failed: {error}</p>;
  }

  if (!chunks.length) {
    return <p className="py-20 text-center text-sm text-muted-foreground">No chunks</p>;
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead className="w-16">Turn</TableHead>
            <TableHead>Preview</TableHead>
            <TableHead className="w-16">Chars</TableHead>
            <TableHead className="w-16">Facts</TableHead>
            <TableHead className="w-28">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chunks.map((c) => (
            <TableRow
              key={c.chunk_id}
              className="cursor-pointer"
              onClick={() => handleChunkClick(c.chunk_id)}
              data-state={selectedChunk === c.chunk_id ? "selected" : undefined}
            >
              <TableCell className="font-mono text-xs">{c.chunk_id}</TableCell>
              <TableCell className="text-xs">{c.turn || "-"}</TableCell>
              <TableCell className="max-w-md truncate text-sm">
                {(c.text_preview || "").slice(0, 120)}...
              </TableCell>
              <TableCell className="text-xs">{c.text_length}</TableCell>
              <TableCell className="font-semibold">{c.facts_count}</TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {(c.created_at || "").slice(0, 16)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Chunk detail */}
      {selectedChunk !== null && (
        <Card>
          <CardHeader className="flex-row items-center gap-3 pb-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setSelectedChunk(null)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-sm">
              Chunk {selectedChunk} — {chunkFacts.length} facts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {factsLoading ? (
              <div className="flex items-center gap-2 py-6">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Loading facts...</span>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="w-20">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chunkFacts.map((f) => (
                    <TableRow key={f.fact_id}>
                      <TableCell className="font-mono text-xs">{f.fact_id}</TableCell>
                      <TableCell className="text-sm">{f.content}</TableCell>
                      <TableCell>
                        <ScoreBadge score={f.uncomfortable_score || 0} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
