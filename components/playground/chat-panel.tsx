"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import {
  passiveRecall,
  chatCompletion,
  ingestMessage,
  flushBuffer,
  buildFlushBeaconPayload,
  getFlushEndpointUrl,
  type ChatMessage,
} from "@/lib/dashboard-api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  recallText?: string;       // 自然语言格式的回忆片段
  recallStats?: { facts: number; subgraphs: number };
  timestamp: number;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Flush buffer on unmount and page close
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.sendBeacon(getFlushEndpointUrl(), buildFlushBeaconPayload());
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Component unmount — fire-and-forget flush
      flushBuffer().catch(() => {});
    };
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 1. Passive recall — 被动记忆召回（graceful degradation if API unavailable）
      let recallText = "";
      let recallStats = { facts: 0, subgraphs: 0 };
      try {
        const recall = await passiveRecall(text);
        recallText = recall.recall;
        recallStats = { facts: recall.facts_count, subgraphs: recall.subgraph_count };
      } catch {
        // Memory recall unavailable — continue without context
      }

      // 2. Build LLM messages with recall context
      const systemPrompt = [
        "You are a helpful assistant with access to the user's memory system.",
        "Use the following recalled memories to inform your responses when relevant.",
        "If the memories are not relevant to the question, you may ignore them.",
        "",
        recallText
          ? `[Recalled Memories]\n${recallText}`
          : "[No relevant memories recalled]",
      ].join("\n");

      const recentHistory = messages.slice(-20);
      const llmMessages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        ...recentHistory.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
        { role: "user" as const, content: text },
      ];

      // 3. Get LLM response
      const reply = await chatCompletion(llmMessages);

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
        recallText: recallText || undefined,
        recallStats: recallStats.facts > 0 ? recallStats : undefined,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);

      // Fire-and-forget: ingest both messages into GauzMem buffer
      ingestMessage(text, "user").catch(() => {});
      ingestMessage(reply, "agent").catch(() => {});
    } catch (err) {
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Error: ${err instanceof Error ? err.message : "Failed to get response"}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-220px)] flex-col">
      {/* Messages */}
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4 py-4">
          {messages.length === 0 && (
            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
              Start a conversation — your memory system will provide context automatically.
            </div>
          )}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border/60 pt-3">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
            className="min-h-[44px] max-h-[120px] resize-none text-sm"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            size="icon"
            className="h-[44px] w-[44px] shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const [showContext, setShowContext] = useState(false);
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.recallText && message.recallStats && (
          <div className="mt-2 border-t border-border/40 pt-2">
            <button
              onClick={() => setShowContext(!showContext)}
              className="flex items-center gap-1 text-xs opacity-60 hover:opacity-100 transition-opacity"
            >
              {showContext ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
              {message.recallStats.subgraphs} recall fragments, {message.recallStats.facts} facts
            </button>
            {showContext && (
              <pre className="mt-1.5 text-xs opacity-70 whitespace-pre-wrap leading-relaxed font-mono">
                {message.recallText}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
