"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) return (
        <button
            type="button"
            onClick={() => {
                setTheme(isDark ? "light" : "dark");
            }}
            className="
                flex
                h-11
                w-11
                cursor-pointer
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                text-gray-600
                transition

                hover:border-main
                hover:text-main

                dark:border-gray-700
                dark:text-gray-300
            "
        >
            <Sun size={20} />
        </button>
    );
    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => {
                setTheme(isDark ? "light" : "dark");
            }}
            className="
                flex
                h-11
                w-11
                cursor-pointer
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                text-gray-600
                transition

                hover:border-main
                hover:text-main

                dark:border-gray-700
                dark:text-gray-300
            "
        >
            {isDark ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    );
}