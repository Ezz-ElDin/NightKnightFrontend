
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

const CreateStory = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [storyData, setStoryData] = useState({
    title: "",
    genre: "",
    tone: "",
    narrativeStyle: "",
    ageRange: "6-8",
    moral: "",
    characters: [],
    pages: 10,
    language: "English",
    illustrationStyle: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const steps = [
    { id: 1, name: "Theme" },
    { id: 2, name: "Tone" },
    { id: 3, name: "Style" },
    { id: 4, name: "Characters" },
    { id: 5, name: "Details" },
    { id: 6, name: "Create!" },
  ];

  const updateStoryData = (data) => {
    setStoryData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    // Skip validation for kid-friendly experience except for key steps
    if (currentStep === 1 && !storyData.genre) {
      toast({
        title: "Pick a theme first!",
        description: "Choose your favorite story theme to continue",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 2 && !storyData.tone) {
      toast({
        title: "Pick a tone first!",
        description: "How should your story feel?",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 3 && !storyData.narrativeStyle) {
      toast({
        title: "Pick a style first!",
        description: "How should your story be told?",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === steps.length) {
      handleGenerateStory();
      return;
    }
    
    // Animation for step transition
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
    // Animation for step transition
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
    // Show a more exciting toast for kids
    toast({
      title: "Your magic story is coming to life! ✨",
      description: "The story fairies are working hard to create your adventure!",
    });
    
    // For now, we'll just simulate a generation delay and redirect to the viewer
    setTimeout(() => {
      navigate("/story-viewer", { state: { storyData } });
    }, 2000);
  };

  return (
    <TooltipProvider>
      <StoryCreationLayout 
        title="Create Your Story" 
        currentStep={currentStep}
        steps={steps}
      >
        <div className="story-step-content min-h-[400px]">
          {currentStep === 1 && (
            <ThemeStep storyData={storyData} updateStoryData={updateStoryData} />
          )}
          
          {currentStep === 2 && (
            <ToneStep storyData={storyData} updateStoryData={updateStoryData} />
          )}
          
          {currentStep === 3 && (
            <StyleStep storyData={storyData} updateStoryData={updateStoryData} />
          )}
          
          {currentStep === 4 && (
            <CharacterStep storyData={storyData} updateStoryData={updateStoryData} />
          )}
          
          {currentStep === 5 && (
            <StoryDetailsStep storyData={storyData} updateStoryData={updateStoryData} />
          )}
          
          {currentStep === 6 && (
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
