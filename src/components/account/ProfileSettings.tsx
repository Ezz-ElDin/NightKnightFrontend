import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/lib/api";

const ProfileSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  // Fetch user data from API
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await authApi.getUser();
      return response.data;
    },
  });

  // Password change mutation
  const { mutate: changePassword, isPending: isChangingPassword } = useMutation({
    mutationFn: (data: { new_password1: string; new_password2: string }) => 
      authApi.changePassword(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password changed successfully.",
      });

      // Clear the form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to change password. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Construct full name from first_name and last_name
  const userName = userData ? `${userData.first_name} ${userData.last_name}`.trim() : "";
  const userEmail = userData?.email || "";

  // Password validation functions
  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push("Password must contain at least one special character (@$!%*?&)");
    }
    return errors;
  };

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

    // Validate new password
    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      toast({
        title: "Password Requirements Not Met",
        description: passwordErrors.join(". "),
        variant: "destructive",
      });
      return;
    }

    // Check if new password is different from current password
    if (currentPassword === newPassword) {
      toast({
        title: "Error",
        description: "New password must be different from current password.",
        variant: "destructive",
      });
      return;
    }

    // Call the API to change password
    changePassword({
      new_password1: newPassword,
      new_password2: confirmPassword,
    });
  };

  const getPasswordStrength = (password: string) => {
    const errors = validatePassword(password);
    if (password.length === 0) return { strength: 0, label: "" };
    if (errors.length === 0) return { strength: 100, label: "Strong" };
    if (errors.length <= 2) return { strength: 70, label: "Good" };
    if (errors.length <= 3) return { strength: 40, label: "Fair" };
    return { strength: 20, label: "Weak" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <User className="h-6 w-6" />
          Profile Settings
        </h2>
        <Card className="p-6">
          <div className="text-center py-8">
            <p>Loading user information...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <User className="h-6 w-6" />
          Profile Settings
        </h2>
        <Card className="p-6">
          <div className="text-center py-8 text-red-600">
            <p>Error loading user information. Please try again.</p>
          </div>
        </Card>
      </div>
    );
  }

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
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="new-password" className="font-medium">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {/* Password strength indicator */}
            {newPassword && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.strength >= 70 ? 'bg-green-500' :
                        passwordStrength.strength >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{passwordStrength.label}</span>
                </div>
                
                {/* Password requirements */}
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Password must contain:</p>
                  <ul className="space-y-1">
                    <li className={newPassword.length >= 8 ? "text-green-600" : ""}>
                      • At least 8 characters
                    </li>
                    <li className={/(?=.*[a-z])/.test(newPassword) ? "text-green-600" : ""}>
                      • One lowercase letter
                    </li>
                    <li className={/(?=.*[A-Z])/.test(newPassword) ? "text-green-600" : ""}>
                      • One uppercase letter
                    </li>
                    <li className={/(?=.*\d)/.test(newPassword) ? "text-green-600" : ""}>
                      • One number
                    </li>
                    <li className={/(?=.*[@$!%*?&])/.test(newPassword) ? "text-green-600" : ""}>
                      • One special character (@$!%*?&)
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="confirm-password" className="font-medium">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
            )}
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
