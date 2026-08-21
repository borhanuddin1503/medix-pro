
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import PatientsClient from "@/components/admin/PatientsClient";

export default async function PatientsPage() {
    const page = 1;
    const limit = 1;


    const result = await fetchWithAuth(
        `/api/admin/patients?page=${page}&limit=${limit}`,
        {
            method: "GET",
            tags: ['patients', `patient-${page}`]
        }
    );

    if (result.status < 200 || result.status >= 300) {
        throw new Error(
            result.data?.message ||
            "Failed to fetch patients"
        );
    }

    const patientsData = result.data.data;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold">
                    Patients
                </h1>

                <p className="mt-1 text-sm text-base-content/60">
                    Manage and monitor registered patients
                </p>
            </div>

            {/* Patients */}
            <PatientsClient
                initialPatients={patientsData.patients}
                initialPagination={
                    patientsData.pagination
                }
            />
        </div>
    );
}