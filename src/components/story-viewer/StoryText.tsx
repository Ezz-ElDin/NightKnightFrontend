
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
        "flex-1 flex flex-col min-h-[340px] px-8 md:px-10 py-8 md:py-10 gap-0",
        rtl ? "rtl text-right" : "ltr text-left",
        page === 0
          ? "justify-center items-center"
          : "justify-start items-start"
      )}
      dir={rtl ? "rtl" : "ltr"}
    >
      {page === 0 ? (
        <h3 className="font-ghibli text-[2.6rem] md:text-5xl font-bold mb-0 w-full text-center leading-tight">
          {title}
        </h3>
      ) : (
        <p className="text-lg md:text-xl mt-0" style={{ wordBreak: "break-word" }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default StoryText;
