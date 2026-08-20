"use client";

import {
    CreditCard,
    Banknote,
    CheckCircle2,
    LoaderCircle,
} from "lucide-react";

interface Payment {
    _id: string;
    patientName: string;
    amount?: number;
    currency?: string;
    paymentMethod: "ONLINE" | "CASH";
    paid: boolean;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
    appointmentDate?: string;
    createdAt?: string;
}

interface RecentPaymentsProps {
    payments: Payment[];
}

const statusStyles = {
    PENDING:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    CONFIRMED:
        "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    COMPLETED:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    CANCELLED:
        "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

// createdAt comes as an ISO string (e.g. "2026-08-14T09:24:07.317Z") — format to a short readable date
const formatDate = (iso?: string) => {
    if (!iso) return null;

    const date = new Date(iso);

    if (isNaN(date.getTime())) return null;

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function RecentPayments({ payments }: RecentPaymentsProps) {
    return (
        <section className="rounded-3xl border border-main/10 bg-background p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground dark:text-white">
                    Recent Payments
                </h2>

                <button className="text-sm font-semibold text-main transition hover:opacity-80 dark:text-emerald-400">
                    View all
                </button>
            </div>

            {!payments?.length ? (
                <div className="py-10 text-center text-sm text-muted-foreground dark:text-white/40">
                    No payments yet
                </div>
            ) : (
                <div className="space-y-3">
                    {payments.map((payment) => {
                        const amount = payment.amount
                            ? (payment.amount).toLocaleString()
                            : "0";

                        return (
                            <div
                                key={payment._id}
                                className="flex items-center justify-between gap-3 rounded-2xl border border-main/10 p-4 transition hover:border-main/20 dark:border-white/10 dark:hover:border-main/30"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400">
                                        {payment.paymentMethod === "ONLINE" ? (
                                            <CreditCard size={16} />
                                        ) : (
                                            <Banknote size={16} />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-foreground dark:text-white">
                                            {payment.patientName}
                                        </p>

                                        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground dark:text-white/40">
                                            <span>{payment.paymentMethod}</span>

                                            {payment.appointmentDate && (
                                                <>
                                                    <span>•</span>
                                                    <span>Appt: {payment.appointmentDate}</span>
                                                </>
                                            )}

                                            {formatDate(payment.createdAt) && (
                                                <>
                                                    <span>•</span>
                                                    <span>Booked: {formatDate(payment.createdAt)}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex shrink-0 flex-col items-end gap-1.5">
                                    <strong className="font-mono text-base font-bold tracking-tight text-foreground tabular-nums dark:text-white">
                                        ৳{amount}
                                    </strong>

                                    {payment.paid ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            <CheckCircle2 size={12} />
                                            Paid
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                            <LoaderCircle size={12} className="animate-spin" />
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}