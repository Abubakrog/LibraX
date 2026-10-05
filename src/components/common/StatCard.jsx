import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  description,
  trend,
  trendType = "up", // 'up' | 'down' | 'neutral'
  icon: Icon,
  onClick,
  className = ""
}) {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-tight">
            {title}
          </span>
          {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0" />}
        </div>

        <div className="mt-2.5">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight tabular-nums">
            {typeof value === "number" ? value.toLocaleString() : value}
          </h3>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="truncate max-w-[65%] text-[11px]">
          {description}
        </span>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium tracking-tight ${
              trendType === "up"
                ? "text-emerald-600 dark:text-emerald-400"
                : trendType === "down"
                ? "text-rose-600 dark:text-rose-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {trendType === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : trendType === "down" ? (
              <TrendingDown className="w-3 h-3" />
            ) : null}
            <span>{trend}</span>
          </span>
        )}
      </div>
    </div>
  );
}
