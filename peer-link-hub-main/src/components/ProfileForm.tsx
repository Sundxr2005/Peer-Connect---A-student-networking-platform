import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from "@/types";

interface ProfileFormProps {
  profile: UserProfile | null;
  onProfileSave: (profile: UserProfile) => void;
  onBack?: () => void;
}

const ProfileForm = ({ profile, onProfileSave, onBack }: ProfileFormProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePicture, setProfilePicture] = useState(profile?.profilePicture || "");
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    collegeId: profile?.collegeId || "",
    year: profile?.year || "",
    department: profile?.department || "",
    bio: profile?.bio || "",
    skills: profile?.skills?.join(", ") || "",
    interests: profile?.interests?.join(", ") || "",
    projectAreas: profile?.projectAreas?.join(", ") || "",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Picture Selected! 📸",
        description: "Your profile picture has been updated. Don't forget to save!",
      });
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.collegeId || !formData.year || !formData.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newProfile: UserProfile = {
      id: profile?.id || "current-user",
      isCurrentUser: true,
      name: formData.name,
      collegeId: formData.collegeId,
      year: formData.year,
      department: formData.department,
      bio: formData.bio,
      profilePicture: profilePicture,
      skills: formData.skills.split(",").map(s => s.trim()).filter(s => s),
      interests: formData.interests.split(",").map(s => s.trim()).filter(s => s),
      projectAreas: formData.projectAreas.split(",").map(s => s.trim()).filter(s => s),
    };

    onProfileSave(newProfile);
    
    toast({
      title: "Profile Saved! ✨",
      description: "Your profile has been successfully updated.",
    });

    if (onBack) {
      onBack();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {profile ? "Edit Your Profile" : "Create Your Profile"}
        </h2>
        <p className="text-gray-600 text-lg">
          {profile ? "Update your information to connect with peers" : "Tell other students about yourself"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Profile Picture</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="w-32 h-32 ring-4 ring-white shadow-xl transition-all duration-300 group-hover:scale-105">
                  <AvatarImage src={profilePicture} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-white text-2xl font-bold">
                    {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : '👤'}
                  </AvatarFallback>
                </Avatar>
                {profilePicture && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full shadow-lg"
                    onClick={handleRemovePicture}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="w-full space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Picture
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  JPG, PNG, GIF up to 10MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📝</span>
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="collegeId">College ID *</Label>
                <Input
                  id="collegeId"
                  value={formData.collegeId}
                  onChange={(e) => handleInputChange("collegeId", e.target.value)}
                  placeholder="e.g., CS2024001"
                />
              </div>
              
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  placeholder="e.g., 3rd Year"
                />
              </div>
              
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  placeholder="e.g., Computer Science"
                />
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🎯</span>
                <span>Skills & Interests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  placeholder="React, Python, Design (comma-separated)"
                />
                <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
              </div>
              
              <div>
                <Label htmlFor="interests">Interests</Label>
                <Input
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => handleInputChange("interests", e.target.value)}
                  placeholder="AI, Web Development, Gaming"
                />
                <p className="text-sm text-gray-500 mt-1">Separate interests with commas</p>
              </div>
              
              <div>
                <Label htmlFor="projectAreas">Project Areas</Label>
                <Input
                  id="projectAreas"
                  value={formData.projectAreas}
                  onChange={(e) => handleInputChange("projectAreas", e.target.value)}
                  placeholder="Full Stack Development, Data Science"
                />
                <p className="text-sm text-gray-500 mt-1">Areas you'd like to work on</p>
              </div>

              <div className="flex space-x-4">
                {onBack && (
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {profile ? "Update Profile" : "Create Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {profile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>👀</span>
              <span>Profile Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <p className="text-gray-600">{profile.department} • {profile.year}</p>
                <p className="text-sm text-gray-500">ID: {profile.collegeId}</p>
              </div>
              
              {profile.bio && (
                <p className="text-gray-700">{profile.bio}</p>
              )}
              
              {profile.skills.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.interests.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <Badge key={index} variant="outline">{interest}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileForm;
