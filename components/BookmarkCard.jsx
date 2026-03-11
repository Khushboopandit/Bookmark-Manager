"use client";

import React, { useState } from "react";
import { useBookmarks } from "../context/BookmarkContext";
import ConfirmModal from "./ConfirmModal";

// This function renders a single bookmark card with title, URL, tag, and delete button
export default function BookmarkCard({ bookmark_id, title, url, tag }) {
  const { deleteBookmark } = useBookmarks();
  const [showConfirm, setShowConfirm] = useState(false);

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
      <div
        
        className="flex flex-col justify-between rounded-xl border border-yellow-200 bg-white p-4 shadow-sm transition hover:shadow-md"
      >
        <div>
          <h3 className="mb-1 text-base font-semibold text-slate-900 line-clamp-2">
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

        <button
          type="button"
          onClick={handleDeleteClick}
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-900 hover:bg-yellow-200 hover:border-yellow-400 active:bg-yellow-300"
        >
          Delete
        </button>
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

