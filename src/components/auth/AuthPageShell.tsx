"use client";

import React from "react";

type AuthPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  maxWidthClass?: string;
};

export default function AuthPageShell({
  title,
  description,
  children,
  maxWidthClass = "max-w-md",
}: AuthPageShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(253,224,71,0.14),_transparent_28%),linear-gradient(180deg,#eef9ff_0%,#dff2ff_48%,#f9fcff_100%)] px-2 sm:px-4">
      <div className="mx-auto flex min-h-screen w-full items-center justify-center py-10 pt-20">
        <div className={`w-full ${maxWidthClass} rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.96),rgba(255,251,235,0.84),rgba(236,253,245,0.82))] p-8 shadow-2xl backdrop-blur-sm`}>
          <h2 className="text-center text-2xl font-bold text-cyan-700 sm:text-3xl">{title}</h2>
          <p className="mt-3 text-center text-slate-600">{description}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
