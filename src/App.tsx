import React, { useState } from 'react';
import Header from './components/Header';
import PostCreation from './components/PostCreation';
import PostFeed from './components/PostFeed';
import MapDashboard from './components/MapDashboard';
import Profile from './components/Profile';
import { Post } from './types';
import { mockPosts as initialMockPosts } from './utils/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('map'); // Changed default to 'map'
  const [showPostCreation, setShowPostCreation] = useState(false);
  const [posts, setPosts] = useState<Post[]>(initialMockPosts);

  const handleNewPost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <PostFeed posts={posts} />;
      case 'profile':
        return <Profile posts={posts} />;
      default:
        return <MapDashboard posts={posts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowPostCreation={setShowPostCreation}
      />
      
      {renderContent()}
      
      <PostCreation 
        isOpen={showPostCreation}
        onClose={() => setShowPostCreation(false)}
        onSubmit={handleNewPost}
      />
    </div>
  );
}

export default App;