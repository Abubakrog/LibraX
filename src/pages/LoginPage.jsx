import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import {
  Library,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";

export default function LoginPage() {
  const { setIsAuthenticated, setActivePage, addToast } = useLibrary();

  const [email, setEmail] = useState("admin@librax.edu");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      setActivePage("dashboard");
      addToast("success", "Welcome Back", "Signed into LibraX Central Workstation.");
    }, 500);
  };

  const handleQuickDemoLogin = () => {
    setEmail("alok.verma@university.edu");
    setPassword("MasterAdmin@2026");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      setActivePage("dashboard");
      addToast("success", "Demo Login Active", "Signed in as Dr. Alok Verma (Chief Librarian).");
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Left Column: Minimal Academic Branding */}
      <div className="lg:w-1/2 bg-slate-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-r border-slate-800 relative">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#334155 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        />

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center font-bold">
              <Library className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base text-white tracking-tight">
                LibraX
              </span>
              <span className="text-[10px] font-medium px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded border border-slate-700">
                Enterprise
              </span>
            </div>
          </div>
        </div>

        {/* Core Value Statement */}
        <div className="relative z-10 my-12 space-y-4 max-w-md">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-snug">
            Intelligent repository circulation for modern higher education.
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Automating textbook circulation, active student borrowing quotas, fine reconciliation, and repository inventory management with university-grade accuracy.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <p className="text-lg font-semibold text-white tabular-nums">12,480</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Titles</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white tabular-nums">1,850</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Members</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white tabular-nums">99.8%</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Uptime</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[11px] text-slate-500 pt-4 border-t border-slate-900 flex items-center justify-between">
          <p>© 2026 Apex Institute of Technology</p>
          <span>Central University Library</span>
        </div>
      </div>

      {/* Right Column: Clean SaaS Sign-in Card */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
              Sign in to LibraX
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter your library administrator credentials.
            </p>
          </div>

          {/* Quick Demo Login Pill */}
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Demonstration Mode
              </p>
              <p className="text-[11px] text-slate-500">
                1-click Chief Librarian sign-in
              </p>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors shrink-0"
            >
              Demo Fill
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email / Username
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@university.edu"
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast("info", "Reset Link Dispatched", "Instructions sent to registered admin email.");
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-900"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
                />
                <span>Remember workstation</span>
              </label>

              <span className="text-[11px] text-slate-400">Library Admin</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center">
            Authorized university personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
