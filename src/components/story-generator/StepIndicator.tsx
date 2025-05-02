
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

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center w-full max-w-3xl">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md",
                  step.id <= currentStep
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step.id === currentStep && (
                  <Sparkles className="absolute h-4 w-4 -top-1 -right-1 text-yellow-400 animate-wiggle" />
                )}
                <div className="text-lg font-bold">{step.id}</div>
              </div>
              <span className="absolute -bottom-6 text-xs font-medium w-max text-center px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm">
                {step.name}
              </span>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-2 flex-1 mx-2 rounded-full transition-colors duration-300",
                  steps[index + 1].id <= currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;

