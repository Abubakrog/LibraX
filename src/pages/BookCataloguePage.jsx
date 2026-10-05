import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import BookCover from "../components/common/BookCover";
import Badge from "../components/common/Badge";
import Modal from "../components/common/Modal";
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  BookOpen,
  ArrowRight
} from "lucide-react";

export default function BookCataloguePage() {
  const {
    books,
    addNewBook,
    selectedBookForDetails,
    setSelectedBookForDetails,
    setPreselectedIssueData,
    setActivePage,
    addToast
  } = useLibrary();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBookForm, setNewBookForm] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    publicationYear: 2024,
    edition: "1st Edition",
    category: "Computer Science",
    totalCopies: 10,
    shelfLocation: "Stack CS-09, Row A",
    description: "",
    coverColor: "from-slate-800 to-slate-900"
  });

  const categories = ["All", ...new Set(books.map((b) => b.category))];

  const filteredBooks = books
    .filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.isbn.includes(searchQuery);

      const matchesCategory =
        selectedCategory === "All" || b.category === selectedCategory;

      const matchesAvailability =
        selectedAvailability === "All" ||
        (selectedAvailability === "Available" && b.availableCopies > 0) ||
        (selectedAvailability === "Low Stock" && b.availableCopies > 0 && b.availableCopies <= 3) ||
        (selectedAvailability === "Out of Stock" && b.availableCopies === 0);

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.borrowCount - a.borrowCount;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "author") return a.author.localeCompare(b.author);
      if (sortBy === "year") return b.publicationYear - a.publicationYear;
      return 0;
    });

  const handleCreateBookSubmit = (e) => {
    e.preventDefault();
    if (!newBookForm.title || !newBookForm.author || !newBookForm.isbn) {
      addToast("warning", "Missing Fields", "Title, Author, and ISBN are required.");
      return;
    }

    addNewBook(newBookForm);
    setIsAddModalOpen(false);
    setNewBookForm({
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      publicationYear: 2024,
      edition: "1st Edition",
      category: "Computer Science",
      totalCopies: 10,
      shelfLocation: "Stack CS-09, Row A",
      description: "",
      coverColor: "from-slate-800 to-slate-900"
    });
  };

  const handleIssueThisBook = (book) => {
    setPreselectedIssueData({ bookId: book.id, bookTitle: book.title });
    setSelectedBookForDetails(null);
    setActivePage("issue-return");
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Book Catalogue
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Search, filter, and inspect {books.length} textbook repository titles.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-slate-400"
            />
          </div>

          {/* Filters and View Mode */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="Available">In Stock</option>
              <option value="Low Stock">Low Stock (≤ 3)</option>
              <option value="Out of Stock">Issued Out</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              <option value="popular">Most Popular</option>
              <option value="title">Title (A-Z)</option>
              <option value="author">Author (A-Z)</option>
              <option value="year">Newest Year</option>
            </select>

            {/* Toggle */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1 rounded-md transition-colors ${
                  viewMode === "table"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Table"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Category Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium"
                  : "bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            No matching books found
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedAvailability("All");
            }}
            className="mt-3 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === "grid" && filteredBooks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBooks.map((book) => {
            const isOutOfStock = book.availableCopies === 0;
            const isLowStock = book.availableCopies > 0 && book.availableCopies <= 3;

            return (
              <div
                key={book.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-3.5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-3 items-start">
                    <div
                      onClick={() => setSelectedBookForDetails(book)}
                      className="cursor-pointer shrink-0"
                    >
                      <BookCover
                        title={book.title}
                        author={book.author}
                        category={book.category}
                        color={book.coverColor}
                        tag={book.coverTag}
                        size="md"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                          {book.category}
                        </span>
                        <Badge
                          variant={
                            isOutOfStock
                              ? "out_of_stock"
                              : isLowStock
                              ? "low_stock"
                              : "available"
                          }
                          size="sm"
                        >
                          {isOutOfStock ? "Out" : `${book.availableCopies} Left`}
                        </Badge>
                      </div>

                      <h3
                        onClick={() => setSelectedBookForDetails(book)}
                        className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                      >
                        {book.title}
                      </h3>

                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {book.author}
                      </p>

                      <p className="text-[10px] font-mono text-slate-400 pt-1">
                        ISBN: {book.isbn}
                      </p>
                    </div>
                  </div>

                  <p className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-normal">
                    {book.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Copies</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                      {book.availableCopies} of {book.totalCopies} available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    <button
                      onClick={() => setSelectedBookForDetails(book)}
                      className="py-1.5 px-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 text-center transition-colors"
                    >
                      Details
                    </button>
                    <button
                      disabled={isOutOfStock}
                      onClick={() => handleIssueThisBook(book)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-colors ${
                        isOutOfStock
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      Issue
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && filteredBooks.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/75 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Book</th>
                  <th className="py-2.5 px-4 font-medium">Category</th>
                  <th className="py-2.5 px-4 font-medium">ISBN</th>
                  <th className="py-2.5 px-4 font-medium">Shelf</th>
                  <th className="py-2.5 px-4 font-medium">Availability</th>
                  <th className="py-2.5 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <BookCover
                          title={book.title}
                          author={book.author}
                          category={book.category}
                          color={book.coverColor}
                          tag={book.coverTag}
                          size="xs"
                          className="shrink-0"
                        />
                        <div className="min-w-0">
                          <p
                            onClick={() => setSelectedBookForDetails(book)}
                            className="font-medium text-slate-900 dark:text-white hover:text-indigo-600 cursor-pointer truncate"
                          >
                            {book.title}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 dark:text-slate-300">
                      {book.category}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-slate-400">
                      {book.isbn}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400 text-[11px]">
                      {book.shelfLocation}
                    </td>
                    <td className="py-2.5 px-4">
                      <Badge
                        variant={
                          book.availableCopies === 0
                            ? "out_of_stock"
                            : book.availableCopies <= 3
                            ? "low_stock"
                            : "available"
                        }
                        size="sm"
                      >
                        {book.availableCopies} of {book.totalCopies} available
                      </Badge>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedBookForDetails(book)}
                          className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs"
                        >
                          Details
                        </button>
                        <button
                          disabled={book.availableCopies === 0}
                          onClick={() => handleIssueThisBook(book)}
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
      )}

      {/* BOOK DETAILS MODAL */}
      {selectedBookForDetails && (
        <Modal
          isOpen={!!selectedBookForDetails}
          onClose={() => setSelectedBookForDetails(null)}
          title="Book Details"
          subtitle={`Catalog ID: ${selectedBookForDetails.id}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <BookCover
                title={selectedBookForDetails.title}
                author={selectedBookForDetails.author}
                category={selectedBookForDetails.category}
                color={selectedBookForDetails.coverColor}
                tag={selectedBookForDetails.coverTag}
                size="md"
                className="shrink-0"
              />

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {selectedBookForDetails.category}
                  </span>
                  <Badge
                    variant={
                      selectedBookForDetails.availableCopies > 0 ? "available" : "out_of_stock"
                    }
                    size="sm"
                  >
                    {selectedBookForDetails.availableCopies > 0 ? "In Stock" : "Checked Out"}
                  </Badge>
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">
                  {selectedBookForDetails.title}
                </h3>
                <p className="text-xs text-slate-500">
                  By {selectedBookForDetails.author}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-500">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      ISBN
                    </span>
                    <span className="font-mono text-[11px]">{selectedBookForDetails.isbn}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Publisher
                    </span>
                    <span className="truncate block">{selectedBookForDetails.publisher}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Year / Edition
                    </span>
                    <span>{selectedBookForDetails.publicationYear} • {selectedBookForDetails.edition}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Location / Shelf
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {selectedBookForDetails.shelfLocation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-medium text-slate-800 dark:text-slate-200 mb-0.5">
                Overview
              </p>
              <p>{selectedBookForDetails.description}</p>
            </div>

            {/* Active Borrowers */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h5 className="font-semibold text-xs text-slate-900 dark:text-white">
                  Current Borrowers ({selectedBookForDetails.borrowers?.length || 0})
                </h5>
                <span className="text-[11px] text-slate-400">
                  Total Copies: {selectedBookForDetails.totalCopies} ({selectedBookForDetails.availableCopies} available)
                </span>
              </div>

              {selectedBookForDetails.borrowers && selectedBookForDetails.borrowers.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedBookForDetails.borrowers.map((borrower, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {borrower.name}
                        </span>
                        <span className="text-slate-400 text-[11px] ml-1.5">
                          ID: {borrower.studentId}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Due: {borrower.dueDate}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-2">
                  All copies are currently shelved and available.
                </p>
              )}
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedBookForDetails(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                disabled={selectedBookForDetails.availableCopies === 0}
                onClick={() => handleIssueThisBook(selectedBookForDetails)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs disabled:opacity-40"
              >
                Issue This Book
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ADD NEW BOOK MODAL */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Book"
          subtitle="Register inventory title into repository"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleCreateBookSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Book Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Systems: Concepts and Design"
                  value={newBookForm.title}
                  onChange={(e) => setNewBookForm({ ...newBookForm, title: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Author(s) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. George Coulouris"
                  value={newBookForm.author}
                  onChange={(e) => setNewBookForm({ ...newBookForm, author: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ISBN Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 978-0132143011"
                  value={newBookForm.isbn}
                  onChange={(e) => setNewBookForm({ ...newBookForm, isbn: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-slate-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newBookForm.category}
                  onChange={(e) => setNewBookForm({ ...newBookForm, category: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Programming">Programming</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Total Copies
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newBookForm.totalCopies}
                  onChange={(e) => setNewBookForm({ ...newBookForm, totalCopies: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Publisher
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pearson Higher Ed"
                  value={newBookForm.publisher}
                  onChange={(e) => setNewBookForm({ ...newBookForm, publisher: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Shelf Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stack CS-09, Row A"
                  value={newBookForm.shelfLocation}
                  onChange={(e) => setNewBookForm({ ...newBookForm, shelfLocation: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows="2"
                  placeholder="Summary of chapters and course syllabus references..."
                  value={newBookForm.description}
                  onChange={(e) => setNewBookForm({ ...newBookForm, description: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
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
                Save Book
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
