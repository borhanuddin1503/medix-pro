"use client";

import { uploadImage } from "@/lib/uploadImage";
import { ImageUploadProps } from "@/types/auth/authTypes";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function ImageUpload({
  value,
  onChange,
  error,
  onClearError,
}: ImageUploadProps) {


  const [preview, setPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);


  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const uploadedPrivew = await uploadImage(file);
      console.log('uploaded preview', uploadedPrivew)
      setPreview(uploadedPrivew);
      onChange(uploadedPrivew);
      onClearError?.();
    } finally {
      setIsUploading(false);
    }
  };


  const handleRemoveImage = () => {
    setPreview("");
    onChange('');
    onClearError?.();
  }

  return (
    <div className="flex items-center flex-col">
      <div className="relative">
        <input
          id="profile-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {preview ? (
          <div className="relative">
            <Image
              src={preview}
              alt="Profile"
              width={120}
              height={120}
              unoptimized
              className="
                h-28
                w-28
                rounded-full
                object-cover
                border-4
                border-emerald-500
                shadow-lg
                sm:h-32
                sm:w-32
              "
            />


            {/* LOADING OVERLAY */}
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            )}



            {/* Change Image */}
            <label
              htmlFor="profile-image"
              className={`
                absolute
                bottom-1
                right-1
                flex
                h-9
                w-9
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-emerald-600
                text-white
                shadow-md
                transition
                hover:bg-emerald-700
              `}
            >
              <Camera size={18} />
            </label>

            {/* Remove Image */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className={`
                absolute
                -right-2
                -top-2
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-white
                shadow
                hover:bg-red-600
              `}
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <label
            htmlFor="profile-image"
            className={` flex
              h-28
              w-28
              cursor-pointer
              flex-col
              items-center
              justify-center
              relative
              rounded-full
              border-2
              border-dashed
              transition
              sm:h-32
              sm:w-32
              ${error ? "border-red-500 bg-red-50 hover:border-red-600 hover:bg-red-100" : " border-emerald-400 bg-emerald-50 hover:bg-emerald-100  hover:border-emerald-600"}
            `}
          >
            <Camera
              size={28}
              className="text-emerald-600"
            />

            <span className="mt-2 text-xs font-medium text-emerald-700">
              Upload Photo
            </span>

            {/* LOADING OVERLAY */}
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            )}

          </label>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}