
import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import StepIndicator from "@/components/story-generator/StepIndicator";

interface StoryCreationLayoutProps {
  title: string;
  currentStep: number;
  steps: { id: number; name: string }[];
  children: ReactNode;
}

const StoryCreationLayout: React.FC<StoryCreationLayoutProps> = ({ 
  title, 
  currentStep, 
  steps,
  children 
}) => {
  return (
    <div className="container mx-auto py-2 md:py-4 px-2 md:px-4 max-w-4xl">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6 text-primary flex items-center justify-center gap-2 md:gap-3 px-4">
        <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
        <span className="text-center">{title}</span>
        <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
      </h1>
      
      {/* Hide StepIndicator on mobile, show on md and larger screens */}
      <div className="hidden md:block">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>
      
      <Card className="mt-4 md:mt-6 p-3 md:p-4 lg:p-6 shadow-lg border-2 border-primary/20 rounded-2xl bg-white/80 backdrop-blur-sm">
        {children}
      </Card>
    </div>
  );
};

export default StoryCreationLayout;
