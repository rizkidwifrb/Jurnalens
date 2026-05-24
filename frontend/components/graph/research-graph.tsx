"use client";

import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  { id: "paper", position: { x: 80, y: 80 }, data: { label: "Paper" }, type: "input" },
  { id: "author", position: { x: 330, y: 20 }, data: { label: "Author" } },
  { id: "topic", position: { x: 330, y: 150 }, data: { label: "Topic" } },
  { id: "journal", position: { x: 590, y: 80 }, data: { label: "Journal" }, type: "output" }
];
const edges = [
  { id: "e1", source: "paper", target: "author", label: "written by" },
  { id: "e2", source: "paper", target: "topic", label: "related to" },
  { id: "e3", source: "paper", target: "journal", label: "published in" }
];

export function ResearchGraph() {
  return (
    <div className="h-[520px] overflow-hidden rounded-lg border border-border bg-white text-black">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
