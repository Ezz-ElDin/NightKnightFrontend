
import React from "react";
import clsx from "clsx";

interface StoryTextProps {
  title: string;
  text: string;
  page: number;
  rtl?: boolean;
}

const StoryText: React.FC<StoryTextProps> = ({ title, text, page, rtl }) => {
  return (
    <div
      className={clsx(
        "w-full flex flex-col px-6 md:px-8 py-6 md:py-8 gap-0",
        rtl ? "rtl text-right" : "ltr text-left",
        page === 0
          ? "justify-center items-center text-center"
          : "justify-start items-start"
      )}
      dir={rtl ? "rtl" : "ltr"}
    >
      {page === 0 ? (
        <h3 className="font-ghibli text-2xl md:text-3xl lg:text-4xl font-bold mb-0 w-full leading-tight">
          {title}
        </h3>
      ) : (
        <p className="text-base md:text-lg lg:text-xl mt-0 leading-relaxed" style={{ wordBreak: "break-word" }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default StoryText;
