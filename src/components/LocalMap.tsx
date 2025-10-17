import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Navigation, Layers } from 'lucide-react';
import { mockPosts } from '../utils/mockData';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Actual coordinates for Politeknik Merlimau
const POLITEKNIK_MERLIMAU_CENTER: [number, number] = [2.167381021030418, 102.4304150369611];

const LocalMap: React.FC = () => {
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
        <div className="h-[600px]">
          <MapContainer
            center={POLITEKNIK_MERLIMAU_CENTER}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mockPosts.map((post) => (
              <Marker 
                key={post.id} 
                position={[post.location.lat, post.location.lng]}
              >
                <Popup>
                  <div className="max-w-xs">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Status: {post.status}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default LocalMap;