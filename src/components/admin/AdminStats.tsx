import {
    FaUserDoctor,
    FaUsers,
    FaCalendarCheck,
    FaClock,
    FaSackDollar,
    FaCoins,
    FaArrowTrendUp,
} from "react-icons/fa6";
import { IconType } from "react-icons";

interface AdminStatsProps {
    stats: {
        totalDoctors: number;
        totalPatients: number;
        todayAppointments: number;
        pendingAppointments: number;
        todayRevenue: number;
        totalRevenue: number;
    };
}

export default function AdminStats({ stats }: AdminStatsProps) {
    const overviewCards: {
        title: string;
        value: string | number;
        icon: IconType;
        hint: string;
        accent: string;
    }[] = [
        {
            title: "Total Doctors",
            value: stats.totalDoctors,
            icon: FaUserDoctor,
            hint: "Active on platform",
            accent:
                "bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400",
        },
        {
            title: "Total Patients",
            value: stats.totalPatients,
            icon: FaUsers,
            hint: "Registered patients",
            accent:
                "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
        },
        {
            title: "Today's Appointments",
            value: stats.todayAppointments,
            icon: FaCalendarCheck,
            hint: "Scheduled for today",
            accent:
                "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
        },
        {
            title: "Pending Appointments",
            value: stats.pendingAppointments,
            icon: FaClock,
            hint: "Awaiting confirmation",
            accent:
                "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
        },
    ];

    return (
        <section className="space-y-10">
            {/* Overview stats */}
            <div>
                <div className="mb-4 flex items-baseline gap-2">
                    <h3 className="text-xs font-bold tracking-[0.15em] text-foreground/50 uppercase dark:text-white/40">
                        Overview
                    </h3>
                    <div className="h-px flex-1 bg-main/10 dark:bg-white/10" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {overviewCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="group relative overflow-hidden rounded-3xl border border-main/10 bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:border-main/20 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-main/40 dark:hover:shadow-2xl dark:hover:shadow-black/40"
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.accent}`}
                                    >
                                        <Icon size={20} />
                                    </div>

                                    <span className="text-4xl font-black tracking-tighter text-foreground tabular-nums dark:text-white">
                                        {card.value}
                                    </span>
                                </div>

                                <p className="mt-5 text-base font-semibold text-foreground dark:text-white/90">
                                    {card.title}
                                </p>

                                <p className="mt-0.5 text-xs text-muted-foreground dark:text-white/40">
                                    {card.hint}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Revenue */}
            <div>
                <div className="mb-4 flex items-baseline gap-2">
                    <h3 className="text-xs font-bold tracking-[0.15em] text-foreground/50 uppercase dark:text-white/40">
                        Revenue Overview
                    </h3>
                    <div className="h-px flex-1 bg-main/10 dark:bg-white/10" />
                </div>

                <div className="grid gap-5 sm:grid-cols-5">
                    {/* Today's Revenue */}
                    <div className="relative overflow-hidden rounded-3xl border border-main/10 bg-background p-7 shadow-sm sm:col-span-2 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
                        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-main/5 dark:bg-main/10" />

                        <div className="relative flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400">
                                <FaCoins size={20} />
                            </div>

                            <span className="flex items-center gap-1 rounded-full bg-main/10 px-3 py-1 text-xs font-semibold text-main dark:bg-main/15 dark:text-emerald-400">
                                <FaArrowTrendUp size={11} />
                                Today
                            </span>
                        </div>

                        <p className="relative mt-6 text-sm font-medium text-muted-foreground dark:text-white/50">
                            Today&apos;s Revenue
                        </p>

                        <h2 className="relative mt-1 font-mono text-4xl font-black tracking-tight text-foreground tabular-nums dark:text-white">
                            ৳{stats.todayRevenue.toLocaleString()}
                        </h2>
                    </div>

                    {/* Total Revenue — highlighted */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-main to-emerald-700 p-7 shadow-lg sm:col-span-3 dark:shadow-xl dark:shadow-emerald-950/40 dark:from-emerald-600 dark:to-emerald-800">
                        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10" />
                        <div className="pointer-events-none absolute -bottom-14 -left-14 h-48 w-48 rounded-full bg-white/5" />

                        <div className="relative flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                                <FaSackDollar size={20} />
                            </div>

                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                                All-time
                            </span>
                        </div>

                        <p className="relative mt-6 text-sm font-medium text-white/80">
                            Total Revenue
                        </p>

                        <h2 className="relative mt-1 font-mono text-5xl font-black tracking-tight text-white tabular-nums">
                            ৳{stats.totalRevenue.toLocaleString()}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}