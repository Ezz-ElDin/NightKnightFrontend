
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SkipForward, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CharacterStepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onClearCurrentStep: () => void;
  canProceed: boolean;
}

const CharacterStepNavigation: React.FC<CharacterStepNavigationProps> = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSkip,
  onClearCurrentStep,
  canProceed,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'justify-between items-center'}`}>
      {/* Left side - Back button and Clear */}
      <div className={`flex ${isMobile ? 'justify-between' : 'space-x-2'}`}>
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep}
          className={`${isMobile ? 'flex-1 mr-2' : ''} border-primary/30 text-primary hover:bg-primary/10`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        
        <Button
          variant="ghost"
          onClick={onClearCurrentStep}
          className={`${isMobile ? 'px-3' : ''} text-gray-500 hover:text-gray-700 hover:bg-gray-100`}
          size={isMobile ? "sm" : "default"}
        >
          <Trash2 className="w-4 h-4" />
          {!isMobile && <span className="ml-1">Clear</span>}
        </Button>
      </div>

      {/* Right side - Skip and Next buttons */}
      <div className={`flex ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
        <Button
          variant="outline"
          onClick={onSkip}
          className={`${isMobile ? 'flex-1' : ''} border-purple-300 text-purple-600 hover:bg-purple-50`}
        >
          <SkipForward className="w-4 h-4 mr-1" />
          Skip
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className={`${isMobile ? 'flex-1' : ''} bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg`}
        >
          {isLastStep ? "Create Character" : "Next"}
          {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
};

export default CharacterStepNavigation;
