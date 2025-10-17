import React, { useState } from 'react';
import { X, Camera, MapPin, Hash, Send } from 'lucide-react';
import { categories, mockUsers } from '../utils/mockData';
import { Category, Post } from '../types';

interface PostCreationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Post) => void;
}

const PostCreation: React.FC<PostCreationProps> = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [hashtags, setHashtags] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // Create new post
    const newPost: Post = {
      id: Date.now().toString(),
      user: mockUsers[0], // Current user
      content,
      images: selectedFiles.filter(f => f.type.startsWith('image/')).map(f => URL.createObjectURL(f)),
      videos: selectedFiles.filter(f => f.type.startsWith('video/')).map(f => URL.createObjectURL(f)),
      location: {
        lat: 2.167381021030418 + (Math.random() - 0.5) * 0.005, // Random location near polytechnic
        lng: 102.4304150369611 + (Math.random() - 0.5) * 0.005,
        address: location
      },
      category: selectedCategory!,
      hashtags: hashtags.split(' ').filter(tag => tag.startsWith('#')),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      status: 'Baru'
    };
    
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      onSubmit(newPost);
      onClose();
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setContent('');
    setSelectedCategory(null);
    setHashtags('');
    setLocation('');
    setSelectedFiles([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Buat Laporan Baru</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            disabled={uploading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Penerangan Masalah
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Terangkan masalah infrastruktur yang anda temui..."
              required
            />
          </div>

          {/* Photo/Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto atau Video
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Klik untuk muat naik foto atau video</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, MP4 hingga 10MB</p>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
            
            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Fail dipilih:</p>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-teal-100 rounded flex items-center justify-center">
                        {file.type.startsWith('image/') ? '🖼️' : '🎥'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedCategory?.id === category.id
                      ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Cth: Blok A, Tingkat 2"
                required
              />
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700 mb-2">
              Hashtag (opsional)
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="hashtags"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Cth: #Penting #Berbahaya #BlokA"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || !content.trim() || !selectedCategory || !location.trim()}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Menghantar...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Hantar Laporan
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCreation;