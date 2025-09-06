export interface User {
  id: string;
  name: string;
  role: 'Pelajar' | 'Staf' | 'Penyelenggaraan';
  avatar: string;
  joinedDate: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  images: string[];
  videos: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  category: Category;
  hashtags: string[];
  timestamp: string;
  likes: number;
  comments: Comment[];
  status: 'Baru' | 'Lama';
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}