import React from "react";
import clsx from "clsx";

interface StoryTextProps {
  title: string;
  text: string;
  page: number;
  rtl?: boolean;
}

const StoryText: React.FC<StoryTextProps> = ({ title, text, page, rtl }) => {
  // Function to split text into sentences and format them
  const formatTextWithLineBreaks = (text: string) => {
    if (!text) return "";
    
    // Split by periods, exclamation marks, and question marks while keeping the punctuation
    const sentences = text.split(/([.!?]+)/).filter(part => part.trim() !== "");
    
    // Combine punctuation back with sentences
    const formattedSentences = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const sentence = sentences[i]?.trim();
      const punctuation = sentences[i + 1] || "";
      if (sentence) {
        formattedSentences.push(sentence + punctuation);
      }
    }
    
    return formattedSentences;
  };

  const sentences = formatTextWithLineBreaks(text);

  return (
    <div
      className={clsx(
        "flex-1 flex flex-col min-h-[340px] px-8 md:px-10 py-8 md:py-10 gap-0",
        rtl ? "rtl text-right" : "ltr text-center",
        page === 0
          ? "justify-center items-center"
          : "justify-center items-center"
      )}
      dir={rtl ? "rtl" : "ltr"}
    >
      {page === 0 ? (
        <h3 className="font-ghibli text-[2.6rem] md:text-5xl font-bold mb-0 w-full text-center leading-tight">
          {title}
        </h3>
      ) : (
        <div className="w-full text-center space-y-3">
          {sentences.map((sentence, index) => (
            <p 
              key={index} 
              className="text-2xl md:text-3xl leading-relaxed font-medium text-gray-800"
              style={{ wordBreak: "break-word" }}
            >
              {sentence}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryText;
