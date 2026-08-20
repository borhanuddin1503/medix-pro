"use server";

import {
    IActionResponse,
    IBookAppointmentPayload,
    IBookingConfirmation,
    IDoctor,
    IPaginatedDoctors,
} from "@/types/doctor-types/doctorTypes";
import { fetchWithAuth } from "./fetchWithAuth.action";
import { cookies } from "next/headers";


export async function getDoctors(
    page = 1,
    limit = 8,
    doctorId?: string,
    search?: string,
    specialization?: string
): Promise<
    IActionResponse<
        IPaginatedDoctors>
> {

    try {

        let url =
            `${process.env.SERVER_URL}/api/doctors?page=${page}&limit=${limit}&search=${search || ""}&specialization=${specialization || ""}`;


        if (doctorId) {
            url += `&doctorId=${doctorId}`;
        }


        const res = await fetch(
            url,
            {
                next: {
                    tags: doctorId
                        ? [`doctors , doctor-${doctorId}`]
                        : [`doctors , doctors-page-${page}`],
                    revalidate: 30,
                },
            }
        );


        const result = await res.json();


        if (!res.ok) {

            return {
                success: false,
                message:
                    result.message ||
                    "Failed to fetch doctors",
            };

        }

        return result;

    } catch (error) {

        console.error(error);


        return {
            success: false,
            message:
                "Something went wrong. Please try again.",
        };
    }
}






// book appoinment actions
export async function bookAppointment(
    payload: IBookAppointmentPayload
): Promise<IActionResponse<IBookingConfirmation>> {

    try {

        const response = await fetchWithAuth(
            "/api/appointments",
            {
                method: "POST",
                body: payload,
            }
        );


        const { status, data } = response;


        if (status !== 201) {
            return {
                success: false,
                message:
                    data.message ||
                    "Failed to book appointment",
            };
        }


        return data;
    } catch (error) {

        console.error(
            "Book appointment action error:",
            error
        );


        return {
            success: false,
            message:
                "Something went wrong. Please try again.",
        };
    }
}





// admin doctor get action
export async function getDoctorsByAdmin(
    page = 1,
    limit = 8,
    doctorId?: string,
    search?: string,
    specialization?: string
): Promise<
    IActionResponse<
        IPaginatedDoctors>
> {

    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('access_token')?.value;


        if (!accessToken) {
            return {
                success: false,
                message: 'Not Authorized',
            };
        }

        console.log('doctorId' , doctorId)

        let url =
            `${process.env.SERVER_URL}/api/doctors/admin?page=${page}&limit=${limit}&search=${search || ""}&specialization=${specialization || ""}`;


        if (doctorId) {
            url += `&doctorId=${doctorId}`;
        }


        console.log('final url', url)


        const res = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },

                next: {
                    ...(!doctorId
                        ? { tags: ['doctors-admin', `page-${page}`], revalidate: 60 }
                        : {}),
                }
            }
        );


        const result = await res.json();


        if (!res.ok) {

            return {
                success: false,
                message:
                    result.message ||
                    "Failed to fetch doctors",
            };

        }

        return result;

    } catch (error) {

        console.error(error);


        return {
            success: false,
            message:
                "Something went wrong. Please try again.",
        };
    }
}