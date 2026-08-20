"use client";

import { UserRound, ChevronRight } from "lucide-react";

interface PendingDoctorsProps {
    doctors: {
        _id: string;
        name?: string;
        email?: string;
    }[];
}

export default function PendingDoctors({ doctors }: PendingDoctorsProps) {
    return (
        <section className="rounded-3xl border border-main/10 bg-background p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground dark:text-white">
                    Pending Doctor Applications
                </h2>

                <button className="text-sm font-semibold text-main transition hover:opacity-80 dark:text-emerald-400">
                    View all
                </button>
            </div>

            {doctors.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-foreground dark:text-white/40">
                    No pending applications.
                </div>
            ) : (
                <div className="space-y-3">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor._id}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-main/10 p-4 transition hover:border-main/20 dark:border-white/10 dark:hover:border-main/30"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400">
                                    <UserRound size={18} />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-foreground dark:text-white">
                                        {doctor.name ?? "Unknown Doctor"}
                                    </p>

                                    <p className="truncate text-xs text-muted-foreground dark:text-white/40">
                                        {doctor.email}
                                    </p>
                                </div>
                            </div>

                            <button className="inline-flex shrink-0 items-center gap-1 rounded-full bg-main/10 px-3 py-1.5 text-xs font-semibold text-main transition hover:bg-main/20 dark:bg-main/15 dark:text-emerald-400 dark:hover:bg-main/25">
                                Review
                                <ChevronRight size={13} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}