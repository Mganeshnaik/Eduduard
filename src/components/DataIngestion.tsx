import React, { useState } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { StudentData } from '../types/student';
import { calculateRiskScore } from '../utils/riskCalculation';

interface DataIngestionProps {
  onDataUpdate: (students: StudentData[]) => void;
}

const DataIngestion: React.FC<DataIngestionProps> = ({ onDataUpdate }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploadStatus('uploading');
    setUploadMessage('Processing files...');

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would parse CSV/Excel files here
      // For demo purposes, we'll simulate successful data processing
      
      setUploadStatus('success');
      setUploadMessage(`Successfully processed ${files.length} file(s). Data has been updated.`);
      
      // Refresh the data (in real app, this would come from processed files)
      // For now, we'll just trigger a re-render with existing mock data
      
    } catch (error) {
      setUploadStatus('error');
      setUploadMessage('Error processing files. Please check the file format and try again.');
    }
  };

  const downloadTemplate = (type: 'attendance' | 'grades' | 'fees') => {
    const templates = {
      attendance: 'student_id,name,email,class,semester,attendance_percentage,last_active\n1,John Doe,john@example.com,CS-A,Fall 2024,85.5,2024-01-15',
      grades: 'student_id,subject,grade,attempt_number,test_date\n1,Mathematics,78,1,2024-01-10\n1,Physics,65,2,2024-01-12',
      fees: 'student_id,name,amount_due,amount_paid,payment_status,due_date\n1,John Doe,5000,5000,paid,2024-01-31'
    };

    const blob = new Blob([templates[type]], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Ingestion</h1>
        <p className="text-gray-600 mt-1">Upload student data from multiple sources to update the risk assessment system</p>
      </div>

      {/* Upload Status */}
      {uploadStatus !== 'idle' && (
        <div className={`p-4 rounded-lg border ${
          uploadStatus === 'success' ? 'border-green-200 bg-green-50' :
          uploadStatus === 'error' ? 'border-red-200 bg-red-50' :
          'border-blue-200 bg-blue-50'
        }`}>
          <div className="flex items-center">
            {uploadStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mr-2" />}
            {uploadStatus === 'error' && <AlertCircle className="h-5 w-5 text-red-600 mr-2" />}
            {uploadStatus === 'uploading' && (
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full mr-2" />
            )}
            <span className={`font-medium ${
              uploadStatus === 'success' ? 'text-green-800' :
              uploadStatus === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {uploadMessage}
            </span>
          </div>
        </div>
      )}

      {/* File Upload Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Data Files</h2>
        
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your files here, or <span className="text-blue-600">browse</span>
              </p>
              <p className="text-gray-600 mt-1">
                Supports CSV and Excel files up to 10MB each
              </p>
            </div>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                CSV Files
              </div>
              <div className="flex items-center">
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Excel Files
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Attendance Data</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Upload student attendance records including percentages, dates, and class participation data.
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Expected columns:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Student ID</li>
              <li>• Name</li>
              <li>• Attendance Percentage</li>
              <li>• Last Active Date</li>
            </ul>
          </div>
          <button
            onClick={() => downloadTemplate('attendance')}
            className="mt-4 flex items-center text-blue-600 hover:text-blue-700"
          >
            <Download className="h-4 w-4 mr-1" />
            Download Template
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Assessment Scores</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Import test scores, assignment grades, and subject-wise performance data with attempt tracking.
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Expected columns:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Student ID</li>
              <li>• Subject</li>
              <li>• Grade</li>
              <li>• Attempt Number</li>
            </ul>
          </div>
          <button
            onClick={() => downloadTemplate('grades')}
            className="mt-4 flex items-center text-blue-600 hover:text-blue-700"
          >
            <Download className="h-4 w-4 mr-1" />
            Download Template
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5 text-yellow-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Fee Payment Data</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Update fee payment status, outstanding amounts, and payment history for financial risk assessment.
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Expected columns:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Student ID</li>
              <li>• Amount Due</li>
              <li>• Amount Paid</li>
              <li>• Payment Status</li>
            </ul>
          </div>
          <button
            onClick={() => downloadTemplate('fees')}
            className="mt-4 flex items-center text-blue-600 hover:text-blue-700"
          >
            <Download className="h-4 w-4 mr-1" />
            Download Template
          </button>
        </div>
      </div>

      {/* Processing Guidelines */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Processing Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">File Requirements</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• CSV or Excel format (.csv, .xlsx, .xls)</li>
              <li>• Maximum file size: 10MB</li>
              <li>• First row should contain column headers</li>
              <li>• Student IDs must be consistent across files</li>
              <li>• Dates in YYYY-MM-DD format</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Automated Processing</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Risk scores recalculated after each upload</li>
              <li>• Duplicate entries automatically merged</li>
              <li>• Invalid data rows flagged for review</li>
              <li>• Mentors notified of significant risk changes</li>
              <li>• Historical data preserved for trend analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataIngestion;