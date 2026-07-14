'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, LogOut, Settings } from 'lucide-react';

interface UserMenuProps {
    user?: {
        name: string;
        email: string;
        image?: string;
    };
}

export const UserMenu = ({ user }: UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Link
                    href="/signin"
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-main transition-colors"
                >
                    Sign In
                </Link>
                <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-main rounded-lg hover:bg-main/90 transition-colors"
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 focus:outline-none"
            >
                {user.image ? (
                    <Image
                        src={user.image}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-main"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-main/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-main" />
                    </div>
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-background border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                            <p className="text-sm font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="py-1">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-main/10 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <Settings className="w-4 h-4" />
                                Update Profile
                            </Link>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    // Add logout logic here
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};