
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard } from "lucide-react";
import StoryBackground from "@/components/StoryBackground";
import { Link, useSearchParams } from "react-router-dom";
import ProfileSettings from "@/components/account/ProfileSettings";
import BuyCredits from "@/components/account/BuyCredits";

const AccountSettings = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");

  // Check if we should show the credits tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'credits') {
      setActiveTab('credits');
    }
  }, [searchParams]);

  return (
    <StoryBackground>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Account Settings</h1>
          <Link to="/library">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        <Card className="p-6 shadow-lg border-2 border-primary/20 rounded-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full md:w-[400px] mb-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="credits" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Story Credits</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="credits" className="space-y-4">
              <BuyCredits />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </StoryBackground>
  );
};

export default AccountSettings;
