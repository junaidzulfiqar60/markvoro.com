"use client";

import AgentCard from "@/components/ui/AgentCard";
import { aiAgents } from "@/lib/data";

// Client component that owns its own data import — Lucide icon components
// (functions) can't be passed as props across the server/client boundary,
// so this can't receive `aiAgents` from a Server Component page instead.
export default function AIAgentsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {aiAgents.map((agent, i) => (
        <AgentCard key={agent.name} agent={agent} index={i} />
      ))}
    </div>
  );
}
