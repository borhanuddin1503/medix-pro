
"use client";

import React, { useEffect, useState } from "react";
import {
    Search,
    Users,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
} from "lucide-react";
import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import Pagination from "../doctors/Pagination";
import SkeletonRows from "../dashboard/SkeletonRows";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";

interface Patient {
    _id: string;
    name: string;
    email: string;
    phone: string;
    totalAppointments: number;
    successfulAppointments: number;
    lastAppointmentDate: string;
}

interface PaginationData {
    currentPage: number;
    limit: number;
    totalPatients: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface PatientsResponse {
    patients: Patient[];
    pagination: PaginationData;
}

const limitOptions = [1, 2, 5, 10, 20, 50];

const defaultPagination: PaginationData = {
    currentPage: 1,
    limit: 10,
    totalPatients: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
};

export default function PatientsClient() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [isLimitOpen, setIsLimitOpen] = useState(false);

    // =========================
    // Search Debounce
    // =========================

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search.trim());
            setPage(1);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    // =========================
    // Fetch Patients
    // =========================

    const {
        data,
        isPending,
        isFetching,
        isError,
        error,
    } = useQuery<PatientsResponse>({
        queryKey: [
            "admin-patients",
            {
                page,
                limit,
                search: debouncedSearch,
            },
        ],

        queryFn: async () => {
            const params = new URLSearchParams({
                page: String(page),
                limit: String(limit),
            });

            if (debouncedSearch) {
                params.set("search", debouncedSearch);
            }

            const result = await fetchWithAuth(
                `/api/admin/patients?${params.toString()}`,
            );


            if (result.status !== 200) {
                throw new Error(
                    result?.data?.message || "Failed to fetch patients"
                );
            }

            return result?.data?.data;
        },

        placeholderData: keepPreviousData,

        staleTime: 30 * 1000,
    });

    const patients = data?.patients ?? [];
    console.log('patients', patients)

    const pagination = data?.pagination ?? {
        ...defaultPagination,
        limit,
        currentPage: page,
    };

    // =========================
    // Limit Change
    // =========================

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
        setIsLimitOpen(false);
    };

    // =========================
    // Pagination
    // =========================

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // =========================
    // Error
    // =========================

    if (isError) {
        console.error("Failed to fetch patients:", error);
        throw new Error(
            "Failed to fetch patients"
        );
    }

    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground dark:text-white">
                        Patients
                    </h1>

                    <p className="mt-1 text-sm text-foreground/60 dark:text-white/40">
                        Manage all registered patients from here.
                    </p>
                </div>

                <div className="rounded-xl bg-main/10 px-4 py-2 text-sm dark:bg-main/15">
                    Total Patients:{" "}
                    <span className="font-semibold text-main dark:text-emerald-400">
                        {pagination.totalPatients}
                    </span>
                </div>
            </div>

            {/* ================= FILTER ================= */}

            <div className="flex gap-3 justify-between rounded-2xl border border-main/10 bg-main/5 p-4 dark:border-gray-700 dark:bg-white/[0.03]">
                <div className="relative w-full">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 dark:text-white/40"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search patient..."
                        className="h-11 w-full rounded-xl border border-main/10 bg-background pl-10 pr-4 text-foreground outline-none transition focus:border-main dark:border-gray-700 dark:bg-white/[0.03] dark:text-white"
                    />
                </div>

                {/* item per page */}
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
                                    onClick={() =>
                                        handleLimitChange(option)
                                    }
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
                {/* Top loading bar */}
                {isFetching && (
                    <div className="absolute left-0 right-0 top-0 z-10 h-1 overflow-hidden bg-main/10 dark:bg-main/15">
                        <div className="h-full w-1/3 animate-[loading-slide_1s_ease-in-out_infinite] bg-main" />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm">
                        <thead>
                            <tr className="border-b border-main/10 bg-main/5 text-left dark:border-gray-700 dark:bg-white/[0.04]">
                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    Patient
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Phone
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Total Appointments
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Successful
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Last Appointment
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isPending ? (
                                <SkeletonRows
                                    rows={pagination.limit || 5}
                                />
                            ) : patients.length > 0 ? (
                                patients.map((patient) => (
                                    <tr
                                        key={patient._id}
                                        className="border-b border-main/5 transition hover:bg-main/5 dark:border-white/5 dark:hover:bg-white/5"
                                    >
                                        {/* Patient */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main/10 text-sm font-bold text-main dark:bg-main/15 dark:text-emerald-400">
                                                    {patient.name
                                                        ?.charAt(0)
                                                        .toUpperCase() ||
                                                        "?"}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-foreground dark:text-white">
                                                        {patient.name}
                                                    </p>

                                                    <p className="truncate text-xs text-foreground/50 dark:text-white/40">
                                                        {patient.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Phone */}
                                        <td className="px-5 py-4 text-center text-foreground/80 dark:text-white/70">
                                            {patient.phone || "N/A"}
                                        </td>

                                        {/* Total */}
                                        <td className="px-5 py-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-main/10 px-3 py-1.5 text-xs font-medium text-main dark:bg-main/15 dark:text-emerald-400">
                                                <CalendarDays size={13} />
                                                {patient.totalAppointments}
                                            </span>
                                        </td>

                                        {/* Successful */}
                                        <td className="px-5 py-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                                                <CheckCircle2 size={13} />
                                                {
                                                    patient.successfulAppointments
                                                }
                                            </span>
                                        </td>

                                        {/* Last Appointment */}
                                        <td className="px-5 py-4 text-center text-foreground/80 dark:text-white/70">
                                            {patient.lastAppointmentDate
                                                ? new Date(
                                                    patient.lastAppointmentDate
                                                ).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))
                            ) : null}
                        </tbody>
                    </table>
                </div>

                {/* Empty */}
                {!isPending && patients.length === 0 && (
                    <div className="py-16 text-center">
                        <Users className="mx-auto mb-3 h-10 w-10 text-foreground/20 dark:text-white/20" />

                        <p className="font-medium text-foreground dark:text-white">
                            {debouncedSearch
                                ? "No patients found"
                                : "No patients available"}
                        </p>

                        <p className="mt-1 text-sm text-foreground/50 dark:text-white/40">
                            {debouncedSearch
                                ? "Try a different search term."
                                : "Patients will appear here once registered."}
                        </p>
                    </div>
                )}
            </div>

            {/* ================= PAGINATION ================= */}

            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                isPending={isFetching}
            />

            <style>{`
@keyframes loading - slide {
    0 % {
        transform: translateX(-100 %);
    }

    50 % {
        transform: translateX(150 %);
    }

    100 % {
        transform: translateX(-100 %);
    }
}

@keyframes skeleton - pulse {
    0 %, 100 % {
        opacity: 0.5;
    }

    50 % {
        opacity: 1;
    }
}
`}</style>
        </div>
    );
}
