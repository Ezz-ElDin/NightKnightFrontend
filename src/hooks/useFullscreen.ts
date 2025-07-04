
import { useState, useEffect, useRef } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen with immersive options
        if (containerRef.current) {
          if (containerRef.current.requestFullscreen) {
            await containerRef.current.requestFullscreen({ navigationUI: "hide" });
          } else if ((containerRef.current as any).webkitRequestFullscreen) {
            await (containerRef.current as any).webkitRequestFullscreen();
          } else if ((containerRef.current as any).msRequestFullscreen) {
            await (containerRef.current as any).msRequestFullscreen();
          }
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.warn('Fullscreen operation failed:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      // Add/remove immersive fullscreen styles
      if (isCurrentlyFullscreen && containerRef.current) {
        containerRef.current.style.width = '100vw';
        containerRef.current.style.height = '100vh';
        containerRef.current.style.position = 'fixed';
        containerRef.current.style.top = '0';
        containerRef.current.style.left = '0';
        containerRef.current.style.zIndex = '9999';
        containerRef.current.style.background = '#f9fafb';
        // Hide cursor after inactivity
        let cursorTimeout: NodeJS.Timeout;
        const hideCursor = () => {
          if (containerRef.current) {
            containerRef.current.style.cursor = 'none';
          }
        };
        const showCursor = () => {
          if (containerRef.current) {
            containerRef.current.style.cursor = 'default';
          }
          clearTimeout(cursorTimeout);
          cursorTimeout = setTimeout(hideCursor, 3000);
        };
        
        containerRef.current.addEventListener('mousemove', showCursor);
        containerRef.current.addEventListener('mousedown', showCursor);
        cursorTimeout = setTimeout(hideCursor, 3000);
        
        // Store cleanup function
        (containerRef.current as any)._fullscreenCleanup = () => {
          containerRef.current?.removeEventListener('mousemove', showCursor);
          containerRef.current?.removeEventListener('mousedown', showCursor);
          clearTimeout(cursorTimeout);
        };
      } else if (containerRef.current) {
        // Clean up fullscreen styles
        if ((containerRef.current as any)._fullscreenCleanup) {
          (containerRef.current as any)._fullscreenCleanup();
          delete (containerRef.current as any)._fullscreenCleanup;
        }
        containerRef.current.style.width = '';
        containerRef.current.style.height = '';
        containerRef.current.style.position = '';
        containerRef.current.style.top = '';
        containerRef.current.style.left = '';
        containerRef.current.style.zIndex = '';
        containerRef.current.style.background = '';
        containerRef.current.style.cursor = '';
      }
    };

    // Add listeners for different browsers
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return {
    isFullscreen,
    containerRef,
    handleToggleFullscreen
  };
};
