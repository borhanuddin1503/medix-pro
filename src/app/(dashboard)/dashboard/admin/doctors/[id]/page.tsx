
import { getDoctorsByAdmin } from "@/app/actions/doctor-actions";
import { notFound } from "next/navigation";

interface DoctorDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DoctorDetailsPage({
  params,
}: DoctorDetailsPageProps) {
  const { id } = await params;
  console.log(id)

  const result = await getDoctorsByAdmin(1, 8, id , undefined, undefined);

  if (!result.success || !result.data) {
    console.log("NOT FOUND RESULT:", result);
    notFound();
  }

  const doctor = result?.data?.doctors[0];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold">
          Doctor Details
        </h1>

        <p className="mt-1 text-sm text-foreground/60">
          View complete information about this doctor.
        </p>
      </div>

      {/* Doctor Details */}

      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <div className="flex items-start gap-5">
          <img
            src={
              doctor.profileImage ||
              "/images/default-doctor.png"
            }
            alt={doctor.name}
            className="h-28 w-28 rounded-2xl object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {doctor.name}
            </h2>

            <p className="mt-1 text-main">
              {doctor.specialization}
            </p>

            <p className="mt-2 text-sm text-foreground/60">
              {doctor.email}
            </p>
          </div>
        </div>
      </div>

      {/* Professional Information */}

      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Professional Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Info
            label="Specialization"
            value={doctor.specialization}
          />

          <Info
            label="Experience"
            value={`${doctor.experience} years`}
          />

          <Info
            label="Consultation Fee"
            value={`৳${doctor.fees}`}
          />

          <Info
            label="License Number"
            value={doctor.licenseNumber}
          />

          <Info
            label="Degree"
            value={
              Array.isArray(doctor.degree)
                ? doctor.degree.join(", ")
                : doctor.degree
            }
          />

          <Info
            label="Email"
            value={doctor.email}
          />
        </div>
      </div>

      {/* Bio */}

      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <h2 className="mb-3 text-lg font-semibold">
          About Doctor
        </h2>

        <p className="leading-7 text-foreground/70">
          {doctor.bio || "No biography available."}
        </p>
      </div>

      {/* Chamber */}

      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Chamber Information
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Info
            label="Chamber Name"
            value={doctor.chamber?.name}
          />

          <Info
            label="Address"
            value={doctor.chamber?.address}
          />

          <Info
            label="Room Number"
            value={doctor.chamber?.roomNo}
          />
        </div>
      </div>

      {/* Availability */}

      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Availability
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <Info
            label="Available Days"
            value={
              doctor.availableDays?.join(", ") ||
              "Not specified"
            }
          />

          <Info
            label="Available Time"
            value={
              doctor.availableTime ||
              "Not specified"
            }
          />
        </div>
      </div>

      {/* Status */}

      <div className="rounded-2xl border border-main/10 bg-background p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Account Status
        </h2>

        <div className="flex flex-wrap gap-3">
          <Status
            label={
              doctor.isApproved
                ? "Approved"
                : "Pending"
            }
            active={doctor.isApproved}
          />

          <Status
            label={
              doctor.isActive
                ? "Active"
                : "Inactive"
            }
            active={doctor.isActive}
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
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-foreground/40">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-foreground">
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
      className={`rounded-full px-4 py-1.5 text-xs font-medium ${active
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
        }`}
    >
      {label}
    </span>
  );
}