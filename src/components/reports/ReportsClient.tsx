"use client";

import { useEffect, useRef, useState } from "react";
import {
    Search,
    ChevronDown,
    FileText,
    CalendarDays,
} from "lucide-react";
import { toast } from "sonner";

import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import Pagination from "@/components/doctors/Pagination";
import { IGetReportsResponse, IReport, ReportsClientProps } from "@/types/reports/reports.types";


const limitOptions = [5, 10, 20, 50];

const statusStyles: Record<string, string> = {
    COMPLETED:
        "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    PENDING:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    CANCELLED:
        "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    APPROVED:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
};

export default function ReportsClient({
    initialReports,
    initialPagination,
}: ReportsClientProps) {
    const [reports, setReports] = useState<IReport[]>(initialReports);

    const [pagination, setPagination] = useState({
        page: initialPagination?.page ?? 1,
        limit: initialPagination?.limit ?? 10,
        total: initialPagination?.total ?? initialReports.length,
        totalPages: initialPagination?.totalPages ?? 1,
    });

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(
        initialPagination?.limit ?? 10
    );

    const [isLimitOpen, setIsLimitOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const prevFilters = useRef({
        search: "",
        limit: initialPagination?.limit ?? 10,
    });

    // =========================
    // Fetch Reports
    // =========================

    const fetchReports = async ({
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

            const result = await fetchWithAuth<IGetReportsResponse>(
                `/api/reports?${params.toString()}`,
                {
                    method: "GET",
                    tags: ["reports"],
                }
            );

            if (
                result.status < 200 ||
                result.status >= 300 ||
                !result.data?.data
            ) {
                throw new Error(
                    result.error?.message || "Failed to fetch reports"
                );
            }

            setReports(result.data.data.reports);

            if (result.data.data.pagination) {
                setPagination(result.data.data.pagination);
            }
        } catch (error) {
            console.error("Failed to fetch reports:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to load reports"
            );
        } finally {
            setIsPending(false);
        }
    };

    // =========================
    // Search / Limit
    // =========================

    useEffect(() => {
        const filtersChanged =
            search !== prevFilters.current.search ||
            limit !== prevFilters.current.limit;

        if (!filtersChanged) return;

        const timeout = setTimeout(() => {
            prevFilters.current = { search, limit };

            fetchReports({
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
        await fetchReports({
            page,
            searchValue: search,
            limitValue: limit,
        });
    };

    // =========================
    // Format Date
    // =========================

    const formatDate = (date?: string) => {
        if (!date) return "N/A";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "N/A";
        }

        return parsedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground dark:text-white">
                        Medical Reports
                    </h1>

                    <p className="mt-1 text-sm text-foreground/60 dark:text-white/40">
                        View and manage all medical reports.
                    </p>
                </div>

                <div className="rounded-xl bg-main/10 px-4 py-2 text-sm dark:bg-main/15">
                    Total Reports:{" "}
                    <span className="font-semibold text-main dark:text-emerald-400">
                        {pagination.total}
                    </span>
                </div>
            </div>

            {/* ================= FILTER ================= */}

            <div className="flex flex-col gap-3 rounded-2xl border border-main/10 bg-main/5 p-4 dark:border-gray-700 dark:bg-white/[0.03] md:flex-row md:justify-between">
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 dark:text-white/40"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by report name, type, result..."
                        className="h-11 w-full rounded-xl border border-main/10 bg-background pl-10 pr-4 text-foreground outline-none transition focus:border-main dark:border-gray-700 dark:bg-white/[0.03] dark:text-white"
                    />
                </div>

                {/* Items per page */}

                <div className="relative shrink-0">
                    <button
                        type="button"
                        onClick={() =>
                            setIsLimitOpen((prev) => !prev)
                        }
                        className="flex h-11 min-w-28 items-center justify-between gap-3 rounded-xl border border-main/10 bg-background px-4 text-sm font-medium text-foreground transition hover:border-main/30 dark:border-gray-700 dark:bg-white/[0.03] dark:text-white"
                    >
                        <span>{limit} / page</span>

                        <ChevronDown
                            size={16}
                            className={`transition-transform ${isLimitOpen ? "rotate-180" : ""
                                }`}
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
                    <table className="w-full min-w-[1050px] text-sm">
                        <thead>
                            <tr className="border-b border-main/10 bg-main/5 text-left dark:border-gray-700 dark:bg-white/[0.04]">
                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    Report
                                </th>

                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    Report Type
                                </th>

                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    Result
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Test Date
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Report Date
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isPending ? (
                                <ReportSkeletonRows rows={limit} />
                            ) : reports.length > 0 ? (
                                reports.map((report, index) => (
                                    <tr
                                        key={`${report.appointmentId}-${index}`}
                                        className="border-b border-main/5 transition hover:bg-main/5 dark:border-white/5 dark:hover:bg-white/5"
                                    >
                                        {/* Report */}

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {report.image ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={report.image}
                                                        alt={report.name}
                                                        className="h-11 w-11 rounded-xl border border-main/10 object-cover dark:border-gray-700"
                                                    />
                                                ) : (
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400">
                                                        <FileText size={20} />
                                                    </div>
                                                )}

                                                <div className="max-w-48">
                                                    <p className="font-semibold text-foreground dark:text-white">
                                                        {report.name}
                                                    </p>

                                                    <p className="mt-1 truncate text-xs text-foreground/50 dark:text-white/40">
                                                        {report.description || "No description"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Report Type */}

                                        <td className="px-5 py-4">
                                            <span className="rounded-lg bg-main/10 px-3 py-1.5 text-xs font-medium text-main dark:bg-main/15 dark:text-emerald-400">
                                                {report.reportType || "N/A"}
                                            </span>
                                        </td>

                                        {/* Result */}

                                        <td className="px-5 py-4">
                                            <div className="max-w-48">
                                                <p className="truncate text-foreground/80 dark:text-white/70">
                                                    {report.result || "N/A"}
                                                </p>

                                                {report.remarks && (
                                                    <p className="mt-1 truncate text-xs text-foreground/50 dark:text-white/40">
                                                        {report.remarks}
                                                    </p>
                                                )}
                                            </div>
                                        </td>

                                        {/* Test Date */}

                                        <td className="px-5 py-4 text-center">
                                            <div className="inline-flex items-center gap-2 text-foreground/70 dark:text-white/70">
                                                <CalendarDays
                                                    size={15}
                                                    className="text-main"
                                                />

                                                {formatDate(report.testDate)}
                                            </div>
                                        </td>

                                        {/* Report Date */}

                                        <td className="px-5 py-4 text-center text-foreground/70 dark:text-white/70">
                                            {formatDate(report.reportDate)}
                                        </td>

                                        {/* Status */}

                                        <td className="px-5 py-4 text-center">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[
                                                    report.status?.toUpperCase()
                                                    ] ??
                                                    "bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-300"
                                                    }`}
                                            >
                                                {report.status || "N/A"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <FileText
                                                size={36}
                                                className="mb-3 text-foreground/30 dark:text-white/30"
                                            />

                                            <p className="font-medium text-foreground dark:text-white">
                                                {search
                                                    ? "No reports found"
                                                    : "No reports available"}
                                            </p>

                                            <p className="mt-1 text-sm text-foreground/50 dark:text-white/40">
                                                {search
                                                    ? "Try a different search term."
                                                    : "Medical reports will appear here."}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= PAGINATION ================= */}

            <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                isPending={isPending}
            />

            {/* ================= ANIMATIONS ================= */}

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

// =========================
// Skeleton
// =========================

function ReportSkeletonRows({ rows }: { rows: number }) {
    const pulse =
        "animate-[skeleton-pulse_1.4s_ease-in-out_infinite]";

    return (
        <>
            {Array.from({ length: rows }).map((_, index) => (
                <tr
                    key={index}
                    className="border-b border-main/5 dark:border-white/5"
                >
                    {Array.from({ length: 6 }).map((_, column) => (
                        <td key={column} className="px-5 py-5">
                            <div
                                className={`mx-auto h-4 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                            />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}