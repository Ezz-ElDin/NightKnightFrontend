
import React from "react";
import clsx from "clsx";

interface EndPageProps {
  rtl?: boolean;
}

const EndPage: React.FC<EndPageProps> = ({ rtl }) => {
  return (
    <div
      className={clsx(
        "flex-1 flex flex-col min-h-[340px] px-8 md:px-10 py-8 md:py-10 gap-0 justify-center items-center",
        rtl ? "rtl text-right" : "ltr text-left"
      )}
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="text-center">
        <img 
          src="/the-end-story-page.png" 
          alt="The End" 
          className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-6 animate-fade-in"
        />
        <h2 className="font-ghibli text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-in">
          The End
        </h2>
      </div>
    </div>
  );
};

export default EndPage;
