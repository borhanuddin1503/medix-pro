
"use client";

import { useState } from "react";
import {
    X,
    Plus,
    Trash2,
    Clock3,
    MapPin,
    Phone,
    Mail,
    ImagePlus,
} from "lucide-react";

import ImageUpload from "../auth/ImageUpload";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { revalidateTags } from "@/app/utils/revalidateTags";
import { ILab } from "./LabsClient";

interface AddLabModalProps {
    onClose: () => void;
    onSuccess?: (lab: ILab) => void;
}

interface ICreateLabRes {
    success: boolean;
    message: string;
    data?: {
        lab: ILab;
    };
}

export default function AddLabModal({
    onClose,
    onSuccess,
}: AddLabModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("DD Lab, Feni, Chattogram, Bangladesh");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [images, setImages] = useState<string[]>([]);
    const [services, setServices] = useState<string[]>([]);
    const [serviceInput, setServiceInput] = useState("");

    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");

    const [submitError, setSubmitError] = useState<string | null>(null);

    const [errors, setErrors] = useState<{
        name?: string;
        description?: string;
        address?: string;
        phone?: string;
        email?: string;
        images?: string;
        services?: string;
        openingTime?: string;
        closingTime?: string;
    }>({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    // =========================
    // Add Service
    // =========================

    const handleAddService = () => {
        const service = serviceInput.trim();

        if (!service) return;

        if (services.includes(service)) {
            setServiceInput("");
            return;
        }

        setServices((prev) => [...prev, service]);
        setServiceInput("");

        setErrors((prev) => ({
            ...prev,
            services: undefined,
        }));
    };

    // =========================
    // Remove Service
    // =========================

    const handleRemoveService = (index: number) => {
        setServices((prev) =>
            prev.filter((_, serviceIndex) => serviceIndex !== index)
        );
    };

    // =========================
    // Submit
    // =========================

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const newErrors: typeof errors = {};

        if (!name.trim()) {
            newErrors.name = "Lab name is required";
        }

        if (!description.trim()) {
            newErrors.description = "Lab description is required";
        }

        if (!address.trim()) {
            newErrors.address = "Lab address is required";
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        }

        if (images.length === 0) {
            newErrors.images = "At least one lab image is required";
        }

        if (services.length === 0) {
            newErrors.services = "Add at least one lab service";
        }

        if (!openingTime) {
            newErrors.openingTime = "Opening time is required";
        }

        if (!closingTime) {
            newErrors.closingTime = "Closing time is required";
        }

        if (openingTime && closingTime && openingTime >= closingTime) {
            newErrors.closingTime =
                "Closing time must be later than opening time";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const result = await fetchWithAuth<ICreateLabRes>(
                "/api/labs",
                {
                    method: "POST",
                    body: {
                        name: name.trim(),
                        description: description.trim(),
                        address: address.trim(),
                        phone: phone.trim(),
                        email: email.trim(),
                        images,
                        services,
                        openingTime,
                        closingTime,
                    },
                }
            );

            if (result.status < 200 || result.status >= 300) {
                setSubmitError(
                    result.data?.message ||
                    "Failed to create lab"
                );
                return;
            }

            revalidateTags(["admin-labs"]);

            onSuccess?.(result.data?.data?.lab as ILab);

            onClose();
        } catch (error) {
            console.error("Create lab error:", error);

            setSubmitError("Failed to create lab");
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
                className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-main/10 bg-background shadow-2xl dark:border-gray-700 dark:bg-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ================= HEADER ================= */}

                <div className="sticky top-0 z-10 flex items-start justify-between border-b border-main/10 bg-background px-6 py-5 dark:border-gray-700 dark:bg-gray-900">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main dark:bg-main/15">
                                <ImagePlus size={21} />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-foreground dark:text-white">
                                    Add New Lab
                                </h2>

                                <p className="mt-0.5 text-sm text-foreground/60 dark:text-white/40">
                                    Add laboratory information and services.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-lg p-2 text-foreground/50 transition hover:bg-main/10 hover:text-main disabled:cursor-not-allowed dark:text-white/50 dark:hover:bg-main/15"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* ================= FORM ================= */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                >
                    {/* ================= IMAGES ================= */}

                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <label className="text-sm font-medium text-foreground dark:text-white">
                                Lab Images
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </label>

                            <span className="text-xs text-foreground/40 dark:text-white/30">
                                {images.length} image
                                {images.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="rounded-xl border border-dashed border-main/20 bg-main/[0.02] p-4 dark:border-gray-700 dark:bg-white/[0.02]">
                            <ImageUpload
                                value=""
                                onChange={(value) => {
                                    if (!value) return;

                                    setImages((prev) => [
                                        ...prev,
                                        value,
                                    ]);

                                    setErrors((prev) => ({
                                        ...prev,
                                        images: undefined,
                                    }));
                                }}
                                error={errors.images}
                                onClearError={() =>
                                    setErrors((prev) => ({
                                        ...prev,
                                        images: undefined,
                                    }))
                                }
                            />

                            {/* Uploaded Images */}

                            {images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {images.map((image, index) => (
                                        <div
                                            key={`${image}-${index}`}
                                            className="group relative overflow-hidden rounded-xl border border-main/10 bg-background dark:border-gray-700 dark:bg-white/[0.03]"
                                        >
                                            <img
                                                src={image}
                                                alt={`Lab image ${index + 1}`}
                                                className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setImages((prev) =>
                                                        prev.filter(
                                                            (_, imageIndex) =>
                                                                imageIndex !==
                                                                index
                                                        )
                                                    )
                                                }
                                                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/90 text-white opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-red-600"
                                            >
                                                <Trash2 size={15} />
                                            </button>

                                            <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur-sm">
                                                Image {index + 1}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {errors.images && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.images}
                            </p>
                        )}
                    </div>

                    {/* ================= BASIC INFO ================= */}

                    <div className="rounded-xl border border-main/10 p-4 dark:border-gray-700">
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-foreground dark:text-white">
                                Basic Information
                            </h3>

                            <p className="mt-1 text-xs text-foreground/50 dark:text-white/35">
                                Provide the basic details of this laboratory.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Name */}

                            <div>
                                <label
                                    htmlFor="lab-name"
                                    className="mb-2 block text-sm font-medium text-foreground dark:text-white"
                                >
                                    Lab Name
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    id="lab-name"
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
                                    placeholder="e.g. Popular Diagnostic Centre"
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
                                    htmlFor="lab-description"
                                    className="mb-2 block text-sm font-medium text-foreground dark:text-white"
                                >
                                    Description
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    id="lab-description"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);

                                        if (errors.description) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                description: undefined,
                                            }));
                                        }
                                    }}
                                    placeholder="Describe the laboratory..."
                                    rows={4}
                                    maxLength={500}
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

                            {/* Address */}

                            <div>
                                <label
                                    htmlFor="lab-address"
                                    className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground dark:text-white"
                                >
                                    <MapPin size={15} className="text-main" />
                                    Address
                                    <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="lab-address"
                                    type="text"
                                    value={address}
                                    readOnly
                                    className={`h-11 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/30 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/30 ${errors.address
                                        ? "border-red-500"
                                        : "border-main/10 focus:border-main dark:border-gray-700"
                                        }`}
                                />

                                {errors.address && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.address}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ================= CONTACT ================= */}

                    <div className="rounded-xl border border-main/10 p-4 dark:border-gray-700">
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-foreground dark:text-white">
                                Contact Information
                            </h3>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Phone */}

                            <div>
                                <label
                                    htmlFor="lab-phone"
                                    className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground dark:text-white"
                                >
                                    <Phone size={15} className="text-main" />
                                    Phone
                                    <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="lab-phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);

                                        if (errors.phone) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                phone: undefined,
                                            }));
                                        }
                                    }}
                                    placeholder="+880 1XXX-XXXXXX"
                                    className={`h-11 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/30 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/30 ${errors.phone
                                        ? "border-red-500"
                                        : "border-main/10 focus:border-main dark:border-gray-700"
                                        }`}
                                />

                                {errors.phone && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Email */}

                            <div>
                                <label
                                    htmlFor="lab-email"
                                    className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground dark:text-white"
                                >
                                    <Mail size={15} className="text-main" />
                                    Email
                                    <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="lab-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);

                                        if (errors.email) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                email: undefined,
                                            }));
                                        }
                                    }}
                                    placeholder="lab@example.com"
                                    className={`h-11 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/30 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/30 ${errors.email
                                        ? "border-red-500"
                                        : "border-main/10 focus:border-main dark:border-gray-700"
                                        }`}
                                />

                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ================= SERVICES ================= */}

                    <div className="rounded-xl border border-main/10 p-4 dark:border-gray-700">
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-foreground dark:text-white">
                                Laboratory Services
                            </h3>

                            <p className="mt-1 text-xs text-foreground/50 dark:text-white/35">
                                Add the tests and services provided by this lab.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={serviceInput}
                                onChange={(e) =>
                                    setServiceInput(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddService();
                                    }
                                }}
                                placeholder="e.g. Blood Test"
                                className="h-11 flex-1 rounded-xl border border-main/10 bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-main dark:border-gray-700 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/30"
                            />

                            <button
                                type="button"
                                onClick={handleAddService}
                                className="flex h-11 items-center gap-1.5 rounded-xl bg-main px-4 text-sm font-medium text-white transition hover:bg-main/90"
                            >
                                <Plus size={17} />
                                Add
                            </button>
                        </div>

                        {services.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {services.map((service, index) => (
                                    <div
                                        key={`${service}-${index}`}
                                        className="flex items-center gap-2 rounded-lg border border-main/10 bg-main/5 px-3 py-2 text-sm text-foreground dark:border-main/20 dark:bg-main/10 dark:text-white"
                                    >
                                        <span>{service}</span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveService(index)
                                            }
                                            className="text-foreground/40 transition hover:text-red-500 dark:text-white/40"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {errors.services && (
                            <p className="mt-2 text-xs text-red-500">
                                {errors.services}
                            </p>
                        )}
                    </div>

                    {/* ================= OPENING HOURS ================= */}

                    <div className="rounded-xl border border-main/10 p-4 dark:border-gray-700">
                        <div className="mb-4 flex items-center gap-2">
                            <Clock3 size={17} className="text-main" />

                            <div>
                                <h3 className="text-sm font-semibold text-foreground dark:text-white">
                                    Opening Hours
                                </h3>

                                <p className="mt-1 text-xs text-foreground/50 dark:text-white/35">
                                    Set the laboratory's operating hours.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Opening */}
                            <div>
                                <label
                                    htmlFor="opening-time"
                                    className="mb-2 block text-sm font-medium text-foreground dark:text-white"
                                >
                                    Opening Time
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    id="opening-time"
                                    type="time"
                                    value={openingTime}
                                    onChange={(e) => {
                                        setOpeningTime(e.target.value);

                                        if (errors.openingTime) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                openingTime: undefined,
                                            }));
                                        }
                                    }}
                                    className={`h-11 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition dark:bg-white/[0.03] dark:text-white ${errors.openingTime
                                        ? "border-red-500"
                                        : "border-main/10 focus:border-main dark:border-gray-700"
                                        }`}
                                />

                                {errors.openingTime && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.openingTime}
                                    </p>
                                )}
                            </div>

                            {/* Closing */}

                            <div>
                                <label
                                    htmlFor="closing-time"
                                    className="mb-2 block text-sm font-medium text-foreground dark:text-white"
                                >
                                    Closing Time
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <input
                                    id="closing-time"
                                    type="time"
                                    value={closingTime}
                                    onChange={(e) => {
                                        setClosingTime(e.target.value);

                                        if (errors.closingTime) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                closingTime: undefined,
                                            }));
                                        }
                                    }}
                                    className={`h-11 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition dark:bg-white/[0.03] dark:text-white ${errors.closingTime
                                        ? "border-red-500"
                                        : "border-main/10 focus:border-main dark:border-gray-700"
                                        }`}
                                />

                                {errors.closingTime && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.closingTime}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ================= ERROR ================= */}

                    {submitError && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-center text-sm text-red-500 dark:bg-red-500/10">
                            {submitError}
                        </div>
                    )}

                    {/* ================= ACTIONS ================= */}

                    <div className="flex justify-end gap-3 border-t border-main/10 pt-5 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded-xl border border-main/10 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-main/5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white dark:hover:bg-white/5"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-main px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-main/90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting && (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            )}

                            {isSubmitting
                                ? "Creating..."
                                : "Add Lab"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}