
import { useState, useCallback } from "react";

export type CharacterStep = 
  | "disclaimer" 
  | "name" 
  | "role" 
  | "appearance-age" 
  | "appearance-color" 
  | "appearance-type" 
  | "appearance-accessories" 
  | "personality";

const STEPS: CharacterStep[] = [
  "disclaimer",
  "name", 
  "role",
  "appearance-age",
  "appearance-color", 
  "appearance-type",
  "appearance-accessories",
  "personality"
];

export const useCharacterSteps = () => {
  const [currentStep, setCurrentStep] = useState<CharacterStep>("disclaimer");
  
  const currentStepIndex = STEPS.indexOf(currentStep);
  const totalSteps = STEPS.length;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const goToNextStep = useCallback(() => {
    if (!isLastStep) {
      setCurrentStep(STEPS[currentStepIndex + 1]);
    }
  }, [currentStepIndex, isLastStep]);

  const goToPrevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(STEPS[currentStepIndex - 1]);
    }
  }, [currentStepIndex, isFirstStep]);

  const goToStep = useCallback((step: CharacterStep) => {
    setCurrentStep(step);
  }, []);

  const resetSteps = useCallback(() => {
    setCurrentStep("disclaimer");
  }, []);

  return {
    currentStep,
    currentStepIndex,
    totalSteps,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPrevStep,
    goToStep,
    resetSteps,
    steps: STEPS
  };
};
