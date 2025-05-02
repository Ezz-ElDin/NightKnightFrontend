
import React from "react";
import { cn } from "@/lib/utils";
import { NARRATIVE_STYLES } from "./constants";
import { getNarrativeStyleIcon } from "./IconUtils";

interface NarrativeStyleSelectorProps {
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
}

const NarrativeStyleSelector: React.FC<NarrativeStyleSelectorProps> = ({ 
  selectedStyle, 
  onSelectStyle 
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {NARRATIVE_STYLES.map((style) => (
          <div
            key={style.id}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 border-2 flex flex-col items-center text-center shadow-md",
              selectedStyle === style.id
                ? "border-primary bg-primary/10 ring-4 ring-primary/30 animate-scale-pulse"
                : `border-${style.color}/50 hover:border-${style.color}`
            )}
            onClick={() => onSelectStyle(style.id)}
            style={{
              backgroundColor: style.color,
              color: style.textColor,
              borderColor: selectedStyle === style.id ? "#7E69AB" : style.color,
            }}
          >
            <div className="mb-3 flex justify-center items-center h-24">
              <div className="h-16 w-16 transform transition-transform duration-300 hover:rotate-6">
                {getNarrativeStyleIcon(style.id)}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">{style.name}</h3>
              <p className="text-sm">{style.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NarrativeStyleSelector;

