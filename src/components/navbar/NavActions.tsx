"use client";

import Link from "next/link";
import { Search, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { authClient } from "@/lib/authClient";
import { UserRole } from "@/types/auth/authTypes";
import { useUserSession } from "@/custom-hooks/user/useUserSession";

export default function NavActions() {

    const { session } = useUserSession();

    const user = session?.user as UserRole & {
        name: string;
        email: string;
        image: string;
    };

    const isLoggedin = session?.user.email;

    const userInfo = {
        name: user?.name ?? "",
        email: user?.email ?? "",
        image: user?.image ?? "",
        role: user?.role ?? "USER",
    };

    const handleLogout = async () => {
        await authClient.signOut();
    };


    return (
        <div className="hidden items-center gap-3 lg:flex">

            {/* Search */}

            <button
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
                    transition
                    hover:border-main
                    hover:text-main
                "
            >
                <Search size={20} />
            </button>

            {isLoggedin ? (
                <>
                    {/* Notification */}

                    <button
                        className="
                            relative
                            flex
                            h-11
                            w-11
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-gray-200
                            transition
                            hover:border-main
                            hover:text-main
                        "
                    >
                        <Bell size={20} />

                        <span
                            className="
                                absolute
                                right-3
                                top-3
                                h-2
                                w-2
                                rounded-full
                                bg-red-500
                            "
                        />
                    </button>

                    <ProfileDropdown
                        name={userInfo.name}
                        email={userInfo.email}
                        role={userInfo.role!}
                        onLogout={handleLogout}
                        image={userInfo.image}
                    />
                </>
            ) : (
                <>
                    <Link
                        href="/sign-in"
                        className="
                            rounded-xl
                            px-4
                            py-2
                            font-medium
                            text-main
                            transition
                            hover:bg-emerald-50
                            border border-gray-200
                        "
                    >
                        Sign In
                    </Link>
                </>
            )}

        </div>
    );
}