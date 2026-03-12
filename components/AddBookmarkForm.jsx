// This directive makes this component a client component so it can use React hooks
"use client";

import React, { useState } from "react";
import { useBookmarks } from "../context/BookmarkContext";

export default function AddBookmarkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const { addBookmark } = useBookmarks();

  // This function handles the form submission, validates, and sends data to the bookmark context
  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      setError("Title and URL are required.");
      return;
    }

    setError("");

    await addBookmark({
      title,
      url,
      tag,
    });

    setTitle("");
    setUrl("");
    setTag("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-4 rounded-xl border border-yellow-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-yellow-900 required-label">
          Title
        </label>
        <input
          type="text"
          value={title}
          required={true}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter bookmark title"
          className="w-full rounded-md border border-yellow-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-yellow-900 required-label">
          URL
        </label>
        <input
          type="url"
          value={url}
          required={true}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-md border border-yellow-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-yellow-900">Tag</label>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Optional tag"
          className="w-full rounded-md border border-yellow-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600">{error}</p>
      )}

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-yellow-600 active:bg-yellow-700"
      >
        Add Bookmark
      </button>
    </form>
  );
}

