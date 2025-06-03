import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleToggle();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-200 hover:bg-gray-800/20 dark:hover:bg-gray-200/20 hover:scale-105 active:scale-95 touch-target"
      aria-label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
      tabIndex={0}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 drop-shadow-sm" />
      ) : (
        <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300 drop-shadow-sm" />
      )}
    </Button>
  );
};

export default ThemeToggle;
