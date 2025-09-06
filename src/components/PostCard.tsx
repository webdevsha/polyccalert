import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      user: {
        id: '1',
        name: 'Ahmad Zikri',
        role: 'Pelajar' as const,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        joinedDate: '2024-01-15'
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PolyCCAlert - Laporan Infrastruktur',
        text: post.content,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Pautan telah disalin ke clipboard!');
      });
    }
    setShowShareModal(false);
  };

  const getStatusIcon = () => {
    switch (post.status) {
      case 'Lama':
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusColor = () => {
    switch (post.status) {
      case 'Lama':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getPostAge = () => {
    const now = new Date();
    const posted = new Date(post.timestamp);
    const diffInDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  const getStatusBasedOnAge = () => {
    const age = getPostAge();
    return age <= 7 ? 'Baru' : 'Lama';
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Baru sahaja';
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    return `${Math.floor(diffInHours / 24)} hari lalu`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  {post.user.role}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(post.timestamp)}</span>
              </div>
            </div>
          </div>
          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
            {getStatusIcon()}
            <span>{getStatusBasedOnAge()}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-900 mb-3 leading-relaxed">{post.content}</p>
        
        {/* Category */}
        <div className="flex items-center space-x-2 mb-3">
          <div className={`w-3 h-3 rounded-full ${post.category.color}`}></div>
          <span className="text-sm font-medium text-gray-700">{post.category.name}</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{post.location.address}</span>
        </div>

        {/* Hashtags */}
        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.hashtags.map((tag, index) => (
              <span
                key={index}
                className="text-teal-600 text-sm font-medium hover:text-teal-700 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Images */}
        {post.images.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-1 gap-2">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gambar laporan ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length}</span>
            </button>
            
            <button 
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Kongsi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-gray-100">
          {/* Add Comment Form */}
          <div className="p-4 border-b border-gray-50">
            <form onSubmit={handleAddComment} className="flex space-x-3">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tulis komen..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-1 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Komen
                </button>
              </div>
            </form>
          </div>
          
          {/* Comments List */}
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 border-b border-gray-50 last:border-b-0">
              <div className="flex items-start space-x-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <div className="font-medium text-sm text-gray-900 mb-1">
                      {comment.user.name}
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                    <button className="text-xs text-gray-500 hover:text-teal-600 transition-colors">
                      Suka ({comment.likes})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kongsi Laporan</h3>
              <div className="space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Kongsi Pautan</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(post.content);
                    alert('Teks laporan telah disalin!');
                    setShowShareModal(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-5 h-5 text-green-600 flex items-center justify-center">📋</div>
                  <span className="text-gray-900">Salin Teks</span>
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;