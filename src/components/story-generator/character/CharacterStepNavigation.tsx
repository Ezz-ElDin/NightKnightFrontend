
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SkipForward } from "lucide-react";

interface CharacterStepNavigationProps {
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  canSkip: boolean;
  isLastStep: boolean;
}

const CharacterStepNavigation: React.FC<CharacterStepNavigationProps> = ({
  onBack,
  onNext,
  onSkip,
  canGoBack,
  canGoNext,
  canSkip,
  isLastStep
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-primary/20">
      <div>
        {canGoBack && (
          <Button 
            variant="outline" 
            onClick={onBack}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        )}
      </div>
      
      <div className="flex gap-3">
        {canSkip && onSkip && (
          <Button 
            variant="ghost" 
            onClick={onSkip}
            className="gap-2 text-muted-foreground"
          >
            <SkipForward className="h-4 w-4" />
            Skip
          </Button>
        )}
        
        {canGoNext && (
          <Button 
            onClick={onNext}
            className="gap-2"
          >
            {isLastStep ? "Finish" : "Next"}
            {!isLastStep && <ChevronRight className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CharacterStepNavigation;
