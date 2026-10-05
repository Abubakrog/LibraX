import React from "react";
import { useLibrary } from "../../context/LibraryContext";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Repeat,
  Receipt,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Library,
  Building2
} from "lucide-react";

export default function Sidebar() {
  const {
    activePage,
    setActivePage,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    notifications,
    fines,
    setIsAuthenticated,
    addToast
  } = useLibrary();

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const overdueFinesCount = fines.filter((f) => f.status === "Overdue").length;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "books", label: "Book Catalogue", icon: BookOpen },
    { id: "students", label: "Students", icon: Users },
    { id: "issue-return", label: "Issue & Return", icon: Repeat },
    { id: "fines", label: "Fines & Dues", icon: Receipt, badge: overdueFinesCount > 0 ? overdueFinesCount : null, badgeColor: "bg-rose-50 text-rose-700 border border-rose-200" },
    { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell, badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null, badgeColor: "bg-slate-100 text-slate-700 border border-slate-200" },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActivePage("login");
    addToast("info", "Signed Out", "You have securely signed out of the LibraX workstation.");
  };

  return (
    <aside
      className={`hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-200 select-none z-30 ${
        isSidebarCollapsed ? "w-16" : "w-60"
      } shrink-0 min-h-screen sticky top-0`}
    >
      {/* Brand Header */}
      <div className="h-14 flex items-center justify-between px-3.5 border-b border-slate-100 dark:border-slate-800">
        <div
          onClick={() => setActivePage("dashboard")}
          className="flex items-center gap-2.5 cursor-pointer overflow-hidden"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Library className="w-4 h-4" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                LibraX
              </span>
              <span className="text-[10px] font-medium px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                v2.4
              </span>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden lg:flex"
          title={isSidebarCollapsed ? "Expand" : "Collapse"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Campus Context Pill */}
      {!isSidebarCollapsed && (
        <div className="px-3 pt-3">
          <div className="px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-slate-800 dark:text-slate-200 truncate leading-tight text-[11px]">
                Apex Institute of Tech
              </p>
              <p className="text-[10px] text-slate-400 truncate">Central Campus Library</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {!isSidebarCollapsed && (
          <p className="px-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 pt-1">
            Library Menu
          </p>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              title={isSidebarCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors relative ${
                isActive
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? "text-white dark:text-slate-900" : "text-slate-400"
                }`}
              />

              {!isSidebarCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {/* Badges */}
              {item.badge && !isSidebarCollapsed && (
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.2 rounded-full shrink-0 ${
                    isActive ? "bg-white/20 text-white" : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {item.badge && isSidebarCollapsed && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer / Sign out */}
      <div className="p-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 dark:hover:bg-rose-950/30 transition-colors ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
          title="Sign out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isSidebarCollapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
