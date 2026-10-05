import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import Badge from "../components/common/Badge";
import {
  CheckCheck,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActivePage
  } = useLibrary();

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === "All") return true;
    return notif.type.toLowerCase() === activeFilter.toLowerCase();
  });

  const getNotificationIcon = (type) => {
    switch (type.toLowerCase()) {
      case "urgent":
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "info":
      default:
        return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-5 pb-12 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Notification Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Automated alerts for loan maturities, return confirmations, and new registrations.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs transition-colors self-start sm:self-auto"
        >
          <CheckCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {["All", "Urgent", "Warning", "Success", "Info"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeFilter === filter
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                : "bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filteredNotifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markNotificationRead(notif.id)}
            className={`p-3.5 rounded-xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer ${
              notif.read
                ? "border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900"
                : "border-slate-300 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-800/40"
            }`}
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                {getNotificationIcon(notif.type)}
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-xs text-slate-900 dark:text-white">
                    {notif.title}
                  </h4>
                  <Badge variant={notif.type.toLowerCase()} size="sm" dot={!notif.read}>
                    {notif.type.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-[11px] text-slate-500 leading-normal">
                  {notif.message}
                </p>

                <p className="text-[10px] text-slate-400 font-mono pt-0.5">
                  {notif.time}
                </p>
              </div>
            </div>

            {notif.actionLabel && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markNotificationRead(notif.id);
                  if (notif.targetPage) setActivePage(notif.targetPage);
                }}
                className="shrink-0 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1 self-end sm:self-center"
              >
                <span>{notif.actionLabel}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
