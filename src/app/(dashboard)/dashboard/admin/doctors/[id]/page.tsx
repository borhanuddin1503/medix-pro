import { getDoctorsByAdmin } from "@/app/actions/doctor-actions";
import { notFound } from "next/navigation";
import {
  Mail,
  Phone,
  Award,
  Wallet,
  BadgeCheck,
  GraduationCap,
  Building2,
  MapPin,
  DoorOpen,
  CalendarDays,
  Clock,
} from "lucide-react";
import DoctorActions from "@/components/admin/Doctoractions";

interface DoctorDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DoctorDetailsPage({
  params,
}: DoctorDetailsPageProps) {
  const { id } = await params;

  const result = await getDoctorsByAdmin(1, 8, id, undefined, undefined);

  if (!result.success || !result.data) {
    notFound();
  }

  const doctor = result?.data?.doctors[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground dark:text-white">
          Doctor Details
        </h1>

        <p className="mt-1 text-sm text-foreground/60 dark:text-white/40">
          View complete information about this doctor.
        </p>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-main/10 bg-gradient-to-br from-main/80 to-main/70 p-6 shadow-md dark:border-gray-700 dark:from-emerald-600 dark:to-emerald-800 dark:shadow-lg dark:shadow-emerald-950/40 sm:p-8">
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-14 -left-14 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <img
            src={doctor.profileImage || "/images/default-doctor.png"}
            alt={doctor.name}
            className="h-28 w-28 shrink-0 rounded-2xl border-4 border-white/20 object-cover shadow-lg"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight text-white">
                {doctor.name}
              </h2>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  doctor.isApproved
                    ? "bg-white/20 text-white"
                    : "bg-black/20 text-white"
                }`}
              >
                <BadgeCheck size={12} />
                {doctor.isApproved ? "Approved" : "Pending Approval"}
              </span>
            </div>

            <p className="mt-1 font-medium text-white/85">
              {doctor.specialization}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                <Award size={13} />
                {doctor.experience} yrs experience
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                <Wallet size={13} />৳{doctor.fees} fee
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                <Mail size={13} />
                {doctor.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Status + Actions */}
      <div className="rounded-3xl border border-main/10 bg-background p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03] dark:shadow-none">
        <h2 className="mb-4 text-lg font-bold text-foreground dark:text-white">
          Account Status
        </h2>

        <div className="mb-5 flex flex-wrap gap-3">
          <Status
            label={doctor.isApproved ? "Approved" : "Pending"}
            active={doctor.isApproved}
          />

          <Status
            label={doctor.isActive ? "Active" : "Inactive"}
            active={doctor.isActive}
          />
        </div>

        <DoctorActions
          doctorId={doctor._id}
          isActive={doctor.isActive}
          isApproved={doctor.isApproved}
        />
      </div>

      {/* Professional Information */}
      <div className="rounded-3xl border border-main/10 bg-background p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03] dark:shadow-none">
        <h2 className="mb-5 text-lg font-bold text-foreground dark:text-white">
          Professional Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Info
            icon={<Award size={15} />}
            label="Specialization"
            value={doctor.specialization}
          />

          <Info
            icon={<GraduationCap size={15} />}
            label="Experience"
            value={`${doctor.experience} years`}
          />

          <Info
            icon={<Wallet size={15} />}
            label="Consultation Fee"
            value={`৳${doctor.fees}`}
          />

          <Info
            icon={<BadgeCheck size={15} />}
            label="License Number"
            value={doctor.licenseNumber}
          />

          <Info
            icon={<GraduationCap size={15} />}
            label="Degree"
            value={
              Array.isArray(doctor.degree)
                ? doctor.degree.join(", ")
                : doctor.degree
            }
          />

          <Info
            icon={<Mail size={15} />}
            label="Email"
            value={doctor.email}
          />
        </div>
      </div>

      {/* Bio */}
      <div className="rounded-3xl border border-main/10 bg-background p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03] dark:shadow-none">
        <h2 className="mb-3 text-lg font-bold text-foreground dark:text-white">
          About Doctor
        </h2>

        <p className="leading-7 text-foreground/70 dark:text-white/60">
          {doctor.bio || "No biography available."}
        </p>
      </div>

      {/* Chamber */}
      <div className="rounded-3xl border border-main/10 bg-background p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03] dark:shadow-none">
        <h2 className="mb-5 text-lg font-bold text-foreground dark:text-white">
          Chamber Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Info
            icon={<Building2 size={15} />}
            label="Chamber Name"
            value={doctor.chamber?.name}
          />

          <Info
            icon={<MapPin size={15} />}
            label="Address"
            value={doctor.chamber?.address}
          />

          <Info
            icon={<DoorOpen size={15} />}
            label="Room Number"
            value={doctor.chamber?.roomNo}
          />
        </div>
      </div>

      {/* Availability */}
      <div className="rounded-3xl border border-main/10 bg-background p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.03] dark:shadow-none">
        <h2 className="mb-5 text-lg font-bold text-foreground dark:text-white">
          Availability
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <Info
            icon={<CalendarDays size={15} />}
            label="Available Days"
            value={doctor.availableDays?.join(", ") || "Not specified"}
          />

          <Info
            icon={<Clock size={15} />}
            label="Available Time"
            value={doctor.availableTime || "Not specified"}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================
   Info Component
========================= */

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-main/10 p-4 dark:border-gray-700">
      <div className="flex items-center gap-1.5 text-main dark:text-emerald-400">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/40 dark:text-white/40">
          {label}
        </p>
      </div>

      <p className="mt-1.5 text-sm font-semibold text-foreground dark:text-white">
        {value || "Not available"}
      </p>
    </div>
  );
}

/* =========================
   Status Component
========================= */

function Status({
  label,
  active,
}: {
  label: string;
  active: boolean | undefined;
}) {
  return (
    <span
      className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
        active
          ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
      }`}
    >
      {label}
    </span>
  );
}