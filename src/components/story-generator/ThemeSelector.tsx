
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
    <div className="space-y-3">
      <Label>Theme</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {THEMES.map((theme) => (
          <div
            key={theme.id}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 border-2 flex flex-col md:flex-row gap-4 shadow-md",
              selectedTheme === theme.id
                ? "border-primary bg-primary/10 ring-4 ring-primary/30"
                : `border-${theme.color}/50 hover:border-${theme.color}`
            )}
            onClick={() => onSelectTheme(theme.id)}
            style={{
              backgroundColor: theme.color,
              color: theme.textColor,
              borderColor: selectedTheme === theme.id ? "#7E69AB" : theme.color,
            }}
          >
            <div className="flex justify-center md:justify-start">
              {getThemeIcon(theme.id)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 text-center md:text-left">{theme.name}</h3>
              <p className="text-sm mb-2">{theme.description}</p>
              <p className="text-xs italic">{theme.subdescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
