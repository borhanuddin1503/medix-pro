
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { IGetAppointmentsResponse } from "@/components/admin/AppoinmentClient";
import ReportForm from "@/components/reports/ReportForm";
import {
    IActionResponse,
    IPaginatedDoctors,
} from "@/types/doctor-types/doctorTypes";

const ReportsPage = async () => {
    try {
        const [appointmentsResponse, doctorsResponse] = await Promise.all([
            fetchWithAuth<IGetAppointmentsResponse>(
                "/api/dashboard/appointments"
            ),
            fetchWithAuth<IActionResponse<IPaginatedDoctors>>(
                "/api/doctors"
            ),
        ]);

        const appointments = appointmentsResponse.data;
        const doctors = doctorsResponse.data;

        return (
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-main">
                        Create Report
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create and assign a medical report for a patient.
                    </p>
                </div>

                <ReportForm
                    appointments={appointments?.data?.appointments || []}
                    doctors={doctors?.data?.doctors || []}
                />
            </div>
        );
    } catch (error) {
        console.error("Failed to load report page data:", error);

        return (
            <div className="flex min-h-[400px] items-center justify-center p-6">
                <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                    <h2 className="text-lg font-semibold text-red-600">
                        Failed to load data
                    </h2>

                    <p className="mt-2 text-sm text-red-500">
                        We couldn't load the appointments and doctors data.
                        Please try again later.
                    </p>
                </div>
            </div>
        );
    }
};

export default ReportsPage;
