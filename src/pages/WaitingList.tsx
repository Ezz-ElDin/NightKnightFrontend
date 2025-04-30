
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Book, Globe, MessageCircle } from "lucide-react";
import StoryBackground from "@/components/StoryBackground";
import WaitingListStorySamples from "@/components/waiting-list/WaitingListStorySamples";
import ValueProposition from "@/components/waiting-list/ValueProposition";
import CountdownTimer from "@/components/waiting-list/CountdownTimer";
import WaitingListNavbar from "@/components/waiting-list/WaitingListNavbar";
import HowItWorks from "@/components/HowItWorks";

const WaitingList = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const emailSectionRef = useRef<HTMLDivElement>(null);
  const scrollToEmailSection = () => {
    emailSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Store email in localStorage (in a production app, this would be sent to a server)
    try {
      const waitingList = JSON.parse(localStorage.getItem("waitingList") || "[]");
      waitingList.push({
        email,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("waitingList", JSON.stringify(waitingList));
      toast({
        title: "Thank you for joining!",
        description: "We'll notify you when Storyland is ready."
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
    setIsSubmitting(false);
  };
  return <div className="overflow-auto">
      <WaitingListNavbar onJoinClick={scrollToEmailSection} />
      
      <StoryBackground>
        <div className="container max-w-6xl mx-auto text-center z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Book className="h-28 w-28 text-story-purple animate-wiggle" />
              <div className="absolute -top-4 -right-4 bg-story-yellow p-2 rounded-full animate-bounce-slow">
                <p className="text-sm font-bold text-story-orange">Coming Soon</p>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-story-purple">
            Storyland
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-story-blue">Magical Stories for Children</h2>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Our storytelling platform is launching soon! Join our waiting list to be the first to know.
          </p>

          <CountdownTimer targetDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} />
          
          <div ref={emailSectionRef} className="max-w-md mx-auto my-12 scroll-mt-32">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="input-kiddy" required />
              <Button type="submit" disabled={isSubmitting} className="h-12 px-6 rounded-xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce">
                {isSubmitting ? "Joining..." : "Join Waiting List"}
              </Button>
            </form>
          </div>
        </div>
      </StoryBackground>
      
      <ValueProposition />
      
      <HowItWorks />
      
      <WaitingListStorySamples />
      
      <section className="py-16 px-4 bg-story-peach/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-story-purple">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-kiddy">
              <h3 className="text-xl font-bold mb-2">When will Storyland launch?</h3>
              <p>We're working hard to launch in the next 30 days. Join our waiting list to be notified!</p>
            </div>
            <div className="card-kiddy">
              <h3 className="text-xl font-bold mb-2">How much will it cost?</h3>
              <p>We'll offer both free and premium plans. Early subscribers may receive special pricing.</p>
            </div>
            <div className="card-kiddy">
              <h3 className="text-xl font-bold mb-2">What ages is it suitable for?</h3>
              <p>Storyland is designed for children aged 3-10, but can be enjoyed by the whole family!</p>
            </div>
            <div className="card-kiddy">
              <h3 className="text-xl font-bold mb-2">What languages are supported?</h3>
              <p>At launch, we'll support English, French, Spanish and German, with more languages coming soon.</p>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default WaitingList;
