"use client";

import Link from "next/link";
import { Search, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { authClient } from "@/lib/authClient";
import { IWhoMeUser } from "@/app/utils/getUser";
import { logout } from "@/app/actions/logout.action";
import { useRouter } from "next/navigation";

export default function NavActions({
    user,
}: {
    user: IWhoMeUser | null;
}) {
    const isLoggedin = user?.email;

    const userInfo = {
        name: user?.name ?? "",
        email: user?.email ?? "",
        image: user?.image ?? "",
        role: user?.role ?? "USER",
    };

    const router = useRouter();

    const handleLogout = async () => {
        const result = await logout()
        if (result.success) {
            router.push('/sign-in')
        }
    };

    return (
        <div className="hidden items-center gap-3 lg:flex">

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
                            text-gray-700
                            transition
                            hover:border-main
                            hover:text-main

                            dark:border-gray-700
                            dark:text-gray-300
                            dark:hover:border-main
                            dark:hover:text-main
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
                <Link
                    href="/sign-in"
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        px-4
                        py-2
                        font-medium
                        text-main
                        transition
                        hover:bg-emerald-50

                        dark:border-gray-700
                        dark:hover:bg-emerald-950/40
                    "
                >
                    Sign In
                </Link>
            )}

        </div>
    );
}