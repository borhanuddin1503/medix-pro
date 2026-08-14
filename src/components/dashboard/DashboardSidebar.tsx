"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    UserRound,
    CalendarCheck,
    Stethoscope,
    CreditCard,
    Settings,
    Heart,
    Clock,
    Menu,
    X,
} from "lucide-react";
import Logo from "../logo/Logo";

type SidebarItem = {
    title: string;
    href: string;
    icon: React.ElementType;
};

const SIDEBAR_ITEMS: Record<string, SidebarItem[]> = {
    ADMIN: [
        { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
        { title: "Doctors", href: "/dashboard/admin/doctors", icon: Stethoscope },
        { title: "Patients", href: "/dashboard/admin/patients", icon: Users },
        { title: "Appointments", href: "/dashboard/admin/appointments", icon: CalendarCheck },
        { title: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
        { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],

    DOCTOR: [
        { title: "Dashboard", href: "/dashboard/doctor", icon: LayoutDashboard },
        { title: "Appointments", href: "/dashboard/doctor/appointments", icon: CalendarCheck },
        { title: "Schedule", href: "/dashboard/doctor/schedule", icon: Clock },
        { title: "Patients", href: "/dashboard/doctor/patients", icon: Users },
        { title: "Profile", href: "/dashboard/doctor/profile", icon: UserRound },
    ],

    PATIENT: [
        { title: "Dashboard", href: "/dashboard/patient", icon: LayoutDashboard },
        { title: "My Appointments", href: "/dashboard/patient/appointments", icon: CalendarCheck },
        { title: "Favorite Doctors", href: "/dashboard/patient/favorites", icon: Heart },
        { title: "Profile", href: "/dashboard/patient/profile", icon: UserRound },
        { title: "Settings", href: "/dashboard/patient/settings", icon: Settings },
    ],
};

interface DashboardSidebarProps {
    role?: string;
}

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const menu = SIDEBAR_ITEMS[role as keyof typeof SIDEBAR_ITEMS] ?? [];
    const dashboardHome = `/dashboard/${role?.toLowerCase()}`;

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="flex items-center justify-between border-b border-main/10 dark:border-gray-700 py-6">
                <div className="flex items-center gap-2.5">
                    <div>
                        <Logo></Logo>

                        {role && (
                            <span className="mt-0.5 inline-block rounded-full bg-main/10 px-2 py-0.5 text-[11px] font-medium text-main">
                                {role}
                            </span>
                        )}
                    </div>
                </div>

                {/* Mobile close button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer rounded-xl p-2 text-muted-foreground transition hover:bg-main/10 hover:text-foreground lg:hidden"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-1 overflow-y-auto py-6">
                {menu.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        pathname === item.href ||
                        (item.href === dashboardHome && pathname === dashboardHome);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-main/10 text-main dark:border dark:border-main/50"
                                : "text-muted-foreground hover:bg-main/10 hover:text-main"
                                }`}
                        >
                            <Icon
                                size={18}
                                className={
                                    isActive
                                        ? "text-main"
                                        : "text-muted-foreground group-hover:text-main"
                                }
                            />

                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-main/10 p-4">
                <p className="text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Medix Pro
                </p>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile hamburger trigger — Navbar এর ভেতরে বসাতে চাইলে এটা এখান থেকে সরিয়ে Navbar কম্পোনেন্টে নিয়ে যেতে পারো */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-main/10 bg-background text-foreground shadow-sm lg:hidden"
            >
                <Menu size={20} />
            </button>

            {/* Desktop sidebar — normal flow, fixed নয়, তাই Navbar layout ভাঙবে না */}
            <aside className="hidden h-full  shrink-0 flex-col border-r border-main/10 dark:border-gray-700 bg-background lg:flex px-6">
                {sidebarContent}
            </aside>

            {/* Mobile drawer — শুধু এখানেই fixed, নিজের overlay এর জন্য */}

            <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300
        ${isOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}>
                {/* Backdrop */}
                {isOpen && <div
                    onClick={() => setIsOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />}

                {/* Drawer panel */}
                <aside className={`relative flex h-full flex-col  border-r border-main/10 bg-background  w-100 px-6 rounded-r-2xl  ${isOpen ? "translate-x-0 transition-transform duration-300" : "transition-transform duration-300 -translate-x-full"}`}>
                    {sidebarContent}
                </aside>
            </div>

        </>
    );
}