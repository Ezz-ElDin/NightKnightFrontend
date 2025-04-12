
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {TONES.map((tone) => (
          <div
            key={tone.id}
            className={cn(
              "p-6 rounded-xl cursor-pointer transition-all hover:scale-105 transform duration-200 flex flex-col items-center justify-center text-center aspect-[4/3] shadow-lg border-2",
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
            <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
              {getToneIcon(tone.id)}
            </div>
            <div className="font-bold text-xl mt-auto">
              {tone.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
