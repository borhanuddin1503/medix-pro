import type { ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Logo from "@/components/logo/Logo";
import { getUser } from "../utils/getUser";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const user = await getUser();

    return (
        <div className="min-h-screen bg-muted/30 relative">
            <div className="flex min-h-screen w-full">
                {/* Sidebar */}
                <aside className="sticky top-0 hidden h-svh w-80 shrink-0 lg:block xl:w-90">
                    <DashboardSidebar role={user?.role} />
                </aside>

                {/* Main */}
                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Mobile Header */}
                    <header className="sticky top-0 z-40 flex  items-center justify-between border-b border-main/10 bg-background px-4 lg:hidden py-4">
                        <Logo />

                        <DashboardSidebar role={user?.role} />
                    </header>

                    {/* Desktop Header */}
                    <DashboardTopbar user={user} />

                    {/* Content */}
                    <main className="flex-1 p-4 md:p-6 lg:p-8">
                        <div className="">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}