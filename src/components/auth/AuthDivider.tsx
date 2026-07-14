"use client";

import React from "react";

export default function AuthDivider() {
  return (
    <div className="flex items-center gap-3 my-4">
      {/* Left Line */}
      <div className="h-px flex-1 bg-gray-200" />

      {/* Text */}
      <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
        or continue with
      </span>

      {/* Right Line */}
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}