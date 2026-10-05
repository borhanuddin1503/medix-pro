
"use client";

import { useState } from "react";
import { Loader2, FileText } from "lucide-react";

import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import ImageUpload from "../auth/ImageUpload";
import { toast } from "sonner";

interface Doctor {
    _id: string;
    name: string;
    specialization?: string;
}

interface Appointment {
    _id: string;
    patientId?: string;
    patientName?: string;
    patientEmail?: string;
    doctorId?: string;
    doctorName?: string;
    appointmentDate?: string;
}

interface ReportFormProps {
    appointments: Appointment[];
    doctors: Doctor[];
}

interface ReportFormData {
    name: string;
    image: string;
    doctorId: string;
    appointmentId: string;
    reportType: string;
    description: string;
    result: string;
    remarks: string;
    status: string;
    testDate: string;
    reportDate: string;
}

const REPORT_TYPES = [
    "X-RAY",
    "MRI",
    "CT-SCAN",
    "ULTRASOUND",
    "BLOOD-TEST",
    "URINE-TEST",
    "ECG",
    "OTHER",
];

const REPORT_STATUS = [
    "PENDING",
    "COMPLETED",
    "CANCELLED",
];

const initialFormData: ReportFormData = {
    name: "",
    image: "",
    doctorId: "",
    appointmentId: "",
    reportType: "",
    description: "",
    result: "",
    remarks: "",
    status: "PENDING",
    testDate: "",
    reportDate: "",
};

const ReportForm = ({
    appointments,
    doctors,
}: ReportFormProps) => {
    const [formData, setFormData] =
        useState<ReportFormData>(initialFormData);

    const [errors, setErrors] = useState<
        Partial<Record<keyof ReportFormData, string>>
    >({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [serverError, setServerError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setServerError("");
    };

    const validateForm = () => {
        const newErrors: Partial<
            Record<keyof ReportFormData, string>
        > = {};

        if (!formData.name.trim()) {
            newErrors.name = "Report name is required";
        }

        if (!formData.image) {
            newErrors.image = "Report image is required";
        }

        if (!formData.doctorId) {
            newErrors.doctorId = "Please select a doctor";
        }

        if (!formData.appointmentId) {
            newErrors.appointmentId =
                "Please select an appointment";
        }

        if (!formData.reportType) {
            newErrors.reportType =
                "Please select a report type";
        }

        if (!formData.description.trim()) {
            newErrors.description =
                "Description is required";
        }

        if (!formData.result.trim()) {
            newErrors.result = "Result is required";
        }

        if (!formData.testDate) {
            newErrors.testDate = "Test date is required";
        }

        if (!formData.reportDate) {
            newErrors.reportDate =
                "Report date is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSuccessMessage("");
        setServerError("");

        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetchWithAuth(
                "/api/reports",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.status.toString().startsWith("2")) {
                throw new Error("Failed to create report");
            }

            setSuccessMessage(
                "Report created successfully."
            );
            toast.success("Report created successfully.");

            setFormData(initialFormData);
        } catch (error) {
            console.error(
                "Create report error:",
                error
            );

            setServerError(
                error instanceof Error
                    ? error.message
                    : "Failed to create report. Please try again."
            );
            toast.error("Failed to create report.");

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* SERVER ERROR */}
            {serverError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {serverError}
                </div>
            )}

            {/* SUCCESS */}
            {successMessage && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
                    {successMessage}
                </div>
            )}

            {/* BASIC INFORMATION */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <FileText size={20} />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-main">
                            Report Information
                        </h2>

                        <p className="text-sm text-gray-500">
                            Enter the basic report information.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* REPORT NAME */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Report Name *
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Chest X-Ray Report"
                            className={`w-full rounded-lg border px-4 py-2.5 outline-none transition focus:border-emerald-500 ${errors.name
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* REPORT TYPE */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Report Type *
                        </label>

                        <select
                            name="reportType"
                            value={formData.reportType}
                            onChange={handleChange}
                            className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-emerald-500 ${errors.reportType
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        >
                            <option value="">
                                Select report type
                            </option>

                            {REPORT_TYPES.map((type) => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </option>
                            ))}
                        </select>

                        {errors.reportType && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.reportType}
                            </p>
                        )}
                    </div>

                    {/* DOCTOR */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Doctor *
                        </label>

                        <select
                            name="doctorId"
                            value={formData.doctorId}
                            onChange={handleChange}
                            className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-emerald-500 ${errors.doctorId
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        >
                            <option value="">
                                Select doctor
                            </option>

                            {doctors.map((doctor) => (
                                <option
                                    key={doctor._id}
                                    value={doctor._id}
                                >
                                    {doctor.name}
                                    {doctor.specialization
                                        ? ` - ${doctor.specialization}`
                                        : ""}
                                </option>
                            ))}
                        </select>

                        {errors.doctorId && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.doctorId}
                            </p>
                        )}
                    </div>

                    {/* APPOINTMENT */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Appointment *
                        </label>

                        <select
                            name="appointmentId"
                            value={formData.appointmentId}
                            onChange={handleChange}
                            className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-emerald-500 ${errors.appointmentId
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        >
                            <option value="">
                                Select appointment
                            </option>

                            {appointments.map(
                                (appointment) => (
                                    <option
                                        key={appointment._id}
                                        value={appointment._id}
                                    >
                                        {appointment.patientName ||
                                            "Unknown Patient"}{" "}
                                        -{" "}
                                        {appointment.doctorName ||
                                            "Unknown Doctor"}
                                    </option>
                                )
                            )}
                        </select>

                        {errors.appointmentId && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.appointmentId}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* IMAGE */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-lg font-semibold text-main">
                    Report Image
                </h2>

                <p className="mb-5 text-sm text-gray-500">
                    Upload the scanned report or test document.
                </p>

                <ImageUpload
                    value={formData.image}
                    onChange={(value) => {
                        setFormData((prev) => ({
                            ...prev,
                            image: value,
                        }));

                        setErrors((prev) => ({
                            ...prev,
                            image: "",
                        }));
                    }}
                    error={errors.image}
                    onClearError={() => {
                        setErrors((prev) => ({
                            ...prev,
                            image: "",
                        }));
                    }}
                />
            </div>

            {/* DESCRIPTION & RESULT */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold text-main">
                    Clinical Information
                </h2>

                <div className="space-y-5">
                    {/* DESCRIPTION */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description *
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe the test or examination..."
                            className={`w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-emerald-500 ${errors.description
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* RESULT */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Result *
                        </label>

                        <textarea
                            name="result"
                            value={formData.result}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Enter the test result..."
                            className={`w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-emerald-500 ${errors.result
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        {errors.result && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.result}
                            </p>
                        )}
                    </div>

                    {/* REMARKS */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Remarks
                        </label>

                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Any additional remarks..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
                        />
                    </div>
                </div>
            </div>

            {/* DATES & STATUS */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold text-main">
                    Report Details
                </h2>

                <div className="grid gap-5 md:grid-cols-3">
                    {/* TEST DATE */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Test Date *
                        </label>

                        <input
                            type="date"
                            name="testDate"
                            value={formData.testDate}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-emerald-500 ${errors.testDate
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        {errors.testDate && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.testDate}
                            </p>
                        )}
                    </div>

                    {/* REPORT DATE */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Report Date *
                        </label>

                        <input
                            type="date"
                            name="reportDate"
                            value={formData.reportDate}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-emerald-500 ${errors.reportDate
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        {errors.reportDate && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.reportDate}
                            </p>
                        )}
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Status *
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-emerald-500"
                        >
                            {REPORT_STATUS.map((status) => (
                                <option
                                    key={status}
                                    value={status}
                                >
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* SUBMIT */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex min-w-40 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Creating...
                        </>
                    ) : (
                        "Create Report"
                    )}
                </button>
            </div>
        </form>
    );
};

export default ReportForm;

