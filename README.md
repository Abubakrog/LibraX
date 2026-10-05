# 📚 LibraX — Enterprise University Library Management System

**LibraX** is a minimalist, modern frontend UI/UX engineered for college and university library management. Crafted with **React 19**, **Vite**, **Tailwind CSS v4**, **Lucide Icons**, and **Chart.js**, it adheres to **Linear / Stripe / Vercel-level SaaS design principles** — clean hierarchy, intelligent whitespace, subtle 1px borders, quiet transitions, and unified typography.

---

## 💎 Design Direction & Standards

- **Aesthetic:** Minimalist enterprise SaaS — subtle neutral surfaces, crisp 1px borders (`border-slate-200/80`), quiet hover states, and unified typography.
- **Color System:** Neutral slate (`#0F172A`, `#334155`, `#64748B`, `#F8FAFC`) with subtle, purposeful accents. No loud or childish gradients.
- **Typography:** **Inter** font with tight letter tracking (`tracking-tight`) and tabular numbers (`tabular-nums`) for currency, roll numbers, and dates.
- **Currency Standard:** Fully standardized to **Indian Rupees (₹ / INR)** across all dashboards, fines, overdue fees, circulation rules, and reports.
- **Component Geometry:** Refined `rounded-lg` and `rounded-xl` card geometry with subtle border delineation instead of exaggerated border radii or heavy drop-shadows.

---

## 🌟 Modules & Features

### 1. 📊 Executive Dashboard
- **Page Header:** Minimalist title and date context with direct quick action links.
- **4 Key Stat Cards:** Total Books (12,480), Available Books (9,860), Issued Books (2,340), Registered Students (1,850).
- **Circulation Activity Chart:** Monochromatic, clean weekly line graph comparing daily checkouts vs returns using **Chart.js**.
- **Overdue Notices:** Clean list item with borrower name, overdue days, and direct **"Remind"** trigger.
- **Recently Issued Books Table:** Tabular circulation records with department, due date, and status badges.
- **Popular Titles:** Curated list of high-demand textbooks with realistic cover bindings and checkout counters.

---

### 2. 📖 Book Catalogue
- **Grid & Table View Toggle:** Switch between publisher card grids and dense tabular scanning.
- **Realistic Book Covers:** Minimalist book spine texture, category tag, title hierarchy, author, and edition tag.
- **Filtering & Sorting:** Filter by department category (CS, SE, AI, Programming, etc.), availability status (In Stock, Low Stock ≤3, Issued Out), and sort by popularity, title, author, or year.
- **+ Add New Book Modal:** Clean dialog with title, author, ISBN, publisher, edition, shelf location, and copy counts.
- **Book Details Modal:** Book overview, synopsis, shelf location, total vs available copies, list of current borrowers, and direct **"Issue Book"** action.

---

### 3. 🎓 Students & Members Directory
- **Member Directory Table:** Roll number (e.g. `24CS014`), name, avatar, department, current loan count (with minimal progress meter), due status, and status badge (`Active`, `Restricted`, `Suspended`).
- **Department & Status Filters:** Filter by CS, IT, AI & Data Science, Electronics, etc.
- **+ Add Student Modal:** Registration modal with roll number, semester, department, email, and phone.
- **Student Profile Modal:** Member card with avatar, contact info, active loan quota, **Current Issued Books** tab with countdowns, and **Borrowing History** tab.

---

### 4. 🔄 Circulation Desk (Issue & Return)
- **Tab 1: Issue Book (Checkout):**
  - Searchable student picker with live quota validation (max 4 books).
  - Searchable book picker with stock validation.
  - Duration presets: **14 Days**, **28 Days**, **Semester (90 Days)**, with automated due date calculation.
  - Transaction summary review card showing book preview, student info, due date, and late penalty rate (**₹10/day**).
- **Tab 2: Return Book (Check-in):**
  - Active loan selector.
  - Auto-calculated overdue days and fine (**₹10/day**).
  - Physical condition assessment (**Good**, **Fair**, **Damaged (+₹150)**).
  - One-click **"Confirm Return & Shelve Book"** with instant stock increment and quota restoration.

---

### 5. 💰 Fines & Dues Management
- **Statistics Overview (in ₹ INR):**
  - Total Outstanding: **₹1,240**
  - Collected This Month: **₹3,850**
  - Overdue Members: **42**
  - Average Fine: **₹25** (Standard rate: ₹10/day)
- **Dues Ledger Table:** Ref ID, Student, Book, Due Date, Return Date, Days Overdue, Fine Amount in ₹, Badges (**Paid, Pending, Overdue**).
- **Collect Payment Modal:** Supports UPI, Cash, Card, with instant payment confirmation and receipt generation.
- **Waive Fine Modal:** Official waiver dialog with Dean medical/travel exemption options.

---

### 6. 📈 Reports & Circulation Analytics
- **Date Filters:** **Last 7 Days**, **Last 30 Days**, **This Semester**, **Custom Range**.
- **Visualizations:**
  - **Circulation Trajectory:** Monthly books borrowed vs returned trends.
  - **Category Distribution:** Doughnut chart breaking down repository titles.
  - **Fine Recovery Inflow:** Bar chart of monthly recovery in **INR (₹)**.
- **Active Scholars Leaderboard:** Top readers ranked with honors badges (*Gold Scholar*, *Silver Reader*).
- **Export Actions:** One-click **PDF** and **CSV** export triggers.

---

### 7. 🔔 Notification Center
- Feed with category badges for **Urgent**, **Warning**, **Success**, and **Info**.
- Realistic library alerts:
  - *“Database System Concepts is due tomorrow.”*
  - *“3 books are overdue.”*
  - *“New student registration completed.”*
  - *“Book successfully returned.”*
- Action buttons (**"View Loan"**, **"Open Fines"**, **"View Member"**) and **"Mark All Read"** trigger.

---

### 8. ⚙️ Settings & Configuration
- **Admin Profile:** Name, designation, department, and email.
- **Library Policy:** Institution name, opening hours, loan duration limits, max books allowed, daily fine rate (**₹10/day**).
- **Alert Rules:** Email due alerts, SMS overdue notices, low-stock warnings.
- **Appearance:** **Light / Dark Mode** toggle with persistent CSS styling.
- **Security:** 2FA status, session timeouts, and password management.

---

### 9. 🔐 Login Screen
- **Minimalist Split-Screen Layout:**
  - **Left**: Deep slate obsidian background, subtle grid texture, clean typography, uptime metric, and statistics.
  - **Right**: Clean authentication card with email, password show/hide, remember me, and sign-in button.
  - **1-Click Demo Login**: Pre-fills Chief Librarian credentials for instant college viva / project presentation.

---

### 10. ⚡ Spotlight Command Palette (`Ctrl+K` / `⌘K`)
- Quick-search modal searching across books, authors, students, roll numbers, and navigation shortcuts with keyboard navigation support.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```
