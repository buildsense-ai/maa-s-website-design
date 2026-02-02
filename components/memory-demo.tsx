"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Zap, ArrowRight, Clock, Tag } from "lucide-react";

interface Memory {
  id: number;
  text: string;
  tag: string;
  timestamp: string;
  strength: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const demoScenario = [
  {
    user: "I always take my coffee black in the morning, but I prefer lattes in the afternoon.",
    assistant:
      "Got it! Black coffee in the morning, lattes in the afternoon. Your preferences are noted.",
    memories: [
      {
        id: 1,
        text: "Prefers black coffee in mornings",
        tag: "preference",
        timestamp: "Just now",
        strength: 100,
      },
      {
        id: 2,
        text: "Prefers lattes in afternoons",
        tag: "preference",
        timestamp: "Just now",
        strength: 100,
      },
    ],
  },
  {
    user: "Actually, I've switched to oat milk for my afternoon drinks now.",
    assistant:
      "Updated! You now prefer oat milk lattes in the afternoon. I'll remember that.",
    memories: [
      {
        id: 1,
        text: "Prefers black coffee in mornings",
        tag: "preference",
        timestamp: "2m ago",
        strength: 100,
      },
      {
        id: 3,
        text: "Prefers oat milk lattes in afternoons",
        tag: "preference",
        timestamp: "Just now",
        strength: 100,
      },
    ],
    forgottenMemory: "Prefers lattes in afternoons",
  },
  {
    user: "What should I order at this new café?",
    assistant:
      "Based on the time (afternoon), I'd recommend trying their oat milk latte—it aligns with your preferences!",
    memories: [
      {
        id: 1,
        text: "Prefers black coffee in mornings",
        tag: "preference",
        timestamp: "5m ago",
        strength: 85,
      },
      {
        id: 3,
        text: "Prefers oat milk lattes in afternoons",
        tag: "preference",
        timestamp: "3m ago",
        strength: 95,
      },
    ],
    retrieved: true,
  },
];

export function MemoryDemo() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showForgotten, setShowForgotten] = useState(false);
  const [showRetrieval, setShowRetrieval] = useState(false);

  const currentScenario = demoScenario[step];

  const runStep = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowForgotten(false);
    setShowRetrieval(false);

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: currentScenario.user },
    ]);

    // Simulate processing delay
    setTimeout(() => {
      // Add assistant response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: currentScenario.assistant },
      ]);

      // Show forgotten memory animation if applicable
      if (currentScenario.forgottenMemory) {
        setShowForgotten(true);
        setTimeout(() => {
          setShowForgotten(false);
          setMemories(currentScenario.memories);
        }, 1500);
      } else if (currentScenario.retrieved) {
        setShowRetrieval(true);
        setMemories(currentScenario.memories);
        setTimeout(() => {
          setShowRetrieval(false);
        }, 2000);
      } else {
        setMemories(currentScenario.memories);
      }

      setIsAnimating(false);
    }, 1000);
  };

  const nextStep = () => {
    if (step < demoScenario.length - 1) {
      setStep(step + 1);
    }
  };

  const resetDemo = () => {
    setStep(0);
    setMessages([]);
    setMemories([]);
    setShowForgotten(false);
    setShowRetrieval(false);
  };

  const hasRun = messages.length > step * 2;

  return (
    <section id="demo" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">

          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Memory in Action
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Watch how GauzMem learns, associates, and intelligently forgets—just
            like human memory.
          </p>
        </div>

        {/* Demo Container */}
        <div className="relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 opacity-50 pointer-events-none" />

          <div className="relative grid md:grid-cols-5 gap-0">
            {/* Chat Panel */}
            <div className="md:col-span-3 border-r border-border/40 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/40">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <span className="ml-4 text-sm text-muted-foreground">
                  AI Agent Chat
                </span>
              </div>

              {/* Messages */}
              <div className="space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto pr-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user"
                        ? "bg-primary/20 text-foreground"
                        : "bg-secondary text-foreground"
                        }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-[200px] text-muted-foreground/50">
                    <p className="text-sm">
                      {"Click 'Run Step' to start the demo"}
                    </p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Step {step + 1} of {demoScenario.length}
                  </span>
                  <div className="flex gap-1">
                    {demoScenario.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 w-6 rounded-full transition-colors ${idx <= step && hasRun
                          ? "bg-primary"
                          : "bg-border"
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {step === demoScenario.length - 1 && hasRun ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetDemo}
                      className="border-border/60 bg-transparent"
                    >
                      Reset Demo
                    </Button>
                  ) : (
                    <>
                      {!hasRun ? (
                        <Button
                          size="sm"
                          onClick={runStep}
                          disabled={isAnimating}
                          className="bg-primary text-primary-foreground"
                        >
                          <Zap className="mr-2 h-4 w-4" />
                          Run Step
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            nextStep();
                          }}
                          className="bg-primary text-primary-foreground"
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Memory Panel */}
            <div className="md:col-span-2 bg-secondary/30 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Memories</h3>
              </div>

              <div className="space-y-3">
                {/* Forgotten Memory Animation */}
                {showForgotten && currentScenario.forgottenMemory && (
                  <div className="animate-pulse rounded-xl border border-red-500/30 bg-red-500/10 p-4 transition-all">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-red-400 line-through">
                        {currentScenario.forgottenMemory}
                      </p>
                      <span className="text-xs text-red-400">Forgetting...</span>
                    </div>
                  </div>
                )}

                {/* Memory Cards */}
                {memories.map((memory) => (
                  <div
                    key={memory.id}
                    className={`rounded-xl border border-border/60 bg-card/80 p-4 transition-all ${showRetrieval
                      ? "ring-2 ring-primary/50 shadow-[0_0_20px_rgba(0,200,200,0.2)]"
                      : ""
                      }`}
                  >
                    <p className="text-sm text-foreground mb-3">{memory.text}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                          <Tag className="h-3 w-3" />
                          {memory.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {memory.timestamp}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="h-1.5 w-12 rounded-full bg-border overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-500"
                              style={{ width: `${memory.strength}%` }}
                            />
                          </div>
                          <span>{memory.strength}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {memories.length === 0 && !showForgotten && (
                  <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground/50">
                    <Brain className="h-8 w-8 mb-2 opacity-30" />
                    <p className="text-sm text-center">
                      No memories yet.
                      <br />
                      Run the demo to see memory in action.
                    </p>
                  </div>
                )}
              </div>

              {/* Retrieval Indicator */}
              {showRetrieval && (
                <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-2 text-primary text-sm">
                    <Zap className="h-4 w-4" />
                    <span>Relevant memories retrieved for context</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
