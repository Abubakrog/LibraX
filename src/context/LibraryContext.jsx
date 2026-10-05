import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_STATS,
  INITIAL_BOOKS,
  INITIAL_STUDENTS,
  INITIAL_ISSUED_TRANSACTIONS,
  INITIAL_FINES,
  INITIAL_NOTIFICATIONS
} from "../data/mockData";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  // Navigation & Authentication
  const [activePage, setActivePage] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Admin Profile
  const [adminProfile, setAdminProfile] = useState({
    name: "Dr. Alok Verma",
    title: "Chief Librarian",
    department: "Central University Library",
    email: "alok.verma@university.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    institution: "Apex Institute of Technology",
    semester: "Fall 2026",
    role: "Super Admin"
  });

  // Core Data
  const [stats, setStats] = useState(INITIAL_STATS);
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [transactions, setTransactions] = useState(INITIAL_ISSUED_TRANSACTIONS);
  const [fines, setFines] = useState(INITIAL_FINES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modals & Details View Selection
  const [selectedBookForDetails, setSelectedBookForDetails] = useState(null);
  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState(null);
  const [preselectedIssueData, setPreselectedIssueData] = useState(null);

  // UI Settings & Theme
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState("indigo");

  // Toast Notification System
  const [toasts, setToasts] = useState([]);

  const addToast = (type = "success", title, message) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Issue Book Action
  const issueBook = ({ studentId, bookId, dueDate, notes }) => {
    const targetBook = books.find((b) => b.id === bookId);
    const targetStudent = students.find((s) => s.id === studentId);

    if (!targetBook || !targetStudent) {
      addToast("error", "Issue Failed", "Invalid student or book selected.");
      return false;
    }

    if (targetBook.availableCopies <= 0) {
      addToast("error", "Unavailable", "No physical copies of this book are currently available.");
      return false;
    }

    if (targetStudent.booksIssuedCount >= targetStudent.maxLimit) {
      addToast("warning", "Limit Exceeded", `${targetStudent.name} has already reached the maximum 4-book checkout quota.`);
      return false;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const newTxId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;

    // Update book copies & borrowers
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              availableCopies: b.availableCopies - 1,
              borrowCount: b.borrowCount + 1,
              borrowers: [
                ...b.borrowers,
                { studentId: targetStudent.id, name: targetStudent.name, issueDate: todayStr, dueDate }
              ]
            }
          : b
      )
    );

    // Update student loan list
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              booksIssuedCount: s.booksIssuedCount + 1,
              currentLoans: [
                ...s.currentLoans,
                {
                  bookId: targetBook.id,
                  bookTitle: targetBook.title,
                  issueDate: todayStr,
                  dueDate,
                  isOverdue: false,
                  daysLeft: 14
                }
              ]
            }
          : s
      )
    );

    // Add to transactions
    setTransactions((prev) => [
      {
        id: newTxId,
        studentId: targetStudent.id,
        studentName: targetStudent.name,
        studentDept: targetStudent.department,
        bookId: targetBook.id,
        bookTitle: targetBook.title,
        issueDate: todayStr,
        dueDate,
        status: "Active",
        statusType: "success"
      },
      ...prev
    ]);

    // Update global stats
    setStats((prev) => ({
      ...prev,
      availableBooks: prev.availableBooks - 1,
      issuedBooks: prev.issuedBooks + 1
    }));

    // Add system notification
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        type: "success",
        category: "Checkout",
        title: "Book Issued Successfully",
        message: `'${targetBook.title}' issued to ${targetStudent.name}. Due on ${dueDate}.`,
        time: "Just now",
        read: false,
        actionLabel: "View Catalogue",
        targetPage: "books"
      },
      ...prev
    ]);

    addToast("success", "Book Checked Out", `"${targetBook.title}" successfully issued to ${targetStudent.name}.`);
    return true;
  };

  // Return Book Action
  const returnBook = ({ transactionId, studentId, bookId, condition = "Good", fineAmount = 0, isFinePaid = false }) => {
    const todayStr = new Date().toISOString().split("T")[0];

    // Remove from student's currentLoans
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const targetLoan = s.currentLoans.find((l) => l.bookId === bookId);
          return {
            ...s,
            booksIssuedCount: Math.max(0, s.booksIssuedCount - 1),
            currentLoans: s.currentLoans.filter((l) => l.bookId !== bookId),
            history: [
              {
                bookTitle: targetLoan ? targetLoan.bookTitle : "Library Book",
                returnDate: todayStr,
                status: condition === "Good" ? "Returned on time" : `Returned (${condition})`
              },
              ...s.history
            ]
          };
        }
        return s;
      })
    );

    // Update book availability
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              availableCopies: b.availableCopies + 1,
              borrowers: b.borrowers.filter((borr) => borr.studentId !== studentId)
            }
          : b
      )
    );

    // Update transaction status
    if (transactionId) {
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === transactionId
            ? { ...tx, status: "Returned", statusType: "info" }
            : tx
        )
      );
    }

    // Handle fine if generated
    if (fineAmount > 0) {
      const studentObj = students.find((s) => s.id === studentId);
      const bookObj = books.find((b) => b.id === bookId);

      const newFine = {
        id: `FN-${Math.floor(100 + Math.random() * 900)}`,
        studentId,
        studentName: studentObj?.name || "Student",
        studentRoll: studentObj?.rollNumber || "ID-UNKNOWN",
        bookTitle: bookObj?.title || "Book",
        dueDate: "2026-09-28",
        returnDate: todayStr,
        daysOverdue: Math.round(fineAmount / 5),
        amount: fineAmount,
        status: isFinePaid ? "Paid" : "Pending",
        reason: condition !== "Good" ? `Late return + Condition: ${condition}` : "Overdue return penalty"
      };

      setFines((prev) => [newFine, ...prev]);

      if (isFinePaid) {
        setStats((prev) => ({
          ...prev,
          finesCollectedMonth: prev.finesCollectedMonth + fineAmount
        }));
      } else {
        setStats((prev) => ({
          ...prev,
          totalFinesOutstanding: prev.totalFinesOutstanding + fineAmount
        }));
      }
    }

    // Update stats
    setStats((prev) => ({
      ...prev,
      availableBooks: prev.availableBooks + 1,
      issuedBooks: Math.max(0, prev.issuedBooks - 1)
    }));

    addToast("success", "Return Recorded", "Book checked back into stack inventory successfully.");
    return true;
  };

  // Add New Book
  const addNewBook = (newBook) => {
    const id = `BK-${1000 + books.length + 1}`;
    const preparedBook = {
      ...newBook,
      id,
      rating: 4.8,
      borrowCount: 0,
      availableCopies: parseInt(newBook.totalCopies, 10) || 5,
      totalCopies: parseInt(newBook.totalCopies, 10) || 5,
      borrowers: [],
      coverColor: newBook.coverColor || "from-indigo-600 to-blue-800",
      coverTag: (newBook.category || "BOOK").toUpperCase().slice(0, 10)
    };

    setBooks((prev) => [preparedBook, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalBooks: prev.totalBooks + preparedBook.totalCopies,
      availableBooks: prev.availableBooks + preparedBook.totalCopies
    }));

    addToast("success", "Book Added", `"${preparedBook.title}" added to the library catalogue.`);
  };

  // Add New Student
  const addNewStudent = (newStudent) => {
    const id = `STU-2024-${String(students.length + 1).padStart(3, "0")}`;
    const preparedStudent = {
      ...newStudent,
      id,
      booksIssuedCount: 0,
      dueBooksCount: 0,
      status: "Active",
      fineDue: 0,
      maxLimit: 4,
      membershipDate: new Date().toISOString().split("T")[0],
      currentLoans: [],
      history: [],
      avatar:
        newStudent.avatar ||
        `https://images.unsplash.com/photo-${1535713875002 + students.length}?w=150&auto=format&fit=crop&q=80`
    };

    setStudents((prev) => [preparedStudent, ...prev]);
    setStats((prev) => ({
      ...prev,
      registeredStudents: prev.registeredStudents + 1
    }));

    addToast("success", "Student Enrolled", `${preparedStudent.name} registered as a library member.`);
  };

  // Pay Fine
  const payFine = (fineId, method = "UPI") => {
    const targetFine = fines.find((f) => f.id === fineId);
    if (!targetFine) return;

    setFines((prev) =>
      prev.map((f) => (f.id === fineId ? { ...f, status: "Paid", paidVia: method } : f))
    );

    setStats((prev) => ({
      ...prev,
      totalFinesOutstanding: Math.max(0, prev.totalFinesOutstanding - targetFine.amount),
      finesCollectedMonth: prev.finesCollectedMonth + targetFine.amount
    }));

    addToast("success", "Fine Settled", `Fine of ₹${targetFine.amount.toFixed(2)} received via ${method}.`);
  };

  // Waive Fine
  const waiveFine = (fineId, reason = "Librarian Discretion") => {
    const targetFine = fines.find((f) => f.id === fineId);
    if (!targetFine) return;

    setFines((prev) =>
      prev.map((f) => (f.id === fineId ? { ...f, status: "Waived", waivedReason: reason } : f))
    );

    setStats((prev) => ({
      ...prev,
      totalFinesOutstanding: Math.max(0, prev.totalFinesOutstanding - targetFine.amount)
    }));

    addToast("info", "Fine Waived", `Fine #${targetFine.id} has been waived.`);
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("info", "Notifications", "All notifications marked as read.");
  };

  return (
    <LibraryContext.Provider
      value={{
        activePage,
        setActivePage,
        isAuthenticated,
        setIsAuthenticated,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        adminProfile,
        setAdminProfile,
        stats,
        books,
        students,
        transactions,
        fines,
        notifications,
        selectedBookForDetails,
        setSelectedBookForDetails,
        selectedStudentForDetails,
        setSelectedStudentForDetails,
        preselectedIssueData,
        setPreselectedIssueData,
        darkMode,
        setDarkMode,
        accentColor,
        setAccentColor,
        toasts,
        addToast,
        removeToast,
        issueBook,
        returnBook,
        addNewBook,
        addNewStudent,
        payFine,
        waiveFine,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      <div className={darkMode ? "dark" : ""}>{children}</div>
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
