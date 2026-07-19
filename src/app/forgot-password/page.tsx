"use client";

import { useState } from "react";
import { Sprout, Loader2, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsPending(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to process request");
      }
      
      setIsSubmitted(true);
      toast.success("Password reset instructions sent");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#F7F8F3] font-sans items-center justify-center p-4 relative overflow-hidden text-[#2E3A1C]">
      <div className="w-full max-w-[420px] bg-[#FFFFFC] border border-[#E3E4D6] rounded-lg shadow-[0_2px_8px_rgba(86,100,55,0.01)] relative z-10">
        <div className="p-8 sm:p-10 space-y-8">
          <div className="flex justify-center mb-2">
            <div className="bg-[#2E3A1C] w-12 h-12 rounded-lg flex items-center justify-center">
              <Sprout className="text-[#D7F200] w-6 h-6" />
            </div>
          </div>
          
          {!isSubmitted ? (
            <>
              <div className="text-center space-y-1.5">
                <h2 className="text-2xl font-extrabold text-[#2E3A1C]">Forgot Password</h2>
                <p className="text-gray-500 text-xs font-semibold">Enter your email address and we'll send you instructions to reset your password.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#2E3A1C]/75 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E3A1C]/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isPending}
                      className="w-full pl-11 pr-4 py-2.5 bg-[#FFFFFC] border border-[#E3E4D6] rounded-md text-sm text-[#2E3A1C] focus:outline-none focus:ring-1 focus:ring-[#2E3A1C] focus:border-[#2E3A1C] transition-all disabled:opacity-50 font-semibold shadow-sm"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 bg-[#2E3A1C] hover:bg-[#3f4f26] text-[#FFFFFC] rounded-md font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm mt-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4.5 h-4.5 animate-spin" />
                      Sending Instructions...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-[#EDF0C2] rounded-lg flex items-center justify-center mx-auto mb-4 border border-[#E3E4D6]">
                <Mail className="w-8 h-8 text-[#2E3A1C]" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#2E3A1C] mb-2">Check Your Email</h2>
              <p className="text-gray-500 text-sm font-semibold">
                We've sent password reset instructions to <strong>{email}</strong>. Please check your inbox and spam folder.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-[#2E3A1C] hover:underline text-sm font-bold"
              >
                Try a different email
              </button>
            </div>
          )}

          <div className="text-center pt-6 border-t border-[#E3E4D6]">
            <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-[#2E3A1C] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
