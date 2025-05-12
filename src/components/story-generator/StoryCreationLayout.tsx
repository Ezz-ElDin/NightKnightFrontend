
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
    <div className="container mx-auto py-4 px-2 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-primary flex items-center justify-center gap-3">
        <Sparkles className="h-8 w-8 text-yellow-400" />
        {title}
        <Sparkles className="h-8 w-8 text-yellow-400" />
      </h1>
      
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <Card className="mt-6 p-4 md:p-6 shadow-lg border-2 border-primary/20 rounded-2xl bg-white/80 backdrop-blur-sm">
        {children}
      </Card>
    </div>
  );
};

export default StoryCreationLayout;
