import React, { useState, useEffect } from "react";
import { useLibrary } from "../context/LibraryContext";
import Badge from "../components/common/Badge";
import BookCover from "../components/common/BookCover";
import {
  Repeat,
  BookOpen,
  Calendar,
  AlertTriangle,
  Info
} from "lucide-react";

export default function IssueReturnPage() {
  const {
    books,
    students,
    transactions,
    issueBook,
    returnBook,
    preselectedIssueData,
    setPreselectedIssueData,
    addToast
  } = useLibrary();

  const [activeTab, setActiveTab] = useState("issue");

  // ISSUE STATE
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [durationDays, setDurationDays] = useState(14);
  const [dueDate, setDueDate] = useState("");
  const [issueNotes, setIssueNotes] = useState("");

  useEffect(() => {
    if (issueDate) {
      const d = new Date(issueDate);
      d.setDate(d.getDate() + parseInt(durationDays, 10));
      setDueDate(d.toISOString().split("T")[0]);
    }
  }, [issueDate, durationDays]);

  useEffect(() => {
    if (preselectedIssueData) {
      setActiveTab("issue");
      if (preselectedIssueData.bookId) setSelectedBookId(preselectedIssueData.bookId);
      if (preselectedIssueData.studentId) setSelectedStudentId(preselectedIssueData.studentId);
      setPreselectedIssueData(null);
    }
  }, [preselectedIssueData, setPreselectedIssueData]);

  // RETURN STATE
  const [selectedTxId, setSelectedTxId] = useState("");
  const [bookCondition, setBookCondition] = useState("Good");
  const [collectFineNow, setCollectFineNow] = useState(true);

  const currentStudent = students.find((s) => s.id === selectedStudentId);
  const currentBook = books.find((b) => b.id === selectedBookId);

  const activeTransactions = transactions.filter((t) => t.status !== "Returned");
  const currentTx = activeTransactions.find((t) => t.id === selectedTxId);

  // Currency calculation in INR (₹)
  let calculatedOverdueDays = 0;
  let calculatedFine = 0;

  if (currentTx) {
    const today = new Date();
    const due = new Date(currentTx.dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      calculatedOverdueDays = diffDays;
      calculatedFine = calculatedOverdueDays * 10; // ₹10 per day late fee
    }
    if (bookCondition === "Damaged") {
      calculatedFine += 150; // ₹150 damage fee
    }
  }

  const handleConfirmIssue = (e) => {
    e.preventDefault();
    if (!selectedStudentId || !selectedBookId) {
      addToast("warning", "Incomplete", "Please select both a student and a book.");
      return;
    }

    const success = issueBook({
      studentId: selectedStudentId,
      bookId: selectedBookId,
      dueDate,
      notes: issueNotes
    });

    if (success) {
      setSelectedBookId("");
      setIssueNotes("");
    }
  };

  const handleConfirmReturn = (e) => {
    e.preventDefault();
    if (!currentTx) {
      addToast("warning", "Select Loan", "Please select an active book loan record to return.");
      return;
    }

    const success = returnBook({
      transactionId: currentTx.id,
      studentId: currentTx.studentId,
      bookId: currentTx.bookId,
      condition: bookCondition,
      fineAmount: calculatedFine,
      isFinePaid: collectFineNow
    });

    if (success) {
      setSelectedTxId("");
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
          Circulation Desk
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Process student textbook checkouts, returns, and calculate overdue penalties.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("issue")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
            activeTab === "issue"
              ? "border-slate-900 text-slate-900 dark:border-white dark:text-white"
              : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Issue Book (Checkout)</span>
        </button>

        <button
          onClick={() => setActiveTab("return")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
            activeTab === "return"
              ? "border-slate-900 text-slate-900 dark:border-white dark:text-white"
              : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>Return Book (Check-in)</span>
        </button>
      </div>

      {/* TAB 1: ISSUE BOOK */}
      {activeTab === "issue" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              Checkout Details
            </h3>

            <form onSubmit={handleConfirmIssue} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Select Registered Student *
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-hidden"
                >
                  <option value="">-- Choose a student by Roll Number or Name --</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.rollNumber} — {student.name} ({student.department}) [{student.booksIssuedCount}/{student.maxLimit} issued]
                    </option>
                  ))}
                </select>

                {currentStudent && (
                  <div className="mt-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={currentStudent.avatar}
                        alt={currentStudent.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {currentStudent.name}
                      </span>
                    </div>
                    <Badge
                      variant={
                        currentStudent.booksIssuedCount >= currentStudent.maxLimit
                          ? "restricted"
                          : "available"
                      }
                      size="sm"
                    >
                      {currentStudent.booksIssuedCount} / {currentStudent.maxLimit} Quota
                    </Badge>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Select Book to Issue *
                </label>
                <select
                  value={selectedBookId}
                  onChange={(e) => setSelectedBookId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-hidden"
                >
                  <option value="">-- Select title from repository --</option>
                  {books.map((book) => (
                    <option
                      key={book.id}
                      value={book.id}
                      disabled={book.availableCopies === 0}
                    >
                      {book.title} ({book.availableCopies > 0 ? `${book.availableCopies} available` : "OUT OF STOCK"})
                    </option>
                  ))}
                </select>

                {currentBook && (
                  <div className="mt-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {currentBook.title}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Stack: {currentBook.shelfLocation}
                      </p>
                    </div>
                    <Badge
                      variant={currentBook.availableCopies > 0 ? "available" : "out_of_stock"}
                      size="sm"
                    >
                      {currentBook.availableCopies} Available
                    </Badge>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Loan Duration
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: "14 Days", days: 14 },
                      { label: "28 Days", days: 28 },
                      { label: "Semester", days: 90 }
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.days}
                        onClick={() => setDurationDays(item.days)}
                        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-colors ${
                          durationDays === item.days
                            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                            : "bg-slate-100 hover:bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Calculated Due Date:
                </span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">
                  {dueDate || "—"}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Desk Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Issued for Major Project Coursework"
                  value={issueNotes}
                  onChange={(e) => setIssueNotes(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={
                  !selectedStudentId ||
                  !selectedBookId ||
                  (currentBook && currentBook.availableCopies <= 0) ||
                  (currentStudent && currentStudent.booksIssuedCount >= currentStudent.maxLimit)
                }
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Confirm & Issue Book
              </button>
            </form>
          </div>

          {/* Right Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5">
            <h3 className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
              Transaction Summary
            </h3>

            {currentBook ? (
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                <BookCover
                  title={currentBook.title}
                  author={currentBook.author}
                  category={currentBook.category}
                  color={currentBook.coverColor}
                  tag={currentBook.coverTag}
                  size="sm"
                  className="shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-medium text-xs text-slate-900 dark:text-white truncate">
                    {currentBook.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">{currentBook.author}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Stack: {currentBook.shelfLocation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-5 text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                No book selected.
              </div>
            )}

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="py-2 flex items-center justify-between">
                <span className="text-slate-500">Student</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {currentStudent ? currentStudent.name : "Not selected"}
                </span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-slate-500">Duration</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {durationDays} Days
                </span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-slate-500">Due Date</span>
                <span className="font-semibold font-mono text-slate-900 dark:text-white">
                  {dueDate || "—"}
                </span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-slate-500">Late Penalty Rate</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">₹10 / day overdue</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 text-[11px] flex items-start gap-2">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
              <span>
                Cardholders receive an automated email notice 24 hours prior to the return due date.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RETURN BOOK */}
      {activeTab === "return" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              Return & Condition Check
            </h3>

            <form onSubmit={handleConfirmReturn} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Select Active Book Circulation Record *
                </label>
                <select
                  value={selectedTxId}
                  onChange={(e) => setSelectedTxId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-hidden"
                >
                  <option value="">-- Choose active loan to return --</option>
                  {activeTransactions.map((tx) => (
                    <option key={tx.id} value={tx.id}>
                      {tx.studentName} — "{tx.bookTitle}" (Due: {tx.dueDate} | {tx.status})
                    </option>
                  ))}
                </select>
              </div>

              {currentTx && (
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                        {currentTx.bookTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Borrower: {currentTx.studentName} ({currentTx.studentDept})
                      </p>
                    </div>
                    <Badge
                      variant={currentTx.statusType === "danger" ? "overdue" : "available"}
                      size="sm"
                    >
                      {currentTx.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs border-t border-slate-200/60 dark:border-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                        Issue Date
                      </span>
                      <span className="font-mono">{currentTx.issueDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                        Due Date
                      </span>
                      <span className="font-mono font-medium">{currentTx.dueDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                        Return Date
                      </span>
                      <span className="font-mono font-medium text-emerald-600">Today</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                        Overdue Status
                      </span>
                      <span className={calculatedOverdueDays > 0 ? "font-semibold text-rose-600" : "text-emerald-600 font-medium"}>
                        {calculatedOverdueDays > 0 ? `${calculatedOverdueDays}d Late` : "On Time"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Physical Condition Assessment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "Good", label: "Good / Intact", desc: "No damage" },
                    { id: "Fair", label: "Fair / Minor Wear", desc: "Standard wear" },
                    { id: "Damaged", label: "Damaged (+₹150)", desc: "Requires repair" }
                  ].map((cond) => (
                    <button
                      type="button"
                      key={cond.id}
                      onClick={() => setBookCondition(cond.id)}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        bookCondition === cond.id
                          ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <p className="font-medium text-xs">{cond.label}</p>
                      <p className={`text-[10px] mt-0.5 ${bookCondition === cond.id ? "text-slate-300 dark:text-slate-600" : "text-slate-400"}`}>
                        {cond.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {calculatedFine > 0 && (
                <div className="p-3.5 rounded-lg bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div>
                    <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-semibold text-xs">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Fine Applicable: ₹{calculatedFine}</span>
                    </div>
                    <p className="text-slate-500 mt-0.5 text-[11px]">
                      {calculatedOverdueDays > 0 ? `${calculatedOverdueDays} days late (₹${calculatedOverdueDays * 10})` : ""}
                      {bookCondition === "Damaged" ? " + ₹150 damage fee" : ""}
                    </p>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={collectFineNow}
                      onChange={(e) => setCollectFineNow(e.target.checked)}
                      className="rounded text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
                    />
                    <span>Collect Fine Immediately</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={!currentTx}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Confirm Return & Shelve Book
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
              Return Guidelines
            </h3>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Barcode Inspection
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Scan book barcode and verify accession number against stack records.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Automated Fine Calculation
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Overdue fine is ₹10/day. Payments can be settled via UPI, Cash, or student ledger.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Instant Quota Restoration
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Student borrowing limit is restored immediately upon check-in.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
