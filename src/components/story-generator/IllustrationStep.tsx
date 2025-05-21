
import React from "react";

interface IllustrationStepProps {
  illustrationStyle: string;
  setIllustrationStyle: (value: string) => void;
}

const ILLUSTRATIONS = [
  {
    id: "cinematic",
    title: "Cinematic",
    image:
      // Unsplash placeholder: 'Matrix movie still'
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "paper_cutout",
    title: "Paper Cutout",
    image:
      // Unsplash placeholder: 'Cat on textile'
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "storyboard",
    title: "Storyboard",
    image:
      // Unsplash placeholder: 'stylus pen graphic tablet'
      "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=600&q=80",
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
            className={`rounded-2xl border-2 shadow-lg p-4 flex flex-col items-center gap-3 transition-transform bg-white/90 hover:scale-105
            ${illustrationStyle === card.id ? "ring-4 ring-violet-400 border-primary scale-105" : "border-transparent"}`}
            aria-pressed={illustrationStyle === card.id}
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-44 h-36 object-cover rounded-xl mb-2 shadow"
            />
            <span className="font-bold text-lg">{card.title}</span>
          </button>
        ))}
      </div>
      {illustrationStyle && (
        <div className="mt-4 text-sm text-center text-muted-foreground">
          Selected: <span className="font-semibold">{ILLUSTRATIONS.find(i => i.id === illustrationStyle)?.title}</span>
        </div>
      )}
    </div>
  );
};

export default IllustrationStep;
