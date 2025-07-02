import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storiesApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Wand2, BookOpen, Palette, Camera, Home } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const GeneratingStory = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Stage-specific content
  const stageContent = {
    generating_concept: {
      title: "Crafting Your Story Concept",
      messages: [
        "✨ Weaving together the perfect story idea...",
        "🌟 Creating magical characters and settings...",
        "📚 Building the foundation of your adventure...",
        "💫 Designing the heart of your tale..."
      ],
      icon: <Sparkles className="w-10 h-10 text-purple-500" />
    },
    generating_script: {
      title: "Writing Your Story",
      messages: [
        "✍️ Penning beautiful words for your story...",
        "📖 Crafting engaging dialogue and narration...",
        "🎭 Bringing characters to life with words...",
        "📝 Weaving plot threads together..."
      ],
      icon: <BookOpen className="w-10 h-10 text-blue-500" />
    },
    generating_visuals: {
      title: "Designing Visual Elements",
      messages: [
        "🎨 Choosing the perfect art style...",
        "🖼️ Planning beautiful illustrations...",
        "🌈 Selecting colors that bring magic to life...",
        "✨ Designing visual storytelling elements..."
      ],
      icon: <Palette className="w-10 h-10 text-pink-500" />
    },
    generating_images: {
      title: "Creating Magical Illustrations",
      messages: [
        "🖌️ Painting beautiful story illustrations...",
        "🎭 Bringing scenes to vivid life...",
        "🌟 Adding the final touches of magic...",
        "📸 Capturing perfect story moments..."
      ],
      icon: <Camera className="w-10 h-10 text-green-500" />
    }
  };

  // Poll story status every 20 seconds (increased from 10 for better UX)
  const { data: statusData, isError } = useQuery({
    queryKey: ['story-status', storyId],
    queryFn: async () => {
      if (!storyId) throw new Error('No story ID provided');
      return await storiesApi.getStatus(storyId);
    },
    enabled: !!storyId,
    refetchInterval: 20000, // Poll every 20 seconds
    refetchIntervalInBackground: true,
  });

  // Get current stage content
  const currentStage = statusData?.status && stageContent[statusData.status as keyof typeof stageContent] 
    ? stageContent[statusData.status as keyof typeof stageContent]
    : {
        title: "Starting Your Story",
        messages: [
          "🚀 Preparing to create your magical adventure...",
          "⭐ Getting everything ready...",
          "🎪 Setting up the story creation process...",
          "🌙 Beginning your storytelling journey..."
        ],
        icon: <Wand2 className="w-10 h-10 text-purple-500" />
      };

  // Get progress from backend or fallback to 10%
  const progress = statusData?.percent_complete || 10;

  // Rotate messages every 4 seconds within the current stage
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % currentStage.messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentStage.messages.length]);

  // Handle status changes - Modified to store success/failure info in localStorage
  useEffect(() => {
    if (statusData?.status === 'completed') {
      // Store success info in localStorage for banner display
      localStorage.setItem('storyGenerationResult', JSON.stringify({
        status: 'success',
        storyId: storyId,
        timestamp: Date.now()
      }));
      navigate(`/library/stories/${storyId}`);
    } else if (statusData?.status === 'failed') {
      // Increment failed attempts counter
      setFailedAttempts(prev => prev + 1);
      
      // Only show error after 3 failed attempts (60+ seconds)
      if (failedAttempts >= 2) { // 0, 1, 2 = 3 attempts
        // Store failure info in localStorage for banner display
        localStorage.setItem('storyGenerationResult', JSON.stringify({
          status: 'failed',
          storyId: storyId,
          timestamp: Date.now()
        }));
        
        toast({
          title: "Story generation failed 😬",
          description: "Something went wrong while creating your story. Please try again.",
          variant: "destructive",
        });
        navigate("/library");
      }
    } else {
      // Reset failed attempts if we get a non-failed status
      setFailedAttempts(0);
    }
  }, [statusData, navigate, storyId, toast, failedAttempts]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error checking story status",
        description: "Unable to check story generation progress. Please try again.",
        variant: "destructive",
      });
      navigate("/library");
    }
  }, [isError, navigate, toast]);

  const handleGoHome = () => {
    navigate("/library");
  };

  if (!storyId) {
    navigate("/library");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Home Button */}
        <div className="flex justify-start mb-4">
          <Button
            onClick={handleGoHome}
            variant="outline"
            className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border-purple-200 hover:bg-white/90"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>

        {/* Animated Icons */}
        <div className="relative">
          <div className="flex justify-center space-x-4 mb-8">
            <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '200ms' }}>
              {currentStage.icon}
            </div>
            <div className="animate-bounce" style={{ animationDelay: '400ms' }}>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Stage Title and Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-purple-800">
            {currentStage.title}
          </h1>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200">
            <p className="text-lg text-purple-700 font-medium transition-all duration-500 ease-in-out">
              {currentStage.messages[currentMessage]}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-4">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-purple-600">
            {Math.round(progress)}% Complete
          </p>
          {failedAttempts > 0 && (
            <p className="text-xs text-orange-600">
              Retrying... (Attempt {failedAttempts + 1}/3)
            </p>
          )}
        </div>

        {/* Fun decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
        </div>
        <div className="absolute top-20 right-16 opacity-20">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
};

export default GeneratingStory;
