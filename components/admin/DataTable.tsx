"use client";

import { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
};

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  loading,
  emptyMessage = "Nothing here yet.",
  onRowClick,
  page,
  pageSize,
  total,
  onPageChange,
}: {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}) {
  const showPagination = page !== undefined && pageSize !== undefined && total !== undefined && onPageChange;
  const totalPages = showPagination ? Math.max(1, Math.ceil(total! / pageSize!)) : 1;

  return (
    <div className="glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/40">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3.5 font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-white/40">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-white/40">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-white/5 text-white/80 transition-colors last:border-0 ${
                    onRowClick ? "cursor-pointer hover:bg-white/[0.03]" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 align-top">
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-3.5 text-xs text-white/50">
          <span>
            Page {page} of {totalPages} · {total} total
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page! <= 1}
              onClick={() => onPageChange!(page! - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/25 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={page! >= totalPages}
              onClick={() => onPageChange!(page! + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/25 hover:text-white disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
