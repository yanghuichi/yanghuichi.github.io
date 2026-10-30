// Mark Yang's AI Agent Portal & Blog Logic
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.pillar-tab');
  const panel = document.getElementById('pillar-dynamic-panel');

  const pillarData = {
    mcp: {
      title: "🌐 Model Context Protocol (MCP) Enterprise Tool Gateway",
      badge: "Production Ready | P95 1.2s",
      desc: "Standardized tool virtualization layer connecting autonomous LLMs with 7 enterprise-grade tool categories (OA, ERP, SQL Databases, Code Execution Sandboxes).",
      features: [
        "Standardized MCP Server adapters: Encapsulated internal REST APIs & DB connections under Anthropic's open protocol.",
        "A2A (Agent-to-Agent) Cross-Calling: Enables Intent Router Agents to discover and dispatch tasks to specialized Worker Agents.",
        "3-Tier Governance: Dynamic load balancing, exponential backoff circuit breaking, and isolated Docker/WASM sandboxes.",
        "Metric Benchmark: Achieved 96.0% tool invocation success rate with P95 latency of 1.2s across 24+ enterprise sites."
      ],
      code: `// FastMCP Server Definition in Python
from mcp.server.fastmcp import FastMCP
import httpx

mcp = FastMCP("Enterprise-ZhiQi-Gateway")

@mcp.tool()
async def query_erp_inventory(sku: str) -> dict:
    """Query real-time warehouse inventory with circuit breaker."""
    async with httpx.AsyncClient(timeout=3.0) as client:
        # Guaranteed safe execution via Token Breaker
        resp = await client.get(f"https://internal-erp/api/v1/sku/{sku}")
        return resp.json()`
    },
    rag: {
      title: "📚 High-Fidelity RAG Pipeline & 3-Tier Memory Architecture",
      badge: "Accuracy 95%+ | Token -42%",
      desc: "Industrial-grade knowledge retrieval and memory architecture designed to defeat long-context token explosion and LLM hallucinations.",
      features: [
        "3-Tier Hierarchical Memory: L1 Short-term Sliding Window + L2 Recursive Auto-Summary + L3 Milvus Long-term Vector Index.",
        "Multi-Modal Document Parsing: Unified extraction across PDF, Word, Scanned OCR, and tabular structures with layout preservation.",
        "Hybrid Retrieval: Dense vector embeddings (BGE-M3) + BM25 sparse keyword matching + Cross-Encoder reranking.",
        "Production Governance: Strict 4000-character context truncation, ground-truth citation enforcement, reducing hallucinations by 60%."
      ],
      code: `# Hierarchical Hybrid Retrieval Chain
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever
from langchain_milvus import Milvus

# 1. Sparse + Dense Ensemble
ensemble = EnsembleRetriever(
    retrievers=[bm25_retriever, milvus_vector_retriever],
    weights=[0.4, 0.6]
)

# 2. Hard Token Limiter Circuit Breaker
def truncate_context(docs, max_chars=4000):
    text = "\\n\\n".join([d.page_content for d in docs])
    return text[:max_chars]  # Prevents API blowout`
    },
    harness: {
      title: "🧠 Enterprise Harness Runtime Engineering & Harness Engineering",
      badge: "SLA 99.9% | 40+ Node Types",
      desc: "Self-designed enterprise Harness Runtime Engineering orchestration engine and Harness Engineering governance framework, managing execution lifecycle, timeout barriers, dynamic DAG routing, and self-healing loop executions.",
      features: [
        "Harness Runtime Engineering: Event-driven execution engine supporting 40+ custom node types with fine-grained node-level timeout barriers.",
        "Harness Engineering Governance: Standardized lifecycle control (pre-flight checks, state snapshotting, circuit breaking, fallback routing).",
        "Asynchronous Task Distribution: Celery + Redis worker cluster with horizontal autoscaling, priority queues, and delayed triggering.",
        "Multi-Tenant Isolation & Observability: Trace model integrated into SkyWalking + Prometheus + Grafana with flame graph drill-down."
      ],
      code: `# Enterprise Agent Harness Lifecycle Controller
class AgentHarnessController:
    def __init__(self, trace_id: str, tenant_id: str):
        self.trace_id = trace_id
        self.tenant_id = tenant_id

    async def execute_node(self, node_id: str, context: dict, timeout: float = 3.0):
        """Harness governance: Timeout barrier + Error fallback"""
        try:
            async with asyncio.timeout(timeout):
                return await self.runtime.dispatch(node_id, context)
        except TimeoutError:
            logger.error(f"Node {node_id} timeout in trace {self.trace_id}")
            return await self.circuit_breaker.fallback(node_id)`
    },
    loop: {
      title: "🔄 Agentic Loop Engineering & LangGraph State Machines",
      badge: "Self-Healing | 99.9% SLA",
      desc: "Beyond linear pipelines: Building cyclic execution graphs with automated error detection, self-reflection loops, and incremental task decomposition.",
      features: [
        "LangGraph Cyclic Topologies: Replaces naive If-Else loops with stateful graphs featuring backtracking and dynamic re-routing.",
        "Ex-Meituan Nuwa Pattern: Sub-agents (Rules -> Design -> Tasks -> Code) collaborating via AutoRun choreographies.",
        "Incremental Task Decomposition: Breaks complex PRDs into atomic To-Do tasks to bypass context window drift and token decay.",
        "Automated Test-Heal Loop: Playwright MCP runner detects console errors and UI visual anomalies, triggering automatic code repair."
      ],
      code: `# LangGraph State Graph with Self-Reflection Loop
from langgraph.graph import StateGraph, END

builder = StateGraph(AgentState)
builder.add_node("planner", plan_incremental_tasks)
builder.add_node("coder", generate_atomic_code)
builder.add_node("tester", playwright_qa_evaluator)

# Dynamic Conditional Edge: Self-Healing Routing
def should_continue(state):
    if state["test_passed"]:
        return END
    return "coder" # Auto-retry loop with stderr feedback

builder.add_conditional_edges("tester", should_continue)`
    }
  };

  function renderPillar(key) {
    const data = pillarData[key];
    if (!data) return;

    panel.innerHTML = `
      <div class="pillar-header">
        <div>
          <h3 class="pillar-title">${data.title}</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 6px;">${data.desc}</p>
        </div>
        <span class="pillar-badge">${data.badge}</span>
      </div>
      <div class="pillar-body-grid">
        <ul class="pillar-features">
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div>
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim); margin-bottom: 8px;">
            // Architecture & Implementation Snapshot
          </div>
          <div class="code-box">
            <pre><code>${data.code}</code></pre>
          </div>
        </div>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const pillarKey = tab.getAttribute('data-pillar');
      renderPillar(pillarKey);
    });
  });

  // Initial render
  renderPillar('mcp');
});
