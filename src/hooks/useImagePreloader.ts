
import { useState, useEffect, useCallback } from 'react';

interface ImageLoadState {
  [url: string]: 'loading' | 'loaded' | 'error';
}

interface UseImagePreloaderReturn {
  loadStates: ImageLoadState;
  preloadImages: (urls: string[]) => void;
  isImageLoaded: (url: string) => boolean;
  isImageLoading: (url: string) => boolean;
}

export const useImagePreloader = (): UseImagePreloaderReturn => {
  const [loadStates, setLoadStates] = useState<ImageLoadState>({});

  const preloadImage = useCallback((url: string): Promise<void> => {
    if (!url || loadStates[url] === 'loaded') {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      setLoadStates(prev => ({ ...prev, [url]: 'loading' }));
      
      const img = new Image();
      
      img.onload = () => {
        setLoadStates(prev => ({ ...prev, [url]: 'loaded' }));
        resolve();
      };
      
      img.onerror = () => {
        setLoadStates(prev => ({ ...prev, [url]: 'error' }));
        reject(new Error(`Failed to load image: ${url}`));
      };
      
      img.src = url;
    });
  }, [loadStates]);

  const preloadImages = useCallback(async (urls: string[]) => {
    const validUrls = urls.filter(Boolean);
    
    await Promise.allSettled(
      validUrls.map(url => preloadImage(url))
    );
  }, [preloadImage]);

  const isImageLoaded = useCallback((url: string): boolean => {
    return loadStates[url] === 'loaded';
  }, [loadStates]);

  const isImageLoading = useCallback((url: string): boolean => {
    return loadStates[url] === 'loading';
  }, [loadStates]);

  return {
    loadStates,
    preloadImages,
    isImageLoaded,
    isImageLoading
  };
};
