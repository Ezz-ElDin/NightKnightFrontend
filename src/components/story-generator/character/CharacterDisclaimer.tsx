
import React from "react";
import { Info } from "lucide-react";

const CharacterDisclaimer: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
      <div className="flex items-start space-x-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-blue-900 font-semibold mb-2">🌟 Tip for a More Magical Story</h4>
          <p className="text-blue-800 text-sm leading-relaxed">
            The more you share about your character how they look, the better our magic works! Your details help NightKnight keep your little hero consistent across every scene.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisclaimer;
