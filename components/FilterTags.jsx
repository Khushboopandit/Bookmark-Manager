"use client";

import React, { useState, useMemo } from "react";
import { useBookmarks } from "../context/BookmarkContext";


export default function FilterTags() {
const {bookmarks,updateActiveTag,activeTag} = useBookmarks();

  

  const tags = useMemo(()=>{
    return ["All",...new Set(bookmarks.map((bookmark)=>bookmark.tag).filter((tag)=>tag))]
  },[bookmarks])
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = tag === activeTag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => updateActiveTag(tag)}
            className={`cursor-pointer inline-flex items-center rounded-full px-5 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-yellow-500 text-white"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

