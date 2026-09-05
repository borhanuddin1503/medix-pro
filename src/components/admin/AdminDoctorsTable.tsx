"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
    Search,
    SlidersHorizontal,
    Eye,
    MoreHorizontal,
    Check,
    X,
} from "lucide-react";

import { getDoctors, getDoctorsByAdmin } from "@/app/actions/doctor-actions";
import type {
    IActionResponse,
    IPaginatedDoctors,
} from "../../types/doctor-types/doctorTypes";
import Pagination from "../doctors/Pagination";
import SkeletonRows from "../dashboard/SkeletonRows";


interface AdminDoctorsTableProps {
    initialData: IActionResponse<IPaginatedDoctors>;
    limit: number;
    specializations: string[];
}

export default function AdminDoctorsTable({
    initialData,
    limit,
    specializations,
}: AdminDoctorsTableProps) {
    const [data, setData] =
        useState<IActionResponse<IPaginatedDoctors>>(initialData);

    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState("all");

    const [error, setError] = useState("");

    const [isPending, startTransition] = useTransition();

    const doctors = data.data?.doctors ?? [];
    const currentPage = data.data?.page ?? 1;
    const totalPages = data.data?.totalPages ?? 1;
    const total = data.data?.total ?? 0;


    //    Search করার সময় প্রতিবার API call না করে 500 ms wait
    const prevFilters = useRef({
        search: "",
        limit: initialData.data?.limit || 10,
        specialization: "all",
    });

    useEffect(() => {
        const filtersChanged =
            search !== prevFilters.current.search ||
            limit !== prevFilters.current.limit ||
            specialization !== prevFilters.current.specialization;

        if (!filtersChanged) return;


        const timer = setTimeout(() => {
            loadDoctors(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [search, specialization]);

    async function loadDoctors(page: number) {
        setError("");

        startTransition(async () => {
            const result = await getDoctorsByAdmin(
                page,
                limit,
                undefined,
                search,
                specialization === "all" ? "" : specialization
            );

            if (!result.success) {
                setError(result.message);
                return;
            }

            setData(result);
        });
    }

    function handlePageChange(nextPage: number) {
        if (
            nextPage < 1 ||
            nextPage > totalPages ||
            nextPage === currentPage
        ) {
            return;
        }

        loadDoctors(nextPage);
    }


    console.log('doctor data from admin table', data)


    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Doctors
                    </h1>

                    <p className="mt-1 text-sm text-foreground/60">
                        Manage all doctors from here.
                    </p>
                </div>

                <div className="rounded-xl bg-main/10 px-4 py-2 text-sm">
                    Total Doctors:{" "}
                    <span className="font-semibold text-main">
                        {total}
                    </span>
                </div>
            </div>

            {/* ================= FILTER ================= */}

            <div className="flex flex-col gap-3 rounded-2xl border border-main/10 bg-main/5 p-4 md:flex-row">
                {/* Search */}

                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search doctor..."
                        className="h-11 w-full rounded-xl border border-main/10 bg-background pl-10 pr-4 outline-none transition focus:border-main"
                    />
                </div>

                {/* Specialization */}

                <div className="relative ">
                    <SlidersHorizontal
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />

                    <select
                        value={specialization}
                        onChange={(e) =>
                            setSpecialization(e.target.value)
                        }
                        className="h-11 min-w-[220px] w-full appearance-none rounded-xl border border-main/10 bg-background pl-10 pr-10 outline-none focus:border-main"
                    >
                        <option value="all">
                            All Specializations
                        </option>

                        {specializations.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ================= ERROR ================= */}

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* ================= TABLE ================= */}

            <div className="relative overflow-hidden rounded-2xl border border-main/10 bg-background">
                {isPending && (
                    <div className="absolute left-0 right-0 top-0 z-10 h-1 overflow-hidden bg-main/10">
                        <div className="h-full w-1/3 animate-[loading-slide_1s_ease-in-out_infinite] bg-main" />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px] text-sm">
                        <thead>
                            <tr className="border-b border-main/10 bg-main/5 text-left">
                                <th className="px-5 py-4 font-semibold">
                                    Doctor
                                </th>

                                <th className="px-5 py-4 font-semibold text-center">
                                    Specialization
                                </th>

                                <th className="px-5 py-4 font-semibold text-center">
                                    Experience
                                </th>

                                <th className="px-5 py-4 font-semibold text-center">
                                    Fees
                                </th>

                                <th className="px-5 py-4 font-semibold text-center">
                                    Approval
                                </th>

                                <th className="px-5 py-4 font-semibold text-center">
                                    Status
                                </th>


                                <th className="px-5 py-4 font-semibold text-right">
                                    Management
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isPending ? <SkeletonRows rows={5}/> : doctors.map((doctor) => (
                                <tr
                                    key={doctor._id}
                                    className="border-b border-main/5 transition hover:bg-main/5"
                                >
                                    {/* Doctor */}

                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    doctor.profileImage ||
                                                    "/images/default-doctor.png"
                                                }
                                                alt={doctor.name}
                                                className="h-11 w-11 rounded-full object-cover"
                                            />

                                            <div>
                                                <p className="font-semibold">
                                                    {doctor.name}
                                                </p>

                                                <p className="text-xs text-foreground/50">
                                                    {doctor.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Specialization */}

                                    <td className="px-5 py-4 text-center">
                                        <span className="rounded-lg bg-main/10 px-3 py-1.5 text-xs font-medium text-main">
                                            {doctor.specialization}
                                        </span>
                                    </td>

                                    {/* Experience */}

                                    <td className="px-5 py-4 text-center">
                                        {doctor.experience} years
                                    </td>

                                    {/* Fees */}

                                    <td className="px-5 py-4 font-medium text-center">
                                        ৳{doctor.fees}
                                    </td>

                                    {/* Approval */}

                                    <td className="px-5 py-4 text-center">
                                        {doctor.isApproved ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                <Check size={13} />
                                                Approved
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                                <X size={13} />
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    {/* status */}

                                    <td className="px-5 py-4 text-center">
                                        {doctor.isActive ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                <Check size={13} />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                                <X size={13} />
                                                In Active
                                            </span>
                                        )}
                                    </td>



                                    {/* Management */}

                                    <td className="px-5 py-4 text-right">
                                        <div>
                                            {/* View */}

                                            <Link
                                                href={`/dashboard/admin/doctors/${doctor._id}`}
                                                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-main px-3 text-xs font-medium text-white transition hover:opacity-90"
                                            >
                                                <Eye size={15} />
                                                View
                                            </Link>

                                            {/* Manage */}

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty */}

                {!isPending && doctors.length === 0 && (
                    <div className="py-16 text-center">
                        <p className="font-medium">
                            No doctors found
                        </p>

                        <p className="mt-1 text-sm text-foreground/50">
                            Try another search or specialization.
                        </p>
                    </div>
                )}
            </div>

            {/* ================= PAGINATION ================= */}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isPending={isPending}
            />

            <style>{`
        @keyframes loading-slide {
          0% {
            transform: translateX(-100%);
          }

          50% {
            transform: translateX(150%);
          }

          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
        </div>
    );
}