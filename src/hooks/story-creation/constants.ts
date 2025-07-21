
// --- ENUM MAPPINGS for backend fields ---
export const LANGUAGE_MAP: Record<string, string> = {
  "English": "british_english",
  "French": "french",
  "Arabic": "egyptian_arabic",
};

export const THEME_MAP: Record<string, string> = {
  "fantasy": "fantasy worlds",
  "animals": "animal adventures",
  "space": "space and science fiction",
  "daily": "daily life and routine",
  "exploration": "exploration and travel",
  "whimsical": "whimsical imagination",
};

export const TONE_MAP: Record<string, string> = {
  "playful": "playful and funny",
  "calm": "calm and soothing",
  "exciting": "exciting and adventurous",
  "kind": "kind and friendly",
  "inspirational": "inspirational and uplifting",
  "educational": "educational and thoughtful",
};

export const NARRATIVE_MAP: Record<string, string> = {
  "classic": "classic storybook",
  "rhyming": "rhyming and repetitive",
  "dialogue": "dialogue-driven",
  "simple": "simple and easy",
  "dreamy": "dreamy and poetic",
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
  "magic-worlds":     { theme: "fantasy worlds",  tone: "calm and soothing",    narrative: "dreamy and poetic" },
  "animal-adventures":{ theme: "animal adventures",   tone: "playful and funny",     narrative: "rhyming and repetitive" },
  "exploring-beyond": { theme: "exploration and travel", tone: "exciting and adventurous", narrative: "dialogue-driven" },
  "real-life-moments":{ theme: "daily life and routine",  tone: "educational and thoughtful", narrative: "simple and easy" },
};

export const CREATIVE_STEPS = [
  { id: 1, name: "Start" },
  { id: 2, name: "Theme" },
  { id: 3, name: "Tone" },
  { id: 4, name: "Style" },
  { id: 5, name: "Illustration" },
  { id: 6, name: "Characters" },
  { id: 7, name: "Title" },
  { id: 8, name: "Generate" },
];

export const MAGIC_STEPS = [
  { id: 1, name: "Start" },
  { id: 2, name: "Magic Cards" },
  { id: 3, name: "Illustration" },
  { id: 4, name: "Characters" },
  { id: 5, name: "Title" },
  { id: 6, name: "Generate" },
];
