import { redirect } from "next/navigation";

import { fetchWithAuth } from "../actions/fetchWithAuth.action";
import MyAppointments from "@/components/appoinment/MyAppointments";
import MyAppointmentsClient from "@/components/appoinment/MyAppointmentsClient";

export default async function Page() {
    const page = 1;
    const limit = 5;
    const appointments = await fetchWithAuth(`/api/appointments/my-appointments?page=${page}&limit=${limit}`, {
        method: "GET",
        tags: ['appointments' , `appointments-${page}`],
        revalidate: 30
    });

    switch (appointments.status) {
        case 200: break;
        case 401:
            redirect(`/sign-in?redirect=${encodeURIComponent("/appointments")}`);

        case 403:
            redirect(`/forbidden?redirect=${encodeURIComponent("/appointments")}`);
    }



    console.log("appointments", appointments);


    return (
        <main className="bg-main/5 py-10">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                        My <span className="text-main">Appointments</span>
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-foreground/60">
                        View all of your upcoming and previous appointments,
                        track payment status, and manage your bookings in one
                        place.
                    </p>
                </div>

                <MyAppointmentsClient
                    initialAppointments={appointments}
                />
            </div>
        </main>
    );
}