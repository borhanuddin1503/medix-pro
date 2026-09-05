"use client";

import { useState } from "react";
import {
    X,
    ShieldCheck,
    UserRound,
    ChevronDown,
    Check,
} from "lucide-react";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { IAdminUser } from "./AllUsersClient";
import { toast } from "sonner";

type UserRole =
    | "USER"
    | "ADMIN"
    | "DOCTOR"
    | "RECEPTIONIST"
    | "TECHNOLOGIST";

interface RoleAssignModalProps {
    user: IAdminUser;
    onClose: () => void;
    onSuccess: (updatedRole: UserRole) => void;
}

const roles: UserRole[] = [
    "USER",
    "RECEPTIONIST",
    "TECHNOLOGIST",
    "ADMIN",
];

const roleStyles: Record<
    UserRole,
    {
        bg: string;
        text: string;
        dot: string;
        darkBg: string;
        darkText: string;
    }
> = {
    USER: {
        bg: "bg-slate-100",
        text: "text-slate-700",
        dot: "bg-slate-500",
        darkBg: "dark:bg-slate-500/15",
        darkText: "dark:text-slate-300",
    },

    ADMIN: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        dot: "bg-purple-500",
        darkBg: "dark:bg-purple-500/15",
        darkText: "dark:text-purple-300",
    },

    DOCTOR: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        dot: "bg-blue-500",
        darkBg: "dark:bg-blue-500/15",
        darkText: "dark:text-blue-300",
    },

    RECEPTIONIST: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
        darkBg: "dark:bg-emerald-500/15",
        darkText: "dark:text-emerald-300",
    },

    TECHNOLOGIST: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        dot: "bg-orange-500",
        darkBg: "dark:bg-orange-500/15",
        darkText: "dark:text-orange-300",
    },
};

export default function RoleAssignModal({
    user,
    onClose,
    onSuccess,
}: RoleAssignModalProps) {
    const [role, setRole] = useState<UserRole>(user.role);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    console.log(user._id , 'role', role)

    const handleAssignRole = async () => {
        if (role === user.role) {
            onClose();
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const result = await fetchWithAuth(
                `/api/admin/users/${user._id}/role`,
                {
                    method: "PATCH",
                    body: {
                        role,
                    },
                }
            );

            if (result.status !== 200) {
                setError(
                    result.data?.message || "Failed to assign role"
                );
                return;
            }

            onSuccess(role);
            onClose();
        } catch (error) {
            console.error("Role assignment error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const selectedRoleStyle = roleStyles[role];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:border dark:border-gray-700 dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Assign User Role
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-white/40">
                            Change the role of this user
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* User Info */}
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.03]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <UserRound
                                size={20}
                                className="text-gray-500 dark:text-white/50"
                            />
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900 dark:text-white">
                            {user.name}
                        </p>

                        <p className="truncate text-sm text-gray-500 dark:text-white/50">
                            {user.email}
                        </p>
                    </div>
                </div>

                {/* Role */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white/70">
                        Select Role
                    </label>

                    <div className="relative">
                        {/* Dropdown Trigger */}
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                                setIsDropdownOpen((prev) => !prev)
                            }
                            className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-left outline-none transition hover:border-gray-400 focus:border-main focus:ring-2 focus:ring-main/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-white/3 dark:hover:border-gray-600 dark:disabled:bg-white/2"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-7 w-7 items-center justify-center rounded-md ${selectedRoleStyle.bg} ${selectedRoleStyle.darkBg}`}
                                >
                                    <ShieldCheck
                                        size={16}
                                        className={`${selectedRoleStyle.text} ${selectedRoleStyle.darkText}`}
                                    />
                                </div>

                                <div>
                                    <p
                                        className={`text-sm font-medium ${selectedRoleStyle.text} ${selectedRoleStyle.darkText}`}
                                    >
                                        {role}
                                    </p>

                                    <p className="text-xs text-gray-400 dark:text-white/30">
                                        User role
                                    </p>
                                </div>
                            </div>

                            <ChevronDown
                                size={18}
                                className={`text-gray-400 transition-transform dark:text-white/40 ${isDropdownOpen
                                        ? "rotate-180"
                                        : ""
                                    }`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                                {roles.map((item) => {
                                    const style = roleStyles[item];
                                    const isSelected = role === item;

                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => {
                                                setRole(item);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition hover:bg-gray-50 dark:hover:bg-white/5"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${style.dot}`}
                                                />

                                                <div>
                                                    <p
                                                        className={`text-sm font-medium ${style.text} ${style.darkText}`}
                                                    >
                                                        {item}
                                                    </p>

                                                    <p className="text-xs text-gray-400 dark:text-white/30">
                                                        {item === "USER" &&
                                                            "Regular user"}

                                                        {item ===
                                                            "RECEPTIONIST" &&
                                                            "Reception desk"}

                                                        {item ===
                                                            "TECHNOLOGIST" &&
                                                            "Lab / technical staff"}

                                                        {item === "ADMIN" &&
                                                            "System administrator"}
                                                    </p>
                                                </div>
                                            </div>

                                            {isSelected && (
                                                <Check
                                                    size={17}
                                                    className={`${style.text} ${style.darkText}`}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Current role */}
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                    <span>Current role:</span>

                    <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${roleStyles[user.role].bg} ${roleStyles[user.role].text} ${roleStyles[user.role].darkBg} ${roleStyles[user.role].darkText}`}
                    >
                        {user.role}
                    </span>
                </div>

                {/* Error */}
                {error && (
                    <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                        {error}
                    </p>
                )}

                {/* Actions */}
                <div className="mt-7 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="rounded-lg border cursor-pointer border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-white/70 dark:hover:bg-white/5"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleAssignRole}
                        disabled={
                            isLoading ||
                            role === user.role
                        }
                        className="rounded-lg bg-main px-4 cursor-pointer py-2.5 text-sm font-medium border text-white border-main  transition hover:bg-main/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading
                            ? "Updating..."
                            : "Assign Role"}
                    </button>
                </div>
            </div>
        </div>
    );
}