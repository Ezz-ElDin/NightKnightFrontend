// Theme options
export const THEMES = [
  { id: "fantasy", name: "Fantasy Worlds", description: "Enchanted forests, magical kingdoms, castles, fairies, dragons, etc.", subdescription: "Kids love escaping into places where the impossible becomes possible.", color: "#b3e0ff", textColor: "#3a5e8c", image: null },
  { id: "animals", name: "Animal Adventures", description: "Talking animals, jungle journeys, farmyard fun, or wild creatures on a quest.", subdescription: "Familiar and endearing, animals let kids project emotions and behavior in a fun way.", color: "#f7e8a2", textColor: "#8c6f3a", image: null },
  { id: "space", name: "Space & Science Fiction", description: "Rocket ships, aliens, distant planets, or robot friends.", subdescription: "These stories tap into curiosity and wonder about the universe.", color: "#d9b3ff", textColor: "#673a8c", image: null },
  { id: "daily", name: "Daily Life & Routine", description: "Bath time, brushing teeth, first day of school, bedtime rituals, family moments.", subdescription: "Comforting and relatable, especially for younger kids.", color: "#ffb3d9", textColor: "#8c3a67", image: null },
  { id: "exploration", name: "Exploration & Travel", description: "Exploring forests, oceans, cities, or even imaginary lands.", subdescription: "Often includes maps, riddles, or clues—great for curiosity and problem-solving.", color: "#a2f7b5", textColor: "#3a8c5b", image: null },
  { id: "whimsical", name: "Whimsical Imagination", description: "Objects that come to life, dreamscapes, imaginary friends, or nonsensical worlds.", subdescription: "Embraces creativity and surreal, playful storytelling.", color: "#ffccff", textColor: "#8c3a8c", image: null },
];

// For backward compatibility, export THEMES as GENRES as well
export const GENRES = THEMES;

// Tone options
export const TONES = [
  { id: "playful", name: "Playful and Funny", description: "Make the story silly, full of fun and giggles!", color: "#ffda99", textColor: "#8c6f3a", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "calm", name: "Calm and Soothing", description: "Make the story soft and gentle — perfect for bedtime.", color: "#b3d9ff", textColor: "#3a5e8c", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "exciting", name: "Exciting and Adventurous", description: "Make the story thrilling, like going on a big quest!", color: "#ffb3fc", textColor: "#8c3a8a", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "kind", name: "Kind and Friendly", description: "Make the story warm, loving and full of kindness.", color: "#a2f7b5", textColor: "#3a8c5b", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "inspirational", name: "Inspirational and Uplifting", description: "Make the story encouraging and full of positive messages.", color: "#fff099", textColor: "#8c7e3a", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "educational", name: "Educational and Thoughtful", description: "Make the story teach something new in a fun way.", color: "#cafffa", textColor: "#3a8c84", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
];

// Narrative Style options
export const NARRATIVE_STYLES = [
  { id: "classic", name: "Classic Storybook", description: "Tell the story in a simple and clear way, like a traditional bedtime story.", color: "#d9c7ff", textColor: "#543a8c", image: null },
  { id: "rhyming", name: "Rhyming and Repetitive", description: "Make the story musical and fun with rhymes and repeated phrases.", color: "#ffc7c7", textColor: "#8c3a3a", image: null },
  { id: "dialogue", name: "Dialogue-Driven", description: "Make the story full of character conversations and talking.", color: "#c7ffe0", textColor: "#3a8c5e", image: null },
  { id: "simple", name: "Simple and Easy", description: "Make the story very easy to follow, with short and simple sentences (best for younger children).", color: "#ffe0c7", textColor: "#8c5e3a", image: null },
  { id: "dreamy", name: "Dreamy and Poetic", description: "Make the story soft and magical, with flowing and beautiful words (great for bedtime).", color: "#c7d6ff", textColor: "#3a4f8c", image: null },
];

// Character traits
export const PERSONALITY_TRAITS = [
  "Brave", "Curious", "Shy", "Playful", "Wise", "Kind",
  "Clever", "Adventurous", "Funny", "Loyal", "Mischievous"
];

// Character roles
export const CHARACTER_ROLES = [
  "Hero", "Sidekick", "Mentor", "Villain", "Friend", "Guide"
];

// Age ranges
export const AGE_RANGES = [
  "0-3", "4-6", "7-9"
];

// Languages
export const LANGUAGES = [
  { id: "English", flag: "🇺🇸" },
  { id: "Spanish", flag: "🇪🇸" },
  { id: "French", flag: "🇫🇷" },
  { id: "German", flag: "🇩🇪" },
  { id: "Chinese", flag: "🇨🇳" },
  { id: "Arabic", flag: "🇪🇬" },
];

// Character interface
export interface Character {
  id: string;
  name: string;
  appearance: string;
  personality: string[];
  role: string;
}

// Story Settings Props
export interface StorySettingsProps {
  storyData: any;
  updateStoryData: (data: any) => void;
}
