"use client";

import Link from "next/link";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";
import Logo from "../logo/Logo";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md ">
            <div className="mx-auto flex py-4  max-w-7xl items-center justify-between px-4 ">

                {/* Left */}
                <Link href={'/'}><Logo /></Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:items-center lg:gap-10">
                    <NavLinks />
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">

                    {/* Desktop Actions */}
                    <div className="hidden lg:block">
                        <NavActions />
                    </div>

                    {/* Mobile Menu */}
                    <div className="lg:hidden overflow-hidden">
                        <MobileMenu />
                    </div>

                </div>

            </div>
        </nav>
    );
}