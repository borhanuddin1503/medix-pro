"use client";

import React from "react";

interface OTPInputProps {
    value: string[];
    onChange: (index: number, value: string) => void;
    inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
    length?: number;
}

export default function OTPInput({
    value,
    onChange,
    inputRefs,
    length = 6,
}: OTPInputProps) {
    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            e.key === "Backspace" &&
            value[index] === "" &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, length);

        if (!pasted) return;

        console.log(pasted)

        pasted.split("").forEach((digit, index) => {
            onChange(index, digit);
        });

        inputRefs.current[
            Math.min(pasted.length, length - 1)
        ]?.focus();
    };

    return (
        <div className="flex justify-center gap-3">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ""}
                    onChange={(e) => onChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="h-14 w-14 text-black dark:text-white rounded-xl border border-gray-300 text-center text-2xl font-bold outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                />
            ))}
        </div>
    );
}