"use client";

import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Sprout, Loader2, Mail, Lock, CheckCircle2, Eye, EyeOff, X, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    startTransition(async () => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful");
        router.push("/dashboard");
        router.refresh();
      }
    });
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
      <div className="hidden lg:flex w-[45%] relative overflow-hidden flex-col justify-between p-12 lg:p-16">
        <Image 
          src="/farm-aerial.png" 
          alt="Harvesta organic farming"
          fill
          priority
          className="object-cover z-0"
        />
        {/* Editorial overlay matching deep olive color variables */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2E3A1C] via-[#2E3A1C]/75 to-[#2E3A1C]/40"></div>
        
        <div className="relative z-20 flex items-center gap-3">
          <div className="bg-[#2E3A1C]/80 backdrop-blur-md border border-[#FFFFFC]/20 rounded-xl w-10 h-10 flex items-center justify-center shadow-md">
            <Sprout className="text-[#D7F200] w-5 h-5" />
          </div>
          <span className="text-[#FFFFFC] text-xl font-black tracking-tight">Harvesta</span>
        </div>
        
        <div className="relative z-20 my-auto max-w-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D7F200] bg-[#D7F200]/10 px-2.5 py-1 rounded-md border border-[#D7F200]/20">
            Intelligent OS
          </span>
          <h1 className="text-4xl font-extrabold !text-[#FFFFFC] mt-6 mb-4 leading-[1.15] tracking-tight">
            Enterprise Farm operations
          </h1>
          <p className="text-sm text-[#EDF0C2]/80 leading-relaxed font-semibold">
            Unify livestock, feed, water, and financial planning in a unified, offline-ready application.
          </p>
          
          <div className="mt-8 space-y-3.5">
            {[
              "Real-time mortality & vaccination tracking",
              "Automated stage scheduling & room capacity",
              "Integrated general ledgers & POS sales"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-[#FFFFFC]/95 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#D7F200] shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative z-20">
          <p className="text-[11px] text-[#EDF0C2]/50 font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} Harvesta Inc.
          </p>
        </div>
      </div>

      {/* Right side - Pure clean minimalist login form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-[#F7F8F3] relative">
        <Link href="/" className="absolute top-6 left-6 lg:top-8 lg:left-8 flex items-center gap-2 text-xs font-bold text-[#2E3A1C]/60 hover:text-[#2E3A1C] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <Link href="/" className="absolute top-6 right-6 lg:top-8 lg:right-8 p-2 text-[#2E3A1C]/40 hover:text-[#2E3A1C] hover:bg-[#FFFFFC] rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </Link>

        {/* Structured Form Card */}
        <div className="w-full max-w-[420px] bg-[#FFFFFC] border border-[#E3E4D6] p-8 sm:p-10 rounded-lg shadow-[0_2px_8px_rgba(86,100,55,0.01)] space-y-8">
          {/* Logo marker displayed on mobile */}
          <div className="flex items-center gap-2 lg:hidden mb-4">
            <div className="bg-[#2E3A1C] rounded-lg w-8 h-8 flex items-center justify-center">
              <Sprout className="text-[#D7F200] w-4.5 h-4.5" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#2E3A1C]">Harvesta</span>
          </div>

          <div className="text-left space-y-1.5">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#2E3A1C]">Welcome back</h2>
            <p className="text-xs text-gray-500 font-semibold">Sign in to manage your operations.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2E3A1C]/75 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E3A1C]/45" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  className="auth-input-fix w-full pl-11 pr-4 py-2.5 bg-[#FFFFFC] border border-[#E3E4D6] rounded-md text-sm text-[#2E3A1C] placeholder-[#2E3A1C]/30 focus:outline-none focus:ring-1 focus:ring-[#2E3A1C] focus:border-[#2E3A1C] transition-all disabled:opacity-50 font-semibold shadow-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#2E3A1C]/75 block">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-bold text-[#2E3A1C]/70 hover:text-[#2E3A1C] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E3A1C]/45" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-[#E3E4D6] text-[#2E3A1C] focus:ring-[#2E3A1C] cursor-pointer" 
                />
                <span className="text-xs font-bold text-[#2E3A1C]/65">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-[#2E3A1C] hover:bg-[#3f4f26] text-[#FFFFFC] rounded-md font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-6 shadow-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 font-semibold">
              Don't have an account yet?{" "}
              <Link href="/signup" className="font-bold text-[#2E3A1C] hover:underline">
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
