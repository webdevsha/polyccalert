import React from 'react';
import { MapPin, Plus, User, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setShowPostCreation: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, setShowPostCreation }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">PolyCCAlert</h1>
              <p className="text-xs text-gray-500">Politeknik Merlimau</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'map'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
              }`}
            >
              Peta Utama
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'feed'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
              }`}
            >
              Laman Laporan
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
              }`}
            >
              Profil
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPostCreation(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Lapor</span>
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-md hover:bg-gray-50 transition-colors">
              <div className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
              </div>
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-md hover:bg-gray-50 transition-colors md:hidden">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="px-4 py-2">
          <nav className="flex justify-around">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex flex-col items-center py-2 px-3 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'map'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                🗺️
              </div>
              Peta
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex flex-col items-center py-2 px-3 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'feed'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                📱
              </div>
              Laporan
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center py-2 px-3 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-700 hover:text-teal-600'
              }`}
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                👤
              </div>
              Profil
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;