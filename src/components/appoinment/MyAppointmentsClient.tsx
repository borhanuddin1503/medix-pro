"use client";

import { useState, useTransition } from "react";

import MyAppointments from "./MyAppointments";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import Pagination from "../doctors/Pagination";

export default function MyAppointmentsClient({
    initialAppointments,
}: {
    initialAppointments: any;
}) {
    const [appointments, setAppointments] =
        useState(initialAppointments);

    const [page, setPage] = useState(
        initialAppointments.data.pagination?.page
    );

    const [isPending, startTransition] = useTransition();

    async function handlePageChange(nextPage: number) {
        startTransition(async () => {
            const result = await fetchWithAuth(
                `/api/appointments/my-appointments?page=${nextPage}&limit=5`,
                {
                    method: "GET",
                    tags: ['appoinments', `appointments-${page}`],
                    revalidate: 30
                }
            );

            if (result.status === 200) {
                setAppointments(result);
                setPage(nextPage);
            }

            window.scrollTo({ top: 0, behavior: "smooth" });

        });
    }

    return (
        <>
            <MyAppointments appointments={appointments} />

            <Pagination
                currentPage={page}
                totalPages={
                    appointments.data.pagination?.totalPages
                }
                onPageChange={handlePageChange}
                isPending={isPending}
            />
        </>
    );
}