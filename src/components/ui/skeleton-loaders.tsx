import React from "react";

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded animate-pulse flex-1" />
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="px-4 py-3.5 flex items-center gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                className="h-4 bg-slate-200/80 rounded animate-pulse flex-1"
                style={{ width: `${60 + ((r + c) % 4) * 10}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
      <div className="flex justify-between items-center">
        <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
        <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse" />
      </div>
      <div className="h-7 w-36 bg-slate-200 rounded animate-pulse" />
      <div className="h-3 w-48 bg-slate-200/70 rounded animate-pulse" />
    </div>
  );
}

export function StatsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
