
import React from "react";
import clsx from "clsx";

interface StoryVisualProps {
  coverUrl: string;
  title: string;
}

const StoryVisual: React.FC<StoryVisualProps> = ({ coverUrl, title }) => (
  <div className="w-full bg-[#fafafd] flex items-center justify-center relative p-4 md:p-6">
    <div
      className={clsx(
        "relative w-full max-w-md flex items-center justify-center"
      )}
      style={{
        aspectRatio: "4 / 3",
        background: "#e8eafd",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 32px 3px rgba(100,100,115,0.10)",
      }}
    >
      <img
        src={coverUrl}
        alt={"Illustration for " + title}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
    </div>
  </div>
);

export default StoryVisual;
