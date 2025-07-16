
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { StoryData, StoryMode } from "./types";
import {
  LANGUAGE_MAP,
  THEME_MAP,
  TONE_MAP,
  NARRATIVE_MAP,
  ILLUSTRATION_MAP,
  PERSONALITY_TRAITS_MAP,
  CARD_MAPPINGS,
} from "./constants";

export const useStoryGeneration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerateStory = async (
    storyData: StoryData,
    mode: StoryMode,
    magicSelected: string | null
  ) => {
    toast({
      title: "Your magic story is coming to life! ✨",
      description: "The story fairies are working hard to create your adventure!",
    });

    // Helper: Character objects mapping
    const characterList = Array.isArray(storyData.characters)
      ? storyData.characters.map((c: any) => ({
          name: (c.name || "").trim(),
          appearance: (c.appearance || "").trim(),
          role: (c.role || "").trim(),
          personality_traits: Array.isArray(c.personality) 
            ? c.personality.map((trait: string) => PERSONALITY_TRAITS_MAP[trait] || trait.toLowerCase())
            : [],
        }))
      : [];

    let payload: any;
    if (mode === "creative") {
      payload = {
        mode: "creative",
        story_title: (storyData.title || "").trim(),
        language: LANGUAGE_MAP[storyData.language] || "british_english",
        age: (storyData.ageRange || "").trim(),
        moral_of_the_story: (storyData.moral || "").trim(),
        theme: THEME_MAP[storyData.genre] || "",
        tone: TONE_MAP[storyData.tone] || "",
        narrative_style: NARRATIVE_MAP[storyData.narrativeStyle] || "",
        illustration_style: ILLUSTRATION_MAP[storyData.illustrationStyle] || "",
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
        story_title: (storyData.title || "").trim(),
        language: LANGUAGE_MAP[storyData.language] || "british_english",
        age: (storyData.ageRange || "").trim(),
        moral_of_the_story: (storyData.moral || "").trim(),
        theme: cardSettings.theme,
        tone: cardSettings.tone,
        narrative_style: cardSettings.narrative,
        illustration_style: ILLUSTRATION_MAP[storyData.illustrationStyle] || "",
        characters: characterList,
      };
    }

    try {
      const res = await api.post("/api/generate-story/", payload);
      // Extract story_id from nested response structure
      const storyId = res.data.data?.story_id;
      if (storyId) {
        // Store the generating story ID in localStorage for the library to show
        localStorage.setItem('generatingStoryId', storyId.toString());
        
        // Dispatch event to update credits in navbar
        window.dispatchEvent(new Event('story-generated'));
        
        navigate('/library');
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

  return { handleGenerateStory };
};
