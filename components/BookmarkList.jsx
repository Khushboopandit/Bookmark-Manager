"use client";

import React from "react";
import BookmarkCard from "./BookmarkCard";
import { useBookmarks } from "../context/BookmarkContext";

// This function renders a grid of bookmark cards
export default function BookmarkList() {

  const {bookmarks} = useBookmarks();

  // If list is empty, return a message
  if (bookmarks.length === 0) {
    return (
      <div className="w-full rounded-xl border border-dashed border-yellow-300 bg-yellow-50 p-6 text-center text-sm text-yellow-800">
        No bookmarks yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          title={bookmark.title}
          url={bookmark.url}
          tag={bookmark.tag}
        />
      ))}
    </div>
  );
}

