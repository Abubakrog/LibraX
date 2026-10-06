import React, { useState, useRef, useEffect } from "react";
import { useLibrary } from "../../context/LibraryContext";
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Plus
} from "lucide-react";

export default function Navbar() {
  const {
    activePage,
    setActivePage,
    setIsSearchModalOpen,
    setIsMobileMenuOpen,
    adminProfile,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    logoutUser
  } = useLibrary();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.read);

  const pageTitles = {
    dashboard: "Dashboard",
    books: "Book Catalogue",
    students: "Students & Members",
    "issue-return": "Issue & Return",
    fines: "Fines & Dues",
    reports: "Reports & Analytics",
    notifications: "Notifications",
    settings: "Settings",
  };

  const currentTitle = pageTitles[activePage] || "Overview";

  return (
    <header className="h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-1.5 -ml-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          title="Open Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-normal">LibraX</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-900 dark:text-white tracking-tight">
            {currentTitle}
          </span>
        </div>
      </div>

      {/* Right: Search, Quick Action, Notifications, Profile */}
      <div className="flex items-center gap-2">
        {/* Command Search Trigger */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs transition-colors cursor-pointer border border-transparent hover:border-slate-300"
          title="Search (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Quick Issue Action */}
        <button
          onClick={() => setActivePage("issue-return")}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Issue Book</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-30">
              <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                    Notifications
                  </h4>
                  {unreadNotifications.length > 0 && (
                    <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 rounded-full font-medium">
                      {unreadNotifications.length} new
                    </span>
                  )}
                </div>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-slate-500 hover:text-slate-900 font-medium"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationRead(notif.id);
                      if (notif.targetPage) setActivePage(notif.targetPage);
                      setIsNotifOpen(false);
                    }}
                    className={`p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
                      !notif.read ? "bg-slate-50/60 dark:bg-slate-800/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          !notif.read ? "bg-indigo-600" : "bg-transparent"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-900 dark:text-slate-200 truncate">
                          {notif.title}
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {notif.message}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 inline-block">
                          {notif.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50/50">
                <button
                  onClick={() => {
                    setActivePage("notifications");
                    setIsNotifOpen(false);
                  }}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  View All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill */}
        <div className="relative ml-1" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={adminProfile.avatar}
              alt={adminProfile.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
                Library Admin
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-30">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  {adminProfile.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">{adminProfile.email}</p>
              </div>

              <div className="p-1 space-y-0.5">
                <button
                  onClick={() => {
                    setActivePage("settings");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Admin Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logoutUser();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
