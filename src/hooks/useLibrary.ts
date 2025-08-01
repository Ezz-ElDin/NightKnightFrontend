import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { storiesApi, creditApi, Story } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const STORIES_PER_PAGE = 6;

export const useLibrary = () => {
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; storyId: null | number }>({ open: false, storyId: null });
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showGeneratingBanner, setShowGeneratingBanner] = useState(false);
  const [generatingStoryId, setGeneratingStoryId] = useState<string | null>(null);
  const recentStoriesRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Check for generating story on mount
  useEffect(() => {
    const storedGeneratingId = localStorage.getItem('generatingStoryId');
    if (storedGeneratingId) {
      setGeneratingStoryId(storedGeneratingId);
      setShowGeneratingBanner(true);
    }
  }, []);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      console.log('Payment successful with session_id:', sessionId);
      setShowSuccessBanner(true);
      
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('session_id');
      setSearchParams(newSearchParams, { replace: true });
      
      queryClient.invalidateQueries({ queryKey: ['credits'] });
      
      // Dispatch event to update credits in navbar
      window.dispatchEvent(new Event('credits-purchased'));
    }
  }, [searchParams, setSearchParams, queryClient]);

  const { data: creditData } = useQuery({
    queryKey: ['credits'],
    queryFn: creditApi.get,
    refetchOnWindowFocus: false,
  });

  const {
    data: allStories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stories'],
    queryFn: storiesApi.list,
    refetchOnWindowFocus: false,
  });

  // Filter stories to only show completed ones
  const stories = allStories.filter((story: Story) => {
    console.log('Story:', story.title, 'Status:', story.status);
    // Only show stories that have status === 'completed'
    return story.status === 'completed';
  });

  console.log('Total stories from API:', allStories.length);
  console.log('Filtered completed stories:', stories.length);

  const favMutation = useMutation({
    mutationFn: async (input: { id: number; isFav: boolean }) => {
      if (input.isFav) {
        await storiesApi.unfavourite(input.id);
      } else {
        await storiesApi.favourite(input.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await storiesApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      setDeleteDialog({ open: false, storyId: null });
    },
  });

  // Poll for story status if we have a generating story
  const { data: generatingStoryStatus } = useQuery({
    queryKey: ['story-status', generatingStoryId],
    queryFn: async () => {
      if (!generatingStoryId) return null;
      return await storiesApi.getStatus(generatingStoryId);
    },
    enabled: !!generatingStoryId,
    refetchInterval: 10000, // Poll every 10 seconds
  });

  // Handle story generation completion or failure
  useEffect(() => {
    if (generatingStoryStatus?.status === 'completed') {
      // Remove from localStorage and state
      localStorage.removeItem('generatingStoryId');
      setGeneratingStoryId(null);
      setShowGeneratingBanner(false);
      
      // Refresh stories list
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      
      // Dispatch event to update credits in navbar
      window.dispatchEvent(new Event('credits-updated'));
      
      // Show success toast
      toast({
        title: "Story Generated Successfully!",
        description: "Your new story is ready to read.",
      });
    } else if (generatingStoryStatus?.status === 'failed') {
      // Remove from localStorage and state
      localStorage.removeItem('generatingStoryId');
      setGeneratingStoryId(null);
      setShowGeneratingBanner(false);
      
      // Show error toast with failure reason if available
      const errorMessage = generatingStoryStatus.failure_reason || "Sorry, we couldn't generate your story. Please try again.";
      toast({
        title: "Story Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [generatingStoryStatus, queryClient, toast]);

  const storyCredits = creditData?.data?.remaining_credit || 0;
  const hasCredits = storyCredits > 0;

  const allFavouriteStories = stories.filter((s) => s.is_favourite);
  const allNonFavouriteStories = stories.filter((s) => !s.is_favourite);
  const totalPages = Math.ceil(allNonFavouriteStories.length / STORIES_PER_PAGE);
  const pagedStories = allNonFavouriteStories.slice(
    (page - 1) * STORIES_PER_PAGE,
    page * STORIES_PER_PAGE
  );

  const goToPage = (p: number) => {
    setPage(p);
    if (recentStoriesRef.current) {
      recentStoriesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFavourite = (id: number, isFav: boolean) => {
    favMutation.mutate({ id, isFav });
  };

  const handleDeleteStory = (storyId: number) => {
    deleteMutation.mutate(storyId);
  };

  const handleStoryClick = (storyId: number) => {
    navigate(`/library/stories/${storyId}`);
  };

  const handleCloseBanner = () => {
    setShowSuccessBanner(false);
  };

  const handleDismissGeneratingBanner = () => {
    setShowGeneratingBanner(false);
    localStorage.removeItem('generatingStoryId');
    setGeneratingStoryId(null);
  };

  return {
    // State
    deleteDialog,
    setDeleteDialog,
    showSuccessBanner,
    showGeneratingBanner,
    generatingStoryId,
    generatingStoryStatus,
    page,
    
    // Data
    storyCredits,
    hasCredits,
    allFavouriteStories,
    pagedStories,
    totalPages,
    isLoading,
    isError,
    
    // Handlers
    toggleFavourite,
    handleDeleteStory,
    handleStoryClick,
    handleCloseBanner,
    handleDismissGeneratingBanner,
    goToPage,
  };
};
