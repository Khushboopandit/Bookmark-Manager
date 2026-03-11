import React from "react";

// This function renders a simple search bar UI to filter bookmarks visually
export default function SearchInput() {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-yellow-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-yellow-900">
        Search bookmarks
      </h2>
      <div>
      <input
        type="text"
        placeholder="Type to search..."
        className="w-full rounded-md border border-yellow-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
      />
      <p className="text-xs mt-1 text-base text-yellow-700">
       Press Enter to search
      </p>
      </div>
    </div>
  );
}

