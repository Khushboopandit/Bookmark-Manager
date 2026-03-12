"use client";

import React, {useMemo} from "react";
import BookmarkCard from "./BookmarkCard";
import { useBookmarks } from "../context/BookmarkContext";

// This function renders a grid of bookmark cards
export default function BookmarkList() {

  const {bookmarks,searchText,activeTag} = useBookmarks();

  const filterBookmarks=useMemo(()=>{
    if(searchText.trim() === "" && activeTag==="All" ) return bookmarks;

    return bookmarks?.filter((item)=>(searchText.trim() === ""?true:item?.title?.toLowerCase().includes(searchText?.toLowerCase())) && (activeTag==="All"?true:item?.tag===activeTag))
  },[searchText,bookmarks,activeTag])
  
  // If list is empty, return message
  if (bookmarks.length === 0) {
    return (
      <div className="w-full rounded-xl border border-dashed border-yellow-300 bg-yellow-50 p-6 text-center text-sm text-yellow-800">
        No bookmarks yet
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {filterBookmarks.map((bookmark) => (
        <BookmarkCard
        key={bookmark.id + "_bookmark_card"}
          bookmark_id={bookmark.id}
          title={bookmark.title}
          url={bookmark.url}
          tag={bookmark.tag}
        />
      ))}
    </div>
  );
}

