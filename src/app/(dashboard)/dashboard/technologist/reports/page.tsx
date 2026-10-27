import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import ReportsClient from "@/components/reports/ReportsClient";
import { IGetReportsResponse } from "@/types/reports/reports.types";
import { redirect } from "next/navigation";


export default async function ReportsPage() {
    const page = 1;
    const limit = 10;

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    const result = await fetchWithAuth<IGetReportsResponse>(
        `/api/reports?${params.toString()}`,
        {
            method: "GET",
            tags: ["reports"],
            revalidate: 60,
        }
    );

    switch (result.status) {
        case 403:
            redirect("/forbidden");

        case 401:
            redirect("/sign-in");

        case 500:
            throw new Error(
                result.data?.message || "Failed to fetch reports"
            );
    }

    if (result.status !== 200 || !result.data?.data) {
        throw new Error(
            result.error?.message || "Failed to load reports"
        );
    }

    const data = result.data.data;

    return (
        <div className="space-y-6">
            <ReportsClient
                initialReports={data.reports}
                initialPagination={data.pagination}
            />
        </div>
    );
}