import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import {
  Download,
  Award,
  FileSpreadsheet
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  MONTHLY_TREND_DATA,
  CATEGORY_BREAKDOWN_DATA,
  ACTIVE_STUDENTS_LEADERBOARD
} from "../data/mockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ReportsPage() {
  const { addToast } = useLibrary();

  const [dateFilter, setDateFilter] = useState("This Semester");

  // Monthly Circulation Line Chart (Sleek Linear styling)
  const circulationData = {
    labels: MONTHLY_TREND_DATA.labels,
    datasets: [
      {
        label: "Borrowed",
        data: MONTHLY_TREND_DATA.borrowed,
        borderColor: "#0f172a",
        backgroundColor: "rgba(15, 23, 42, 0.03)",
        tension: 0.25,
        fill: true,
        pointBackgroundColor: "#0f172a",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 4,
        pointRadius: 2.5,
        borderWidth: 1.75
      },
      {
        label: "Returned",
        data: MONTHLY_TREND_DATA.returned,
        borderColor: "#64748b",
        backgroundColor: "rgba(100, 116, 139, 0.02)",
        tension: 0.25,
        fill: true,
        pointBackgroundColor: "#64748b",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 4,
        pointRadius: 2.5,
        borderWidth: 1.75
      }
    ]
  };

  // Popular Categories Doughnut Chart
  const categoryData = {
    labels: CATEGORY_BREAKDOWN_DATA.labels,
    datasets: [
      {
        data: CATEGORY_BREAKDOWN_DATA.counts,
        backgroundColor: [
          "#0f172a", // Slate-900
          "#334155", // Slate-700
          "#475569", // Slate-600
          "#64748b", // Slate-500
          "#94a3b8", // Slate-400
          "#cbd5e1"  // Slate-300
        ],
        borderWidth: 1,
        borderColor: "#ffffff"
      }
    ]
  };

  // Fine Recovery Bar Chart in INR (₹)
  const fineCollectionData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Fines Collected (₹)",
        data: [1420, 1890, 2650, 3100, 4200, 3850],
        backgroundColor: "#0f172a",
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { family: "Inter, sans-serif", size: 11 }, usePointStyle: true, color: "#64748b", boxWidth: 6 }
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleFont: { family: "Inter, sans-serif", size: 11 },
        bodyFont: { family: "Inter, sans-serif", size: 11 },
        padding: 8,
        cornerRadius: 6
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: "#94a3b8" } },
      y: { grid: { color: "#f1f5f9" }, ticks: { font: { size: 11 }, color: "#94a3b8" }, border: { dash: [3, 3] } }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { family: "Inter, sans-serif", size: 10 }, usePointStyle: true, boxWidth: 6, color: "#64748b" }
      }
    },
    cutout: "70%"
  };

  const handleExport = (format) => {
    addToast(
      "success",
      `Export Completed (${format})`,
      `Circulation report for ${dateFilter} has been downloaded.`
    );
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Reports & Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Circulation trajectory, faculty category distribution, and recovery ledger.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date Selector */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            {["Last 7 Days", "Last 30 Days", "This Semester", "Custom Range"].map((range) => (
              <button
                key={range}
                onClick={() => setDateFilter(range)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  dateFilter === range
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export Action */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleExport("PDF")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => handleExport("CSV")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
              <span>CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-medium text-slate-400">Total Loans Processed</span>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mt-1 tabular-nums">14,280</h3>
          <p className="text-[11px] text-emerald-600 mt-2 font-medium">
            +14.2% circulation velocity
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-medium text-slate-400">On-Time Return Rate</span>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mt-1 tabular-nums">96.4%</h3>
          <p className="text-[11px] text-slate-500 mt-2">
            Average loan length: <span className="font-medium text-slate-700 dark:text-slate-300">11.4 days</span>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-medium text-slate-400">Peak Circulation Hour</span>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mt-1 tabular-nums">2:00 – 4:00 PM</h3>
          <p className="text-[11px] text-slate-500 mt-2">
            Heaviest traffic on <span className="font-medium text-slate-700 dark:text-slate-300">Tue & Thu</span>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-medium text-slate-400">Fee Recovery Ratio</span>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mt-1 tabular-nums">88.5%</h3>
          <p className="text-[11px] text-emerald-600 mt-2 font-medium">
            +₹3,850 recovered this term
          </p>
        </div>
      </div>

      {/* Row 2: Borrowed vs Returned & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                Circulation Trajectory (Fall 2026)
              </h3>
              <p className="text-xs text-slate-500">
                Monthly loan checkouts compared with returned items.
              </p>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              +18.4% YoY
            </span>
          </div>

          <div className="h-64 w-full pt-1">
            <Line data={circulationData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              Category Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              12,480 titles across departments
            </p>

            <div className="h-56 w-full relative mt-3">
              <Doughnut data={categoryData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Fine Recovery Bar Chart & Scholar Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
            Fine Collection Inflow
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Monthly late penalty recovery in INR (₹)
          </p>

          <div className="h-60 w-full pt-3">
            <Bar data={fineCollectionData} options={chartOptions} />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-slate-600" />
                <span>Active Scholars & Top Readers</span>
              </h3>
              <p className="text-xs text-slate-500">
                Cardholders with highest library reading velocity this term.
              </p>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              Semester Honor Roll
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {ACTIVE_STUDENTS_LEADERBOARD.map((student, idx) => (
              <div
                key={student.name}
                className="py-2.5 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400 text-xs w-4">
                    #{idx + 1}
                  </span>

                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />

                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      {student.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">{student.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-semibold text-xs text-slate-900 dark:text-white tabular-nums">
                      {student.booksRead}
                    </span>
                    <span className="text-[10px] text-slate-400 block uppercase">Titles</span>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {student.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
