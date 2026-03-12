"use client";

import React, { useState } from "react";
import { useBookmarks } from "../context/BookmarkContext";
import ConfirmModal from "./ConfirmModal";

// This function renders a single bookmark card with title, URL, tag, and delete button
export default function BookmarkCard({ bookmark_id, title, url, tag }) {
  const { deleteBookmark, setEditingBookmark } = useBookmarks();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirmDelete = async () => {
    await deleteBookmark(bookmark_id);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="relative flex flex-col justify-between rounded-xl border border-yellow-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        <button
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => setIsFavorite((prev) => !prev)}
          className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isFavorite ? "text-red-500" : ""}
            aria-hidden
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
        <div>
          <h3 className="mb-1 pr-8 text-base font-semibold text-slate-900 line-clamp-2">
            {title}
          </h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 block break-all text-sm font-medium text-amber-600 hover:underline"
          >
            {url}
          </a>
          {tag && (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
              {tag}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={handleDeleteClick}
            className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-900 hover:bg-yellow-200 hover:border-yellow-400 active:bg-yellow-300"
          >
            Delete
          </button>
          <button
            type="button"
            aria-label="Edit bookmark"
            onClick={() =>
              setEditingBookmark({
                id: bookmark_id,
                title,
                url,
                tag: tag ?? "",
              })
            }
            className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-slate-300 bg-slate-50 p-1.5 text-slate-600 hover:bg-slate-100 hover:border-slate-400 active:bg-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Are you sure?"
        description={`Are you sure you want to delete "${title}"?`}
        confirmLabel="Yes, delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </>
  );
}

