import React from "react";

export default function Badge({ variant = "default", children, size = "md", dot = false, className = "" }) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] font-medium leading-none",
    md: "px-2.5 py-0.5 text-xs font-medium leading-normal",
    lg: "px-3 py-1 text-xs font-medium leading-normal"
  };

  const variantStyles = {
    // Inventory & States
    available: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/60",
    low_stock: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60",
    out_of_stock: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/60",
    issued: "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/60",

    // Membership Statuses
    active: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/60",
    restricted: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60",
    suspended: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/60",

    // Fine States
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/60",
    pending: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60",
    overdue: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/60",
    waived: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",

    // Severity Levels
    urgent: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/60",
    warning: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60",
    info: "bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-800/60",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/60",

    // Categories
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200/60 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800/60",
    default: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
  };

  const dotColors = {
    available: "bg-emerald-500",
    low_stock: "bg-amber-500",
    out_of_stock: "bg-rose-500",
    active: "bg-emerald-500",
    restricted: "bg-amber-500",
    paid: "bg-emerald-500",
    pending: "bg-amber-500",
    overdue: "bg-rose-500",
    urgent: "bg-rose-500",
    warning: "bg-amber-500",
    info: "bg-sky-500",
    success: "bg-emerald-500",
    default: "bg-slate-400"
  };

  const style = variantStyles[variant.toLowerCase()] || variantStyles.default;
  const dotColor = dotColors[variant.toLowerCase()] || dotColors.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border tracking-tight ${sizeClasses[size] || sizeClasses.md} ${style} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />}
      {children}
    </span>
  );
}
