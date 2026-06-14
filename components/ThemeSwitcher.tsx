"use client";

import { useEffect, useState } from "react";

const themes = [
  { key: "warm",           label: "Warm Sand" },
  { key: "dark-editorial", label: "Dark Editorial" },
  { key: "broadsheet",     label: "Broadsheet" },
];

export function ThemeSwitcher() {
  const [active, setActive] = useState("warm");

  useEffect(() => {
    const saved = localStorage.getItem("theme") ?? "warm";
    apply(saved);
    setActive(saved);
  }, []);

  function apply(theme: string) {
    if (theme === "warm") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem("theme", theme);
    setActive(theme);
  }

  return (
    <div className="theme-switcher" aria-label="Theme switcher">
      {themes.map((t) => (
        <button
          key={t.key}
          className={`theme-btn${active === t.key ? " active" : ""}`}
          data-t={t.key}
          title={t.label}
          onClick={() => apply(t.key)}
        />
      ))}
    </div>
  );
}
