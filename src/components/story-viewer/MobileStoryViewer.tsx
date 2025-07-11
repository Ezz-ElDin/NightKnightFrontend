
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storiesApi, StoryDetails } from "@/lib/api";
import { exportService } from "@/lib/exportService";
import { X, Download, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

const MobileStoryViewer = () => {
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId?: string }>();
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Fetch story data via react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => storiesApi.get(storyId!),
    enabled: !!storyId
  });

  const canExport = false; // Commented out export functionality for mobile view

  // Export functionality
  const handleExport = async () => {
    if (!data) return;
    
    if (data.language === 'egyptian_arabic') {
      setShowComingSoonDialog(true);
      return;
    }
    
    setIsExporting(true);
    try {
      console.log('Exporting story:', data.story_title);
      await exportService.exportStoryToPDF(data);
      toast({
        title: "Success!",
        description: "Story exported successfully!",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const goBack = () => navigate("/library");

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
            <button onClick={goBack} className="px-4 py-2 bg-primary text-white rounded">
              Back to Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  const story: StoryDetails = data;
  const isArabicStory = story.language === 'Arabic' || isArabic(story.title);

  return (
    <>
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
            {/* Story Pages - First page serves as cover */}
            {story.pages?.map((page, index) => (
              <div key={index}>
                {/* Page Separator - Skip for first page */}
                {index > 0 && (
                  <div className="flex justify-center py-2">
                    <Separator className="w-32 bg-gray-200" />
                  </div>
                )}
                
                <div className="py-2">
                  {/* First page gets title treatment */}
                  {index === 0 && (
                    <div className="mb-4">
                      <h1 className={clsx(
                        "text-3xl md:text-4xl font-bold text-center leading-tight text-gray-900",
                        isArabicStory && "font-cairo"
                      )} dir={isArabicStory ? "rtl" : "ltr"}>
                        {story.title}
                      </h1>
                    </div>
                  )}

                  {/* Text - Only for non-first pages */}
                  {index > 0 && (
                    <div className={clsx(
                      "mb-4",
                      isArabicStory && "text-right"
                    )} dir={isArabicStory ? "rtl" : "ltr"}>
                      <div className="space-y-3">
                        {formatTextWithLineBreaks(page.text).map((sentence, sentenceIndex) => (
                          <p 
                            key={sentenceIndex} 
                            className={clsx(
                              "text-lg leading-relaxed font-medium text-gray-800",
                              isArabicStory ? "text-right font-cairo" : "text-left"
                            )}
                            style={{ wordBreak: "break-word" }}
                          >
                            {sentence}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Image for all pages */}
                  <div className="mb-4">
                    <div className="relative w-full aspect-[4/3] bg-[#e8eafd] rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={page.image_url}
                        alt={index === 0 ? story.title : `Page ${index + 1} illustration`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Subtle Page Number */}
                  <div className="flex justify-center py-1">
                    <span className="text-sm text-gray-400">{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}

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
                  <span className="text-sm text-gray-400">{story.pages.length + 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoonDialog} onOpenChange={setShowComingSoonDialog}>
        <DialogContent className="sm:max-w-lg max-w-sm mx-auto rounded-2xl">
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-story-green to-story-blue rounded-full flex items-center justify-center mb-3 animate-bounce">
              <Download className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              🎉 Export Feature Coming Soon!
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              We're working hard to bring you the export feature for Arabic stories. 
              Stay tuned for this exciting update!
            </p>
            <button 
              onClick={() => setShowComingSoonDialog(false)}
              className="bg-gradient-to-r from-story-green to-story-blue hover:from-story-green/90 hover:to-story-blue/90 text-white px-4 py-2 text-sm rounded"
            >
              Got it! ✨
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileStoryViewer;
