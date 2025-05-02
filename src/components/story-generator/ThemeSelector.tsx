
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { THEMES } from "./constants";
import { getThemeIcon } from "./IconUtils";

interface ThemeSelectorProps {
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onSelectTheme }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {THEMES.map((theme) => (
          <div
            key={theme.id}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 border-2 flex flex-col items-center text-center shadow-md",
              selectedTheme === theme.id
                ? "border-primary bg-primary/10 ring-4 ring-primary/30 animate-scale-pulse"
                : `border-${theme.color}/50 hover:border-${theme.color}`
            )}
            onClick={() => onSelectTheme(theme.id)}
            style={{
              backgroundColor: theme.color,
              color: theme.textColor,
              borderColor: selectedTheme === theme.id ? "#7E69AB" : theme.color,
            }}
          >
            <div className="mb-3 flex justify-center items-center h-24">
              <div className="h-16 w-16 transform transition-transform duration-300 hover:rotate-6">
                {getThemeIcon(theme.id)}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">{theme.name}</h3>
              <p className="text-sm">{theme.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;

