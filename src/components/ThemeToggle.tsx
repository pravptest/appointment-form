"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    
    // Per requirements: retain existing light-mode appearance on first visit unless set
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // First visit: default to light mode
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Determine active state; during SSR / before mount, default to light mode
  const activeDark = mounted ? isDark : false;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={activeDark}
      aria-label={activeDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={`relative inline-flex items-center w-[58px] h-[32px] rounded-full p-[3px] transition-colors duration-300 ease-in-out cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 motion-reduce:transition-none ${
        activeDark ? "bg-[#283244]" : "bg-[#cbd5e1]"
      }`}
    >
      {/* Stars on the night sky (visible only in dark mode) */}
      <span
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          activeDark ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <span className="absolute top-[7px] right-[23px] w-[3px] h-[3px] rounded-full bg-white/95" />
        <span className="absolute top-[12px] right-[9px] w-[4px] h-[4px] rounded-full bg-white/95" />
        <span className="absolute top-[19px] right-[16px] w-[3.5px] h-[3.5px] rounded-full bg-white/95" />
        <span className="absolute top-[15px] right-[22px] w-[2.5px] h-[2.5px] rounded-full bg-white/85" />
        <span className="absolute top-[23px] right-[8px] w-[3px] h-[3px] rounded-full bg-white/95" />
        <span className="absolute top-[6px] right-[14px] w-[3.5px] h-[3.5px] rounded-full bg-white/95" />
      </span>

      {/* Sliding Knob (Left in dark mode, Right in light mode) */}
      <span
        className={`relative z-10 w-[26px] h-[26px] rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
          activeDark ? "translate-x-0" : "translate-x-[26px]"
        }`}
      >
        {/* Moon Icon (shown when dark) */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 motion-reduce:transition-none ${
            activeDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50 pointer-events-none"
          }`}
          aria-hidden="true"
        >
          <svg
            className="w-[18px] h-[18px]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.5 4.5C10.2 5.8 7.2 9.7 7.2 14.3C7.2 18.9 10.2 22.8 14.5 24.1C7.8 23.9 2.5 19.5 2.5 14.3C2.5 9 7.8 4.7 14.5 4.5Z"
              fill="#283244"
            />
          </svg>
        </span>

        {/* Sun Icon (shown when light) */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 motion-reduce:transition-none ${
            !activeDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-50 pointer-events-none"
          }`}
          aria-hidden="true"
        >
          <svg
            className="w-[18px] h-[18px]"
            viewBox="0 0 24 24"
            fill="none"
          >
            {/* Center sun disc */}
            <circle cx="12" cy="12" r="4.5" fill="#475569" />
            {/* 8 rounded radiating rays */}
            <rect x="11" y="2" width="2" height="3" rx="1" fill="#475569" />
            <rect x="11" y="19" width="2" height="3" rx="1" fill="#475569" />
            <rect x="2" y="11" width="3" height="2" rx="1" fill="#475569" />
            <rect x="19" y="11" width="3" height="2" rx="1" fill="#475569" />
            <rect x="5.05" y="3.64" width="2" height="3" rx="1" transform="rotate(-45 5.05 3.64)" fill="#475569" />
            <rect x="17.07" y="15.66" width="2" height="3" rx="1" transform="rotate(-45 17.07 15.66)" fill="#475569" />
            <rect x="3.64" y="18.95" width="2" height="3" rx="1" transform="rotate(-135 3.64 18.95)" fill="#475569" />
            <rect x="15.66" y="6.93" width="2" height="3" rx="1" transform="rotate(-135 15.66 6.93)" fill="#475569" />
          </svg>
        </span>
      </span>
    </button>
  );
}
