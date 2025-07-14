
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Sparkles } from "lucide-react";

interface CharacterPreviewProps {
  name: string;
  role: string;
  personality: string[];
  appearanceDescription: string;
}

const CharacterPreview: React.FC<CharacterPreviewProps> = ({
  name,
  role,
  personality,
  appearanceDescription
}) => {
  const hasAnyData = name || role || personality.length > 0 || appearanceDescription;

  if (!hasAnyData) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
            <User className="h-8 w-8 text-purple-500" />
          </div>
          <CardTitle className="text-lg text-purple-700">Character Preview</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>Start creating your character to see a preview here!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
          <Sparkles className="h-8 w-8 text-purple-500" />
        </div>
        <CardTitle className="text-xl text-purple-700">
          {name || "Unnamed Character"}
        </CardTitle>
        {role && (
          <p className="text-purple-600 font-medium">{role}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {appearanceDescription && (
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Appearance</h4>
            <p className="text-sm text-gray-600">{appearanceDescription}</p>
          </div>
        )}
        
        {personality.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Personality</h4>
            <div className="flex flex-wrap gap-1">
              {personality.map((trait, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CharacterPreview;
