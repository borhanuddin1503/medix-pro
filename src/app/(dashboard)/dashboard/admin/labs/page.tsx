
import React from "react";
import { fetchWithAuth } from "@/app/actions/fetchWithAuth.action";
import LabsClient from "@/components/admin/LabsClient";

export interface ILab {
    _id: string;
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    images: string[];
    services: string[];
    openingTime?: string;
    closingTime?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ILabPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IGetLabsResponse {
    success: boolean;
    message?: string;
    data?: {
        labs: ILab[];
        pagination: ILabPagination;
    };
}

export default async function LabsPage() {
    const result = await fetchWithAuth<IGetLabsResponse>(
        "/api/labs?page=1&limit=10",
        {
            method: "GET",
            tags: ["admin-labs"],
            revalidate: 60,
        }
    );

    if (result.status !== 200 || !result.data?.data) {
        throw new Error(
            result.data?.message || "Failed to load labs"
        );
    }

    const { labs, pagination } = result.data.data;

    return (
        <div className="space-y-6">
            <LabsClient
                initialLabs={labs}
                initialPagination={pagination}
            />
        </div>
    );
}

