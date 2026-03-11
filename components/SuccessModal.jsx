"use client";

import React from "react";

export default function SuccessModal({ open, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center pt-8 pointer-events-none">
      <div className="rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-emerald-800 shadow pointer-events-auto">
        {message}
      </div>
    </div>
  );
}

