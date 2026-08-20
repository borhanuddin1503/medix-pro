import Link from "next/link";
import {
    FaCalendarDay,
    FaClock,
    FaCircleCheck,
    FaHourglassHalf,
    FaCircleXmark,
    FaArrowRight,
    FaCalendarXmark,
} from "react-icons/fa6";

interface Appointment {
    _id: string;
    patientName: string;
    appointmentDate: string;
    appointmentTime?: string;
    status: string;
}

interface TodayAppointmentsProps {
    appointments: Appointment[];
}

const STATUS_STYLES: Record<
    string,
    { label: string; icon: typeof FaCircleCheck; className: string }
> = {
    confirmed: {
        label: "Confirmed",
        icon: FaCircleCheck,
        className:
            "bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400",
    },
    completed: {
        label: "Completed",
        icon: FaCircleCheck,
        className:
            "bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400",
    },
    pending: {
        label: "Pending",
        icon: FaHourglassHalf,
        className:
            "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    },
    cancelled: {
        label: "Cancelled",
        icon: FaCircleXmark,
        className:
            "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    },
};

function getStatusStyle(status: string) {
    return (
        STATUS_STYLES[status.toLowerCase()] ?? {
            label: status,
            icon: FaHourglassHalf,
            className:
                "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
        }
    );
}

function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

export default function TodayAppointments({
    appointments,
}: TodayAppointmentsProps) {
    return (
        <section className="rounded-2xl border border-main/10 bg-background p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:shadow-none sm:p-6 h-full">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400">
                        <FaCalendarDay size={16} />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            Today&apos;s Appointments
                        </h2>

                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                            Upcoming appointments for today
                        </p>
                    </div>
                </div>

                <Link className="group flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-main transition hover:bg-main/10 dark:text-emerald-400 dark:hover:bg-main/15" href={'/dashboard/admin/appointments'}>
                    View all
                    <FaArrowRight
                        size={11}
                        className="transition group-hover:translate-x-0.5"
                    />
                </Link>
            </div>

            {appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-main/20 bg-main/5 py-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400">
                        <FaCalendarXmark size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">
                            No appointments today
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground dark:text-gray-500">
                            New bookings will show up here
                        </p>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-main/10 text-left dark:border-gray-700">
                                <th className="px-3 py-3 font-medium text-muted-foreground dark:text-gray-400">
                                    Patient
                                </th>

                                <th className="px-3 py-3 font-medium text-muted-foreground dark:text-gray-400">
                                    Date
                                </th>

                                <th className="px-3 py-3 font-medium text-muted-foreground dark:text-gray-400">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointments.map((appointment) => {
                                const status = getStatusStyle(
                                    appointment.status
                                );
                                const StatusIcon = status.icon;

                                return (
                                    <tr
                                        key={appointment._id}
                                        className="border-b border-main/10 transition last:border-0 hover:bg-main/5 dark:border-gray-800 dark:hover:bg-gray-800/60"
                                    >
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-main/10 text-xs font-semibold text-main dark:bg-main/15 dark:text-emerald-400">
                                                    {getInitials(
                                                        appointment.patientName
                                                    )}
                                                </div>
                                                <span className="font-medium text-foreground">
                                                    {appointment.patientName}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-3 py-3">
                                            <span className="flex items-center gap-1.5 text-muted-foreground dark:text-gray-400">
                                                <FaClock
                                                    size={11}
                                                    className="shrink-0"
                                                />
                                                {appointment.appointmentDate ??
                                                    "-"}
                                            </span>
                                        </td>

                                        <td className="px-3 py-3">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                                            >
                                                <StatusIcon size={10} />
                                                {status.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}