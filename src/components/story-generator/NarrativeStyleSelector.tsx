
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { NARRATIVE_STYLES } from "./constants";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {NARRATIVE_STYLES.map((style) => (
          <div
            key={style.id}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 flex flex-col items-start justify-between text-left shadow-md border-2",
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
            <div className="font-bold text-lg mb-2">
              {style.name}
            </div>
            <div className="text-sm">
              {style.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NarrativeStyleSelector;
