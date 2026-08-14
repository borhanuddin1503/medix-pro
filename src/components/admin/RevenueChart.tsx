"use client";

import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { FaChartLine } from "react-icons/fa6";

type Range = "7d" | "30d" | "3m" | "6m" | "1y";

type AppointmentTrend = {
    date: string;
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
};

type AppointmentSummary = {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
};

type SpecializationData = {
    specialization: string;
    count: number;
};

type AppointmentAnalyticsResponse = {
    success: boolean;
    message: string;
    data: {
        range: Range;
        summary: AppointmentSummary;
        trend: AppointmentTrend[];
        bySpecialization: SpecializationData[];
    };
};

const rangeOptions: { value: Range; label: string }[] = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "3m", label: "Last 3 months" },
    { value: "6m", label: "Last 6 months" },
    { value: "1y", label: "Last year" },
];

const summaryCards = [
    { key: "total" as const, label: "Total", color: "bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400" },
    { key: "completed" as const, label: "Completed", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" },
    { key: "pending" as const, label: "Pending", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400" },
    { key: "cancelled" as const, label: "Cancelled", color: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400" },
];

// Fixed hex values so recharts line colors line up with the theme's status palette
const lineColors = {
    total: "#059669", // main/emerald
    completed: "#2563eb", // blue
    pending: "#ca8a04", // yellow
    cancelled: "#dc2626", // red
};

export default function AppointmentChart() {
    const [range, setRange] = useState<Range>("30d");

    const [data, setData] =
        useState<AppointmentAnalyticsResponse["data"] | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointmentAnalytics = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetchWithAuth(
                    `/api/admin/dashboard/appointment-analytics?range=${range}`
                );

                const result = response.data as AppointmentAnalyticsResponse;

                if (!result.success) {
                    throw new Error(
                        result.message ||
                        "Failed to fetch appointment analytics"
                    );
                }

                setData(result.data);
            } catch (error) {
                console.error(
                    "Failed to fetch appointment analytics:",
                    error
                );

                setError("Failed to load appointment analytics");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointmentAnalytics();
    }, [range]);

    return (
        <section className="rounded-3xl border border-main/10 bg-background p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-main/10 text-main dark:bg-main/15 dark:text-emerald-400">
                        <FaChartLine size={18} />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-foreground dark:text-white">
                            Appointment Overview
                        </h2>

                        <p className="text-sm text-muted-foreground dark:text-white/40">
                            Appointment trends over time
                        </p>
                    </div>
                </div>

                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value as Range)}
                    className="rounded-xl border border-main/10 bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm outline-none transition focus:border-main/40 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                >
                    {rangeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Summary */}
            {data && (
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {summaryCards.map((card) => (
                        <div
                            key={card.key}
                            className="rounded-2xl border border-main/10 p-4 dark:border-white/10"
                        >
                            <span
                                className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${card.color}`}
                            >
                                {card.label}
                            </span>

                            <p className="mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums dark:text-white">
                                {data.summary[card.key]}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Chart */}
            <div className="h-64">
                {loading ? (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground dark:text-white/40">
                        Loading appointments...
                    </div>
                ) : error ? (
                    <div className="flex h-full items-center justify-center text-sm text-red-500 dark:text-red-400">
                        {error}
                    </div>
                ) : !data?.trend.length ? (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground dark:text-white/40">
                        No appointment data available
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.trend}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="currentColor"
                                className="text-main/10 dark:text-white/10"
                            />

                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                                stroke="currentColor"
                                className="text-foreground/40 dark:text-white/30"
                            />

                            <YAxis
                                tick={{ fontSize: 12 }}
                                stroke="currentColor"
                                className="text-foreground/40 dark:text-white/30"
                                allowDecimals={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: 12,
                                    border: "1px solid rgba(5,150,105,0.15)",
                                    fontSize: 13,
                                }}
                            />

                            <Legend
                                wrapperStyle={{ fontSize: 13 }}
                            />

                            <Line
                                type="monotone"
                                dataKey="total"
                                name="Total"
                                stroke={lineColors.total}
                                strokeWidth={2.5}
                                dot={false}
                            />

                            <Line
                                type="monotone"
                                dataKey="completed"
                                name="Completed"
                                stroke={lineColors.completed}
                                strokeWidth={2}
                                dot={false}
                            />

                            <Line
                                type="monotone"
                                dataKey="pending"
                                name="Pending"
                                stroke={lineColors.pending}
                                strokeWidth={2}
                                dot={false}
                            />

                            <Line
                                type="monotone"
                                dataKey="cancelled"
                                name="Cancelled"
                                stroke={lineColors.cancelled}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </section>
    );
}