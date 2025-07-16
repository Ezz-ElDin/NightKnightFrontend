
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
  id: string;
  name: string;
  appearance: string;
  personality: string[];
  role: string;
  appearanceFields?: {
    appearanceAge: string;
    appearanceColor: string;
    appearanceColorCustom: string;
    appearanceType: string;
    appearanceTypeCustom: string;
    appearanceEyes: string;
    appearanceEyesCustom: string;
    appearanceHairStyle: string;
    appearanceHairStyleCustom: string;
    appearanceHairColor: string;
    appearanceHairColorCustom: string;
    appearanceAccessories: string[];
  };
}
