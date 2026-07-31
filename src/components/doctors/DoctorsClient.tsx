"use client";

import { useEffect, useState, useTransition } from "react";
import { LayoutGrid, List, Users } from "lucide-react";

import { getDoctors } from "@/app/actions/doctor-actions";
import type {
  IActionResponse,
  IPaginatedDoctors,
} from "../../types/doctor-types/doctorTypes";

import Pagination from "./Pagination";
import DoctorCard from "./Doctorcard";
import DoctorListRow from "./Doctorlistrow";

export default function DoctorsClient({
  initialData,
  limit,
}: {
  initialData: IActionResponse<IPaginatedDoctors>;
  limit: number;
}) {
  const [data, setData] =
    useState<IActionResponse<IPaginatedDoctors>>(initialData);

  const [error, setError] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visible, setVisible] = useState(false);

  const [isPending, startTransition] = useTransition();

  const doctors = data.data?.doctors ?? [];
  const currentPage = data.data?.page ?? 1;
  const totalPages = data.data?.totalPages ?? 1;
  const total = data.data?.total ?? 0;

  // Retrigger the staggered fade-in whenever a new page of doctors lands
  useEffect(() => {
    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [data]);

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) {
      return;
    }

    setError("");

    startTransition(async () => {
      const result = await getDoctors(nextPage, limit);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setData(result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  console.log('data' , data)

  return (
    <div className="relative">
      {/* Top loading bar */}
      <div
        className={`pointer-events-none absolute -top-4 left-0 right-0 h-0.5 overflow-hidden rounded-full bg-main/10 transition-opacity duration-300 ${
          isPending ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-full w-1/3 animate-[loading-slide_1.1s_ease-in-out_infinite] rounded-full bg-main" />
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-main/10 bg-main/5 px-5 py-3.5">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
          <Users size={16} className="text-main" />
          Showing <span className="font-semibold text-foreground">{doctors.length}</span>{" "}
          of <span className="font-semibold text-foreground">{total}</span> doctors
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-main/10 bg-background/70 p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-label="Grid view"
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
              view === "grid"
                ? "bg-main text-white"
                : "text-foreground/50 hover:text-main"
            }`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-label="List view"
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
              view === "list"
                ? "bg-main text-white"
                : "text-foreground/50 hover:text-main"
            }`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Grid view */}
      {view === "grid" && (
        <div
          className={`grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 transition-opacity duration-300 ${
            isPending ? "opacity-50" : "opacity-100"
          }`}
        >
          {doctors.map((doctor, index) => (
            <div
              key={doctor._id}
              className={`transition-all duration-500 ease-out ${
                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${index * 70}ms` : "0ms" }}
            >
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      )}

      {/* List view — an alternative to cards for scanning many doctors quickly */}
      {view === "list" && (
        <div
          className={`flex flex-col gap-4 transition-opacity duration-300 ${
            isPending ? "opacity-50" : "opacity-100"
          }`}
        >
          {doctors.map((doctor, index) => (
            <div
              key={doctor._id}
              className={`transition-all duration-500 ease-out ${
                visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}
            >
              <DoctorListRow doctor={doctor} />
            </div>
          ))}
        </div>
      )}

      {!isPending && doctors.length === 0 && (
        <p className="mt-10 text-center text-foreground/60">
          No doctors found.
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isPending={isPending}
      />

      <style>{`
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}