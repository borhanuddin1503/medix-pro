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
    ChevronDown,
    Loader2,
    Wallet,
} from "lucide-react";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import Pagination from "../doctors/Pagination";
import { toast } from "sonner";
import { revalidateTags } from "@/app/utils/revalidateTags";

type AppointmentStatus =
    | "PENDING"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";

export interface PaymentAppointment {
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

export interface IGetPaymentsResponse {
    success: boolean;
    message?: string;
    data?: {
        appointments: PaymentAppointment[];
        pagination: PaginationData;
    };
}
export interface IGetPaymentUpdateResponse {
    success: boolean;
    message?: string;
    data?: PaymentAppointment;
}

interface ClientPaymentsProps {
    initialPayments: PaymentAppointment[];
    initialPagination: PaginationData;
}

const limitOptions = [5, 10, 20, 50];

export default function PaymentsClient({
    initialPayments,
    initialPagination,
}: ClientPaymentsProps) {
    const [payments, setPayments] =
        useState<PaymentAppointment[]>(initialPayments);

    const [pagination, setPagination] =
        useState<PaginationData>(initialPagination);

    const [search, setSearch] = useState("");

    const [limit, setLimit] = useState<number>(
        initialPagination.limit || 10
    );

    const [isLimitOpen, setIsLimitOpen] = useState(false);

    const [isPending, setIsPending] = useState(false);

    const [rowLoading, setRowLoading] = useState<
        Record<string, "payment" | null>
    >({});

    // =========================
    // Fetch Payments
    // =========================

    const fetchPayments = async ({
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

            const result = await fetchWithAuth<IGetPaymentsResponse>(
                `/api/dashboard/appointments?${params.toString()}`,
                {
                    method: "GET",
                    tags: ["admin-appointments", `admin-appointments-${page}`],
                }
            );

            if (
                result.status < 200 ||
                result.status >= 300 ||
                !result.data?.data
            ) {
                throw new Error(
                    result.error?.message ||
                    "Failed to fetch payments"
                );
            }

            setPayments(result.data.data.appointments);
            setPagination(result.data.data.pagination);
        } catch (error) {
            console.error(
                "Failed to fetch payments:",
                error
            );
        } finally {
            setIsPending(false);
        }
    };

    // =========================
    // Search / Limit
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
            prevFilters.current = {
                search,
                limit,
            };

            fetchPayments({
                page: 1,
                searchValue: search,
                limitValue: limit,
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, limit]);

    // =========================
    // Pagination
    // =========================

    const handlePageChange = async (page: number) => {
        await fetchPayments({
            page,
            searchValue: search,
            limitValue: limit,
        });
    };

    // =========================
    // Payment Toggle
    // =========================

    const handleTogglePaid = async (
        id: string,
        currentPaid: boolean
    ) => {
        const previous = payments;

        // Optimistic update
        setPayments((prev) =>
            prev.map((payment) =>
                payment._id === id
                    ? {
                        ...payment,
                        paid: !currentPaid,
                    }
                    : payment
            )
        );

        try {
            setRowLoading((prev) => ({
                ...prev,
                [id]: "payment",
            }));

            const result = await fetchWithAuth<IGetPaymentUpdateResponse>(
                `/api/dashboard/appointments/status/${id}`,
                {
                    method: "PATCH",
                    body: {
                        paid: !currentPaid,
                    },
                }
            );


            if (
                result.status < 200 ||
                result.status >= 300
            ) {
                throw new Error(
                    "Failed to update payment status"
                );
            }

            result.data?.data?.paid ? toast.success(`markeed paid ${result.data?.data?.patientName}s appoinment successfully `) : toast.info(`markeed Unpaid ${result.data?.data?.patientName}s appoinment successfully`);

            revalidateTags(["admin-appointments", 'appoientments-admin' , 'appoientments'])
        } catch (error) {
            console.error(
                "Failed to update payment status:",
                error
            );

            // Rollback
            setPayments(previous);
        } finally {
            setRowLoading((prev) => ({
                ...prev,
                [id]: null,
            }));
        }
    };


    // =========================
    // Payment Statistics
    // =========================

    const paidCount = payments.filter(
        (payment) => payment.paid
    ).length;

    const unpaidCount = payments.filter(
        (payment) => !payment.paid
    ).length;

    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground dark:text-white">
                        Payments
                    </h1>

                    <p className="mt-1 text-sm text-foreground/60 dark:text-white/40">
                        Manage and monitor all patient payments.
                    </p>
                </div>

                <div className="rounded-xl bg-main/10 px-4 py-2 text-sm dark:bg-main/15">
                    Total Payments:{" "}
                    <span className="font-semibold text-main dark:text-emerald-400">
                        {pagination.totalAppointments}
                    </span>
                </div>
            </div>

            {/* ================= PAYMENT SUMMARY ================= */}

            <div className="grid gap-4 sm:grid-cols-3">
                {/* Total */}
                <div className="rounded-2xl border border-main/10 bg-main/5 p-4 dark:border-gray-700 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-foreground/60 dark:text-white/40">
                                Total
                            </p>

                            <p className="mt-1 text-2xl font-bold text-foreground dark:text-white">
                                {pagination.totalAppointments}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 dark:bg-main/15">
                            <Wallet
                                size={20}
                                className="text-main dark:text-emerald-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Paid */}
                <div className="rounded-2xl border border-green-500/10 bg-green-500/5 p-4 dark:border-green-500/20 dark:bg-green-500/[0.05]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-foreground/60 dark:text-white/40">
                                Paid
                            </p>

                            <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                                {paidCount}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                            <CheckCircle2
                                size={20}
                                className="text-green-600 dark:text-green-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Unpaid */}
                <div className="rounded-2xl border border-orange-500/10 bg-orange-500/5 p-4 dark:border-orange-500/20 dark:bg-orange-500/[0.05]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-foreground/60 dark:text-white/40">
                                Unpaid
                            </p>

                            <p className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
                                {unpaidCount}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                            <Clock
                                size={20}
                                className="text-orange-600 dark:text-orange-400"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= FILTER ================= */}

            <div className="flex gap-3 rounded-2xl border border-main/10 bg-main/5 p-4 dark:border-gray-700 dark:bg-white/[0.03] md:flex-row md:justify-between">
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 dark:text-white/40"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search by patient, doctor, phone..."
                        className="h-11 w-full rounded-xl border border-main/10 bg-background pl-10 pr-4 text-foreground outline-none transition focus:border-main dark:border-gray-700 dark:bg-white/[0.03] dark:text-white"
                    />
                </div>

                {/* Items per page */}
                <div className="relative shrink-0">
                    <button
                        type="button"
                        onClick={() =>
                            setIsLimitOpen(
                                (prev) => !prev
                            )
                        }
                        className="flex h-11 min-w-28 items-center justify-between gap-3 rounded-xl border border-main/10 bg-background px-4 text-sm font-medium text-foreground transition hover:border-main/30 dark:border-gray-700 dark:bg-white/[0.03] dark:text-white"
                    >
                        <span>{limit} / page</span>

                        <ChevronDown
                            size={16}
                            className={`transition-transform ${isLimitOpen
                                ? "rotate-180"
                                : ""
                                }`}
                        />
                    </button>

                    {isLimitOpen && (
                        <div className="absolute right-0 z-20 mt-1 w-28 overflow-hidden rounded-xl border border-main/10 bg-background p-1 text-center shadow-lg dark:border-gray-700 dark:bg-gray-900">
                            {limitOptions.map(
                                (option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                            setLimit(
                                                option
                                            );
                                            setIsLimitOpen(
                                                false
                                            );
                                        }}
                                        className={`w-full rounded-lg px-3 py-2 text-center text-sm transition ${limit ===
                                            option
                                            ? "bg-main text-white"
                                            : "text-foreground hover:bg-main/10 hover:text-main dark:text-white dark:hover:bg-main/15"
                                            }`}
                                    >
                                        {option} / page
                                    </button>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ================= TABLE ================= */}

            <div className="relative overflow-hidden rounded-2xl border border-main/10 bg-background dark:border-gray-700 dark:bg-white/[0.03]">
                {/* Loading bar */}
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
                                    Method
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Payment
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isPending ? (
                                <SkeletonRows
                                    rows={limit}
                                />
                            ) : payments.length > 0 ? (
                                payments.map(
                                    (payment) => {
                                        const isPaymentLoading =
                                            rowLoading[
                                            payment._id
                                            ] ===
                                            "payment";

                                        return (
                                            <tr
                                                key={
                                                    payment._id
                                                }
                                                className="border-b border-main/5 transition hover:bg-main/5 dark:border-white/5 dark:hover:bg-white/5"
                                            >
                                                {/* Patient */}
                                                <td className="px-5 py-4">
                                                    <div className="min-w-0">
                                                        <p className="truncate font-semibold text-foreground dark:text-white">
                                                            {
                                                                payment.patientName
                                                            }
                                                        </p>

                                                        <p className="truncate text-xs text-foreground/50 dark:text-white/40">
                                                            {
                                                                payment.email
                                                            }
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Doctor */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {payment.profile ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img
                                                                src={
                                                                    payment.profile
                                                                }
                                                                alt={
                                                                    payment.doctorName
                                                                }
                                                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main/10 text-sm font-bold text-main dark:bg-main/15 dark:text-emerald-400">
                                                                {payment.doctorName
                                                                    ?.charAt(
                                                                        0
                                                                    )
                                                                    .toUpperCase() ||
                                                                    "?"}
                                                            </div>
                                                        )}

                                                        <span className="rounded-lg bg-main/10 px-3 py-1.5 text-xs font-medium text-main dark:bg-main/15 dark:text-emerald-400">
                                                            {
                                                                payment.doctorName
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Date */}
                                                <td className="px-5 py-4 text-center text-foreground/80 dark:text-white/70">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Calendar
                                                            size={
                                                                13
                                                            }
                                                        />

                                                        {
                                                            payment.appointmentDate
                                                        }
                                                    </span>
                                                </td>

                                                {/* Contact */}
                                                <td className="px-5 py-4 text-center text-foreground/80 dark:text-white/70">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Phone
                                                            size={
                                                                13
                                                            }
                                                        />

                                                        {payment.phone ||
                                                            "N/A"}
                                                    </span>
                                                </td>

                                                {/* Method */}
                                                <td className="px-5 py-4 text-center">
                                                    {payment.paymentMethod ===
                                                        "ONLINE" ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                                                            <CreditCard
                                                                size={
                                                                    13
                                                                }
                                                            />
                                                            ONLINE
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                                                            <Banknote
                                                                size={
                                                                    13
                                                                }
                                                            />
                                                            CASH
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Payment Status */}
                                                <td className="px-5 py-4 text-center">
                                                    {payment.paymentMethod ===
                                                        "ONLINE" ? (
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${payment.paid
                                                                ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                                                                }`}
                                                        >
                                                            {payment.paid ? (
                                                                <CheckCircle2
                                                                    size={
                                                                        13
                                                                    }
                                                                />
                                                            ) : (
                                                                <Clock
                                                                    size={
                                                                        13
                                                                    }
                                                                />
                                                            )}

                                                            {payment.paid
                                                                ? "Paid"
                                                                : "Pending"}
                                                        </span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                isPaymentLoading
                                                            }
                                                            onClick={() =>
                                                                handleTogglePaid(
                                                                    payment._id,
                                                                    payment.paid
                                                                )
                                                            }
                                                            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${payment.paid
                                                                ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-500/15 dark:text-green-400 dark:hover:bg-green-500/25"
                                                                : "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-500/15 dark:text-orange-400 dark:hover:bg-orange-500/25"
                                                                }`}
                                                        >
                                                            {isPaymentLoading ? (
                                                                <Loader2
                                                                    size={
                                                                        13
                                                                    }
                                                                    className="animate-spin"
                                                                />
                                                            ) : (
                                                                <Banknote
                                                                    size={
                                                                        13
                                                                    }
                                                                />
                                                            )}

                                                            {payment.paid
                                                                ? "Cash • Paid"
                                                                : "Cash • Mark Paid"}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            ) : null}
                        </tbody>
                    </table>
                </div>

                {/* ================= EMPTY ================= */}

                {!isPending &&
                    payments.length === 0 && (
                        <div className="py-16 text-center">
                            <CreditCard className="mx-auto mb-3 h-10 w-10 text-foreground/20 dark:text-white/20" />

                            <p className="font-medium text-foreground dark:text-white">
                                {search
                                    ? "No payments found"
                                    : "No payments available"}
                            </p>

                            <p className="mt-1 text-sm text-foreground/50 dark:text-white/40">
                                {search
                                    ? "Try a different search term."
                                    : "Payments will appear here once appointments are booked."}
                            </p>
                        </div>
                    )}
            </div>

            {/* ================= PAGINATION ================= */}

            <Pagination
                currentPage={
                    pagination.currentPage
                }
                totalPages={
                    pagination.totalPages
                }
                onPageChange={
                    handlePageChange
                }
                isPending={isPending}
            />

            <style>{`
                @keyframes loading-slide {
                    0% {
                        transform: translateX(-100%);
                    }

                    50% {
                        transform: translateX(150%);
                    }

                    100% {
                        transform: translateX(-100%);
                    }
                }

                @keyframes skeleton-pulse {
                    0%,
                    100% {
                        opacity: 0.5;
                    }

                    50% {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}

/* =========================
   Skeleton Row Component
========================= */

function SkeletonRows({
    rows,
}: {
    rows: number;
}) {
    const pulse =
        "animate-[skeleton-pulse_1.4s_ease-in-out_infinite]";

    return (
        <>
            {Array.from({
                length: rows,
            }).map((_, i) => (
                <tr
                    key={i}
                    className="border-b border-main/5 dark:border-white/5"
                >
                    {/* Patient */}
                    <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div
                                className={`h-10 w-10 shrink-0 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`}
                            />

                            <div className="min-w-0 flex-1 space-y-2">
                                <div
                                    className={`h-3.5 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                                />

                                <div
                                    className={`h-3 w-32 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                                />
                            </div>
                        </div>
                    </td>

                    {/* Doctor */}
                    <td className="px-5 py-4">
                        <div
                            className={`h-6 w-28 rounded-lg bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-3.5 w-20 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-3.5 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    {/* Method */}
                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-6 w-20 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-6 w-28 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>
                </tr>
            ))}
        </>
    );
}