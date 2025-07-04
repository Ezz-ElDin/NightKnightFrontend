
import { useState, useEffect } from 'react';

export type LayoutType = 'vertical' | 'horizontal';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveLayoutInfo {
  deviceType: DeviceType;
  layoutType: LayoutType;
  isPortrait: boolean;
  isLandscape: boolean;
  screenWidth: number;
  screenHeight: number;
  aspectRatio: number;
}

const getResponsiveLayoutInfo = (): ResponsiveLayoutInfo => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = width / height;
  const isPortrait = height > width;
  const isLandscape = width > height;

  // Determine device type
  let deviceType: DeviceType = 'desktop';
  if (width < 768) {
    deviceType = 'mobile';
  } else if (width < 1024) {
    deviceType = 'tablet';
  }

  // Determine layout type based on screen dimensions and aspect ratio
  let layoutType: LayoutType = 'vertical';
  
  // Use horizontal layout when:
  // 1. Screen is wide enough (>= 768px) AND
  // 2. Either in landscape mode OR has good aspect ratio for side-by-side content
  if (width >= 768 && (isLandscape || aspectRatio > 1.2)) {
    layoutType = 'horizontal';
  }
  
  // Force vertical layout for very narrow screens or very tall aspect ratios
  if (width < 600 || aspectRatio < 0.6) {
    layoutType = 'vertical';
  }

  return {
    deviceType,
    layoutType,
    isPortrait,
    isLandscape,
    screenWidth: width,
    screenHeight: height,
    aspectRatio
  };
};

export const useResponsiveLayout = () => {
  const [layoutInfo, setLayoutInfo] = useState<ResponsiveLayoutInfo>(getResponsiveLayoutInfo);

  useEffect(() => {
    const handleResize = () => {
      setLayoutInfo(getResponsiveLayoutInfo());
    };

    handleResize(); // Check initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return layoutInfo;
};
