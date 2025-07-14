
import { useState } from "react";

export type CharacterStep = "name" | "role" | "appearance" | "personality";

const STEPS: CharacterStep[] = ["name", "role", "appearance", "personality"];

export const useCharacterSteps = () => {
  const [currentStep, setCurrentStep] = useState<CharacterStep>("name");

  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStep(STEPS[currentStepIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(STEPS[currentStepIndex - 1]);
    }
  };

  const goToStep = (step: CharacterStep) => {
    setCurrentStep(step);
  };

  const resetSteps = () => {
    setCurrentStep("name");
  };

  return {
    currentStep,
    currentStepIndex,
    totalSteps: STEPS.length,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetSteps,
  };
};
