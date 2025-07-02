
import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface StoryGenerationBannerProps {
  status: 'success' | 'failed';
  storyId: string;
  onClose: () => void;
}

const StoryGenerationBanner: React.FC<StoryGenerationBannerProps> = ({ 
  status, 
  storyId, 
  onClose 
}) => {
  const isSuccess = status === 'success';

  return (
    <Card className={`mb-6 p-4 border-2 ${
      isSuccess 
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
        : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-2 ${
            isSuccess ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isSuccess ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-600" />
            )}
          </div>
          <div>
            <h3 className={`text-lg font-bold ${
              isSuccess ? 'text-green-800' : 'text-red-800'
            }`}>
              {isSuccess ? '🎉 Story Created Successfully!' : '😬 Story Generation Failed'}
            </h3>
            <p className={`text-sm ${
              isSuccess ? 'text-green-700' : 'text-red-700'
            }`}>
              {isSuccess 
                ? 'Your magical story is ready to read!' 
                : 'Something went wrong while creating your story. Please try again.'
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isSuccess && (
            <Link to={`/library/stories/${storyId}`}>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Read Story
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={`rounded-full p-2 h-8 w-8 ${
              isSuccess 
                ? 'text-green-600 hover:text-green-800 hover:bg-green-100' 
                : 'text-red-600 hover:text-red-800 hover:bg-red-100'
            }`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StoryGenerationBanner;
