"use client";

import { useState } from "react";
import { X } from "lucide-react";
import ImageUpload from "../auth/ImageUpload";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { IDepartment } from "./DepartmentsClient";
import { revalidateTags } from "@/app/utils/revalidateTags";

interface AddDepartmentModalProps {
    onClose: () => void;
    onSuccess?: (dept: IDepartment) => void;
}


interface ICreateDepartmentRes {
    success: boolean;
    message: string;
    data?: {
        department: IDepartment;
    }
}

export default function AddDepartmentModal({
    onClose,
    onSuccess,
}: AddDepartmentModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [errors, setErrors] = useState<{
        name?: string;
        description?: string;
        image?: string;
    }>({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    // =========================
    // Submit
    // =========================

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const newErrors: typeof errors = {};

        if (!name.trim()) {
            newErrors.name = "Department name is required";
        }

        if (!description.trim()) {
            newErrors.description =
                "Department description is required";
        }

        if (!image) {
            newErrors.image = "Department image is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsSubmitting(true);

            // API call will be added here


            const result = await fetchWithAuth<ICreateDepartmentRes>(
                "/api/departments",
                {
                    method: "POST",
                    body: {
                        name: name.trim(),
                        description: description.trim(),
                        icon: image,
                    },
                }
            );

            if (result.status < 200 || result.status >= 300) {
                setSubmitError(
                    result.data?.message ||
                    "Failed to create department"
                );
                return;
            }


            revalidateTags(["admin-departments"]);
            onSuccess?.(result.data?.data?.department as IDepartment);
            onClose();
        } catch (error) {
            setSubmitError("Failed to create department");
            console.error(
                "Create department error:",
                error
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-main/10 bg-background shadow-2xl dark:border-gray-700 dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ================= HEADER ================= */}

                <div className="flex items-start justify-between border-b border-main/10 px-6 py-5 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground dark:text-white">
                            Add Department
                        </h2>

                        <p className="mt-1 text-sm text-foreground/60 dark:text-white/40">
                            Create a new hospital department.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-foreground/50 transition hover:bg-main/10 hover:text-main dark:text-white/50 dark:hover:bg-main/15"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* ================= FORM ================= */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >
                    {/* Department Image */}

                    <div>
                        <label className="mb-3 block text-sm font-medium text-foreground dark:text-white">
                            Department Image
                        </label>

                        <ImageUpload
                            value={image}
                            onChange={(value) => {
                                setImage(value);

                                setErrors((prev) => ({
                                    ...prev,
                                    image: undefined,
                                }));
                            }}
                            error={errors.image}
                            onClearError={() =>
                                setErrors((prev) => ({
                                    ...prev,
                                    image: undefined,
                                }))
                            }
                        />
                    </div>

                    {/* Department Name */}

                    <div>
                        <label
                            htmlFor="department-name"
                            className="mb-2 block text-sm font-medium text-foreground dark:text-white"
                        >
                            Department Name
                            <span className="ml-1 text-red-500">
                                *
                            </span>
                        </label>

                        <input
                            id="department-name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);

                                if (errors.name) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        name: undefined,
                                    }));
                                }
                            }}
                            placeholder="e.g. Cardiology"
                            className={`h-11 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/30 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/30 ${errors.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-main/10 focus:border-main dark:border-gray-700"
                                }`}
                        />

                        {errors.name && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Description */}

                    <div>
                        <label
                            htmlFor="department-description"
                            className="mb-2 block text-sm font-medium text-foreground dark:text-white"
                        >
                            Description
                            <span className="ml-1 text-red-500">
                                *
                            </span>
                        </label>

                        <textarea
                            id="department-description"
                            value={description}
                            onChange={(e) => {
                                setDescription(
                                    e.target.value
                                );

                                if (errors.description) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        description:
                                            undefined,
                                    }));
                                }
                            }}
                            placeholder="Describe this department..."
                            rows={4}
                            className={`w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-foreground/30 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/30 ${errors.description
                                ? "border-red-500 focus:border-red-500"
                                : "border-main/10 focus:border-main dark:border-gray-700"
                                }`}
                        />

                        <div className="mt-1.5 flex justify-between">
                            {errors.description ? (
                                <p className="text-xs text-red-500">
                                    {errors.description}
                                </p>
                            ) : (
                                <span />
                            )}

                            <span className="text-xs text-foreground/40 dark:text-white/30">
                                {description.length}/500
                            </span>
                        </div>
                    </div>


                    {/* errors handle */}
                    {submitError && (
                        <p className="text-sm text-red-500 text-center">
                            {submitError}
                        </p>
                    )}

                    {/* ================= ACTIONS ================= */}

                    <div className="flex justify-end gap-3 border-t border-main/10 pt-5 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded-lg border border-main/10 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-main/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex min-w-[130px] items-center justify-center gap-2 rounded-lg bg-main px-4 py-2.5 text-sm font-medium text-white transition hover:bg-main/90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting && (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            )}

                            {isSubmitting
                                ? "Creating..."
                                : "Add Department"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}