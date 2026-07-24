import React from 'react'

export default function Loading() {
    return (
        <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Rotating outer circle */}
            <svg
                className="absolute h-12 w-12 animate-spin-slow"
                viewBox="0 0 40 40"
                fill="none"
            >
                <path
                    d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4Z"
                    fill="#2e9c2e"
                    stroke="#1c661c"
                    strokeWidth="2"
                />
            </svg>

            {/* Fixed cross + center circle */}
            <svg
                className="absolute h-12 w-12"
                viewBox="0 0 40 40"
                fill="none"
            >
                <path
                    d="M20 10V30M12 20H28"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                <circle
                    cx="20"
                    cy="20"
                    r="6"
                    stroke="#2e9c2e"
                    fill="white"
                    strokeWidth="2"
                />
            </svg>
        </div>
    )
}
