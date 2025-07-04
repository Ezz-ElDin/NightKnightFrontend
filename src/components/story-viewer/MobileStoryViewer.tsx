
import React, { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storiesApi, StoryDetails } from "@/lib/api";
import { exportService } from "@/lib/exportService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Download, Loader2 } from "lucide-react";
import clsx from "clsx";
import StoryText from "@/components/story-viewer/StoryText";
import StoryVisual from "@/components/story-viewer/StoryVisual";
import EndPage from "@/components/story-viewer/EndPage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

const MobileStoryViewer = () => {
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId?: string }>();
  const [page, setPage] = useState(0);
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Fetch story data via react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => storiesApi.get(storyId!),
    enabled: !!storyId
  });

  const canExport = true;

  // Touch navigation handlers
  const handleLeftTap = () => {
    setPage(prev => Math.max(0, prev - 1));
  };

  const handleRightTap = () => {
    if (data && page < data.pages.length) {
      setPage(prev => Math.min(data.pages.length, prev + 1));
    }
  };

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

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setPage(prev => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        if (data && page < data.pages.length) {
          setPage(prev => Math.min(data.pages.length, prev + 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data, page]);

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
  const numPages = story.pages.length + 1; // Add 1 for the "The End" page
  const currentPage = page < story.pages.length ? story.pages[page] : null;
  const isEndPage = page === story.pages.length;
  const rtl = currentPage && (isArabic(story.title) || isArabic(currentPage.text));

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[calc(100vh-3rem)] relative">
            {/* Touch Navigation Zones */}
            <div 
              className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer"
              onClick={handleLeftTap}
              aria-label="Previous page"
            />
            <div 
              className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-pointer"
              onClick={handleRightTap}
              aria-label="Next page"
            />

            {/* Story Content */}
            <div className="flex-1 flex flex-col">
              {isEndPage ? (
                <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col">
                  {/* Full height image */}
                  <div className="w-full flex-1">
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
                          src="/the-end-story-page.png"
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
              ) : (
                <>
                  {/* Text Section - Top */}
                  <div className="w-full">
                    <StoryText
                      title={story.title}
                      text={currentPage?.text || ""}
                      page={page}
                      rtl={rtl}
                    />
                  </div>
                  
                  {/* Visual Section - Bottom */}
                  <div className="w-full">
                    <StoryVisual
                      coverUrl={currentPage?.image_url || ""}
                      title={story.title}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Mobile Navigation Bar */}
            <div className="flex items-center justify-between px-4 py-4 bg-white border-t border-gray-100 relative z-20">
              {/* Back Button - Left */}
              <Button
                onClick={goBack}
                variant="outline"
                className="flex items-center gap-2"
                aria-label="Back to library"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              {/* Navigation Arrows - Center */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleLeftTap}
                  variant="outline"
                  size="icon"
                  disabled={page === 0}
                  aria-label="Previous Page"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-sm font-medium text-muted-foreground">
                  {page + 1} / {numPages}
                </span>
                
                <Button
                  onClick={handleRightTap}
                  variant="outline"
                  size="icon"
                  disabled={page >= numPages - 1}
                  aria-label="Next Page"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Export Button - Right */}
              {canExport && (
                <Button
                  onClick={handleExport}
                  variant="outline"
                  size="icon"
                  aria-label="Export story"
                  disabled={isExporting}
                  className="bg-story-green hover:bg-story-green/90 border-story-green text-white"
                >
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              )}
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
            <Button 
              onClick={() => setShowComingSoonDialog(false)}
              className="bg-gradient-to-r from-story-green to-story-blue hover:from-story-green/90 hover:to-story-blue/90 text-white px-4 py-2 text-sm"
            >
              Got it! ✨
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileStoryViewer;
