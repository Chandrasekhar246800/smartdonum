"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email) {
      setError("Please enter your admin email address");
      setIsLoading(false);
      return;
    }

    // Simulate password reset request
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center px-2 sm:px-4 pt-16 bg-gradient-to-bl from-[#232f3e] to-[#22313f] overflow-auto">
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
          <div className="w-full max-w-md flex items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to <strong className="text-gray-700">{email}</strong>
              </p>
              <Link
                href="/admin/login"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded transition-all cursor-pointer"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-2 sm:px-4 pt-16 bg-gradient-to-bl from-[#232f3e] to-[#22313f] overflow-auto">
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-4 text-center drop-shadow-lg">Admin Portal</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-8 leading-relaxed">
          Reset your admin password to regain access to the SmartDonum admin dashboard.
        </p>
        <div className="relative w-full max-w-md min-h-[340px] flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              {/* Email Field */}
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-700 text-gray-700"
                placeholder="Admin Email Address"
              />

              {/* Error Message */}
              {error && (
                <span className="text-red-500 text-sm">{error}</span>
              )}

              {/* Info Message */}
              <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded text-sm">
                <p>We'll send you a link to reset your admin password securely.</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 rounded font-semibold transition-all cursor-pointer ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                }`}
              >
                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-4 text-center">
              <Link
                href="/admin/login"
                className="text-emerald-600 hover:underline font-semibold"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}