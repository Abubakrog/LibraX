// LibraX - Realistic Central University Library Mock Data

export const INITIAL_STATS = {
  totalBooks: 12480,
  availableBooks: 9860,
  issuedBooks: 2340,
  registeredStudents: 1850,
  overdueBooksCount: 42,
  totalFinesOutstanding: 1240,
  finesCollectedMonth: 3850,
};

export const INITIAL_BOOKS = [
  {
    id: "BK-1001",
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth",
    isbn: "978-0078022159",
    publisher: "McGraw-Hill Higher Education",
    publicationYear: 2020,
    edition: "7th Edition",
    category: "Computer Science",
    totalCopies: 25,
    availableCopies: 18,
    shelfLocation: "Stack CS-04, Row B",
    rating: 4.8,
    borrowCount: 342,
    coverColor: "from-blue-600 to-indigo-800",
    coverTag: "DATABASE",
    description: "Database System Concepts presents the core concepts of database management in an intuitive manner geared toward allowing students to begin working with databases as quickly as possible. Covers relational model, SQL, transactions, concurrency, and distributed DBs.",
    borrowers: [
      { studentId: "STU-2024-001", name: "Aarav Shah", issueDate: "2026-09-22", dueDate: "2026-10-06" },
      { studentId: "STU-2024-003", name: "Kabir Patel", issueDate: "2026-09-18", dueDate: "2026-10-02" }
    ]
  },
  {
    id: "BK-1002",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    publisher: "Prentice Hall",
    publicationYear: 2019,
    edition: "1st Anniversary Edition",
    category: "Software Engineering",
    totalCopies: 15,
    availableCopies: 3,
    shelfLocation: "Stack SE-02, Row A",
    rating: 4.9,
    borrowCount: 418,
    coverColor: "from-emerald-600 to-teal-800",
    coverTag: "AGILE DEV",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. Clean Code revolutionizes the way we write readable code.",
    borrowers: [
      { studentId: "STU-2024-002", name: "Riya Mehta", issueDate: "2026-09-25", dueDate: "2026-10-09" }
    ]
  },
  {
    id: "BK-1003",
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum, David J. Wetherall",
    isbn: "978-0132126953",
    publisher: "Pearson Education",
    publicationYear: 2021,
    edition: "6th Edition",
    category: "Computer Science",
    totalCopies: 20,
    availableCopies: 14,
    shelfLocation: "Stack CS-08, Row C",
    rating: 4.7,
    borrowCount: 289,
    coverColor: "from-indigo-600 to-violet-800",
    coverTag: "NETWORKING",
    description: "Appropriate for Computer Networking or Introduction to Networking courses at both the undergraduate and graduate levels in Computer Science, Electrical Engineering, and CIS. Explores OSI, TCP/IP, wireless protocols, and cloud communications.",
    borrowers: [
      { studentId: "STU-2024-004", name: "Ananya Joshi", issueDate: "2026-09-28", dueDate: "2026-10-12" }
    ]
  },
  {
    id: "BK-1004",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    isbn: "978-1119800361",
    publisher: "John Wiley & Sons",
    publicationYear: 2021,
    edition: "10th Edition",
    category: "Computer Science",
    totalCopies: 30,
    availableCopies: 22,
    shelfLocation: "Stack CS-03, Row A",
    rating: 4.6,
    borrowCount: 310,
    coverColor: "from-amber-600 to-orange-800",
    coverTag: "OS SYSTEMS",
    description: "The tenth edition of Operating System Concepts has been revised to keep it fresh and up-to-date with contemporary examples of how operating systems function, virtualization, multicore architectures, and Linux kernel internals.",
    borrowers: [
      { studentId: "STU-2024-005", name: "Siddharth Sharma", issueDate: "2026-09-15", dueDate: "2026-09-29" }
    ]
  },
  {
    id: "BK-1005",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    isbn: "978-0134610993",
    publisher: "Pearson",
    publicationYear: 2022,
    edition: "4th Global Edition",
    category: "Artificial Intelligence",
    totalCopies: 18,
    availableCopies: 5,
    shelfLocation: "Stack AI-01, Row A",
    rating: 4.95,
    borrowCount: 520,
    coverColor: "from-purple-600 to-fuchsia-900",
    coverTag: "AI & ML",
    description: "The leading textbook on Artificial Intelligence. Used in over 1,500 universities in 135 countries. Broad coverage of search algorithms, probabilistic reasoning, deep learning, reinforcement learning, natural language processing, and ethics in AI.",
    borrowers: [
      { studentId: "STU-2024-001", name: "Aarav Shah", issueDate: "2026-09-20", dueDate: "2026-10-04" },
      { studentId: "STU-2024-006", name: "Tanvi Deshmukh", issueDate: "2026-09-27", dueDate: "2026-10-11" }
    ]
  },
  {
    id: "BK-1006",
    title: "Data Structures and Algorithms in Java",
    author: "Robert Lafore",
    isbn: "978-0672324536",
    publisher: "Sams Publishing",
    publicationYear: 2018,
    edition: "2nd Edition",
    category: "Computer Science",
    totalCopies: 22,
    availableCopies: 16,
    shelfLocation: "Stack CS-05, Row D",
    rating: 4.65,
    borrowCount: 275,
    coverColor: "from-cyan-600 to-blue-800",
    coverTag: "DSA & LOGIC",
    description: "Clear explanations accompanied by step-by-step visual figures that illustrate concepts in binary trees, balanced trees, graph theory, sorting algorithms, and hash tables with clean Java implementation.",
    borrowers: []
  },
  {
    id: "BK-1007",
    title: "Java: The Complete Reference",
    author: "Herbert Schildt",
    isbn: "978-1260463415",
    publisher: "Oracle Press / McGraw-Hill",
    publicationYear: 2021,
    edition: "12th Edition",
    category: "Programming",
    totalCopies: 28,
    availableCopies: 20,
    shelfLocation: "Stack PR-02, Row B",
    rating: 4.75,
    borrowCount: 390,
    coverColor: "from-rose-600 to-red-800",
    coverTag: "JAVA LANG",
    description: "Fully updated for Java SE 17, explains how to develop, compile, debug, and run Java programs. Covers core syntax, keywords, object-oriented principles, Java Collections, concurrency utilities, and modern lambdas.",
    borrowers: [
      { studentId: "STU-2024-003", name: "Kabir Patel", issueDate: "2026-09-12", dueDate: "2026-09-26" }
    ]
  },
  {
    id: "BK-1008",
    title: "Introduction to Algorithms (CLRS)",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    isbn: "978-0262046305",
    publisher: "MIT Press",
    publicationYear: 2022,
    edition: "4th Edition",
    category: "Computer Science",
    totalCopies: 16,
    availableCopies: 7,
    shelfLocation: "Stack CS-01, Row A",
    rating: 4.9,
    borrowCount: 480,
    coverColor: "from-slate-700 to-slate-900",
    coverTag: "ALGORITHMS",
    description: "The definitive reference and university textbook for algorithmic design, dynamic programming, greedy algorithms, amortized analysis, and graph theory.",
    borrowers: []
  },
  {
    id: "BK-1009",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    isbn: "978-0201633610",
    publisher: "Addison-Wesley",
    publicationYear: 2017,
    edition: "Classic Edition",
    category: "Software Engineering",
    totalCopies: 12,
    availableCopies: 8,
    shelfLocation: "Stack SE-01, Row C",
    rating: 4.85,
    borrowCount: 260,
    coverColor: "from-teal-600 to-slate-800",
    coverTag: "PATTERNS",
    description: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.",
    borrowers: []
  }
];

export const INITIAL_STUDENTS = [
  {
    id: "STU-2024-001",
    rollNumber: "24CS014",
    name: "Aarav Shah",
    department: "Computer Science & Engg",
    semester: "Semester 5",
    email: "aarav.shah@university.edu",
    phone: "+91 98201 44521",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    booksIssuedCount: 2,
    dueBooksCount: 1,
    status: "Active",
    membershipDate: "2024-08-15",
    maxLimit: 4,
    fineDue: 10,
    currentLoans: [
      {
        bookId: "BK-1001",
        bookTitle: "Database System Concepts",
        issueDate: "2026-09-22",
        dueDate: "2026-10-06",
        isOverdue: false,
        daysLeft: 0
      },
      {
        bookId: "BK-1005",
        bookTitle: "Artificial Intelligence: A Modern Approach",
        issueDate: "2026-09-20",
        dueDate: "2026-10-04",
        isOverdue: true,
        daysOverdue: 2
      }
    ],
    history: [
      { bookTitle: "Introduction to Algorithms (CLRS)", returnDate: "2026-08-14", status: "Returned on time" },
      { bookTitle: "Computer Networks", returnDate: "2026-07-29", status: "Returned on time" }
    ]
  },
  {
    id: "STU-2024-002",
    rollNumber: "24IT028",
    name: "Riya Mehta",
    department: "Information Technology",
    semester: "Semester 5",
    email: "riya.mehta@university.edu",
    phone: "+91 98450 12894",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    booksIssuedCount: 1,
    dueBooksCount: 0,
    status: "Active",
    membershipDate: "2024-08-20",
    maxLimit: 4,
    fineDue: 0,
    currentLoans: [
      {
        bookId: "BK-1002",
        bookTitle: "Clean Code: A Handbook of Agile Software Craftsmanship",
        issueDate: "2026-09-25",
        dueDate: "2026-10-09",
        isOverdue: false,
        daysLeft: 3
      }
    ],
    history: [
      { bookTitle: "Operating System Concepts", returnDate: "2026-09-18", status: "Returned on time" },
      { bookTitle: "Design Patterns", returnDate: "2026-08-05", status: "Returned on time" }
    ]
  },
  {
    id: "STU-2024-003",
    rollNumber: "24CS089",
    name: "Kabir Patel",
    department: "Computer Science & Engg",
    semester: "Semester 7",
    email: "kabir.patel@university.edu",
    phone: "+91 97123 90812",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    booksIssuedCount: 2,
    dueBooksCount: 2,
    status: "Restricted",
    membershipDate: "2023-08-10",
    maxLimit: 4,
    fineDue: 70,
    currentLoans: [
      {
        bookId: "BK-1001",
        bookTitle: "Database System Concepts",
        issueDate: "2026-09-18",
        dueDate: "2026-10-02",
        isOverdue: true,
        daysOverdue: 4
      },
      {
        bookId: "BK-1007",
        bookTitle: "Java: The Complete Reference",
        issueDate: "2026-09-12",
        dueDate: "2026-09-26",
        isOverdue: true,
        daysOverdue: 10
      }
    ],
    history: [
      { bookTitle: "Clean Code", returnDate: "2026-06-12", status: "Returned on time" }
    ]
  },
  {
    id: "STU-2024-004",
    rollNumber: "24AI007",
    name: "Ananya Joshi",
    department: "AI & Data Science",
    semester: "Semester 3",
    email: "ananya.joshi@university.edu",
    phone: "+91 99012 34567",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    booksIssuedCount: 1,
    dueBooksCount: 0,
    status: "Active",
    membershipDate: "2025-08-01",
    maxLimit: 4,
    fineDue: 0,
    currentLoans: [
      {
        bookId: "BK-1003",
        bookTitle: "Computer Networks",
        issueDate: "2026-09-28",
        dueDate: "2026-10-12",
        isOverdue: false,
        daysLeft: 6
      }
    ],
    history: [
      { bookTitle: "Artificial Intelligence: A Modern Approach", returnDate: "2026-09-10", status: "Returned on time" }
    ]
  },
  {
    id: "STU-2024-005",
    rollNumber: "24EC045",
    name: "Siddharth Sharma",
    department: "Electronics & Communication",
    semester: "Semester 5",
    email: "siddharth.s@university.edu",
    phone: "+91 98112 55678",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    booksIssuedCount: 1,
    dueBooksCount: 1,
    status: "Active",
    membershipDate: "2024-08-11",
    maxLimit: 4,
    fineDue: 35,
    currentLoans: [
      {
        bookId: "BK-1004",
        bookTitle: "Operating System Concepts",
        issueDate: "2026-09-15",
        dueDate: "2026-09-29",
        isOverdue: true,
        daysOverdue: 7
      }
    ],
    history: []
  },
  {
    id: "STU-2024-006",
    rollNumber: "24CS112",
    name: "Tanvi Deshmukh",
    department: "Computer Science & Engg",
    semester: "Semester 5",
    email: "tanvi.d@university.edu",
    phone: "+91 97654 32109",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    booksIssuedCount: 1,
    dueBooksCount: 0,
    status: "Active",
    membershipDate: "2024-08-14",
    maxLimit: 4,
    fineDue: 0,
    currentLoans: [
      {
        bookId: "BK-1005",
        bookTitle: "Artificial Intelligence: A Modern Approach",
        issueDate: "2026-09-27",
        dueDate: "2026-10-11",
        isOverdue: false,
        daysLeft: 5
      }
    ],
    history: [
      { bookTitle: "Data Structures and Algorithms in Java", returnDate: "2026-09-20", status: "Returned on time" }
    ]
  }
];

export const INITIAL_ISSUED_TRANSACTIONS = [
  {
    id: "TX-901",
    studentId: "STU-2024-001",
    studentName: "Aarav Shah",
    studentDept: "Computer Science",
    bookId: "BK-1001",
    bookTitle: "Database System Concepts",
    issueDate: "2026-09-22",
    dueDate: "2026-10-06",
    status: "Due Today",
    statusType: "warning"
  },
  {
    id: "TX-902",
    studentId: "STU-2024-002",
    studentName: "Riya Mehta",
    studentDept: "Information Tech",
    bookId: "BK-1002",
    bookTitle: "Clean Code",
    issueDate: "2026-09-25",
    dueDate: "2026-10-09",
    status: "Active",
    statusType: "success"
  },
  {
    id: "TX-903",
    studentId: "STU-2024-003",
    studentName: "Kabir Patel",
    studentDept: "Computer Science",
    bookId: "BK-1007",
    bookTitle: "Java: The Complete Reference",
    issueDate: "2026-09-12",
    dueDate: "2026-09-26",
    status: "Overdue (10d)",
    statusType: "danger"
  },
  {
    id: "TX-904",
    studentId: "STU-2024-001",
    studentName: "Aarav Shah",
    studentDept: "Computer Science",
    bookId: "BK-1005",
    bookTitle: "Artificial Intelligence: A Modern Approach",
    issueDate: "2026-09-20",
    dueDate: "2026-10-04",
    status: "Overdue (2d)",
    statusType: "danger"
  },
  {
    id: "TX-905",
    studentId: "STU-2024-004",
    studentName: "Ananya Joshi",
    studentDept: "AI & Data Science",
    bookId: "BK-1003",
    bookTitle: "Computer Networks",
    issueDate: "2026-09-28",
    dueDate: "2026-10-12",
    status: "Active",
    statusType: "success"
  },
  {
    id: "TX-906",
    studentId: "STU-2024-005",
    studentName: "Siddharth Sharma",
    studentDept: "Electronics",
    bookId: "BK-1004",
    bookTitle: "Operating System Concepts",
    issueDate: "2026-09-15",
    dueDate: "2026-09-29",
    status: "Overdue (7d)",
    statusType: "danger"
  }
];

export const INITIAL_FINES = [
  {
    id: "FN-401",
    studentId: "STU-2024-003",
    studentName: "Kabir Patel",
    studentRoll: "24CS089",
    bookTitle: "Java: The Complete Reference",
    dueDate: "2026-09-26",
    returnDate: "Pending Return",
    daysOverdue: 10,
    amount: 50.00,
    status: "Overdue",
    reason: "Exceeded standard 14-day borrowing threshold"
  },
  {
    id: "FN-402",
    studentId: "STU-2024-003",
    studentName: "Kabir Patel",
    studentRoll: "24CS089",
    bookTitle: "Database System Concepts",
    dueDate: "2026-10-02",
    returnDate: "Pending Return",
    daysOverdue: 4,
    amount: 20.00,
    status: "Overdue",
    reason: "Overdue loan"
  },
  {
    id: "FN-403",
    studentId: "STU-2024-005",
    studentName: "Siddharth Sharma",
    studentRoll: "24EC045",
    bookTitle: "Operating System Concepts",
    dueDate: "2026-09-29",
    returnDate: "Pending Return",
    daysOverdue: 7,
    amount: 35.00,
    status: "Overdue",
    reason: "Semester reserve late fee"
  },
  {
    id: "FN-404",
    studentId: "STU-2024-001",
    studentName: "Aarav Shah",
    studentRoll: "24CS014",
    bookTitle: "Artificial Intelligence: A Modern Approach",
    dueDate: "2026-10-04",
    returnDate: "Pending Return",
    daysOverdue: 2,
    amount: 10.00,
    status: "Pending",
    reason: "Late fee accrued"
  },
  {
    id: "FN-405",
    studentId: "STU-2024-002",
    studentName: "Riya Mehta",
    studentRoll: "24IT028",
    bookTitle: "Cloud Architecture Principles",
    dueDate: "2026-09-14",
    returnDate: "2026-09-17",
    daysOverdue: 3,
    amount: 15.00,
    status: "Paid",
    reason: "Settled via UPI on return"
  },
  {
    id: "FN-406",
    studentId: "STU-2024-006",
    studentName: "Tanvi Deshmukh",
    studentRoll: "24CS112",
    bookTitle: "Modern Compiler Implementation",
    dueDate: "2026-09-02",
    returnDate: "2026-09-04",
    daysOverdue: 2,
    amount: 10.00,
    status: "Paid",
    reason: "Settled at Library Helpdesk"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-1",
    type: "warning",
    category: "DueDate",
    title: "Database System Concepts is due tomorrow",
    message: "Aarav Shah (24CS014) is scheduled to return the copy by Oct 06, 2026, 5:00 PM.",
    time: "15 minutes ago",
    read: false,
    actionLabel: "View Loan",
    targetPage: "issue-return"
  },
  {
    id: "NOTIF-2",
    type: "urgent",
    category: "Overdue",
    title: "3 books are severely overdue",
    message: "Kabir Patel (10 days overdue) and Siddharth Sharma (7 days overdue) have pending returns exceeding maximum tolerance.",
    time: "1 hour ago",
    read: false,
    actionLabel: "Open Fines",
    targetPage: "fines"
  },
  {
    id: "NOTIF-3",
    type: "info",
    category: "Member",
    title: "New student registration completed",
    message: "Ananya Joshi (24AI007) has been activated with 4-book checkout privileges.",
    time: "3 hours ago",
    read: true,
    actionLabel: "View Member",
    targetPage: "students"
  },
  {
    id: "NOTIF-4",
    type: "success",
    category: "Return",
    title: "Book successfully returned",
    message: "'Operating System Concepts' was safely inspected and returned to Stack CS-03 by Riya Mehta.",
    time: "Yesterday, 4:30 PM",
    read: true,
    actionLabel: "Catalogue",
    targetPage: "books"
  },
  {
    id: "NOTIF-5",
    type: "info",
    category: "Audit",
    title: "Upcoming Semester Library Audit",
    message: "Central automated book count and stack verification will initiate this Saturday.",
    time: "2 days ago",
    read: true,
    actionLabel: "View Reports",
    targetPage: "reports"
  }
];

export const POPULAR_BOOKS_DATA = [
  {
    id: "BK-1005",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    category: "Artificial Intelligence",
    borrowCount: 520,
    coverColor: "from-purple-600 to-indigo-900",
    coverTag: "AI & ML",
    rating: 4.95
  },
  {
    id: "BK-1008",
    title: "Introduction to Algorithms (CLRS)",
    author: "Thomas H. Cormen et al.",
    category: "Computer Science",
    borrowCount: 480,
    coverColor: "from-slate-700 to-slate-900",
    coverTag: "ALGORITHMS",
    rating: 4.9
  },
  {
    id: "BK-1002",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    borrowCount: 418,
    coverColor: "from-emerald-600 to-teal-800",
    coverTag: "AGILE DEV",
    rating: 4.9
  },
  {
    id: "BK-1007",
    title: "Java: The Complete Reference",
    author: "Herbert Schildt",
    category: "Programming",
    borrowCount: 390,
    coverColor: "from-rose-600 to-red-800",
    coverTag: "JAVA LANG",
    rating: 4.75
  },
  {
    id: "BK-1001",
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth",
    category: "Computer Science",
    borrowCount: 342,
    coverColor: "from-blue-600 to-indigo-800",
    coverTag: "DATABASE",
    rating: 4.8
  }
];

export const ACTIVITY_CHART_DATA = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  borrowed: [42, 68, 85, 74, 92, 45, 18],
  returned: [38, 54, 72, 60, 88, 52, 22]
};

export const MONTHLY_TREND_DATA = {
  labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  borrowed: [1120, 1340, 1890, 2450, 2890, 2340],
  returned: [980, 1210, 1720, 2280, 2710, 2190]
};

export const CATEGORY_BREAKDOWN_DATA = {
  labels: ["Computer Science", "Artificial Intelligence", "Software Engineering", "Programming", "Electronics", "Mathematics"],
  counts: [4850, 2600, 1920, 1480, 920, 710]
};

export const ACTIVE_STUDENTS_LEADERBOARD = [
  { name: "Aarav Shah", department: "Computer Science", booksRead: 24, badge: "Gold Scholar", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" },
  { name: "Riya Mehta", department: "Information Tech", booksRead: 21, badge: "Silver Reader", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
  { name: "Ananya Joshi", department: "AI & Data Science", booksRead: 19, badge: "Bronze Scholar", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" },
  { name: "Tanvi Deshmukh", department: "Computer Science", booksRead: 17, badge: "Active Reader", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { name: "Siddharth Sharma", department: "Electronics", booksRead: 14, badge: "Active Reader", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" }
];
