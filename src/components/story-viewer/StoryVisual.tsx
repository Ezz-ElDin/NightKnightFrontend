
import React from "react";
import clsx from "clsx";

interface StoryVisualProps {
  coverUrl: string;
  title: string;
}

const StoryVisual: React.FC<StoryVisualProps> = ({ coverUrl, title }) => (
  <div className="flex-1 bg-[#fafafd] flex items-center justify-center relative p-0 m-0 h-full">
    <div
      className={clsx(
        "relative w-full h-full flex items-center justify-center"
      )}
      style={{
        background: "#e8eafd",
        borderRadius: "0",
        overflow: "hidden",
        boxShadow: "0 4px 32px 3px rgba(100,100,115,0.10)",
      }}
    >
      <img
        src={coverUrl}
        alt={"Illustration for " + title}
        className="w-full h-full object-cover block"
        style={{
          objectFit: "cover",
          borderRadius: "0",
          display: "block",
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  </div>
);

export default StoryVisual;
