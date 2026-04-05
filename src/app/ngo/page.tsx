'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NGO() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [signupShowConfirmPassword, setSignupShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [signupForm, setSignupForm] = useState({
    orgName: '',
    repName: '',
    orgEmail: '',
    otp: '',
    password: '',
    confirmPassword: '',
    location: '',
    serviceAreas: '',
    volunteers: Array.from({ length: 5 }, () => ({ name: '', email: '' })),
  });

  const router = useRouter();

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const otpPattern = /^\d{6}$/;

  const EyeIcon = ({ open }: { open: boolean }) =>
    open ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-slate-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-slate-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.687A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 016 0"
        />
      </svg>
    );

  const inputClass =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400';

  const handleSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextValue = name === 'otp' ? value.replace(/\D/g, '').slice(0, 6) : value;
    setSignupForm((current) => ({ ...current, [name]: nextValue }));
  };

  const handleVolunteerChange = (idx: number, field: string, value: string) => {
    setSignupForm((current) => ({
      ...current,
      volunteers: current.volunteers.map((volunteer, index) =>
        index === idx ? { ...volunteer, [field]: value } : volunteer
      ),
    }));
  };

  const addVolunteer = () => {
    setSignupForm((current) =>
      current.volunteers.length < 8
        ? {
            ...current,
            volunteers: [...current.volunteers, { name: '', email: '' }],
          }
        : current
    );
  };

  const removeVolunteer = (idx: number) => {
    setSignupForm((current) =>
      current.volunteers.length > 5
        ? {
            ...current,
            volunteers: current.volunteers.filter((_, index) => index !== idx),
          }
        : current
    );
  };

  const resetSignupState = () => {
    setStep(1);
    setSuccess(false);
    setError('');
  };

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

    for (const volunteer of signupForm.volunteers) {
      if (!volunteer.name || !volunteer.email) {
        setError('All volunteer fields are required.');
        return;
      }
    }

    setSuccess(true);
    setStep(5);
  };

  useEffect(() => {
    if (step === 5 && success) {
      const timer = setTimeout(() => {
        setIsLogin(true);
        resetSignupState();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, success]);

  const steps = ['Verify Email', 'Set Password', 'Location & Service', 'Volunteers'];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(253,224,71,0.14),_transparent_28%),linear-gradient(180deg,#eef9ff_0%,#dff2ff_48%,#f9fcff_100%)] px-2 pt-16 sm:px-4">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl items-center justify-center py-10">
        <div className="w-full rounded-[2rem] bg-white/95 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
          {isLogin ? (
            <>
              <h2 className="text-center text-4xl font-extrabold text-cyan-700 sm:text-5xl">
                NGO Volunteer Login
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-8 text-slate-600 sm:text-xl">
                As an NGO, you help bridge the gap between donors and those in need. Collect,
                coordinate, and distribute donations efficiently to maximize impact in your
                community.
              </p>
              <hr className="mx-auto my-8 w-full max-w-md border-t-4 border-cyan-200" />

              <form
                className="mx-auto flex w-full max-w-xl flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push('/ngodashboard');
                }}
              >
                <input type="email" placeholder="Volunteer Email" className={inputClass} />
                <div className="relative">
                  <input
                    type={loginShowPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    tabIndex={-1}
                    onClick={() => setLoginShowPassword((value) => !value)}
                  >
                    <EyeIcon open={loginShowPassword} />
                  </button>
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-600 py-3 text-base font-semibold text-white transition hover:bg-cyan-700"
                >
                  Login
                </button>
              </form>

              <div className="mt-5 text-center">
                <span className="text-slate-600">Don&#39;t have an account? </span>
                <button
                  className="font-semibold text-cyan-700 hover:underline"
                  onClick={() => {
                    setIsLogin(false);
                    resetSignupState();
                  }}
                >
                  Sign up
                </button>
                <div className="mt-2">
                  <a href="/ngo/forgot-password" className="font-semibold text-cyan-700 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center text-4xl font-extrabold text-cyan-700 sm:text-5xl">
                NGO Representative Sign Up
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-8 text-slate-600 sm:text-xl">
                Build your NGO workspace once, then manage pickups, volunteers, and donation
                flow from one place.
              </p>

              <div className="mt-8 flex justify-center gap-2 sm:gap-4">
                {steps.map((label, idx) => (
                  <div
                    key={label}
                    className={`flex w-20 flex-col items-center ${
                      step === idx + 1 ? 'text-cyan-700' : 'text-slate-400'
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold ${
                        step === idx + 1
                          ? 'border-cyan-600 bg-cyan-600 text-white'
                          : 'border-slate-300 bg-white text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="mt-2 text-center text-xs font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-8 w-full max-w-xl">
                {step === 1 && (
                  <form className="flex flex-col gap-4" onSubmit={handleEmailSubmit}>
                    <input
                      name="orgName"
                      type="text"
                      placeholder="Organization Name"
                      value={signupForm.orgName}
                      onChange={handleSignupInput}
                      className={inputClass}
                      required
                    />
                    <input
                      name="repName"
                      type="text"
                      placeholder="Representative Name"
                      value={signupForm.repName}
                      onChange={handleSignupInput}
                      className={inputClass}
                      required
                    />
                    <input
                      name="orgEmail"
                      type="email"
                      placeholder="Representative Email"
                      value={signupForm.orgEmail}
                      onChange={handleSignupInput}
                      className={inputClass}
                      required
                    />
                    <input
                      name="otp"
                      type="text"
                      placeholder="Enter OTP (6 digits)"
                      value={signupForm.otp}
                      onChange={handleSignupInput}
                      maxLength={6}
                      className={inputClass}
                      required
                    />
                    {error && <span className="text-sm text-red-500">{error}</span>}
                    <button
                      type="submit"
                      className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700"
                    >
                      Verify Email
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
                    <div className="relative">
                      <input
                        name="password"
                        type={signupShowPassword ? 'text' : 'password'}
                        placeholder="Create Password"
                        value={signupForm.password}
                        onChange={handleSignupInput}
                        minLength={8}
                        className={`${inputClass} pr-12`}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        tabIndex={-1}
                        onClick={() => setSignupShowPassword((value) => !value)}
                      >
                        <EyeIcon open={signupShowPassword} />
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        type={signupShowConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={signupForm.confirmPassword}
                        onChange={handleSignupInput}
                        minLength={8}
                        className={`${inputClass} pr-12`}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        tabIndex={-1}
                        onClick={() => setSignupShowConfirmPassword((value) => !value)}
                      >
                        <EyeIcon open={signupShowConfirmPassword} />
                      </button>
                    </div>
                    {error && <span className="text-sm text-red-500">{error}</span>}
                    <button
                      type="submit"
                      className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700"
                    >
                      Set Password
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <form className="flex flex-col gap-4" onSubmit={handleLocationSubmit}>
                    <input
                      name="location"
                      type="text"
                      placeholder="Location"
                      value={signupForm.location}
                      onChange={handleSignupInput}
                      className={inputClass}
                      required
                    />
                    <input
                      name="serviceAreas"
                      type="text"
                      placeholder="Service Areas (comma separated)"
                      value={signupForm.serviceAreas}
                      onChange={handleSignupInput}
                      className={inputClass}
                      required
                    />
                    {error && <span className="text-sm text-red-500">{error}</span>}
                    <button
                      type="submit"
                      className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700"
                    >
                      Next: Add Volunteers
                    </button>
                  </form>
                )}

                {step === 4 && (
                  <form className="flex flex-col gap-4" onSubmit={handleVolunteersSubmit}>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="mb-3 font-semibold text-slate-800">Volunteers (5-8 members)</div>
                      {signupForm.volunteers.map((volunteer, idx) => (
                        <div key={idx} className="mb-4">
                          <div className="mb-2 text-sm font-medium text-slate-600">
                            Volunteer {idx + 1}
                          </div>
                          <div className="flex flex-col gap-2 md:flex-row">
                            <input
                              type="text"
                              placeholder="Volunteer Name"
                              value={volunteer.name}
                              onChange={(e) => handleVolunteerChange(idx, 'name', e.target.value)}
                              className={inputClass}
                              required
                            />
                            <input
                              type="email"
                              placeholder="Volunteer Email"
                              value={volunteer.email}
                              onChange={(e) => handleVolunteerChange(idx, 'email', e.target.value)}
                              className={inputClass}
                              required
                            />
                            {signupForm.volunteers.length > 5 && (
                              <button
                                type="button"
                                onClick={() => removeVolunteer(idx)}
                                className="rounded-xl border border-red-200 px-4 py-3 font-bold text-red-500 transition hover:bg-red-50"
                              >
                                &times;
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {signupForm.volunteers.length < 8 && (
                        <button
                          type="button"
                          onClick={addVolunteer}
                          className="text-sm font-semibold text-cyan-700 hover:underline"
                        >
                          + Add Volunteer
                        </button>
                      )}
                    </div>
                    {error && <span className="text-sm text-red-500">{error}</span>}
                    <button
                      type="submit"
                      className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700"
                    >
                      Finish Signup
                    </button>
                  </form>
                )}

                {step === 5 && success && (
                  <div className="mt-8 flex flex-col items-center gap-4 text-center">
                    <div className="text-3xl font-bold text-green-600">Signup Successful!</div>
                    <div className="text-slate-600">
                      Your NGO account has been created. You can now log in and start managing
                      donations and volunteers.
                    </div>
                    <button
                      className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
                      onClick={() => {
                        setIsLogin(true);
                        resetSignupState();
                      }}
                    >
                      Go to Login
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-5 text-center">
                <span className="text-slate-600">Already have an account? </span>
                <button
                  className="font-semibold text-cyan-700 hover:underline"
                  onClick={() => {
                    setIsLogin(true);
                    resetSignupState();
                  }}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
