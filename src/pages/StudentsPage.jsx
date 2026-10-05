import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import Badge from "../components/common/Badge";
import Modal from "../components/common/Modal";
import {
  Search,
  Plus,
  Mail,
  Phone
} from "lucide-react";

export default function StudentsPage() {
  const {
    students,
    addNewStudent,
    selectedStudentForDetails,
    setSelectedStudentForDetails,
    setPreselectedIssueData,
    setActivePage,
    addToast
  } = useLibrary();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [profileTab, setProfileTab] = useState("current");

  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    rollNumber: "",
    department: "Computer Science & Engg",
    semester: "Semester 3",
    email: "",
    phone: "",
    avatar: ""
  });

  const departments = [
    "All",
    "Computer Science & Engg",
    "Information Technology",
    "AI & Data Science",
    "Electronics & Communication"
  ];

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === "All" || s.department === selectedDept;
    const matchesStatus = selectedStatus === "All" || s.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleCreateStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentForm.name || !newStudentForm.rollNumber || !newStudentForm.email) {
      addToast("warning", "Required Fields", "Name, Roll Number, and Email are required.");
      return;
    }

    addNewStudent(newStudentForm);
    setIsAddModalOpen(false);
    setNewStudentForm({
      name: "",
      rollNumber: "",
      department: "Computer Science & Engg",
      semester: "Semester 3",
      email: "",
      phone: "",
      avatar: ""
    });
  };

  const handleIssueToStudent = (student) => {
    setPreselectedIssueData({ studentId: student.id, studentName: student.name });
    setSelectedStudentForDetails(null);
    setActivePage("issue-return");
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Students & Members
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Registered university cardholders, active checkouts, and loan quotas.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search student by name, roll number, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "All Departments" : d}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Restricted">Restricted</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/75 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-medium">Roll ID</th>
                <th className="py-2.5 px-4 font-medium">Student</th>
                <th className="py-2.5 px-4 font-medium">Department</th>
                <th className="py-2.5 px-4 font-medium">Issued Books</th>
                <th className="py-2.5 px-4 font-medium">Due Books</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
                <th className="py-2.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-2.5 px-4">
                    <span className="font-mono font-medium text-slate-900 dark:text-slate-200">
                      {student.rollNumber}
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono">{student.id}</div>
                  </td>

                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <p
                          onClick={() => setSelectedStudentForDetails(student)}
                          className="font-medium text-slate-900 dark:text-white hover:text-indigo-600 cursor-pointer"
                        >
                          {student.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{student.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-4">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {student.department}
                    </p>
                    <p className="text-[10px] text-slate-400">{student.semester}</p>
                  </td>

                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                        {student.booksIssuedCount} of {student.maxLimit}
                      </span>
                      <div className="w-12 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            student.booksIssuedCount >= student.maxLimit
                              ? "bg-rose-500"
                              : "bg-slate-900 dark:bg-white"
                          }`}
                          style={{
                            width: `${(student.booksIssuedCount / student.maxLimit) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-4">
                    {student.dueBooksCount > 0 ? (
                      <Badge variant="overdue" size="sm" dot>
                        {student.dueBooksCount} Overdue
                      </Badge>
                    ) : (
                      <span className="text-slate-400 text-[11px]">0</span>
                    )}
                  </td>

                  <td className="py-2.5 px-4">
                    <Badge variant={student.status.toLowerCase()} size="sm" dot>
                      {student.status}
                    </Badge>
                  </td>

                  <td className="py-2.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedStudentForDetails(student)}
                        className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs"
                      >
                        Profile
                      </button>
                      <button
                        disabled={student.booksIssuedCount >= student.maxLimit}
                        onClick={() => handleIssueToStudent(student)}
                        className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs disabled:opacity-40"
                      >
                        Issue
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STUDENT PROFILE MODAL */}
      {selectedStudentForDetails && (
        <Modal
          isOpen={!!selectedStudentForDetails}
          onClose={() => setSelectedStudentForDetails(null)}
          title="Student Profile"
          subtitle={`Student ID: ${selectedStudentForDetails.id} • Roll: ${selectedStudentForDetails.rollNumber}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
              <img
                src={selectedStudentForDetails.avatar}
                alt={selectedStudentForDetails.name}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {selectedStudentForDetails.name}
                  </h3>
                  <Badge variant={selectedStudentForDetails.status.toLowerCase()} size="sm" dot>
                    {selectedStudentForDetails.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">
                  {selectedStudentForDetails.department} • {selectedStudentForDetails.semester}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                  <span className="truncate">{selectedStudentForDetails.email}</span>
                  <span>{selectedStudentForDetails.phone}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  Active Loans
                </span>
                <span className="text-base font-semibold text-slate-900 dark:text-white tabular-nums">
                  {selectedStudentForDetails.booksIssuedCount} / {selectedStudentForDetails.maxLimit}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 text-xs font-medium gap-4">
              <button
                onClick={() => setProfileTab("current")}
                className={`pb-2 transition-colors ${
                  profileTab === "current"
                    ? "text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Current Issued Books ({selectedStudentForDetails.currentLoans?.length || 0})
              </button>
              <button
                onClick={() => setProfileTab("history")}
                className={`pb-2 transition-colors ${
                  profileTab === "history"
                    ? "text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white font-semibold"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Borrowing History ({selectedStudentForDetails.history?.length || 0})
              </button>
            </div>

            {profileTab === "current" && (
              <div className="space-y-1.5">
                {selectedStudentForDetails.currentLoans && selectedStudentForDetails.currentLoans.length > 0 ? (
                  selectedStudentForDetails.currentLoans.map((loan, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {loan.bookTitle}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Issued: {loan.issueDate} • Due: {loan.dueDate}
                        </p>
                      </div>
                      <div>
                        {loan.isOverdue ? (
                          <Badge variant="overdue" size="sm" dot>
                            {loan.daysOverdue}d Overdue
                          </Badge>
                        ) : (
                          <Badge variant="available" size="sm">
                            {loan.daysLeft}d Left
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-3 text-center">
                    No active book loans.
                  </p>
                )}
              </div>
            )}

            {profileTab === "history" && (
              <div className="space-y-1.5">
                {selectedStudentForDetails.history && selectedStudentForDetails.history.length > 0 ? (
                  selectedStudentForDetails.history.map((hist, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {hist.bookTitle}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Returned: {hist.returnDate}
                        </p>
                      </div>
                      <Badge variant="available" size="sm">
                        {hist.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-3 text-center">
                    No circulation history recorded.
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedStudentForDetails(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                disabled={selectedStudentForDetails.booksIssuedCount >= selectedStudentForDetails.maxLimit}
                onClick={() => handleIssueToStudent(selectedStudentForDetails)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs disabled:opacity-40"
              >
                Issue Book
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ADD NEW STUDENT MODAL */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Student Member"
          subtitle="Enroll new student for library privileges"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleCreateStudentSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Sharma"
                  value={newStudentForm.name}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Roll / Card Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 24CS118"
                  value={newStudentForm.rollNumber}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, rollNumber: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <select
                  value={newStudentForm.department}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, department: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                >
                  <option value="Computer Science & Engg">Computer Science & Engg</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. name@university.edu"
                  value={newStudentForm.email}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  value={newStudentForm.phone}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Semester
                </label>
                <select
                  value={newStudentForm.semester}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, semester: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                >
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7</option>
                  <option value="Semester 8">Semester 8</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
              >
                Enroll Member
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
