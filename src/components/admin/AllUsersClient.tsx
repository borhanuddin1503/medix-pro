"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";

import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import Pagination from "../doctors/Pagination";
import RoleAssignModal from "./RoleAssignModal";
import { toast } from "sonner";

type UserRole =
    | "USER"
    | "ADMIN"
    | "DOCTOR"
    | "RECEPTIONIST"
    | "TECHNOLOGIST";

export interface IAdminUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    isVerified: boolean;
    image?: string;
    role: UserRole;
    createdAt: string;
}

export interface UsersPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface UsersClientProps {
    initialUsers: IAdminUser[];
    initialPagination: UsersPagination;
}

const limitOptions = [5, 10, 20, 50];



// role style
const roleStyles: Record<UserRole, string> = {
    USER: "bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400",
    ADMIN: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    DOCTOR: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    RECEPTIONIST:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    TECHNOLOGIST:
        "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
};

export default function AllUsersClient({
    initialUsers,
    initialPagination,
}: UsersClientProps) {
    const [users, setUsers] = useState<IAdminUser[]>(initialUsers);

    const [pagination, setPagination] =
        useState<UsersPagination>(initialPagination);

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState<number>(
        initialPagination?.limit || 10
    );

    const [isLimitOpen, setIsLimitOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] =
        useState<IAdminUser | null>(null);

    const prevFilters = useRef({
        search: "",
        limit: initialPagination.limit || 10,
    });

    // =========================
    // Fetch Users
    // =========================

    const fetchUsers = async ({
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
                `/api/admin/users?${params.toString()}`,
                {
                    method: "GET",
                    tags: ["users-admin", `users-admin-${page}`],
                }
            );

            if (result.status < 200 || result.status >= 300) {
                throw new Error(
                    result.data?.message || "Failed to fetch users"
                );
            }

            setUsers(result.data.data.users);
            setPagination(result.data.data.pagination);
        } catch (error) {
            console.error("Failed to fetch users:", error);
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

            fetchUsers({
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
        await fetchUsers({
            page,
            searchValue: search,
            limitValue: limit,
        });
    };


    console.log('role modal open', isRoleModalOpen)

    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground dark:text-white">
                        Users
                    </h1>

                    <p className="mt-1 text-sm text-foreground/60 dark:text-white/40">
                        Manage users and assign roles from here.
                    </p>
                </div>

                <div className="rounded-xl bg-main/10 px-4 py-2 text-sm dark:bg-main/15">
                    Total Users:{" "}
                    <span className="font-semibold text-main dark:text-emerald-400">
                        {pagination?.total}
                    </span>
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
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, phone..."
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
                    <table className="w-full min-w-[900px] text-sm">
                        <thead>
                            <tr className="border-b border-main/10 bg-main/5 text-left dark:border-gray-700 dark:bg-white/[0.04]">
                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    User
                                </th>

                                <th className="px-5 py-4 font-semibold text-foreground dark:text-white">
                                    Email
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Phone
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Verification
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Role
                                </th>

                                <th className="px-5 py-4 text-center font-semibold text-foreground dark:text-white">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isPending ? (
                                <UserSkeletonRows rows={limit} />
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-main/5 transition hover:bg-main/5 dark:border-white/5 dark:hover:bg-white/5"
                                    >
                                        {/* User */}

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {user.image ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={user.image}
                                                        alt={user.name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-main/10 text-sm font-bold text-main dark:bg-main/15 dark:text-emerald-400">
                                                        {user.name
                                                            ?.charAt(0)
                                                            .toUpperCase() ||
                                                            "?"}
                                                    </div>
                                                )}

                                                <span className="font-semibold text-foreground dark:text-white">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Email */}

                                        <td className="px-5 py-4 text-foreground/80 dark:text-white/70">
                                            {user.email}
                                        </td>

                                        {/* Phone */}

                                        <td className="px-5 py-4 text-center text-foreground/80 dark:text-white/70">
                                            {user.phone || "N/A"}
                                        </td>

                                        {/* Verification */}

                                        <td className="px-5 py-4 text-center">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.isVerified
                                                    ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                                                    }`}
                                            >
                                                {user.isVerified
                                                    ? "Verified"
                                                    : "Not Verified"}
                                            </span>
                                        </td>

                                        {/* Role */}

                                        <td className="px-5 py-4 text-center">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roleStyles[user.role]}`}>
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Action */}

                                        <td className="px-5 py-4 text-center">
                                            <button
                                                type="button"
                                                className="rounded-lg bg-main px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-main/90"
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setIsRoleModalOpen((prev) => !prev);
                                                }}
                                            >
                                                Assign Role
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-16 text-center"
                                    >
                                        <p className="font-medium text-foreground dark:text-white">
                                            {search
                                                ? "No users found"
                                                : "No users available"}
                                        </p>

                                        <p className="mt-1 text-sm text-foreground/50 dark:text-white/40">
                                            {search
                                                ? "Try a different search term."
                                                : "Users will appear here."}
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
                currentPage={pagination?.page}
                totalPages={pagination?.totalPages}
                onPageChange={handlePageChange}
                isPending={isPending}
            />



            {selectedUser && (
                <RoleAssignModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onSuccess={(updatedRole) => {
                        setUsers((prev) =>
                            prev.map((item) =>
                                item._id === selectedUser._id
                                    ? {
                                        ...item,
                                        role: updatedRole,
                                    }
                                    : item
                            )
                        );

                        toast.success(`Role updated to ${updatedRole} for ${selectedUser.name}`)
                    }}
                />
            )}

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

function UserSkeletonRows({ rows }: { rows: number }) {
    const pulse =
        "animate-[skeleton-pulse_1.4s_ease-in-out_infinite]";

    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <tr
                    key={i}
                    className="border-b border-main/5 dark:border-white/5"
                >
                    <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div
                                className={`h-10 w-10 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`}
                            />

                            <div className="space-y-2">
                                <div
                                    className={`h-3.5 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                                />

                                <div
                                    className={`h-3 w-32 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                                />
                            </div>
                        </div>
                    </td>

                    <td className="px-5 py-4">
                        <div
                            className={`h-3.5 w-36 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-3.5 w-24 rounded bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-6 w-20 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-6 w-24 rounded-full bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>

                    <td className="px-5 py-4">
                        <div
                            className={`mx-auto h-8 w-24 rounded-lg bg-main/10 dark:bg-white/10 ${pulse}`}
                        />
                    </td>
                </tr>
            ))}
        </>
    );
}