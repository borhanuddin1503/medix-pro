// app/signup/page.js
'use client';

import SignupForm from '@/components/auth/SignUpForm';
import Logo from '@/components/logo/Logo';

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-53px)] md:min-h-[calc(100vh-82px)]  flex items-center justify-center bg-gradient-to-br from-[#f0faf0] to-[#e6f5e6] p-6">
      <div className="flex max-w-[1000px] w-full bg-white rounded-2xl shadow-[0_20px_60px_rgba(46,156,46,0.15)] overflow-hidden min-h-[600px] animate-fade-in">

        {/* Left Side - Logo Section */}
        <div className="hidden md:flex md:flex-[0_0_40%] bg-gradient-to-br from-[#9cee9c] to-[#ffffff] p-12 flex-col items-center justify-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Logo */}
          <Logo></Logo>

          <p className="relative z-10 text-sm text-black opacity-80 tracking-[0.2em] font-light">
            Professional Hospital Services
          </p>

          {/* Decorative elements */}
          <div className="absolute bottom-8 left-8 w-20 h-20 border-2 border-white/10 rounded-full"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-2 border-white/10 rounded-full"></div>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 p-12 xl:p-8 flex flex-col justify-center">
          <div className="md:hidden flex items-center justify-center gap-2 mb-6">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <path d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4Z" fill="#2e9c2e" stroke="#1c661c" strokeWidth="2" />
              <path d="M20 10V30M12 20H28" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="20" cy="20" r="6" stroke="white" strokeWidth="2" />
            </svg>
            <span className="text-xl font-bold">
              Medix<span className="text-main">Pro</span>
            </span>
          </div>

          <h1 className="text-center md:text-left text-2xl md:text-3xl font-bold text-gray-900 mb-1">Create Account</h1>
          <p className="text-center md:text-left text-gray-500 text-sm mb-6">Join MedixPro and access premium healthcare services</p>

          <SignupForm />

          <p className="mt-4 text-xs text-gray-400 text-center">
            By signing up, you agree to our{' '}
            <a href="#" className="text-main hover:underline font-medium">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-main hover:underline font-medium">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}