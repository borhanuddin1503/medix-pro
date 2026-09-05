

export interface IAdminUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    isVerified: boolean;
    image?: string;
    role: "USER" | "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "TECHNOLOGIST";
    createdAt: Date;
}



export interface IGetAllUsersResponse {
    success: boolean;
    message: string;
    data?: {
        users: IAdminUser[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }
}




export interface IFetchWithAuth<T> {
    status: number;
    data?: T;
}