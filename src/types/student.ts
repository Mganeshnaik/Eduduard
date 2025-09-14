export interface StudentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  semester: string;
  rollNumber: string;
  dateOfBirth: string;
  address: string;
  attendance: number;
  averageGrade: number;
  testScores: number[];
  subjectAttempts: { [subject: string]: number };
  feesPaid: boolean;
  feesAmount: number;
  feesDueDate: string;
  lastActive: string;
  riskScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  alerts: Alert[];
  interventions: Intervention[];
  parentDetails: ParentDetails;
}

export interface ParentDetails {
  fatherName: string;
  fatherPhone: string;
  fatherEmail: string;
  fatherOccupation: string;
  motherName: string;
  motherPhone: string;
  motherEmail: string;
  motherOccupation: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  guardianRelation?: string;
  preferredContact: 'father' | 'mother' | 'guardian';
  communicationPreference: 'sms' | 'email' | 'call' | 'whatsapp';
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