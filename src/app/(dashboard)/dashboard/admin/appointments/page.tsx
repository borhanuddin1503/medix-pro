import React from 'react'


import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { redirect } from 'next/navigation';
import ClientAppointments from '@/components/admin/AppoinmentClient';

export default async function AppointmentsPage() {
  const page = 1;
  const limit = 5;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const result = await fetchWithAuth(
    `/api/dashboard/appointments?${params.toString()}`,
    {
      method: "GET",
      tags: ['appoientments-admin'],
      revalidate: 60
    }
  );


  switch (result.status) {
    case 403:
      redirect('/forbidden')
      break

    case 401:
      redirect('/sign-in')

    case 500:
      throw new Error(
        result.data?.message ||
        "Failed to fetch appointments"
      );
  }

  const data = result.data.data;

  console.log('result from appoinments' , result)

  return (
    <div className="space-y-6">
     

      {/* Client */}
      <ClientAppointments
        initialAppointments={
          data.appointments
        }
        initialPagination={
          data.pagination
        }
      />
    </div>
  );
}