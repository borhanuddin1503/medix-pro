import React from "react";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import DepartmentsClient from "@/components/admin/DepartmentsClient";
// import DepartmentsClient from "./DepartmentsClient";

export interface IDepartment {
    _id: string;
    name: string;
    description?: string;
    icon?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IDepartmentPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IGetDepartmentsResponse {
    success: boolean;
    message?: string;
    data?: {
        departments: IDepartment[];
        pagination: IDepartmentPagination;
    };
}

export default async function DepartmentsPage() {
    const result = await fetchWithAuth<IGetDepartmentsResponse>(
        "/api/departments?page=1&limit=10",
        {
            method: "GET",
            tags: ["admin-departments"],
            revalidate: 60,
        }
    );

    if (result.status !== 200 || !result.data?.data) {
        throw new Error(
            result.data?.message || "Failed to load departments"
        );
    }

    const { departments, pagination } = result.data.data;


    return (
        <div className="space-y-6">
        
            {/* Departments Client */}
            <DepartmentsClient
                initialDepartments={departments}
                initialPagination={pagination}
            />
        </div>
    );
}