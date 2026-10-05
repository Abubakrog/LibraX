import React from "react";
import { LibraryProvider, useLibrary } from "./context/LibraryContext";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import MobileNav from "./components/layout/MobileNav";
import ToastContainer from "./components/common/ToastContainer";
import GlobalSearchModal from "./components/common/GlobalSearchModal";

// Pages
import DashboardPage from "./pages/DashboardPage";
import BookCataloguePage from "./pages/BookCataloguePage";
import StudentsPage from "./pages/StudentsPage";
import IssueReturnPage from "./pages/IssueReturnPage";
import FinesPage from "./pages/FinesPage";
import ReportsPage from "./pages/ReportsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";

function MainContent() {
  const { activePage, isAuthenticated } = useLibrary();

  // If not authenticated or on login screen, render Login Page
  if (!isAuthenticated || activePage === "login") {
    return <LoginPage />;
  }

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "books":
        return <BookCataloguePage />;
      case "students":
        return <StudentsPage />;
      case "issue-return":
        return <IssueReturnPage />;
      case "fines":
        return <FinesPage />;
      case "reports":
        return <ReportsPage />;
      case "notifications":
        return <NotificationsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Persistent Left Sidebar on Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Mobile Drawer & Bottom Quick Bar */}
      <MobileNav />

      {/* Global Command / Search Palette (Ctrl+K) */}
      <GlobalSearchModal />

      {/* Floating Toast Notification Alerts */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <LibraryProvider>
      <MainContent />
    </LibraryProvider>
  );
}
