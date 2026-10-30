import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import {
  Library,
  GraduationCap,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function LoginPage() {
  const { loginUser, addToast } = useLibrary();

  // 2 Options: 'student' or 'librarian'
  const [roleOption, setRoleOption] = useState("student");
  // Mode: 'login' or 'signup'
  const [mode, setMode] = useState("login");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Student Form State
  const [studentInput, setStudentInput] = useState("24CS014");
  const [studentPassword, setStudentPassword] = useState("password123");
  const [studentSignup, setStudentSignup] = useState({
    name: "",
    rollNumber: "",
    department: "Computer Science & Engg",
    email: "",
    password: ""
  });

  // Librarian Form State
  const [librarianInput, setLibrarianInput] = useState("admin@college.edu");
  const [librarianPassword, setLibrarianPassword] = useState("admin123");
  const [librarianSignup, setLibrarianSignup] = useState({
    name: "",
    staffId: "",
    department: "Central College Library",
    email: "",
    password: ""
  });

  // 1-Click Demo Logins for Easy Teacher / Evaluator Testing
  const handleQuickDemoStudent = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: "Aarav Shah",
          email: "aarav.shah@college.edu",
          role: "Student Member",
          department: "Computer Science & Engg",
          rollNumber: "24CS014",
          roleType: "student",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Student Login Successful", "Welcome Aarav Shah (Roll: 24CS014).");
    }, 300);
  };

  const handleQuickDemoLibrarian = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: "Dr. Alok Verma",
          email: "alok.verma@college.edu",
          role: "Chief Librarian",
          department: "Central College Library",
          staffId: "LIB-2026-001",
          roleType: "librarian",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Librarian Login Successful", "Welcome Dr. Alok Verma (Chief Librarian).");
    }, 300);
  };

  // Student Sign In Submit
  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (!studentInput || !studentPassword) {
      addToast("warning", "Required", "Please enter roll number or email.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: "Aarav Shah",
          email: studentInput.includes("@") ? studentInput : `${studentInput.toLowerCase()}@college.edu`,
          role: "Student Member",
          department: "Computer Science & Engg",
          rollNumber: studentInput.toUpperCase(),
          roleType: "student",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Logged In", "Student account accessed.");
    }, 350);
  };

  // Student Sign Up Submit
  const handleStudentSignup = (e) => {
    e.preventDefault();
    if (!studentSignup.name || !studentSignup.rollNumber || !studentSignup.email || !studentSignup.password) {
      addToast("warning", "Required Fields", "Please complete all student fields.");
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
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Registration Complete", `Welcome, ${studentSignup.name}!`);
    }, 350);
  };

  // Librarian Sign In Submit
  const handleLibrarianLogin = (e) => {
    e.preventDefault();
    if (!librarianInput || !librarianPassword) {
      addToast("warning", "Required", "Please enter staff email or ID.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: "Dr. Alok Verma",
          email: librarianInput.includes("@") ? librarianInput : `${librarianInput.toLowerCase()}@college.edu`,
          role: "Chief Librarian",
          department: "Central College Library",
          staffId: librarianInput.toUpperCase(),
          roleType: "librarian",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Logged In", "Librarian dashboard unlocked.");
    }, 350);
  };

  // Librarian Sign Up Submit
  const handleLibrarianSignup = (e) => {
    e.preventDefault();
    if (!librarianSignup.name || !librarianSignup.staffId || !librarianSignup.email || !librarianSignup.password) {
      addToast("warning", "Required Fields", "Please complete all staff fields.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(
        {
          name: librarianSignup.name,
          email: librarianSignup.email,
          role: "Chief Librarian",
          department: librarianSignup.department,
          staffId: librarianSignup.staffId.toUpperCase(),
          roleType: "librarian",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        true
      );
      addToast("success", "Staff Account Created", `Welcome, ${librarianSignup.name}!`);
    }, 350);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Left Column: Simple College Project Branding */}
      <div className="md:w-5/12 lg:w-1/2 bg-slate-900 text-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">LibraX</span>
              <span className="ml-2 text-[10px] font-semibold px-2 py-0.5 bg-slate-800 text-indigo-300 rounded border border-slate-700">
                College LMS
              </span>
            </div>
          </div>

          {/* Project Overview */}
          <div className="mt-8 sm:mt-12 space-y-4 max-w-md">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
              College Library Management System
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              A simple, responsive project designed for students and librarians to manage book issues, returns, inventory, and student borrowing records.
            </p>

            {/* Simple Feature List */}
            <div className="space-y-2.5 pt-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Search and browse college book catalogue</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Issue & return books with automatic ₹10/day fine calculation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Student accounts with 4-book maximum borrowing limit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Printable summary reports and overdue notices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Footer Note */}
        <div className="pt-6 mt-8 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <p>Semester 3 Mini Project Demo</p>
          <span className="text-[11px] text-slate-500">College Library Desk</span>
        </div>
      </div>

      {/* Right Column: 2 Login Options (Student Login & Librarian Login) */}
      <div className="md:w-7/12 lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md space-y-5">
          {/* Header */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {roleOption === "student" ? "Student Portal" : "Librarian Portal"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {roleOption === "student"
                ? "Sign in to check your issued books, due dates, and fine dues."
                : "Sign in to manage book issues, returns, and library inventory."}
            </p>
          </div>

          {/* THE 2 OPTIONS: STUDENT LOGIN vs LIBRARIAN LOGIN */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Choose Login Type
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setRoleOption("student")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  roleOption === "student"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${roleOption === "student" ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                <span>Student Login</span>
              </button>

              <button
                type="button"
                onClick={() => setRoleOption("librarian")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  roleOption === "librarian"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${roleOption === "librarian" ? "text-emerald-600 dark:text-emerald-400" : ""}`} />
                <span>Librarian Login</span>
              </button>
            </div>
          </div>

          {/* Sub Tabs: Sign In vs Sign Up */}
          <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-1.5 rounded-md font-medium text-center transition-colors cursor-pointer ${
                mode === "login"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-1.5 rounded-md font-medium text-center transition-colors cursor-pointer ${
                mode === "signup"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {roleOption === "student" ? "New Student Register" : "New Staff Register"}
            </button>
          </div>

          {/* 1-Click Demo Login Box (Super handy for college presentations) */}
          <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-indigo-950 dark:text-indigo-200">
                {roleOption === "student" ? "Demo Student Account" : "Demo Librarian Account"}
              </p>
              <p className="text-[11px] text-indigo-700/80 dark:text-indigo-300">
                {roleOption === "student" ? "Aarav Shah • Roll: 24CS014" : "Dr. Alok Verma • Chief Librarian"}
              </p>
            </div>
            <button
              type="button"
              onClick={roleOption === "student" ? handleQuickDemoStudent : handleQuickDemoLibrarian}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors shrink-0 cursor-pointer"
            >
              1-Click Demo
            </button>
          </div>

          {/* ==================================================== */}
          {/* OPTION 1: STUDENT FORMS                             */}
          {/* ==================================================== */}
          {roleOption === "student" && mode === "login" && (
            <form onSubmit={handleStudentLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Student Roll Number or Email
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={studentInput}
                    onChange={(e) => setStudentInput(e.target.value)}
                    placeholder="e.g. 24CS014 or student@college.edu"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-8 pr-8 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Logging in...</span>
                ) : (
                  <>
                    <span>Sign In as Student</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center text-xs text-slate-500 pt-1">
                <span>Don't have a student account? </span>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Register here
                </button>
              </div>
            </form>
          )}

          {roleOption === "student" && mode === "signup" && (
            <form onSubmit={handleStudentSignup} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Riya Mehta"
                  value={studentSignup.name}
                  onChange={(e) => setStudentSignup({ ...studentSignup, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 24IT028"
                    value={studentSignup.rollNumber}
                    onChange={(e) => setStudentSignup({ ...studentSignup, rollNumber: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Branch / Dept
                  </label>
                  <select
                    value={studentSignup.department}
                    onChange={(e) => setStudentSignup({ ...studentSignup, department: e.target.value })}
                    className="w-full px-2 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Computer Science & Engg">Computer Science</option>
                    <option value="Information Technology">Information Tech</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Electronics & Communication">Electronics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Student Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  value={studentSignup.email}
                  onChange={(e) => setStudentSignup({ ...studentSignup, email: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={studentSignup.password}
                  onChange={(e) => setStudentSignup({ ...studentSignup, password: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-60"
              >
                {isLoading ? "Creating Account..." : "Create Student Account & Enter"}
              </button>

              <div className="text-center text-xs text-slate-500 pt-1">
                <span>Already registered? </span>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          {/* ==================================================== */}
          {/* OPTION 2: LIBRARIAN FORMS                           */}
          {/* ==================================================== */}
          {roleOption === "librarian" && mode === "login" && (
            <form onSubmit={handleLibrarianLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Staff Email or Employee ID
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={librarianInput}
                    onChange={(e) => setLibrarianInput(e.target.value)}
                    placeholder="e.g. admin@college.edu or LIB-001"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Staff Password
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={librarianPassword}
                    onChange={(e) => setLibrarianPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-8 pr-8 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Logging in...</span>
                ) : (
                  <>
                    <span>Sign In as Librarian</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center text-xs text-slate-500 pt-1">
                <span>New library staff? </span>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
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
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Alok Verma"
                  value={librarianSignup.name}
                  onChange={(e) => setLibrarianSignup({ ...librarianSignup, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Staff ID
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LIB-2026"
                    value={librarianSignup.staffId}
                    onChange={(e) => setLibrarianSignup({ ...librarianSignup, staffId: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value="Central College Library"
                    readOnly
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="librarian@college.edu"
                  value={librarianSignup.email}
                  onChange={(e) => setLibrarianSignup({ ...librarianSignup, email: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={librarianSignup.password}
                  onChange={(e) => setLibrarianSignup({ ...librarianSignup, password: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-60"
              >
                {isLoading ? "Creating Staff Account..." : "Register Staff Account & Enter"}
              </button>

              <div className="text-center text-xs text-slate-500 pt-1">
                <span>Already have a staff account? </span>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          <p className="text-[11px] text-slate-400 text-center">
            College Library Management System • Mini Project
          </p>
        </div>
      </div>
    </div>
  );
}
