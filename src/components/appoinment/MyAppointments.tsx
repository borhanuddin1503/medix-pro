"use client";

import Image from "next/image";
import {
    CalendarDays,
    Clock,
    CreditCard,
    Banknote,
    CheckCircle2,
    LoaderCircle,
} from "lucide-react";

type Props = {
    appointments: any;
};

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

export default function MyAppointments({ appointments }: Props) {
    const data = appointments.data.data ?? [];

    if (!data?.length) {
        return (
            <div className="rounded-3xl border border-main/10 bg-background py-16 text-center">
                <CalendarDays className="mx-auto mb-4 h-12 w-12 text-main/40" />
                <h2 className="text-xl font-bold text-foreground">
                    No Appointments Yet
                </h2>
                <p className="mt-2 text-sm text-foreground/60">
                    You haven't booked any appointments yet.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {data.map((appointment: any) => {
                const fee =
                    appointment.amount
                        ? appointment.amount / 100
                        : appointment.doctorId?.fees;

                return (
                    <div
                        key={appointment._id}
                        className="rounded-2xl border border-main/10  dark:border-gray-700  bg-background p-4 shadow-sm transition hover:shadow-md sm:p-5"
                    >
                        <div className="flex items-start gap-3">
                            <Image
                                src={
                                    appointment.doctorId?.profileImage ||
                                    "/doctor-placeholder.png"
                                }
                                alt={appointment.doctorId?.name}
                                width={64}
                                height={64}
                                className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16"
                            />

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <h3 className="truncate text-base font-bold text-foreground sm:text-lg">
                                            {appointment.doctorId?.name}
                                        </h3>

                                        <p className="text-sm text-main">
                                            {appointment.doctorId?.specialization}
                                        </p>
                                    </div>

                                    <div className="flex shrink-0 flex-col items-end gap-1">
                                        <span
                                            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                                                statusStyles[
                                                    appointment.status as keyof typeof statusStyles
                                                ]
                                            }`}
                                        >
                                            {appointment.status}
                                        </span>

                                        <p className="text-[11px] font-medium tracking-wide text-foreground/40 py-0.5 px-3 rounded-full border border-main/30 mt-1">
                                            #{appointment._id.slice(-6).toUpperCase()}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/60 sm:text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <CalendarDays size={14} />
                                        {appointment.appointmentDate}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        {appointment.doctorId?.availableTime}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: fee + payment status */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-main/10 pt-3 dark:border-gray-700">
                            <p className="text-sm font-semibold text-main">
                                Fee: ৳ {fee}
                            </p>

                            {appointment.paymentMethod === "ONLINE" ? (
                                appointment.paid ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        <CheckCircle2 size={14} />
                                        Paid
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                        <LoaderCircle size={14} className="animate-spin" />
                                        Payment Pending
                                    </span>
                                )
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70">
                                    <Banknote size={14} className="text-main" />
                                    Cash Payment
                                </span>
                            )}
                        </div>

                        {appointment.reason && (
                            <p className="mt-2 text-xs text-foreground/60 sm:text-sm">
                                <span className="font-semibold text-main">Reason: </span>
                                {appointment.reason}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}