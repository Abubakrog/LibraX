import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import {
  Library,
  GraduationCap,
  ShieldCheck,
  Lock,
  Mail,
  User,
  BadgeCheck,
  Building,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2
} from "lucide-react";

export default function LoginPage() {
  const { loginUser, addToast } = useLibrary();

  // Primary Role Option: 'student' | 'librarian'
  const [roleOption, setRoleOption] = useState("student");

  // Mode: 'login' | 'signup'
  const [mode, setMode] = useState("login");

  // Loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Student State
  const [studentEmailOrRoll, setStudentEmailOrRoll] = useState("aarav.shah@university.edu");
  const [studentPassword, setStudentPassword] = useState("••••••••••••");
  const [studentRemember, setStudentRemember] = useState(true);

  const [studentSignup, setStudentSignup] = useState({
    name: "",
    rollNumber: "",
    department: "Computer Science & Engg",
    semester: "Semester 5",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: true
  });

  // Librarian State
  const [librarianEmailOrId, setLibrarianEmailOrId] = useState("alok.verma@university.edu");
  const [librarianPassword, setLibrarianPassword] = useState("••••••••••••");
  const [librarianRemember, setLibrarianRemember] = useState(true);

  const [librarianSignup, setLibrarianSignup] = useState({
    name: "",
    staffId: "",
    department: "Central University Library",
    role: "Chief Librarian",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: true
  });

  // 1-Click Demo Logins for smooth evaluation & viva
  const handleDemoStudentLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: "Aarav Shah",
          email: "aarav.shah@university.edu",
          role: "Student Member",
          department: "Computer Science & Engg",
          rollNumber: "24CS014",
          roleType: "student",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Student Access Granted", "Signed in as Aarav Shah (Roll: 24CS014).");
    }, 400);
  };

  const handleDemoLibrarianLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: "Dr. Alok Verma",
          email: "alok.verma@university.edu",
          role: "Chief Librarian",
          department: "Central University Library",
          staffId: "LIB-2026-001",
          roleType: "librarian",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Librarian Access Granted", "Signed in as Dr. Alok Verma (Chief Librarian).");
    }, 400);
  };

  // Student Login Handler
  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (!studentEmailOrRoll || !studentPassword) {
      addToast("warning", "Required", "Please provide your student roll number or email.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: studentEmailOrRoll.includes("riya") ? "Riya Mehta" : "Aarav Shah",
          email: studentEmailOrRoll.includes("@") ? studentEmailOrRoll : `${studentEmailOrRoll.toLowerCase()}@university.edu`,
          role: "Student Member",
          department: "Computer Science & Engg",
          rollNumber: studentEmailOrRoll.includes("@") ? "24CS014" : studentEmailOrRoll.toUpperCase(),
          roleType: "student",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
        },
        studentRemember
      );
      addToast("success", "Student Portal Active", "Welcome back to the University Library system.");
    }, 450);
  };

  // Student Sign Up Handler
  const handleStudentSignup = (e) => {
    e.preventDefault();
    if (!studentSignup.name || !studentSignup.rollNumber || !studentSignup.email || !studentSignup.password) {
      addToast("warning", "Missing Info", "Please fill in all mandatory student registration fields.");
      return;
    }
    if (studentSignup.password !== studentSignup.confirmPassword) {
      addToast("error", "Password Mismatch", "Passwords do not match.");
      return;
    }
    if (!studentSignup.agreedToTerms) {
      addToast("warning", "Terms Required", "Please accept the university student library policy.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: studentSignup.name,
          email: studentSignup.email,
          role: "Student Member",
          department: studentSignup.department,
          rollNumber: studentSignup.rollNumber.toUpperCase(),
          roleType: "student",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Account Created", `Student membership activated for ${studentSignup.name}!`);
    }, 500);
  };

  // Librarian Login Handler
  const handleLibrarianLogin = (e) => {
    e.preventDefault();
    if (!librarianEmailOrId || !librarianPassword) {
      addToast("warning", "Required", "Please provide your staff email or employee ID.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: "Dr. Alok Verma",
          email: librarianEmailOrId.includes("@") ? librarianEmailOrId : `${librarianEmailOrId.toLowerCase()}@university.edu`,
          role: "Chief Librarian",
          department: "Central University Library",
          staffId: "LIB-2026-001",
          roleType: "librarian",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        librarianRemember
      );
      addToast("success", "Librarian Authenticated", "Central circulation desk unlocked.");
    }, 450);
  };

  // Librarian Sign Up Handler
  const handleLibrarianSignup = (e) => {
    e.preventDefault();
    if (!librarianSignup.name || !librarianSignup.staffId || !librarianSignup.email || !librarianSignup.password) {
      addToast("warning", "Missing Info", "Please fill in all mandatory staff registration fields.");
      return;
    }
    if (librarianSignup.password !== librarianSignup.confirmPassword) {
      addToast("error", "Password Mismatch", "Passwords do not match.");
      return;
    }
    if (!librarianSignup.agreedToTerms) {
      addToast("warning", "Authorization", "Please confirm authorized employment.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: librarianSignup.name,
          email: librarianSignup.email,
          role: librarianSignup.role,
          department: librarianSignup.department,
          staffId: librarianSignup.staffId.toUpperCase(),
          roleType: "librarian",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Staff Account Created", `Welcome to LibraX, ${librarianSignup.name}!`);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Left Column: Academic Showcase */}
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
                SaaS Portal
              </span>
            </div>
          </div>
        </div>

        {/* Value Statement */}
        <div className="relative z-10 my-10 space-y-4 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Dual Access Campus Circulation Portal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-snug">
            Intelligent library management for Students and Librarians.
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Choose your university role to sign in or register. Students can manage checkouts, track ₹ overdue dues, and reserve textbooks. Librarians have full circulation control and inventory management.
          </p>

          {/* Quick role highlight boxes */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Student Portal</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Track personal book loans, due dates, renewal countdowns, and dues.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Librarian Portal</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Issue & return desk, fine collection in ₹ INR, inventory & analytics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <p className="text-lg font-semibold text-white tabular-nums">12,480</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Books</p>
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
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> University Verified
          </span>
        </div>
      </div>

      {/* Right Column: 2 Options (Student Login & Librarian Login) */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-5">
          {/* Header Title */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {roleOption === "student"
                ? mode === "login" ? "Student Sign In" : "Student Registration"
                : mode === "login" ? "Librarian Sign In" : "Librarian Registration"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {roleOption === "student"
                ? "Access personal textbook loans, renewal countdowns, and dues."
                : "Manage repository catalog, student quotas, circulation, and reports."}
            </p>
          </div>

          {/* THE 2 PRIMARY OPTIONS: STUDENT LOGIN vs LIBRARIAN LOGIN */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Select Login Type
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setRoleOption("student");
                  setShowPassword(false);
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  roleOption === "student"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs border border-slate-200/80 dark:border-slate-700"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                }`}
              >
                <GraduationCap
                  className={`w-4 h-4 ${
                    roleOption === "student" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                  }`}
                />
                <span>Student Login</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRoleOption("librarian");
                  setShowPassword(false);
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  roleOption === "librarian"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs border border-slate-200/80 dark:border-slate-700"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                }`}
              >
                <ShieldCheck
                  className={`w-4 h-4 ${
                    roleOption === "librarian" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"
                  }`}
                />
                <span>Librarian Login</span>
              </button>
            </div>
          </div>

          {/* Sub-Tabs: Sign In vs Sign Up for Selected Role */}
          <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors text-center cursor-pointer ${
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
              className={`flex-1 py-1.5 rounded-md font-medium transition-colors text-center cursor-pointer ${
                mode === "signup"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              {roleOption === "student" ? "New Student Sign Up" : "New Staff Sign Up"}
            </button>
          </div>

          {/* 1-Click Demo Fill (Tailored for presentations) */}
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {roleOption === "student" ? "Demo Student Account" : "Demo Librarian Account"}
              </p>
              <p className="text-[11px] text-slate-500">
                {roleOption === "student"
                  ? "Aarav Shah • B.Tech CSE (Roll: 24CS014)"
                  : "Dr. Alok Verma • Chief Librarian"}
              </p>
            </div>
            <button
              type="button"
              onClick={roleOption === "student" ? handleDemoStudentLogin : handleDemoLibrarianLogin}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors shrink-0 cursor-pointer"
            >
              1-Click Demo
            </button>
          </div>

          {/* ========================================================= */}
          {/* OPTION 1: STUDENT FORMS                                   */}
          {/* ========================================================= */}
          {roleOption === "student" && mode === "login" && (
            <form onSubmit={handleStudentLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Student Roll Number or University Email
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={studentEmailOrRoll}
                    onChange={(e) => setStudentEmailOrRoll(e.target.value)}
                    placeholder="e.g. 24CS014 or student@university.edu"
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Student Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast("info", "Student Help", "Reset code dispatched to registered student email.");
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
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
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
                    checked={studentRemember}
                    onChange={(e) => setStudentRemember(e.target.checked)}
                    className="rounded text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
                  />
                  <span>Remember my device</span>
                </label>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  Student Portal
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Signing In as Student...</span>
                ) : (
                  <>
                    <span>Sign In as Student</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <span>Not registered as a member yet? </span>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-medium text-slate-900 dark:text-white hover:underline cursor-pointer"
                >
                  Create Student Account
                </button>
              </div>
            </form>
          )}

          {roleOption === "student" && mode === "signup" && (
            <form onSubmit={handleStudentSignup} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Student Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Riya Mehta"
                    value={studentSignup.name}
                    onChange={(e) => setStudentSignup({ ...studentSignup, name: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Roll / PRN Number *
                  </label>
                  <div className="relative">
                    <BadgeCheck className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 24IT028"
                      value={studentSignup.rollNumber}
                      onChange={(e) => setStudentSignup({ ...studentSignup, rollNumber: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Academic Year
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={studentSignup.semester}
                      onChange={(e) => setStudentSignup({ ...studentSignup, semester: e.target.value })}
                      className="w-full pl-8 pr-2 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
                    >
                      <option value="Semester 1">Semester 1 (1st Yr)</option>
                      <option value="Semester 3">Semester 3 (2nd Yr)</option>
                      <option value="Semester 5">Semester 5 (3rd Yr)</option>
                      <option value="Semester 7">Semester 7 (4th Yr)</option>
                      <option value="Postgraduate">Postgraduate / M.Tech</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={studentSignup.department}
                    onChange={(e) => setStudentSignup({ ...studentSignup, department: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
                  >
                    <option value="Computer Science & Engg">Computer Science & Engg</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  University Student Email *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="student.name@university.edu"
                    value={studentSignup.email}
                    onChange={(e) => setStudentSignup({ ...studentSignup, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
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
                      value={studentSignup.password}
                      onChange={(e) => setStudentSignup({ ...studentSignup, password: e.target.value })}
                      className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
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
                      value={studentSignup.confirmPassword}
                      onChange={(e) => setStudentSignup({ ...studentSignup, confirmPassword: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={studentSignup.agreedToTerms}
                    onChange={(e) => setStudentSignup({ ...studentSignup, agreedToTerms: e.target.checked })}
                    className="rounded text-slate-900 focus:ring-slate-900 w-3.5 h-3.5 mt-0.5"
                  />
                  <span className="text-[11px] leading-tight">
                    I agree to the 4-book student checkout limit & ₹10/day overdue library policy.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Activating Account...</span>
                ) : (
                  <>
                    <span>Create Student Account & Enter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <span>Already have a student account? </span>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-medium text-slate-900 dark:text-white hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* OPTION 2: LIBRARIAN FORMS                                 */}
          {/* ========================================================= */}
          {roleOption === "librarian" && mode === "login" && (
            <form onSubmit={handleLibrarianLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Staff Email or Employee ID
                </label>
                <div className="relative">
                  <ShieldCheck className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={librarianEmailOrId}
                    onChange={(e) => setLibrarianEmailOrId(e.target.value)}
                    placeholder="e.g. LIB-2026-001 or librarian@university.edu"
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Staff Master Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast("info", "Admin Recovery", "Password reset instructions sent to university email.");
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
                    value={librarianPassword}
                    onChange={(e) => setLibrarianPassword(e.target.value)}
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
                    checked={librarianRemember}
                    onChange={(e) => setLibrarianRemember(e.target.checked)}
                    className="rounded text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
                  />
                  <span>Remember workstation</span>
                </label>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Staff Admin
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Authenticating Staff...</span>
                ) : (
                  <>
                    <span>Sign In as Librarian</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <span>New library personnel? </span>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-medium text-slate-900 dark:text-white hover:underline cursor-pointer"
                >
                  Register Staff Account
                </button>
              </div>
            </form>
          )}

          {roleOption === "librarian" && mode === "signup" && (
            <form onSubmit={handleLibrarianSignup} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name & Title *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Priya Sharma"
                    value={librarianSignup.name}
                    onChange={(e) => setLibrarianSignup({ ...librarianSignup, name: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
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
                      value={librarianSignup.staffId}
                      onChange={(e) => setLibrarianSignup({ ...librarianSignup, staffId: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Designation
                  </label>
                  <select
                    value={librarianSignup.role}
                    onChange={(e) => setLibrarianSignup({ ...librarianSignup, role: e.target.value })}
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
                  Faculty / Library Division
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={librarianSignup.department}
                    onChange={(e) => setLibrarianSignup({ ...librarianSignup, department: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
                  >
                    <option value="Central University Library">Central University Library</option>
                    <option value="Engineering & Tech Library">Engineering & Tech Library</option>
                    <option value="Science & Computing Division">Science & Computing Division</option>
                    <option value="University Digital Archives">University Digital Archives</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Official Staff Email *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="staff.name@university.edu"
                    value={librarianSignup.email}
                    onChange={(e) => setLibrarianSignup({ ...librarianSignup, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
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
                      value={librarianSignup.password}
                      onChange={(e) => setLibrarianSignup({ ...librarianSignup, password: e.target.value })}
                      className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
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
                      value={librarianSignup.confirmPassword}
                      onChange={(e) => setLibrarianSignup({ ...librarianSignup, confirmPassword: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={librarianSignup.agreedToTerms}
                    onChange={(e) => setLibrarianSignup({ ...librarianSignup, agreedToTerms: e.target.checked })}
                    className="rounded text-slate-900 focus:ring-slate-900 w-3.5 h-3.5 mt-0.5"
                  />
                  <span className="text-[11px] leading-tight">
                    I confirm authorized employment & agree to library system administrator protocols.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Registering Staff...</span>
                ) : (
                  <>
                    <span>Create Staff Account & Enter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <span>Already have a staff account? </span>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-medium text-slate-900 dark:text-white hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          <p className="text-[11px] text-slate-400 text-center">
            {roleOption === "student"
              ? "University Student Identification (PRN / Roll) required for checkout verification."
              : "Authorized university library administration & faculty personnel only."}
          </p>
        </div>
      </div>
    </div>
  );
}
