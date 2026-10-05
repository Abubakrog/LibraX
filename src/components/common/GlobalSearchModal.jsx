import React, { useState, useEffect } from "react";
import { useLibrary } from "../../context/LibraryContext";
import { Search, Book, Users, ArrowRight, CornerDownLeft, X } from "lucide-react";

export default function GlobalSearchModal() {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    books,
    students,
    setSelectedBookForDetails,
    setSelectedStudentForDetails,
    setActivePage
  } = useLibrary();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredBooks = query.trim()
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.category.toLowerCase().includes(query.toLowerCase()) ||
          b.isbn.includes(query)
      ).slice(0, 4)
    : books.slice(0, 3);

  const filteredStudents = query.trim()
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.rollNumber.toLowerCase().includes(query.toLowerCase()) ||
          s.department.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : students.slice(0, 2);

  const quickNavLinks = [
    { label: "Dashboard", page: "dashboard" },
    { label: "Book Catalogue", page: "books" },
    { label: "Students", page: "students" },
    { label: "Issue & Return", page: "issue-return" },
    { label: "Fines", page: "fines" },
    { label: "Reports", page: "reports" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity"
        onClick={() => setIsSearchModalOpen(false)}
      />

      {/* Command Palette Card */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10">
        {/* Search Bar */}
        <div className="flex items-center px-3.5 py-3 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
          <input
            type="text"
            placeholder="Type a book, author, student name, or roll number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results */}
        <div className="p-3 max-h-[50vh] overflow-y-auto space-y-4">
          {!query && (
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-2 px-1">
                Navigation
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickNavLinks.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      setActivePage(item.page);
                      setIsSearchModalOpen(false);
                    }}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredBooks.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1 px-1">
                Books
              </p>
              <div className="space-y-0.5">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => {
                      setSelectedBookForDetails(book);
                      setIsSearchModalOpen(false);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-9 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0 font-medium text-[10px]">
                        {book.category.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-medium text-slate-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">
                          {book.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {book.author}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono shrink-0 ml-2">
                      {book.availableCopies} avail
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredStudents.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1 px-1">
                Students
              </p>
              <div className="space-y-0.5">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => {
                      setSelectedStudentForDetails(student);
                      setIsSearchModalOpen(false);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-medium text-slate-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">
                          {student.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {student.rollNumber} • {student.department}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                      {student.booksIssuedCount} books
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-3.5 py-2 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search university repository</span>
          <span className="flex items-center gap-1 font-mono text-[10px]">
            <CornerDownLeft className="w-3 h-3" /> to select
          </span>
        </div>
      </div>
    </div>
  );
}
