
import React from "react";
import { Label } from "@/components/ui/label";

interface CharacterPreviewProps {
  name: string;
  role: string;
  generatedAppearance: string;
  personality: string[];
}

const CharacterPreview: React.FC<CharacterPreviewProps> = ({
  name,
  role,
  generatedAppearance,
  personality,
}) => {
  return (
    <div className="bg-white rounded-xl border-2 border-purple-200 shadow-sm p-6 sticky top-0">
      <Label className="text-lg font-semibold text-purple-700 mb-4 block">
        Character Preview ✨
      </Label>
      
      <div className="space-y-3">
        <div>
          <span className="font-medium text-gray-700">Name:</span>
          <span className="ml-2 text-purple-600">
            {name || "Not set yet"}
          </span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Role:</span>
          <span className="ml-2 text-purple-600">
            {role || "Not set yet"}
          </span>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Appearance:</span>
          <p className="text-purple-600 mt-1 text-sm">
            {generatedAppearance || "Not described yet"}
          </p>
        </div>
        
        <div>
          <span className="font-medium text-gray-700">Personality:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {personality.length > 0 ? (
              personality.map((trait, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                >
                  {trait}
                </span>
              ))
            ) : (
              <span className="text-purple-600 text-sm">No traits selected</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPreview;
