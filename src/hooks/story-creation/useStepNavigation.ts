
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { StoryData, StoryMode } from "./types";

export const useStepNavigation = (
  storyData: StoryData,
  mode: StoryMode,
  magicSelected: string | null,
  totalSteps: number,
  onGenerateStory: () => void
) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const animateStepTransition = (callback: () => void) => {
    const mainContent = document.querySelector(".story-step-content");
    if (mainContent) {
      mainContent.classList.add("animate-fade-out");
      setTimeout(() => {
        callback();
        mainContent.classList.remove("animate-fade-out");
        mainContent.classList.add("animate-fade-in");
        setTimeout(() => {
          mainContent.classList.remove("animate-fade-in");
        }, 500);
      }, 300);
    } else {
      callback();
    }
  };

  const validateStep = (): boolean => {
    if (currentStep === 1) {
      // Mode selection must have language & age
      if (!storyData.language || !storyData.ageRange) {
        toast({
          title: "Please complete all fields!",
          description: "Select both your language and age group before continuing.",
          variant: "destructive",
        });
        return false;
      }
    }

    if (mode === "magic") {
      if (currentStep === 2 && !magicSelected) {
        toast({
          title: "Pick a Magic Card!",
          description: "Choose your story vibe to start the magic.",
          variant: "destructive",
        });
        return false;
      }
      if (currentStep === 3 && !storyData.illustrationStyle) {
        toast({
          title: "Pick an illustration style first!",
          description: "Choose your preferred illustration style to continue",
          variant: "destructive",
        });
        return false;
      }
    } else {
      if (currentStep === 2 && !storyData.genre) {
        toast({
          title: "Pick a theme first!",
          description: "Choose your favorite story theme to continue",
          variant: "destructive",
        });
        return false;
      }
      if (currentStep === 3 && !storyData.tone) {
        toast({
          title: "Pick a tone first!",
          description: "How should your story feel?",
          variant: "destructive",
        });
        return false;
      }
      if (currentStep === 4 && !storyData.narrativeStyle) {
        toast({
          title: "Pick a style first!",
          description: "How should your story be told?",
          variant: "destructive",
        });
        return false;
      }
      if (currentStep === 5 && !storyData.illustrationStyle) {
        toast({
          title: "Pick an illustration style first!",
          description: "Choose your preferred illustration style to continue",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep === totalSteps) {
      onGenerateStory();
      return;
    }

    animateStepTransition(() => {
      setCurrentStep((prev) => prev + 1);
    });
  };

  const handleBack = () => {
    animateStepTransition(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    });
  };

  return {
    currentStep,
    setCurrentStep,
    handleNext,
    handleBack,
  };
};
