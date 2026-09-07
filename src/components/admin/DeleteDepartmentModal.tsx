
"use client";

import { AlertTriangle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { revalidateTags } from "@/app/utils/revalidateTags";
import { IDepartment } from "./DepartmentsClient";

interface IDeleteDepartmentRes {
    success: boolean;
    message: string;
    data?: {
        departmentId: string;
    };
}

interface DeleteDepartmentModalProps {
    dept: IDepartment;
    onClose: () => void;
    onSuccess: (departmentId: string) => void;
}

export default function DeleteDepartmentModal({
    dept,
    onClose,
    onSuccess,
}: DeleteDepartmentModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            setDeleteError(null);

            const result =
                await fetchWithAuth<IDeleteDepartmentRes>(
                    `/api/departments/${dept._id}`,
                    {
                        method: "DELETE",
                    }
                );

            if (result.status < 200 || result.status >= 300) {
                setDeleteError(
                    result.error?.message ||
                        result.data?.message ||
                        "Failed to delete department"
                );
                return;
            }

            // Update parent state
            onSuccess(dept._id);

            // Revalidate cache
            await revalidateTags([
                "admin-departments",
            ]);

            onClose();
        } catch (error) {
            console.error("Delete department error:", error);

            setDeleteError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete department"
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
            onClick={isDeleting ? undefined : onClose}
        >
            <div
                className="w-full max-w-md overflow-hidden rounded-2xl border border-main/10 bg-background shadow-2xl dark:border-gray-700 dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-main/10 px-6 py-5 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                            <AlertTriangle size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-foreground dark:text-white">
                                Delete Department
                            </h2>

                            <p className="mt-1 text-sm text-foreground/50 dark:text-white/40">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-foreground/50 transition hover:bg-main/10 hover:text-main disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer dark:text-white/50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Department */}
                <div className="px-6 pt-6">
                    <div className="flex items-center gap-4 rounded-xl border border-main/10 bg-main/5 p-4 dark:border-gray-700 dark:bg-white/[0.03]">
                        {dept.icon ? (
                            <Image
                                src={dept.icon}
                                alt={dept.name}
                                width={56}
                                height={56}
                                className="h-14 w-14 shrink-0 rounded-xl object-cover"
                            />
                        ) : (
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-main/10 text-lg font-semibold text-main dark:bg-main/15 dark:text-emerald-400">
                                {dept.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="text-xs text-foreground/50 dark:text-white/40">
                                Department
                            </p>

                            <p className="mt-1 truncate font-semibold text-foreground dark:text-white">
                                {dept.name}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-5">
                    <p className="text-sm leading-6 text-foreground/70 dark:text-white/60">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-foreground dark:text-white">
                            {dept.name}
                        </span>
                        ?
                    </p>

                    {/* Error */}
                    {deleteError && (
                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                            {deleteError}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-main/10 px-6 py-5 dark:border-gray-700">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="cursor-pointer rounded-lg border border-main/10 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-main/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="cursor-pointer flex min-w-[100px] items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isDeleting && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        )}

                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
