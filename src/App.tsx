import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import DataIngestion from './components/DataIngestion';
import StudentProfile from './components/StudentProfile';
import Settings from './components/Settings';
import Header from './components/Header';
import { StudentData } from './types/student';
import { mockStudents } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [students, setStudents] = useState<StudentData[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    if (view !== 'profile') {
      setSelectedStudent(null);
    }
  };

  const handleStudentSelect = (student: StudentData) => {
    setSelectedStudent(student);
    setCurrentView('profile');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'data':
        return <DataIngestion onDataUpdate={setStudents} />;
      case 'profile':
        return selectedStudent ? (
          <StudentProfile 
            student={selectedStudent} 
            onBack={() => setCurrentView('dashboard')}
          />
        ) : (
          <Dashboard 
            students={students} 
            onStudentSelect={handleStudentSelect}
          />
        );
      case 'settings':
        return <Settings />;
      default:
        return (
          <Dashboard 
            students={students} 
            onStudentSelect={handleStudentSelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={handleViewChange} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;