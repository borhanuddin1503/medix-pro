"use client";

import { useEffect, useState } from "react";
import { IHospitalFeature } from "@/types/doctor-types/doctorTypes";
import MainHospitalhospitalFeatures from "./MainFeature";

export default function DoctorSpotlight({ hospitalFeatures }: { hospitalFeatures: IHospitalFeature[] }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % hospitalFeatures.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const mainFeature = hospitalFeatures[current];

    return (
        <div className="relative mx-auto ">

            <MainHospitalhospitalFeatures hospitalFeatures={mainFeature} />

        </div>
    );
}