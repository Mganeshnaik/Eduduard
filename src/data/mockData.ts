import { StudentData, Alert, Intervention } from '../types/student';

// Generate mock alerts
const generateAlerts = (studentId: string, riskLevel: string): Alert[] => {
  const alerts: Alert[] = [];
  
  if (riskLevel === 'high') {
    alerts.push({
      id: `${studentId}-alert-1`,
      type: 'attendance',
      message: 'Attendance has dropped below 50% - immediate intervention required',
      severity: 'high',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      acknowledged: false,
    });
    alerts.push({
      id: `${studentId}-alert-2`,
      type: 'grades',
      message: 'Consistent poor performance across multiple subjects',
      severity: 'high',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      acknowledged: false,
    });
  } else if (riskLevel === 'moderate') {
    alerts.push({
      id: `${studentId}-alert-3`,
      type: 'attempts',
      message: 'Multiple attempts recorded for Mathematics - consider additional support',
      severity: 'moderate',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      acknowledged: true,
    });
  }
  
  return alerts;
};

// Generate mock interventions
const generateInterventions = (studentId: string, riskLevel: string): Intervention[] => {
  const interventions: Intervention[] = [];
  
  if (riskLevel === 'high') {
    interventions.push({
      id: `${studentId}-intervention-1`,
      type: 'counseling',
      description: 'Emergency counseling session to address academic and personal challenges',
      assignedTo: 'Dr. Sarah Johnson',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'in_progress',
      notes: 'Student responded well to initial session. Follow-up scheduled.',
    });
    interventions.push({
      id: `${studentId}-intervention-2`,
      type: 'academic_support',
      description: 'Assigned peer tutor for Mathematics and Physics',
      assignedTo: 'Academic Support Center',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
    });
  } else if (riskLevel === 'moderate') {
    interventions.push({
      id: `${studentId}-intervention-3`,
      type: 'mentorship',
      description: 'Weekly check-ins with senior student mentor',
      assignedTo: 'Mike Chen',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'in_progress',
    });
  }
  
  return interventions;
};

export const mockStudents: StudentData[] = [
  {
    id: '1',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@student.edu',
    class: 'CS-A',
    semester: 'Fall 2024',
    attendance: 45,
    averageGrade: 38,
    testScores: [35, 42, 31, 45],
    subjectAttempts: { Mathematics: 3, Physics: 2, 'Computer Science': 1 },
    feesPaid: false,
    lastActive: '2024-01-10',
    riskScore: 0.85,
    riskLevel: 'high',
    alerts: generateAlerts('1', 'high'),
    interventions: generateInterventions('1', 'high'),
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    email: 'marcus.thompson@student.edu',
    class: 'EE-B',
    semester: 'Fall 2024',
    attendance: 65,
    averageGrade: 55,
    testScores: [58, 52, 60, 51],
    subjectAttempts: { Mathematics: 2, Electronics: 1, Physics: 2 },
    feesPaid: true,
    lastActive: '2024-01-14',
    riskScore: 0.62,
    riskLevel: 'moderate',
    alerts: generateAlerts('2', 'moderate'),
    interventions: generateInterventions('2', 'moderate'),
  },
  {
    id: '3',
    name: 'Aisha Patel',
    email: 'aisha.patel@student.edu',
    class: 'ME-A',
    semester: 'Fall 2024',
    attendance: 88,
    averageGrade: 78,
    testScores: [75, 82, 76, 79],
    subjectAttempts: { Mathematics: 1, Thermodynamics: 1, 'Materials Science': 1 },
    feesPaid: true,
    lastActive: '2024-01-15',
    riskScore: 0.25,
    riskLevel: 'low',
    alerts: [],
    interventions: [],
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@student.edu',
    class: 'CS-B',
    semester: 'Fall 2024',
    attendance: 72,
    averageGrade: 62,
    testScores: [65, 59, 68, 57],
    subjectAttempts: { 'Data Structures': 2, Algorithms: 1, 'Database Systems': 1 },
    feesPaid: true,
    lastActive: '2024-01-13',
    riskScore: 0.48,
    riskLevel: 'moderate',
    alerts: generateAlerts('4', 'moderate'),
    interventions: generateInterventions('4', 'moderate'),
  },
  {
    id: '5',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@student.edu',
    class: 'BT-A',
    semester: 'Fall 2024',
    attendance: 92,
    averageGrade: 85,
    testScores: [87, 83, 89, 81],
    subjectAttempts: { Biology: 1, Chemistry: 1, Biochemistry: 1 },
    feesPaid: true,
    lastActive: '2024-01-15',
    riskScore: 0.18,
    riskLevel: 'low',
    alerts: [],
    interventions: [],
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@student.edu',
    class: 'CE-A',
    semester: 'Fall 2024',
    attendance: 58,
    averageGrade: 44,
    testScores: [42, 46, 41, 47],
    subjectAttempts: { 'Structural Engineering': 3, Mathematics: 2, Physics: 2 },
    feesPaid: false,
    lastActive: '2024-01-08',
    riskScore: 0.78,
    riskLevel: 'high',
    alerts: generateAlerts('6', 'high'),
    interventions: generateInterventions('6', 'high'),
  },
  {
    id: '7',
    name: 'Priya Sharma',
    email: 'priya.sharma@student.edu',
    class: 'IT-B',
    semester: 'Fall 2024',
    attendance: 85,
    averageGrade: 74,
    testScores: [72, 76, 71, 77],
    subjectAttempts: { 'Network Security': 1, Programming: 1, 'System Administration': 1 },
    feesPaid: true,
    lastActive: '2024-01-14',
    riskScore: 0.32,
    riskLevel: 'low',
    alerts: [],
    interventions: [],
  },
  {
    id: '8',
    name: 'Alex Chen',
    email: 'alex.chen@student.edu',
    class: 'EE-A',
    semester: 'Fall 2024',
    attendance: 68,
    averageGrade: 58,
    testScores: [56, 61, 55, 60],
    subjectAttempts: { 'Circuit Analysis': 2, Mathematics: 1, 'Signal Processing': 2 },
    feesPaid: true,
    lastActive: '2024-01-12',
    riskScore: 0.55,
    riskLevel: 'moderate',
    alerts: generateAlerts('8', 'moderate'),
    interventions: generateInterventions('8', 'moderate'),
  },
  {
    id: '9',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@student.edu',
    class: 'CH-A',
    semester: 'Fall 2024',
    attendance: 91,
    averageGrade: 81,
    testScores: [83, 79, 84, 78],
    subjectAttempts: { 'Organic Chemistry': 1, 'Physical Chemistry': 1, Mathematics: 1 },
    feesPaid: true,
    lastActive: '2024-01-15',
    riskScore: 0.22,
    riskLevel: 'low',
    alerts: [],
    interventions: [],
  },
];