import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import React, { ReactNode } from 'react'

export default function layout({ children }: {
    children: ReactNode
}) {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    )
}
