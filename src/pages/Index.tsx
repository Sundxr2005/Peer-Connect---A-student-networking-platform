import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ProfileForm from "@/components/ProfileForm";
import ProfileView from "@/components/ProfileView";
import PeerDiscovery from "@/components/PeerDiscovery";
import Connections from "@/components/Connections";
import Messages from "@/components/Messages";
import { UserProfile } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [connections, setConnections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedStudentForMessage, setSelectedStudentForMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const savedProfile = localStorage.getItem("peerconnect-profile");
      const savedConnections = localStorage.getItem("peerconnect-connections");
      
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
      
      if (savedConnections) {
        setConnections(JSON.parse(savedConnections));
      }
      
      setIsLoading(false);
    };

    loadData();
  }, []);


  const handleProfileSave = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem("peerconnect-profile", JSON.stringify(profile));
  };


  const handleConnect = (studentId: string) => {
    const newConnections = [...connections, studentId];
    setConnections(newConnections);
    localStorage.setItem("peerconnect-connections", JSON.stringify(newConnections));
  };


  const handleNavigateToMessages = (studentId?: string) => {
    if (studentId) {
      setSelectedStudentForMessage(studentId);
    }
    handleTabChange("messages");
  };


  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleBackFromEdit = () => {
    setIsEditingProfile(false);
  };


  const handleTabChange = async (tab: string) => {
    if (tab === activeTab) return;
    
    setIsTransitioning(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setActiveTab(tab);
    setIsEditingProfile(false); 
    

    if (tab !== "messages") {
      setSelectedStudentForMessage(null);
    }
    
    await new Promise(resolve => setTimeout(resolve, 150));
    setIsTransitioning(false);
  };

  // Set initial tab based on whether user has a profile
  useEffect(() => {
    if (userProfile && activeTab === "profile") {
      return;
    } else if (!userProfile) {
      setActiveTab("profile");
      setIsEditingProfile(true); // Start in edit mode if no profile
    }
  }, [userProfile]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200/30 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="animate-pulse relative z-10">
          <div className="h-18 bg-white/80 backdrop-blur-sm border-b border-white/30 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-200 to-purple-200" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32 bg-gradient-to-r from-blue-200 to-indigo-200" />
                  <Skeleton className="h-3 w-24 bg-gray-200" />
                </div>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-md bg-white/60" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <Skeleton className="h-12 w-80 mx-auto bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200" />
                <Skeleton className="h-6 w-64 mx-auto bg-gray-200" />
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4 animate-pulse" style={{animationDelay: `${i * 100}ms`}}>
                    <Skeleton className="h-80 w-full rounded-xl bg-white/60 shadow-2xl" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">Loading PeerConnect...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200/20 rounded-full blur-2xl animate-float delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-float delay-700"></div>
      </div>
      
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        connectionCount={connections.length}
      />
      
      <main className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-500 transform ${
          isTransitioning 
            ? "opacity-0 translate-y-8 scale-95 blur-sm" 
            : "opacity-100 translate-y-0 scale-100 blur-0"
        }`}>
          {activeTab === "profile" && (
            <div className="animate-fade-in">
              {isEditingProfile || !userProfile ? (
                <ProfileForm 
                  profile={userProfile}
                  onProfileSave={handleProfileSave}
                  onBack={userProfile ? handleBackFromEdit : undefined}
                />
              ) : (
                <ProfileView 
                  profile={userProfile}
                  onEditProfile={handleEditProfile}
                />
              )}
            </div>
          )}
          
          {activeTab === "discover" && (
            <div className="animate-fade-in delay-100">
              <PeerDiscovery 
                connections={connections}
                onConnect={handleConnect}
                onMessage={handleNavigateToMessages}
              />
            </div>
          )}
          
          {activeTab === "connections" && (
            <div className="animate-fade-in delay-200">
              <Connections 
                connections={connections} 
                onNavigateToMessages={handleNavigateToMessages}
              />
            </div>
          )}
          
          {activeTab === "messages" && (
            <div className="animate-fade-in delay-300">
              <Messages selectedStudentId={selectedStudentForMessage} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
