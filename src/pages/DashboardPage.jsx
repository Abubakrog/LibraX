import React from "react";
import { useLibrary } from "../context/LibraryContext";
import StatCard from "../components/common/StatCard";
import Badge from "../components/common/Badge";
import BookCover from "../components/common/BookCover";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  Repeat,
  Plus,
  ChevronRight,
  GraduationCap,
  AlertTriangle,
  UserPlus,
  BookCheck,
  Receipt
} from "lucide-react";
import { POPULAR_BOOKS_DATA } from "../data/mockData";

export default function DashboardPage() {
  const {
    stats,
    transactions,
    books,
    setActivePage,
    setSelectedBookForDetails,
    addToast,
    adminProfile
  } = useLibrary();

  const isStudent = adminProfile?.roleType === "student";
  const overdueLoans = transactions.filter((t) => t.statusType === "danger").slice(0, 4);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Library Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Welcome, {isStudent ? `${adminProfile.name} (Student)` : "Admin"}. College Library Management System overview.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActivePage("issue-return")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Issue / Return</span>
          </button>
          <button
            onClick={() => setActivePage("books")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Book</span>
          </button>
        </div>
      </div>

      {/* Student Portal Mode Context Banner */}
      {isStudent && (
        <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-indigo-950 dark:text-indigo-200 text-sm">
                Student Member: {adminProfile.name} • Roll: {adminProfile.rollNumber || "24CS014"}
              </p>
              <p className="text-[11px] text-indigo-700/80 dark:text-indigo-300">
                You currently have 2 books issued (1 due soon). Maximum allowed limit: 4 books.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActivePage("books")}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Search Books</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          description="In college library stack"
          trend="+12 this month"
          trendType="up"
          icon={BookOpen}
          onClick={() => setActivePage("books")}
        />
        <StatCard
          title="Available Books"
          value={stats.availableBooks}
          description="Available on shelves"
          trend="In library"
          trendType="neutral"
          icon={CheckCircle}
          onClick={() => setActivePage("books")}
        />
        <StatCard
          title="Issued Books"
          value={stats.issuedBooks}
          description="Currently with students"
          trend="Active loans"
          trendType="neutral"
          icon={Clock}
          onClick={() => setActivePage("issue-return")}
        />
        <StatCard
          title="Registered Students"
          value={stats.registeredStudents}
          description="Enrolled student members"
          trend="College members"
          trendType="up"
          icon={Users}
          onClick={() => setActivePage("students")}
        />
      </div>

      {/* Quick Action Shortcuts for 3rd Sem Mini Project */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActivePage("issue-return")}
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <BookCheck className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Issue Book</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Issue to a student</p>
          </button>

          <button
            onClick={() => setActivePage("issue-return")}
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Repeat className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Return Book</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Process book return</p>
          </button>

          <button
            onClick={() => setActivePage("books")}
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Add New Book</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Add to library stock</p>
          </button>

          <button
            onClick={() => setActivePage("students")}
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <UserPlus className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Add Student</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Register new member</p>
          </button>
        </div>
      </div>

      {/* Main Grid: Recently Issued Books & Overdue / Popular Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2 Cols): Recently Issued Table & Desk Summary */}
        <div className="lg:col-span-2 space-y-5">
          {/* Recently Issued Books Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                  Recently Issued Books
                </h3>
                <p className="text-xs text-slate-500">Latest circulation records from the issue desk</p>
              </div>
              <button
                onClick={() => setActivePage("issue-return")}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Issue & Return Desk</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4 font-medium">Student</th>
                    <th className="py-2.5 px-4 font-medium">Book Title</th>
                    <th className="py-2.5 px-4 font-medium">Issue Date</th>
                    <th className="py-2.5 px-4 font-medium">Due Date</th>
                    <th className="py-2.5 px-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {transactions.slice(0, 6).map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-2.5 px-4">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {tx.studentName}
                        </p>
                        <p className="text-[11px] text-slate-400">{tx.studentDept}</p>
                      </td>
                      <td className="py-2.5 px-4 max-w-[200px]">
                        <p className="font-normal text-slate-800 dark:text-slate-200 truncate">
                          {tx.bookTitle}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400">{tx.id}</p>
                      </td>
                      <td className="py-2.5 px-4 text-slate-500 font-mono text-[11px]">
                        {tx.issueDate}
                      </td>
                      <td className="py-2.5 px-4 font-medium text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                        {tx.dueDate}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <Badge
                          variant={
                            tx.statusType === "danger"
                              ? "overdue"
                              : tx.statusType === "warning"
                              ? "warning"
                              : "available"
                          }
                          size="sm"
                        >
                          {tx.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Today's Library Summary Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              Daily Circulation Rules & Information
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Borrowing Period</span>
                <p className="font-semibold text-slate-900 dark:text-white text-sm mt-0.5">14 Days</p>
                <span className="text-[10px] text-slate-500">2-week standard</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Student Quota</span>
                <p className="font-semibold text-slate-900 dark:text-white text-sm mt-0.5">4 Books</p>
                <span className="text-[10px] text-slate-500">Per semester card</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Overdue Fine</span>
                <p className="font-semibold text-rose-600 dark:text-rose-400 text-sm mt-0.5">₹10 / day</p>
                <span className="text-[10px] text-slate-500">After due date</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">Library Timings</span>
                <p className="font-semibold text-slate-900 dark:text-white text-sm mt-0.5">8 AM – 8 PM</p>
                <span className="text-[10px] text-slate-500">Mon to Sat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Overdue Notices & Popular Books */}
        <div className="space-y-5">
          {/* Overdue Notices Box */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                    Overdue Books
                  </h3>
                </div>
                <Badge variant="overdue" size="sm" dot>
                  {overdueLoans.length} Due
                </Badge>
              </div>

              <p className="text-[11px] text-slate-500 mb-3">
                Students with pending book returns and fine calculation:
              </p>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {overdueLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className="py-2.5 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 dark:text-slate-200 truncate">
                        {loan.bookTitle}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {loan.studentName} • <span className="text-rose-600 font-semibold">Due {loan.dueDate}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        addToast("info", "Reminder Sent", `Notification sent to ${loan.studentName}.`);
                      }}
                      className="shrink-0 px-2 py-1 rounded text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Remind
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
              <button
                onClick={() => setActivePage("fines")}
                className="w-full flex items-center justify-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                <span>View All Fines & Dues (₹)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Popular Books */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                    Popular Books
                  </h3>
                  <p className="text-xs text-slate-500">Most borrowed textbooks this term</p>
                </div>
                <button
                  onClick={() => setActivePage("books")}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {POPULAR_BOOKS_DATA.slice(0, 4).map((book) => (
                  <div
                    key={book.id}
                    onClick={() => {
                      const fullBook = books.find((b) => b.id === book.id) || book;
                      setSelectedBookForDetails(fullBook);
                    }}
                    className="py-2.5 flex items-center gap-3 cursor-pointer group"
                  >
                    <BookCover
                      title={book.title}
                      author={book.author}
                      category={book.category}
                      color={book.coverColor}
                      tag={book.coverTag}
                      size="sm"
                      className="shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {book.category}
                      </span>
                      <h4 className="text-xs font-medium text-slate-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">{book.author}</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium mt-0.5 tabular-nums">
                        {book.borrowCount} total checkouts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
              <button
                onClick={() => setActivePage("books")}
                className="w-full py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors border border-slate-200/60 dark:border-slate-700 cursor-pointer"
              >
                Browse Full Book Catalogue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
