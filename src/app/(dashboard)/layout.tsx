import type { ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Logo from "@/components/logo/Logo";
import { getUser } from "../utils/getUser";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const user = await getUser();

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="flex min-h-screen w-full">
                {/* Sidebar */}
                <aside className="hidden w-80 xl:w-90 shrink-0 lg:block ">
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
                    <header className="hidden h-16 items-center justify-between border-b border-main/10 bg-background px-8 lg:flex">
                        <div>
                            <h1 className="text-xl font-semibold">
                                Dashboard
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Welcome back 👋
                            </p>
                        </div>

                        {/* পরে এখানে notification / profile dropdown বসাতে পারো */}
                    </header>

                    {/* Content */}
                    <main className="flex-1 p-4 md:p-6 lg:p-8">
                        <div className="mx-auto w-full max-w-7xl">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}