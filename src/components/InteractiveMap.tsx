import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Navigation, Layers, MapPin, Clock, User } from 'lucide-react';
import { Post } from '../types';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom marker icons for different statuses
const createCustomIcon = (status: string) => {
  // Determine color based on post age
  const getColorByAge = (timestamp: string) => {
    const age = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24));
    return age <= 7 ? '#EF4444' : '#6B7280'; // Red for new (≤7 days), Gray for old (>7 days)
  };
  
  const color = getColorByAge(status); // status parameter will be timestamp
  
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="${color}"/>
        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

const LocationButton: React.FC = () => {
  const map = useMap();
  
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 16);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to actual Merlimau Polytechnic coordinates
          map.setView([2.167381021030418, 102.4304150369611], 16);
        }
      );
    } else {
      // Fallback to actual Merlimau Polytechnic coordinates
      map.setView([2.167381021030418, 102.4304150369611], 16);
    }
  };

  return (
    <button
      onClick={handleLocationClick}
      className="absolute top-4 right-4 z-[1000] inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg"
    >
      <Navigation className="w-4 h-4 mr-2" />
      Lokasi Saya
    </button>
  );
};

interface InteractiveMapProps {
  posts: Post[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  // Actual Merlimau Polytechnic coordinates
  const center: LatLngExpression = [2.167381021030418, 102.4304150369611];

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Baru sahaja';
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    return `${Math.floor(diffInHours / 24)} hari lalu`;
  };

  return (
    <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationButton />
        
        {posts.map((post) => (
          <Marker
            key={post.id}
            position={[post.location.lat, post.location.lng]}
            icon={createCustomIcon(post.timestamp)}
            eventHandlers={{
              click: () => setSelectedPost(post),
            }}
          >
            <Popup className="custom-popup" maxWidth={350} minWidth={300}>
              <div className="p-4 min-w-[300px]">
                {/* User Header */}
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-bold text-base text-gray-900">{post.user.name}</p>
                    <p className="text-sm text-gray-600">{post.user.role}</p>
                  </div>
                </div>
                
                {/* Content */}
                <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                  {post.content}
                </p>
                
                {/* Category */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${post.category.color}`}></div>
                  <span className="text-sm font-semibold text-gray-800">{post.category.name}</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{post.location.address}</span>
                </div>
                
                {/* Timestamp and Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{formatTimeAgo(post.timestamp)}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    (() => {
                      const age = Math.floor((new Date().getTime() - new Date(post.timestamp).getTime()) / (1000 * 60 * 60 * 24));
                      return age <= 7 ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-gray-100 text-gray-800 border border-gray-200';
                    })()
                  }`}>
                    {(() => {
                      const age = Math.floor((new Date().getTime() - new Date(post.timestamp).getTime()) / (1000 * 60 * 60 * 24));
                      return age <= 7 ? 'Baru' : 'Lama';
                    })()}
                  </div>
                </div>
                
                {/* Image */}
                {post.images.length > 0 && (
                  <img
                    src={post.images[0]}
                    alt="Laporan"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                )}
                
                {/* Hashtags */}
                {post.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full border border-teal-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;