import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { Appointment, IGetAppointmentsResponse } from "@/components/admin/AppoinmentClient";
import PaymentsClient from "@/components/admin/PaymentsClient";
import MyAppointmentsClient from "@/components/appoinment/MyAppointmentsClient";

export default async function AppointmentsPage() {
    const params = new URLSearchParams({
        page: "1",
        limit: "10",
    });

    const result = await fetchWithAuth<IGetAppointmentsResponse>(
        `/api/dashboard/appointments?${params.toString()}`,
        {
            method: "GET",
            tags: ["admin-appointments"],
            revalidate: 60,
        }
    );

    const appointments: Appointment[] =
        result.data?.data?.appointments ?? [];

    console.log('appoinments from admin page.', appointments)

    const pagination = result.data?.data?.pagination ?? {
        currentPage: 1,
        limit: 10,
        totalAppointments: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
    };

    return (

        <PaymentsClient
            initialPayments={appointments}
            initialPagination={pagination}
        />
    );
}