
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useGeneratingStoryGuard = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingStoryId, setGeneratingStoryId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkGeneratingStatus = () => {
      const storedGeneratingId = localStorage.getItem('generatingStoryId');
      setGeneratingStoryId(storedGeneratingId);
      setIsGenerating(!!storedGeneratingId);
    };

    checkGeneratingStatus();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkGeneratingStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('story-generated', handleStorageChange);
    window.addEventListener('credits-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('story-generated', handleStorageChange);
      window.removeEventListener('credits-updated', handleStorageChange);
    };
  }, []);

  const redirectToLibraryIfGenerating = () => {
    if (isGenerating) {
      toast({
        title: "Story Generation in Progress",
        description: "Please wait for your current story to finish generating before creating a new one.",
        variant: "destructive",
      });
      navigate('/library');
      return true;
    }
    return false;
  };

  return {
    isGenerating,
    generatingStoryId,
    redirectToLibraryIfGenerating,
  };
};
