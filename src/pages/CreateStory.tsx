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
import CauldronPanel, { CauldronIngredient } from "@/components/story-generator/CauldronPanel";

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

  // ---- ADD CAULDRON PANEL STATE ----
  const [cauldronIngredients, setCauldronIngredients] = useState<CauldronIngredient[]>([]);
  const [stirring, setStirring] = useState(false);

  // Helper: Add or update ingredient in cauldron
  const addCauldronIngredient = (ingredient: CauldronIngredient) => {
    setCauldronIngredients((prev) => {
      // Only one "vibe", "theme", "tone", "style" each
      if (["vibe", "theme", "tone", "style"].includes(ingredient.type)) {
        return [
          ...prev.filter((item) => item.type !== ingredient.type), 
          ingredient
        ];
      }
      // For characters, can have multiple
      if (ingredient.type === "character") {
        // Avoid duplicates
        if (prev.some(item => item.type === "character" && item.id === ingredient.id)) return prev;
        return [...prev, ingredient];
      }
      return prev;
    });
    setStirring(true);
  };
  // Reset stirring after animation
  const handleStirAnimationEnd = () => setStirring(false);

  const clearCauldron = () => setCauldronIngredients([]);

  // Only two main flows: Start (combined), then rest
  const steps =
    mode === "magic"
      ? [
          { id: 1, name: "Start" },
          { id: 2, name: "Choose Magic Card" },
          { id: 3, name: "Characters" },
          { id: 4, name: "Summary" },
        ]
      : [
          { id: 1, name: "Start" },
          { id: 2, name: "Theme" },
          { id: 3, name: "Tone" },
          { id: 4, name: "Style" },
          { id: 5, name: "Characters" },
          { id: 6, name: "Summary" },
        ];

  // Handle language and age changes
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

  // ---- WIRE UP INGREDIENT ADDITION ----
  // Magic mode: Step 2 - Pick vibe
  // On select, add ingredient and trigger animation
  const handleMagicCardSelect = (settings) => {
    const card = MAGIC_CARDS.find(card => card.set.genre === settings.genre);
    setMagicSelected(card?.id ?? null);
    setStoryData((prev) => ({
      ...prev,
      genre: settings.genre,
      tone: settings.tone,
      narrativeStyle: settings.narrativeStyle,
      pages: 12, // Ensure it's 12 for payload
    }));
    // Add as ingredient (vibe)
    if (card) {
      addCauldronIngredient({
        icon: card.emoji,
        label: card.title,
        type: "vibe",
        id: card.id,
      });
    }
  };

  // Creative mode: Step 2-4
  // When user selects a theme/tone/style, drop in cauldron
  const handleCreativeSelect = (type: "theme"|"tone"|"style", value: string) => {
    let icon = "";
    let label = "";
    if (type === "theme") {
      // ThemeSelector
      const { GENRES } = require("@/components/story-generator/constants");
      const genre = GENRES.find((g) => g.id === value);
      icon = genre?.icon ?? "📚";
      label = genre?.name ?? value;
      addCauldronIngredient({ icon, label, type: "theme", id: value });
      updateStoryData({ genre: value });
    }
    if (type === "tone") {
      const { TONES } = require("@/components/story-generator/constants");
      const tone = TONES.find((t) => t.id === value);
      icon = tone?.icon ?? "✨";
      label = tone?.name ?? value;
      addCauldronIngredient({ icon, label, type: "tone", id: value });
      updateStoryData({ tone: value });
    }
    if (type === "style") {
      const { NARRATIVE_STYLES } = require("@/components/story-generator/constants");
      const style = NARRATIVE_STYLES.find((n) => n.id === value);
      icon = style?.emoji ?? "🖋️";
      label = style?.name ?? value;
      addCauldronIngredient({ icon, label, type: "style", id: value });
      updateStoryData({ narrativeStyle: value });
    }
  };

  // Auto-drop character when created (Magic or Creative, Step == Characters)
  const handleCharacterAdd = (character) => {
    // Already passed down character add logic. Here just cauldron update.
    addCauldronIngredient({
      icon: "🧑‍🚀", // Could be improved to match role later
      label: `${character.name} (${character.role})`,
      type: "character",
      id: character.id,
    });
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

  // ---- Layout: Step 1 (unchanged), Step >= 2 split screen ----
  // Responsive: md:flex-row; stack vertically on sm
  const splitLayout =
    <div className="flex flex-col md:flex-row gap-6 transition-all">
      {/* Left: Story creation step (60%) */}
      <div className="flex-1 md:w-3/5">
        <div className="story-step-content min-h-[400px]">
          {mode === "magic" && currentStep === 2 && (
            <MagicModeCards
              selected={magicSelected}
              onSelect={handleMagicCardSelect}
            />
          )}

          {mode === "magic" && currentStep === 3 && (
            <CharacterStep storyData={storyData} updateStoryData={updateStoryData}
              onCharacterAdd={handleCharacterAdd}
            />
          )}
          {mode === "magic" && currentStep === 4 && (
            <StorySummary storyData={storyData} onGenerateStory={handleGenerateStory} />
          )}

          {/* Creative Mode flow */}
          {mode === "creative" && currentStep === 2 && (
            <ThemeStep
              storyData={storyData}
              updateStoryData={updateStoryData}
              onThemeSelect={(id) => handleCreativeSelect("theme", id)}
            />
          )}
          {mode === "creative" && currentStep === 3 && (
            <ToneStep
              storyData={storyData}
              updateStoryData={updateStoryData}
              onToneSelect={(id) => handleCreativeSelect("tone", id)}
            />
          )}
          {mode === "creative" && currentStep === 4 && (
            <StyleStep
              storyData={storyData}
              updateStoryData={updateStoryData}
              onStyleSelect={(id) => handleCreativeSelect("style", id)}
            />
          )}
          {mode === "creative" && currentStep === 5 && (
            <CharacterStep storyData={storyData} updateStoryData={updateStoryData}
              onCharacterAdd={handleCharacterAdd}
            />
          )}
          {mode === "creative" && currentStep === 6 && (
            <StorySummary storyData={storyData} onGenerateStory={handleGenerateStory} />
          )}
        </div>
      </div>
      {/* Right: Cauldron */}
      <div className="flex-shrink-0 md:w-2/5 max-w-md mx-auto md:mx-0 md:ml-2">
        <CauldronPanel
          ingredients={cauldronIngredients}
          stirring={stirring}
          onClear={clearCauldron}
          onAnimationEnd={handleStirAnimationEnd}
          cauldronLabel="Your story is taking shape…"
        />
      </div>
    </div>;

  return (
    <TooltipProvider>
      <StoryCreationLayout 
        title="Create Your Story" 
        currentStep={currentStep}
        steps={steps}
      >
        {/* Start step unchanged */}
        {currentStep === 1 ? (
          <div className="story-step-content min-h-[400px]">
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
          </div>
        ) : (
          splitLayout
        )}
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
