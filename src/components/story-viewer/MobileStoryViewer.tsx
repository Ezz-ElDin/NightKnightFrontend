
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storiesApi, StoryDetails } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import clsx from "clsx";

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

const MobileStoryViewer = () => {
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId?: string }>();

  // Fetch story data via react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => storiesApi.get(storyId!),
    enabled: !!storyId
  });

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

  const goBack = () => navigate("/library");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl font-bold text-primary mb-2">Loading Story...</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Hold tight, preparing your adventure.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl font-bold text-primary mb-2">Story Not Found</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Sorry, we couldn't find that story.
            </p>
            <Button onClick={goBack} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const story: StoryDetails = data;
  
  // Check if the story language is Arabic for RTL support
  const isStoryArabic = isArabic(story.title);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden">
      {/* Close Button - Fixed at top */}
      <div className="absolute top-0 right-0 z-50 p-4">
        <button
          onClick={goBack}
          className="rounded-full opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-10 w-10 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-sm"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
      </div>

      {/* Scrollable Content Container */}
      <div className="h-full overflow-y-auto overscroll-contain">
        <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
          {/* Cover Page - Page 1 */}
          <div className="py-2">
            {/* Title */}
            <div className="mb-4">
              <h1 className={clsx(
                "text-3xl md:text-4xl font-bold text-center leading-tight text-gray-900",
                isStoryArabic && "font-cairo"
              )} dir={isStoryArabic ? "rtl" : "ltr"}>
                {story.title}
              </h1>
            </div>
            
            {/* Cover Image */}
            <div className="mb-4">
              <div className="relative w-full aspect-[4/3] bg-[#e8eafd] rounded-xl overflow-hidden shadow-lg">
                <img
                  src={story.cover_url}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Subtle Page Number */}
            <div className="flex justify-center py-1">
              <span className="text-sm text-gray-400">1</span>
            </div>
          </div>

          {/* Story Pages */}
          {story.pages?.map((page: any, index: number) => {
            return (
              <div key={page.id || index}>
                {/* Page Separator */}
                <div className="flex justify-center py-2">
                  <Separator className="w-32 bg-gray-200" />
                </div>
                
                <div className="py-2">
                  {/* Text First */}
                  <div className={clsx(
                    "mb-4",
                    isStoryArabic && "text-right"
                  )} dir={isStoryArabic ? "rtl" : "ltr"}>
                    <div className="space-y-3">
                      {formatTextWithLineBreaks(page.text).map((sentence, sentenceIndex) => (
                        <p 
                          key={sentenceIndex} 
                          className={clsx(
                            "text-lg leading-relaxed font-medium text-gray-800",
                            isStoryArabic ? "text-right font-cairo" : "text-left"
                          )}
                          style={{ wordBreak: "break-word" }}
                        >
                          {sentence}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Image Below Text */}
                  <div className="mb-4">
                    <div className="relative w-full aspect-[4/3] bg-[#e8eafd] rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={page.image_url}
                        alt={`Page ${index + 2} illustration`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Subtle Page Number */}
                  <div className="flex justify-center py-1">
                    <span className="text-sm text-gray-400">{index + 2}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* The End Page */}
          <div>
            {/* Page Separator */}
            <div className="flex justify-center py-2">
              <Separator className="w-32 bg-gray-200" />
            </div>
            
            <div className="py-2">
              {/* End Image */}
              <div className="mb-4">
                <div className="relative w-full aspect-[4/3] bg-[#e8eafd] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/images/the-end-story-page.png"
                    alt="The End"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Subtle Page Number */}
              <div className="flex justify-center py-1">
                <span className="text-sm text-gray-400">{(story.pages?.length || 0) + 2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileStoryViewer;
