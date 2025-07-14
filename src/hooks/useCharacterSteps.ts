
import { useState } from "react";

export type CharacterStep = "disclaimer" | "name" | "role" | "appearance-age" | "appearance-color" | "appearance-type" | "appearance-accessories" | "personality";

const STEPS: CharacterStep[] = ["disclaimer", "name", "role", "appearance-age", "appearance-color", "appearance-type", "appearance-accessories", "personality"];

export const useCharacterSteps = () => {
  const [currentStep, setCurrentStep] = useState<CharacterStep>("disclaimer");

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
    setCurrentStep("disclaimer");
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
