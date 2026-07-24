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
            <label
                className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-gray-700

                    dark:text-gray-300
                "
            >
                {Icon && (
                    <Icon
                        className="
                            w-4
                            text-xs
                            text-emerald-600

                            dark:text-emerald-400
                        "
                    />
                )}

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

                    placeholder:text-gray-400

                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-100

                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-gray-200
                    dark:placeholder:text-gray-500

                    dark:focus:border-emerald-400
                    dark:focus:ring-emerald-900/40
                "
            />

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {error}
                </p>
            )}

        </div>
    );
}