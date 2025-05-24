
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, UserPlus } from "lucide-react";

interface StudentCardProps {
  student: Student;
  onConnect: (studentId: string) => void;
  onMessage?: (studentId: string) => void;
}

const StudentCard = ({ student, onConnect, onMessage }: StudentCardProps) => {
  const { toast } = useToast();

  const handleConnect = () => {
    onConnect(student.id);
    toast({
      title: "Connection Request Sent! 🎉",
      description: `Your request has been sent to ${student.name}`,
    });
  };

  const handleMessage = () => {
    if (onMessage) {
      onMessage(student.id);
    } else {
      toast({
        title: "Opening Messages... 💬",
        description: `Starting conversation with ${student.name}`,
      });
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-indigo-200/50 overflow-hidden relative transform hover:scale-[1.02]">

      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
      <div className="absolute inset-[2px] bg-white/95 backdrop-blur-sm rounded-lg"></div>

      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
      <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:animate-bounce"></div>
      
      <div className="relative z-10">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            {student.profilePicture ? (
              <div className="relative">
                <img
                  src={student.profilePicture}
                  alt={student.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:ring-blue-200"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
            ) : (
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg ring-4 ring-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:ring-blue-200">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{student.name}</h3>
              <p className="text-sm text-gray-600 font-semibold">{student.department}</p>
              <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">{student.year}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-5">
          {student.bio && (
            <div className="p-3 bg-gray-50/80 rounded-lg border-l-4 border-indigo-300">
              <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed italic">{student.bio}</p>
            </div>
          )}
          
          {student.skills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {student.skills.slice(0, 3).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200 hover:scale-105 border border-blue-200 shadow-sm"
                  >
                    {skill}
                  </Badge>
                ))}
                {student.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200">
                    +{student.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {student.interests.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {student.interests.slice(0, 2).map((interest, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50 transition-all duration-200 hover:scale-105 shadow-sm"
                  >
                    {interest}
                  </Badge>
                ))}
                {student.interests.length > 2 && (
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50 transition-all duration-200">
                    +{student.interests.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <div className="pt-4 space-y-3">
            {student.connected ? (
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100 shadow-lg" 
                  disabled
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  ✅ Connected
                </Button>
                <Button 
                  onClick={handleMessage}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  💬 Message
                </Button>
              </div>
            ) : student.connectionRequested ? (
              <Button 
                variant="outline" 
                className="w-full bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 shadow-lg" 
                disabled
              >
                ⏳ Request Sent
              </Button>
            ) : (
              <Button 
                onClick={handleConnect}
                className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 font-semibold"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                🤝 Connect
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default StudentCard;
