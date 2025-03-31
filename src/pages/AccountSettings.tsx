
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User } from "lucide-react";
import ParentalSettings from "@/components/story-generator/ParentalSettings";
import StoryBackground from "@/components/StoryBackground";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  const [storyData, setStoryData] = useState({
    parentalSettings: {
      contentFilter: true,
      wordsToAvoid: [],
      avoidScaryScenes: true,
      keepCheerful: true,
      ensureInclusive: true,
      overridePriority: false,
    },
  });

  const updateStoryData = (data) => {
    setStoryData((prev) => ({ ...prev, ...data }));
  };

  const handleSaveSettings = () => {
    // In a real app, we would save settings to a backend or local storage
    console.log("Saving settings:", storyData);
    // Show a toast or some feedback
  };

  return (
    <StoryBackground>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Account Settings</h1>
          <Link to="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        <Card className="p-6 shadow-lg border-2 border-primary/20 rounded-2xl">
          <Tabs defaultValue="parental" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full md:w-[400px] mb-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="parental" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Parental Control</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                <p className="mb-8 text-lg">
                  Profile settings will be implemented in a future update.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="parental">
              <ParentalSettings storyData={storyData} updateStoryData={updateStoryData} />
              
              <div className="flex justify-end mt-8">
                <Button onClick={handleSaveSettings} className="button-bounce">
                  Save Settings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </StoryBackground>
  );
};

export default AccountSettings;
