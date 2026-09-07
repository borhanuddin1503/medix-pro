"use client";

import { useEffect, useRef, useState } from "react";
import {
    Search,
    ChevronDown,
    MoreVertical,
    Pencil,
    Trash2,
    Power,
} from "lucide-react";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import Pagination from "../doctors/Pagination";
import { toast } from "sonner";
import AddDepartmentModal from "./departmentsAddModal";
import Image from "next/image";
import EditDepartmentModal from "./EditDepartmentModal";
import { revalidateTags } from "@/app/utils/revalidateTags";
import DeleteDepartmentModal from "./DeleteDepartmentModal";

export interface IDepartment {
    _id: string;
    name: string;
    description?: string;
    icon?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IDepartmentPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IGetDepartmentsResponse {
    success: boolean;
    message?: string;
    data?: {
        departments: IDepartment[];
        pagination: IDepartmentPagination;
    };
}

interface DepartmentsClientProps {
    initialDepartments: IDepartment[];
    initialPagination: IDepartmentPagination;
}


export interface IDeleteDepartmentRes {
    success: boolean;
    message: string;
    data?: {
        departmentId: string;
    };
}

const limitOptions = [5, 10, 20, 50];

export default function DepartmentsClient({
    initialDepartments,
    initialPagination,
}: DepartmentsClientProps) {
    const [departments, setDepartments] =
        useState<IDepartment[]>(initialDepartments);

    const [pagination, setPagination] =
        useState<IDepartmentPagination>(initialPagination);

    const [search, setSearch] = useState("");

    const [limit, setLimit] = useState<number>(
        initialPagination?.limit || 10
    );
    const [isLimitOpen, setIsLimitOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<IDepartment | null>(null);
    const [editModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const prevFilters = useRef({
        search: "",
        limit: initialPagination?.limit || 10,
    });



    // =========================
    // Fetch Departments
    // =========================

    const fetchDepartments = async ({
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

            const result =
                await fetchWithAuth<IGetDepartmentsResponse>(
                    `/api/departments?${params.toString()}`,
                    {
                        method: "GET",
                        tags: [
                            "admin-departments",
                            `admin-departments-${page}`,
                        ],
                    }
                );

            if (
                result.status < 200 ||
                result.status >= 300 ||
                !result.data?.data
            ) {
                throw new Error(
                    result.error?.message ||
                    result.data?.message ||
                    "Failed to fetch departments"
                );
            }

            setDepartments(result.data.data.departments);
            setPagination(result.data.data.pagination);
        } catch (error) {
            console.error(
                "Failed to fetch departments:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch departments"
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
            prevFilters.current = {
                search,
                limit,
            };

            fetchDepartments({
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
        await fetchDepartments({
            page,
            searchValue: search,
            limitValue: limit,
        });
    };

    // =========================
    // Format Date
    // =========================

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-6">

            {/* ================= HEADER ================= */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-foreground dark:text-white">
                        All Departments
                    </h2>

                    <p className="mt-1 text-sm text-foreground/60 dark:text-white/40">
                        {pagination.total} department
                        {pagination.total !== 1 ? "s" : ""} available
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-fit rounded-lg bg-main cursor-pointer px-4 py-2.5 text-sm font-medium text-white transition hover:bg-main/90"
                >
                    + Add Department
                </button>
            </div>

            {/* ================= FILTER ================= */}

            <div className="flex flex-col gap-3 rounded-2xl border border-main/10 bg-main/5 p-4 dark:border-gray-700 dark:bg-white/[0.03] sm:flex-row sm:justify-between">

                {/* Search */}

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
                        placeholder="Search department..."
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
                            className={`transition-transform ${isLimitOpen
                                ? "rotate-180"
                                : ""
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

                {/* Loading Bar */}

                {isPending && (
                    <div className="absolute left-0 right-0 top-0 z-10 h-1 overflow-hidden bg-main/10 dark:bg-main/15">
                        <div className="h-full w-1/3 animate-[loading-slide_1s_ease-in-out_infinite] bg-main" />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-sm">

                        {/* Table Head */}

                        <thead>
                            <tr className="border-b border-main/10 bg-main/5 text-left dark:border-gray-700 dark:bg-white/[0.04]">

                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    Department
                                </th>

                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    Description
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Created
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        {/* Table Body */}

                        <tbody>
                            {isPending ? (
                                <DepartmentSkeletonRows
                                    rows={limit}
                                />
                            ) : departments.length > 0 ? (
                                departments.map(
                                    (department) => (
                                        <tr
                                            key={
                                                department._id
                                            }
                                            className="border-b border-main/5 transition hover:bg-main/5 dark:border-white/5 dark:hover:bg-white/5"
                                        >

                                            {/* Department */}

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">

                                                    {department.icon ? (
                                                        <Image className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400" src={department.icon} alt={department.name} width={40} height={40} />
                                                    ) : (
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400">
                                                            D
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-foreground dark:text-white">
                                                            {
                                                                department.name
                                                            }
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-foreground/50 dark:text-white/40">
                                                            Department
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            {/* Description */}

                                            <td className="max-w-md px-5 py-4">
                                                <p className="truncate text-foreground/70 dark:text-white/60">
                                                    {department.description ||
                                                        "No description"}
                                                </p>
                                            </td>

                                            {/* Status */}

                                            <td className="px-5 py-4 text-center">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${department.isActive
                                                        ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                                                        : "bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400"
                                                        }`}
                                                >
                                                    {department.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            {/* Created */}

                                            <td className="px-5 py-4 text-center text-foreground/70 dark:text-white/60">
                                                {formatDate(
                                                    department.createdAt
                                                )}
                                            </td>

                                            {/* Action */}

                                            <td className="relative px-5 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {/* Edit */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedDepartment(department);
                                                            setIsEditModalOpen(true);
                                                        }}
                                                        title="Edit department"
                                                        className="cursor-pointer rounded-lg p-2 text-foreground/60 transition hover:bg-main/10 hover:text-main dark:text-white/50 dark:hover:bg-main/15 dark:hover:text-emerald-400"
                                                    >
                                                        <Pencil size={17} />
                                                    </button>

                                                  

                                                    {/* Delete */}
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            () => {
                                                                setSelectedDepartment(department)
                                                                setDeleteModalOpen(true)
                                                            }
                                                        }
                                                        title="Delete department"
                                                        className="cursor-pointer rounded-lg p-2 text-red-500/70 transition hover:bg-red-50 hover:text-red-600 dark:text-red-400/70 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                </div>

                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-16 text-center"
                                    >
                                        <p className="font-medium text-foreground dark:text-white">
                                            {search
                                                ? "No departments found"
                                                : "No departments available"}
                                        </p>

                                        <p className="mt-1 text-sm text-foreground/50 dark:text-white/40">
                                            {search
                                                ? "Try a different search term."
                                                : "Departments will appear here."}
                                        </p>
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

            {/* ================= ADD DEPARTMENT MODAL ================= */}

            {isAddModalOpen && (
                <AddDepartmentModal
                    onClose={() =>
                        setIsAddModalOpen(false)
                    }
                    onSuccess={(newDepartment) => {
                        setDepartments((prev) => [
                            newDepartment,
                            ...prev,
                        ]);

                        toast.success("Department added successfully");
                    }}
                />
            )}
            {/* ================= DELETE DEPARTMENT MODAL ================= */}

            {deleteModalOpen && selectedDepartment && (
                <DeleteDepartmentModal
                    dept={selectedDepartment}
                    onClose={() => {
                        setDeleteModalOpen(false);
                        setSelectedDepartment(null);
                    }}
                    onSuccess={() => {
                        setDepartments((prev) =>
                            prev.filter((d) => d._id !== selectedDepartment._id)
                        );
                        toast.success("Department deleted successfully");
                    }}
                />
            )}



            {/* ================= EDIT DEPARTMENT MODAL ================= */}

            {editModalOpen && selectedDepartment && (
                <EditDepartmentModal
                    dept={selectedDepartment}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedDepartment(null);
                    }}
                    onSuccess={(updatedDept) => {
                        setDepartments((prev) =>
                            prev.map((d) =>
                                d._id === updatedDept._id ? updatedDept : d
                            )
                        );
                        toast.success("Department updated successfully");
                    }}
                />
            )}

            {/* ================= ANIMATION ================= */}

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
                    0%, 100% {
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

// =========================
// Skeleton
// =========================

function DepartmentSkeletonRows({
    rows,
}: {
    rows: number;
}) {
    const pulse =
        "animate-[skeleton-pulse_1.4s_ease-in-out_infinite]";

    return (
        <>
            {Array.from({ length: rows }).map((_, index) => (
                <tr
                    key={index}
                    className="border-b border-main/5 dark:border-white/5"
                >
                    {/* Department */}

                    <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div
                                className={`h-10 w-10 rounded-xl bg-main/10 dark:bg-white/10 ${pulse}`}
                            />

                            <div className="space-y-2">
                                <div
                                    className={`h-3.5 w-28 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                                />

                                <div
                                    className={`h-3 w-16 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                                />
                            </div>
                        </div>
                    </td>

                    {/* Description */}

                    <td className="px-5 py-4">
                        <div
                            className={`h-3.5 w-48 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-6 w-20 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    {/* Created */}

                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-3.5 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    {/* Action */}

                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-8 w-8 rounded-lg bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>
                </tr>
            ))}
        </>
    );
}
