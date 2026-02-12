"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "submitted" | "error";

export function ImportPanel() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setStatus("submitting");
    // TODO: Replace with actual API call to /api/v1/memories/import
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Paste text content below to bulk-import into the memory system. Each
        submission will be chunked, analyzed, and stored as structured memory.
      </div>

      <Textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (status !== "idle") setStatus("idle");
        }}
        placeholder="Paste your text content here..."
        className="min-h-[300px] font-mono text-sm"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {text.length.toLocaleString()} characters
        </span>

        <div className="flex items-center gap-3">
          {status === "submitted" && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Submitted successfully
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-1.5 text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5" />
              Submission failed
            </span>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!text.trim() || status === "submitting"}
            size="sm"
            className="gap-1.5"
          >
            <Upload className="h-3.5 w-3.5" />
            {status === "submitting" ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
