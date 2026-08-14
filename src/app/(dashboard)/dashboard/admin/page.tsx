import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import AdminStats from "@/components/admin/AdminStats";
import AppointmentStats from "@/components/admin/AppointmentStats";
import PendingDoctors from "@/components/admin/PendingDoctors";
import RecentPayments from "@/components/admin/RecentPayments";
import RevenueChart from "@/components/admin/RevenueChart";
import TodayAppointments from "@/components/admin/TodayAppointments";
import { redirect } from "next/navigation";


export default async function AdminPage() {
    const response = await fetchWithAuth(
        "/api/admin/dashboard",
        {
            method: "GET",
            tags: ["admin-dashboard"],
            revalidate: 60,
        }
    );

    if (response.status === 401) {
        return redirect('/');
    }

    if (response.status !== 200) {
        return <div className="min-h-[calc(100dvh-140px)] flex justify-center items-center  text-red-400 font-bold">Failed to load dashboard</div>;
    }


    const dashboard = response.data.data;

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