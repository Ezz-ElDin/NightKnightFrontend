
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Book, Globe, MessageCircle, Sword } from "lucide-react";
import StoryBackground from "@/components/StoryBackground";
import WaitingListStorySamples from "@/components/waiting-list/WaitingListStorySamples";
import ValueProposition from "@/components/waiting-list/ValueProposition";
import WaitingListNavbar from "@/components/waiting-list/WaitingListNavbar";
import HowItWorks from "@/components/HowItWorks";
import { api } from "@/lib/api";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const WaitingList = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | 'already-confirmed' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const { toast } = useToast();
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
  
  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Send POST request to the API
      const response = await api.post('/api/waiting-list/signup/', {
        name,
        email
      });

      // Handle successful response
      setFormSubmitted(true);
      setSubmissionStatus({
        type: 'success',
        message: 'Thanks for joining! Please check your email to confirm your subscription.'
      });
      setName("");
      setEmail("");
      
      // Scroll to the message
      setTimeout(scrollToMessage, 100);
      
    } catch (error: any) {
      // Check if the error is because user is already confirmed
      if (error.response && error.response.status === 409) {
        setSubmissionStatus({
          type: 'already-confirmed',
          message: 'You are already confirmed!'
        });
      } else {
        setSubmissionStatus({
          type: 'error',
          message: 'Something went wrong, please try again.'
        });
        
        toast({
          title: "Submission error",
          description: "Something went wrong, please try again later.",
          variant: "destructive"
        });
      }
      
      // Scroll to the message
      setTimeout(scrollToMessage, 100);
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
              <div className="absolute -top-2 -right-8">
                <Sword className="h-16 w-16 text-story-orange rotate-45 animate-leaf-sway" />
              </div>
              <div className="absolute -top-4 -right-4 bg-story-yellow p-2 rounded-full animate-bounce-slow">
                <p className="text-sm font-bold text-story-orange">Coming Soon</p>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-story-purple">
            NightKnight
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-story-blue">Magical Stories for Children</h2>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Our storytelling platform is launching soon! Join our waiting list to be the first to know.
          </p>
          
          <div ref={emailSectionRef} className="max-w-md mx-auto my-12 scroll-mt-32">
            {formSubmitted ? (
              <div ref={messageRef} className="animate-fade-in">
                <Alert 
                  className={`mb-6 ${submissionStatus.type === 'success' ? 'bg-green-50 border-green-200' : 
                    submissionStatus.type === 'already-confirmed' ? 'bg-blue-50 border-blue-200' : 
                    'bg-red-50 border-red-200'}`}
                >
                  <AlertTitle className={`text-xl ${submissionStatus.type === 'success' ? 'text-green-600' : 
                    submissionStatus.type === 'already-confirmed' ? 'text-blue-600' : 
                    'text-red-600'}`}>
                    {submissionStatus.type === 'success' ? 'Success!' : 
                     submissionStatus.type === 'already-confirmed' ? 'Already Confirmed' : 
                     'Error'}
                  </AlertTitle>
                  <AlertDescription className="text-base">
                    {submissionStatus.message}
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Enter your name" 
                  className="input-kiddy h-12" 
                  required 
                />
                <Input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="Enter your email" 
                  className="input-kiddy h-12" 
                  required 
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="h-12 px-6 rounded-xl bg-story-purple hover:bg-story-purple/90 text-white button-bounce"
                >
                  {isSubmitting ? "Joining..." : "Join Waiting List"}
                </Button>
              </form>
            )}
            
            {/* Status message reference point */}
            <div ref={messageRef} className="scroll-mt-32"></div>
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
              <h3 className="text-xl font-bold mb-2">When will NightKnight launch?</h3>
              <p>We're working hard to launch in the next 30 days. Join our waiting list to be notified!</p>
            </div>
            <div className="card-kiddy">
              <h3 className="text-xl font-bold mb-2">How much will it cost?</h3>
              <p>We'll offer both free and premium plans. Early subscribers may receive special pricing.</p>
            </div>
            <div className="card-kiddy">
              <h3 className="text-xl font-bold mb-2">What ages is it suitable for?</h3>
              <p>NightKnight is designed for children aged 3-10, but can be enjoyed by the whole family!</p>
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
