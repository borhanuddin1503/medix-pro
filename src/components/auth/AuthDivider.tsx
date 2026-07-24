"use client";

import React from "react";

export default function AuthDivider() {
    return (
        <div className="my-4 flex items-center gap-3">

            {/* Left Line */}
            <div
                className="
                    h-px
                    flex-1
                    bg-gray-200

                    dark:bg-gray-700
                "
            />

            {/* Text */}
            <span
                className="
                    whitespace-nowrap
                    text-xs
                    font-medium
                    text-gray-400

                    dark:text-gray-500
                "
            >
                or continue with
            </span>

            {/* Right Line */}
            <div
                className="
                    h-px
                    flex-1
                    bg-gray-200

                    dark:bg-gray-700
                "
            />

        </div>
    );
}