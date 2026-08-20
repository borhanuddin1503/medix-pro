export interface IDoctorApplyForm {
    name: string;
    specialization: string;
    degree: string;
    experience: string;
    fees: string;
    licenseNumber: string;
    chamber: {
        name: string,
        address: string,
        roomNo: string,
    },
    bio: string;
    availableTime: string;
    availableDays: string;
}



export interface IHospitalFeature {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
}


export interface IService {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
}


export interface IDoctor {
    _id: string;
    userId: string;
    name: string;
    email: string;
    profileImage: string;
    specialization: string;
    experience: string;
    fees: string;
    availableDays: string[];
    availableTime: string;
    chamber: {
        name: string;
        address: string;
        roomNo: string;
    };
    degree: string[];
    bio: string;
    isApproved?: boolean;
    isActive?: boolean;
    licenseNumber?: string;
}


export interface IActionResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export interface IPaginatedDoctors {
    doctors: IDoctor[];
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
}


export interface IBookingConfirmation {
    bookingId: string;

    doctorId: string;
    doctorName: string;

    patientName?: string;

    date: string;

    status:
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED"
    | "COMPLETED";

    createdAt?: string;
}




export interface IBookAppointmentPayload {
    doctorId: string;
    date: string;
    patientName: string;
    phone: string;
    email?: string;
    reason?: string;
    paymentMethod: "ONLINE" | "CASH";
    paid?: boolean;
    paymentIntentId?: string;
    amount?: number;
    currency?: string;
}