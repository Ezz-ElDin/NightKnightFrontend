
// Genre options
export const GENRES = [
  { id: "adventure", name: "Adventure", icon: "🏞️", color: "#a2f7b5", textColor: "#3a8c5b", image: "/lovable-uploads/51f1dc72-25cc-48e4-988f-64eed7e2d51e.png" },
  { id: "fantasy", name: "Fantasy", icon: "🧙‍♂️", color: "#b3e0ff", textColor: "#3a5e8c", image: null },
  { id: "mystery", name: "Mystery", icon: "🔍", color: "#d9b3ff", textColor: "#673a8c", image: null },
  { id: "friendship", name: "Friendship", icon: "👭", color: "#ffb3d9", textColor: "#8c3a67", image: null },
  { id: "animals", name: "Animals", icon: "🐾", color: "#f7e8a2", textColor: "#8c6f3a", image: null },
  { id: "magic", name: "Magic", icon: "✨", color: "#ffccff", textColor: "#8c3a8c", image: null },
];

// Tone options
export const TONES = [
  { id: "friendly", name: "Friendly", icon: "🙂", color: "#a2f7b5", textColor: "#3a8c5b", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "playful", name: "Playful", icon: "😄", color: "#ffda99", textColor: "#8c6f3a", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "educational", name: "Educational", icon: "🧠", color: "#cafffa", textColor: "#3a8c84", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "inspirational", name: "Inspirational", icon: "⭐", color: "#fff099", textColor: "#8c7e3a", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "soothing", name: "Soothing", icon: "😴", color: "#b3d9ff", textColor: "#3a5e8c", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
  { id: "silly", name: "Silly", icon: "🤪", color: "#ffb3fc", textColor: "#8c3a8a", image: "/lovable-uploads/7b6b7f52-efd8-4d6c-b7ac-3b2bdbd1a2d6.png" },
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
  "3-5", "6-8", "9-12"
];

// Languages
export const LANGUAGES = [
  { id: "English", flag: "🇺🇸" },
  { id: "Spanish", flag: "🇪🇸" },
  { id: "French", flag: "🇫🇷" },
  { id: "German", flag: "🇩🇪" },
  { id: "Chinese", flag: "🇨🇳" },
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
