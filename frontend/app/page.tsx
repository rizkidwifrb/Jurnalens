"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Database, Network, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { AnswerPanel } from "@/components/ai/answer-panel";
import { ResearchGraph } from "@/components/graph/research-graph";
import { SearchBox } from "@/components/search/search-box";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  const features: Array<[string, string, LucideIcon]> = [
    ["Hybrid search", "BM25, vector retrieval, reranking, and citation-aware results in one loop.", Database],
    ["Grounded AI", "Summaries, research gaps, methodology, novelty, and roadmap with citations.", Sparkles],
    ["Research graph", "Papers, authors, topics, and journals mapped into an interactive graph.", Network],
    ["Local-first", "Free local infrastructure with optional OpenRouter, Semantic Scholar, and CORE keys.", ShieldCheck]
  ];

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-8">
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-60" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-black">AI</span>
          <span>Academic Research Engine</span>
        </Link>
        <div className="flex gap-2">
          <Link href="/login" className="rounded-md px-3 py-2 text-sm text-muted transition hover:text-foreground">Login</Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition hover:-translate-y-0.5">
            Open app <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <section className="relative mx-auto grid max-w-7xl gap-10 pb-10 pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs text-muted">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Research intelligence, locally runnable
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-7xl">
              Search less. Understand research faster.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#aebbc9]">
              A premium academic AI workspace for semantic search, grounded answers, PDF chat, citation exports, recommendations, and research graphs.
            </p>
          </div>
          <SearchBox large onSearch={(query) => { window.location.href = `/search?q=${encodeURIComponent(query)}`; }} />
          <div className="flex flex-wrap gap-2 text-xs text-muted">
            {["OpenAlex", "arXiv", "Crossref", "Semantic Scholar optional", "CORE optional", "Qdrant", "OpenSearch"].map((item) => <span key={item} className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-2">{item}</span>)}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }} className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2 shadow-[0_30px_120px_rgba(0,0,0,0.38)]">
            <AnswerPanel
              answer="The retrieved papers suggest student depression detection is moving from survey-only screening toward NLP, affective computing, and multimodal prediction. Strong future work should compare text-only baselines with transparent, privacy-aware multimodal models. Confidence: Medium."
              citations={[{ index: 1, title: "Student mental health prediction", doi: "Not available" }]}
            />
          </div>
          <div className="h-72 overflow-hidden rounded-lg border border-white/10 bg-white">
            <ResearchGraph />
          </div>
        </motion.div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-4 pb-16 md:grid-cols-4">
        {features.map(([label, copy, Icon]) => (
          <Card key={label} className="min-h-44 transition duration-300 hover:-translate-y-1 hover:border-white/20">
            <Icon className="mb-5 h-5 w-5 text-accent" />
            <h2 className="font-semibold">{label}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
