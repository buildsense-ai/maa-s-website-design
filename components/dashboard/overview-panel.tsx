"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchStats, type DashboardStats } from "@/lib/dashboard-api";
import { Loader2, Database, BrainCircuit, FolderOpen, Network } from "lucide-react";

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <Card className="gap-3 py-4">
      <CardContent className="flex items-center justify-between px-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-secondary p-2.5">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}

function DonutChart({ dist }: { dist: { high: number; medium: number; low: number } }) {
  const total = dist.high + dist.medium + dist.low;
  if (!total) return <p className="py-8 text-center text-sm text-muted-foreground">No data</p>;

  const pcts = {
    high: (dist.high / total) * 100,
    medium: (dist.medium / total) * 100,
    low: (dist.low / total) * 100,
  };

  const segments = [
    { offset: 0, pct: pcts.high, color: "var(--color-destructive-foreground, #f87171)", label: "High (≥0.7)", count: dist.high },
    { offset: pcts.high, pct: pcts.medium, color: "#fb923c", label: "Medium (0.4–0.7)", count: dist.medium },
    { offset: pcts.high + pcts.medium, pct: pcts.low, color: "#34d399", label: "Low (<0.4)", count: dist.low },
  ];

  return (
    <div className="flex items-center gap-6">
      <svg width="110" height="110" viewBox="0 0 36 36" className="shrink-0">
        {segments.map((s, i) =>
          s.pct > 0 ? (
            <circle
              key={i}
              cx="18" cy="18" r="15.9"
              fill="none" stroke={s.color} strokeWidth="3"
              strokeDasharray={`${s.pct} ${100 - s.pct}`}
              strokeDashoffset={-s.offset}
              transform="rotate(-90 18 18)"
            />
          ) : null
        )}
        <text x="18" y="19" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="700">{total}</text>
        <text x="18" y="23" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="2.5">total</text>
      </svg>
      <div className="flex flex-col gap-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-muted-foreground">{s.label}:</span>
            <span className="font-medium">{s.count}</span>
            <span className="text-xs text-muted-foreground">({s.pct.toFixed(1)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({ data, color }: { data: { label: string; count: number }[]; color: string }) {
  if (!data.length) return <p className="py-8 text-center text-sm text-muted-foreground">No data</p>;
  const max = Math.max(...data.map((d) => d.count));

  return (
    <div className="flex flex-col gap-1.5">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-20 truncate text-right text-xs text-muted-foreground" title={d.label}>
            {d.label}
          </span>
          <div className="relative h-5 flex-1 overflow-hidden rounded bg-secondary/50">
            <div
              className="h-full rounded transition-all duration-500"
              style={{ width: `${(d.count / max) * 100}%`, background: color }}
            />
          </div>
          <span className="w-8 text-right text-xs text-muted-foreground">{d.count}</span>
        </div>
      ))}
    </div>
  );
}

export function OverviewPanel({ refreshKey }: { refreshKey: number }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchStats()
      .then((s) => { if (!cancelled) setStats(s); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading stats...</span>
      </div>
    );
  }

  if (error || !stats) {
    return <p className="py-20 text-center text-sm text-muted-foreground">Failed to load: {error}</p>;
  }

  const timelineData = (stats.ingestion_timeline || [])
    .sort((a, b) => a.day.localeCompare(b.day))
    .map((d) => ({ label: d.day.slice(5), count: d.count }));

  const factsTimelineData = (stats.facts_timeline || [])
    .sort((a, b) => a.day.localeCompare(b.day))
    .map((d) => ({ label: d.day.slice(5), count: d.count }));

  const relationTypeData = (stats.relation_types || [])
    .slice(0, 10)
    .map((t) => ({ label: t.type, count: t.count }));

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Facts" value={stats.facts_count} icon={BrainCircuit} />
        <StatCard label="Chunks" value={stats.chunks_count} icon={Database} />
        <StatCard label="Sources" value={stats.sources_count} icon={FolderOpen} />
        <StatCard label="Relations" value={stats.relations_count} icon={Network} />
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Uncomfortable Score Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart dist={stats.uncomfortable_distribution || { high: 0, medium: 0, low: 0 }} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Relation Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={relationTypeData} color="var(--color-primary)" />
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingestion Timeline (chunks/day)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={timelineData} color="var(--color-primary)" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Facts Timeline (facts/day)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={factsTimelineData} color="#34d399" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
