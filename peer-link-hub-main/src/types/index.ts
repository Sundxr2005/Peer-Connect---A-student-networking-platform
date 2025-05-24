
export interface Student {
  id: string;
  name: string;
  collegeId: string;
  year: string;
  department: string;
  profilePicture?: string;
  skills: string[];
  interests: string[];
  projectAreas: string[];
  bio?: string;
  connected?: boolean;
  connectionRequested?: boolean;
}

export interface UserProfile extends Student {
  isCurrentUser: true;
}

export interface ConnectionRequest {
  studentId: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'declined';
}
