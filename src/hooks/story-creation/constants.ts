
// --- ENUM MAPPINGS for backend fields ---
export const LANGUAGE_MAP: Record<string, string> = {
  "English": "british_english",
  "French": "french",
  "Arabic": "egyptian_arabic",
};

export const THEME_MAP: Record<string, string> = {
  "fantasy": "fantasy",
  "animals": "animal",
  "space": "space",
  "daily": "routine",
  "exploration": "exploration",
  "whimsical": "imagination",
};

export const TONE_MAP: Record<string, string> = {
  "playful": "playful",
  "calm": "soothing",
  "exciting": "adventurous",
  "kind": "friendly",
  "inspirational": "inspirational",
  "educational": "educational",
};

export const NARRATIVE_MAP: Record<string, string> = {
  "classic": "classic",
  "rhyming": "rhyming",
  "dialogue": "dialogue",
  "simple": "simple",
  "dreamy": "dreamy",
};

export const ILLUSTRATION_MAP: Record<string, string> = {
  "cinematic": "cinematic",
  "paper_cutout": "paper_cutout",
  "storybook": "storybook",
};

// Personality traits mapping - convert frontend traits to backend lowercase format
export const PERSONALITY_TRAITS_MAP: Record<string, string> = {
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

export const CARD_MAPPINGS: Record<string, { theme: string, tone: string, narrative: string }> = {
  "magic-worlds":     { theme: "fantasy",  tone: "soothing",    narrative: "dreamy" },
  "animal-adventures":{ theme: "animal",   tone: "playful",     narrative: "rhyming" },
  "exploring-beyond": { theme: "exploration", tone: "adventurous", narrative: "dialogue" },
  "real-life-moments":{ theme: "routine",  tone: "educational", narrative: "simple" },
};

export const CREATIVE_STEPS = [
  { id: 1, name: "Start" },
  { id: 2, name: "Theme" },
  { id: 3, name: "Tone" },
  { id: 4, name: "Style" },
  { id: 5, name: "Illustrations" },
  { id: 6, name: "Characters" },
  { id: 7, name: "Summary" },
];

export const MAGIC_STEPS = [
  { id: 1, name: "Start" },
  { id: 2, name: "Magic" },
  { id: 3, name: "Illustrations" },
  { id: 4, name: "Characters" },
  { id: 5, name: "Summary" },
];
