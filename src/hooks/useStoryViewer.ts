
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { storiesApi } from '@/lib/api';
import { exportService } from '@/lib/exportService';
import { useToast } from '@/hooks/use-toast';

const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

const getDeviceType = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const userAgent = navigator.userAgent;
  
  // Check if it's a tablet
  const isTablet = /iPad|Android(?!.*Mobile)|Tablet/.test(userAgent) || 
                   (width >= 768 && width < 1024);
  
  // Check if it's mobile
  const isMobile = width < 768 && !isTablet;
  
  // Check orientation
  const isPortrait = height > width;
  const isLandscape = width > height;
  
  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isPortrait,
    isLandscape
  };
};

export const useStoryViewer = () => {
  const navigate = useNavigate();
  const { storyId } = useParams<{ storyId?: string }>();
  const [page, setPage] = useState(0);
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(getDeviceType());
  const { toast } = useToast();

  // Listen for window resize to detect device type and orientation changes
  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(getDeviceType());
    };

    handleResize(); // Check initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch story data via react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => storiesApi.get(storyId!),
    enabled: !!storyId
  });

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
  useEffect(() => {
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

  // Computed values
  const story = data;
  const numPages = story ? story.pages.length + 1 : 0;
  const currentPage = story && page < story.pages.length ? story.pages[page] : null;
  const isEndPage = story && page === story.pages.length;
  const rtl = currentPage && story && (isArabic(story.title) || isArabic(currentPage.text));
  const canExport = true;

  return {
    // State
    page,
    setPage,
    showComingSoonDialog,
    setShowComingSoonDialog,
    isExporting,
    deviceInfo,
    
    // Data
    story,
    isLoading,
    isError,
    numPages,
    currentPage,
    isEndPage,
    rtl,
    canExport,
    
    // Actions
    handleExport,
    goBack
  };
};
