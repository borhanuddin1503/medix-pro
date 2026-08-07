"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    isPending,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isPending?: boolean;
}) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            <button
                type="button"
                disabled={currentPage === 1 || isPending}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-main/10 text-foreground/60 transition hover:border-main/30 hover:text-main disabled:cursor-not-allowed cursor-pointer disabled:opacity-40"
                aria-label="Previous page"
            >
                <ChevronLeft size={18} />
            </button>

            {pages.map((pageNum) => (
                <button
                    key={pageNum}
                    type="button"
                    disabled={isPending}
                    onClick={() => onPageChange(pageNum)}
                    className={`h-10 w-10 rounded-full text-sm font-semibold transition ${pageNum === currentPage
                            ? "bg-main text-white"
                            : "border border-main/10 text-foreground/60 hover:border-main/30 hover:text-main dark:border-gray-700"
                        } disabled:cursor-not-allowed cursor-pointer disabled:opacity-40`}
                >
                    {pageNum}
                </button>
            ))}

            <button
                type="button"
                disabled={currentPage === totalPages || isPending}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-main/10 text-foreground/60 transition hover:border-main/30 hover:text-main disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                aria-label="Next page"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}