
import React from "react";
import { Button } from "@/components/ui/button";
import { Baby, Users, User, UserCheck } from "lucide-react";

const AGE_OPTIONS = [
  { value: "young", label: "Young", icon: Baby },
  { value: "child", label: "Child", icon: UserCheck },
  { value: "adult", label: "Adult", icon: User },
  { value: "elder", label: "Elder", icon: Users },
];

interface AppearanceAgeStepProps {
  selectedAge: string;
  onAgeChange: (age: string) => void;
  onAutoAdvance: () => void;
}

const AppearanceAgeStep: React.FC<AppearanceAgeStepProps> = ({ 
  selectedAge, 
  onAgeChange,
  onAutoAdvance
}) => {
  const handleAgeSelect = (age: string) => {
    onAgeChange(age);
    setTimeout(() => {
      onAutoAdvance();
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          How old is your character?
        </h2>
        <p className="text-muted-foreground">
          Choose an age range for your character
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {AGE_OPTIONS.map(age => {
          const IconComponent = age.icon;
          return (
            <Button
              key={age.value}
              variant={selectedAge === age.value ? "default" : "outline"}
              onClick={() => handleAgeSelect(age.value)}
              className={`h-24 p-6 flex flex-col items-center justify-center space-y-2 text-lg font-medium transition-all duration-200 ${
                selectedAge === age.value 
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105" 
                  : "hover:scale-105 hover:shadow-md border-2 border-gray-200 hover:border-purple-300"
              }`}
            >
              <IconComponent className="h-8 w-8" />
              <span>{age.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AppearanceAgeStep;
