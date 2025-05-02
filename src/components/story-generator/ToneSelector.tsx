
import React from "react";
import { cn } from "@/lib/utils";
import { TONES } from "./constants";
import { getToneIcon } from "./IconUtils";

interface ToneSelectorProps {
  selectedTone: string;
  onSelectTone: (toneId: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelectTone }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TONES.map((tone) => (
          <div
            key={tone.id}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 border-2 flex flex-col items-center text-center shadow-md",
              selectedTone === tone.id
                ? "border-primary bg-primary/10 ring-4 ring-primary/30 animate-scale-pulse"
                : `border-${tone.color}/50 hover:border-${tone.color}`
            )}
            onClick={() => onSelectTone(tone.id)}
            style={{
              backgroundColor: tone.color,
              color: tone.textColor,
              borderColor: selectedTone === tone.id ? "#7E69AB" : tone.color,
            }}
          >
            <div className="mb-3 flex justify-center items-center h-24">
              <div className="h-16 w-16 transform transition-transform duration-300 hover:rotate-6">
                {getToneIcon(tone.id)}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">{tone.name}</h3>
              <p className="text-sm">{tone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;

