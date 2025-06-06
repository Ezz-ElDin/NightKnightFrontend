
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { toast } = useToast();

  // Get user email from localStorage
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userName = localStorage.getItem("userName") || "User";

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      // In a real app, this would call an API to change the password
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Password changed successfully.",
      });

      // Clear the form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <User className="h-6 w-6" />
        Profile Settings
      </h2>

      {/* User Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Account Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="font-medium">Name</Label>
            <Input
              id="name"
              value={userName}
              disabled
              className="bg-muted"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Your display name
            </p>
          </div>

          <div>
            <Label htmlFor="email" className="font-medium">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={userEmail}
              disabled
              className="bg-muted"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Your email address cannot be changed
            </p>
          </div>
        </div>
      </Card>

      {/* Password Change */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="current-password" className="font-medium">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
            />
          </div>

          <div>
            <Label htmlFor="new-password" className="font-medium">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </div>

          <div>
            <Label htmlFor="confirm-password" className="font-medium">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>

          <Button 
            onClick={handlePasswordChange}
            disabled={isChangingPassword}
            className="w-full md:w-auto"
          >
            {isChangingPassword ? "Changing Password..." : "Change Password"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSettings;
