
import React from "react";
import { Info } from "lucide-react";

const CharacterDisclaimer: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
      <div className="flex items-start space-x-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-blue-900 font-semibold mb-2">💡 Tip for Better Results</h4>
          <p className="text-blue-800 text-sm leading-relaxed">
            The more details you provide about your character, the better our AI will keep the visuals consistent throughout your story. Take your time to describe how your character looks and acts!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisclaimer;
