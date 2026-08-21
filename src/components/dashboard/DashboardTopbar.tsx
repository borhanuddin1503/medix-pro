"use client";

import { Bell, ChevronDown, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProfileDropdown from "../navbar/ProfileDropdown";
import { logout } from "@/app/actions/logout.action";
import ThemeToggle from "../navbar/ThemeToggle";

type User = {
    name?: string;
    email?: string;
    role?: string;
    image?: string;
};

interface DashboardTopbarProps {
    user?: User | null;
}

const PAGE_INFO: Record<string, { title: string; description: string }> = {
    "/dashboard/admin": {
        title: "Dashboard",
        description: "Overview of your platform",
    },

    "/dashboard/admin/doctors": {
        title: "Doctors",
        description: "Manage doctors and their information",
    },

    "/dashboard/admin/patients": {
        title: "Patients",
        description: "Manage registered patients",
    },

    "/dashboard/admin/appointments": {
        title: "Appointments",
        description: "Manage all appointments",
    },

    "/dashboard/admin/payments": {
        title: "Payments",
        description: "View and manage payments",
    },

    "/dashboard/admin/settings": {
        title: "Settings",
        description: "Manage your account settings",
    },
};

export default function DashboardTopbar({
    user,
}: DashboardTopbarProps) {
    const pathname = usePathname();

    const page =
        PAGE_INFO[pathname] ?? {
            title: "Dashboard",
            description: "Welcome back to Medix Pro",
        };

    return (
        <header className="sticky py-4 top-20 lg:top-0 z-30 flex shrink-0 items-center justify-between border-b border-main/10 dark:border-gray-700 bg-background/95 px-4 backdrop-blur md:px-6 lg:px-8">

            {/* Left */}
            <div>
                <h1 className="text-lg font-semibold text-foreground">
                    {page.title}
                </h1>

                <p className="hidden text-xs text-muted-foreground sm:block">
                    {page.description}
                </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">

                {/* Theme */}
                <ThemeToggle></ThemeToggle>


                {/* Profile */}

                {/* profile dropdown */}
                <ProfileDropdown name={user?.name!} email={user?.email!} image={user?.image!} role={user?.role!} onLogout={logout}></ProfileDropdown>

            </div>
        </header>
    );
}