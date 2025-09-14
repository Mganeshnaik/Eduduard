import { StudentData } from '../types/student';

export interface RiskFactors {
  attendance: number;
  grades: number;
  attempts: number;
  fees: number;
  engagement: number;
}

export const calculateRiskScore = (student: StudentData): number => {
  const weights = {
    attendance: 0.3,
    grades: 0.25,
    attempts: 0.2,
    fees: 0.15,
    engagement: 0.1,
  };

  // Calculate individual risk factors (0-1 scale, higher = more risk)
  const factors: RiskFactors = {
    attendance: Math.max(0, (80 - student.attendance) / 80), // Risk increases as attendance drops below 80%
    grades: Math.max(0, (70 - student.averageGrade) / 70), // Risk increases as grades drop below 70%
    attempts: calculateAttemptRisk(student.subjectAttempts), // Risk based on multiple attempts
    fees: student.feesPaid ? 0 : 0.8, // High risk if fees not paid
    engagement: calculateEngagementRisk(student.lastActive), // Risk based on last activity
  };

  // Calculate weighted risk score
  const riskScore = Object.keys(weights).reduce((total, key) => {
    return total + weights[key as keyof typeof weights] * factors[key as keyof RiskFactors];
  }, 0);

  return Math.min(1, Math.max(0, riskScore)); // Ensure score is between 0 and 1
};

export const calculateRiskLevel = (riskScore: number): 'low' | 'moderate' | 'high' => {
  if (riskScore >= 0.7) return 'high';
  if (riskScore >= 0.4) return 'moderate';
  return 'low';
};

const calculateAttemptRisk = (subjectAttempts: { [subject: string]: number }): number => {
  const attemptValues = Object.values(subjectAttempts);
  if (attemptValues.length === 0) return 0;

  const maxAttempts = Math.max(...attemptValues);
  const avgAttempts = attemptValues.reduce((sum, val) => sum + val, 0) / attemptValues.length;

  // Risk increases with max attempts and average attempts
  const maxAttemptRisk = Math.min(1, (maxAttempts - 1) / 2); // Max risk at 3+ attempts
  const avgAttemptRisk = Math.min(1, (avgAttempts - 1) / 1.5); // Risk increases with average

  return (maxAttemptRisk + avgAttemptRisk) / 2;
};

const calculateEngagementRisk = (lastActive: string): number => {
  const lastActiveDate = new Date(lastActive);
  const daysSinceActive = (Date.now() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceActive <= 1) return 0;
  if (daysSinceActive <= 3) return 0.2;
  if (daysSinceActive <= 7) return 0.5;
  return 0.8; // High risk if inactive for more than a week
};

export const generatePredictiveInsights = (student: StudentData): string[] => {
  const insights: string[] = [];
  const riskScore = calculateRiskScore(student);

  if (student.attendance < 60) {
    insights.push('Low attendance pattern suggests high dropout risk');
  }

  if (student.averageGrade < 50) {
    insights.push('Consistent poor performance indicates need for academic intervention');
  }

  const maxAttempts = Math.max(...Object.values(student.subjectAttempts));
  if (maxAttempts >= 3) {
    insights.push('Multiple subject attempts suggest learning difficulties or inadequate support');
  }

  if (!student.feesPaid) {
    insights.push('Unpaid fees may lead to enrollment suspension');
  }

  const daysSinceActive = (Date.now() - new Date(student.lastActive).getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceActive > 7) {
    insights.push('Prolonged inactivity indicates potential disengagement');
  }

  if (riskScore > 0.7 && insights.length === 0) {
    insights.push('Multiple risk factors detected - comprehensive intervention recommended');
  }

  return insights;
};