
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
      <div className="w-full h-full flex justify-center items-center">
        <img
          src="/the-end-story-page.png"
          alt="The End"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default EndPage;
