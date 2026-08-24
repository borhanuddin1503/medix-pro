import SkeletonRows from '@/components/dashboard/SkeletonRows'
import React from 'react'

export default function loading() {
    return (
        <div className='w-full'>

            <table className="w-full">
                <tbody>
                    <SkeletonRows rows={5}></SkeletonRows>
                </tbody>
            </table>
        </div>
    )
}
