import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StorySettings from "@/components/story-generator/StorySettings";
import VisualStyle from "@/components/story-generator/VisualStyle";
import StepIndicator from "@/components/story-generator/StepIndicator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CreateStory = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [storyData, setStoryData] = useState({
    title: "",
    genre: "", // We keep using 'genre' in data structure for backwards compatibility
    tone: "",
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
    { id: 1, name: "Story Settings" },
    { id: 2, name: "Visual Style" },
    { id: 3, name: "Generate" },
  ];

  const updateStoryData = (data) => {
    setStoryData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate story settings
      if (!storyData.genre) {
        toast({
          title: "Please select a theme",
          description: "A theme is needed to create your story",
          variant: "destructive",
        });
        return;
      }
      if (!storyData.tone) {
        toast({
          title: "Please select a tone",
          description: "A tone helps shape the mood of your story",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStep === steps.length) {
      handleGenerateStory();
      return;
    }
    
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleGenerateStory = () => {
    // This would connect to a backend in a real implementation
    toast({
      title: "Story generation started!",
      description: "Your bedtime story is being created with magic ✨",
    });
    
    // In a real app, we would send storyData to the backend and wait for a response
    // For now, we'll just simulate a generation delay and redirect to the viewer
    setTimeout(() => {
      navigate("/story-viewer", { state: { storyData } });
    }, 2000);
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">Create Your Bedtime Story</h1>
        
        <StepIndicator steps={steps} currentStep={currentStep} />
        
        <Card className="mt-8 p-6 shadow-lg border-2 border-primary/20 rounded-2xl">
          {currentStep === 1 && (
            <StorySettings storyData={storyData} updateStoryData={updateStoryData} />
          )}
          
          {currentStep === 2 && (
            <VisualStyle storyData={storyData} updateStoryData={updateStoryData} />
          )}
          
          {currentStep === 3 && (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-6">Ready to Generate Your Story!</h2>
              <p className="mb-8 text-lg">
                You've completed all the steps. Click the button below to generate your bedtime story.
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={handleGenerateStory} 
                  size="lg" 
                  className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-xl hover:shadow-purple-300/50 transition-all duration-300 rounded-xl"
                >
                  ✨ Generate My Story ✨
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button 
                onClick={handleBack} 
                variant="outline"
                className="button-bounce"
              >
                Back
              </Button>
            )}
            {currentStep < 3 && (
              <Button 
                onClick={handleNext} 
                className="ml-auto button-bounce"
              >
                Continue
              </Button>
            )}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default CreateStory;
