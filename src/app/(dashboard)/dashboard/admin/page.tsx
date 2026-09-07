import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import AdminStats from "@/components/admin/AdminStats";
import { Appointment } from "@/components/admin/AppoinmentClient";
import AppointmentStats from "@/components/admin/AppointmentStats";
import PendingDoctors from "@/components/admin/PendingDoctors";
import RecentPayments from "@/components/admin/RecentPayments";
import RevenueChart from "@/components/admin/RevenueChart";
import TodayAppointments from "@/components/admin/TodayAppointments";
import { redirect } from "next/navigation";


export interface IAppointmentStats {
    _id:
    | "PENDING"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";

    count: number;
}

export interface IRevenue {
    _id: null;
    total: number;
}

export interface IAdminDashboardStats {
    totalDoctors: number;
    totalPatients: number;
    todayAppointments: number;
    pendingAppointments: number;
    todayRevenue: number;
    totalRevenue: number;
}

export interface IAdminDashboardData {
    stats: IAdminDashboardStats;

    todayAppointments: Appointment[];

    recentPayments: Appointment[];

    appointmentStats: IAppointmentStats[]

    pendingDoctors: {
        _id: string;
        name?: string;
        email?: string;
    }[];
}

export interface AdminDashboardresult<T> {
    success: boolean;
    message: string;
    data?: T;
}


export default async function AdminPage() {
    const result = await fetchWithAuth<AdminDashboardresult<IAdminDashboardData>>(
        "/api/admin/dashboard",
        {
            method: "GET",
            tags: ["admin-dashboard"],
            revalidate: 60,
        }
    );

    if (result.status === 401) {
        return redirect('/sign-in');
    }
    if (result.status === 403) {
        return redirect('/forbidden');
    }

    if (
        result.status < 200 ||
        result.status >= 300 ||
        !result.data?.data
    ) {
        throw new Error(
            result.error?.message || "Failed to fetch users"
        );
    }


    const dashboard = result.data.data;

    console.log(dashboard)

    return (
        <main className="space-y-6">
            {/* Header */}
            <section>
                <h1 className="text-2xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="text-sm text-gray-500">
                    Here's what's happening today.
                </p>
            </section>

            {/* Stats */}
            <AdminStats
                stats={dashboard.stats}
            />

            {/* Today's appointments + appointment stats */}
            <section className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <TodayAppointments
                        appointments={
                            dashboard.todayAppointments
                        }
                    />
                </div>

                <AppointmentStats
                    stats={dashboard.appointmentStats}
                />
            </section>

            {/* Revenue */}
            <RevenueChart />

            {/* Payments + pending doctors */}
            <section className="grid gap-6 lg:grid-cols-2">
                <RecentPayments
                    payments={
                        dashboard.recentPayments
                    }
                />

                <PendingDoctors
                    doctors={
                        dashboard.pendingDoctors
                    }
                />
            </section>
        </main>
    );
}