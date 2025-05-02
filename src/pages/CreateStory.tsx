import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StorySettings from "@/components/story-generator/StorySettings";
import VisualStyle from "@/components/story-generator/VisualStyle";
import StepIndicator from "@/components/story-generator/StepIndicator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { StorySettingStep } from "@/components/story-generator/StorySettingStep";
import { Sparkles, ChevronLeft, ChevronRight, Wand2, Users } from "lucide-react";
import ThemeSelector from "@/components/story-generator/ThemeSelector";
import ToneSelector from "@/components/story-generator/ToneSelector";
import NarrativeStyleSelector from "@/components/story-generator/NarrativeStyleSelector";
import CharacterManager from "@/components/story-generator/CharacterManager";

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
      <div className="container mx-auto py-4 px-2 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-primary flex items-center justify-center gap-3">
          <Sparkles className="h-8 w-8 text-yellow-400" />
          Create Your Story
          <Sparkles className="h-8 w-8 text-yellow-400" />
        </h1>
        
        <StepIndicator steps={steps} currentStep={currentStep} />
        
        <Card className="mt-6 p-4 md:p-6 shadow-lg border-2 border-primary/20 rounded-2xl bg-white/80 backdrop-blur-sm">
          <div className="story-step-content min-h-[400px]">
            {currentStep === 1 && (
              <StorySettingStep 
                title="Choose Your Story Theme"
                description="What kind of story do you want to create?"
                icon={<Sparkles className="h-8 w-8 text-yellow-400" />}
              >
                <div className="mt-4">
                  <div className="theme-selector">
                    {storyData.genre && (
                      <div className="mb-4 px-4 py-2 bg-primary/10 rounded-xl inline-block">
                        You picked: <span className="font-bold">{storyData.genre}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="theme-selector">
                    <ThemeSelector 
                      selectedTheme={storyData.genre} 
                      onSelectTheme={(themeId) => updateStoryData({ genre: themeId })} 
                    />
                  </div>
                </div>
              </StorySettingStep>
            )}
            
            {currentStep === 2 && (
              <StorySettingStep 
                title="Choose Your Story Mood"
                description="How should your story feel?"
                icon={<Sparkles className="h-8 w-8 text-yellow-400" />}
              >
                <div className="mt-4">
                  {storyData.tone && (
                    <div className="mb-4 px-4 py-2 bg-primary/10 rounded-xl inline-block">
                      You picked: <span className="font-bold">{storyData.tone}</span>
                    </div>
                  )}
                  
                  <div className="tone-selector">
                    <ToneSelector 
                      selectedTone={storyData.tone} 
                      onSelectTone={(toneId) => updateStoryData({ tone: toneId })} 
                    />
                  </div>
                </div>
              </StorySettingStep>
            )}
            
            {currentStep === 3 && (
              <StorySettingStep 
                title="How Should Your Story Be Told?"
                description="Pick a way to tell your story"
                icon={<Sparkles className="h-8 w-8 text-yellow-400" />}
              >
                <div className="mt-4">
                  {storyData.narrativeStyle && (
                    <div className="mb-4 px-4 py-2 bg-primary/10 rounded-xl inline-block">
                      You picked: <span className="font-bold">{storyData.narrativeStyle}</span>
                    </div>
                  )}
                  
                  <div className="narrative-style-selector">
                    <NarrativeStyleSelector 
                      selectedStyle={storyData.narrativeStyle} 
                      onSelectStyle={(styleId) => updateStoryData({ narrativeStyle: styleId })} 
                    />
                  </div>
                </div>
              </StorySettingStep>
            )}
            
            {currentStep === 4 && (
              <StorySettingStep 
                title="Who's in Your Story?"
                description="Add characters to your adventure!"
                icon={<Users className="h-8 w-8 text-blue-400" />}
              >
                <div className="mt-4">
                  <div className="characters-container">
                    <div className="mb-4">
                      <div className="text-lg mb-4">
                        Every great story needs characters! Who will be in your story?
                      </div>
                      
                      {storyData.characters.length > 0 ? (
                        <div className="space-y-4">
                          {storyData.characters.map((character) => (
                            <div 
                              key={character.id} 
                              className="border-2 border-primary/20 p-4 rounded-xl bg-white shadow-md flex flex-col md:flex-row items-center gap-4 relative"
                            >
                              {/* Character silhouette icon */}
                              <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${getCharacterGradient(character.role)}`}>
                                <span className="text-4xl">{getCharacterEmoji(character.role)}</span>
                              </div>
                              
                              <div className="flex-1 text-center md:text-left">
                                <div className="font-bold text-xl">{character.name}</div>
                                <div className="text-sm text-primary bg-primary/10 inline-block px-2 py-1 rounded-full">{character.role}</div>
                                
                                <div className="mt-2 text-gray-600">{character.appearance}</div>
                                
                                <div className="mt-2 flex flex-wrap gap-1 justify-center md:justify-start">
                                  {character.personality.map(trait => (
                                    <span 
                                      key={trait} 
                                      className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
                                    >
                                      {trait}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <button
                                onClick={() => {
                                  const updatedCharacters = storyData.characters.filter(c => c.id !== character.id);
                                  updateStoryData({ characters: updatedCharacters });
                                }}
                                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive h-6 w-6 flex items-center justify-center rounded-full hover:bg-destructive/10"
                                aria-label="Remove character"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-8 mb-6 border-2 border-dashed border-primary/20 rounded-xl">
                          <div className="text-4xl mb-2">🧙‍♂️👸🦁</div>
                          <div className="text-lg text-muted-foreground">No characters yet!</div>
                          <div>Add some magical friends to your story.</div>
                        </div>
                      )}
                    </div>
                    
                    <CharacterManager 
                      characters={storyData.characters} 
                      updateCharacters={(characters) => updateStoryData({ characters })} 
                    />
                  </div>
                </div>
              </StorySettingStep>
            )}
            
            {currentStep === 5 && (
              <StorySettingStep 
                title="Final Story Details"
                description="Add the finishing touches to your story"
                icon={<Sparkles className="h-8 w-8 text-yellow-400" />}
              >
                <div className="story-details mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <span role="img" aria-label="book">📚</span> Story Title
                        </h3>
                        <input
                          type="text"
                          placeholder="Name your story (or leave blank for a surprise!)"
                          className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                          value={storyData.title}
                          onChange={(e) => updateStoryData({ title: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <span role="img" aria-label="star">⭐</span> Story Lesson
                        </h3>
                        <input
                          type="text"
                          placeholder="What should kids learn? (kindness, bravery...)"
                          className="w-full p-3 text-lg rounded-xl border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                          value={storyData.moral}
                          onChange={(e) => updateStoryData({ moral: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <span role="img" aria-label="child">👶</span> Age Range
                        </h3>
                        <div className="flex gap-4">
                          {["3-5", "6-8", "9-12"].map((range) => (
                            <button
                              key={range}
                              className={`flex-1 py-3 px-4 text-lg rounded-xl transition-all ${
                                storyData.ageRange === range
                                  ? "bg-primary text-white font-bold ring-4 ring-primary/30"
                                  : "bg-primary/10 hover:bg-primary/20"
                              }`}
                              onClick={() => updateStoryData({ ageRange: range })}
                            >
                              {range} years
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <span role="img" aria-label="book">📖</span> How Long?
                        </h3>
                        <div className="flex items-center gap-4">
                          <button
                            className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20"
                            onClick={() => updateStoryData({ pages: Math.max(5, storyData.pages - 5) })}
                          >
                            Shorter
                          </button>
                          <div className="flex-1 text-center font-bold">
                            {storyData.pages} pages
                          </div>
                          <button
                            className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20"
                            onClick={() => updateStoryData({ pages: Math.min(30, storyData.pages + 5) })}
                          >
                            Longer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StorySettingStep>
            )}
            
            {currentStep === 6 && (
              <StorySettingStep 
                title="Ready to Create Your Story!"
                description="Let's make some storytelling magic happen!"
                icon={<Wand2 className="h-8 w-8 text-yellow-400" />}
              >
                <div className="text-center py-10">
                  <div className="space-y-6">
                    <div className="space-y-2 bg-primary/10 p-6 rounded-xl">
                      <h3 className="text-xl font-bold">Your Story Details:</h3>
                      <ul className="text-lg space-y-2">
                        <li><span className="font-bold">Theme:</span> {storyData.genre}</li>
                        <li><span className="font-bold">Mood:</span> {storyData.tone}</li>
                        <li><span className="font-bold">Style:</span> {storyData.narrativeStyle}</li>
                        <li><span className="font-bold">Characters:</span> {storyData.characters.length > 0 
                          ? storyData.characters.map(c => c.name).join(", ") 
                          : "No characters yet"}</li>
                        {storyData.title && <li><span className="font-bold">Title:</span> {storyData.title}</li>}
                        {storyData.moral && <li><span className="font-bold">Lesson:</span> {storyData.moral}</li>}
                        <li><span className="font-bold">Age:</span> {storyData.ageRange} years</li>
                        <li><span className="font-bold">Length:</span> {storyData.pages} pages</li>
                      </ul>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        onClick={handleGenerateStory} 
                        size="lg" 
                        className="px-8 py-8 text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-xl hover:shadow-purple-300/50 transition-all duration-300 rounded-xl"
                      >
                        <Sparkles className="mr-2 h-6 w-6" />
                        ✨ Create My Story! ✨
                      </Button>
                    </div>
                  </div>
                </div>
              </StorySettingStep>
            )}
          </div>
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button 
                onClick={handleBack} 
                variant="outline"
                size="lg"
                className="button-bounce text-lg gap-2"
              >
                <ChevronLeft className="h-5 w-5" />
                Back
              </Button>
            )}
            
            {currentStep < steps.length && (
              <Button 
                onClick={handleNext} 
                size="lg"
                className="ml-auto button-bounce text-lg gap-2"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

// Helper function to get a gradient color based on character role
const getCharacterGradient = (role) => {
  switch(role) {
    case "Hero": return "from-blue-200 to-blue-400 text-blue-800";
    case "Villain": return "from-red-200 to-red-400 text-red-800";
    case "Sidekick": return "from-green-200 to-green-400 text-green-800";
    case "Mentor": return "from-purple-200 to-purple-400 text-purple-800";
    case "Animal": return "from-yellow-200 to-yellow-400 text-yellow-800";
    default: return "from-gray-200 to-gray-400 text-gray-800";
  }
};

// Helper function to get an emoji based on character role
const getCharacterEmoji = (role) => {
  switch(role) {
    case "Hero": return "🦸";
    case "Villain": return "😈";
    case "Sidekick": return "🧙";
    case "Mentor": return "👴";
    case "Animal": return "🐾";
    default: return "👤";
  }
};

export default CreateStory;
