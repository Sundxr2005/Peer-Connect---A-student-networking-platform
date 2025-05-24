import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StudentCard from "./StudentCard";
import { Student } from "@/types";
import { mockStudents } from "@/data/mockStudents";

interface PeerDiscoveryProps {
  connections: string[];
  onConnect: (studentId: string) => void;
  onMessage?: (studentId: string) => void;
}

const PeerDiscovery = ({ connections, onConnect, onMessage }: PeerDiscoveryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const departments = useMemo(() => {
    return Array.from(new Set(mockStudents.map(student => student.department)));
  }, []);

  const skills = useMemo(() => {
    const allSkills = mockStudents.flatMap(student => student.skills);
    return Array.from(new Set(allSkills));
  }, []);
  const filteredStudents = useMemo(() => {
    return mockStudents
      .map(student => ({
        ...student,
        connected: connections.includes(student.id),
        connectionRequested: false 
      }))
      .filter(student => {
        const matchesSearch = !searchTerm || 
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
          student.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesDepartment = !selectedDepartment || student.department === selectedDepartment;
        const matchesSkill = !selectedSkill || student.skills.includes(selectedSkill);
        
        return matchesSearch && matchesDepartment && matchesSkill;
      });
  }, [searchTerm, selectedDepartment, selectedSkill, connections]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("");
    setSelectedSkill("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Discover Students
        </h2>
        <p className="text-gray-600">Connect with peers who share your interests and skills</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🔍</span>
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by name, skills, or interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Skills</option>
                {skills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
          
          {(searchTerm || selectedDepartment || selectedSkill) && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && <Badge variant="secondary">"{searchTerm}"</Badge>}
                {selectedDepartment && <Badge variant="secondary">{selectedDepartment}</Badge>}
                {selectedSkill && <Badge variant="secondary">{selectedSkill}</Badge>}
              </div>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
          </h3>
        </div>
        
        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No students found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onConnect={onConnect}
                onMessage={onMessage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerDiscovery;
