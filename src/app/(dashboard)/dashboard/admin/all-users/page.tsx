import React from 'react'


import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import { redirect } from 'next/navigation';
import ClientAppointments from '@/components/admin/AppoinmentClient';
import AllUsersClient from '@/components/admin/AllUsersClient';

export default async function UsersPage() {
    const page = 1;
    const limit = 10;

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    const result = await fetchWithAuth(
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

    const data = result.data.data;

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