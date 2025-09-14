import React from 'react';
import { AlertTriangle, Calendar, GraduationCap, Mail, Phone } from 'lucide-react';
import { StudentData } from '../types/student';

interface StudentCardProps {
  student: StudentData;
  onClick: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClick }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          badge: 'bg-red-100 text-red-800',
        };
      case 'moderate':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          badge: 'bg-yellow-100 text-yellow-800',
        };
      default:
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          badge: 'bg-green-100 text-green-800',
        };
    }
  };

  const colors = getRiskColor(student.riskLevel);
  const unacknowledgedAlerts = student.alerts.filter(alert => !alert.acknowledged).length;

  return (
    <div
      onClick={onClick}
      className={`${colors.bg} border ${colors.border} rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {student.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-600">{student.class} • {student.semester}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
            {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)} Risk
          </span>
          {unacknowledgedAlerts > 0 && (
            <div className="flex items-center text-red-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">{unacknowledgedAlerts} alerts</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Attendance</span>
          <span className={`text-sm font-medium ${
            student.attendance >= 80 ? 'text-green-600' : 
            student.attendance >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {student.attendance}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Average Grade</span>
          <span className={`text-sm font-medium ${
            student.averageGrade >= 70 ? 'text-green-600' : 
            student.averageGrade >= 50 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {student.averageGrade}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Risk Score</span>
          <span className={`text-sm font-medium ${colors.text}`}>
            {Math.round(student.riskScore * 100)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Fees Status</span>
          <span className={`text-sm font-medium ${
            student.feesPaid ? 'text-green-600' : 'text-red-600'
          }`}>
            {student.feesPaid ? 'Paid' : 'Pending'}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          Last active: {student.lastActive}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;