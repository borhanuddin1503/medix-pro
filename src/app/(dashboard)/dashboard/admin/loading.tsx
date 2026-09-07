import SkeletonRows from '@/components/dashboard/SkeletonRows'
import React from 'react'

export default function Loading() {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px]">
                <tbody>
                    <SkeletonRows rows={5} />
                </tbody>
            </table>
        </div>
    );
}