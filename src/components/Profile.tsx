import React from 'react';
import { Calendar, MapPin, Award, TrendingUp, Edit, Settings } from 'lucide-react';
import { mockUsers } from '../utils/mockData';
import { Post } from '../types';

interface ProfileProps {
  posts: Post[];
}

const Profile: React.FC<ProfileProps> = ({ posts }) => {
  const currentUser = mockUsers[0]; // Assume first user is current user
  const userPosts = posts.filter(post => post.user.id === currentUser.id);
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-teal-500 to-blue-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            <div className="relative -mt-16 mb-4 sm:mb-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-3 py-1 text-sm font-medium bg-teal-100 text-teal-800 rounded-full">
                      {currentUser.role}
                    </span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      Sertai sejak {new Date(currentUser.joinedDate).getFullYear()}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profil
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-teal-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Jumlah Laporan</p>
              <p className="text-2xl font-semibold text-gray-900">{userPosts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Skor Sumbangan</p>
              <p className="text-2xl font-semibold text-gray-900">
                {userPosts.reduce((sum, post) => sum + post.likes, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <div className="w-6 h-6 text-green-600 flex items-center justify-center text-lg">🆕</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Laporan Baru</p>
              <p className="text-2xl font-semibold text-gray-900">
                {userPosts.filter(post => {
                  const age = Math.floor((new Date().getTime() - new Date(post.timestamp).getTime()) / (1000 * 60 * 60 * 24));
                  return age <= 7;
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Lokasi Unik</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(userPosts.map(post => post.location.address)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Aktiviti Terkini</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {userPosts.map(post => (
            <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  (() => {
                    const age = Math.floor((new Date().getTime() - new Date(post.timestamp).getTime()) / (1000 * 60 * 60 * 24));
                    return age <= 7 ? 'bg-red-500' : 'bg-gray-500';
                  })()
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${post.category.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{post.category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(post.timestamp).toLocaleDateString('ms-MY')}
                    </span>
                  </div>
                  <p className="text-gray-900 mt-1">{post.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{post.location.address}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;