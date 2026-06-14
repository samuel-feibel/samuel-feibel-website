"use client";

import { useEffect, useRef, useState } from "react";

type MoonPos = "right" | "center" | "left";

const MOON_X: Record<MoonPos, string> = {
  right:  "translateX(22px)",
  center: "translateX(0px)",
  left:   "translateX(-22px)",
};

export function DarkToggle() {
  const [dark, setDark] = useState(false);
  const [moonPos, setMoonPos] = useState<MoonPos>("right");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    if (isDark) setMoonPos("center");
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    return () => { if (resetTimer.current) clearTimeout(resetTimer.current); };
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");

    if (next) {
      // Going dark — moon enters from right
      setMoonPos("center");
    } else {
      // Going light — moon exits to left, then silently resets off-screen right
      setMoonPos("left");
      resetTimer.current = setTimeout(() => setMoonPos("right"), 520);
    }
  }

  return (
    <button
      className="dark-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <svg
        width="26" height="26" viewBox="0 0 26 26" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="corona-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
        </defs>

        {/* Sun */}
        <circle cx="13" cy="13" r="7" fill="currentColor" />

        {/* Corona — soft outer glow ring */}
        <circle
          cx="13" cy="13" r="10.5"
          stroke="currentColor" strokeWidth="3" fill="none"
          filter="url(#corona-blur)"
          style={{
            opacity: dark ? 0.55 : 0,
            transition: "opacity 0.35s ease 0.15s",
          }}
        />
        {/* Corona — crisp inner ring */}
        <circle
          cx="13" cy="13" r="9"
          stroke="currentColor" strokeWidth="0.75" fill="none"
          style={{
            opacity: dark ? 0.7 : 0,
            transition: "opacity 0.3s ease 0.2s",
          }}
        />

        {/* Moon — always enters from right, always exits to left */}
        <circle
          cx="13" cy="13" r="7.5"
          fill="var(--bg)"
          style={{
            transform: MOON_X[moonPos],
            opacity: moonPos === "right" ? 0 : 1,
            transition: moonPos === "right" ? "none" : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>
    </button>
  );
}
