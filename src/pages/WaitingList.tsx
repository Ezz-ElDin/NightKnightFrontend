
import React, { useRef } from "react";
import StoryBackground from "@/components/StoryBackground";
import WaitingListStorySamples from "@/components/waiting-list/WaitingListStorySamples";
import ValueProposition from "@/components/waiting-list/ValueProposition";
import WaitingListNavbar from "@/components/waiting-list/WaitingListNavbar";
import HowItWorks from "@/components/HowItWorks";
import WaitingListForm from "@/components/waiting-list/WaitingListForm";
import WaitingListFAQ from "@/components/waiting-list/WaitingListFAQ";
import WaitingListHero from "@/components/waiting-list/WaitingListHero";

const WaitingList = () => {
  const emailSectionRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  
  const scrollToEmailSection = () => {
    emailSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  const scrollToMessage = () => {
    messageRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="overflow-auto">
      <WaitingListNavbar onJoinClick={scrollToEmailSection} />
      
      <StoryBackground>
        <WaitingListHero emailSectionRef={emailSectionRef} />
        <WaitingListForm onSubmissionMessage={scrollToMessage} />
      </StoryBackground>
      
      <ValueProposition />
      
      <HowItWorks />
      
      <WaitingListStorySamples />
      
      <WaitingListFAQ />
    </div>
  );
};

export default WaitingList;
