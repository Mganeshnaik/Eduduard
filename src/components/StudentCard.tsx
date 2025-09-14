import React from 'react';
import { AlertTriangle, Calendar, GraduationCap, Mail, Phone, Users, MapPin, CreditCard } from 'lucide-react';
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
      className={`${colors.bg} border ${colors.border} rounded-xl p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm font-bold text-white">
              {student.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span className="font-medium">{student.rollNumber}</span>
              <span className="mx-2">•</span>
              <span>{student.class}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{student.semester}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.badge} shadow-sm`}>
            {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)} Risk
          </span>
          {unacknowledgedAlerts > 0 && (
            <div className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span className="text-xs font-bold">{unacknowledgedAlerts} अलर्ट</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">संपर्क</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{student.phone}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">उपस्थिति</span>
          <span className={`text-sm font-medium ${
            student.attendance >= 80 ? 'text-green-600' : 
            student.attendance >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {student.attendance}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">औसत अंक</span>
          <span className={`text-sm font-medium ${
            student.averageGrade >= 70 ? 'text-green-600' : 
            student.averageGrade >= 50 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {student.averageGrade}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">जोखिम स्कोर</span>
          <span className={`text-sm font-medium ${colors.text}`}>
            {Math.round(student.riskScore * 100)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600 font-medium">फीस स्थिति</span>
          </div>
          <div className="text-right">
            <span className={`text-sm font-bold ${
              student.feesPaid ? 'text-green-600' : 'text-red-600'
            }`}>
              {student.feesPaid ? 'भुगतान' : 'बकाया'}
            </span>
            <p className="text-xs text-gray-500">₹{student.feesAmount.toLocaleString('hi-IN')}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200/60">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate max-w-[120px]">{student.address.split(',')[0]}</span>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Calendar className="h-3 w-3 mr-1" />
          अंतिम सक्रिय: {new Date(student.lastActive).toLocaleDateString('hi-IN')}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;