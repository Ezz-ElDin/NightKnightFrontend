import React from "react";

interface IllustrationStepProps {
  illustrationStyle: string;
  setIllustrationStyle: (value: string) => void;
}

const ILLUSTRATIONS = [
  {
    id: "cinematic",
    title: "Cinematic",
    image: "/images/cinematic_illustration.png",
  },
  {
    id: "paper_cutout",
    title: "Paper Cutout",
    image: "/images/paper_cutout_illustration.png",
  },
  {
    id: "storybook",
    title: "storybook",
    image: "/images/storybook_illustration.png",
  },
];

const IllustrationStep: React.FC<IllustrationStepProps> = ({
  illustrationStyle,
  setIllustrationStyle,
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-2">
        Choose Your Illustration Style
      </h2>
      <p className="text-muted-foreground text-center mb-6">
        Select the type of visuals you want for your story.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl">
        {ILLUSTRATIONS.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setIllustrationStyle(card.id)}
            className={`rounded-2xl border-2 shadow-lg p-4 flex flex-col items-center gap-3 transition-transform bg-white/90 hover:scale-105 min-h-[250px] min-w-0
            ${illustrationStyle === card.id ? "ring-4 ring-violet-400 border-primary scale-105" : "border-transparent"}`}
            aria-pressed={illustrationStyle === card.id}
            style={{ width: "100%" }} // fill grid column width
          >
            <div className="flex items-center justify-center w-44 h-36">
              <img
                src={card.image}
                alt={card.title}
                className="object-contain w-full h-full"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            <span className="font-bold text-lg">{card.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IllustrationStep;
