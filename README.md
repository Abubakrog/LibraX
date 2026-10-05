# 📚 LibraX — Modern University Library Management System

**LibraX** is a modern, responsive, high-performance frontend UI/UX engineered for college and university library management. Built with **React 19**, **Vite**, **Tailwind CSS v4**, **Lucide Icons**, and **Chart.js**, it delivers an intuitive, university-grade SaaS dashboard aesthetic for academic project demonstrations and presentations.

---

## 🌟 Highlights & Key Features

### 1. 📊 Executive Dashboard
- **Welcome Greeting**: *"Good Morning, Admin 👋 — Here’s what’s happening in your library today."*
- **4 Key Stat Cards**:
  - **Total Books**: 12,480 (+4.2% this month)
  - **Available Books**: 9,860 (79% in library)
  - **Issued Books**: 2,340 (18.7% active loans)
  - **Registered Students**: 1,850 (+120 new enrollments)
- **Library Activity Chart**: Interactive weekly line curve tracking daily checkouts vs returns using **Chart.js**.
- **Overdue Books Panel**: Real-time alerts with student contact info, days overdue, and a **"Remind"** trigger.
- **Recently Issued Books Table**: Live tracking with student department, due date, and status badges.
- **Popular Books Widget**: High-demand textbook ranking with realistic book covers and borrow counts.

---

### 2. 📖 Book Catalogue
- **Rich Grid & Table Views**: Seamless view mode toggle for card inspection or dense tabular scanning.
- **Realistic Book Covers**: Custom styling with embossed foil titles, category tags, author names, and spine aesthetics.
- **Advanced Filtering & Sorting**: Filter by Category (Computer Science, Software Engineering, AI, Programming, etc.), Availability (In Stock, Low Stock ≤3, Issued Out), and Sort by Popularity, Title, Author, or Year.
- **+ Add New Book Modal**: Complete registration form with title, author, ISBN, publisher, edition, shelf location, and copy counts.
- **Book Details Modal**: High-res cover preview, synopsis, shelf location, total vs available copies, list of current borrowers, and direct **"Issue Book"** action.

---

### 3. 🎓 Students & Members Directory
- **Registered Scholar Table**: Student ID / Roll number (e.g. `24CS014`), name, avatar, department, current book count (with visual quota meter), due status, and status badge (`Active`, `Restricted`, `Suspended`).
- **Department & Status Filters**: Filter by CS, IT, AI & Data Science, Electronics, and membership state.
- **+ Add Student Modal**: Enroll new students with roll number, department, semester, email, and phone.
- **Student Profile Modal**:
  - Member info card with avatar, contact details, and active loan quota.
  - **Current Issued Books** tab with countdown of days left or overdue warnings.
  - **Borrowing History** tab with past returned books.

---

### 4. 🔄 Issue & Return (Circulation Desk)
- **Tab 1: Issue Book (Checkout)**:
  - Searchable student picker with live quota validation (max 4 books).
  - Searchable book picker with stock validation (prevents checkout of 0-stock items).
  - Duration presets: **14 Days**, **28 Days**, **Semester (90 Days)**, with automated due date calculation.
  - Summary review card with desk notes.
  - **Confirm & Issue Book** button updating state, transaction ledger, and inventory in real-time with instant toast notifications.
- **Tab 2: Return Book (Check-in)**:
  - Active loan selector.
  - Auto-calculated overdue days and fine (\$5/day).
  - Physical condition assessment (**Good**, **Fair**, **Damaged** with added repair surcharge).
  - One-click **"Confirm Return & Shelve Book"** with instant stock increment and quota restoration.

---

### 5. 💰 Fines & Dues Management
- **Statistics Overview**:
  - Total Outstanding: **\$1,240**
  - Collected This Month: **\$3,850**
  - Overdue Members: **42**
  - Average Fine: **\$12.50**
- **Dues Ledger Table**: Ref ID, Student, Book, Due Date, Return Date, Days Overdue, Fine Amount, Badges (**Paid, Pending, Overdue**).
- **Collect Payment Modal**: Supports UPI, Cash, Card, and instant digital receipt generation.
- **Waive Fine Modal**: Authorized librarian waiver with Dean medical/travel exemption reasons.

---

### 6. 📈 Reports & Analytics
- **Date Filters**: **Last 7 Days**, **Last 30 Days**, **This Semester**, **Custom Range**.
- **Interactive Visualizations**:
  - **Circulation Trajectory**: Monthly books borrowed vs returned trends.
  - **Popular Categories**: Doughnut chart showing distribution across CS, AI, SE, Programming, etc.
  - **Fine Collection Inflow**: Bar chart of monthly recovery.
- **Most Active Scholars Leaderboard**: Ranked top readers with honor badges (*Gold Scholar*, *Silver Reader*, etc.).
- **Export Actions**: One-click **PDF** and **CSV** export simulations with toast confirmations.

---

### 7. 🔔 Notification Center
- Categorized alerts with indicators for **Urgent**, **Warning**, **Success**, and **Info**.
- Realistic library alerts:
  - *“Database System Concepts is due tomorrow.”*
  - *“3 books are severely overdue.”*
  - *“New student registration completed.”*
  - *“Book successfully returned.”*
- Action buttons (**"View Loan"**, **"Open Fines"**, **"View Member"**).
- **"Mark All Read"** trigger.

---

### 8. ⚙️ Settings & Configuration
- **Admin Profile**: Edit name, designation, department, and email.
- **Library Information**: Institution name (*Apex Institute of Technology*), opening hours, loan duration limits, max books allowed, daily fine rate.
- **Notifications**: Email due alerts, SMS overdue notices, low-stock warnings.
- **Appearance**: **Light / Dark Mode** toggle with persistent CSS styling.
- **Security**: Two-Factor Authentication (2FA) status, session timeouts, and password change.

---

### 9. 🔐 Login Screen
- **Split-Screen Layout**:
  - **Left**: Deep navy/indigo university branding, inspiring quote, uptime metric, and statistics.
  - **Right**: Modern authentication form with email, password show/hide, remember me, and sign-in button.
  - **One-Click Quick Demo Login**: Specially built for **college viva / project presentations** to instantly log in as Chief Librarian with preloaded mock credentials!
- Clean sign-out flow from the sidebar and top navbar.

---

### 10. ⚡ UX Micro-Interactions & Accessibility
- **Global Search Palette (`Ctrl+K` / `⌘K`)**: Spotlight command palette searching across books, students, and page routes.
- **Toast Notifications**: Interactive animated alert toasts for every user action.
- **Responsive Navigation**: Persistent collapsible sidebar for desktop + slide-over drawer and mobile thumb navigation bar for phones/tablets.
- **Design System**: Navy/Indigo primary palette (`#0F172A`, `#1E293B`, `#4F46E5`, `#6366F1`), subtle borders, soft shadows, rounded corners, and **Plus Jakarta Sans / Inter** typography.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/` to view the live dashboard.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview the Production Build
```bash
npm run preview
```
