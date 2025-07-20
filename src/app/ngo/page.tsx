'use client';

import React, { useState, useEffect } from 'react';

export default function NGO() {
  // Login/Signup view toggling and step management
  const [isLogin, setIsLogin] = useState(true);
  const [loginShowPassword, setLoginShowPassword] = useState(false);

  // Signup state
  const [step, setStep] = useState(1); // 1: verify email, 2: password, 3: location/service, 4: volunteers, 5: success
  const [signupForm, setSignupForm] = useState({
    orgName: '',
    repName: '',
    orgEmail: '',
    otp: '',
    password: '',
    confirmPassword: '',
    location: '',
    serviceAreas: '',
    volunteers: Array(5).fill({ name: '', email: '' }),
  });
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [signupShowConfirmPassword, setSignupShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // const router = useRouter();

  // Patterns
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const otpPattern = /^\d{6}$/;

  // Icon as subcomponent
  type EyeIconProps = {
    open: boolean;
    className?: string;
  };
  const EyeIcon = ({ open, className }: EyeIconProps) => open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className||'text-blue-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className||'text-blue-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.687A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 016 0" />
    </svg>
  );

  // Shared input change handler for signup form
  const handleSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'otp') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setSignupForm({ ...signupForm, [name]: numericValue });
    } else {
      setSignupForm({ ...signupForm, [name]: value });
    }
  };

  // Volunteer info handler
  const handleVolunteerChange = (idx: number, field: string, value: string) => {
    const updated = signupForm.volunteers.map((v, i) => i === idx ? { ...v, [field]: value } : v);
    setSignupForm({ ...signupForm, volunteers: updated });
  };

  // Add/Remove volunteers (5 min, up to 8)
  const addVolunteer = () => {
    if (signupForm.volunteers.length < 8) {
      setSignupForm({ ...signupForm, volunteers: [...signupForm.volunteers, { name: '', email: '' }] });
    }
  };
  const removeVolunteer = (idx: number) => {
    if (signupForm.volunteers.length > 5) {
      setSignupForm({ ...signupForm, volunteers: signupForm.volunteers.filter((_, i) => i !== idx) });
    }
  };

  // === Signup Step Submissions ===
  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!signupForm.orgName || !signupForm.repName || !signupForm.orgEmail) {
      setError('All fields are required.');
      return;
    }
    if (!otpPattern.test(signupForm.otp)) {
      setError('OTP must be 6 digits.');
      return;
    }
    setStep(2);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!passwordPattern.test(signupForm.password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setStep(3);
  };

  const handleLocationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!signupForm.location || !signupForm.serviceAreas) {
      setError('All fields are required.');
      return;
    }
    setStep(4);
  };

  const handleVolunteersSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (signupForm.volunteers.length < 5) {
      setError('Please add at least 5 volunteers.');
      return;
    }
    for (const v of signupForm.volunteers) {
      if (!v.name || !v.email) {
        setError('All volunteer fields are required.');
        return;
      }
    }
    setSuccess(true);
    setStep(5);
    // Here you would send data to backend
  };

  // Signup redirect on success
  useEffect(() => {
    if (step === 5 && success) {
      const timer = setTimeout(() => {
        setIsLogin(true); // After signup, show login
      }, 2000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [step, success]);

  // Stepper labels
  const steps = [
    'Verify Email',
    'Set Password',
    'Location & Service',
    'Volunteers',
    'Success',
  ];

  // Main Component UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-6 pt-16 bg-gradient-to-bl from-[#232f3e] to-[#22313f]">
      <div className="flex flex-col items-center w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto bg-white/5 rounded-xl shadow-lg p-4 sm:p-8 md:p-10 lg:p-12 backdrop-blur-md">
        {isLogin ? (
          <>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-400 mb-4 text-center drop-shadow-lg">NGO Volunteer Login</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 text-center mb-8 leading-relaxed">
              As an NGO, you help bridge the gap between donors and those in need. Collect, coordinate, and distribute donations efficiently to maximize impact in your community.
            </p>
            <hr className="border-t-4 border-blue-300 w-full max-w-md mb-10" />
            <form className="w-full flex flex-col gap-4 items-center">
              <input
                type="email"
                placeholder="Volunteer Email"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-sm sm:text-base md:text-lg"
              />
              <div className="relative w-full">
                <input
                  type={loginShowPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10 text-sm sm:text-base md:text-lg"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  tabIndex={-1}
                  onClick={() => setLoginShowPassword(v => !v)}
                >
                  <EyeIcon open={loginShowPassword} />
                </button>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full text-sm sm:text-base md:text-lg"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <span className="text-gray-300 text-sm sm:text-base">Don&#39;t have an account? </span>
              <button
                className="text-blue-400 hover:underline font-semibold text-sm sm:text-base"
                onClick={() => { setIsLogin(false); setStep(1); setSuccess(false); setError(''); }}
              >Sign up</button>
              <div className="mt-2">
                <a href="/ngo/forgot-password" className="text-blue-400 hover:underline font-semibold text-sm sm:text-base">Forgot password?</a>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-4 text-center drop-shadow-lg">NGO Representative Sign Up</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-8 leading-relaxed">
              As an NGO, you help bridge the gap between donors and those in need. Collect, coordinate, and distribute donations efficiently to maximize impact in your community.
            </p>
            {/* Stepper */}
            <div className="flex justify-center gap-2 mb-8">
              {steps.slice(0, 4).map((label, idx) => (
                <div key={label} className={`flex flex-col items-center w-20 ${step === idx + 1 ? 'font-bold text-blue-400' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full border-2 ${step === idx + 1 ? 'border-blue-400 bg-blue-400 text-white' : 'border-gray-400 bg-gray-700 text-gray-300'} flex items-center justify-center mb-1`}>{idx + 1}</div>
                  <span className="text-xs text-center">{label}</span>
                </div>
              ))}
            </div>
            {step === 1 && (
              <form className="w-full flex flex-col gap-4 items-center" onSubmit={handleEmailSubmit}>
                <input name="orgName" type="text" placeholder="Organization Name" value={signupForm.orgName} onChange={handleSignupInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
                <input name="repName" type="text" placeholder="Representative Name" value={signupForm.repName} onChange={handleSignupInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
                <input name="orgEmail" type="email" placeholder="Representative Email" value={signupForm.orgEmail} onChange={handleSignupInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
                <input name="otp" type="text" placeholder="Enter OTP (6 digits)" value={signupForm.otp} onChange={handleSignupInput} maxLength={6} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full">Verify Email</button>
              </form>
            )}
            {step === 2 && (
              <form className="w-full flex flex-col gap-4 items-center" onSubmit={handlePasswordSubmit}>
                <div className="relative w-full">
                  <input name="password" type={signupShowPassword ? 'text' : 'password'} placeholder="Create Password" value={signupForm.password} onChange={handleSignupInput} minLength={8} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10" required />
                  <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setSignupShowPassword(v => !v)}>
                    <EyeIcon open={signupShowPassword} />
                  </button>
                </div>
                <div className="relative w-full">
                  <input name="confirmPassword" type={signupShowConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" value={signupForm.confirmPassword} onChange={handleSignupInput} minLength={8} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10" required />
                  <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setSignupShowConfirmPassword(v => !v)}>
                    <EyeIcon open={signupShowConfirmPassword} />
                  </button>
                </div>
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full">Set Password</button>
              </form>
            )}
            {step === 3 && (
              <form className="w-full flex flex-col gap-4 items-center" onSubmit={handleLocationSubmit}>
                <input name="location" type="text" placeholder="Location" value={signupForm.location} onChange={handleSignupInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
                <input name="serviceAreas" type="text" placeholder="Service Areas (comma separated)" value={signupForm.serviceAreas} onChange={handleSignupInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full">Next: Add Volunteers</button>
              </form>
            )}
            {step === 4 && (
              <form className="w-full flex flex-col gap-4 items-center" onSubmit={handleVolunteersSubmit}>
                <div className="w-full">
                  <div className="font-semibold text-blue-500 mb-2">Volunteers (5-8 members)</div>
                  {signupForm.volunteers.map((v, idx) => (
                    <div key={idx} className="mb-4 w-full">
                      <div className="font-semibold text-blue-300 mb-1">Volunteer {idx + 1}</div>
                      <div className="flex flex-col md:flex-row gap-2">
                        <input type="text" placeholder="Volunteer Name" value={v.name} onChange={e => handleVolunteerChange(idx, 'name', e.target.value)} className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 w-full md:w-1/2" required />
                        <input type="email" placeholder="Volunteer Email" value={v.email} onChange={e => handleVolunteerChange(idx, 'email', e.target.value)} className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 w-full md:w-1/2" required />
                        {signupForm.volunteers.length > 5 && (
                          <button type="button" onClick={() => removeVolunteer(idx)} className="text-red-500 font-bold px-2">×</button>
                        )}
                      </div>
                    </div>
                  ))}
                  {signupForm.volunteers.length < 8 && (
                    <button type="button" onClick={addVolunteer} className="text-blue-500 hover:underline text-sm mt-1">+ Add Volunteer</button>
                  )}
                </div>
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full">Finish Signup</button>
              </form>
            )}
            {step === 5 && success && (
              <div className="w-full flex flex-col items-center gap-6 mt-8">
                <div className="text-3xl text-green-400 font-bold mb-2">Signup Successful!</div>
                <div className="text-gray-200 text-center mb-4">Your NGO account has been created. You can now log in and start managing donations and volunteers.</div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-48" onClick={() => setIsLogin(true)}>Go to Login</button>
              </div>
            )}
            <div className="mt-4 text-center">
              <span className="text-gray-300 text-sm sm:text-base">Already have an account? </span>
              <button className="text-blue-400 hover:underline font-semibold text-sm sm:text-base"
                onClick={() => { setIsLogin(true); setStep(1); setSuccess(false); setError(''); }}>
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
