
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Wand2, BookOpen } from "lucide-react";

const GeneratingStory = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Your magic story is coming to life! ✨",
    "The story fairies are working hard to create your adventure...",
    "Sprinkling some magic dust on your characters...",
    "Painting beautiful illustrations just for you...",
    "Adding the perfect words to your tale...",
    "Almost ready! Putting the finishing touches...",
  ];

  // Rotate messages every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Poll story status every 5 seconds
  const { data: statusData, isError } = useQuery({
    queryKey: ['story-status', storyId],
    queryFn: async () => {
      const response = await api.get(`/api/stories/status/${storyId}`);
      return response.data;
    },
    enabled: !!storyId,
    refetchInterval: 5000, // Poll every 5 seconds
    refetchIntervalInBackground: true,
  });

  // Handle status changes
  useEffect(() => {
    if (statusData?.status === 'completed') {
      navigate(`/library/stories/${storyId}`);
    } else if (statusData?.status === 'failed') {
      toast({
        title: "Story generation failed 😬",
        description: "Something went wrong while creating your story. Please try again.",
        variant: "destructive",
      });
      navigate("/create-story");
    }
  }, [statusData, navigate, storyId, toast]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error checking story status",
        description: "Unable to check story generation progress. Please try again.",
        variant: "destructive",
      });
      navigate("/create-story");
    }
  }, [isError, navigate, toast]);

  if (!storyId) {
    navigate("/create-story");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated Icons */}
        <div className="relative">
          <div className="flex justify-center space-x-4 mb-8">
            <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '200ms' }}>
              <Wand2 className="w-10 h-10 text-pink-500" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '400ms' }}>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          {/* Central spinning loader */}
          <div className="flex justify-center mb-6">
            <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
          </div>
        </div>

        {/* Animated Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-purple-800 animate-pulse">
            Creating Your Story
          </h1>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200">
            <p className="text-lg text-purple-700 font-medium transition-all duration-500 ease-in-out">
              {messages[currentMessage]}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-4">
          <div className="bg-white/50 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full animate-pulse w-3/4"></div>
          </div>
          <p className="text-sm text-purple-600">
            Status: {statusData?.status || 'Starting...'}
          </p>
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
