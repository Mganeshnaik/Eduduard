import React, { useState, useMemo } from 'react';
import { Search, Filter, AlertTriangle, TrendingUp, Users, BookOpen } from 'lucide-react';
import { StudentData } from '../types/student';
import StudentCard from './StudentCard';
import RiskMetrics from './RiskMetrics';

interface DashboardProps {
  students: StudentData[];
  onStudentSelect: (student: StudentData) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ students, onStudentSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === 'all' || student.riskLevel === riskFilter;
      const matchesClass = classFilter === 'all' || student.class === classFilter;
      
      return matchesSearch && matchesRisk && matchesClass;
    });
  }, [students, searchTerm, riskFilter, classFilter]);

  const riskStats = useMemo(() => {
    const total = students.length;
    const high = students.filter(s => s.riskLevel === 'high').length;
    const moderate = students.filter(s => s.riskLevel === 'moderate').length;
    const low = students.filter(s => s.riskLevel === 'low').length;
    
    return { total, high, moderate, low };
  }, [students]);

  const classes = useMemo(() => {
    return Array.from(new Set(students.map(s => s.class))).sort();
  }, [students]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            छात्र जोखिम डैशबोर्ड
          </h1>
          <p className="text-gray-600 mt-2">प्रारंभिक हस्तक्षेप के लिए जोखिम वाले छात्रों की निगरानी और पहचान करें</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">अंतिम अपडेट: {new Date().toLocaleDateString('hi-IN')}</p>
        </div>
      </div>

      {/* Risk Metrics */}
      <RiskMetrics stats={riskStats} />

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="नाम या ईमेल से छात्रों को खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="all">सभी जोखिम स्तर</option>
              <option value="high">उच्च जोखिम</option>
              <option value="moderate">मध्यम जोखिम</option>
              <option value="low">कम जोखिम</option>
            </select>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="all">सभी कक्षाएं</option>
              {classes.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onClick={() => onStudentSelect(student)}
          />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">कोई छात्र नहीं मिला</h3>
          <p className="mt-1 text-sm text-gray-500">
            अपने खोज मानदंड या फिल्टर को समायोजित करने का प्रयास करें।
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;