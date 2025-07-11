
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import clsx from 'clsx';
import { useDiscoverStoryViewer } from '@/hooks/useDiscoverStoryViewer';

interface DesktopDiscoverStoryViewerProps {
  story: any;
  onClose: () => void;
}

const DesktopDiscoverStoryViewer: React.FC<DesktopDiscoverStoryViewerProps> = ({
  story,
  onClose
}) => {
  const {
    page,
    setPage,
    numPages,
    currentPage,
    isEndPage,
    isTitlePage
  } = useDiscoverStoryViewer(story);

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

  const handlePrevPage = () => setPage(Math.max(0, page - 1));
  const handleNextPage = () => setPage(Math.min(numPages - 1, page + 1));

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-1 py-4 bg-white">
      <div
        className={clsx(
          `
          relative
          w-full
          max-w-5xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-2xl
          p-0
          overflow-hidden
          flex
          flex-col
          border
          border-solid
          border-gray-200
          min-h-[70vh]
          duration-200
          transition-all
          animate-fade-in
          `
        )}
        style={{
          boxShadow: "0 10px 40px 2px rgba(80,60,120,0.13)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-10 w-10 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        {/* Book Content */}
        {isEndPage ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-full h-64 flex items-center justify-center bg-[#e8eafd] overflow-hidden rounded-lg mb-8">
                <img
                  src="/images/the-end-story-page.png"
                  alt="The End"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-4xl font-bold text-story-purple mb-4">The End</h2>
              <p className="text-lg text-gray-600">Thank you for reading!</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row w-full md:divide-x divide-y md:divide-y-0 divide-gray-200 flex-1">
            {/* Left Side - Story Page Title/Text - 45% */}
            <div className="md:w-[45%] flex-none">
              <div className="flex-1 flex flex-col min-h-[340px] px-8 md:px-10 py-8 md:py-10 gap-0 justify-center items-start">
                {isTitlePage ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <h3 className="font-ghibli text-[2.6rem] md:text-5xl font-bold mb-0 w-full text-center leading-tight">
                      {story.title}
                    </h3>
                  </div>
                ) : (
                  <div className="w-full space-y-6">
                    {formatTextWithLineBreaks(currentPage?.text || "").map((sentence, index) => (
                      <p 
                        key={index} 
                        className="text-lg md:text-xl leading-relaxed font-medium text-gray-800"
                        style={{ wordBreak: "break-word" }}
                      >
                        {sentence}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Side - Visual - 55% */}
            <div className="md:w-[55%] flex-none">
              <div className="w-full h-full bg-[#fafafd] flex items-center justify-center p-0 m-0">
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    background: "#e8eafd",
                    borderRadius: "0",
                    overflow: "hidden",
                    boxShadow: "0 4px 32px 3px rgba(100,100,115,0.10)",
                  }}
                >
                  <img
                    src={isTitlePage ? story.coverUrl : (currentPage?.image || story.coverUrl)}
                    alt={isTitlePage ? story.title : `Page ${page} illustration`}
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
        )}

        {/* Footer - Navigation Controls */}
        <div className="flex w-full items-center justify-center px-6 py-5 bg-white border-t border-gray-100 relative min-h-[72px]">
          {/* Navigation Controls */}
          <div className="flex flex-row items-center gap-5">
            <Button
              onClick={handlePrevPage}
              variant="outline"
              aria-label="Previous Page"
              className="px-4"
              disabled={page === 0}
              size="icon"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <span className="text-muted-foreground font-semibold text-lg select-none">
              {page + 1} / {numPages}
            </span>
            <Button
              onClick={handleNextPage}
              variant="outline"
              aria-label="Next Page"
              className="px-4"
              disabled={page >= numPages - 1}
              size="icon"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDiscoverStoryViewer;
