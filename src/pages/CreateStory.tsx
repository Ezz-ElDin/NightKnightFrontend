
import React, { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import StoryCreationLayout from "@/components/story-generator/StoryCreationLayout";
import StoryNavigationButtons from "@/components/story-generator/StoryNavigationButtons";
import ThemeStep from "@/components/story-generator/ThemeStep";
import ToneStep from "@/components/story-generator/ToneStep";
import StyleStep from "@/components/story-generator/StyleStep";
import CharacterStep from "@/components/story-generator/CharacterStep";
import TitleStep from "@/components/story-generator/TitleStep";
import { useStoryCreation } from "@/hooks/useStoryCreation";
import { useGeneratingStoryGuard } from "@/hooks/useGeneratingStoryGuard";

import StoryStartStepWrapper from "@/components/story-generator/steps/StoryStartStepWrapper";
import MagicModeCardsStep from "@/components/story-generator/steps/MagicModeCardsStep";
import IllustrationStepWrapper from "@/components/story-generator/steps/IllustrationStepWrapper";
import StorySummaryStep from "@/components/story-generator/steps/StorySummaryStep";

const CreateStory = () => {
  const { redirectToLibraryIfGenerating, isGenerating } = useGeneratingStoryGuard();
  
  const {
    currentStep,
    mode,
    magicSelected,
    storyData,
    updateModeStep,
    updateStoryData,
    setMode,
    setCurrentStep,
    setMagicSelected,
    setStoryData,
    handleNext,
    handleBack,
    handleGenerateStory,
    steps,
  } = useStoryCreation();

  // Check if user should be redirected on component mount
  useEffect(() => {
    redirectToLibraryIfGenerating();
  }, [redirectToLibraryIfGenerating]);

  // Create a wrapped generate story handler that checks for ongoing generation
  const handleGenerateStoryWithCheck = () => {
    if (redirectToLibraryIfGenerating()) {
      return;
    }
    handleGenerateStory();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-story-lightPurple/20 to-white">
      <TooltipProvider>
        <StoryCreationLayout
          title="Create Your Story"
          currentStep={currentStep}
          steps={steps}
        >
          <div className="story-step-content min-h-[300px] md:min-h-[400px]">
            {currentStep === 1 && (
              <StoryStartStepWrapper
                mode={mode}
                setMode={(v: "magic" | "creative") => {
                  setMode(v);
                  setCurrentStep(1);
                }}
                language={storyData.language}
                setLanguage={(v: string) => updateStoryData({ language: v })}
                ageRange={storyData.ageRange}
                setAgeRange={(v: string) => updateStoryData({ ageRange: v })}
                storyData={storyData}
                updateStoryData={updateStoryData}
              />
            )}

            {/* Magic Mode */}
            {mode === "magic" && currentStep === 2 && (
              <MagicModeCardsStep
                magicSelected={magicSelected}
                setMagicSelected={setMagicSelected}
                setStoryData={setStoryData}
              />
            )}
            {mode === "magic" && currentStep === 3 && (
              <IllustrationStepWrapper
                illustrationStyle={storyData.illustrationStyle}
                setIllustrationStyle={(value: string) => updateStoryData({ illustrationStyle: value })}
              />
            )}
            {mode === "magic" && currentStep === 4 && (
              <CharacterStep storyData={storyData} updateStoryData={updateStoryData} />
            )}
            {mode === "magic" && currentStep === 5 && (
              <TitleStep storyData={storyData} updateStoryData={updateStoryData} />
            )}
            {mode === "magic" && currentStep === 6 && (
              <StorySummaryStep
                storyData={storyData}
                handleGenerateStory={handleGenerateStoryWithCheck}
                mode="magic"
                isGenerating={isGenerating}
              />
            )}

            {/* Creative Mode */}
            {mode === "creative" && currentStep === 2 && (
              <ThemeStep storyData={storyData} updateStoryData={updateStoryData} />
            )}
            {mode === "creative" && currentStep === 3 && (
              <ToneStep storyData={storyData} updateStoryData={updateStoryData} />
            )}
            {mode === "creative" && currentStep === 4 && (
              <StyleStep storyData={storyData} updateStoryData={updateStoryData} />
            )}
            {mode === "creative" && currentStep === 5 && (
              <IllustrationStepWrapper
                illustrationStyle={storyData.illustrationStyle}
                setIllustrationStyle={(value: string) => updateStoryData({ illustrationStyle: value })}
              />
            )}
            {mode === "creative" && currentStep === 6 && (
              <CharacterStep storyData={storyData} updateStoryData={updateStoryData} />
            )}
            {mode === "creative" && currentStep === 7 && (
              <TitleStep storyData={storyData} updateStoryData={updateStoryData} />
            )}
            {mode === "creative" && currentStep === 8 && (
              <StorySummaryStep
                storyData={storyData}
                handleGenerateStory={handleGenerateStoryWithCheck}
                mode="creative"
                isGenerating={isGenerating}
              />
            )}
          </div>

          <StoryNavigationButtons
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={handleNext}
            onBack={handleBack}
          />
        </StoryCreationLayout>
      </TooltipProvider>
    </div>
  );
};

export default CreateStory;
