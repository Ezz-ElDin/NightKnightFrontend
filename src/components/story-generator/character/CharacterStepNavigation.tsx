
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CharacterStepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onClearCurrentStep: () => void;
  canProceed: boolean;
}

const CharacterStepNavigation: React.FC<CharacterStepNavigationProps> = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onClearCurrentStep,
  canProceed,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'justify-between items-center' : 'justify-between items-center'}`}>
      {/* Left side - Back button and Clear (desktop only) */}
      <div className={`flex ${isMobile ? '' : 'space-x-2'}`}>
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep}
          className={`${isMobile ? 'flex-1' : ''} border-primary/30 text-primary hover:bg-primary/10`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        
        {!isMobile && (
          <Button
            variant="ghost"
            onClick={onClearCurrentStep}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <Trash2 className="w-4 h-4" />
            <span className="ml-1">Clear</span>
          </Button>
        )}
      </div>

      {/* Right side - Next button only */}
      <div className={`flex ${isMobile ? '' : 'space-x-3'}`}>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className={`${isMobile ? 'flex-1' : ''} bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
          title={!canProceed ? "Please enter a valid character name to continue" : ""}
        >
          {isLastStep ? "Create Character" : "Next"}
          {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
};

export default CharacterStepNavigation;
