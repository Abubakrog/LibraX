import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import {
  User,
  Building,
  Bell,
  Palette,
  Shield,
  Save,
  Moon,
  Sun,
  Check
} from "lucide-react";

export default function SettingsPage() {
  const {
    adminProfile,
    setAdminProfile,
    darkMode,
    setDarkMode,
    addToast
  } = useLibrary();

  const [activeSection, setActiveSection] = useState("profile");

  const [profileForm, setProfileForm] = useState({
    name: adminProfile.name,
    title: adminProfile.title,
    email: adminProfile.email,
    department: adminProfile.department
  });

  const [libraryForm, setLibraryForm] = useState({
    institution: "Apex Institute of Technology",
    campus: "Central Campus Library, Stack Block A",
    openingHours: "08:00 AM – 09:00 PM (Mon – Sat)",
    maxBorrowDays: 14,
    maxBooksAllowed: 4,
    dailyFineRate: 10.00,
    gracePeriodDays: 2
  });

  const [notifPreferences, setNotifPreferences] = useState({
    emailDueAlerts: true,
    smsOverdueNotices: true,
    weeklyCirculationDigest: true,
    lowStockWarnings: true
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    setAdminProfile((prev) => ({ ...prev, ...profileForm }));
    addToast("success", "Profile Updated", "Administrator credentials saved.");
  };

  const handleLibrarySave = (e) => {
    e.preventDefault();
    addToast("success", "Policy Saved", "Circulation rules updated successfully.");
  };

  const handleNotifSave = () => {
    addToast("success", "Preferences Saved", "Notification alert rules updated.");
  };

  const sections = [
    { id: "profile", label: "Admin Profile", icon: User },
    { id: "library", label: "Library Policy", icon: Building },
    { id: "notifications", label: "Alert Rules", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security & Sessions", icon: Shield }
  ];

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
          Settings & Policies
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure circulation policies, administrator account details, and visual appearance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start">
        {/* Navigation Tabs (1 col) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-1.5 space-y-0.5 shadow-xs">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel (3 cols) */}
        <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          {/* SECTION 1: PROFILE */}
          {activeSection === "profile" && (
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={adminProfile.avatar}
                  alt={adminProfile.name}
                  className="w-12 h-12 rounded-lg object-cover ring-1 ring-slate-200"
                />
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                    {adminProfile.name}
                  </h4>
                  <p className="text-xs text-slate-500">{adminProfile.title} • {adminProfile.institution}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Administrator Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          )}

          {/* SECTION 2: LIBRARY POLICY */}
          {activeSection === "library" && (
            <form onSubmit={handleLibrarySave} className="space-y-4">
              <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                Circulation & Stack Policy
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Institution / University Name
                  </label>
                  <input
                    type="text"
                    value={libraryForm.institution}
                    onChange={(e) => setLibraryForm({ ...libraryForm, institution: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Working Operating Hours
                  </label>
                  <input
                    type="text"
                    value={libraryForm.openingHours}
                    onChange={(e) => setLibraryForm({ ...libraryForm, openingHours: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Standard Loan Duration (Days)
                  </label>
                  <input
                    type="number"
                    value={libraryForm.maxBorrowDays}
                    onChange={(e) => setLibraryForm({ ...libraryForm, maxBorrowDays: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Max Books Allowed Per Student
                  </label>
                  <input
                    type="number"
                    value={libraryForm.maxBooksAllowed}
                    onChange={(e) => setLibraryForm({ ...libraryForm, maxBooksAllowed: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Daily Overdue Fine Rate (₹/Day)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={libraryForm.dailyFineRate}
                    onChange={(e) => setLibraryForm({ ...libraryForm, dailyFineRate: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Policy</span>
                </button>
              </div>
            </form>
          )}

          {/* SECTION 3: NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <div className="space-y-3.5">
              <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                Automated Dispatch Rules
              </h4>

              <div className="space-y-2">
                {[
                  {
                    key: "emailDueAlerts",
                    label: "Email Due Date Alerts",
                    desc: "Send automated 24h reminders before book loan due date."
                  },
                  {
                    key: "smsOverdueNotices",
                    label: "SMS Overdue Notices",
                    desc: "Dispatch instant SMS warning when loan becomes delinquent."
                  },
                  {
                    key: "lowStockWarnings",
                    label: "Stack Low-Stock Alerts",
                    desc: "Alert librarians when available copies drop to 2 or fewer."
                  },
                  {
                    key: "weeklyCirculationDigest",
                    label: "Weekly Circulation Digest",
                    desc: "Weekly summary of total loans, returns, and recovered fines."
                  }
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-start justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-medium text-xs text-slate-800 dark:text-slate-200">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPreferences[item.key]}
                      onChange={(e) =>
                        setNotifPreferences({
                          ...notifPreferences,
                          [item.key]: e.target.checked
                        })
                      }
                      className="rounded text-slate-900 focus:ring-slate-900 w-3.5 h-3.5 mt-1"
                    />
                  </label>
                ))}
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleNotifSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Rules</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION 4: APPEARANCE */}
          {activeSection === "appearance" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                  Interface Theme
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select interface contrast mode.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDarkMode(false);
                    addToast("info", "Light Mode", "Light mode enabled.");
                  }}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    !darkMode
                      ? "border-slate-900 bg-slate-50 dark:bg-slate-800"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Sun className="w-5 h-5 text-slate-700 mb-2" />
                  <p className="font-medium text-xs text-slate-900 dark:text-white">Light Mode</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Crisp academic white background with dark slate typography.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDarkMode(true);
                    addToast("info", "Dark Mode", "Dark mode enabled.");
                  }}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    darkMode
                      ? "border-slate-900 bg-slate-900 text-white dark:border-white"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Moon className="w-5 h-5 text-slate-300 mb-2" />
                  <p className="font-medium text-xs text-slate-900 dark:text-white">Dark Mode</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Dark obsidian palette for evening circulation desk work.
                  </p>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium">System Font: Inter</span>
                  <p className="text-[11px] text-slate-400">
                    Standard high-legibility enterprise typography
                  </p>
                </div>
                <span className="text-slate-900 dark:text-white font-medium flex items-center gap-1 text-[11px]">
                  <Check className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </div>
          )}

          {/* SECTION 5: SECURITY */}
          {activeSection === "security" && (
            <div className="space-y-3">
              <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                Authentication & Role Privileges
              </h4>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                  <p className="text-[11px] text-slate-400">Require TOTP authenticator code for admin logins</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium text-[10px]">
                  ENABLED
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Active Session Timeout</p>
                  <p className="text-[11px] text-slate-400">Auto sign-out after 30 minutes of desk inactivity</p>
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  30 Minutes
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
