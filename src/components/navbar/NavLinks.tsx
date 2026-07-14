"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navItems";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
                const isActive =
                    item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                return (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`
                                group
                                relative
                                text-sm
                                font-medium
                                transition-colors
                                duration-200
                                ${isActive
                                    ? "text-main"
                                    : "text-gray-600 hover:text-main"
                                }
                            `}
                        >
                            {item.title}

                            <span
                                className={`
                                    absolute
                                    -bottom-1
                                    left-0
                                    h-[2px]
                                    bg-main
                                    transition-all
                                    duration-300
                                    ${isActive
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                    }
                                `}
                            />
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}