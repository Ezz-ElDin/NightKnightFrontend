
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";

interface EnhancedStoryVisualProps {
  coverUrl: string;
  title: string;
  onImageLoad?: () => void;
  onImageError?: () => void;
  showSkeleton?: boolean;
}

const EnhancedStoryVisual: React.FC<EnhancedStoryVisualProps> = ({ 
  coverUrl, 
  title, 
  onImageLoad,
  onImageError,
  showSkeleton = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!coverUrl) return;
    
    setIsLoaded(false);
    setHasError(false);
    
    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      onImageLoad?.();
    };
    
    img.onerror = () => {
      setHasError(true);
      onImageError?.();
    };
    
    img.src = coverUrl;
  }, [coverUrl, onImageLoad, onImageError]);

  return (
    <div className="w-full h-full bg-[#fafafd] flex items-center justify-center p-0 m-0">
      <div
        className={clsx(
          "relative w-full h-full flex items-center justify-center"
        )}
        style={{
          background: "#e8eafd",
          borderRadius: "0",
          overflow: "hidden",
          boxShadow: "0 4px 32px 3px rgba(100,100,115,0.10)",
        }}
      >
        {/* Loading Skeleton */}
        {(!isLoaded && !hasError && showSkeleton) && (
          <Skeleton className="w-full h-full" />
        )}
        
        {/* Error Fallback */}
        {hasError && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        )}
        
        {/* Actual Image */}
        <img
          src={coverUrl}
          alt={"Illustration for " + title}
          className={clsx(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            objectFit: "cover",
            borderRadius: "0",
          }}
        />
      </div>
    </div>
  );
};

export default EnhancedStoryVisual;
