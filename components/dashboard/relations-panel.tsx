"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchSubgraphs,
  summarizeSubgraph,
  fallbackSummary,
  type Subgraph,
} from "@/lib/dashboard-api";
import {
  Loader2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
} from "lucide-react";

// --- Graph data builder (mirrors original vanilla JS logic) ---

interface GraphNode {
  id: string;
  label: string;
  title: string;
  shape: string;
  size: number;
  color: { background: string; border: string };
  font: { color: string; size: number };
}

interface GraphEdge {
  id: string;
  from: string;
  to: string;
  label: string;
  arrows: string;
  width: number;
  color: { color: string; highlight: string; hover: string; opacity: number };
  font: { color: string; size: number; strokeWidth: number; align: string };
  smooth: { enabled: boolean; type: string; roundness: number };
  title: string;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

function truncate(s: string, max: number) {
  return s.length <= max ? s : s.slice(0, max - 3) + "...";
}

function buildGraphData(sg: Subgraph): GraphData {
  const nodeByText = new Map<string, string>();
  const degreeById = new Map<string, number>();
  const edgeByKey = new Map<string, { from: string; to: string; type: string; count: number; confSum: number; metaType: string }>();
  const nodes: GraphNode[] = [];
  let nodeSeq = 1;

  function addNode(raw: string, pinned: boolean) {
    const text = (raw || "").trim();
    if (!text) return null;
    if (!nodeByText.has(text)) {
      const id = "n" + nodeSeq++;
      nodeByText.set(text, id);
      nodes.push({
        id,
        label: truncate(text, 26),
        title: text,
        shape: "dot",
        size: 14,
        color: pinned
          ? { background: "#7c8cff", border: "#9ca7ff" }
          : { background: "#4f566f", border: "#717ba3" },
        font: { color: "#d8dced", size: 12 },
      });
    }
    return nodeByText.get(text)!;
  }

  for (const r of sg.relations || []) {
    const src = addNode(r.source_content, true);
    const tgt = addNode(r.target_content, true);
    if (!src || !tgt) continue;
    degreeById.set(src, (degreeById.get(src) || 0) + 1);
    degreeById.set(tgt, (degreeById.get(tgt) || 0) + 1);
    const relType = (r.relation_type || "related_to").trim() || "related_to";
    const key = `${src}|${tgt}|${relType}`;
    if (!edgeByKey.has(key)) {
      edgeByKey.set(key, { from: src, to: tgt, type: relType, count: 0, confSum: 0, metaType: "" });
    }
    const e = edgeByKey.get(key)!;
    e.count++;
    e.confSum += Number(r.confidence || 0);
    if (!e.metaType && r.meta_type) e.metaType = r.meta_type;
  }

  for (const f of sg.facts || []) {
    addNode(f.content, false);
  }

  for (const n of nodes) {
    const deg = degreeById.get(n.id) || 0;
    n.size = 12 + Math.min(16, deg * 2);
  }

  const edges: GraphEdge[] = [];
  let edgeSeq = 1;
  for (const edge of edgeByKey.values()) {
    const avgConf = edge.count ? edge.confSum / edge.count : 0;
    const label = edge.count > 1 ? `${truncate(edge.type, 18)} x${edge.count}` : truncate(edge.type, 22);
    edges.push({
      id: "e" + edgeSeq++,
      from: edge.from,
      to: edge.to,
      label,
      arrows: "to",
      width: 1 + Math.min(2, avgConf * 2),
      color: { color: "#6c7bff", highlight: "#8f9aff", hover: "#8f9aff", opacity: 0.7 },
      font: { color: "#9ea6c7", size: 10, strokeWidth: 0, align: "middle" },
      smooth: { enabled: true, type: "dynamic", roundness: 0.2 },
      title: `${edge.type}, count: ${edge.count}, conf: ${avgConf.toFixed(2)}`,
    });
  }

  return { nodes, edges };
}

// --- Subgraph card component ---

function SubgraphCard({ sg, index }: { sg: Subgraph; index: number }) {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryStatus, setSummaryStatus] = useState<"idle" | "loading" | "done" | "fallback">("idle");
  const graphRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<unknown>(null);
  const graphData = useRef<GraphData | null>(null);

  const initGraph = useCallback(() => {
    if (!graphRef.current || networkRef.current) return;
    if (!graphData.current) graphData.current = buildGraphData(sg);
    const gd = graphData.current;
    if (!gd.nodes.length || !gd.edges.length) return;

    // Dynamically import vis-network
    import("vis-network/standalone").then((vis) => {
      if (!graphRef.current || networkRef.current) return;
      const network = new vis.Network(
        graphRef.current,
        {
          nodes: new vis.DataSet(gd.nodes as never[]),
          edges: new vis.DataSet(gd.edges as never[]),
        },
        {
          autoResize: true,
          layout: { improvedLayout: true },
          physics: {
            enabled: true,
            solver: "forceAtlas2Based",
            forceAtlas2Based: {
              gravitationalConstant: -45,
              centralGravity: 0.01,
              springLength: 120,
              springConstant: 0.05,
              damping: 0.65,
            },
            stabilization: { iterations: 180, updateInterval: 25 },
          },
          interaction: { hover: true, zoomView: true, dragView: true, dragNodes: true },
          nodes: { borderWidth: 1.5, borderWidthSelected: 2, shadow: false },
          edges: { selectionWidth: 2 },
        }
      );
      networkRef.current = network;
      network.once("stabilizationIterationsDone", () => {
        network.fit({ animation: { duration: 280, easingFunction: "easeInOutQuad" } });
      });
    });
  }, [sg]);

  useEffect(() => {
    if (open) {
      // Small delay to let the DOM render the container
      const t = setTimeout(initGraph, 50);
      return () => clearTimeout(t);
    }
  }, [open, initGraph]);

  const handleSummarize = async () => {
    setSummaryStatus("loading");
    setSummary("Generating memory paragraph...");
    try {
      const text = await summarizeSubgraph(sg);
      setSummary(text);
      setSummaryStatus("done");
    } catch {
      setSummary(fallbackSummary(sg));
      setSummaryStatus("fallback");
    }
  };

  if (!graphData.current) graphData.current = buildGraphData(sg);
  const gd = graphData.current;

  return (
    <Card className="gap-0 overflow-hidden py-0">
      {/* Header - clickable */}
      <button
        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-muted/30"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Subgraph #{index}</span>
          <Badge variant="secondary" className="text-[11px]">
            {sg.facts_count} facts
          </Badge>
          <Badge variant="secondary" className="text-[11px]">
            {sg.relations_count} relations
          </Badge>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Body */}
      {open && (
        <div className="border-t border-border px-5 pb-4 pt-3 space-y-3">
          {/* Facts grid */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {(sg.facts || []).map((f, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm leading-relaxed"
              >
                <FoldableText text={f.content} />
              </div>
            ))}
          </div>

          {/* Graph */}
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <span className="text-xs text-muted-foreground">Graph View</span>
              <span className="text-xs text-muted-foreground">
                {gd.nodes.length} nodes / {gd.edges.length} edges
              </span>
            </div>
            <p className="px-3 pt-2 text-[11px] text-muted-foreground">
              Drag to move, scroll to zoom.
            </p>
            <div ref={graphRef} className="h-80 w-full" />
            {!gd.edges.length && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No relation edges to render
              </p>
            )}
          </div>

          {/* Memory summarization */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              disabled={summaryStatus === "loading"}
              onClick={handleSummarize}
            >
              {summaryStatus === "loading" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              Summarize as Memory
            </Button>
            <span className="text-xs text-muted-foreground">{summaryStatus}</span>
          </div>
          {summary && (
            <div
              className={`rounded-md border px-3 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                summaryStatus === "fallback"
                  ? "border-orange-500/40 text-muted-foreground"
                  : "border-border"
              }`}
            >
              {summary}
            </div>
          )}

          {/* Relations list */}
          <div className="space-y-2">
            {(sg.relations || []).map((r, i) => (
              <div key={i} className="rounded-md border border-border bg-secondary/20 px-3 py-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="min-w-0 flex-1 rounded border border-border bg-background px-2.5 py-1.5 text-xs">
                    <FoldableText text={r.source_content} />
                  </div>
                  <Badge variant="outline" className="shrink-0 bg-primary/10 text-primary text-[11px]">
                    {r.relation_type}
                  </Badge>
                  <div className="min-w-0 flex-1 rounded border border-border bg-background px-2.5 py-1.5 text-xs">
                    <FoldableText text={r.target_content} />
                  </div>
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  {r.meta_type && (
                    <Badge variant="outline" className="text-[10px]">{r.meta_type}</Badge>
                  )}
                  <span>conf: {(r.confidence || 0).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

// --- Foldable text ---

function FoldableText({ text, threshold = 80 }: { text: string; threshold?: number }) {
  const [expanded, setExpanded] = useState(false);
  const raw = text || "";
  if (raw.length <= threshold) return <span>{raw}</span>;

  return (
    <span>
      <span className={expanded ? "" : "line-clamp-1"}>{raw}</span>
      <button
        className="ml-1 text-[11px] text-primary hover:underline"
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
      >
        {expanded ? "收起" : "展开"}
      </button>
    </span>
  );
}

// --- Main Relations Panel ---

export function RelationsPanel({ refreshKey }: { refreshKey: number }) {
  const [subgraphs, setSubgraphs] = useState<Subgraph[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSubgraphs(p);
      setSubgraphs(data.subgraphs);
      setTotal(data.total);
      setPage(p);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(1); }, [refreshKey, load]);

  const totalPages = Math.ceil(total / 10);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading subgraphs...</span>
      </div>
    );
  }

  if (error) {
    return <p className="py-20 text-center text-sm text-muted-foreground">Failed: {error}</p>;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{total} subgraphs</span>
        <span className="text-[11px] text-muted-foreground">
          each subgraph supports one-click memory rephrase
        </span>
      </div>

      {!subgraphs.length ? (
        <p className="py-20 text-center text-sm text-muted-foreground">No relations found</p>
      ) : (
        subgraphs.map((sg, idx) => (
          <SubgraphCard key={idx} sg={sg} index={(page - 1) * 10 + idx + 1} />
        ))
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => load(page - 1)}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <span className="text-xs text-muted-foreground">{page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => load(page + 1)}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
