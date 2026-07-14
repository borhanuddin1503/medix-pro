"use client";

import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../logo/Logo";
import { navItems } from "./navItems";
import { useUserSession } from "@/custom-hooks/user/useUserSession";
import MobileProfileCard from "./MobileProfileCard";
import { UserRole } from "@/types/auth/authTypes";
import { authClient } from "@/lib/authClient";

export default function MobileMenu() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { session } = useUserSession();

  type MobileUser = {
    name: string;
    email: string;
    image: string;
  } & UserRole;


  const user = session?.user as MobileUser | undefined;

  const name = user?.name ?? "";
  const email = user?.email ?? "";
  const role = user?.role ?? "";
  const image = user?.image ?? "";


  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setIsMenuOpen(false);

      window.location.href = "/sign-in";
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };


  return (
    <div>
      {/* Menu Icon */}
      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="cursor-pointer"
        >
          <HiOutlineMenu size={28} />
        </button>
      )}


      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed h-screen w-full top-0 left-0 z-[999] bg-black/30 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}


      {/* Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-[1000]
          h-dvh w-100
          rounded-r-2xl
          bg-white 
          p-5
          flex flex-col 
          transition-transform duration-300 ease-in-out
          ${isMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >

        {/* Header */}
        {/* Close button */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-300 w-full mb-5">
          <Link href="/" className="flex items-center">
            <div className="relative group">
              <Logo />
            </div>
          </Link>
          <button onClick={() => setIsMenuOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>



        <div className="flex-1 flex justify-between flex-col">
          {/* Navigation */}
          <ul className="space-y-2 ">

            {navItems.map((item) => {

              const Icon = item.icon;

              const isActive = pathname === item.href;


              return (
                <li key={item.href}>

                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    font-medium
                    transition-all duration-200

                    ${isActive
                        ? "bg-main/10 text-main"
                        : "text-gray-600 hover:bg-gray-100 hover:text-main"
                      }
                  `}
                  >

                    <Icon size={18} />

                    <span>
                      {item.title}
                    </span>

                  </Link>

                </li>
              )

            })}

          </ul>


          {/* Profile */}
          {/* User Action */}
          {session ? (
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
                onClick={() => setIsMenuOpen(false)}
                className="
        flex items-center justify-center
        rounded-xl
        border border-main
        px-4 py-3
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