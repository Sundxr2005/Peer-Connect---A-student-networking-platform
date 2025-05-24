
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  connectionCount: number;
  messageCount?: number;
}

const Navigation = ({ activeTab, setActiveTab, connectionCount, messageCount = 3 }: NavigationProps) => {
  const tabs = [
    { id: "profile", label: "My Profile", icon: "👤" },
    { id: "discover", label: "Browse Students", icon: "🔍" },
    { id: "connections", label: `Connections (${connectionCount})`, icon: "🤝" },
    { id: "messages", label: "Messages", icon: <MessageCircle className="w-5 h-5" />, count: messageCount }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-xl shadow-2xl border-b border-white/30 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          <div className="flex items-center space-x-4 group cursor-pointer">
            {/* Logo */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-center">
                  <span className="text-white text-lg font-black tracking-tight">P</span>
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5 animate-pulse"></div>
                  <span className="text-white text-lg font-black tracking-tight">C</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                Peer Connect
              </h1>
              <p className="text-xs text-gray-500 font-medium -mt-1">Student Network Hub</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {tabs.map((tab, index) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-2 transition-all duration-500 transform hover:scale-105 ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-2xl hover:shadow-purple-200/50 border-0" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/80 hover:shadow-lg"
                } ${index === 0 ? 'animate-fade-in' : index === 1 ? 'animate-fade-in delay-100' : index === 2 ? 'animate-fade-in delay-200' : 'animate-fade-in delay-300'}`}
              >
                {typeof tab.icon === 'string' ? (
                  <span className="text-lg">{tab.icon}</span>
                ) : (
                  <div className="relative">
                    {tab.icon}
                    {tab.count && tab.count > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-bounce">
                        {tab.count}
                      </Badge>
                    )}
                  </div>
                )}
                <span className="hidden sm:inline font-semibold tracking-wide">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
