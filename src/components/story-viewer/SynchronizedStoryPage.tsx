
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import StoryText from './StoryText';
import EnhancedStoryVisual from './EnhancedStoryVisual';
import EndPage from './EndPage';
import { Skeleton } from '@/components/ui/skeleton';

interface SynchronizedStoryPageProps {
  title: string;
  text: string;
  imageUrl: string;
  page: number;
  rtl: boolean;
  isEndPage: boolean;
  onPageReady?: () => void;
}

const SynchronizedStoryPage: React.FC<SynchronizedStoryPageProps> = ({
  title,
  text,
  imageUrl,
  page,
  rtl,
  isEndPage,
  onPageReady
}) => {
  const [isImageReady, setIsImageReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Handle image load completion
  const handleImageLoad = () => {
    setIsImageReady(true);
  };

  const handleImageError = () => {
    setIsImageReady(true); // Show content even if image fails
  };

  // Show content when image is ready or after a timeout
  useEffect(() => {
    if (isImageReady) {
      const timer = setTimeout(() => {
        setShowContent(true);
        onPageReady?.();
      }, 50); // Small delay for smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [isImageReady, onPageReady]);

  // Reset states when page changes
  useEffect(() => {
    setIsImageReady(false);
    setShowContent(false);
  }, [page, imageUrl]);

  if (isEndPage) {
    return <EndPage rtl={rtl} />;
  }

  return (
    <div className={clsx(
      "flex flex-col md:flex-row w-full md:divide-x divide-y md:divide-y-0 divide-gray-200 flex-1 transition-opacity duration-300",
      showContent ? "opacity-100" : "opacity-0"
    )}>
      {/* Loading State */}
      {!showContent && (
        <div className="absolute inset-0 flex flex-col md:flex-row w-full md:divide-x divide-y md:divide-y-0 divide-gray-200">
          {/* Text Skeleton */}
          <div className="md:w-[45%] flex-none p-8 md:p-10">
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/5" />
            </div>
          </div>
          {/* Image Skeleton */}
          <div className="md:w-[55%] flex-none">
            <Skeleton className="w-full h-full min-h-[340px]" />
          </div>
        </div>
      )}

      {/* Actual Content */}
      <div className="md:w-[45%] flex-none">
        <StoryText
          title={title}
          text={text}
          page={page}
          rtl={rtl}
        />
      </div>
      
      <div className="md:w-[55%] flex-none">
        <EnhancedStoryVisual
          coverUrl={imageUrl}
          title={title}
          onImageLoad={handleImageLoad}
          onImageError={handleImageError}
          showSkeleton={false}
        />
      </div>
    </div>
  );
};

export default SynchronizedStoryPage;
