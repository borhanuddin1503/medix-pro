"use client";

import Link from "next/link";
import {
    User,
    LayoutDashboard,
    Settings,
    LogOut,
} from "lucide-react";
import Image from "next/image";

interface MobileProfileCardProps {
    name: string;
    email: string;
    role: string;
    image: string;
    onLogout: () => void;
}

export default function MobileProfileCard({
    name,
    email,
    role,
    image,
    onLogout,
}: MobileProfileCardProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-main/5 to-white p-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 overflow-hidden items-center justify-center rounded-full bg-main text-lg font-bold text-white">
                    {
                        image ? <Image src={image} alt="profile" height={56} width={56}></Image> : name.charAt(0).toUpperCase()
                    }
                </div>

                <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900">
                        {name}
                    </h3>

                    <p className="truncate text-sm text-gray-500">
                        {email}
                    </p>

                    <span className="mt-1 inline-flex rounded-full bg-main/10 px-2 py-1 text-xs font-medium text-main">
                        {role}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-5 space-y-2">
                <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 transition hover:bg-main/10 hover:text-main"
                >
                    <User size={20} />
                    <span>My Profile</span>
                </Link>

                <Link
                    href={`/dashboard/${role.toLowerCase()}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 transition hover:bg-main/10 hover:text-main"
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>

                <Link
                    href="/settings"
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-gray-700 transition hover:bg-main/10 hover:text-main"
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>

                <button
                    onClick={onLogout}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-red-600 transition hover:bg-red-50"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}