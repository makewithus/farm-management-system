"use client";

import { useState, Suspense } from "react";
import { Sprout, Loader2, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Missing reset token. Please request a new password reset link.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setIsPending(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password");
      }
      
      toast.success("Password reset successful");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2E3A1C]/40 z-10" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            className="pl-10 border-[#E3E4D6] rounded-md text-sm focus:ring-[#2E3A1C]/10 focus:border-[#2E3A1C] text-[#2E3A1C] font-semibold bg-[#FFFFFC] h-10 shadow-sm"
            placeholder="New password"
            required
            minLength={6}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2E3A1C]/40 z-10" />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isPending}
            className="pl-10 border-[#E3E4D6] rounded-md text-sm focus:ring-[#2E3A1C]/10 focus:border-[#2E3A1C] text-[#2E3A1C] font-semibold bg-[#FFFFFC] h-10 shadow-sm"
            placeholder="Confirm new password"
            required
            minLength={6}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#2E3A1C] hover:bg-[#3f4f26] text-[#FFFFFC] rounded-md font-bold transition-all shadow-sm h-10"
        isLoading={isPending}
      >
        Set New Password
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex w-full bg-[#F7F8F3] font-sans items-center justify-center p-4 relative overflow-hidden text-[#2E3A1C]">
      <div className="w-full max-w-[420px] bg-[#FFFFFC] rounded-lg border border-[#E3E4D6] shadow-[0_2px_8px_rgba(86,100,55,0.01)] relative z-10">
        <div className="p-8 sm:p-10 space-y-8">
          <div className="flex justify-center mb-2">
            <div className="bg-[#2E3A1C] w-12 h-12 rounded-lg flex items-center justify-center">
              <Sprout className="text-[#D7F200] w-6 h-6" />
            </div>
          </div>
          
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl font-extrabold text-[#2E3A1C]">Reset Password</h2>
            <p className="text-gray-500 text-xs font-semibold">Create a new password for your account.</p>
          </div>

          <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin w-6 h-6 text-gray-400" /></div>}>
            <ResetPasswordForm />
          </Suspense>

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
