import React from "react";
import { BookOpen } from "lucide-react";

export default function BookCover({
  title = "Book Title",
  author = "Author Name",
  category = "Academic",
  color = "from-slate-800 to-slate-900",
  tag = "TEXTBOOK",
  size = "md", // xs, sm, md, lg, xl
  className = ""
}) {
  const sizeClasses = {
    xs: "w-9 h-12 rounded-[4px] p-1.5 text-[8px]",
    sm: "w-14 h-20 rounded-[5px] p-2 text-[9px]",
    md: "w-24 h-36 rounded-md p-2.5 text-[11px]",
    lg: "w-40 h-56 rounded-lg p-4 text-xs",
    xl: "w-48 h-64 rounded-lg p-5 text-sm"
  };

  // Dignified palette mappings for clean academic covers
  const colorMap = {
    "from-blue-600 to-indigo-800": "bg-slate-900 border-l-[3px] border-l-sky-500",
    "from-emerald-600 to-teal-800": "bg-slate-900 border-l-[3px] border-l-emerald-500",
    "from-indigo-600 to-violet-800": "bg-slate-900 border-l-[3px] border-l-indigo-500",
    "from-amber-600 to-orange-800": "bg-slate-900 border-l-[3px] border-l-amber-500",
    "from-purple-600 to-fuchsia-900": "bg-slate-900 border-l-[3px] border-l-purple-500",
    "from-cyan-600 to-blue-800": "bg-slate-900 border-l-[3px] border-l-cyan-500",
    "from-rose-600 to-red-800": "bg-slate-900 border-l-[3px] border-l-rose-500",
    "from-slate-700 to-slate-900": "bg-slate-900 border-l-[3px] border-l-slate-400",
    "from-teal-600 to-slate-800": "bg-slate-900 border-l-[3px] border-l-teal-500",
  };

  const selectedBg = colorMap[color] || "bg-slate-900 border-l-[3px] border-l-indigo-500";

  return (
    <div
      className={`relative overflow-hidden ${selectedBg} text-white shadow-xs flex flex-col justify-between select-none group border border-slate-750 transition-all duration-150 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {/* Subtle spine shadow on left edge */}
      <div className="absolute inset-y-0 left-0 w-1.5 bg-black/30 pointer-events-none" />

      {/* Top Category Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 truncate max-w-[85%]">
          {tag || category}
        </span>
        {size !== "xs" && <BookOpen className="w-2.5 h-2.5 text-slate-500" />}
      </div>

      {/* Center Title and Author */}
      <div className="relative z-10 my-auto">
        <h4 className="font-semibold leading-tight line-clamp-3 text-slate-100 tracking-tight">
          {title}
        </h4>
        {size !== "xs" && (
          <p className="text-[10px] text-slate-400 line-clamp-1 mt-1 font-normal">
            {author}
          </p>
        )}
      </div>

      {/* Subtle Bottom Accent */}
      <div className="relative z-10 flex items-center justify-between text-[8px] text-slate-500 pt-1 border-t border-white/5 font-mono">
        <span>EDITION</span>
        <div className="w-1 h-1 rounded-full bg-slate-600" />
      </div>
    </div>
  );
}
