
import React from "react";
import clsx from "clsx";

interface StoryVisualProps {
  coverUrl: string;
  title: string;
}

const StoryVisual: React.FC<StoryVisualProps> = ({ coverUrl, title }) => (
  <div className="flex-1 min-h-[340px] bg-[#fafafd] flex items-center justify-center relative p-0 m-0">
    <div
      className={clsx(
        "relative w-full max-w-full max-h-full flex items-center justify-center"
      )}
      style={{
        aspectRatio: "1 / 1",
        height: "min(100vw, 100vh, 100%)",
        maxHeight: "calc(100vh - 80px)",
        background: "#e8eafd",
        borderRadius: "0",
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
          borderRadius: "0",
        }}
      />
    </div>
  </div>
);

export default StoryVisual;
