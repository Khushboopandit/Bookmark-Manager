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

      setBookmarks((previous) => {
        if (Array.isArray(previous)) {
          return [...previous, createdBookmark];
        }
        return [createdBookmark];
      });
    } catch (addError) {
      setError(addError.message || "Something went wrong while adding a bookmark.");
    } finally {
      setLoading(false);
    }
  }

  const value = {
    bookmarks,
    loading,
    error,
    searchText,
    updateSearchText,
    fetchBookmarks,
    addBookmark,
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

