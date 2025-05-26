
import React from "react";

interface AppearancePreviewProps {
  text: string;
}

const AppearancePreview: React.FC<AppearancePreviewProps> = ({ text }) => (
  <div className="mt-4 p-5 bg-white rounded-xl border shadow-sm">
    <p className="text-md text-muted-foreground mb-2">Preview:</p>
    <p className="font-medium text-lg">{text}</p>
  </div>
);

export default AppearancePreview;
