import { getDoctors, getDoctorsByAdmin } from "@/app/actions/doctor-actions";
import AdminDoctorsTable from "@/components/admin/AdminDoctorsTable";

export default async function Page() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 8;

  const initialData = await getDoctorsByAdmin(
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    "",
    ""
  );



  const specializations = [
    "Cardiologist",
    "General Physician",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
  ];

  return (
    <AdminDoctorsTable
      initialData={initialData}
      limit={DEFAULT_LIMIT}
      specializations={specializations}
    />
  );
}
