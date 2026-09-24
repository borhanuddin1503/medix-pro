"use client";

import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import ImageUpload from "@/components/auth/ImageUpload";
import { LoaderCircle, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileData {
    _id: string;
    name: string;
    email: string;
    image?: string;
    googleId?: string;
    isVerified?: boolean;
    provider?: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ProfileUpdateProps {
    initialData: ProfileData;
}

interface UpdateProfileResponse {
    success: boolean;
    message: string;
    data?: ProfileData;
}

export default function ProfileUpdate({
    initialData,
}: ProfileUpdateProps) {
    const [name, setName] = useState(initialData.name || "");
    const [email, setEmail] = useState(initialData.email || "");
    const [image, setImage] = useState(initialData.image || "");
    const router = useRouter();

    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        image?: string;
        general?: string;
    }>({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearError = (field: keyof typeof errors) => {
        setErrors((prev) => ({
            ...prev,
            [field]: undefined,
            general: undefined,
        }));
    };


    const validate = () => {
        const newErrors: typeof errors = {};

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        // Required validation
        if (!trimmedName) {
            newErrors.name = "Name is required.";
        }

        if (!trimmedEmail) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
        ) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!image.trim()) {
            newErrors.image = "Profile image is required.";
        }

        // Check whether anything changed
        const nameChanged = trimmedName !== initialData.name.trim();
        const emailChanged = trimmedEmail !== initialData.email.trim();
        const imageChanged = image !== (initialData.image || "");

        if (!nameChanged && !emailChanged && !imageChanged) {
            newErrors.general = "Please change at least one field before updating.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setIsSubmitting(true);

            const result = await fetchWithAuth<UpdateProfileResponse>(
                "/auth/profile",
                {
                    method: "PATCH",
                    body: {
                        name: name.trim(),
                        image,
                    },
                }
            );

            if (!result.data?.success) {
                setErrors({
                    general:
                        result.data?.message ||
                        "Failed to update profile. Please try again.",
                });

                return;
            }

            if (result?.data?.data) {
                toast.success('Profile Updated Successfully');
                router.push('/');
            }
        } catch (error) {
            console.error("Profile update error:", error);

            setErrors({
                general:
                    "Something went wrong while updating your profile.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-2xl rounded-3xl border border-main/10 bg-background p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-8"
        >
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground dark:text-white">
                    Update Profile
                </h2>

                <p className="mt-1 text-sm text-muted-foreground dark:text-white/50">
                    Update your profile information and profile picture.
                </p>
            </div>

            {/* General Error */}
            {errors.general && (
                <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                    <p className="text-sm font-medium text-red-500">
                        {errors.general}
                    </p>
                </div>
            )}

            {/* Profile Image */}
            <div className="mb-8">
                <ImageUpload
                    value={image}
                    onChange={(value) => {
                        setImage(value);
                        clearError("image");
                    }}
                    error={errors.image}
                    onClearError={() => clearError("image")}
                />
            </div>

            {/* Name */}
            <div className="mb-5">
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-foreground dark:text-white"
                >
                    Name
                </label>

                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        clearError("name");
                    }}
                    placeholder="Enter your name"
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 dark:bg-white/[0.03] ${errors.name
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-main/10 focus:border-main focus:ring-2 focus:ring-main/10 dark:border-white/10"
                        }`}
                />

                {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">
                        {errors.name}
                    </p>
                )}
            </div>

            {/* Email */}
            <div className="mb-6">
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-foreground dark:text-white"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                    placeholder="Enter your email"
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 dark:bg-white/[0.03] ${errors.email
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-main/10 focus:border-main focus:ring-2 focus:ring-main/10 dark:border-white/10 text-gray-400"
                        }`}
                />

                {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-main px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? (
                    <>
                        <LoaderCircle
                            size={18}
                            className="animate-spin"
                        />
                        Updating...
                    </>
                ) : (
                    <>
                        <Save size={18} />
                        Update Profile
                    </>
                )}
            </button>
        </form>
    );
}