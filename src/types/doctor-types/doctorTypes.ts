export interface IDoctorApplyForm {
    name: string;
    specialization: string;
    degree: string;
    experience: string;
    fees: string;
    licenseNumber: string;
    chamber: string;
    address: string;
    roomNo: string;
    bio: string;
    availableTime: string;
    availableDays: string;
}



export interface IHospitalFeature {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
}


export interface IService {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
}