import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className=" flex items-center justify-center gap-2 ">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4Z"
          fill="#2e9c2e"
          stroke="#1c661c"
          strokeWidth="2"
        />
        <path
          d="M20 10V30M12 20H28"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="20"
          cy="20"
          r="6"
          stroke="white"
          strokeWidth="2"
        />
      </svg>

      <span className="text-xl font-bold text-black">
        Medix<span className="text-main">Pro</span>
      </span>
    </div>
  )
}
