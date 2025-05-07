
import React, { useRef } from "react";
import StoryBackground from "@/components/StoryBackground";
import WaitingListStorySamples from "@/components/waiting-list/WaitingListStorySamples";
import ValueProposition from "@/components/waiting-list/ValueProposition";
import WaitingListNavbar from "@/components/waiting-list/WaitingListNavbar";
import HowItWorks from "@/components/HowItWorks";
import WaitingListForm from "@/components/waiting-list/WaitingListForm";
import WaitingListHero from "@/components/waiting-list/WaitingListHero";

// Arabic story sample text to replace German text
const arabicSampleTexts = {
  title: "مغامرة القائد ليو في الفضاء",
  description: "القائد ليو وصاحبه الروبوت اللطيف بيب كانوا مستعدين لأعظم مغامرة في حياتهم! ركبوا سفينتهم الفضائية الجديدة، ومستنيين اللحظة اللي هيطيروا فيها وسط النجوم ويكتشفوا عوالم ما حدش شافها قبل كده...",
  genre: "خيال علمي",
  language: "عربي"
};

const WaitingList = () => {
  const emailSectionRef = useRef<HTMLDivElement>(null);
  
  const scrollToEmailSection = () => {
    emailSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="overflow-auto">
      <WaitingListNavbar onJoinClick={scrollToEmailSection} />
      
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
