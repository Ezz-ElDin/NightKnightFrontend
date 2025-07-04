
import React from "react";
import clsx from "clsx";

interface StoryVisualProps {
  coverUrl: string;
  title: string;
}

const StoryVisual: React.FC<StoryVisualProps> = ({ coverUrl, title }) => (
  <div className="w-full h-full bg-white flex items-center justify-center p-0 m-0">
    <div
      className={clsx(
        "relative w-full h-full flex items-center justify-center"
      )}
      style={{
        background: "white",
        borderRadius: "0",
        overflow: "hidden",
        boxShadow: "0 4px 32px 3px rgba(100,100,115,0.10)",
      }}
    >
      <img
        src={coverUrl}
        alt={"Illustration for " + title}
        className="w-full h-full object-contain"
        style={{
          borderRadius: "0",
        }}
      />
    </div>
  </div>
);

export default StoryVisual;
