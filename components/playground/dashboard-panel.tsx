"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OverviewPanel } from "@/components/dashboard/overview-panel";
import { ChunksPanel } from "@/components/dashboard/chunks-panel";
import { FactsPanel } from "@/components/dashboard/facts-panel";
import { RelationsPanel } from "@/components/dashboard/relations-panel";
import { SearchPanel } from "@/components/dashboard/search-panel";
import {
  LayoutDashboard,
  Database,
  BrainCircuit,
  Network,
  Search,
} from "lucide-react";

export function DashboardPanel({ refreshKey }: { refreshKey: number }) {
  return (
    <Tabs defaultValue="overview" className="gap-4">
      <TabsList className="bg-secondary/50 h-9">
        <TabsTrigger value="overview" className="gap-1.5 px-2.5 text-xs">
          <LayoutDashboard className="h-3.5 w-3.5" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="chunks" className="gap-1.5 px-2.5 text-xs">
          <Database className="h-3.5 w-3.5" />
          Chunks
        </TabsTrigger>
        <TabsTrigger value="facts" className="gap-1.5 px-2.5 text-xs">
          <BrainCircuit className="h-3.5 w-3.5" />
          Facts
        </TabsTrigger>
        <TabsTrigger value="relations" className="gap-1.5 px-2.5 text-xs">
          <Network className="h-3.5 w-3.5" />
          Relations
        </TabsTrigger>
        <TabsTrigger value="search" className="gap-1.5 px-2.5 text-xs">
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
  );
}
