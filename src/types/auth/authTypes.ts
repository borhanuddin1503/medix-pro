import { string } from "better-auth";
import { IconType } from "react-icons";

export type SignupFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    image?: string;
    onClearError?: () => void;
};


// image upload props
export type ImageUploadProps = {
    value: File | null | string;
    onChange: (file: string) => void;
    error?: string;
    onClearError?: () => void;
};


// auth input props
export type AuthInputProps = {
    label: string;
    icon?: IconType | string;
    type?: string;
    name: string;
    value: string;
    error?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


// password input props
export type PasswordInputProps = {
    label: string;
    name: string;
    value: string;
    error?: string;
    placeholder?: string;
    icon?: IconType | string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


export interface UserRole {
    role?: string
}