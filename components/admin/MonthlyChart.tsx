"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type MonthlyPoint = { month: string; leads: number; serviceInquiries: number; aiInquiries: number };

export default function MonthlyChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <div className="glass p-5">
      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-white/40">Monthly Activity</p>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e38" />
            <XAxis dataKey="month" stroke="#6b6b90" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6b6b90" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: "#0d0d20", border: "1px solid #1e1e38", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="leads" name="Contact Leads" stroke="#22d3ee" strokeWidth={2} dot={false} />
            <Line
              type="monotone"
              dataKey="serviceInquiries"
              name="Service Inquiries"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="aiInquiries"
              name="AI Inquiries"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
