
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const StoryViewer = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate('/dashboard');
  };

  // Convert the edit URL to a presentation URL for proper embedding
  // Format: https://www.canva.com/design/[DESIGN_ID]/view
  const designId = "DAGmGqTiMVo";
  const canvaEmbedUrl = `https://www.canva.com/design/${designId}/view?embed`;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={goBack}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-primary">Story Viewer</h1>
      </div>
      
      <div className="story-embed-container w-full aspect-video rounded-lg overflow-hidden border shadow-lg">
        <iframe 
          src={canvaEmbedUrl}
          title="Canva Story Presentation"
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="fullscreen"
        ></iframe>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          This story is presented via Canva. Use the navigation controls within the presentation to move between pages.
        </p>
      </div>
    </div>
  );
};

export default StoryViewer;
