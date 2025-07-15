
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CharacterStepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onClearCurrentStep?: () => void;
  canProceed?: boolean;
}

const CharacterStepNavigation: React.FC<CharacterStepNavigationProps> = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  canProceed = true,
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-primary/20">
      <div className="flex space-x-3">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        )}
      </div>
      
      <div className="flex space-x-3">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          <span>{isLastStep ? "Finish" : "Next"}</span>
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default CharacterStepNavigation;
