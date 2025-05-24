import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student } from "@/types";
import { mockStudents } from "@/data/mockStudents";

interface ConnectionsProps {
  connections: string[];
  onNavigateToMessages?: (studentId?: string) => void;
}

const Connections = ({ connections, onNavigateToMessages }: ConnectionsProps) => {
  const connectedStudents = mockStudents.filter(student => 
    connections.includes(student.id)
  );

  const getSharedInterests = (student: Student) => {
    const currentUserInterests = ["Web Development", "AI", "Gaming"];
    return student.interests.filter(interest => 
      currentUserInterests.includes(interest)
    );
  };

  const handleMessage = (studentId: string) => {
    if (onNavigateToMessages) {
      onNavigateToMessages(studentId);
    }
  };

  if (connectedStudents.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Connections
          </h2>
          <p className="text-gray-600">Your network of peer connections</p>
        </div>

        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">No connections yet</h3>
            <p className="text-gray-600 mb-4">
              Start connecting with peers to build your network!
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Browse Students
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          My Connections
        </h2>
        <p className="text-gray-600">
          You're connected with {connectedStudents.length} student{connectedStudents.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-blue-600">{connectedStudents.length}</div>
            <div className="text-sm text-gray-600">Total Connections</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(connectedStudents.map(s => s.department)).size}
            </div>
            <div className="text-sm text-gray-600">Departments</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="text-center py-6">
            <div className="text-2xl font-bold text-green-600">
              {connectedStudents.reduce((acc, student) => acc + getSharedInterests(student).length, 0)}
            </div>
            <div className="text-sm text-gray-600">Shared Interests</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectedStudents.map((student) => {
          const sharedInterests = getSharedInterests(student);
          
          return (
            <Card key={student.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  {student.profilePicture ? (
                    <img
                      src={student.profilePicture}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.department}</p>
                    <p className="text-xs text-gray-500">{student.year}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {student.bio && (
                  <p className="text-sm text-gray-700 line-clamp-2">{student.bio}</p>
                )}
                
                {sharedInterests.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2">
                      🎯 Shared Interests
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {sharedInterests.map((interest, index) => (
                        <Badge key={index} variant="default" className="text-xs bg-green-100 text-green-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {student.skills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {student.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {student.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{student.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleMessage(student.id)}
                  >
                    💬 Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
