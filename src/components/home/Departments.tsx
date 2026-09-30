
"use client";

import {
    HeartPulse,
    Brain,
    Baby,
    Bone,
    Eye,
    Stethoscope,
    ArrowRight,
    Activity,
    ShieldCheck,
    LoaderCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IDepartment {
    _id: string;
    name: string;
    description?: string;
    icon?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface DepartmentResponse {
    success: boolean;
    message: string;
    data?: {
        departments: IDepartment[];
        pagination?: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
}

const fallbackIcons = [
    HeartPulse,
    Brain,
    Baby,
    Bone,
    Eye,
    Activity,
];

export default function Departments() {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getDepartments = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/departments?page=1&limit=10`,
                    {
                        method: "GET",
                    }
                );

                const result: DepartmentResponse = await res.json();

                if (!res.ok || !result.success || !result.data) {
                    throw new Error(
                        result.message || "Failed to load departments"
                    );
                }

                setDepartments(
                    result.data.departments.filter(
                        (department) => department.isActive
                    )
                );
            } catch (error) {
                console.error("Departments fetch error:", error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load departments"
                );
            } finally {
                setLoading(false);
            }
        };

        getDepartments();
    }, []);

    return (
        <section className="relative overflow-hidden py-15">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-main/10 blur-3xl md:block" />

            <div className="mx-auto max-w-7xl px-4">
                {/* Main Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-main/10 bg-main/5 px-6 py-12 shadow-2xl shadow-main/5 dark:border-main/30 sm:px-10 lg:px-16">

                    {/* Inner Blobs */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-main/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-main/10 blur-3xl" />

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                                Our Departments
                            </span>

                            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                                Specialized Care for
                                <span className="text-main">
                                    {" "}Every Need
                                </span>
                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/60 sm:text-lg">
                                Explore our wide range of medical departments
                                and connect with experienced healthcare
                                professionals dedicated to your well-being.
                            </p>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="flex min-h-[250px] items-center justify-center">
                                <div className="flex items-center gap-3 text-main">
                                    <LoaderCircle
                                        size={24}
                                        className="animate-spin"
                                    />

                                    <span className="text-sm font-medium">
                                        Loading departments...
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {!loading && error && (
                            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-red-200 bg-background/80 p-6 text-center dark:border-red-900/40">
                                <p className="text-sm text-red-500">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Empty */}
                        {!loading &&
                            !error &&
                            departments.length === 0 && (
                                <div className="mx-auto mt-10 max-w-md rounded-2xl border border-main/10 bg-background/80 p-6 text-center">
                                    <p className="text-sm text-foreground/60">
                                        No departments are currently
                                        available.
                                    </p>
                                </div>
                            )}

                        {/* Departments Grid */}
                        {!loading &&
                            !error &&
                            departments.length > 0 && (
                                <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {departments.map(
                                        (department, index) => {
                                            const FallbackIcon =
                                                fallbackIcons[
                                                    index %
                                                        fallbackIcons.length
                                                ];

                                            return (
                                                <Link
                                                    href={`/departments/${department._id}`}
                                                    key={department._id}
                                                    className="group flex flex-col items-center justify-between rounded-2xl border border-main/10 bg-background/80 p-6 shadow-lg shadow-main/5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-main/30 hover:shadow-xl"
                                                >
                                                    <div className="flex flex-col items-center">
                                                        {/* Icon */}
                                                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-main/10 text-main transition duration-300 group-hover:bg-main group-hover:text-white">
                                                            {department.icon ? (
                                                                <img
                                                                    src={
                                                                        department.icon
                                                                    }
                                                                    alt={
                                                                        department.name
                                                                    }
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <FallbackIcon
                                                                    size={
                                                                        26
                                                                    }
                                                                />
                                                            )}
                                                        </div>

                                                        {/* Content */}
                                                        <h3 className="mt-5 text-center text-lg font-semibold text-foreground">
                                                            {
                                                                department.name
                                                            }
                                                        </h3>
                                                    </div>

                                                    {/* Action */}
                                                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-main transition group-hover:gap-3">
                                                        <span>
                                                            View Department
                                                        </span>

                                                        <ArrowRight
                                                            size={16}
                                                        />
                                                    </div>
                                                </Link>
                                            );
                                        }
                                    )}
                                </div>
                            )}

                        {/* Bottom Trust Information */}
                        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-main/10 pt-8 text-sm text-foreground/55">
                            <div className="flex items-center gap-2">
                                <ShieldCheck
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Experienced Specialists
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Stethoscope
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Multiple Medical Specialties
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <HeartPulse
                                    size={18}
                                    className="text-main"
                                />

                                <span>
                                    Patient-Centered Care
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
