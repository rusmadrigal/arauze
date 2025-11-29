"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return false;

        const root = document.documentElement;

        let storedTheme: string | null = null;
        try {
            storedTheme = localStorage.getItem("theme");
        } catch {
            storedTheme = null;
        }

        let useDark = false;

        if (storedTheme === "dark") {
            useDark = true;
        } else if (storedTheme === "light") {
            useDark = false;
        } else {
            // Sin preferencia guardada → usa prefers-color-scheme
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            useDark = prefersDark;
        }

        if (useDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        return useDark;
    });

    function toggleTheme() {
        if (typeof window === "undefined") return;

        const root = document.documentElement;
        const nowDark = root.classList.contains("dark");

        if (nowDark) {
            root.classList.remove("dark");
            try {
                localStorage.setItem("theme", "light");
            } catch { }
            setIsDark(false);
        } else {
            root.classList.add("dark");
            try {
                localStorage.setItem("theme", "dark");
            } catch { }
            setIsDark(true);
        }
    }

    return (
        <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle dark mode"
            className="p-2 rounded-full transition-all
                 bg-white/70 dark:bg-slate-800/70
                 hover:bg-white/90 dark:hover:bg-slate-700
                 shadow-sm hover:shadow-md"
        >
            {isDark ? (
                <Sun
                    size={20}
                    strokeWidth={2}
                    className="text-yellow-400 drop-shadow-sm"
                />
            ) : (
                <Moon
                    size={20}
                    strokeWidth={2}
                    className="text-slate-800 dark:text-slate-200 drop-shadow-sm"
                />
            )}
        </button>
    );
}
