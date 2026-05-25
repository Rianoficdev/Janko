"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [lightMode, setLightMode] = useState(false);

  function syncDomTheme(shouldUseLight: boolean) {
    document.documentElement.classList.toggle("light", shouldUseLight);
    document.documentElement.dataset.theme = shouldUseLight ? "light" : "dark";
    document.body.classList.toggle("light", shouldUseLight);
    document.body.dataset.theme = shouldUseLight ? "light" : "dark";
    document.documentElement.style.colorScheme = shouldUseLight ? "light" : "dark";
    document.body.style.background = shouldUseLight ? "#f7f4ec" : "";
    document.body.style.color = shouldUseLight ? "#111111" : "";
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("janko-theme");
    const shouldUseLight =
      savedTheme === "light" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: light)").matches);

    syncDomTheme(shouldUseLight);
    window.requestAnimationFrame(() => setLightMode(shouldUseLight));
  }, []);

  function toggleTheme() {
    const nextLightMode = !lightMode;

    window.localStorage.setItem("janko-theme", nextLightMode ? "light" : "dark");
    syncDomTheme(nextLightMode);
    setLightMode(nextLightMode);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={toggleTheme}
      aria-label={lightMode ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {lightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
