
import { useState } from "react";

export type CharacterStep = "name" | "role" | "appearance-type" | "appearance-age" | "appearance-color" | "appearance-eyes" | "appearance-hair" | "appearance-accessories" | "personality";

const STEPS: CharacterStep[] = ["name", "role", "appearance-type", "appearance-age", "appearance-color", "appearance-eyes", "appearance-hair", "appearance-accessories", "personality"];

export const useCharacterSteps = () => {
  const [currentStep, setCurrentStep] = useState<CharacterStep>("name");

  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      const nextStep = STEPS[currentStepIndex + 1];
      setCurrentStep(nextStep);
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      const prevStep = STEPS[currentStepIndex - 1];
      setCurrentStep(prevStep);
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
