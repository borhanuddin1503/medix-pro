
import imageCompression from "browser-image-compression";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

function isHeic(file: File) {
    const ext = file.name.toLowerCase();

    return (
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        ext.endsWith(".heic") ||
        ext.endsWith(".heif")
    );
}

async function convertHeic(file: File): Promise<File> {
    const { default: heic2any } = await import("heic2any");
    const converted = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.95,
    });

    const blob = Array.isArray(converted) ? converted[0] : converted;

    return new File(
        [blob],
        file.name.replace(/\.(heic|heif)$/i, ".jpg"),
        {
            type: "image/jpeg",
        }
    );
}

async function compress(file: File): Promise<File> {
    return imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.8,
    });
}

async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!res.ok) {
        throw new Error("Cloudinary upload failed.");
    }

    const data = await res.json();

    return data.secure_url;
}

export async function uploadImage(file: File): Promise<string> {
    let processedFile = file;

    // Convert HEIC -> JPG
    if (isHeic(file)) {
        processedFile = await convertHeic(file);
    }

    // Compress image
    processedFile = await compress(processedFile);

    // Upload
    return await uploadToCloudinary(processedFile);
}