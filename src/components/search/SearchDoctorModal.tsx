"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X, Stethoscope, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { handleSearchDoctor } from "@/lib/searchDoctor";

interface Doctor {
    _id: string;
    name: string;
    profileImage: string;
    specialization: string;
}

interface SearchDoctorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchDoctorModal({
    isOpen,
    onClose,
}: SearchDoctorModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
            document.removeEventListener(
                "keydown",
                handleEsc
            );
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!search.trim()) {
            setDoctors([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setLoading(true);

                const searchResult = await handleSearchDoctor({ search })
                setDoctors(searchResult.data?.doctors || []);
                console.log(search);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[999] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 py-25">
            <div
                ref={modalRef}
                className={`
                            absolute w-full max-w-2xl h-[560px] overflow-hidden rounded-3xl
                            border border-main/10 bg-background shadow-2xl transition-all duration-300 dark:border-gray-700
                        ${isFocused
                        ? "top-10 -translate-y-0 md:top-1/2 md:-translate-y-1/2"
                        : "top-1/2 -translate-y-1/2"
                    }
                `}
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b border-main/10 dark:border-gray-700 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main">
                            <Stethoscope size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Search Doctor
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Find a doctor by name or specialization
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-muted-foreground transition hover:bg-main/10 hover:text-foreground cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search */}

                <div className="border-b border-main/10 dark:border-gray-700 p-5">
                    <div className="flex items-center gap-3 rounded-2xl border border-main/10 bg-main/5 px-4 transition focus-within:border-main/40 dark:border-gray-700 focus-within:bg-background">
                        <Search
                            size={18}
                            className="shrink-0 text-muted-foreground"
                        />

                        <input
                            autoFocus
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search by doctor name or specialization..."
                            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />

                        {loading && (
                            <Loader2
                                size={16}
                                className="shrink-0 animate-spin text-main"
                            />
                        )}
                    </div>
                </div>

                {/* Body */}

                <div className="max-h-[400px] overflow-y-auto p-2">
                    {loading && (
                        <div className="flex flex-col items-center justify-center gap-2 p-10 text-center">
                            <Loader2
                                size={22}
                                className="animate-spin text-main"
                            />
                            <p className="text-sm text-muted-foreground">
                                Searching doctors...
                            </p>
                        </div>
                    )}

                    {!loading &&
                        search &&
                        doctors.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-2 p-10 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-main/10 text-main">
                                    <Search size={20} />
                                </div>
                                <p className="text-sm font-medium text-foreground">
                                    No doctors found
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Try searching with a different name or specialization
                                </p>
                            </div>
                        )}

                    {!loading && !search && (
                        <div className="flex flex-col items-center justify-center gap-2 p-10 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-main/10 text-main">
                                <Stethoscope size={20} />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Start typing to find a doctor
                            </p>
                        </div>
                    )}

                    {!loading &&
                        doctors.map((doctor) => (
                            <Link
                                key={doctor._id}
                                href={`/doctors/book/${doctor._id}`}
                                onClick={onClose}
                                className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-main/5"
                            >
                                <Image
                                    src={doctor.profileImage}
                                    alt={doctor.name}
                                    width={50}
                                    height={50}
                                    className="h-12 w-12 shrink-0 rounded-full border border-main/10 object-cover"
                                />

                                <div className="min-w-0">
                                    <h3 className="truncate font-medium text-foreground">
                                        {doctor.name}
                                    </h3>

                                    <p className="truncate text-sm text-muted-foreground">
                                        {doctor.specialization}
                                    </p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>,
        document.body
    );
}