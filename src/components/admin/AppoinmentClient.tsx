"use client";

import { useEffect, useRef, useState } from "react";
import {
    Search,
    Calendar,
    Phone,
    CreditCard,
    Banknote,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronDown,
    Loader2,
} from "lucide-react";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import Pagination from "../doctors/Pagination";
import { revalidateTags } from "@/app/utils/revalidateTags";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

interface Appointment {
    _id: string;
    patientName: string;
    doctorName: string;
    profile?: string;
    email: string;
    phone: string;
    appointmentDate: string;
    createdAt: string;
    paymentMethod: "ONLINE" | "CASH";
    paid: boolean;
    status: AppointmentStatus;
    reason?: string;
}

interface PaginationData {
    currentPage: number;
    limit: number;
    totalAppointments: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface ClientAppointmentsProps {
    initialAppointments: Appointment[];
    initialPagination: PaginationData;
}

const limitOptions = [5, 10, 20, 50];

const statusOptions: AppointmentStatus[] = [
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
];

const statusStyles: Record<AppointmentStatus, string> = {
    PENDING:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    CONFIRMED:
        "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    COMPLETED:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    CANCELLED:
        "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const statusIcons: Record<AppointmentStatus, React.ElementType> = {
    PENDING: Clock,
    CONFIRMED: CheckCircle2,
    COMPLETED: CheckCircle2,
    CANCELLED: XCircle,
};

/**
 * NOTE: the two endpoints below are assumed — adjust the paths to match
 * your actual admin API routes if they differ.
 *   PATCH /api/admin/appointments/:id/status   body: { status }
 *   PATCH /api/admin/appointments/:id/payment  body: { paid }
 */
export default function ClientAppointments({
    initialAppointments,
    initialPagination,
}: ClientAppointmentsProps) {
    const [appointments, setAppointments] =
        useState<Appointment[]>(initialAppointments);

    const [pagination, setPagination] =
        useState<PaginationData>(initialPagination);

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState<number>(initialPagination.limit || 10);
    const [isLimitOpen, setIsLimitOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [openStatusRow, setOpenStatusRow] = useState<string | null>(null);
    const [rowLoading, setRowLoading] = useState<Record<string, "status" | "payment" | null>>({});
    const isInitialRender = useRef(true);

    // =========================
    // Fetch Appointments
    // =========================
    const fetchAppointments = async ({
        page,
        searchValue,
        limitValue,
    }: {
        page: number;
        searchValue?: string;
        limitValue: number;
    }) => {
        try {
            setIsPending(true);

            const params = new URLSearchParams({
                page: String(page),
                limit: String(limitValue),
            });

            if (searchValue?.trim()) {
                params.set("search", searchValue.trim());
            }

            const result = await fetchWithAuth(
                `/api/dashboard/appointments?${params.toString()}`,
                {
                    method: "GET",
                    tags: ['appoientments', `appoientments-${page}`]
                }

            );

            if (result.status < 200 || result.status >= 300) {
                throw new Error(
                    result.data?.message || "Failed to fetch appointments"
                );
            }

            setAppointments(result.data.data.appointments);
            setPagination(result.data.data.pagination);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
            throw new Error(
                "Failed to fetch appointments"
            );
        } finally {
            setIsPending(false);
        }
    };

    // =========================
    // Search / limit
    // =========================


    const prevFilters = useRef({
        search: "",
        limit: initialPagination.limit || 10,
    });

    useEffect(() => {
        const filtersChanged =
            search !== prevFilters.current.search ||
            limit !== prevFilters.current.limit;

        if (!filtersChanged) return;

        const timeout = setTimeout(() => {
            console.log('fatching data fro appoinment client')
            prevFilters.current = { search, limit };
            fetchAppointments({ page: 1, searchValue: search, limitValue: limit });
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, limit]);

    // =========================
    // Pagination
    // =========================
    const handlePageChange = async (page: number) => {
        await fetchAppointments({ page, searchValue: search, limitValue: limit });
    };

    // =========================
    // Status change
    // =========================
    const handleStatusChange = async (
        id: string,
        newStatus: AppointmentStatus
    ) => {
        setOpenStatusRow(null);

        const previous = appointments;

        setAppointments((prev) =>
            prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
        );

        try {
            setRowLoading((prev) => ({ ...prev, [id]: "status" }));

            const result = await fetchWithAuth(
                `/api/dashboard/appointments/status/${id}`,
                {
                    method: "PATCH",
                    body: { status: newStatus },
                }
            );

            if (result.status < 200 || result.status >= 300) {
                throw new Error("Failed to update status");
            }

            revalidateTags(['appoientments'])
        } catch (error) {
            console.error("Failed to update appointment status:", error);
            setAppointments(previous);
        } finally {
            setRowLoading((prev) => ({ ...prev, [id]: null }));
        }
    };

    // =========================
    // Payment toggle (cash only)
    // =========================
    const handleTogglePaid = async (id: string, currentPaid: boolean) => {
        const previous = appointments;

        setAppointments((prev) =>
            prev.map((a) => (a._id === id ? { ...a, paid: !currentPaid } : a))
        );

        try {
            setRowLoading((prev) => ({ ...prev, [id]: "payment" }));

            const result = await fetchWithAuth(
                `/api/dashboard/appointments/status/${id}`,
                {
                    method: "PATCH",
                    body: { paid: !currentPaid },
                }
            );

            if (result.status < 200 || result.status >= 300) {
                throw new Error("Failed to update payment status");
            }
            revalidateTags(['appoientments'])
        } catch (error) {
            console.error("Failed to update payment status:", error);
            setAppointments(previous);
        } finally {
            setRowLoading((prev) => ({ ...prev, [id]: null }));
        }
    };

    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground dark:text-white">
                        Appointments
                    </h1>

                    <p className="mt-1 text-sm text-foreground/60 dark:text-white/40">
                        Manage all appointments from here.
                    </p>
                </div>

                <div className="rounded-xl bg-main/10 px-4 py-2 text-sm dark:bg-main/15">
                    Total Appointments:{" "}
                    <span className="font-semibold text-main dark:text-emerald-400">
                        {pagination.totalAppointments}
                    </span>
                </div>
            </div>

            {/* ================= FILTER ================= */}

            <div className="flex  gap-3 rounded-2xl border border-main/10 bg-main/5 p-4 dark:border-gray-700 dark:bg-white/[0.03] md:flex-row md:justify-between">
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 dark:text-white/40"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by patient, doctor, phone..."
                        className="h-11 w-full rounded-xl border border-main/10 bg-background pl-10 pr-4 text-foreground outline-none transition focus:border-main dark:border-gray-700 dark:bg-white/[0.03] dark:text-white"
                    />
                </div>

                {/* items per page */}
                <div className="relative shrink-0">
                    <button
                        type="button"
                        onClick={() => setIsLimitOpen((prev) => !prev)}
                        className="flex h-11 min-w-28 items-center justify-between gap-3 rounded-xl border border-main/10 bg-background px-4 text-sm font-medium text-foreground transition hover:border-main/30 dark:border-gray-700 dark:bg-white/[0.03] dark:text-white"
                    >
                        <span>{limit} / page</span>

                        <ChevronDown
                            size={16}
                            className={`transition-transform ${isLimitOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {isLimitOpen && (
                        <div className="absolute right-0 z-20 mt-1 w-28 overflow-hidden rounded-xl border border-main/10 bg-background p-1 text-center shadow-lg dark:border-gray-700 dark:bg-gray-900">
                            {limitOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                        setLimit(option);
                                        setIsLimitOpen(false);
                                    }}
                                    className={`w-full rounded-lg px-3 py-2 text-center text-sm transition ${limit === option
                                        ? "bg-main text-white"
                                        : "text-foreground hover:bg-main/10 hover:text-main dark:text-white dark:hover:bg-main/15"
                                        }`}
                                >
                                    {option} / page
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ================= TABLE ================= */}

            <div className="relative overflow-hidden rounded-2xl border border-main/10 bg-background dark:border-gray-700 dark:bg-white/[0.03]">
                {isPending && (
                    <div className="absolute left-0 right-0 top-0 z-10 h-1 overflow-hidden bg-main/10 dark:bg-main/15">
                        <div className="h-full w-1/3 animate-[loading-slide_1s_ease-in-out_infinite] bg-main" />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] text-sm">
                        <thead>
                            <tr className="border-b border-main/10 bg-main/5 text-left dark:border-gray-700 dark:bg-white/[0.04]">
                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    Patient
                                </th>
                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    Doctor
                                </th>
                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Date
                                </th>
                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Contact
                                </th>
                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Payment
                                </th>
                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isPending ? (
                                <SkeletonRows rows={limit} />
                            ) : appointments.length > 0 ? (
                                appointments.map((appt) => {
                                    const StatusIcon = statusIcons[appt.status];
                                    const isStatusLoading = rowLoading[appt._id] === "status";
                                    const isPaymentLoading = rowLoading[appt._id] === "payment";

                                    return (
                                        <tr
                                            key={appt._id}
                                            className="border-b border-main/5 transition hover:bg-main/5 dark:border-white/5 dark:hover:bg-white/5"
                                        >
                                            {/* Patient */}
                                            <td className="px-5 py-4">
                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-foreground dark:text-white">
                                                        {appt.patientName}
                                                    </p>
                                                    <p className="truncate text-xs text-foreground/50 dark:text-white/40">
                                                        {appt.email}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Doctor */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {appt.profile ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={appt.profile}
                                                            alt={appt.patientName}
                                                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main/10 text-sm font-bold text-main dark:bg-main/15 dark:text-emerald-400">
                                                            {appt.patientName
                                                                ?.charAt(0)
                                                                .toUpperCase() || "?"}
                                                        </div>
                                                    )}
                                                    <span className="rounded-lg bg-main/10 px-3 py-1.5 text-xs font-medium text-main dark:bg-main/15 dark:text-emerald-400">
                                                        {appt.doctorName}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-center text-foreground/80 dark:text-white/70">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Calendar size={13} />
                                                    {appt.appointmentDate}
                                                </span>
                                            </td>

                                            {/* Contact */}
                                            <td className="px-5 py-4 text-center text-foreground/80 dark:text-white/70">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Phone size={13} />
                                                    {appt.phone || "N/A"}
                                                </span>
                                            </td>

                                            {/* Payment */}
                                            <td className="px-5 py-4 text-center">
                                                {appt.paymentMethod === "ONLINE" ? (
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${appt.paid
                                                            ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                                                            }`}
                                                    >
                                                        <CreditCard size={13} />
                                                        {appt.paid ? "Paid" : "Pending"}
                                                    </span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        disabled={isPaymentLoading}
                                                        onClick={() =>
                                                            handleTogglePaid(appt._id, appt.paid)
                                                        }
                                                        className={`cursor-pointer   inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${appt.paid
                                                            ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-500/15 dark:text-green-400 dark:hover:bg-green-500/25"
                                                            : "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-500/15 dark:text-orange-400 dark:hover:bg-orange-500/25"
                                                            }`}
                                                    >
                                                        {isPaymentLoading ? (
                                                            <Loader2 size={13} className="animate-spin" />
                                                        ) : (
                                                            <Banknote size={13} />
                                                        )}
                                                        {appt.paid ? "Cash • Paid" : "Cash • Mark Paid"}
                                                    </button>
                                                )}
                                            </td>

                                            {/* Status (editable) */}
                                            <td className="px-5 py-4 text-center">
                                                <div className="relative inline-block">
                                                    <button
                                                        type="button"
                                                        disabled={isStatusLoading}
                                                        onClick={() =>
                                                            setOpenStatusRow((prev) =>
                                                                prev === appt._id ? null : appt._id
                                                            )
                                                        }
                                                        className={`cursor-pointer inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${statusStyles[appt.status]}`}
                                                    >
                                                        {isStatusLoading ? (
                                                            <Loader2 size={13} className="animate-spin" />
                                                        ) : (
                                                            <StatusIcon size={13} />
                                                        )}
                                                        {appt.status}
                                                        <ChevronDown size={12} />
                                                    </button>

                                                    {openStatusRow === appt._id && (
                                                        <div className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-xl border border-main/10 bg-background p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                                            {statusOptions.map((option) => (
                                                                <button
                                                                    key={option}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleStatusChange(appt._id, option)
                                                                    }
                                                                    className={`cursor-pointer w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition ${appt.status === option
                                                                        ? "bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400"
                                                                        : "text-foreground hover:bg-main/5 dark:text-white dark:hover:bg-white/5"
                                                                        }`}
                                                                >
                                                                    {option}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : null}
                        </tbody>
                    </table>
                </div>

                {/* Empty */}
                {!isPending && appointments.length === 0 && (
                    <div className="py-16 text-center">
                        <Calendar className="mx-auto mb-3 h-10 w-10 text-foreground/20 dark:text-white/20" />

                        <p className="font-medium text-foreground dark:text-white">
                            {search ? "No appointments found" : "No appointments available"}
                        </p>

                        <p className="mt-1 text-sm text-foreground/50 dark:text-white/40">
                            {search
                                ? "Try a different search term."
                                : "Appointments will appear here once booked."}
                        </p>
                    </div>
                )}
            </div>

            {/* ================= PAGINATION ================= */}

            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                isPending={isPending}
            />

            <style>{`
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
        </div>
    );
}

/* =========================
   Skeleton Row Component
========================= */

function SkeletonRows({ rows }: { rows: number }) {
    const pulse = "animate-[skeleton-pulse_1.4s_ease-in-out_infinite]";

    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <tr key={i} className="border-b border-main/5 dark:border-white/5">
                    <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 shrink-0 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`} />
                            <div className="min-w-0 flex-1 space-y-2">
                                <div className={`h-3.5 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`} />
                                <div className={`h-3 w-32 rounded bg-main/10 dark:bg-white/10 ${pulse}`} />
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-4">
                        <div className={`h-6 w-28 rounded-lg bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                    <td className="px-5 py-4">
                        <div className={`mx-auto h-3.5 w-20 rounded bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                    <td className="px-5 py-4">
                        <div className={`mx-auto h-3.5 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                    <td className="px-5 py-4">
                        <div className={`mx-auto h-6 w-24 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                    <td className="px-5 py-4">
                        <div className={`mx-auto h-6 w-24 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`} />
                    </td>
                </tr>
            ))}
        </>
    );
}