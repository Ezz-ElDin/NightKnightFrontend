
import { useState } from "react";

export type CharacterStep = "name" | "role" | "personality" | "appearance-type" | "appearance-age" | "appearance-color" | "appearance-eyes" | "appearance-hair" | "appearance-accessories";

const STEPS: CharacterStep[] = ["name", "role", "personality", "appearance-type", "appearance-age", "appearance-color", "appearance-eyes", "appearance-hair", "appearance-accessories"];

export const useCharacterSteps = () => {
  const [currentStep, setCurrentStep] = useState<CharacterStep>("name");

  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const goToNextStep = () => {
    console.log("goToNextStep called, current step:", currentStep, "index:", currentStepIndex, "isLastStep:", isLastStep);
    if (!isLastStep) {
      const nextStep = STEPS[currentStepIndex + 1];
      console.log("Moving to next step:", nextStep);
      setCurrentStep(nextStep);
    }
  };

  const goToPreviousStep = () => {
    console.log("goToPreviousStep called, current step:", currentStep, "index:", currentStepIndex, "isFirstStep:", isFirstStep);
    if (!isFirstStep) {
      const prevStep = STEPS[currentStepIndex - 1];
      console.log("Moving to previous step:", prevStep);
      setCurrentStep(prevStep);
    }
  };

  const goToStep = (step: CharacterStep) => {
    console.log("goToStep called with:", step);
    setCurrentStep(step);
  };

  const resetSteps = () => {
    console.log("resetSteps called");
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
