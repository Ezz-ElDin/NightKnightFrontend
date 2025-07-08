
export interface StoryData {
  title: string;
  genre: string;
  tone: string;
  narrativeStyle: string;
  ageRange: string;
  moral: string;
  characters: any[];
  language: string;
  illustrationStyle: string;
}

export type StoryMode = "magic" | "creative";

export interface StoryStep {
  id: number;
  name: string;
}

export interface Character {
  name: string;
  appearance: string;
  role: string;
  personality: string[];
}
