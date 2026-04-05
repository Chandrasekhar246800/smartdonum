'use client';

import { useState } from "react";
import AuthPageShell from "@/components/auth/AuthPageShell";

export default function ForgotPasswordPublic() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const inputClass =
    "w-full rounded-xl border border-cyan-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400";

  const EyeIcon = ({ open }: { open: boolean }) =>
    open ? (
      <svg className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    ) : (
      <svg className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.687A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 016 0" /></svg>
    );

  const handleMobileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setStep(2);
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter the 6-digit OTP sent to your mobile.');
      return;
    }
    setStep(3);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!passwordPattern.test(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setStep(4);
  };

  return (
    <AuthPageShell
      title="Reset Public Donor Password"
      description="Verify your registered mobile number and set a fresh password so you can get back to donating quickly."
    >
      {step === 1 && (
        <form className="flex flex-col gap-4" onSubmit={handleMobileSubmit}>
          <p className="text-center text-cyan-700">
            Enter your registered 10-digit mobile number to receive a one-time OTP.
          </p>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            maxLength={10}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className={inputClass}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700">
            Send OTP
          </button>
          <p className="text-center text-xs text-cyan-700">You&apos;ll receive an OTP SMS within seconds.</p>
        </form>
      )}

      {step === 2 && (
        <form className="flex flex-col gap-4" onSubmit={handleOtpSubmit}>
          <p className="text-center text-cyan-700">
            Enter the 6-digit OTP sent to your mobile.
          </p>
          <input
            type="text"
            placeholder="OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className={inputClass}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700">
            Verify OTP
          </button>
          <p className="text-center text-xs text-cyan-700">Protect your account. Never share your OTP with anyone.</p>
        </form>
      )}

      {step === 3 && (
        <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
          <p className="text-center text-cyan-700">Set a strong new password for your donor account.</p>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-12`}
              required
            />
            <button type="button" tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword((v) => !v)}>
              <EyeIcon open={showPassword} />
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={confirmPassword}
              minLength={8}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${inputClass} pr-12`}
              required
            />
            <button type="button" tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword((v) => !v)}>
              <EyeIcon open={showConfirmPassword} />
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700">
            Reset Password
          </button>
        </form>
      )}

      {step === 4 && (
        <div className="text-center">
          <div className="mb-2 text-lg font-bold text-green-600">Success! Your password has been reset.</div>
          <div className="mb-4 text-cyan-700">Thank you for continuing your generous journey with us.</div>
          <a href="/donor/public" className="font-semibold text-cyan-700 hover:underline">Back to Donor Login</a>
        </div>
      )}
    </AuthPageShell>
  );
}
