"use client";
import React from "react";
import { AuthInputProps } from "@/types/auth/authTypes";

export default function AuthInput({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  error,
  placeholder,
  onChange,
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="text-emerald-600 text-xs w-4" />}
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          text-sm
          text-gray-700
          outline-none
          transition
          focus:border-emerald-500
          focus:ring-2
          focus:ring-emerald-100
        "
      />

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}