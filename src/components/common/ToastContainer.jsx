import React from "react";
import { useLibrary } from "../../context/LibraryContext";
import { Check, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useLibrary();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Check className="w-4 h-4 text-emerald-400 shrink-0" />;

        if (toast.type === "error" || toast.type === "urgent") {
          icon = <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />;
        } else if (toast.type === "warning") {
          icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
        } else if (toast.type === "info") {
          icon = <Info className="w-4 h-4 text-sky-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-2.5 p-3 rounded-lg bg-slate-900 text-slate-100 border border-slate-800 shadow-lg text-xs"
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white tracking-tight">
                {toast.title}
              </p>
              {toast.message && (
                <p className="mt-0.5 text-slate-400 leading-normal">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
