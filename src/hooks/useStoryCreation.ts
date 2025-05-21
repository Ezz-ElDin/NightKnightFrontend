
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MAGIC_CARDS } from "@/components/story-generator/MagicModeCards";

export const useStoryCreation = () => {
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
    pages: 12,
    language: "English",
    illustrationStyle: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const creativeSteps = [
    { id: 1, name: "Start" },
    { id: 2, name: "Theme" },
    { id: 3, name: "Tone" },
    { id: 4, name: "Style" },
    { id: 5, name: "Choose Illustrations" },
    { id: 6, name: "Characters" },
    { id: 7, name: "Summary" },
  ];
  const magicSteps = [
    { id: 1, name: "Start" },
    { id: 2, name: "Choose Magic Card" },
    { id: 3, name: "Choose Illustrations" },
    { id: 4, name: "Characters" },
    { id: 5, name: "Summary" },
  ];
  const steps = mode === "magic" ? magicSteps : creativeSteps;

  // Helper setters
  const updateModeStep = (field: "language" | "ageRange" | "mode", value: string) => {
    if (field === "mode") setMode(value as "magic" | "creative");
    else setStoryData((prev) => ({ ...prev, [field]: value }));
  };

  const updateStoryData = (data: any) => {
    setStoryData((prev) => ({
      ...prev,
      ...data,
      pages: 12
    }));
  };

  // Next step logic
  const handleNext = () => {
    if (currentStep === 1) {
      // Mode selection must have language & age
      if (!storyData.language || !storyData.ageRange) {
        toast({
          title: "Choose language & age!",
          description: "Before you begin, please select your language and age group.",
          variant: "destructive",
        });
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
      if (currentStep === 3 && !storyData.illustrationStyle) {
        toast({
          title: "Pick an illustration style first!",
          description: "Choose your preferred illustration style to continue",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (currentStep === 2 && !storyData.genre) {
        toast({
          title: "Pick a theme first!",
          description: "Choose your favorite story theme to continue",
          variant: "destructive",
        });
        return;
      }
      if (currentStep === 3 && !storyData.tone) {
        toast({
          title: "Pick a tone first!",
          description: "How should your story feel?",
          variant: "destructive",
        });
        return;
      }
      if (currentStep === 4 && !storyData.narrativeStyle) {
        toast({
          title: "Pick a style first!",
          description: "How should your story be told?",
          variant: "destructive",
        });
        return;
      }
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

    // Animate transition
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
    handleGenerateStory,
    steps,
  };
};
