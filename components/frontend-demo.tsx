"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Utensils, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/translations";

type Scene = 1 | 2 | 3 | 4;

const sceneTitles: Record<Scene, TranslationKey> = {
  1: "demoSceneConversation",
  2: "demoSceneExtraction",
  3: "demoSceneGraph",
  4: "demoSceneRecall",
};

interface ChatInterfaceProps {
  scene: Scene;
}

function ChatInterface({ scene }: ChatInterfaceProps) {
  const { t } = useLanguage();
  const [userMessageVisible, setUserMessageVisible] = useState(false);
  const [agentTypingProgress, setAgentTypingProgress] = useState(0);

  const scene1UserMessage = t("demoUserMessage1");
  const scene1AgentMessage = t("demoAgentMessage1");

  const scene4UserMessage = t("demoUserMessage2");
  const scene4AgentMessage = t("demoAgentMessage2");

  useEffect(() => {
    if (scene === 1) {
      setUserMessageVisible(false);
      setAgentTypingProgress(0);

      setTimeout(() => setUserMessageVisible(true), 800);

      setTimeout(() => {
        const interval = setInterval(() => {
          setAgentTypingProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 2;
          });
        }, 40);
        return () => clearInterval(interval);
      }, 2200);
    } else if (scene === 4) {
      setUserMessageVisible(false);
      setAgentTypingProgress(0);

      setTimeout(() => setUserMessageVisible(true), 500);
      setTimeout(() => setAgentTypingProgress(100), 1500);
    }
  }, [scene]);

  const isScene4 = scene === 4;
  const userMessage = isScene4 ? scene4UserMessage : scene1UserMessage;
  const agentMessage = isScene4 ? scene4AgentMessage : scene1AgentMessage;
  const visibleAgentText = agentMessage.slice(0, Math.floor(agentMessage.length * (agentTypingProgress / 100)));
  const chatPositionClass = isScene4
    ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
    : "relative";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={chatPositionClass}
    >
      <div className="w-[600px] h-[200px] relative">
        <AnimatePresence>
          {userMessageVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-0 right-0"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 max-w-[480px] shadow-2xl">
                <div className="text-[15px] leading-relaxed whitespace-pre-line font-light">
                  {userMessage}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {agentTypingProgress > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute bottom-0 left-0"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 max-w-[480px] shadow-2xl">
                <div className="text-[15px] leading-relaxed font-light text-white/90">
                  {visibleAgentText}
                  {agentTypingProgress < 100 && (
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-[2px] h-[18px] bg-white/60 ml-1 align-middle"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface MemoryPanelProps {
  scene: 2 | 3;
}

interface Memory {
  id: string;
  text: string;
  category: string;
  icon: typeof Brain;
  color: string;
}

function useMemories() {
  const { t } = useLanguage();
  return [
    {
      id: "1",
      text: t("demoMemoryText1"),
      category: t("demoMemoryCategory1"),
      icon: Brain,
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      id: "2",
      text: t("demoMemoryText2"),
      category: t("demoMemoryCategory2"),
      icon: Utensils,
      color: "from-green-500/20 to-green-600/10",
    },
    {
      id: "3",
      text: t("demoMemoryText3"),
      category: t("demoMemoryCategory3"),
      icon: Clock,
      color: "from-purple-500/20 to-purple-600/10",
    },
  ];
}

function MemoryPanel({ scene }: MemoryPanelProps) {
  const { t } = useLanguage();
  const memories = useMemories();
  const [visibleMemories, setVisibleMemories] = useState<string[]>([]);

  useEffect(() => {
    if (scene === 2) {
      memories.forEach((memory, index) => {
        setTimeout(() => {
          setVisibleMemories((prev) => [...prev, memory.id]);
        }, 800 + index * 400);
      });
    } else if (scene === 3) {
      setVisibleMemories([]);
    }
  }, [scene]);

  if (scene === 3) {
    return null;
  }

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      className="absolute right-0 top-0 bottom-0 w-[420px] z-20 flex items-center"
    >
      <div className="w-full h-[600px] bg-black/40 backdrop-blur-2xl border-l border-white/10 shadow-2xl">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <div className="text-lg font-light text-white/90 mb-1">{t("demoMemoryTitle")}</div>
            <div className="text-xs text-white/40">{t("demoMemorySubtitle")}</div>
          </motion.div>

          <div className="space-y-4">
            {memories.map((memory) => {
              const Icon = memory.icon;
              const isVisible = visibleMemories.includes(memory.id);

              return (
                <AnimatePresence key={memory.id}>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <div
                        className={`bg-gradient-to-br ${memory.color} backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-xl`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            <Icon className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1">
                            <div className="text-[15px] font-light text-white/90 leading-relaxed mb-3">
                              {memory.text}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-[11px] uppercase tracking-wider text-white/40 bg-white/5 px-2 py-1 rounded">
                                {memory.category}
                              </div>
                              <div className="text-[11px] text-white/30">{t("demoMemoryTime")}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          {visibleMemories.length === memories.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12 text-center text-sm text-white/40 font-light"
            >
              {t("demoMemoryFooter")}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface Node {
  id: string;
  label: TranslationKey;
  x: number;
  y: number;
  active?: boolean;
  central?: boolean;
}

interface Edge {
  from: string;
  to: string;
}

const nodes: Node[] = [
  { id: "fitness", label: "demoGraphNodeFitness", x: 400, y: 200, central: true },
  { id: "dairy", label: "demoGraphNodeDairy", x: 200, y: 300 },
  { id: "evening", label: "demoGraphNodeEvening", x: 600, y: 300 },
  { id: "health", label: "demoGraphNodeHealth", x: 400, y: 400, central: true },
  { id: "dinner", label: "demoGraphNodeDinner", x: 300, y: 500 },
];

const edges: Edge[] = [
  { from: "fitness", to: "health" },
  { from: "dairy", to: "health" },
  { from: "evening", to: "health" },
  { from: "health", to: "dinner" },
  { from: "fitness", to: "dairy" },
  { from: "fitness", to: "evening" },
  { from: "fitness", to: "dinner" },
  { from: "dairy", to: "evening" },
  { from: "dairy", to: "dinner" },
  { from: "evening", to: "dinner" },
];

interface GraphViewProps {
  scene?: number;
}

function GraphView({ scene }: GraphViewProps) {
  const { t } = useLanguage();
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);
  const [visibleEdges, setVisibleEdges] = useState<Edge[]>([]);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    setVisibleNodes([]);
    setVisibleEdges([]);
    setHighlightedNodes([]);
    setShowSubtitle(false);

    nodes.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes((prev) => [...prev, node.id]);
      }, 300 + index * 200);
    });

    setTimeout(() => {
      setVisibleEdges(edges);
    }, 1800);

    if (scene === 3) {
      setTimeout(() => {
        setShowSubtitle(true);
      }, 2800);

      const pulseInterval = setInterval(() => {
        setHighlightedNodes(["health"]);
        setTimeout(() => setHighlightedNodes([]), 800);
      }, 3000);

      return () => clearInterval(pulseInterval);
    }

    if (scene === 4) {
      setTimeout(() => {
        setHighlightedNodes(["dairy", "evening", "fitness"]);
      }, 1500);
    }
  }, [scene]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex items-center justify-center z-0"
    >
      <div className="relative w-[800px] h-[700px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid meet">
          {visibleEdges.map((edge, index) => {
            const fromNode = nodes.find((node) => node.id === edge.from);
            const toNode = nodes.find((node) => node.id === edge.to);
            if (!fromNode || !toNode) return null;

            const isHighlightedEdge =
              highlightedNodes.includes(edge.from) && highlightedNodes.includes(edge.to);

            return (
              <motion.line
                key={`${edge.from}-${edge.to}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: isHighlightedEdge ? 0.6 : 0.4,
                }}
                transition={{
                  pathLength: {
                    duration: 1.2,
                    delay: index * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  },
                  opacity: {
                    duration: 0.5,
                    delay: index * 0.08,
                  },
                }}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isHighlightedEdge ? "rgba(100, 150, 255, 0.5)" : "rgba(255, 255, 255, 0.3)"}
                strokeWidth={isHighlightedEdge ? "2" : "1.5"}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const isVisible = visibleNodes.includes(node.id);
          const isHighlighted = highlightedNodes.includes(node.id);
          const isFaded = scene === 4 && highlightedNodes.length > 0 && !isHighlighted;

          return (
            <AnimatePresence key={node.id}>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: isFaded ? 0.2 : 1,
                    scale: isHighlighted ? 1.08 : 1,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.4, 0, 0.2, 1],
                    scale: {
                      duration: 0.4,
                    },
                  }}
                  className="absolute"
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className={`
                      relative
                      ${node.central ? "bg-white/15" : "bg-white/8"}
                      backdrop-blur-xl
                      border
                      ${isHighlighted ? "border-white/40" : "border-white/20"}
                      rounded-2xl
                      px-6 py-4
                      shadow-2xl
                      transition-all duration-400
                    `}
                  >
                    {isHighlighted && (
                      <>
                        <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl" />
                        <div className="absolute inset-0 bg-blue-400/5 rounded-2xl blur-2xl scale-150" />
                      </>
                    )}

                    <div className="relative text-sm font-light text-white/90 whitespace-nowrap">
                      {t(node.label)}
                    </div>

                    {node.central && !isFaded && (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400/60 rounded-full blur-sm"
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      <AnimatePresence>
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
          >
            <div className="text-sm text-white/50 font-light">
              {t("demoGraphSubtitle")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SceneTitleProps {
  title: TranslationKey;
}

function SceneTitle({ title }: SceneTitleProps) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="absolute top-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="text-xs uppercase tracking-[0.2em] text-white/40 font-light">
        {t(title)}
      </div>
    </motion.div>
  );
}

export function FrontendDemo() {
  const { t } = useLanguage();
  const [scene, setScene] = useState<Scene>(1);
  const [showBlurOverlay, setShowBlurOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScene((prev) => (prev === 4 ? 1 : ((prev + 1) as Scene)));
    }, 5000);

    return () => clearTimeout(timer);
  }, [scene]);

  useEffect(() => {
    if (scene === 4) {
      const showTimer = setTimeout(() => {
        setShowBlurOverlay(true);
      }, 3500);

      const hideTimer = setTimeout(() => {
        setShowBlurOverlay(false);
      }, 5000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }

    setShowBlurOverlay(false);
  }, [scene]);

  return (
    <section id="demo" className="relative -mt-12 pb-32 px-6">
      <div className="relative mx-auto max-w-6xl">
        <div className="absolute inset-x-0 -top-24 h-24 bg-[linear-gradient(180deg,rgba(5,5,9,0)_0%,rgba(5,5,9,0.6)_70%,rgba(5,5,9,1)_100%)] pointer-events-none" />
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(5,5,9,0.55)]">
          <div className="relative h-[680px] bg-transparent text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#050509] via-[#101018] to-[#161a2f]" />
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E\")",
              }}
            />
            <div className="relative h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

              {(scene === 1 || scene === 2) && (
                <>
                  <ChatInterface key="main-chat" scene={scene} />
                  {scene === 2 && <MemoryPanel scene={scene} />}
                </>
              )}

              {scene === 3 && <GraphView scene={scene} />}

              {scene === 4 && (
                <>
                  <GraphView scene={scene} />
                  <ChatInterface scene={scene} />
                </>
              )}
            </div>

            <AnimatePresence>
              {scene === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 bg-black pointer-events-none z-10"
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showBlurOverlay && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 bg-black/30 pointer-events-none z-25"
                  style={{ backdropFilter: "blur(8px)" }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showBlurOverlay && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30"
                >
                  <div className="text-base text-white/90 font-light">
                    {t("demoOverlayText")} <span className="font-semibold">GauzMem</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <SceneTitle title={sceneTitles[scene]} />
          </div>
        </div>
      </div>
    </section>
  );
}
