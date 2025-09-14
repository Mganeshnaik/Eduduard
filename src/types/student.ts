export interface StudentData {
  id: string;
  name: string;
  email: string;
  class: string;
  semester: string;
  attendance: number;
  averageGrade: number;
  testScores: number[];
  subjectAttempts: { [subject: string]: number };
  feesPaid: boolean;
  lastActive: string;
  riskScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  alerts: Alert[];
  interventions: Intervention[];
}

export interface Alert {
  id: string;
  type: 'attendance' | 'grades' | 'attempts' | 'fees' | 'engagement';
  message: string;
  severity: 'low' | 'moderate' | 'high';
  createdAt: string;
  acknowledged: boolean;
}

export interface Intervention {
  id: string;
  type: 'counseling' | 'academic_support' | 'financial_aid' | 'mentorship';
  description: string;
  assignedTo: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed';
  notes?: string;
}

export interface RiskThresholds {
  attendance: { moderate: number; high: number };
  grades: { moderate: number; high: number };
  attempts: { moderate: number; high: number };
}