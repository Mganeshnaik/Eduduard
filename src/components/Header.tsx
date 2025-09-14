import React from 'react';
import { GraduationCap, BarChart3, Upload, Settings, Users } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'डैशबोर्ड', icon: BarChart3 },
    { id: 'data', label: 'डेटा अपलोड', icon: Upload },
    { id: 'settings', label: 'सेटिंग्स', icon: Settings },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">
                छात्र जोखिम निगरानी प्रणाली
              </h1>
            </div>
          </div>

          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    currentView === item.id
                      ? 'text-blue-600 bg-white shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;