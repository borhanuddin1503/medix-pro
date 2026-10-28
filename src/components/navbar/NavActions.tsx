"use client";

import Link from "next/link";
import { Search, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
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