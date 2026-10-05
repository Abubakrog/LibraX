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
  X,
  Library
} from "lucide-react";

export default function MobileNav() {
  const {
    activePage,
    setActivePage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    notifications,
    fines,
    setIsAuthenticated,
    addToast
  } = useLibrary();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const overdueCount = fines.filter((f) => f.status === "Overdue").length;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "books", label: "Book Catalogue", icon: BookOpen },
    { id: "students", label: "Students", icon: Users },
    { id: "issue-return", label: "Issue & Return", icon: Repeat },
    { id: "fines", label: "Fines & Dues", icon: Receipt, badge: overdueCount },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell, badge: unreadCount },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const bottomBarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "books", label: "Books", icon: BookOpen },
    { id: "issue-return", label: "Circulate", icon: Repeat },
    { id: "fines", label: "Fines", icon: Receipt, badge: overdueCount },
  ];

  return (
    <>
      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-64 bg-white dark:bg-slate-900 flex flex-col h-full shadow-xl z-10 border-r border-slate-200 dark:border-slate-800">
            {/* Drawer Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Library className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-sm text-slate-900 dark:text-white">
                  LibraX
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu */}
            <div className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge > 0 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Logout */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setActivePage("login");
                  setIsMobileMenuOpen(false);
                  addToast("info", "Signed Out", "Logged out securely.");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center justify-around">
        {bottomBarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors relative ${
                isActive
                  ? "text-slate-900 dark:text-white font-semibold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {item.badge > 0 && (
                  <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
                )}
              </div>
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
