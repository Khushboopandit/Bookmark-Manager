// This directive makes this module a client component so it can use React hooks and browser APIs
"use client";

import { createContext, useContext, useState } from "react";

// This context object stores bookmark data, loading state, error state, and search text
const BookmarkContext = createContext(null);

// This function provides bookmark state and actions to all children via context
export default function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [editingBookmark, setEditingBookmark] = useState(null);

    // This function updates the clicked tag
    function updateActiveTag(tag) {
        setActiveTag(tag);
    }

  // This function updates the search text that can be used to filter bookmarks in the UI
  function updateSearchText(newText) {
    setSearchText(newText);
  }

  // This function fetches bookmarks from the API and updates the bookmarks, loading, and error state
  async function fetchBookmarks() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/bookmarks");

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks.");
      }

      const data = await response.json();
      setBookmarks(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      setError(fetchError.message || "Something went wrong while loading bookmarks.");
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }

  // This function adds a new bookmark by sending it to the API and updating the bookmarks list
  async function addBookmark(newBookmark) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBookmark),
      });

      if (!response.ok) {
        throw new Error("Failed to add bookmark.");
      }

      const createdBookmark = await response.json();

      setBookmarks([...bookmarks,createdBookmark]);
    } catch (addError) {
      setError(addError.message || "Something went wrong while adding a bookmark.");
    } finally {
      setLoading(false);
    }
  }

  // This function deletes a bookmark by id using the API and removes it from the local list
  async function deleteBookmark(id) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete bookmark.");
      }

      setBookmarks(
        (previous) => previous?.filter((bookmark) => bookmark.id !== id) || []
      );

      setSuccessMessage("Bookmark deleted successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      return true;
    } catch (deleteError) {
      setError(
        deleteError.message || "Something went wrong while deleting a bookmark."
      );

      return false;
    } finally {
      setLoading(false);
    }
  }

  // This function updates a bookmark by id using the API and updates the local list
  async function updateBookmark(id, { title, url, tag }) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, url, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bookmark.");
      }

      const updatedBookmark = await response.json();

      setBookmarks((previous) =>
        previous?.map((item) => (item.id === id ? updatedBookmark : item)) ?? []
      );

      setSuccessMessage("Bookmark updated successfully.");
      setTimeout(() => setSuccessMessage(""), 2000);
      return true;
    } catch (updateError) {
      setError(
        updateError.message || "Something went wrong while updating the bookmark."
      );
      return false;
    } finally {
      setLoading(false);
    }
  }
  const value = {
    bookmarks,
    loading,
    error,
    successMessage,
    searchText,
    updateSearchText,
    fetchBookmarks,
    addBookmark,
    deleteBookmark,
    updateBookmark,
    updateActiveTag,
    activeTag,
    editingBookmark,
    setEditingBookmark,
  };

  return (
    <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
  );
}

// This function is a convenience hook to read and use the bookmark context inside components
export function useBookmarks() {
  const context = useContext(BookmarkContext);

  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider.");
  }

  return context;
}

