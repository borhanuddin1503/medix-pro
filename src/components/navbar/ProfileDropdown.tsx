"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
    User,
    LayoutDashboard,
    Settings,
    LogOut,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ProfileDropdownProps {
    name: string;
    email: string;
    role: string;
    image: string;
    onLogout: () => void;
}

export default function ProfileDropdown({
    name,
    email,
    role,
    image,
    onLogout,
}: ProfileDropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="relative"
        >
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2
                    text-gray-900
                    transition
                    hover:border-main

                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-gray-100
                "
            >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-main font-semibold text-white">
                    {image ? (
                        <Image
                            src={image}
                            alt="profile"
                            height={36}
                            width={36}
                        />
                    ) : (
                        name.charAt(0).toUpperCase()
                    )}
                </div>

                <div className="hidden text-left lg:block">
                    <p className="text-sm font-semibold">
                        {name}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {role}
                    </p>
                </div>

                {open ? (
                    <ChevronUp size={18} />
                ) : (
                    <ChevronDown size={18} />
                )}
            </button>

            <div
                className={`
                    absolute
                    right-0
                    mt-3
                    min-w-72
                    origin-top-right
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    shadow-2xl
                    transition-all
                    duration-200
                    ease-out

                    dark:border-gray-700
                    dark:bg-gray-900

                    ${open
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                    }
                `}
            >
                <div
                    className="
                        flex
                        items-center
                        gap-5
                        border-b
                        border-gray-100
                        p-5

                        dark:border-gray-700
                    "
                >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-main text-center font-semibold text-white">
                        {image ? (
                            <Image
                                src={image}
                                alt="profile"
                                fill
                            />
                        ) : (
                            name.charAt(0).toUpperCase()
                        )}
                    </div>

                    <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {name}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {email}
                        </p>
                    </div>
                </div>

                <div className="p-2">

                    <Link
                        href="/profile"
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-lg
                            px-4
                            py-3
                            text-gray-700
                            transition
                            hover:bg-emerald-50
                            hover:text-main

                            dark:text-gray-300
                            dark:hover:bg-emerald-950/40
                            dark:hover:text-main
                        "
                    >
                        <User size={18} />
                        My Profile
                    </Link>

                    {(role && !pathname.includes('dashboard')) && <Link
                        href={`/dashboard/${role.toLowerCase()}`}
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-lg
                            px-4
                            py-3
                            text-gray-700
                            transition
                            hover:bg-emerald-50
                            hover:text-main

                            dark:text-gray-300
                            dark:hover:bg-emerald-950/40
                            dark:hover:text-main
                        "
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>}

                    <button
                        onClick={onLogout}
                        className="
                            mt-2
                            flex
                            w-full
                            cursor-pointer
                            items-center
                            gap-3
                            rounded-lg
                            px-4
                            py-3
                            text-red-600
                            transition
                            hover:bg-red-50

                            dark:text-red-400
                            dark:hover:bg-red-950/40
                        "
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
}