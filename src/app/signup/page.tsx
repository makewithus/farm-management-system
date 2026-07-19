"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sprout, Loader2, Mail, Lock, User, Home, Eye, EyeOff, X, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    farmName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsPending(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create account");
      } else {
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (err) {
      toast.error("An error occurred during signup.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#F7F8F3] font-sans antialiased text-[#2E3A1C]">
      <style>{`
        input.auth-input-fix,
        input[type="email"].auth-input-fix,
        input[type="text"].auth-input-fix {
          padding-left: 44px !important;
        }
        input.auth-input-fix-pass,
        input[type="password"].auth-input-fix-pass,
        input[type="text"].auth-input-fix-pass {
          padding-left: 44px !important;
          padding-right: 44px !important;
        }
      `}</style>
      {/* Left side - Premium Editorial Image Banner (Hidden on mobile) */}
      <div className="hidden lg:flex w-[45%] relative overflow-hidden flex-col justify-between p-16">
        <Image 
          src="/farm-aerial.png" 
          alt="Harvesta organic farming"
          fill
          priority
          className="object-cover z-0"
        />
        {/* Editorial overlay matching deep olive color variables */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2E3A1C] via-[#2E3A1C]/90 to-[#2E3A1C]/60"></div>
        
        <div className="relative z-20 flex items-center gap-3">
          <div className="bg-[#FFFFFC]/10 backdrop-blur-md border border-[#FFFFFC]/20 rounded-lg w-10 h-10 flex items-center justify-center">
            <Sprout className="text-[#D7F200] w-5 h-5" />
          </div>
          <span className="text-[#FFFFFC] text-xl font-extrabold tracking-tight">Harvesta</span>
        </div>
        
        <div className="relative z-20 my-auto max-w-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D7F200] bg-[#D7F200]/10 px-2.5 py-1 rounded-md border border-[#D7F200]/20">
            Get Started
          </span>
          <h1 className="text-4xl font-extrabold !text-[#FFFFFC] mt-6 mb-4 leading-[1.15] tracking-tight">
            Start your digital farm today
          </h1>
          <p className="text-sm text-[#EDF0C2]/80 leading-relaxed font-semibold">
            Join commercial operators globally optimizing feed rates, managing herds, and maximizing crop yield.
          </p>
        </div>
        
        <div className="relative z-20">
          <p className="text-[11px] text-[#EDF0C2]/50 font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} Harvesta Inc.
          </p>
        </div>
      </div>

      {/* Right side - Pure clean signup form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 bg-[#F7F8F3] relative overflow-y-auto">
        <Link href="/" className="absolute top-6 left-6 lg:top-8 lg:left-8 flex items-center gap-2 text-xs font-bold text-[#2E3A1C]/60 hover:text-[#2E3A1C] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <Link href="/" className="absolute top-6 right-6 lg:top-8 lg:right-8 p-2 text-[#2E3A1C]/40 hover:text-[#2E3A1C] hover:bg-[#FFFFFC] rounded-lg transition-colors z-10">
          <X className="w-5 h-5" />
        </Link>

        {/* Structured Form Card */}
        <div className="w-full max-w-[420px] bg-[#FFFFFC] border border-[#E3E4D6] p-8 sm:p-10 rounded-lg shadow-[0_2px_8px_rgba(86,100,55,0.01)] space-y-8 my-8">
          {/* Logo marker displayed on mobile */}
          <div className="flex items-center gap-2 lg:hidden mb-4">
            <div className="bg-[#2E3A1C] rounded-lg w-8 h-8 flex items-center justify-center">
              <Sprout className="text-[#D7F200] w-4.5 h-4.5" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#2E3A1C]">Harvesta</span>
          </div>

          <div className="text-left space-y-1.5">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#2E3A1C]">Create Account</h2>
            <p className="text-xs text-gray-500 font-semibold">Register your farm and access the dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2E3A1C]/75 block">
                Farm Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E3A1C]/45" />
                <input
                  type="text"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleChange}
                  disabled={isPending}
                  className="auth-input-fix w-full pl-11 pr-4 py-2.5 bg-[#FFFFFC] border border-[#E3E4D6] rounded-md text-sm text-[#2E3A1C] placeholder-[#2E3A1C]/30 focus:outline-none focus:ring-1 focus:ring-[#2E3A1C] focus:border-[#2E3A1C] transition-all disabled:opacity-50 font-semibold shadow-sm"
                  placeholder="Green Valley Farms"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2E3A1C]/75 block">
                Owner Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E3A1C]/45" />
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  disabled={isPending}
                  className="auth-input-fix w-full pl-11 pr-4 py-2.5 bg-[#FFFFFC] border border-[#E3E4D6] rounded-md text-sm text-[#2E3A1C] placeholder-[#2E3A1C]/30 focus:outline-none focus:ring-1 focus:ring-[#2E3A1C] focus:border-[#2E3A1C] transition-all disabled:opacity-50 font-semibold shadow-sm"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2E3A1C]/75 block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E3A1C]/45" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isPending}
                  className="auth-input-fix w-full pl-11 pr-4 py-2.5 bg-[#FFFFFC] border border-[#E3E4D6] rounded-md text-sm text-[#2E3A1C] placeholder-[#2E3A1C]/30 focus:outline-none focus:ring-1 focus:ring-[#2E3A1C] focus:border-[#2E3A1C] transition-all disabled:opacity-50 font-semibold shadow-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2E3A1C]/75 block">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E3A1C]/45" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isPending}
                  className="auth-input-fix-pass w-full pl-11 pr-12 py-2.5 bg-[#FFFFFC] border border-[#E3E4D6] rounded-md text-sm text-[#2E3A1C] placeholder-[#2E3A1C]/30 focus:outline-none focus:ring-1 focus:ring-[#2E3A1C] focus:border-[#2E3A1C] transition-all disabled:opacity-50 font-semibold shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2E3A1C]/40 hover:text-[#2E3A1C] focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2E3A1C]/75 block">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E3A1C]/45" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isPending}
                  className="auth-input-fix-pass w-full pl-11 pr-12 py-2.5 bg-[#FFFFFC] border border-[#E3E4D6] rounded-md text-sm text-[#2E3A1C] placeholder-[#2E3A1C]/30 focus:outline-none focus:ring-1 focus:ring-[#2E3A1C] focus:border-[#2E3A1C] transition-all disabled:opacity-50 font-semibold shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2E3A1C]/40 hover:text-[#2E3A1C] focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-[#2E3A1C] hover:bg-[#3f4f26] text-[#FFFFFC] rounded-md font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-6 shadow-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 font-semibold">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#2E3A1C] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
