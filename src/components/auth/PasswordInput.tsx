"use client";

import { PasswordInputProps } from "@/types/auth/authTypes";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function PasswordInput({
    label,
    name,
    value,
    placeholder,
    error,
    icon: Icon,
    onChange,
}: PasswordInputProps) {
    const [show, setShow] = useState(false);

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

            {/* Input wrapper */}
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    placeholder={placeholder || "••••••••"}
                    onChange={onChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-3
                        pr-12
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
                    minLength={6}
                />

                {/* Show/Hide Password */}
                <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        transition
                        hover:text-gray-600

                        dark:text-gray-500
                        dark:hover:text-gray-300
                    "
                >
                    {show ? (
                        <FaEyeSlash />
                    ) : (
                        <FaEye />
                    )}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {error}
                </p>
            )}

        </div>
    );
}