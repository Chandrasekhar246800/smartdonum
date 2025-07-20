'use client';

import { useState } from "react";

export default function ForgotPasswordOrganization() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

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
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-6 bg-gradient-to-bl from-[#232f3e] to-[#22313f]">
      <div className="flex flex-col items-center w-full max-w-md mx-auto rounded-2xl shadow-2xl p-8 bg-white">
        <h2 className="text-2xl font-bold text-center text-cyan-700 mb-1">Reset Organization Donor Password</h2>
        <p className="mb-4 text-gray-600 text-center">
          To maintain your organization&#39;s security, please verify your mobile number and set a new password.
        </p>
        {step === 1 && (
          <form className="flex flex-col gap-4 w-full" onSubmit={handleMobileSubmit}>
            <div className="mb-2 text-cyan-700 text-center">
              Enter the organization&#39;s registered mobile number. An OTP will be sent for verification.
            </div>
            <input type="text" placeholder="Mobile Number" value={mobile} maxLength={10}
              onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="border-2 border-cyan-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg py-2 shadow transition-all">
              Send OTP
            </button>
            <p className="text-center text-cyan-600 text-xs">Check your SMS for the OTP code shortly.</p>
          </form>
        )}
        {step === 2 && (
          <form className="flex flex-col gap-4 w-full" onSubmit={handleOtpSubmit}>
            <div className="mb-2 text-cyan-700 text-center">
              Enter the OTP sent to your registered number for verification.
            </div>
            <input type="text" placeholder="OTP" value={otp} maxLength={6}
              onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="border-2 border-cyan-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg py-2 shadow transition-all">
              Verify OTP
            </button>
            <p className="text-xs text-center text-cyan-600">Contact your admin if you have not received the OTP.</p>
          </form>
        )}
        {step === 3 && (
          <form className="flex flex-col gap-4 w-full" onSubmit={handlePasswordSubmit}>
            <div className="mb-2 text-cyan-700 text-center">
              Set a strong password for your organization’s donations dashboard.
            </div>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="New Password"
                value={password} minLength={8}
                onChange={e => setPassword(e.target.value)}
                className="border-2 border-cyan-200 rounded px-4 py-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required />
              <button type="button" tabIndex={-1} className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(v => !v)}>
                <EyeIcon open={showPassword} />
              </button>
            </div>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm New Password"
                value={confirmPassword} minLength={8}
                onChange={e => setConfirmPassword(e.target.value)}
                className="border-2 border-cyan-200 rounded px-4 py-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required />
              <button type="button" tabIndex={-1} className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(v => !v)}>
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg py-2 shadow transition-all">
              Reset Password
            </button>
            <p className="text-center text-cyan-600 text-xs">Keep this password confidential to protect your dashboard.</p>
          </form>
        )}
        {step === 4 && (
          <div className="text-center">
            <div className="text-green-600 font-bold text-lg mb-2">
              Success! Your password has been set.
            </div>
            <div className="mb-4 text-cyan-700">You can now log in as an Organization Donor and keep serving the community.</div>
            <a href="/donor/organization" className="text-cyan-700 hover:underline font-semibold">Back to Organization Login</a>
          </div>
        )}
      </div>
    </div>
  );
}
