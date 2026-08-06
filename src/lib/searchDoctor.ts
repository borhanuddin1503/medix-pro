import { IActionResponse, IPaginatedDoctors } from "@/types/doctor-types/doctorTypes";

export interface HandleSearchDoctorParams {
    search?: string;
    specialization?: string;
    page?: number;
    limit?: number;
}

export async function handleSearchDoctor({
    search,
    specialization,
    page = 1,
    limit = 10,
}: HandleSearchDoctorParams): Promise<
    IActionResponse<
        IPaginatedDoctors>
> {

    const params = new URLSearchParams();


    if (search?.trim()) {
        params.append("search", search.trim());
    }


    if (specialization && specialization !== "All Specialties") {
        params.append("specialization", specialization);
    }


    params.append("page", page.toString());
    params.append("limit", limit.toString());


    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors?${params.toString()}`,
        {
            method: "GET",
            credentials: "include",
        }
    );


    const data = await response.json();


    console.log('response data' , data)

    return data;
}