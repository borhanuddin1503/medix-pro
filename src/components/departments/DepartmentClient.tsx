"use client";

import { IDepartment } from "@/components/admin/DepartmentsClient";
import Image from "next/image";
import Link from "next/link";
import defualtProfile from '../appoinment/doctor-placeholder.png'

interface Props {
    initialData: IDepartment[];
}

export default function DepartmentClient({ initialData }: Props) {
    if (!initialData.length) {
        return (
            <div className="mx-auto max-w-xl rounded-xl border border-main/10 bg-main/5 p-8 text-center">
                <h2 className="text-lg font-semibold text-foreground">
                    No Departments Found
                </h2>
                <p className="mt-2 text-sm text-foreground/60">
                    There are no departments available at the moment.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {initialData.map((dept, index) => (
                <DepartmentItem key={dept._id} dept={dept} index={index} />
            ))}
        </div>
    );
}

function DepartmentItem({
    dept,
    index,
}: {
    dept: IDepartment;
    index: number;
}) {
    const gradients = [
        "from-rose-500/10 to-main/5",
        "from-blue-500/10 to-main/5",
        "from-violet-500/10 to-main/5",
        "from-emerald-500/10 to-main/5",
        "from-amber-500/10 to-main/5",
        "from-cyan-500/10 to-main/5",
    ];

    const borderColors = [
        "border-rose-500/20",
        "border-blue-500/20",
        "border-violet-500/20",
        "border-emerald-500/20",
        "border-amber-500/20",
        "border-cyan-500/20",
    ];

    const iconBg = [
        "bg-rose-500/10 text-rose-500",
        "bg-blue-500/10 text-blue-500",
        "bg-violet-500/10 text-violet-500",
        "bg-emerald-500/10 text-emerald-500",
        "bg-amber-500/10 text-amber-500",
        "bg-cyan-500/10 text-cyan-500",
    ];

    const colorIndex = index % gradients.length;

    return (
        <Link
            href={`/departments/${dept._id}`}
            className={`
                group relative overflow-hidden rounded-3xl border
                bg-gradient-to-br ${gradients[colorIndex]}
                ${borderColors[colorIndex]}
                dark:border-gray-700 dark:bg-gray-800/50
                p-6 shadow-md
                transition duration-300 hover:-translate-y-2 hover:shadow-xl
                flex flex-col gap-4
            `}
        >
            {/* Active Badge */}
            <div className="absolute right-4 top-4">
                <span
                    className={`
                    rounded-full px-3 py-1 text-xs font-semibold
                    ${dept.isActive
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-red-500/10 text-red-400"
                        }
                `}
                >
                    {dept.isActive ? "Active" : "Inactive"}
                </span>
            </div>

            {/* Icon */}
            <Image
                className={`
                flex h-14 w-14 items-center justify-center
                rounded-2xl text-2xl ${iconBg[colorIndex]}
                transition duration-300 group-hover:scale-110
            `}
                src={dept.icon || defualtProfile}
                alt="department"
                width={56}
                height={56}
            >
            </Image>

            {/* Text */}
            <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-main">
                    {dept.name}
                </h3>
                {dept.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/60">
                        {dept.description}
                    </p>
                )}
            </div>

            {/* Bottom link */}
            <div className="flex items-center gap-1 text-sm font-semibold text-main">
                View Doctors
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                </span>
            </div>

            {/* Decorative circle */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-main/5 transition duration-300 group-hover:scale-150" />
        </Link>
    );
}