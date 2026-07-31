import Link from "next/link";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import Logo from "../logo/Logo";
import { Suspense } from "react";
import NavActions from "./NavActions";
import { getUser, IWhoMeUser } from "@/app/utils/getUser";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
    const user: IWhoMeUser | null = await getUser();

    return (
        <nav
            className="
                sticky top-0 z-50
                border-b border-gray-200
                bg-white/80
                text-gray-900
                backdrop-blur-md
                shadow-xl

                dark:border-gray-700
                dark:bg-gray-950/80
                dark:text-gray-100
            "
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

                {/* Left */}
                <Link
                    href="/"
                    className="
                        transition-colors
                        hover:text-blue-600
                        dark:hover:text-blue-400
                    "
                >
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:items-center lg:gap-10">
                    <NavLinks />
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <ThemeToggle />
                    
                    {/* Desktop Actions */}
                    <div className="hidden lg:block">
                        <Suspense fallback="loading">
                            <NavActions user={user} />
                        </Suspense>
                    </div>

                    {/* Mobile Menu */}
                    <div className="overflow-hidden lg:hidden">
                        <MobileMenu user={user}/>
                    </div>

                </div>

            </div>
        </nav>
    );
}