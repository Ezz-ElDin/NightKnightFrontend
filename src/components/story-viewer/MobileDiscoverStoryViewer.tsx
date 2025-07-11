
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
    <div className="fixed inset-0 z-50 bg-white">
      {/* Close Button - Fixed at top */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="rounded-full opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-10 w-10 flex items-center justify-center"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>

      {/* Continuous Scroll Content */}
      <div className="overflow-y-auto pb-8">
        <div className="max-w-2xl mx-auto px-6">
          {/* Cover Page - Page 1 */}
          <div className="py-8">
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium text-gray-500 bg-gray-100 rounded-full mb-4">
                Page 1
              </span>
            </div>
            
            {/* Title */}
            <div className="mb-8">
              <h1 className={clsx(
                "text-3xl md:text-4xl font-bold text-center leading-tight text-gray-900",
                isArabic && "font-cairo"
              )} dir={isArabic ? "rtl" : "ltr"}>
                {story.coverText || story.title}
              </h1>
            </div>
            
            {/* Cover Image */}
            <div className="mb-8">
              <div className="relative w-full aspect-[4/3] bg-[#e8eafd] rounded-xl overflow-hidden shadow-lg">
                <img
                  src={story.coverUrl}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Story Pages */}
          {story.pages?.map((page: any, index: number) => (
            <div key={page.id || index}>
              {/* Page Separator */}
              <div className="flex justify-center py-6">
                <Separator className="w-32 bg-gray-200" />
              </div>
              
              <div className="py-8">
                {/* Page Number */}
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-gray-500 bg-gray-100 rounded-full">
                    Page {index + 2}
                  </span>
                </div>
                
                {/* Text First */}
                <div className={clsx(
                  "mb-8",
                  isArabic && "text-right"
                )} dir={isArabic ? "rtl" : "ltr"}>
                  <div className="space-y-6">
                    {formatTextWithLineBreaks(page.text).map((sentence, sentenceIndex) => (
                      <p 
                        key={sentenceIndex} 
                        className={clsx(
                          "text-lg leading-relaxed font-medium text-gray-800",
                          isArabic ? "text-right font-cairo" : "text-left"
                        )}
                        style={{ wordBreak: "break-word" }}
                      >
                        {sentence}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* Image Below Text */}
                <div className="mb-8">
                  <div className="relative w-full aspect-[4/3] bg-[#e8eafd] rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={page.image || page.image_url}
                      alt={`Page ${index + 2} illustration`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* End marker */}
          <div className="flex justify-center py-8">
            <Separator className="w-32 bg-gray-200" />
          </div>
          <div className="text-center py-8">
            <span className="text-2xl font-bold text-gray-600">The End</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDiscoverStoryViewer;
