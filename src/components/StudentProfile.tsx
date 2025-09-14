import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, AlertTriangle, Plus, Check, Clock, User } from 'lucide-react';
import { StudentData, Intervention } from '../types/student';

interface StudentProfileProps {
  student: StudentData;
  onBack: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onBack }) => {
  const [showNewIntervention, setShowNewIntervention] = useState(false);
  const [newIntervention, setNewIntervention] = useState({
    type: 'counseling' as const,
    description: '',
    assignedTo: '',
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const handleAddIntervention = () => {
    const intervention: Intervention = {
      id: Date.now().toString(),
      ...newIntervention,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    
    // In a real app, this would update the student data
    console.log('Adding intervention:', intervention);
    
    setNewIntervention({
      type: 'counseling',
      description: '',
      assignedTo: '',
    });
    setShowNewIntervention(false);
  };

  const getInterventionIcon = (type: string) => {
    switch (type) {
      case 'counseling':
        return '🗣️';
      case 'academic_support':
        return '📚';
      case 'financial_aid':
        return '💰';
      case 'mentorship':
        return '🤝';
      default:
        return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </button>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {student.email}
                  </span>
                  <span>{student.class} • {student.semester}</span>
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(student.riskLevel)}`}>
              {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)} Risk
            </span>
          </div>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Attendance</h3>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${
              student.attendance >= 80 ? 'text-green-600' : 
              student.attendance >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {student.attendance}%
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Average Grade</h3>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${
              student.averageGrade >= 70 ? 'text-green-600' : 
              student.averageGrade >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {student.averageGrade}%
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Risk Score</h3>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${getRiskColor(student.riskLevel).split(' ')[0]}`}>
              {Math.round(student.riskScore * 100)}%
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Fees Status</h3>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${
              student.feesPaid ? 'text-green-600' : 'text-red-600'
            }`}>
              {student.feesPaid ? 'Paid' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {student.alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h2>
          <div className="space-y-3">
            {student.alerts.map(alert => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.severity === 'high' ? 'border-red-200 bg-red-50' :
                  alert.severity === 'moderate' ? 'border-yellow-200 bg-yellow-50' :
                  'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 mr-3 ${
                      alert.severity === 'high' ? 'text-red-600' :
                      alert.severity === 'moderate' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(alert.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interventions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Interventions</h2>
          <button
            onClick={() => setShowNewIntervention(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Take Action
          </button>
        </div>

        {showNewIntervention && (
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-900 mb-3">Add New Intervention</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                value={newIntervention.type}
                onChange={(e) => setNewIntervention({
                  ...newIntervention,
                  type: e.target.value as any
                })}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="counseling">Counseling</option>
                <option value="academic_support">Academic Support</option>
                <option value="financial_aid">Financial Aid</option>
                <option value="mentorship">Mentorship</option>
              </select>
              <input
                type="text"
                placeholder="Assigned to (name or email)"
                value={newIntervention.assignedTo}
                onChange={(e) => setNewIntervention({
                  ...newIntervention,
                  assignedTo: e.target.value
                })}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <textarea
              placeholder="Description of the intervention..."
              value={newIntervention.description}
              onChange={(e) => setNewIntervention({
                ...newIntervention,
                description: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddIntervention}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Intervention
              </button>
              <button
                onClick={() => setShowNewIntervention(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {student.interventions.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No interventions yet. Click "Take Action" to create one.</p>
          ) : (
            student.interventions.map(intervention => (
              <div key={intervention.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">
                      {getInterventionIcon(intervention.type)}
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {intervention.type.replace('_', ' ').charAt(0).toUpperCase() + 
                         intervention.type.replace('_', ' ').slice(1)}
                      </h4>
                      <p className="text-gray-600 mt-1">{intervention.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {intervention.assignedTo}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(intervention.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(intervention.status)}`}>
                    {intervention.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Subject Attempts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Subject Attempts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(student.subjectAttempts).map(([subject, attempts]) => (
            <div key={subject} className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium text-gray-900">{subject}</h4>
              <p className={`text-lg font-semibold mt-1 ${
                attempts >= 3 ? 'text-red-600' : 
                attempts >= 2 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {attempts} attempt{attempts !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;