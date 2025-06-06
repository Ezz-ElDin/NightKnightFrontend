
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";
import StoryBackground from "@/components/StoryBackground";
import { Link } from "react-router-dom";
import ProfileSettings from "@/components/account/ProfileSettings";

const AccountSettings = () => {
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
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-1 w-full md:w-[200px] mb-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <ProfileSettings />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </StoryBackground>
  );
};

export default AccountSettings;
