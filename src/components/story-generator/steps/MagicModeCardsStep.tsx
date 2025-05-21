
import React from "react";
import MagicModeCards, { MAGIC_CARDS } from "@/components/story-generator/MagicModeCards";

const MagicModeCardsStep = ({ magicSelected, setMagicSelected, setStoryData }: any) => (
  <MagicModeCards
    selected={magicSelected}
    onSelect={(settings) => {
      const card = MAGIC_CARDS.find(card => card.set.genre === settings.genre);
      setMagicSelected(card?.id ?? null);
      setStoryData((prev: any) => ({
        ...prev,
        genre: settings.genre,
        tone: settings.tone,
        narrativeStyle: settings.narrativeStyle,
        pages: 12,
      }));
    }}
  />
);

export default MagicModeCardsStep;
