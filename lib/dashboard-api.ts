// Dashboard API types and fetch utilities

export interface DashboardStats {
  facts_count: number;
  chunks_count: number;
  sources_count: number;
  relations_count: number;
  uncomfortable_distribution: { high: number; medium: number; low: number };
  relation_types: { type: string; count: number }[];
  ingestion_timeline: { day: string; count: number }[];
  facts_timeline: { day: string; count: number }[];
}

export interface Fact {
  fact_id: number;
  content: string;
  uncomfortable_score: number;
  relation_count?: number;
  created_at?: string;
  matched?: string[];
}

export interface Chunk {
  chunk_id: number;
  turn: string | null;
  text_preview: string;
  text_length: number;
  facts_count: number;
  created_at: string;
}

export interface Relation {
  source_content: string;
  target_content: string;
  relation_type: string;
  confidence: number;
  meta_type?: string;
}

export interface Subgraph {
  facts: Fact[];
  relations: Relation[];
  facts_count: number;
  relations_count: number;
}

export interface SearchBundle {
  relevance_score: number;
  facts: { content: string }[];
  chunks: { content: string }[];
}

export interface DashboardConfig {
  apiBase: string;
  projectId: string;
}

const DEFAULT_CONFIG: DashboardConfig = {
  apiBase: '',
  projectId: 'claude_code_memory',
};

let _config = { ...DEFAULT_CONFIG };

export function getConfig(): DashboardConfig {
  return _config;
}

export function setConfig(c: Partial<DashboardConfig>) {
  _config = { ..._config, ...c };
}

function apiUrl(path: string, params?: Record<string, string>) {
  const base = _config.apiBase.replace(/\/+$/, '') || window.location.origin;
  const url = new URL(path, base);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }
  return url.toString();
}

export async function checkHealth(): Promise<'healthy' | 'degraded' | 'offline'> {
  try {
    const res = await fetch(apiUrl('/api/v1/admin/health'));
    const data = await res.json();
    return data.status === 'healthy' ? 'healthy' : 'degraded';
  } catch {
    return 'offline';
  }
}

export async function fetchStats(): Promise<DashboardStats> {
  const res = await fetch(apiUrl('/api/v1/admin/dashboard/stats', { project_id: _config.projectId }));
  const data = await res.json();
  if (!data.success) throw new Error('Failed to load stats');
  return data.stats;
}

export async function fetchFacts(page: number, sort: string, minScore: string): Promise<{ facts: Fact[]; total: number }> {
  const res = await fetch(apiUrl('/api/v1/admin/dashboard/facts', {
    project_id: _config.projectId,
    page: String(page),
    page_size: '20',
    sort,
    min_score: minScore,
  }));
  const data = await res.json();
  if (!data.success) throw new Error('API error');
  return { facts: data.facts, total: data.total };
}

export async function fetchUnresolved(): Promise<{ facts: Fact[]; total: number }> {
  const res = await fetch(apiUrl('/api/v1/admin/dashboard/unresolved', { project_id: _config.projectId }));
  const data = await res.json();
  if (!data.success) throw new Error('API error');
  return { facts: data.facts, total: data.total || data.facts.length };
}

export async function fetchChunks(): Promise<Chunk[]> {
  const res = await fetch(apiUrl('/api/v1/admin/dashboard/chunks', { project_id: _config.projectId }));
  const data = await res.json();
  if (!data.success) throw new Error('API error');
  return data.chunks;
}

export async function fetchChunkFacts(chunkId: number): Promise<Fact[]> {
  const res = await fetch(apiUrl(`/api/v1/admin/dashboard/chunks/${chunkId}/facts`, { project_id: _config.projectId }));
  const data = await res.json();
  if (!data.success) throw new Error('API error');
  return data.facts;
}

export async function fetchSubgraphs(page: number): Promise<{ subgraphs: Subgraph[]; total: number }> {
  const res = await fetch(apiUrl('/api/v1/admin/dashboard/subgraphs', {
    project_id: _config.projectId,
    page: String(page),
    page_size: '10',
  }));
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
  if (!data.success) throw new Error('API error');
  return { subgraphs: data.subgraphs, total: data.total };
}

export async function searchBundles(query: string): Promise<SearchBundle[]> {
  const base = _config.apiBase.replace(/\/+$/, '') || window.location.origin;
  const res = await fetch(`${base}/api/v1/memories/search/bundle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      project_id: _config.projectId,
      query,
      top_k: 20,
      search_mode: 'hybrid',
    }),
  });
  const data = await res.json();
  return data.bundles || [];
}

// ========== Passive Recall ==========

export interface RecallResult {
  recall: string;
  facts_count: number;
  subgraph_count: number;
}

/**
 * Passive recall — 被动记忆召回。
 *
 * 输入用户的一句话，返回自然语言格式的回忆片段，
 * 可直接作为 LLM prompt 的 {recall} 占位符填充。
 *
 * 内部流程：semantic search → graph expansion → 连通分量 → BFS树 → 自然语言
 */
export async function passiveRecall(query: string): Promise<RecallResult> {
  const base = _config.apiBase.replace(/\/+$/, '') || window.location.origin;
  const res = await fetch(`${base}/api/v1/memories/recall`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      project_id: _config.projectId,
      query,
    }),
  });
  const data = await res.json();
  return {
    recall: data.recall || '',
    facts_count: data.facts_count || 0,
    subgraph_count: data.subgraph_count || 0,
  };
}

// LLM summarization
const SUMMARIZER = {
  apiBase: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  model: 'qwen3-next-80b-a3b-instruct',
  apiKey: 'sk-0f666c8a6d7147f69b1dd240aab34c75',
  timeoutMs: 45000,
};

function truncateText(s: string, max: number) {
  return s.length <= max ? s : s.slice(0, max - 3) + '...';
}

export async function summarizeSubgraph(sg: Subgraph): Promise<string> {
  const factsText = sg.facts.slice(0, 40).map((f, i) => `${i + 1}. ${truncateText(f.content || '', 220)}`).join('\n');
  const relsText = sg.relations.slice(0, 80).map((r, i) => {
    return `${i + 1}. [${r.relation_type || 'related_to'}] ${truncateText(r.source_content || '', 120)} -> ${truncateText(r.target_content || '', 120)}`;
  }).join('\n');

  const prompt = [
    '根据下面记忆子图，写一段"回忆式总结"。',
    '要求：',
    '- 只输出一个自然段，中文，100~220字。',
    '- 要忠实于事实，不要添加未出现的信息。',
    '- 要把核心计划、时间点、动作和结论说清楚。',
    '',
    `facts_count=${sg.facts_count}, relations_count=${sg.relations_count}`,
    '',
    '[FACTS]', factsText || '(none)',
    '', '[RELATIONS]', relsText || '(none)',
  ].join('\n');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUMMARIZER.timeoutMs);
  try {
    const res = await fetch(`${SUMMARIZER.apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUMMARIZER.apiKey}`,
      },
      body: JSON.stringify({
        model: SUMMARIZER.model,
        temperature: 0.2,
        max_tokens: 320,
        messages: [
          { role: 'system', content: '你是记忆归纳助手，只做忠实改写。' },
          { role: 'user', content: prompt },
        ],
      }),
      signal: controller.signal,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty LLM response');
    return content.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/\n{2,}/g, '\n').trim();
  } finally {
    clearTimeout(timer);
  }
}

// Chat completion types and function
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chatCompletion(messages: ChatMessage[]): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUMMARIZER.timeoutMs);
  try {
    const res = await fetch(`${SUMMARIZER.apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUMMARIZER.apiKey}`,
      },
      body: JSON.stringify({
        model: SUMMARIZER.model,
        temperature: 0.7,
        max_tokens: 1024,
        messages,
      }),
      signal: controller.signal,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty LLM response');
    return content.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/\n{2,}/g, '\n').trim();
  } finally {
    clearTimeout(timer);
  }
}

export function fallbackSummary(sg: Subgraph): string {
  const facts = sg.facts.slice(0, 3).map(f => (f.content || '').trim()).filter(Boolean);
  const typeCount: Record<string, number> = {};
  for (const r of sg.relations) {
    const t = r.relation_type || 'related_to';
    typeCount[t] = (typeCount[t] || 0) + 1;
  }
  const topTypes = Object.entries(typeCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k}:${v}`).join(', ');
  const lead = facts.length ? `核心内容包括：${facts.join('；')}` : '这是一组围绕同一主题的关联记忆。';
  return `${lead}。整体关系以 ${topTypes || 'related_to'} 为主，说明这段讨论主要在做计划拆解、信息补充与决策确认。`;
}

// ========== SourceBuffer: Ingest & Flush ==========

/**
 * Ingest a single message into GauzMem (goes through SourceBuffer).
 * Fire-and-forget — caller should not await unless they need the result.
 */
export async function ingestMessage(
  text: string,
  speaker: 'user' | 'agent'
): Promise<{ success: boolean; status?: string }> {
  try {
    const base = _config.apiBase.replace(/\/+$/, '') || window.location.origin;
    const res = await fetch(`${base}/api/v1/memories/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: _config.projectId,
        message: {
          text,
          speaker,
          user_id: 'playground',
        },
        async_mode: true,
      }),
    });
    const data = await res.json();
    return { success: data.success ?? res.ok, status: data.status };
  } catch {
    return { success: false };
  }
}

/**
 * Explicitly flush the source buffer (call on session end / page unload).
 */
export async function flushBuffer(
  contentType: string = 'conversation'
): Promise<{ flushed: boolean }> {
  try {
    const base = _config.apiBase.replace(/\/+$/, '') || window.location.origin;
    const res = await fetch(`${base}/api/v1/memories/buffer/flush`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: _config.projectId,
        content_type: contentType,
      }),
    });
    const data = await res.json();
    return { flushed: data.flushed ?? false };
  } catch {
    return { flushed: false };
  }
}

/**
 * Build the flush beacon payload for use with navigator.sendBeacon on page unload.
 */
export function buildFlushBeaconPayload(contentType: string = 'conversation'): Blob {
  return new Blob(
    [JSON.stringify({ project_id: _config.projectId, content_type: contentType })],
    { type: 'application/json' }
  );
}

/**
 * Get the flush endpoint URL for sendBeacon.
 */
export function getFlushEndpointUrl(): string {
  const base = _config.apiBase.replace(/\/+$/, '') || window.location.origin;
  return `${base}/api/v1/memories/buffer/flush`;
}
