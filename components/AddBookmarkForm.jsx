// This directive makes this component a client component so it can use React hooks
"use client";

import React, { useState, useEffect } from "react";
import { useBookmarks } from "../context/BookmarkContext";

export default function AddBookmarkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const {
    addBookmark,
    updateBookmark,
    editingBookmark,
    setEditingBookmark,
  } = useBookmarks();

  // Prefill form when editing a bookmark
  useEffect(() => {
    if (editingBookmark) {
      setTitle(editingBookmark.title ?? "");
      setUrl(editingBookmark.url ?? "");
      setTag(editingBookmark.tag ?? "");
    } else {
      setTitle("");
      setUrl("");
      setTag("");
    }
  }, [editingBookmark]);

  const isEditing = !!editingBookmark;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      setError("Title and URL are required.");
      return;
    }

    setError("");

    if (isEditing) {
      const success = await updateBookmark(editingBookmark.id, {
        title: title.trim(),
        url: url.trim(),
        tag: tag.trim() || null,
      });
      if (success) setEditingBookmark(null);
    } else {
      await addBookmark({
        title: title.trim(),
        url: url.trim(),
        tag: tag.trim() || null,
      });
      setTitle("");
      setUrl("");
      setTag("");
    }
  }

  function handleCancelEdit() {
    setEditingBookmark(null);
    setError("");
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

      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          className="cursor-pointer inline-flex items-center justify-center rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-yellow-600 active:bg-yellow-700"
        >
          {isEditing ? "Update Bookmark" : "Add Bookmark"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

