
import React from "react";
import { Label } from "@/components/ui/label";
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
    <div className="space-y-3">
      <Label>Narrative Style</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {NARRATIVE_STYLES.map((style) => (
          <div
            key={style.id}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 border-2 flex flex-col md:flex-row gap-4 shadow-md",
              selectedStyle === style.id
                ? "border-primary bg-primary/10 ring-4 ring-primary/30"
                : `border-${style.color}/50 hover:border-${style.color}`
            )}
            onClick={() => onSelectStyle(style.id)}
            style={{
              backgroundColor: style.color,
              color: style.textColor,
              borderColor: selectedStyle === style.id ? "#7E69AB" : style.color,
            }}
          >
            <div className="flex justify-center md:justify-start">
              {getNarrativeStyleIcon(style.id)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 text-center md:text-left">{style.name}</h3>
              <p className="text-sm">{style.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NarrativeStyleSelector;
