import { ChevronDown, Stethoscope } from 'lucide-react';
import React, { useState } from 'react'

interface DropdownSpecializationProps {
    specialties: string[];
    selectedSpecialization: string;
    setSelectedSpecialization: (
        specialization: string
    ) => void;
}

export default function DropdownSpecialization({
    specialties,
    selectedSpecialization,
    setSelectedSpecialization,
}: DropdownSpecializationProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative ">

            {/* Selected Value */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex h-12 w-full items-center gap-3 rounded-xl border border-foreground/10 bg-background px-4 text-left"
            >

                <Stethoscope
                    size={20}
                    className="shrink-0 text-main"
                />

                <span className="flex-1 truncate text-sm text-foreground">
                    {selectedSpecialization}
                </span>

                <ChevronDown
                    size={18}
                    className={`shrink-0 text-foreground/50 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                />

            </button>


            {/* Dropdown Options */}
            {isOpen && (

                <div className="absolute left-0 bottom-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-xl border border-main/10 bg-background p-1.5 shadow-xl">

                    {specialties.map((specialty) => (

                        <button
                            key={specialty}
                            type="button"
                            onClick={() => {
                                setSelectedSpecialization(specialty);
                                setIsOpen(false);
                            }}
                            className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${selectedSpecialization === specialty
                                ? "bg-main/10 font-semibold text-main"
                                : "text-foreground/70 hover:bg-main/5 hover:text-main"
                                }`}
                        >
                            {specialty}
                        </button>

                    ))}

                </div>

            )}

        </div>
    )
}
