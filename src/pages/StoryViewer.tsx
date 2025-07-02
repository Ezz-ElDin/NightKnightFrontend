import React, { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storiesApi, StoryDetails } from "@/lib/api";
import { exportService } from "@/lib/exportService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import clsx from "clsx";
import StoryVisual from "@/components/story-viewer/StoryVisual";
import StoryText from "@/components/story-viewer/StoryText";
import StoryNavigation from "@/components/story-viewer/StoryNavigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

const StoryViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId?: string }>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [page, setPage] = useState(0);
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Fetch story data via react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => storiesApi.get(storyId!),
    enabled: !!storyId // Don't fetch if param missing
  });

  // Check if export should be enabled based on language
  const canExport = useMemo(() => {
    if (!data?.language) return false;
    return data.language !== 'egyptian_arabic';
  }, [data?.language]);

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

  // Fullscreen management
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };
  React.useEffect(() => {
    const cb = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", cb);
    return () => document.removeEventListener("fullscreenchange", cb);
  }, []);

  // --- Keyboard navigation (arrow keys) ---
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setPage(prev => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        if (data && page < (data.pages.length - 1)) {
          setPage(prev => Math.min(data.pages.length - 1, prev + 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data, page]);

  const goBack = () => navigate("/library");

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-primary mb-2">Loading Story...</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Hold tight, preparing your adventure.
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-primary mb-2">Story Not Found</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Sorry, we couldn't find that story.
        </p>
        <Button onClick={goBack} variant="outline">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const story: StoryDetails = data;
  const numPages = story.pages.length;
  const currentPage = story.pages[page];
  // Use RTL if title or page text is arabic
  const rtl = currentPage && (isArabic(story.title) || isArabic(currentPage.text));

  return (
    <>
      <div 
        className={clsx(
          "w-full min-h-screen flex flex-col items-center justify-center px-1 py-4 bg-white"
        )}
        style={{ minHeight: "100vh" }}
      >
        <div
          ref={containerRef}
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
            duration-200
            transition-all
            animate-fade-in
            `,
            isFullscreen ? "max-w-none w-screen min-h-screen h-screen !rounded-none" : "min-h-[70vh]"
          )}
          style={{
            boxShadow: "0 10px 40px 2px rgba(80,60,120,0.13)",
          }}
        >
          {/* Book Content */}
          <div
            className={clsx(
              `
              flex
              flex-col
              md:flex-row
              w-full
              md:divide-x
              divide-y
              md:divide-y-0
              divide-gray-200
              flex-1
              `
            )}
          >
            {/* Left Side - Story Page Title/Text */}
            <StoryText
              title={story.title}
              text={currentPage?.text || ""}
              page={page}
              rtl={rtl}
            />
            {/* Right Side - Visual */}
            <StoryVisual
              coverUrl={currentPage?.image_url || ""}
              title={story.title}
            />
          </div>
          {/* Footer - Navigation & Fullscreen Controls */}
          <div className="relative">
            <StoryNavigation
              onBack={goBack}
              onPrevPage={() => setPage(Math.max(0, page - 1))}
              onNextPage={() => setPage(Math.min(numPages - 1, page + 1))}
              onToggleFullscreen={handleToggleFullscreen}
              onExport={handleExport}
              isFullscreen={isFullscreen}
              canPrev={page > 0}
              canNext={page < numPages - 1}
              canExport={canExport}
              isExporting={isExporting}
              page={page}
              numPages={numPages}
            />
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

export default StoryViewer;
