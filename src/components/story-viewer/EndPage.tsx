
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
        <h2 className="font-ghibli text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-in">
          The End
        </h2>
        <div className="text-2xl md:text-3xl text-muted-foreground">
          ✨
        </div>
      </div>
    </div>
  );
};

export default EndPage;
