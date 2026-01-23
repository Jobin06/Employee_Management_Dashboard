export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  manager: string;
  hireDate: string;
  profileImage: string;
  performanceScore: number;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface PerformanceReview {
  id: number;
  employeeId: number;
  reviewerId: number;
  reviewerName: string;
  reviewDate: string;
  period: string;
  overallRating: number;
  technicalSkills: number;
  communication: number;
  teamwork: number;
  leadership: number;
  productivity: number;
  comments: string;
  goals: string[];
  status: 'Pending' | 'Completed' | 'In Progress';
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'Admin' | 'HR' | 'Manager';
  name: string;
}

export interface PerformanceMetrics {
  averageScore: number;
  totalEmployees: number;
  topPerformers: number;
  needsImprovement: number;
  departmentScores: { department: string; score: number }[];
  monthlyTrends: { month: string; score: number }[];
}
