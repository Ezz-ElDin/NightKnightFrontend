
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StoryNavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}

const StoryNavigationButtons: React.FC<StoryNavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack
}) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <Button 
          onClick={onBack} 
          variant="outline"
          size="lg"
          className="button-bounce text-lg gap-2"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </Button>
      )}
      
      {currentStep < totalSteps && (
        <Button 
          onClick={onNext} 
          size="lg"
          className="ml-auto button-bounce text-lg gap-2"
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default StoryNavigationButtons;
