
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pen, Camera, User, GraduationCap, MapPin, Star } from "lucide-react";
import { UserProfile } from "@/types";

interface ProfileViewProps {
  profile: UserProfile | null;
  onEditProfile: () => void;
}

const ProfileView = ({ profile, onEditProfile }: ProfileViewProps) => {
  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-2">No profile created yet</h3>
            <p className="text-gray-600 mb-6">
              Create your profile to start connecting with peers!
            </p>
            <Button 
              onClick={onEditProfile}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Create Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 text-lg">Your academic and professional identity</p>
      </div>


      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-blue-50/80 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10"></div>
        
        <CardHeader className="relative z-10 pb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">

            <div className="relative group">
              <div className="relative">
                <Avatar className="w-32 h-32 ring-4 ring-white shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <AvatarImage src={profile.profilePicture} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-white text-3xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                      <GraduationCap className="w-5 h-5" />
                      <span className="font-semibold">{profile.department}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{profile.year} • ID: {profile.collegeId}</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={onEditProfile}
                  className="mt-4 lg:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Pen className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              {profile.bio && (
                <div className="p-4 bg-white/60 rounded-lg border-l-4 border-indigo-400 shadow-sm">
                  <p className="text-gray-700 leading-relaxed italic">{profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {profile.skills.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-blue-600">
                    <Star className="w-5 h-5" />
                    <span>Skills & Expertise</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {profile.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 text-sm hover:scale-105 transition-transform duration-200 shadow-md"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {profile.interests.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-purple-600">
                    <span>🎯</span>
                    <span>Interests</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {profile.interests.map((interest, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-purple-200 text-purple-600 hover:bg-purple-50 px-3 py-1 text-sm hover:scale-105 transition-all duration-200 shadow-sm"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}


            {profile.projectAreas.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 lg:col-span-2">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <span>🚀</span>
                    <span>Project Areas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {profile.projectAreas.map((area, index) => (
                      <Badge 
                        key={index} 
                        className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-1 text-sm hover:scale-105 transition-transform duration-200 shadow-md"
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;
