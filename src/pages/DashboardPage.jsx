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
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Repeat,
  Plus,
  Calendar,
  ChevronRight
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ACTIVITY_CHART_DATA, POPULAR_BOOKS_DATA } from "../data/mockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardPage() {
  const {
    stats,
    transactions,
    books,
    setActivePage,
    setSelectedBookForDetails,
    addToast
  } = useLibrary();

  // Linear-style minimalist chart theme
  const chartData = {
    labels: ACTIVITY_CHART_DATA.labels,
    datasets: [
      {
        label: "Borrowed",
        data: ACTIVITY_CHART_DATA.borrowed,
        borderColor: "#0f172a", // Slate-900
        backgroundColor: "rgba(15, 23, 42, 0.03)",
        tension: 0.25,
        fill: true,
        pointBackgroundColor: "#0f172a",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 4,
        pointRadius: 3,
        borderWidth: 1.75
      },
      {
        label: "Returned",
        data: ACTIVITY_CHART_DATA.returned,
        borderColor: "#64748b", // Slate-500
        backgroundColor: "rgba(100, 116, 139, 0.02)",
        tension: 0.25,
        fill: true,
        pointBackgroundColor: "#64748b",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 4,
        pointRadius: 3,
        borderWidth: 1.75
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          boxHeight: 6,
          font: { family: "Inter, sans-serif", size: 11 },
          color: "#64748b"
        }
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleFont: { family: "Inter, sans-serif", size: 11, weight: "bold" },
        bodyFont: { family: "Inter, sans-serif", size: 11 },
        padding: 8,
        cornerRadius: 6,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "Inter, sans-serif", size: 11 }, color: "#94a3b8" }
      },
      y: {
        grid: { color: "#f1f5f9" },
        ticks: { font: { family: "Inter, sans-serif", size: 11 }, color: "#94a3b8" },
        border: { dash: [3, 3] }
      }
    }
  };

  const overdueLoans = transactions.filter((t) => t.statusType === "danger").slice(0, 4);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Library Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Good morning, Admin. Here’s today’s circulation summary and active inventory status.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActivePage("issue-return")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Issue / Return</span>
          </button>
          <button
            onClick={() => setActivePage("books")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Book</span>
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          description="In university stacks"
          trend="+4.2% this mo"
          trendType="up"
          icon={BookOpen}
          onClick={() => setActivePage("books")}
        />
        <StatCard
          title="Available Books"
          value={stats.availableBooks}
          description="Ready for immediate loan"
          trend="79% in library"
          trendType="neutral"
          icon={CheckCircle}
          onClick={() => setActivePage("books")}
        />
        <StatCard
          title="Issued Books"
          value={stats.issuedBooks}
          description="Active student loans"
          trend="18.7% active"
          trendType="neutral"
          icon={Clock}
          onClick={() => setActivePage("issue-return")}
        />
        <StatCard
          title="Registered Students"
          value={stats.registeredStudents}
          description="Active member cards"
          trend="+120 new"
          trendType="up"
          icon={Users}
          onClick={() => setActivePage("students")}
        />
      </div>

      {/* Middle Row: Circulation Chart & Overdue Books */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Circulation Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                Library Circulation Activity
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Weekly trajectory of checkouts compared with returned items.
              </p>
            </div>
            <span className="text-[11px] font-medium text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700">
              Current Week
            </span>
          </div>

          <div className="h-64 w-full pt-1">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Overdue Items (1 col) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                  Overdue Notices
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Late return follow-up required</p>
              </div>
              <Badge variant="overdue" size="sm" dot>
                {overdueLoans.length} Overdue
              </Badge>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {overdueLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="py-2.5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-200 truncate">
                      {loan.bookTitle}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {loan.studentName} • <span className="text-rose-600 font-medium">Due {loan.dueDate}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      addToast("info", "Notice Sent", `SMS & email alert dispatched to ${loan.studentName}.`);
                    }}
                    className="shrink-0 px-2 py-1 rounded text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Remind
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActivePage("fines")}
              className="w-full flex items-center justify-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <span>View all overdue records & fines</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recently Issued Books & Popular Titles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recently Issued Table (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                Recently Issued Books
              </h3>
              <p className="text-xs text-slate-500">Circulation records processed at the desk</p>
            </div>
            <button
              onClick={() => setActivePage("issue-return")}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <span>View Desk</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/75 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Student</th>
                  <th className="py-2.5 px-4 font-medium">Book Title</th>
                  <th className="py-2.5 px-4 font-medium">Issue Date</th>
                  <th className="py-2.5 px-4 font-medium">Due Date</th>
                  <th className="py-2.5 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.slice(0, 5).map((tx) => (
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
                    <td className="py-2.5 px-4 max-w-[180px]">
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

        {/* Popular Books (1 col) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                  Popular Titles
                </h3>
                <p className="text-xs text-slate-500">Highest semester loan count</p>
              </div>
              <button
                onClick={() => setActivePage("books")}
                className="text-xs text-slate-500 hover:text-slate-900 font-medium"
              >
                All
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {POPULAR_BOOKS_DATA.slice(0, 4).map((book, idx) => (
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

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActivePage("books")}
              className="w-full py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors border border-slate-200/60 dark:border-slate-700"
            >
              Browse Full Catalogue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
