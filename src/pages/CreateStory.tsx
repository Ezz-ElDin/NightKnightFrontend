import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Wand2 } from "lucide-react";

// Newly created components
import StoryCreationLayout from "@/components/story-generator/StoryCreationLayout";
import StoryNavigationButtons from "@/components/story-generator/StoryNavigationButtons";
import ThemeStep from "@/components/story-generator/ThemeStep";
import ToneStep from "@/components/story-generator/ToneStep";
import StyleStep from "@/components/story-generator/StyleStep";
import CharacterStep from "@/components/story-generator/CharacterStep";
import StoryDetailsStep from "@/components/story-generator/StoryDetailsStep";
import StorySummary from "@/components/story-generator/StorySummary";
import StoryModeStep from "@/components/story-generator/StoryModeStep";
import MagicModeCards, { MAGIC_CARDS } from "@/components/story-generator/MagicModeCards";
import StoryStartStep from "@/components/story-generator/StoryStartStep";
import IllustrationStep from "@/components/story-generator/IllustrationStep";

const CreateStory = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mode, setMode] = useState<"magic" | "creative">("magic");
  const [magicSelected, setMagicSelected] = useState<string | null>(null);

  const [storyData, setStoryData] = useState({
    title: "",
    genre: "",
    tone: "",
    narrativeStyle: "",
    ageRange: "6-8",
    moral: "",
    characters: [],
    pages: 12,           // always set to 12
    language: "English",
    illustrationStyle: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Set steps for both flows, now with Illustration step
  const steps =
    mode === "magic"
      ? [
          { id: 1, name: "Start" },
          { id: 2, name: "Choose Magic Card" },
          { id: 3, name: "Choose Illustrations" },
          { id: 4, name: "Characters" },
          { id: 5, name: "Summary" },
        ]
      : [
          { id: 1, name: "Start" },
          { id: 2, name: "Theme" },
          { id: 3, name: "Tone" },
          { id: 4, name: "Style" },
          { id: 5, name: "Choose Illustrations" },
          { id: 6, name: "Characters" },
          { id: 7, name: "Summary" },
        ];

  // Only two main flows: Start (combined), then rest
  const updateModeStep = (field: "language" | "ageRange" | "mode", value: string) => {
    if (field === "mode") setMode(value as "magic" | "creative");
    else setStoryData(prev => ({ ...prev, [field]: value }));
  };

  // In updateStoryData, always reset pages to 12
  const updateStoryData = (data) => {
    setStoryData(prev => ({
      ...prev,
      ...data,
      pages: 12 // always force to 12, in case it's ever changed in any input
    }));
  };

  // Next step logic
  const handleNext = () => {
    if (currentStep === 1) {
      // Mode selection must have language & age
      if (!storyData.language || !storyData.ageRange) {
        toast({ title: "Choose language & age!", description: "Before you begin, please select your language and age group.", variant: "destructive" });
        return;
      }
    }

    if (mode === "magic") {
      if (currentStep === 2 && !magicSelected) {
        toast({
          title: "Pick a Magic Card!",
          description: "Choose your story vibe to start the magic.",
          variant: "destructive",
        });
        return;
      }
      // After illustration step, require illustrationStyle
      if (currentStep === 3 && !storyData.illustrationStyle) {
        toast({
          title: "Pick an illustration style first!",
          description: "Choose your preferred illustration style to continue",
          variant: "destructive",
        });
        return;
      }
    } else {
      // --- Add validation for creative mode steps ---
      // Step 2: Theme (genre) required
      if (currentStep === 2 && !storyData.genre) {
        toast({
          title: "Pick a theme first!",
          description: "Choose your favorite story theme to continue",
          variant: "destructive",
        });
        return;
      }
      // Step 3: Tone required
      if (currentStep === 3 && !storyData.tone) {
        toast({
          title: "Pick a tone first!",
          description: "How should your story feel?",
          variant: "destructive",
        });
        return;
      }
      // Step 4: Style (narrativeStyle) required
      if (currentStep === 4 && !storyData.narrativeStyle) {
        toast({
          title: "Pick a style first!",
          description: "How should your story be told?",
          variant: "destructive",
        });
        return;
      }
      // After illustration step, require illustrationStyle
      if (currentStep === 5 && !storyData.illustrationStyle) {
        toast({
          title: "Pick an illustration style first!",
          description: "Choose your preferred illustration style to continue",
          variant: "destructive",
        });
        return;
      }
    }

    if (
      (mode === "magic" && currentStep === steps.length) ||
      (mode === "creative" && currentStep === steps.length)
    ) {
      handleGenerateStory();
      return;
    }

    // Animate step transition
    const mainContent = document.querySelector(".story-step-content");
    if (mainContent) {
      mainContent.classList.add("animate-fade-out");
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        mainContent.classList.remove("animate-fade-out");
        mainContent.classList.add("animate-fade-in");
        setTimeout(() => {
          mainContent.classList.remove("animate-fade-in");
        }, 500);
      }, 300);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    // Animate step transition
    const mainContent = document.querySelector(".story-step-content");
    if (mainContent) {
      mainContent.classList.add("animate-fade-out");
      setTimeout(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        mainContent.classList.remove("animate-fade-out");
        mainContent.classList.add("animate-fade-in");
        setTimeout(() => {
          mainContent.classList.remove("animate-fade-in");
        }, 500);
      }, 300);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleGenerateStory = () => {
    toast({
      title: "Your magic story is coming to life! ✨",
      description: "The story fairies are working hard to create your adventure!",
    });

    setTimeout(() => {
      navigate("/story-viewer", { state: { storyData } });
    }, 2000);
  };

  // If in magic mode and hitting "next" from card choose: set genre, tone, style accordingly
  React.useEffect(() => {
    if (mode === "magic" && currentStep === 3 && magicSelected) {
      // Find mapping for magic card
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

  return (
    <TooltipProvider>
      <StoryCreationLayout 
        title="Create Your Story" 
        currentStep={currentStep}
        steps={steps}
      >
        <div className="story-step-content min-h-[400px]">
          {currentStep === 1 && (
            <StoryStartStep
              mode={mode}
              setMode={v => {
                setMode(v);
                setCurrentStep(1); // reset
              }}
              language={storyData.language}
              setLanguage={v => updateStoryData({ language: v })}
              ageRange={storyData.ageRange}
              setAgeRange={v => updateStoryData({ ageRange: v })}
              storyData={storyData}
              updateStoryData={updateStoryData}
            />
          )}

          {/* Magic Mode */}
          {mode === "magic" && currentStep === 2 && (
            <MagicModeCards
              selected={magicSelected}
              onSelect={(settings) => {
                const card = MAGIC_CARDS.find(card => card.set.genre === settings.genre);
                setMagicSelected(card?.id ?? null);
                setStoryData((prev) => ({
                  ...prev,
                  genre: settings.genre,
                  tone: settings.tone,
                  narrativeStyle: settings.narrativeStyle,
                  pages: 12,
                }));
              }}
            />
          )}
          {mode === "magic" && currentStep === 3 && (
            <IllustrationStep
              illustrationStyle={storyData.illustrationStyle}
              setIllustrationStyle={value => updateStoryData({ illustrationStyle: value })}
            />
          )}
          {mode === "magic" && currentStep === 4 && (
            <CharacterStep storyData={storyData} updateStoryData={updateStoryData} />
          )}
          {mode === "magic" && currentStep === 5 && (
            <StorySummary storyData={storyData} onGenerateStory={handleGenerateStory} />
          )}

          {/* Creative Mode flow */}
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
            <IllustrationStep
              illustrationStyle={storyData.illustrationStyle}
              setIllustrationStyle={value => updateStoryData({ illustrationStyle: value })}
            />
          )}
          {mode === "creative" && currentStep === 6 && (
            <CharacterStep storyData={storyData} updateStoryData={updateStoryData} />
          )}
          {mode === "creative" && currentStep === 7 && (
            <StorySummary storyData={storyData} onGenerateStory={handleGenerateStory} />
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
  );
};

export default CreateStory;
