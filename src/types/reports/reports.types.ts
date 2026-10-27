export interface Doctor {
    _id: string;
    name: string;
    specialization?: string;
}

export interface Appointment {
    _id: string;
    patientId?: string;
    patientName?: string;
    patientEmail?: string;
    doctorId?: string;
    doctorName?: string;
    appointmentDate?: string;
}

export interface ReportFormProps {
    appointments: Appointment[];
    doctors: Doctor[];
}

export interface ReportFormData {
    name: string;
    image: string;
    doctorId: string;
    appointmentId: string;
    reportType: string;
    description: string;
    result: string;
    remarks: string;
    status: string;
    testDate: string;
    reportDate: string;
}
export interface IReport {
    name: string;
    image: string;
    doctorId: string;
    appointmentId: string;
    reportType: string;
    description: string;
    result: string;
    remarks: string;
    status: string;
    testDate: string;
    reportDate: string;
}

export interface IGetAllReportsResponse {
    reports: IReport[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}


export interface IGetReportsResponse {
    success: boolean;
    message?: string;
    data?: IGetAllReportsResponse;
}

export interface ReportsClientProps {
    initialReports: IReport[];
    initialPagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}