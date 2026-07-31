"use server";

import {
    IActionResponse,
    IBookAppointmentPayload,
    IBookingConfirmation,
    IDoctor,
    IPaginatedDoctors,
} from "@/types/doctor-types/doctorTypes";
import { fetchWithAuth } from "./fetchWithAuth.action";


export async function getDoctors(
    page = 1,
    limit = 8,
    doctorId?: string
): Promise<
    IActionResponse<
        IPaginatedDoctors>
> {

    try {

        let url =
            `${process.env.SERVER_URL}/api/doctors?page=${page}&limit=${limit}`;


        if (doctorId) {
            url += `&doctorId=${doctorId}`;
        }


        const res = await fetch(
            url,
            {
                next: {
                    tags: doctorId
                        ? [`doctor-${doctorId}`]
                        : [`doctors-page-${page}`],
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