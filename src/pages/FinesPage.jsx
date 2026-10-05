import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import StatCard from "../components/common/StatCard";
import Badge from "../components/common/Badge";
import Modal from "../components/common/Modal";
import {
  Receipt,
  Users,
  Clock,
  Search,
  AlertCircle,
  Printer
} from "lucide-react";

export default function FinesPage() {
  const { fines, stats, payFine, waiveFine, addToast } = useLibrary();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedFineForPayment, setSelectedFineForPayment] = useState(null);
  const [selectedFineForWaive, setSelectedFineForWaive] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [waiveReason, setWaiveReason] = useState("Medical Exemption Approved by Dean");

  const filteredFines = fines.filter((f) => {
    const matchesSearch =
      f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.studentRoll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || f.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handlePayConfirm = (e) => {
    e.preventDefault();
    if (!selectedFineForPayment) return;
    payFine(selectedFineForPayment.id, paymentMethod);
    setSelectedFineForPayment(null);
  };

  const handleWaiveConfirm = (e) => {
    e.preventDefault();
    if (!selectedFineForWaive) return;
    waiveFine(selectedFineForWaive.id, waiveReason);
    setSelectedFineForWaive(null);
  };

  const handlePrintReceipt = (fine) => {
    addToast("info", "Receipt Generated", `Tax invoice & payment slip generated for #${fine.id}.`);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
          Fines & Dues Management
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Track overdue penalty fees, reconcile settlements, and process payments.
        </p>
      </div>

      {/* 4 Fine Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Outstanding"
          value={`₹${stats.totalFinesOutstanding.toLocaleString()}`}
          description="Uncollected overdue debt"
          trend="42 members"
          trendType="down"
          icon={AlertCircle}
        />
        <StatCard
          title="Collected This Month"
          value={`₹${stats.finesCollectedMonth.toLocaleString()}`}
          description="Reconciled to library fund"
          trend="+18% vs last month"
          trendType="up"
          icon={Receipt}
        />
        <StatCard
          title="Overdue Members"
          value={stats.overdueBooksCount || 42}
          description="Delinquent accounts"
          trend="Requires follow-up"
          trendType="neutral"
          icon={Users}
        />
        <StatCard
          title="Average Fine"
          value="₹25"
          description="Per overdue book checkout"
          trend="Std rate: ₹10/day"
          trendType="neutral"
          icon={Clock}
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search fine by student, roll number, or book title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
          {["All", "Overdue", "Pending", "Paid"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                statusFilter === st
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Fines Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/75 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-medium">Invoice Ref / Student</th>
                <th className="py-2.5 px-4 font-medium">Book Title</th>
                <th className="py-2.5 px-4 font-medium">Due Date</th>
                <th className="py-2.5 px-4 font-medium">Return Date</th>
                <th className="py-2.5 px-4 font-medium">Days Overdue</th>
                <th className="py-2.5 px-4 font-medium">Fine (INR)</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
                <th className="py-2.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredFines.map((fine) => (
                <tr
                  key={fine.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-2.5 px-4">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {fine.studentName}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400">
                      {fine.studentRoll} • {fine.id}
                    </p>
                  </td>

                  <td className="py-2.5 px-4 max-w-[180px]">
                    <p className="text-slate-800 dark:text-slate-200 truncate font-normal">
                      {fine.bookTitle}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">{fine.reason}</p>
                  </td>

                  <td className="py-2.5 px-4 text-slate-500 font-mono text-[11px]">
                    {fine.dueDate}
                  </td>

                  <td className="py-2.5 px-4 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    {fine.returnDate}
                  </td>

                  <td className="py-2.5 px-4">
                    <span
                      className={`font-medium tabular-nums ${
                        fine.daysOverdue > 5 ? "text-rose-600" : "text-amber-600"
                      }`}
                    >
                      {fine.daysOverdue} Days
                    </span>
                  </td>

                  <td className="py-2.5 px-4">
                    <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                      ₹{fine.amount.toFixed(2)}
                    </span>
                  </td>

                  <td className="py-2.5 px-4">
                    <Badge variant={fine.status.toLowerCase()} size="sm" dot>
                      {fine.status}
                    </Badge>
                  </td>

                  <td className="py-2.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {fine.status !== "Paid" && fine.status !== "Waived" ? (
                        <>
                          <button
                            onClick={() => setSelectedFineForPayment(fine)}
                            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
                          >
                            Collect
                          </button>
                          <button
                            onClick={() => setSelectedFineForWaive(fine)}
                            className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium"
                          >
                            Waive
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handlePrintReceipt(fine)}
                          className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium inline-flex items-center gap-1"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Receipt</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COLLECT FINE MODAL */}
      {selectedFineForPayment && (
        <Modal
          isOpen={!!selectedFineForPayment}
          onClose={() => setSelectedFineForPayment(null)}
          title="Collect Library Fine"
          subtitle={`Invoice Reference: ${selectedFineForPayment.id}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handlePayConfirm} className="space-y-3.5">
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Student</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {selectedFineForPayment.studentName} ({selectedFineForPayment.studentRoll})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Book</span>
                <span className="font-normal text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                  {selectedFineForPayment.bookTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Days Overdue</span>
                <span className="font-medium text-rose-600">
                  {selectedFineForPayment.daysOverdue} Days
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200/80 dark:border-slate-700 text-sm">
                <span className="font-medium text-slate-900 dark:text-white">Total Amount Due</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  ₹{selectedFineForPayment.amount.toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Payment Collection Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["UPI", "Cash", "Card / POS"].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition-colors ${
                      paymentMethod === method
                        ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedFineForPayment(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
              >
                Confirm Payment
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* WAIVE FINE MODAL */}
      {selectedFineForWaive && (
        <Modal
          isOpen={!!selectedFineForWaive}
          onClose={() => setSelectedFineForWaive(null)}
          title="Waive Library Fine"
          subtitle={`Fine Ref: ${selectedFineForWaive.id} • ${selectedFineForWaive.studentName}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleWaiveConfirm} className="space-y-3.5">
            <p className="text-xs text-slate-500 leading-normal">
              Waiving this fine will clear the ₹{selectedFineForWaive.amount.toFixed(2)} balance and restore the student's circulation privileges without cash collection.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Official Exemption Rationale *
              </label>
              <select
                value={waiveReason}
                onChange={(e) => setWaiveReason(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
              >
                <option value="Medical Exemption Approved by Dean">Medical Exemption Approved by Dean</option>
                <option value="Official Academic Research Travel">Official Academic Research Travel</option>
                <option value="System Automated Late Glitch Reversal">System Automated Late Glitch Reversal</option>
                <option value="Special One-Time Dean Discretion">Special One-Time Dean Discretion</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedFineForWaive(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs transition-colors"
              >
                Confirm Waiver
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
