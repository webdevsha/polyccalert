import React, { useState } from 'react';
import { Search, Filter, TrendingUp, MapPin, Users, AlertTriangle } from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import { categories } from '../utils/mockData';
import { Post } from '../types';

interface MapDashboardProps {
  posts: Post[];
}

const MapDashboard: React.FC<MapDashboardProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getPostStatus = (timestamp: string) => {
    const age = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24));
    return age <= 7 ? 'Baru' : 'Lama';
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category.id === selectedCategory;
    const postStatus = getPostStatus(post.timestamp);
    const matchesStatus = selectedStatus === 'all' || postStatus === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Peta Laporan Infrastruktur</h1>
        <p className="text-gray-600">Pantau dan laporkan isu infrastruktur di seluruh kampus Politeknik Merlimau</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm">Jumlah Laporan</p>
              <p className="text-2xl font-bold">{posts.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-teal-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Baru</p>
              <p className="text-2xl font-bold">
                {posts.filter(p => {
                  const age = Math.floor((new Date().getTime() - new Date(p.timestamp).getTime()) / (1000 * 60 * 60 * 24));
                  return age <= 7;
                }).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-sm">Lama</p>
              <p className="text-2xl font-bold">
                {posts.filter(p => {
                  const age = Math.floor((new Date().getTime() - new Date(p.timestamp).getTime()) / (1000 * 60 * 60 * 24));
                  return age > 7;
                }).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              📅
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm">Aktif Hari Ini</p>
              <p className="text-2xl font-bold">
                {posts.filter(p => {
                  const age = Math.floor((new Date().getTime() - new Date(p.timestamp).getTime()) / (1000 * 60 * 60 * 24));
                  return age === 0;
                }).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
              📊
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Cari laporan, lokasi, atau hashtag..."
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="Baru">Baru</option>
              <option value="Lama">Lama</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Peta Interaktif</h2>
              <p className="text-gray-600 mt-1">Klik pada penanda untuk melihat butiran laporan</p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">Baru</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                <span className="text-gray-700">Lama</span>
              </div>
            </div>
          </div>
        </div>
        
        <InteractiveMap posts={posts} />
      </div>

      {/* Recent Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Laporan Terkini</h3>
        <div className="space-y-3">
          {filteredPosts.slice(0, 5).map(post => (
            <div key={post.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <div className={`w-3 h-3 rounded-full ${
                (() => {
                  const age = Math.floor((new Date().getTime() - new Date(post.timestamp).getTime()) / (1000 * 60 * 60 * 24));
                  return age <= 7 ? 'bg-red-500' : 'bg-gray-500';
                })()
              }`}></div>
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {post.content.substring(0, 60)}...
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{post.location.address}</span>
                  <span>•</span>
                  <Users className="w-3 h-3" />
                  <span>{post.user.name}</span>
                </div>
              </div>
              <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                post.category.color.replace('bg-', 'bg-opacity-20 bg-')
              } text-gray-700`}>
                {post.category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;