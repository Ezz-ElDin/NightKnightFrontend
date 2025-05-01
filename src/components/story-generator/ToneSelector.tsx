
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TONES } from "./constants";

interface ToneSelectorProps {
  selectedTone: string;
  onSelectTone: (toneId: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelectTone }) => {
  return (
    <div className="space-y-3">
      <Label>Tone</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TONES.map((tone) => (
          <div
            key={tone.id}
            className={cn(
              "p-4 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 flex flex-col items-start justify-between text-left aspect-[4/3] shadow-md border-2",
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
            <div className="font-bold text-xl mb-2">
              {tone.name}
            </div>
            <div className="text-sm mt-2">
              {tone.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
