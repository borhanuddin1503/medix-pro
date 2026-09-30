
import { IDepartment } from "@/components/admin/DepartmentsClient";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FolderKanban,
    Info,
} from "lucide-react";
import Link from "next/link";

interface DepartmentPageProps {
    params: Promise<{
        id?: string;
    }>;
}

interface DepartmentResponse {
    success: boolean;
    message: string;
    data?: {
        department: IDepartment;
    };
}

const Page = async ({ params }: DepartmentPageProps) => {
    const { id } = await params;

    if (!id) {
        notFound();
    }

    let department: IDepartment | null = null;
    let errorMessage = "";

    try {
        const departmentRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/departments/${id}`,
            {
                method: "GET",
                next: {
                    tags: [`department-${id}`],
                },
            }
        );

        const result: DepartmentResponse = await departmentRes.json();

        if (!departmentRes.ok || !result.success || !result.data) {
            errorMessage =
                result.message || "Department could not be found.";
        } else {
            department = result.data.department;
        }
    } catch (error) {
        console.error("Department details fetch error:", error);
        errorMessage =
            "Something went wrong while loading the department.";
    }

    if (!department) {
        return (
            <section className="relative overflow-hidden py-10">
                <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />
                <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex min-h-[500px] items-center justify-center">
                        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-background p-8 text-center shadow-sm dark:border-red-900/40">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
                                <Info className="h-7 w-7 text-red-500" />
                            </div>

                            <h2 className="text-xl font-semibold text-foreground">
                                Department Not Found
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-foreground/60">
                                {errorMessage ||
                                    "The requested department could not be found."}
                            </p>

                            <Link
                                href="/departments"
                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-main px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                <ArrowLeft size={17} />
                                Back to Departments
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const createdDate = new Date(
        department.createdAt
    ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const updatedDate = new Date(
        department.updatedAt
    ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <section className="relative overflow-hidden py-10">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />
            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-10 text-center">
                    <Link
                        href="/departments"
                        className="mb-5 inline-flex items-center gap-2 text-sm text-foreground/60 transition hover:text-main"
                    >
                        <ArrowLeft size={16} />
                        Back to Departments
                    </Link>

                    <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-main">
                        Department Details
                    </span>

                    <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                        {department.name}
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-foreground/60">
                        Learn more about this department and the healthcare
                        services available through Medix Pro.
                    </p>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Department Card */}
                    <div className="lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm">
                            {/* Icon */}
                            <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-main/5">
                                {department.icon ? (
                                    <img
                                        src={department.icon}
                                        alt={department.name}
                                        className="h-48 w-48 rounded-2xl object-cover shadow-sm"
                                    />
                                ) : (
                                    <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-main/10">
                                        <FolderKanban className="h-20 w-20 text-main" />
                                    </div>
                                )}

                                {/* Status */}
                                <div className="absolute right-5 top-5">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                                            department.isActive
                                                ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                                : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                                        }`}
                                    >
                                        <span
                                            className={`h-2 w-2 rounded-full ${
                                                department.isActive
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        />

                                        {department.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6 md:p-8">
                                <div className="border-b border-foreground/10 pb-6">
                                    <h2 className="text-2xl font-bold text-foreground">
                                        {department.name}
                                    </h2>

                                    <p className="mt-3 leading-7 text-foreground/60">
                                        {department.description ||
                                            "No description has been added for this department."}
                                    </p>
                                </div>

                                {/* Information */}
                                <div className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2">
                                    <InfoItem
                                        icon={<CalendarDays size={18} />}
                                        label="Created At"
                                        value={createdDate}
                                    />

                                    <InfoItem
                                        icon={<Clock3 size={18} />}
                                        label="Last Updated"
                                        value={updatedDate}
                                    />

                                    <InfoItem
                                        icon={<CheckCircle2 size={18} />}
                                        label="Availability"
                                        value={
                                            department.isActive
                                                ? "Currently Available"
                                                : "Currently Unavailable"
                                        }
                                    />

                                    <InfoItem
                                        icon={<FolderKanban size={18} />}
                                        label="Department"
                                        value={department.name}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Information */}
                    <div className="space-y-6">
                        {/* Availability Card */}
                        <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-main/10">
                                    <CheckCircle2 className="h-5 w-5 text-main" />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        Department Availability
                                    </h3>

                                    <p className="text-xs text-foreground/50">
                                        Current department status
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 rounded-xl bg-foreground/5 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-foreground/60">
                                        Status
                                    </span>

                                    <span
                                        className={`text-sm font-semibold ${
                                            department.isActive
                                                ? "text-green-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {department.isActive
                                            ? "Available"
                                            : "Unavailable"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* About Card */}
                        <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-main/10">
                                    <Info className="h-5 w-5 text-main" />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        About This Department
                                    </h3>

                                    <p className="text-xs text-foreground/50">
                                        Medix Pro healthcare services
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-7 text-foreground/60">
                                {department.description ||
                                    "This department provides healthcare services through Medix Pro. Contact the hospital for more information."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => {
    return (
        <div className="flex gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-main/10 text-main">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/40">
                    {label}
                </p>

                <p className="mt-1 break-words text-sm font-medium text-foreground">
                    {value}
                </p>
            </div>
        </div>
    );
};

export default Page;
