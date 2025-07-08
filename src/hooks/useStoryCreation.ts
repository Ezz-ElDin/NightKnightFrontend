
import { useState, useEffect } from "react";
import { MAGIC_CARDS } from "@/components/story-generator/MagicModeCards";
import { useStoryGeneration } from "./story-creation/useStoryGeneration";
import { useStepNavigation } from "./story-creation/useStepNavigation";
import { StoryData, StoryMode } from "./story-creation/types";
import { CREATIVE_STEPS, MAGIC_STEPS } from "./story-creation/constants";

export const useStoryCreation = () => {
  const [mode, setMode] = useState<StoryMode>("magic");
  const [magicSelected, setMagicSelected] = useState<string | null>(null);
  const [storyData, setStoryData] = useState<StoryData>({
    title: "",
    genre: "",
    tone: "",
    narrativeStyle: "",
    ageRange: "",
    moral: "",
    characters: [],
    language: "",
    illustrationStyle: "",
  });

  const steps = mode === "magic" ? MAGIC_STEPS : CREATIVE_STEPS;
  const { handleGenerateStory } = useStoryGeneration();

  const { currentStep, setCurrentStep, handleNext, handleBack } = useStepNavigation(
    storyData,
    mode,
    magicSelected,
    steps.length,
    () => handleGenerateStory(storyData, mode, magicSelected)
  );

  // Helper setters
  const updateModeStep = (field: "language" | "ageRange" | "mode", value: string) => {
    if (field === "mode") setMode(value as StoryMode);
    else setStoryData((prev) => ({ ...prev, [field]: value }));
  };

  const updateStoryData = (data: Partial<StoryData>) => {
    setStoryData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  useEffect(() => {
    if (mode === "magic" && currentStep === 3 && magicSelected) {
      const picked = MAGIC_CARDS.find((c) => c.id === magicSelected);
      if (picked) {
        setStoryData((prev) => ({
          ...prev,
          genre: picked.set.genre,
          tone: picked.set.tone,
          narrativeStyle: picked.set.narrativeStyle,
        }));
      }
    }
  }, [mode, currentStep, magicSelected]);

  return {
    currentStep,
    setCurrentStep,
    mode,
    setMode,
    magicSelected,
    setMagicSelected,
    storyData,
    setStoryData,
    updateModeStep,
    updateStoryData,
    handleNext,
    handleBack,
    handleGenerateStory: () => handleGenerateStory(storyData, mode, magicSelected),
    steps,
  };
};
