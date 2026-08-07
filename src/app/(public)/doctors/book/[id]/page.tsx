import { notFound } from "next/navigation";

import { getDoctors } from "@/app/actions/doctor-actions";
import AppointmentBooking from "@/components/appoinment/Appointmentbooking";
import { IActionResponse, IDoctor, IPaginatedDoctors } from "@/types/doctor-types/doctorTypes";
import { getUser } from "@/app/utils/getUser";


interface Props {
    params: Promise<{
        id: string;
    }>;
}


export default async function Page({ params }: Props) {
    const { id } = await params;
    const result: IActionResponse<IPaginatedDoctors> = await getDoctors(
        1,
        8,
        id
    );

    if (
        !result.success ||
        !result.data
    ) {
        console.log('doctor data not found')
        notFound();
    }

    const user = await getUser();
    const doctor = result.data.doctors[0];


    return (
        <main className=" bg-main/5 py-10">

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">


                {/* Header */}
                <div className="mb-10 text-center">

                    <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                        Book Your <span className="text-main">Appointment</span>
                    </h1>


                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-foreground/60">
                        Choose your preferred date and time to schedule an
                        appointment with our specialist doctor.
                    </p>

                </div>



                {/* Booking Component */}
                <AppointmentBooking
                    doctor={doctor}
                    user={user}
                />


            </div>

        </main>
    );
}