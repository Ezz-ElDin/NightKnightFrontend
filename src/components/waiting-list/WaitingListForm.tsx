import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface WaitingListFormProps {
  onSubmissionMessage?: () => void;
}

const WaitingListForm = ({ onSubmissionMessage }: WaitingListFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | 'already-confirmed' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const { toast } = useToast();
  const messageRef = useRef<HTMLDivElement>(null);
  
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
        message: 'Thanks for joining! We\'re crafting the perfect bedtime experience and can\'t wait to share it with you soon.'
        // message: 'Thanks for joining! Please check your email to confirm your subscription.'
      });
      setName("");
      setEmail("");
      
      // We're removing the auto-scrolling behavior
      // No more scrollToMessage call here
      
      // Still notify parent if needed, but without scrolling
      if (onSubmissionMessage) {
        onSubmissionMessage();
      }
      
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
      
      // We're removing the auto-scrolling behavior
      // No more scrollToMessage call here
      
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="max-w-md mx-auto my-12 scroll-mt-32">
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
      
      {/* Status message reference point - keeping this for future use */}
      <div ref={messageRef} className="scroll-mt-32"></div>
    </div>
  );
};

export default WaitingListForm;
