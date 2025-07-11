
import React from "react";
import clsx from "clsx";

interface EndPageProps {
  rtl?: boolean;
}

const EndPage: React.FC<EndPageProps> = ({ rtl }) => {
  return (
    <div
      className={clsx(
        "flex flex-col md:flex-row w-full md:divide-x divide-y md:divide-y-0 divide-gray-200 flex-1"
      )}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Left Side - Blank */}
      <div className="md:w-[45%] flex-none bg-white">
        {/* Empty left side */}
      </div>
      
      {/* Right Side - Image */}
      <div className="md:w-[55%] flex-none">
        <div className="w-full h-full bg-[#fafafd] flex items-center justify-center p-0 m-0">
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
              src="/images/the-end-story-page.png"
              alt="The End"
              className="w-full h-full object-cover"
              style={{
                objectFit: "cover",
                borderRadius: "0",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndPage;
