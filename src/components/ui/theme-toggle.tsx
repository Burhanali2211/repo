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
      className="w-9 h-9 rounded-full transition-colors hover:bg-gray-800/20 dark:hover:bg-gray-200/20"
      aria-label={`Toggle ${theme === "dark" ? "light" : "dark"} mode`}
      tabIndex={0}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-300" />
      ) : (
        <Moon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
      )}
    </Button>
  );
};

export default ThemeToggle;
