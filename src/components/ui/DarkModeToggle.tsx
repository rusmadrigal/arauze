"use client";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
    // Leemos el estado inicial en el primer render del cliente.
    const [isDark, setIsDark] = useState(() => {
        if (typeof document === "undefined") return false;
        return document.documentElement.classList.contains("dark");
    });

    function toggleTheme() {
        const root = document.documentElement;
        const nowDark = root.classList.contains("dark");
        if (nowDark) {
            root.classList.remove("dark");
            try { localStorage.setItem("theme", "light"); } catch { }
            setIsDark(false);
        } else {
            root.classList.add("dark");
            try { localStorage.setItem("theme", "dark"); } catch { }
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
                <Sun size={20} strokeWidth={2} className="text-yellow-400 drop-shadow-sm" />
            ) : (
                <Moon size={20} strokeWidth={2} className="text-slate-800 dark:text-slate-200 drop-shadow-sm" />
            )}
        </button>
    );
}
