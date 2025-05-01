
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TONES } from "./constants";
import { getToneIcon } from "./IconUtils";

interface ToneSelectorProps {
  selectedTone: string;
  onSelectTone: (toneId: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelectTone }) => {
  return (
    <div className="space-y-3">
      <Label>Tone</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TONES.map((tone) => (
          <div
            key={tone.id}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 border-2 flex flex-col md:flex-row gap-4 shadow-md",
              selectedTone === tone.id
                ? "border-primary bg-primary/10 ring-4 ring-primary/30"
                : `border-${tone.color}/50 hover:border-${tone.color}`
            )}
            onClick={() => onSelectTone(tone.id)}
            style={{
              backgroundColor: tone.color,
              color: tone.textColor,
              borderColor: selectedTone === tone.id ? "#7E69AB" : tone.color,
            }}
          >
            <div className="flex justify-center md:justify-start">
              {getToneIcon(tone.id)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 text-center md:text-left">{tone.name}</h3>
              <p className="text-sm">{tone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
