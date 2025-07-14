
import React, { useEffect } from "react";
import { Lightbulb, Sparkles } from "lucide-react";

interface DisclaimerStepProps {
  onAutoAdvance: () => void;
}

const DisclaimerStep: React.FC<DisclaimerStepProps> = ({ onAutoAdvance }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAutoAdvance();
    }, 4000); // Auto-advance after 4 seconds

    return () => clearTimeout(timer);
  }, [onAutoAdvance]);

  return (
    <div className="text-center space-y-6 py-8">
      <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
        <Lightbulb className="h-10 w-10 text-yellow-600" />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Create Your Magical Character!
        </h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <h3 className="font-semibold text-purple-800 mb-2">
                💡 Pro Tip for Better Stories!
              </h3>
              <p className="text-purple-700 leading-relaxed">
                The more details you provide about your character's appearance and personality, 
                the better our AI will keep the visuals consistent throughout your story. 
                Don't worry though - you can always skip steps if you're in a hurry!
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground">
          Let's bring your character to life step by step...
        </p>
      </div>
    </div>
  );
};

export default DisclaimerStep;
