"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../logo/Logo";
import { navItems } from "./navItems";
import MobileProfileCard from "./MobileProfileCard";
import { IWhoMeUser } from "@/app/utils/getUser";
import { logout } from "@/app/actions/logout.action";
export default function MobileMenu({ user }: {
    user: IWhoMeUser | null
}) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const name = user?.name ?? "";
    const email = user?.email ?? "";
    const role = user?.role ?? "";
    const image = user?.image ?? "";

    const router = useRouter();

    const handleLogout = async () => {
        const result = await logout()
        if (result.success) {
            router.push('/sign-in')
        }
    };

    return (
        <div>
            {/* Menu Icon */}
            {!isMenuOpen && (
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="
                        cursor-pointer
                        text-gray-800
                        transition-colors
                        hover:text-main

                        dark:text-gray-200
                        dark:hover:text-main
                    "
                >
                    <HiOutlineMenu size={28} />
                </button>
            )}

            {/* Backdrop */}
            {isMenuOpen && (
                <div
                    className="
                        fixed
                        left-0
                        top-0
                        z-[999]
                        h-screen
                        w-full
                        bg-black/30
                        backdrop-blur-sm
                    "
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Drawer */}
            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-[1000]
                    flex
                    h-dvh
                    w-100
                    flex-col
                    rounded-r-2xl
                    bg-white
                    p-5
                    text-gray-900
                    transition-transform
                    duration-300
                    ease-in-out

                    dark:bg-gray-950
                    dark:shadow-sm dark:shadow-gray-300
                    dark:text-gray-100

                    ${isMenuOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
                `}
            >
                {/* Header */}
                <div
                    className="
                        mb-5
                        flex
                        w-full
                        items-center
                        justify-between
                        border-b
                        border-gray-300
                        pb-4

                        dark:border-gray-800
                    "
                >
                    <Link
                        href="/"
                        className="flex items-center"
                    >
                        <div className="relative group">
                            <Logo />
                        </div>
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="
                            text-gray-700
                            transition-colors
                            hover:text-main

                            dark:text-gray-300
                            dark:hover:text-main
                        "
                    >
                        <FiX className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-1 flex-col justify-between">

                    {/* Navigation */}
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            const isActive =
                                pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                        className={`
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            font-medium
                                            transition-all
                                            duration-200

                                            ${isActive
                                                ? "bg-main/10 text-main"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-main dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-main"
                                            }
                                        `}
                                    >
                                        <Icon size={18} />

                                        <span>
                                            {item.title}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Profile */}
                    {/* User Action */}
                    {user ? (
                        <div>
                            <MobileProfileCard
                                name={name}
                                email={email}
                                role={role}
                                image={image}
                                onLogout={handleLogout}
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <Link
                                href="/sign-in"
                                onClick={() =>
                                    setIsMenuOpen(false)
                                }
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-main
                                    px-4
                                    py-3
                                    font-medium
                                    text-main
                                    transition
                                    hover:bg-main/10
                                "
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}