import { User, Post, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Lubang Jalan', icon: 'AlertTriangle', color: 'bg-red-500' },
  { id: '2', name: 'Lampu Jalan', icon: 'Lightbulb', color: 'bg-yellow-500' },
  { id: '3', name: 'Longkang', icon: 'Waves', color: 'bg-blue-500' },
  { id: '4', name: 'Papan Tanda', icon: 'Sign', color: 'bg-green-500' },
  { id: '5', name: 'Keselamatan', icon: 'Shield', color: 'bg-purple-500' },
  { id: '6', name: 'Lain-lain', icon: 'MoreHorizontal', color: 'bg-gray-500' }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmad Zikri',
    role: 'Pelajar',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    role: 'Staf',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    joinedDate: '2023-08-20'
  },
  {
    id: '3',
    name: 'Mohd Fariz',
    role: 'Penyelenggaraan',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    joinedDate: '2023-03-10'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: 'Lubang besar di depan Blok A. Sangat berbahaya untuk pelajar yang berjalan kaki. Perlu diperbetulkan segera!',
    images: ['https://images.pexels.com/photos/2449665/pexels-photo-2449665.jpeg?auto=compress&cs=tinysrgb&w=800'],
    videos: [],
    location: {
      lat: 2.167381021030418,
      lng: 102.4304150369611,
      address: 'Blok A, Politeknik Merlimau'
    },
    category: categories[0],
    hashtags: ['#LubangJalan', '#BlokA', '#Berbahaya'],
    timestamp: '2024-12-30T08:30:00Z',
    likes: 24,
    comments: [
      {
        id: '1',
        user: mockUsers[1],
        content: 'Terima kasih atas laporan. Akan diteruskan kepada pihak pengurusan.',
        timestamp: '2024-12-30T09:15:00Z',
        likes: 5
      }
    ],
    status: 'Baru'
  },
  {
    id: '2',
    user: mockUsers[1],
    content: 'Lampu jalan di kawasan parking tidak berfungsi sejak semalam. Kawasan terlalu gelap pada waktu malam.',
    images: ['https://images.pexels.com/photos/1405963/pexels-photo-1405963.jpeg?auto=compress&cs=tinysrgb&w=800'],
    videos: [],
    location: {
      lat: 2.167581021030418,
      lng: 102.4306150369611,
      address: 'Kawasan Parkir Utama, Politeknik Merlimau'
    },
    category: categories[1],
    hashtags: ['#LampuJalan', '#Parking', '#Keselamatan'],
    timestamp: '2024-12-25T18:45:00Z',
    likes: 18,
    comments: [],
    status: 'Lama'
  },
  {
    id: '3',
    user: mockUsers[2],
    content: 'Update: Lubang jalan di Blok C telah diperbetulkan. Terima kasih kepada semua yang melaporkan!',
    images: ['https://images.pexels.com/photos/1029806/pexels-photo-1029806.jpeg?auto=compress&cs=tinysrgb&w=800'],
    videos: [],
    location: {
      lat: 2.167181021030418,
      lng: 102.4302150369611,
      address: 'Blok C, Politeknik Merlimau'
    },
    category: categories[0],
    hashtags: ['#Selesai', '#BlokC', '#TerimaKasih'],
    timestamp: '2024-12-20T14:20:00Z',
    likes: 42,
    comments: [
      {
        id: '2',
        user: mockUsers[0],
        content: 'Alhamdulillah! Kerja yang cepat dan efisien.',
        timestamp: '2024-12-20T15:30:00Z',
        likes: 8
      }
    ],
    status: 'Lama'
  }
];