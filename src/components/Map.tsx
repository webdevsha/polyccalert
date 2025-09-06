import React from 'react';
import { MapPin, Navigation, Layers } from 'lucide-react';
import { mockPosts } from '../utils/mockData';

const Map: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Peta Laporan</h2>
              <p className="text-gray-600 mt-1">Lokasi masalah infrastruktur di kampus</p>
            </div>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <Layers className="w-4 h-4 mr-2" />
                Layer
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <Navigation className="w-4 h-4 mr-2" />
                Lokasi Saya
              </button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-96 lg:h-[600px] bg-gray-100">
          {/* Placeholder Map */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Peta Interaktif</h3>
              <p className="text-gray-600 max-w-md">
                Peta akan menunjukkan lokasi tepat setiap laporan masalah infrastruktur
              </p>
            </div>
          </div>

          {/* Mock Map Markers */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-red-500 w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-transform"></div>
          </div>
          <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
            <div className="bg-yellow-500 w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-transform"></div>
          </div>
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="bg-green-500 w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-transform"></div>
          </div>
        </div>

        {/* Legend */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Petunjuk</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full border border-white shadow"></div>
              <span className="text-sm text-gray-700">Baru ({mockPosts.filter(p => p.status === 'Baru').length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full border border-white shadow"></div>
              <span className="text-sm text-gray-700">Dalam Proses ({mockPosts.filter(p => p.status === 'Dalam Proses').length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full border border-white shadow"></div>
              <span className="text-sm text-gray-700">Selesai ({mockPosts.filter(p => p.status === 'Selesai').length})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Laporan Terkini</h3>
        <div className="space-y-3">
          {mockPosts.slice(0, 3).map(post => (
            <div key={post.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <div className={`w-3 h-3 rounded-full ${
                post.status === 'Selesai' ? 'bg-green-500' :
                post.status === 'Dalam Proses' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {post.content.substring(0, 50)}...
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{post.location.address}</span>
                </div>
              </div>
              <div className={`px-2 py-1 text-xs font-medium rounded-full ${post.category.color.replace('bg-', 'bg-opacity-20 bg-')} text-gray-700`}>
                {post.category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;