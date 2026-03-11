import React from "react";
import BookmarkCard from "./BookmarkCard";

// This function renders a grid of bookmark cards
export default function BookmarkList() {
  const bookmarks = [
    { id: 1, title: "Google", url: "https://google.com", tag: "search" },
    { id: 2, title: "GitHub", url: "https://github.com", tag: "dev" },
  ];

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

