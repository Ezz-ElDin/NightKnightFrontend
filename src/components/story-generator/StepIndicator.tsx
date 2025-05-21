
import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface Step {
  id: number;
  name: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const pastelColors = [
  "bg-[#D4DCFF]", // pastel blue-purple
  "bg-[#A3D3AA]", // pastel green
  "bg-[#F5CDC9]", // pastel pink
  "bg-[#FEF2C8]", // pastel yellow
  "bg-[#F8DBC9]", // pastel peach
  "bg-[#74B5BE]", // pastel blue
  "bg-[#FFA99F]", // pastel orange
];

const connectorGradients = [
  "from-[#F5CDC9] via-[#FFD580] to-[#A3D3AA]",  // pink to yellow to green
  "from-[#A3D3AA] via-[#B2E0DC] to-[#74B5BE]",  // green to seafoam to blue
  "from-[#FEF2C8] via-[#E5DEFF] to-[#D4DCFF]",  // yellow to lilac to purple-blue
  "from-[#FFA99F] via-[#F8DBC9] to-[#F5CDC9]",  // orange to peach to pink
  "from-[#74B5BE] via-[#B2E0DC] to-[#FEF2C8]",  // blue to seafoam to yellow
  "from-[#D4DCFF] via-[#A3D3AA] to-[#FFA99F]",  // purple-blue to green to orange
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center w-full max-w-3xl">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const color =
            pastelColors[(step.id - 1) % pastelColors.length] || "bg-[#D4DCFF]";

          // Decide connector gradient based on position
          const connectorGradient =
            connectorGradients[index % connectorGradients.length];

          return (
            <React.Fragment key={step.id}>
              {/* Step circle and label */}
              <div className="relative flex flex-col items-center w-20">
                {/* Step circle */}
                <div
                  className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-full relative shadow-lg border-4 transition-all duration-300",
                    color,
                    isActive
                      ? "border-primary scale-110 animate-bounce-slow z-10"
                      : isCompleted
                      ? "border-story-green grayscale-0"
                      : "border-muted grayscale brightness-95 opacity-70"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isActive && (
                    <Sparkles className="absolute h-5 w-5 -top-2 -right-2 text-yellow-400 animate-wiggle" />
                  )}
                  <span
                    className={cn(
                      "text-2xl font-bold drop-shadow",
                      isActive
                        ? "text-primary"
                        : isCompleted
                        ? "text-story-green"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.id}
                  </span>
                </div>

                {/* Step name as pastel bubble label */}
                <span
                  className={cn(
                    "mt-3 px-4 py-1 rounded-xl shadow bg-white/70 font-ghibli transition-all duration-300 text-xs md:text-sm whitespace-nowrap",
                    isActive
                      ? "font-extrabold text-primary scale-105 bg-gradient-to-r from-story-seafoam/70 to-story-yellow/80"
                      : isCompleted
                      ? "font-semibold text-story-green"
                      : "font-medium text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-2 flex-1 mx-1 md:mx-2 rounded-full border-none transition-all duration-300 drop-shadow-md",
                    "bg-gradient-to-r", // Enables gradient!
                    steps[index + 1].id <= currentStep
                      ? connectorGradient // Use the playful unique gradient!
                      : "from-muted to-muted"
                  )}
                  style={{
                    minWidth: "32px",
                    maxWidth: "100px",
                    opacity: isCompleted ? 0.9 : 0.5,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

