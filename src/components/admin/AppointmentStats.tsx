"use client";

import {
    Clock,
    CheckCircle2,
    ClipboardCheck,
    XCircle,
} from "lucide-react";

interface AppointmentStat {
    _id: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
    count: number;
}

interface AppointmentStatsProps {
    stats: AppointmentStat[];
}

const statConfig = [
    {
        status: "PENDING" as const,
        label: "Pending",
        icon: Clock,
        color:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    },
    {
        status: "CONFIRMED" as const,
        label: "Confirmed",
        icon: CheckCircle2,
        color:
            "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    },
    {
        status: "COMPLETED" as const,
        label: "Completed",
        icon: ClipboardCheck,
        color:
            "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    },
    {
        status: "CANCELLED" as const,
        label: "Cancelled",
        icon: XCircle,
        color:
            "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    },
];

export default function AppointmentStats({ stats }: AppointmentStatsProps) {
    const getCount = (status: AppointmentStat["_id"]) =>
        stats.find((item) => item._id === status)?.count ?? 0;

    return (
        <section className="rounded-2xl border border-main/10 bg-background p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-foreground">
                Appointment Status
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {statConfig.map(({ status, label, icon: Icon, color }) => (
                    <div
                        key={status}
                        className="flex flex-col items-center gap-2 rounded-xl border border-main/10 p-4 text-center transition hover:shadow-md"
                    >
                        <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}
                        >
                            <Icon size={18} />
                        </span>

                        <p className="text-2xl font-bold text-foreground">
                            {getCount(status)}
                        </p>

                        <p className="text-xs font-medium text-foreground/60">
                            {label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}