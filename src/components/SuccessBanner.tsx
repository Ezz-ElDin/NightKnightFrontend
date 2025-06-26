
import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface SuccessBannerProps {
  onClose: () => void;
}

const SuccessBanner: React.FC<SuccessBannerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Allow fade-out animation to complete
  };

  if (!isVisible) return null;

  return (
    <Card className={`mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 rounded-full p-2">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-1">
              🎉 Payment Successful!
            </h3>
            <p className="text-green-700 text-lg">
              Your story credits have been added to your account. Start creating magical stories now!
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full p-2 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default SuccessBanner;
