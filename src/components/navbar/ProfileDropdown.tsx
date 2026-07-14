"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LayoutDashboard, Settings, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

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
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 transition hover:border-main"
            >
                <div className="flex h-9 w-9 overflow-hidden items-center justify-center rounded-full bg-main text-white font-semibold">
                    {
                        image ? <Image src={image} alt="profile" height={36} width={36}></Image> : name.charAt(0).toUpperCase()
                    }
                </div>

                <div className="hidden text-left lg:block">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-gray-500">
                        {role}
                    </p>
                </div>

                {
                    open ? <ChevronUp size={18} /> : <ChevronDown size={18} />
                }
            </button>


            <div className={`
    absolute right-0 mt-3 w-72 overflow-hidden
    rounded-2xl border border-gray-100 bg-white shadow-2xl
    origin-top-right
    transition-all duration-200 ease-out
    ${open
                    ? "translate-y-0 opacity-100 scale-100"
                    : "-translate-y-2 opacity-0 scale-95 pointer-events-none"
                }
  `}>
                <div className="border-b p-5 flex items-center gap-5 ">
                    <div className="h-12 w-12 overflow-hidden rounded-full relative">
                        { 
                            image ? <Image src={image} alt="profile" fill></Image> : name.charAt(0).toUpperCase()
                        }
                    </div>
                    <div>
                        <p className="font-semibold">
                            {name}
                        </p>

                        <p className="text-sm text-gray-500">
                            {email}
                        </p>
                    </div>
                </div>

                <div className="p-2">

                    <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-emerald-50"
                    >
                        <User size={18} />
                        My Profile
                    </Link>

                    <Link
                        href={`/dashboard/${role.toLowerCase()}`}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-emerald-50"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <Link
                        href="/settings"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-emerald-50"
                    >
                        <Settings size={18} />
                        Settings
                    </Link>

                    <button
                        onClick={onLogout}
                        className="mt-2 flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>
            </div>

        </div>
    );
}