import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { IDepartment } from "@/components/admin/DepartmentsClient";
import DepartmentClient from "@/components/departments/DepartmentClient";

export interface IDepartmentRes {
    success: boolean;
    message: string;
    data?: {
        departments: IDepartment[],
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        },
    };
}

export default async function DepartmentsPage() {
    let initialData: IDepartment[] = [];
    let errorMessage = "";

    try {
        const departmentRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/departments`,
            {
                method: 'GET',
                next: {
                    tags: ['departments']
                }
            },
        );

        const departmentResult = await departmentRes.json();

        if (!departmentResult?.success) {
            errorMessage =
                departmentResult.message || "Failed to load departments.";
        } else {
            initialData = departmentResult.data?.departments ?? [];
        }
    } catch (error) {
        console.error("Departments fetch error:", error);

        errorMessage =
            "Unable to load departments right now. Please try again later.";
    }

    return (
        <section className="relative overflow-hidden py-10">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                        Our Departments
                    </span>

                    <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                        World-Class Medical{" "}
                        <span className="text-main">Departments</span>
                    </h1>

                    <p className="mt-3 text-base leading-8 text-foreground/60">
                        Explore our specialized departments staffed by expert doctors
                        committed to delivering the best healthcare experience.
                    </p>
                </div>

                {/* Error */}
                {errorMessage ? (
                    <div className="mx-auto max-w-xl rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
                        <h2 className="text-lg font-semibold text-red-500">
                            Failed to load departments
                        </h2>

                        <p className="mt-2 text-sm text-foreground/60">
                            {errorMessage}
                        </p>
                    </div>
                ) : (
                    <DepartmentClient initialData={initialData} />
                )}
            </div>
        </section>
    );
}