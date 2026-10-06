import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import {
  Library,
  Lock,
  Mail,
  User,
  BadgeCheck,
  Building,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function LoginPage() {
  const { loginUser, addToast } = useLibrary();

  // Mode: 'login' | 'signup'
  const [mode, setMode] = useState("login");

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState("alok.verma@university.edu");
  const [loginPassword, setLoginPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sign Up Form State
  const [signupForm, setSignupForm] = useState({
    name: "",
    staffId: "",
    email: "",
    department: "Central University Library",
    role: "Chief Librarian",
    password: "",
    confirmPassword: "",
    agreedToTerms: true
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      addToast("warning", "Missing Fields", "Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: "Dr. Alok Verma",
          email: loginEmail,
          role: "Chief Librarian",
          department: "Central University Library"
        },
        rememberMe
      );
      addToast("success", "Welcome Back", "Authenticated into LibraX Central Workstation.");
    }, 450);
  };

  // Handle Sign Up Submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.staffId || !signupForm.password) {
      addToast("warning", "Required Fields", "Please complete all mandatory registration fields.");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      addToast("error", "Password Mismatch", "Passwords do not match. Please re-enter.");
      return;
    }

    if (!signupForm.agreedToTerms) {
      addToast("warning", "Policy Agreement", "Please agree to the university library circulation policy.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: signupForm.name,
          email: signupForm.email,
          role: signupForm.role,
          department: signupForm.department
        },
        true
      );
      addToast("success", "Account Created", `Welcome to LibraX, ${signupForm.name}!`);
    }, 550);
  };

  // 1-Click Demo Fill for College Presentations
  const handleQuickDemoLogin = () => {
    setMode("login");
    setLoginEmail("alok.verma@university.edu");
    setLoginPassword("MasterAdmin@2026");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: "Dr. Alok Verma",
          email: "alok.verma@university.edu",
          role: "Chief Librarian",
          department: "Central University Library"
        },
        true
      );
      addToast("success", "Demo Login Active", "Signed in as Dr. Alok Verma (Chief Librarian).");
    }, 350);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Left Column: Enterprise Academic Showcase */}
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
        <div className="relative z-10 my-10 space-y-4 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Central University Circulation Portal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-snug">
            Intelligent repository circulation for modern higher education.
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Automating textbook circulation, active student borrowing quotas, fine reconciliation in ₹ INR, and repository inventory management with university-grade accuracy.
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
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5" /> ISO 27001 Certified
          </span>
        </div>
      </div>

      {/* Right Column: Clean SaaS Authentication Card */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-5">
          {/* Header */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {mode === "login" ? "Sign in to LibraX" : "Create Staff Account"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {mode === "login"
                ? "Enter your university credentials to access the library dashboard."
                : "Register a university librarian or faculty circulation account."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors text-center ${
                mode === "login"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors text-center ${
                mode === "signup"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Quick Demo Fill Pill (Always available for presentation ease) */}
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Demonstration Mode
              </p>
              <p className="text-[11px] text-slate-500">
                1-click Chief Librarian access
              </p>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors shrink-0 cursor-pointer"
            >
              Demo Fill & Enter
            </button>
          </div>

          {/* TAB 1: SIGN IN FORM */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email or Staff ID
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
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
                      addToast("info", "Reset Link Dispatched", "Instructions sent to registered email.");
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
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

                <span className="text-[11px] text-slate-400">Staff Portal</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign in to LibraX</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-medium text-slate-900 dark:text-white hover:underline"
                >
                  Create one here
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SIGN UP FORM */}
          {mode === "signup" && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Priya Sharma"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Staff / Faculty ID *
                  </label>
                  <div className="relative">
                    <BadgeCheck className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. LIB-2026-089"
                      value={signupForm.staffId}
                      onChange={(e) => setSignupForm({ ...signupForm, staffId: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Role Title
                  </label>
                  <select
                    value={signupForm.role}
                    onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
                  >
                    <option value="Chief Librarian">Chief Librarian</option>
                    <option value="Assistant Librarian">Assistant Librarian</option>
                    <option value="Circulation Desk Officer">Desk Officer</option>
                    <option value="Department Coordinator">Coordinator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Department / Faculty
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={signupForm.department}
                    onChange={(e) => setSignupForm({ ...signupForm, department: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
                  >
                    <option value="Central University Library">Central University Library</option>
                    <option value="Computer Science & Engg">Computer Science & Engg</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="University Administration">University Administration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  University Email *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@university.edu"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showSignupPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={signupForm.agreedToTerms}
                    onChange={(e) => setSignupForm({ ...signupForm, agreedToTerms: e.target.checked })}
                    className="rounded text-slate-900 focus:ring-slate-900 w-3.5 h-3.5 mt-0.5"
                  />
                  <span className="text-[11px] leading-tight">
                    I agree to the University Library Data & Academic Circulation Policy.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create Account & Enter Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-medium text-slate-900 dark:text-white hover:underline"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          <p className="text-[11px] text-slate-400 text-center">
            Authorized university faculty & library personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
