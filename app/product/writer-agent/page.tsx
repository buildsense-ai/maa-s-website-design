"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const toolChain = [
  {
    title: "docasplan",
    description: "调用 writer 中的 docasplan 进行更新 md 计划文档。",
  },
  {
    title: "memory_rag",
    description: "调用记忆工具 search，检索相关上下文与历史知识。",
  },
  {
    title: "read_outline",
    description: "从 minio 读取 plan，保证文档生成流程解耦。",
  },
];

const roadmap = [
  {
    title: "记忆接入复查",
    description:
      "让 memory_rag 的 search/extract 对接最新的 agent search，符合新记忆系统。",
  },
  {
    title: "多平台协同",
    description:
      "Web app 作为深度工作区，Local app 负责信息收集、划词入库与文件上传。",
  },
  {
    title: "Websearch / Deep Research",
    description:
      "考虑将 deepresearch 包装成工具，让用户可直接触发或由 agent 调用。",
  },
  {
    title: "编辑体验迭代",
    description:
      "评估 Latex + Markdown 或 Overleaf + Google Doc 风格的可用性。",
  },
  {
    title: "Next 3 Sentence",
    description:
      "结合记忆检索与小模型，实现“续写三句”能力。",
  },
];

const issues = [
  {
    title: "双层 Agent 架构噪音",
    detail:
      "MainAgent 只做路由，task_agent_tool 只是包装，增加复杂度与延迟。",
  },
  {
    title: "工具定义分散",
    detail:
      "tools_simplified 与 task_agent_tool 分散维护，调用关系硬编码。",
  },
  {
    title: "Prompt 混乱",
    detail:
      "主 Prompt 与技能 Prompt 的对应关系不清晰，难以扩展。",
  },
];

const phases = [
  {
    title: "Phase 1: Tool Registry",
    detail: "统一管理工具，支持技能域动态挂载。",
  },
  {
    title: "Phase 2: 工具拆分",
    detail: "将数据库/搜索工具独立到 todo_tools、search_tools。",
  },
  {
    title: "Phase 3: 统一 Agent",
    detail: "MemoryDrivenAgent 负责检索、构建 Prompt 与工具执行。",
  },
  {
    title: "Phase 4: Prompt 重组",
    detail: "基础 Prompt + 技能 Prompt + 记忆融合。",
  },
  {
    title: "Phase 5: 清理旧代码",
    detail: "删除旧路由 Agent 与多余包装层。",
  },
];

export default function WriterAgentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="hero-section">
        <div className="hero-background">
          <div className="glow-orb orb-1" />
          <div className="glow-orb orb-2" />
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <div className="mb-8 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 backdrop-blur-sm">
              Writer Agent
            </div>
            <h1 className="hero-title text-balance text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Writer is the first
              <br />
              MaaS memory application.
            </h1>
            <p className="hero-subtitle mt-6 max-w-xl text-pretty text-lg md:text-xl">
              It decouples document generation with memory-native tools and a
              single MemoryDrivenAgent, enabling long-horizon drafting with
              structured planning and retrieval.
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="prop-mesh-wrap" />
          </div>
        </div>
      </section>

      <section className="feature-section light-section">
        <div className="mx-auto max-w-6xl px-6 py-20 space-y-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/80 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground">工具链</h2>
              <div className="mt-6 space-y-4">
                {toolChain.map((tool) => (
                  <div key={tool.title} className="rounded-xl border border-border/60 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-foreground">{tool.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/80 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground">系统架构</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                MainAgent 与 ReActAgent 双层结构带来额外延迟，目标是统一为单层
                MemoryDrivenAgent，并将工具与 Prompt 体系重构为可扩展的模块化框架。
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-white/80 p-4">
                <Image
                  src="/assets/image-07b8423c-06b1-409d-ba88-f4d2fe9da3ca.png"
                  alt="Writer PRD Architecture Diagram"
                  width={1200}
                  height={680}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {issues.map((issue) => (
              <div key={issue.title} className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{issue.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{issue.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">目标架构与重构阶段</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {phases.map((phase) => (
                <div key={phase.title} className="rounded-xl border border-border/60 bg-white/70 p-4">
                  <p className="text-sm font-semibold text-foreground">{phase.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{phase.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">后续修改方案</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {roadmap.map((item) => (
                <div key={item.title} className="rounded-xl border border-border/60 bg-white/70 p-4">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
