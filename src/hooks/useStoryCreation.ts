
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MAGIC_CARDS } from "@/components/story-generator/MagicModeCards";
import { api } from "@/lib/api";

// --- ENUM MAPPINGS for backend fields ---
const LANGUAGE_MAP: Record<string, string> = {
  "English": "british_english",
  "French": "french",
  "Arabic": "egyptian_arabic",
};
const THEME_MAP: Record<string, string> = {
  "fantasy": "fantasy",
  "animals": "animal",
  "space": "space",
  "daily": "routine",
  "exploration": "exploration",
  "whimsical": "imagination",
};
const TONE_MAP: Record<string, string> = {
  "playful": "playful",
  "calm": "soothing",
  "exciting": "adventurous",
  "kind": "friendly",
  "inspirational": "inspirational",
  "educational": "educational",
};
const NARRATIVE_MAP: Record<string, string> = {
  "classic": "classic",
  "rhyming": "rhyming",
  "dialogue": "dialogue",
  "simple": "simple",
  "dreamy": "dreamy",
};
const ILLUSTRATION_MAP: Record<string, string> = {
  "cinematic": "cinematic",
  "paper_cutout": "paper_cutout",
  "storybook": "storybook",
};

// Personality traits mapping - convert frontend traits to backend lowercase format
const PERSONALITY_TRAITS_MAP: Record<string, string> = {
  "Brave": "brave",
  "Shy": "shy", 
  "Wise": "wise",
  "Clever": "clever",
  "Funny": "funny",
  "Mischievous": "mischievous",
  "Curious": "curious",
  "Playful": "playful",
  "Kind": "kind",
  "Adventurous": "adventurous",
  "Loyal": "loyal",
};

const CARD_MAPPINGS: Record<string, { theme: string, tone: string, narrative: string }> = {
  "magic-worlds":     { theme: "fantasy",  tone: "soothing",    narrative: "dreamy" },
  "animal-adventures":{ theme: "animal",   tone: "playful",     narrative: "rhyming" },
  "exploring-beyond": { theme: "exploration", tone: "adventurous", narrative: "dialogue" },
  "real-life-moments":{ theme: "routine",  tone: "educational", narrative: "simple" },
};

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
    pages: 15,
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
    { id: 5, name: "Illustrations" },
    { id: 6, name: "Characters" },
    { id: 7, name: "Summary" },
  ];
  const magicSteps = [
    { id: 1, name: "Start" },
    { id: 2, name: "Magic" },
    { id: 3, name: "Illustrations" },
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
      pages: data.pages !== undefined ? data.pages : 15
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

  // MAIN: POST generate endpoint
  const handleGenerateStory = async () => {
    toast({
      title: "Your magic story is coming to life! ✨",
      description: "The story fairies are working hard to create your adventure!",
    });

    // Helper: Character objects mapping
    const characterList = Array.isArray(storyData.characters)
      ? storyData.characters.map((c: any) => ({
          name: c.name,
          appearance: c.appearance,
          role: c.role,
          personality_traits: Array.isArray(c.personality) 
            ? c.personality.map((trait: string) => PERSONALITY_TRAITS_MAP[trait] || trait.toLowerCase())
            : [],
        }))
      : [];

    let payload: any;
    if (mode === "creative") {
      payload = {
        mode: "creative",
        story_title: storyData.title ?? "",
        language: LANGUAGE_MAP[storyData.language] || "british_english",
        age: storyData.ageRange,
        moral_of_the_story: storyData.moral,
        theme: THEME_MAP[storyData.genre] || "",
        tone: TONE_MAP[storyData.tone] || "",
        narrative_style: NARRATIVE_MAP[storyData.narrativeStyle] || "",
        illustration_style: ILLUSTRATION_MAP[storyData.illustrationStyle] || "",
        number_of_pages: storyData.pages || 15,
        characters: characterList,
      };
    } else if (mode === "magic") {
      // Get card-based mapping
      let cardSettings = CARD_MAPPINGS[magicSelected ?? ""] || {
        theme: "",
        tone: "",
        narrative: "",
      };
      payload = {
        mode: "magic",
        story_title: storyData.title ?? "",
        language: LANGUAGE_MAP[storyData.language] || "british_english",
        age: storyData.ageRange,
        moral_of_the_story: storyData.moral,
        theme: cardSettings.theme,
        tone: cardSettings.tone,
        narrative_style: cardSettings.narrative,
        illustration_style: ILLUSTRATION_MAP[storyData.illustrationStyle] || "",
        number_of_pages: storyData.pages || 15,
        characters: characterList,
      };
    }

    try {
      const res = await api.post("/api/generate-story/", payload);
      // Extract story_id from nested response structure
      const storyId = res.data.data?.story_id;
      if (storyId) {
        navigate(`/generating-story/${storyId}`, { state: { storyData } });
      } else {
        throw new Error("No story_id received from server");
      }
    } catch (err: any) {
      toast({
        title: "Failed to start story generation 😬",
        description:
          err?.response?.data?.detail ||
          err?.message ||
          "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
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
