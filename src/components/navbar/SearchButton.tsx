'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import SearchDoctorModal from '../search/SearchDoctorModal';
// import SearchDoctorModal from './SearchDoctorModal';

export default function SearchButton() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="
                    flex
                    h-11
                    w-11
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    text-gray-700
                    transition
                    hover:border-main
                    hover:text-main
                    dark:border-gray-700
                    dark:text-gray-300
                    dark:hover:border-main
                    dark:hover:text-main
                "
            >
                <Search size={20} />
            </button>

            <SearchDoctorModal
                isOpen={isOpen}
                onClose={handleClose}
            />
        </>
    );
}