"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getConfig, setConfig, checkHealth } from "@/lib/dashboard-api";
import { ChatPanel } from "@/components/playground/chat-panel";
import { ImportPanel } from "@/components/playground/import-panel";
import { DashboardPanel } from "@/components/playground/dashboard-panel";
import Link from "next/link";
import {
  MessageSquare,
  Upload,
  LayoutDashboard,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

type HealthStatus = "healthy" | "degraded" | "offline" | "checking";

export default function PlaygroundPage() {
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
              GauzMem Playground
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
        <Tabs defaultValue="chat" className="gap-5">
          <TabsList className="bg-secondary/50 h-10">
            <TabsTrigger value="chat" className="gap-1.5 px-3">
              <MessageSquare className="h-3.5 w-3.5" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="import" className="gap-1.5 px-3">
              <Upload className="h-3.5 w-3.5" />
              Import
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-1.5 px-3">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <ChatPanel />
          </TabsContent>
          <TabsContent value="import">
            <ImportPanel />
          </TabsContent>
          <TabsContent value="dashboard">
            <DashboardPanel refreshKey={refreshKey} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
