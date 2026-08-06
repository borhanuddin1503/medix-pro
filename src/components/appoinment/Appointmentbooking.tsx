"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock,
    Mail,
    MessageSquare,
    Phone,
    User,
} from "lucide-react";

import { bookAppointment } from "@/app/actions/doctor-actions";
import type {
    IBookingConfirmation,
    IDoctor,
} from "@/types/doctor-types/doctorTypes";
import DoctorSummary from "./DoctorSummary";
import { IWhoMeUser } from "@/app/utils/getUser";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import PaymentSection from "../payments/PaymentSection";
import { toast } from "sonner";



/** Loosely matches a JS weekday name against the doctor's availableDays,
 *  tolerant of either full names ("Saturday") or abbreviations ("Sat"). */
function isDayAvailable(weekdayFull: string, availableDays: string[]) {
    const target = weekdayFull.toLowerCase();
    return availableDays.some((d) => {
        const day = d.toLowerCase().trim();
        return target.startsWith(day) || day.startsWith(target.slice(0, 3));
    });
}


// returns an array of the next `count` days, each with a value (YYYY-MM-DD), weekday, day, month, and whether it's available based on the doctor's availableDays
function getNextDays(count: number, availableDays: string[]) {
    return Array.from({ length: count }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const weekdayFull = date.toLocaleDateString("en-US", { weekday: "long" });

        return {
            value: `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(
                date.getDate()
            ).padStart(2, "0")}`,// YYYY-MM-DD
            weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
            day: date.getDate(),
            month: date.toLocaleDateString("en-US", { month: "short" }),
            available: isDayAvailable(weekdayFull, availableDays),
        };
    });
}



export default function AppointmentBooking({ doctor, user }: { doctor: IDoctor, user: IWhoMeUser | null }) {
    const days = useMemo(
        () => getNextDays(14, doctor.availableDays),
        [doctor.availableDays]
    );

    const firstAvailable = days.find((d) => d.available) ?? days[0];
    // booking state
    const [selectedDate, setSelectedDate] = useState(firstAvailable?.value ?? "");
    const [patientName, setPatientName] = useState("");
    const [phone, setPhone] = useState("");
    const [reason, setReason] = useState("");

    // payment state
    const [paymentMethod, setPaymentMethod] = useState<"NOW" | "LATER">("LATER");
    const [clientSecret, setClientSecret] = useState<string>("");
    const [isLoadingIntent, setIsLoadingIntent] = useState<boolean>(false);

    // error state
    const [error, setError] = useState("");
    const [confirmation, setConfirmation] =
        useState<IBookingConfirmation | null>(null);
    const [isPending, startTransition] = useTransition();



    // load client secret when payment method is "NOW"
    useEffect(() => {
        if (paymentMethod !== "NOW") return;

        async function createIntent() {
            try {
                setIsLoadingIntent(true);
                const paymentIntentResult = await fetchWithAuth(`/api/payments/create-payment-intent`, {
                    method: "POST",
                    body: {
                        doctorId: doctor._id
                    }
                });

                console.log('Payment intent result:', paymentIntentResult);

                if (paymentIntentResult.status !== 200) {
                    setError(paymentIntentResult.data?.message || "Failed to create payment intent");
                    return;
                }

                setClientSecret(paymentIntentResult.data?.clientSecret || "");
            } catch (error) {
                setError("Failed to create payment intent");
            } finally {
                setIsLoadingIntent(false);
            }
        }

        createIntent();
    }, [paymentMethod]);





    // add booking confirmation state and payment state to the AppointmentBooking component
    const handleBooking = async (paymentIntentId?: string) => {
        const result = await bookAppointment({
            doctorId: doctor._id,
            date: selectedDate,
            patientName,
            phone,
            email: user?.email,
            reason,
            paymentMethod: paymentMethod === 'NOW' ? 'ONLINE' : 'CASH',
            paymentIntentId,
        });

        if (!result.success || !result.data) {
            setError(result.message || "Failed to book appointment");
            return;
        }

        setConfirmation(result.data);
        toast.success("✅ Appointment booked successfully.")
    };




    // submit button is enabled only if all required fields are filled
    const canSubmit =
        selectedDate && patientName.trim() && phone.trim() && user?.email.trim();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;

        setError("");

        startTransition(async () => {
            const result = await handleBooking();
        });
    }

    // --- Confirmation state ---
    if (confirmation?.date) {
        const dateLabel = new Date(confirmation.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });

        return (
            <div className="mt-6 flex flex-col items-center rounded-3xl dark:border dark:border-gray-700 border border-main/10 bg-background px-4 py-10 text-center shadow-lg shadow-main/5 sm:mt-10 sm:px-6 sm:py-14">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-main/10 text-main sm:h-16 sm:w-16">
                    <CheckCircle2 size={28} className="sm:hidden" />
                    <CheckCircle2 size={32} className="hidden sm:block" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-foreground sm:mt-6 sm:text-2xl">
                    Appointment Confirmed!
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-foreground/60">
                    Your visit with <span className="font-semibold text-foreground">{doctor.name}</span> is
                    booked. A confirmation has been sent to your email.
                </p>

                <div className="mt-6 max-w-sm min-w-sm text-center grid-cols-2 gap-3 rounded-2xl border border-main/10 dark:bg-main bg-main/5 p-4 sm:mt-8 sm:p-5">
                    <div>
                        <p className="text-[11px] uppercase tracking-wide text-foreground/50 sm:text-xs">
                            Date
                        </p>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                            {dateLabel}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-[11px] uppercase tracking-wide text-foreground/50 sm:text-xs">
                            Booking ID
                        </p>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                            #{confirmation.bookingId}
                        </p>
                    </div>
                </div>

                <a
                    href="/doctors"
                    className="mt-8 w-full rounded-xl bg-main px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
                >
                    Back to Doctors
                </a>
            </div>
        );
    }

    // --- Booking form state ---
    return (
        <div className="mt-6 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-3 lg:items-start">
            <DoctorSummary doctor={doctor} />

            <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-main/10 dark:border-main/30 bg-background p-4 shadow-lg shadow-main/5 sm:p-6 h-full lg:col-span-2 lg:p-8 flex flex-col "
            >

                {/* Date picker */}
                <div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <CalendarDays size={16} className="shrink-0 text-main" />
                            Select Date
                        </label>
                        <span className="text-xs text-foreground/50">
                            Available: {doctor.availableDays.join(", ")}
                        </span>
                    </div>

                    <div className="mt-3 overflow-x-scroll">
                        <div className="flex w-50 gap-2 pb-2">
                            {days.map((day) => (
                                <button
                                    key={day.value}
                                    type="button"
                                    disabled={!day.available}
                                    onClick={() => setSelectedDate(day.value)}
                                    className={`flex min-w-[58px] shrink-0 flex-col items-center rounded-2xl border px-2.5 py-2 transition sm:min-w-[64px] dark:border-gray-700 sm:px-3 sm:py-2.5 ${selectedDate === day.value
                                        ? "border-main bg-main text-white"
                                        : day.available
                                            ? "border-main/10 bg-main/5 text-foreground/70 hover:border-main/30"
                                            : "cursor-not-allowed border-main/5 bg-main/5 text-foreground/25 opacity-50"
                                        }`}
                                >
                                    <span className="text-[10px] uppercase sm:text-[11px]">
                                        {day.weekday}
                                    </span>
                                    <span className="mt-1 text-base font-bold leading-none sm:text-lg">
                                        {day.day}
                                    </span>
                                    <span className="text-[10px] sm:text-[11px]">{day.month}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Time slots */}
                <div className="mt-6 sm:mt-7">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <Clock size={16} className="shrink-0 text-main" />
                            Time
                        </label>
                        <span className="text-xs text-foreground/50">
                            Chamber hours: {doctor.availableTime}
                        </span>
                    </div>


                </div>
                {/* Patient details */}
                <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2">
                    <div className="md:col-span-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <User size={15} className="shrink-0 text-main" />
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="Your full name"
                            required
                            className="mt-2 w-full rounded-xl border border-main/10 dark:border-main/20 bg-main/5 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-main/40"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <Phone size={15} className="shrink-0 text-main" />
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. +1 555 123 4567"
                            required
                            className="mt-2 w-full rounded-xl border border-main/10 dark:border-main/20 bg-main/5 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-main/40"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <Mail size={15} className="shrink-0 text-main" />
                            Email Address *
                        </label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            placeholder="you@example.com"
                            className="mt-2 w-full rounded-xl border border-main/10 dark:border-main/20 bg-main/5 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-main/40"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <MessageSquare size={15} className="shrink-0 text-main" />
                            Reason for Visit (optional)
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            placeholder="Briefly describe your symptoms or reason for the visit"
                            className="mt-2 w-full resize-none dark:border-main/20 rounded-xl border border-main/10 bg-main/5 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-main/40"
                        />
                    </div>
                </div>


                {/* payment system */}
                <div className="space-y-4 mt-3">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Choose Payment Option
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Select how you'd like to pay for your appointment.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Pay Now */}
                        <label
                            className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 ${paymentMethod === "NOW"
                                ? "border-sky-600 bg-sky-50 shadow-md dark:border-sky-500 dark:bg-sky-950/20"
                                : "border-gray-200 hover:border-sky-300 hover:shadow-sm dark:border-gray-700 dark:hover:border-sky-600"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <input
                                    type="radio"
                                    value="NOW"
                                    checked={paymentMethod === "NOW"}
                                    onChange={() => setPaymentMethod("NOW")}
                                    className="mt-1 h-5 w-5 accent-sky-600"
                                />

                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            💳 Pay Now
                                        </h4>

                                        {paymentMethod === "NOW" && (
                                            <span className="rounded-full bg-sky-600 px-2 py-1 text-xs font-medium text-white">
                                                Selected
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Complete your payment securely using Stripe before your
                                        appointment is confirmed.
                                    </p>
                                </div>
                            </div>
                        </label>

                        {/* Pay Later */}
                        <label
                            className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 ${paymentMethod === "LATER"
                                ? "border-emerald-600 bg-emerald-50 shadow-md dark:border-emerald-500 dark:bg-emerald-950/20"
                                : "border-gray-200 hover:border-emerald-300 hover:shadow-sm dark:border-gray-700 dark:hover:border-emerald-600"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <input
                                    type="radio"
                                    value="LATER"
                                    checked={paymentMethod === "LATER"}
                                    onChange={() => setPaymentMethod("LATER")}
                                    className="mt-1 h-5 w-5 accent-emerald-600"
                                />

                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            🏥 Pay Later
                                        </h4>

                                        {paymentMethod === "LATER" && (
                                            <span className="rounded-full bg-emerald-600 px-2 py-1 text-xs font-medium text-white">
                                                Selected
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Pay at the hospital or clinic during your appointment.
                                    </p>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>


                {/* payment element */}
                {paymentMethod === "NOW" && (
                    <PaymentSection
                        clientSecret={clientSecret}
                        isLoading={isLoadingIntent}
                        amount={Number(doctor.fees)}
                        onSuccess={handleBooking}
                    />
                )}


                {error && (
                    <div className="mt-4 text-sm text-red-600 text-center w-full">
                        {error}
                    </div>
                )}


                {paymentMethod === "LATER" && (
                    <button
                        type="submit"
                        disabled={!canSubmit || isPending}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-main py-3.5 text-sm font-semibold text-white shadow-lg shadow-main/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 mt-4"
                    >
                        {isPending ? "Booking..." : "Confirm Appointment"}
                    </button>
                )}
            </form>
        </div >
    );
}
