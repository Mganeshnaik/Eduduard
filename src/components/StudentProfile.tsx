import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, AlertTriangle, Plus, Check, Clock, User, MapPin, CreditCard, Users, MessageSquare, Send } from 'lucide-react';
import { StudentData, Intervention } from '../types/student';

interface StudentProfileProps {
  student: StudentData;
  onBack: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onBack }) => {
  const [showNewIntervention, setShowNewIntervention] = useState(false);
  const [showParentContact, setShowParentContact] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [selectedContactMethod, setSelectedContactMethod] = useState<'sms' | 'email' | 'call' | 'whatsapp'>('sms');
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

  const handleSendAlert = () => {
    // In a real app, this would send the alert to parents
    console.log('Sending alert to parents:', {
      student: student.name,
      method: selectedContactMethod,
      message: contactMessage,
      parentDetails: student.parentDetails,
    });
    
    setContactMessage('');
    setShowParentContact(false);
    // Show success message
    alert('Alert sent to parents!');
  };

  const getInterventionIcon = (type: string) => {
    switch (type) {
      case 'counseling':
        return '💬';
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
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </button>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
                <div className="flex items-center gap-4 mt-3 text-gray-600">
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {student.email}
                  </span>
                  <span className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {student.phone}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <span className="font-medium">{student.rollNumber}</span>
                  <span>•</span>
                  <span>{student.class}</span>
                  <span>•</span>
                  <span>{student.semester}</span>
                </div>
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{student.address}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${getRiskColor(student.riskLevel)} shadow-sm`}>
                {student.riskLevel === 'high' ? 'High Risk' : 
                 student.riskLevel === 'moderate' ? 'Moderate Risk' : 'Low Risk'}
              </span>
              <button
                onClick={() => setShowParentContact(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Parents
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Contact Modal */}
      {showParentContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Parents</h2>
              <button
                onClick={() => setShowParentContact(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Parent Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Father's Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {student.parentDetails.fatherName}</p>
                  <p><span className="font-medium">Phone:</span> {student.parentDetails.fatherPhone}</p>
                  <p><span className="font-medium">Email:</span> {student.parentDetails.fatherEmail}</p>
                  <p><span className="font-medium">Occupation:</span> {student.parentDetails.fatherOccupation}</p>
                </div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Mother's Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {student.parentDetails.motherName}</p>
                  <p><span className="font-medium">Phone:</span> {student.parentDetails.motherPhone}</p>
                  <p><span className="font-medium">Email:</span> {student.parentDetails.motherEmail}</p>
                  <p><span className="font-medium">Occupation:</span> {student.parentDetails.motherOccupation}</p>
                </div>
              </div>
              {student.parentDetails.guardianName && (
                <div className="bg-green-50 p-4 rounded-lg md:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-2">Guardian's Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="font-medium">Name:</span> {student.parentDetails.guardianName}</p>
                    <p><span className="font-medium">Relation:</span> {student.parentDetails.guardianRelation}</p>
                    <p><span className="font-medium">Phone:</span> {student.parentDetails.guardianPhone}</p>
                    <p><span className="font-medium">Email:</span> {student.parentDetails.guardianEmail}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Method Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Method</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'sms', label: 'SMS', icon: '📱' },
                  { value: 'email', label: 'Email', icon: '📧' },
                  { value: 'call', label: 'Call', icon: '📞' },
                  { value: 'whatsapp', label: 'WhatsApp', icon: '💬' },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setSelectedContactMethod(method.value as any)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      selectedContactMethod === method.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{method.icon}</div>
                    <div className="text-xs font-medium">{method.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Write a message to send to parents..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
              <div className="mt-2 text-xs text-gray-500">
                Suggested message: "Please contact us to discuss your child {student.name}'s academic progress."
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSendAlert}
                disabled={!contactMessage.trim()}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Alert
              </button>
              <button
                onClick={() => setShowParentContact(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
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

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
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

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Risk Score</h3>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${getRiskColor(student.riskLevel).split(' ')[0]}`}>
              {Math.round(student.riskScore * 100)}%
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Fee Status</h3>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${
              student.feesPaid ? 'text-green-600' : 'text-red-600'
            }`}>
              {student.feesPaid ? 'Paid' : 'Pending'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">₹{student.feesAmount.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Date of Birth</h3>
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-900">
              {new Date(student.dateOfBirth).toLocaleDateString('en-US')}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Age: {new Date().getFullYear() - new Date(student.dateOfBirth).getFullYear()} years
          </p>
        </div>
      </div>

      {/* Alerts */}
      {student.alerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h2>
          <div className="space-y-3">
            {student.alerts.map(alert => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border ${
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
                        {new Date(alert.createdAt).toLocaleDateString('en-US')}
                      </p>
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
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
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Interventions</h2>
          <button
            onClick={() => setShowNewIntervention(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Take Action
          </button>
        </div>

        {showNewIntervention && (
          <div className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50">
            <h3 className="font-medium text-gray-900 mb-3">Add New Intervention</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                value={newIntervention.type}
                onChange={(e) => setNewIntervention({
                  ...newIntervention,
                  type: e.target.value as any
                })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <textarea
              placeholder="Intervention description..."
              value={newIntervention.description}
              onChange={(e) => setNewIntervention({
                ...newIntervention,
                description: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddIntervention}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Intervention
              </button>
              <button
                onClick={() => setShowNewIntervention(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
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
              <div key={intervention.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">
                      {getInterventionIcon(intervention.type)}
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {intervention.type === 'counseling' ? 'Counseling' :
                         intervention.type === 'academic_support' ? 'Academic Support' :
                         intervention.type === 'financial_aid' ? 'Financial Aid' :
                         intervention.type === 'mentorship' ? 'Mentorship' : intervention.type}
                      </h4>
                      <p className="text-gray-600 mt-1">{intervention.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {intervention.assignedTo}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(intervention.createdAt).toLocaleDateString('en-US')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(intervention.status)}`}>
                    {intervention.status === 'pending' ? 'Pending' :
                     intervention.status === 'in_progress' ? 'In Progress' :
                     intervention.status === 'completed' ? 'Completed' : intervention.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Subject Attempts */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Subject Attempts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(student.subjectAttempts).map(([subject, attempts]) => (
            <div key={subject} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
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