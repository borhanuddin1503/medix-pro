import React from 'react'


import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { redirect } from 'next/navigation';
import ClientAppointments from '@/components/admin/AppoinmentClient';
import AllUsersClient from '@/components/admin/AllUsersClient';



// interfaces
export interface IAdminUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    isVerified: boolean;
    image?: string;
    role: "USER" | "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "TECHNOLOGIST";
    createdAt: string;
}
export interface IGetAllUsersResponse {
    users: IAdminUser[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface IGetUsersResponse {
    success: boolean;
    message?: string;
    data?: IGetAllUsersResponse;
}

export default async function UsersPage() {
    const page = 1;
    const limit = 10;

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    const result = await fetchWithAuth<IGetUsersResponse>(
        `/api/admin/users?${params.toString()}`,
        {
            method: "GET",
            tags: ['users-admin'],
            revalidate: 60
        }
    );


    switch (result.status) {
        case 403:
            redirect('/forbidden')

        case 401:
            redirect('/sign-in')

        case 500:
            throw new Error(
                result.data?.message ||
                "Failed to fetch users"
            );
    }

    if (result.status !== 200 || !result.data?.data) {
        throw new Error(
            result.error?.message || "Failed to load users"
        );
    }

    const data = result?.data?.data;

    console.log('result from users', result)

    return (
        <div className="space-y-6">


            {/* Client */}
            <AllUsersClient
                initialUsers={
                    data?.users
                }
                initialPagination={
                    data?.pagination
                }
            />
        </div>
    );
}