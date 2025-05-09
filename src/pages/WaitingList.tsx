
import React, { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import StoryBackground from "@/components/StoryBackground";
import WaitingListStorySamples from "@/components/waiting-list/WaitingListStorySamples";
import ValueProposition from "@/components/waiting-list/ValueProposition";
import WaitingListNavbar from "@/components/waiting-list/WaitingListNavbar";
import HowItWorks from "@/components/HowItWorks";
import WaitingListForm from "@/components/waiting-list/WaitingListForm";
import WaitingListHero from "@/components/waiting-list/WaitingListHero";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Arabic story sample text to replace German text
const arabicSampleTexts = {
  title: "مغامرة القائد ليو في الفضاء",
  description: "القائد ليو وصاحبه الروبوت اللطيف بيب كانوا مستعدين لأعظم مغامرة في حياتهم! ركبوا سفينتهم الفضائية الجديدة، ومستنيين اللحظة اللي هيطيروا فيها وسط النجوم ويكتشفوا عوالم ما حدش شافها قبل كده...",
  genre: "خيال علمي",
  language: "عربي"
};

const WaitingList = () => {
  const emailSectionRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | null;
    visible: boolean;
    text: string;
  }>({ type: null, visible: false, text: '' });
  
  useEffect(() => {
    const status = searchParams.get('status');
    
    if (status === 'success') {
      setStatusMessage({
        type: 'success',
        visible: true,
        text: "✨ You're now on the NightKnight waiting list!"
      });
    } else if (status === 'invalid') {
      setStatusMessage({
        type: 'error',
        visible: true,
        text: "⚠️ Hmm... that link seems to have lost its way. Try signing up again!"
      });
    }
  }, [searchParams]);

  const dismissMessage = () => {
    setStatusMessage(prev => ({ ...prev, visible: false }));
  };
  
  const scrollToEmailSection = () => {
    emailSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="overflow-auto">
      <WaitingListNavbar onJoinClick={scrollToEmailSection} />
      
      {statusMessage.visible && statusMessage.type && (
        <div className="fixed top-20 left-0 right-0 z-50 flex justify-center animate-fade-in">
          <Alert 
            className={`
              max-w-md mx-auto shadow-lg 
              ${statusMessage.type === 'success' 
                ? 'bg-story-pink/30 border-story-purple text-story-purple' 
                : 'bg-story-yellow/30 border-story-orange text-story-orange'
              } 
              rounded-xl px-6 py-4 backdrop-blur-sm
            `}
          >
            <div className="flex items-center justify-between">
              <AlertDescription className="text-lg font-medium">
                {statusMessage.text}
              </AlertDescription>
              <button 
                onClick={dismissMessage}
                className="ml-4 rounded-full p-1 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </Alert>
        </div>
      )}
      
      <StoryBackground>
        <WaitingListHero emailSectionRef={emailSectionRef} />
        <WaitingListForm />
      </StoryBackground>
      
      <ValueProposition />
      
      <HowItWorks />
      
      <WaitingListStorySamples 
        arabicSampleTexts={arabicSampleTexts} 
        scrollToEmailSection={scrollToEmailSection} 
      />
    </div>
  );
};

export default WaitingList;
