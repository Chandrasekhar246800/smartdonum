"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Simulate admin authentication
    try {
      // In a real app, you would make an API call here
      // For now, we'll use a mock admin credential check
      if (formData.email === "admin@smartdonum.com" && formData.password === "admin123") {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store admin session (in a real app, you'd use proper auth tokens)
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminEmail", formData.email);
        
        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        setError("Invalid admin credentials. Please try again.");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-2 sm:px-4 pt-16 bg-gradient-to-bl from-[#232f3e] to-[#22313f] overflow-auto">
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-4 text-center drop-shadow-lg">Admin Portal</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-8 leading-relaxed">
          Access the SmartDonum admin dashboard to manage users, donations, NGOs, and system operations.
        </p>
        <div className="relative w-full max-w-md min-h-[340px] flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 transition-all duration-500">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              {/* Email Field */}
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-700 text-gray-700"
                placeholder="Admin Email"
              />

              {/* Password Field */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full pr-10 placeholder:text-gray-700 text-gray-700"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.687A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 016 0" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <span className="text-red-500 text-sm">{error}</span>
              )}

              {/* Demo Credentials Info */}
              <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded text-sm">
                <p className="font-medium mb-1">Demo Admin Credentials:</p>
                <p>Email: admin@smartdonum.com</p>
                <p>Password: admin123</p>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 rounded font-semibold transition-all cursor-pointer ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                }`}
              >
                {isLoading ? "Signing In..." : "Login"}
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-4 text-center">
              <Link
                href="/admin/forgot-password"
                className="text-emerald-600 hover:underline font-semibold"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}