
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ComingSoonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ComingSoonDialog: React.FC<ComingSoonDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-w-sm mx-auto rounded-2xl">
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-story-green to-story-blue rounded-full flex items-center justify-center mb-3 animate-bounce">
            <Download className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            🎉 Export Feature Coming Soon!
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            We're working hard to bring you the export feature for Arabic stories. 
            Stay tuned for this exciting update!
          </p>
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-gradient-to-r from-story-green to-story-blue hover:from-story-green/90 hover:to-story-blue/90 text-white px-4 py-2 text-sm"
          >
            Got it! ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonDialog;
