"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import {
    ShieldCheck,
    PowerOff,
    Power,
    Trash2,
    Loader2,
} from "lucide-react";
import ActionConfirmModal from "./ActionConfirmModal";


interface DoctorActionsProps {
    doctorId: string;
    isActive?: boolean;
    isApproved?: boolean;
}

export default function DoctorActions({
    doctorId,
    isActive = false,
    isApproved = false,
}: DoctorActionsProps) {
    const router = useRouter();

    const [loadingAction, setLoadingAction] = useState<
        "toggleActive" | "approve" | "delete" | null
    >(null);

    const [confirmAction, setConfirmAction] = useState<
        "approve" | "toggleActive" | "delete" | null
    >(null);

    const [error, setError] = useState("");

    // =========================
    // Update Active Status
    // =========================
    const handleToggleActive = async () => {
        try {
            setLoadingAction("toggleActive");
            setError("");

            const result = await fetchWithAuth(
                `/api/admin/doctors/${doctorId}/status`,
                {
                    method: "PATCH",
                    body: {
                        isActive: !isActive,
                    },
                }
            );

            if (result.status < 200 || result.status >= 300) {
                setError(
                    result.data?.message ||
                    "Failed to update doctor status"
                );
                return;
            }

            setConfirmAction(null);

            router.refresh();
            
        } catch (error) {
            console.error(
                "Failed to update doctor status:",
                error
            );

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoadingAction(null);
        }
    };

    // =========================
    // Approve Doctor
    // =========================
    const handleApprove = async () => {
        try {
            setLoadingAction("approve");
            setError("");

            const result = await fetchWithAuth(
                `/api/admin/doctors/${doctorId}/status`,
                {
                    method: "PATCH",
                    body: {
                        isApproved: true,
                    },
                }
            );

            if (result.status < 200 || result.status >= 300) {
                setError(
                    result.data?.message ||
                    "Failed to approve doctor"
                );
                return;
            }

            setConfirmAction(null);

            router.refresh();
        } catch (error) {
            console.error(
                "Failed to approve doctor:",
                error
            );

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoadingAction(null);
        }
    };

    // =========================
    // Delete Doctor
    // =========================
    const handleDelete = async () => {
        try {
            setLoadingAction("delete");
            setError("");

            const result = await fetchWithAuth(
                `/api/admin/doctors/${doctorId}`,
                {
                    method: "DELETE",
                }
            );

            if (result.status < 200 || result.status >= 300) {
                setError(
                    result.data?.message ||
                    "Failed to delete doctor"
                );
                return;
            }

            setConfirmAction(null);

            router.push("/admin/doctors");
        } catch (error) {
            console.error(
                "Failed to delete doctor:",
                error
            );

            setError(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoadingAction(null);
        }
    };

    // =========================
    // Confirm Handler
    // =========================
    const handleConfirm = async () => {
        if (confirmAction === "approve") {
            await handleApprove();
            return;
        }

        if (confirmAction === "toggleActive") {
            await handleToggleActive();
            return;
        }

        if (confirmAction === "delete") {
            await handleDelete();
        }
    };

    return (
        <>
            <div>
                {/* =========================
                    Action Buttons
                ========================= */}
                <div className="flex flex-wrap gap-3">

                    {/* Approve */}
                    {!isApproved && (
                        <button
                            type="button"
                            onClick={() => {
                                setError("");
                                setConfirmAction("approve");
                            }}
                            disabled={loadingAction !== null}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-main px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loadingAction === "approve" ? (
                                <Loader2
                                    size={15}
                                    className="animate-spin"
                                />
                            ) : (
                                <ShieldCheck size={15} />
                            )}

                            Approve Doctor
                        </button>
                    )}

                    {/* Active / Inactive */}
                    {isActive ? (
                        <button
                            type="button"
                            onClick={() => {
                                setError("");
                                setConfirmAction("toggleActive");
                            }}
                            disabled={loadingAction !== null}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700 shadow-sm transition hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-yellow-500/15 dark:text-yellow-400 dark:hover:bg-yellow-500/25"
                        >
                            {loadingAction === "toggleActive" ? (
                                <Loader2
                                    size={15}
                                    className="animate-spin"
                                />
                            ) : (
                                <PowerOff size={15} />
                            )}

                            Deactivate
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                setError("");
                                setConfirmAction("toggleActive");
                            }}
                            disabled={loadingAction !== null}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-green-500/15 dark:text-green-400 dark:hover:bg-green-500/25"
                        >
                            {loadingAction === "toggleActive" ? (
                                <Loader2
                                    size={15}
                                    className="animate-spin"
                                />
                            ) : (
                                <Power size={15} />
                            )}

                            Activate
                        </button>
                    )}

                    {/* Delete */}
                    <button
                        type="button"
                        onClick={() => {
                            setError("");
                            setConfirmAction("delete");
                        }}
                        disabled={loadingAction !== null}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/25"
                    >
                        {loadingAction === "delete" ? (
                            <Loader2
                                size={15}
                                className="animate-spin"
                            />
                        ) : (
                            <Trash2 size={15} />
                        )}

                        Delete Doctor
                    </button>
                </div>

                {/* =========================
                    Error
                ========================= */}
                {error && (
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                        {error}
                    </div>
                )}
            </div>

            {/* =========================
                Approve Modal
            ========================= */}
            <ActionConfirmModal
                open={confirmAction === "approve"}
                title="Approve Doctor?"
                description="Are you sure you want to approve this doctor? The doctor will become available to patients."
                confirmText="Approve"
                onClose={() => {
                    if (loadingAction === null) {
                        setConfirmAction(null);
                    }
                }}
                onConfirm={handleConfirm}
            />

            {/* =========================
                Activate / Deactivate Modal
            ========================= */}
            <ActionConfirmModal
                open={confirmAction === "toggleActive"}
                title={
                    isActive
                        ? "Deactivate Doctor?"
                        : "Activate Doctor?"
                }
                description={
                    isActive
                        ? "This doctor will no longer be available for appointments."
                        : "This doctor will become active and available for appointments."
                }
                confirmText={
                    isActive
                        ? "Deactivate"
                        : "Activate"
                }
                onClose={() => {
                    if (loadingAction === null) {
                        setConfirmAction(null);
                    }
                }}
                onConfirm={handleConfirm}
            />

            {/* =========================
                Delete Modal
            ========================= */}
            <ActionConfirmModal
                open={confirmAction === "delete"}
                title="Delete Doctor?"
                description="Are you sure you want to delete this doctor? This action cannot be undone."
                confirmText="Delete"
                onClose={() => {
                    if (loadingAction === null) {
                        setConfirmAction(null);
                    }
                }}
                onConfirm={handleConfirm}
            />
        </>
    );
}