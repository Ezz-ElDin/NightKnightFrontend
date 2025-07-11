
import React from 'react';
import { X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';

interface MobileDiscoverStoryViewerProps {
  story: any;
  onClose: () => void;
}

const MobileDiscoverStoryViewer: React.FC<MobileDiscoverStoryViewerProps> = ({
  story,
  onClose
}) => {
  const formatTextWithLineBreaks = (text: string) => {
    if (!text) return [];
    
    const sentences = text.split(/([.!?]+)/).filter(part => part.trim() !== "");
    
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

  // Check if the story language is Arabic for RTL support
  const isArabic = story.language === 'Arabic';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="w-full h-full max-w-4xl bg-white relative rounded-none md:rounded-3xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-10 w-10 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        {/* Continuous Scroll Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-0">
            {/* Title Page */}
            <div className="min-h-screen flex flex-col">
              <div className="flex-1 bg-[#fafafd] flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center bg-[#e8eafd] overflow-hidden">
                  <img
                    src={story.coverUrl}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="bg-white p-8 flex items-center justify-center">
                <h3 className={clsx(
                  "font-ghibli text-3xl md:text-5xl font-bold text-center leading-tight",
                  isArabic && "font-cairo"
                )} dir={isArabic ? "rtl" : "ltr"}>
                  {story.coverText || story.title}
                </h3>
              </div>
            </div>

            {/* Story Pages with Separators */}
            {story.pages?.map((page: any, index: number) => (
              <div key={page.id || index}>
                {/* Add separator before each story page */}
                <div className="flex justify-center py-8 bg-white">
                  <Separator className="w-24 bg-gray-200" />
                </div>
                
                <div className="min-h-screen flex flex-col">
                  <div className="flex-1 bg-[#fafafd] flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center bg-[#e8eafd] overflow-hidden">
                      <img
                        src={page.image || page.image_url}
                        alt={`Page ${index + 1} illustration`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-8 flex items-center justify-center">
                    <div className={clsx(
                      "w-full max-w-4xl space-y-6",
                      isArabic && "text-right"
                    )} dir={isArabic ? "rtl" : "ltr"}>
                      {formatTextWithLineBreaks(page.text).map((sentence, sentenceIndex) => (
                        <p 
                          key={sentenceIndex} 
                          className={clsx(
                            "text-lg md:text-xl leading-relaxed font-medium text-gray-800",
                            isArabic ? "text-right font-cairo" : "text-left"
                          )}
                          style={{ wordBreak: "break-word" }}
                        >
                          {sentence}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDiscoverStoryViewer;
