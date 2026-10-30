import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import Badge from "../components/common/Badge";
import {
  Printer,
  Download,
  BookOpen,
  CheckCircle,
  Clock,
  IndianRupee,
  Award,
  FileText
} from "lucide-react";
import {
  MONTHLY_TREND_DATA,
  CATEGORY_BREAKDOWN_DATA,
  ACTIVE_STUDENTS_LEADERBOARD
} from "../data/mockData";

export default function ReportsPage() {
  const { stats, addToast } = useLibrary();
  const [selectedSemester, setSelectedSemester] = useState("Fall 2026");

  const monthlyFines = [1420, 1890, 2650, 3100, 4200, 3850];

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    addToast(
      "success",
      "Report Downloaded",
      "Library circulation summary exported as CSV."
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header and Print / Export Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Library Reports & Summary
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Basic library circulation report, department breakdown, and student borrowing summary.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Total Books</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            {stats.totalBooks}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Across all branches</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Available on Shelves</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            {stats.availableBooks}
          </h3>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">Ready for issue</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Currently Issued</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            {stats.issuedBooks}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Active student loans</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Fines Collected</span>
            <IndianRupee className="w-4 h-4 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
            ₹3,850
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">This academic semester</p>
        </div>
      </div>

      {/* Report Table 1: Category-Wise Book Inventory */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              Department & Category-Wise Book Inventory
            </h3>
            <p className="text-xs text-slate-500">Book distribution across engineering departments</p>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            6 Categories
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-medium">Department / Category</th>
                <th className="py-2.5 px-4 font-medium text-right">Total Copies</th>
                <th className="py-2.5 px-4 font-medium text-right">Available Copies</th>
                <th className="py-2.5 px-4 font-medium text-right">Currently Borrowed</th>
                <th className="py-2.5 px-4 font-medium text-right">Availability Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {CATEGORY_BREAKDOWN_DATA.labels.map((category, idx) => {
                const total = CATEGORY_BREAKDOWN_DATA.counts[idx];
                const borrowed = Math.round(total * 0.2);
                const available = total - borrowed;
                return (
                  <tr key={category} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">
                      {category}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                      {total.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-emerald-600 font-medium">
                      {available.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-500">
                      {borrowed.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <Badge variant="available" size="sm">
                        In Stock
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 2: Monthly Summary Table & Top Student Readers Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly Summary Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              Monthly Circulation Summary
            </h3>
            <p className="text-xs text-slate-500">Books issued, returned, and fines collected</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Month</th>
                  <th className="py-2.5 px-4 font-medium text-right">Borrowed</th>
                  <th className="py-2.5 px-4 font-medium text-right">Returned</th>
                  <th className="py-2.5 px-4 font-medium text-right">Fine Collected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MONTHLY_TREND_DATA.labels.map((month, idx) => (
                  <tr key={month} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">
                      {month} 2026
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                      {MONTHLY_TREND_DATA.borrowed[idx].toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-500">
                      {MONTHLY_TREND_DATA.returned[idx].toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-emerald-600">
                      ₹{monthlyFines[idx].toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Active Students Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                Most Active Student Borrowers
              </h3>
              <p className="text-xs text-slate-500">Top readers in the college library</p>
            </div>
            <Award className="w-4 h-4 text-amber-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Rank</th>
                  <th className="py-2.5 px-4 font-medium">Student Name</th>
                  <th className="py-2.5 px-4 font-medium">Department</th>
                  <th className="py-2.5 px-4 font-medium text-right">Books Borrowed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {ACTIVE_STUDENTS_LEADERBOARD.map((student, idx) => (
                  <tr key={student.name} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-bold text-slate-400">
                      #{idx + 1}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">
                      {student.name}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">
                      {student.department}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      {student.booksRead} books
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
