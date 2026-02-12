"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  getConfig,
  setConfig,
  checkHealth,
} from "@/lib/dashboard-api";
import { OverviewPanel } from "@/components/dashboard/overview-panel";
import { ChunksPanel } from "@/components/dashboard/chunks-panel";
import { FactsPanel } from "@/components/dashboard/facts-panel";
import { RelationsPanel } from "@/components/dashboard/relations-panel";
import { SearchPanel } from "@/components/dashboard/search-panel";
import Link from "next/link";
import {
  LayoutDashboard,
  Database,
  BrainCircuit,
  Network,
  Search,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

type HealthStatus = "healthy" | "degraded" | "offline" | "checking";

export default function DashboardPage() {
  const [health, setHealth] = useState<HealthStatus>("checking");
  const [apiBase, setApiBase] = useState(getConfig().apiBase);
  const [projectId, setProjectId] = useState(getConfig().projectId);
  const [refreshKey, setRefreshKey] = useState(0);

  const doHealthCheck = useCallback(async () => {
    setHealth("checking");
    const status = await checkHealth();
    setHealth(status);
  }, []);

  const handleRefresh = useCallback(() => {
    setConfig({ apiBase, projectId });
    setRefreshKey((k) => k + 1);
    doHealthCheck();
  }, [apiBase, projectId, doHealthCheck]);

  useEffect(() => {
    setConfig({ apiBase, projectId });
    doHealthCheck();
  }, []);

  const healthColor: Record<HealthStatus, string> = {
    healthy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    degraded: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    offline: "bg-red-500/15 text-red-400 border-red-500/30",
    checking: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-base font-semibold tracking-tight">
              GauzMem Dashboard
            </h1>
            <Badge
              variant="outline"
              className={`text-[11px] ${healthColor[health]}`}
            >
              {health}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={apiBase}
              onChange={(e) => setApiBase(e.target.value)}
              placeholder="API Base URL"
              className="h-8 w-44 text-xs"
            />
            <Input
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="Project ID"
              className="h-8 w-40 text-xs"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              className="h-8 gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main content with tabs */}
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-5">
        <Tabs defaultValue="overview" className="gap-5">
          <TabsList className="bg-secondary/50 h-10">
            <TabsTrigger value="overview" className="gap-1.5 px-3">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="chunks" className="gap-1.5 px-3">
              <Database className="h-3.5 w-3.5" />
              Chunks
            </TabsTrigger>
            <TabsTrigger value="facts" className="gap-1.5 px-3">
              <BrainCircuit className="h-3.5 w-3.5" />
              Facts
            </TabsTrigger>
            <TabsTrigger value="relations" className="gap-1.5 px-3">
              <Network className="h-3.5 w-3.5" />
              Relations
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-1.5 px-3">
              <Search className="h-3.5 w-3.5" />
              Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewPanel refreshKey={refreshKey} />
          </TabsContent>
          <TabsContent value="chunks">
            <ChunksPanel refreshKey={refreshKey} />
          </TabsContent>
          <TabsContent value="facts">
            <FactsPanel refreshKey={refreshKey} />
          </TabsContent>
          <TabsContent value="relations">
            <RelationsPanel refreshKey={refreshKey} />
          </TabsContent>
          <TabsContent value="search">
            <SearchPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
