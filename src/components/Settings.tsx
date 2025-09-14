import React, { useState } from 'react';
import { Save, AlertTriangle, Mail, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  const [thresholds, setThresholds] = useState({
    attendance: { moderate: 70, high: 50 },
    grades: { moderate: 60, high: 40 },
    attempts: { moderate: 2, high: 3 },
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    frequency: 'weekly',
    recipients: 'mentors@school.edu',
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = async () => {
    setSaveStatus('saving');
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure risk assessment thresholds and notification preferences</p>
      </div>

      {/* Risk Thresholds */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment Thresholds</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Attendance Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moderate Risk Below (%)
                </label>
                <input
                  type="number"
                  value={thresholds.attendance.moderate}
                  onChange={(e) => setThresholds({
                    ...thresholds,
                    attendance: { ...thresholds.attendance, moderate: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  High Risk Below (%)
                </label>
                <input
                  type="number"
                  value={thresholds.attendance.high}
                  onChange={(e) => setThresholds({
                    ...thresholds,
                    attendance: { ...thresholds.attendance, high: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Grade Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moderate Risk Below (%)
                </label>
                <input
                  type="number"
                  value={thresholds.grades.moderate}
                  onChange={(e) => setThresholds({
                    ...thresholds,
                    grades: { ...thresholds.grades, moderate: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  High Risk Below (%)
                </label>
                <input
                  type="number"
                  value={thresholds.grades.high}
                  onChange={(e) => setThresholds({
                    ...thresholds,
                    grades: { ...thresholds.grades, high: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Subject Attempt Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moderate Risk At (attempts)
                </label>
                <input
                  type="number"
                  value={thresholds.attempts.moderate}
                  onChange={(e) => setThresholds({
                    ...thresholds,
                    attempts: { ...thresholds.attempts, moderate: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  High Risk At (attempts)
                </label>
                <input
                  type="number"
                  value={thresholds.attempts.high}
                  onChange={(e) => setThresholds({
                    ...thresholds,
                    attempts: { ...thresholds.attempts, high: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Notification Channels</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    email: e.target.checked
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Mail className="ml-3 mr-2 h-4 w-4 text-gray-600" />
                <span className="text-gray-900">Email Notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    sms: e.target.checked
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Bell className="ml-3 mr-2 h-4 w-4 text-gray-600" />
                <span className="text-gray-900">SMS Notifications</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Notification Frequency</h3>
            <select
              value={notifications.frequency}
              onChange={(e) => setNotifications({
                ...notifications,
                frequency: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="immediate">Immediate (High Risk Only)</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Notification Recipients</h3>
            <textarea
              value={notifications.recipients}
              onChange={(e) => setNotifications({
                ...notifications,
                recipients: e.target.value
              })}
              placeholder="Enter email addresses separated by commas..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <p className="text-sm text-gray-600 mt-1">
              Email addresses of mentors, counselors, and administrators who should receive risk alerts
            </p>
          </div>
        </div>
      </div>

      {/* ML Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Machine Learning Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900">Risk Scoring Algorithm</h4>
              <p className="text-sm text-blue-700 mt-1">
                The system uses a weighted scoring model that combines attendance patterns, grade trends, 
                subject attempt frequency, and financial indicators to calculate comprehensive risk scores. 
                The algorithm automatically adjusts weights based on historical data and intervention outcomes.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900">Model Accuracy</h4>
              <p className="text-2xl font-bold text-green-600 mt-1">94.2%</p>
              <p className="text-sm text-gray-600">Based on last 1000 predictions</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900">Intervention Success Rate</h4>
              <p className="text-2xl font-bold text-blue-600 mt-1">87.5%</p>
              <p className="text-sm text-gray-600">Students who improved after intervention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className={`flex items-center px-6 py-2 rounded-md font-medium transition-colors ${
            saveStatus === 'saved'
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
          }`}
        >
          {saveStatus === 'saving' ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {saveStatus === 'saved' ? 'Saved!' : saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default Settings;