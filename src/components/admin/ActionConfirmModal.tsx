"use client";

import { revalidateTags } from "@/app/utils/revalidateTags";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

interface ActionConfirmModalProps {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export default function ActionConfirmModal({
    open,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onClose,
    onConfirm,
}: ActionConfirmModalProps) {
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await onConfirm();
            revalidateTags(['doctors-admin' , 'doctors'])
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl border border-main/10 bg-background p-6 shadow-xl">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {title}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-foreground/60">
                            {description}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="cursor-pointer rounded-lg p-1.5 text-foreground/50 transition hover:bg-muted hover:text-foreground disabled:opacity-50"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="cursor-pointer rounded-lg border border-main/10 px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={loading}
                        className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-main px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading && (
                            <Loader2
                                size={15}
                                className="animate-spin"
                            />
                        )}

                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}