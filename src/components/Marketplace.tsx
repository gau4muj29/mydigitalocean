import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Shield, 
  Database, 
  Globe, 
  Code, 
  Server,
  Zap,
  Heart,
  ExternalLink,
  ChevronRight,
  Tag,
  Users,
  Clock
} from 'lucide-react';

interface MarketplaceApp {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  downloads: number;
  price: number;
  image: string;
  developer: string;
  tags: string[];
  featured: boolean;
  verified: boolean;
  lastUpdated: string;
}

const marketplaceApps: MarketplaceApp[] = [
  {
    id: '1',
    name: 'WordPress',
    description: 'The world\'s most popular content management system. Perfect for blogs, websites, and e-commerce.',
    category: 'CMS',
    rating: 4.8,
    downloads: 125000,
    price: 0,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'WordPress Foundation',
    tags: ['CMS', 'Blog', 'Website', 'PHP'],
    featured: true,
    verified: true,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Docker',
    description: 'Containerization platform that enables you to package applications and their dependencies.',
    category: 'Development',
    rating: 4.9,
    downloads: 89000,
    price: 0,
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'Docker Inc.',
    tags: ['Container', 'DevOps', 'Deployment'],
    featured: true,
    verified: true,
    lastUpdated: '2024-01-20'
  },
  {
    id: '3',
    name: 'NGINX',
    description: 'High-performance web server and reverse proxy server with load balancing capabilities.',
    category: 'Web Server',
    rating: 4.7,
    downloads: 156000,
    price: 0,
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'NGINX Inc.',
    tags: ['Web Server', 'Proxy', 'Load Balancer'],
    featured: false,
    verified: true,
    lastUpdated: '2024-01-18'
  },
  {
    id: '4',
    name: 'PostgreSQL',
    description: 'Advanced open-source relational database with powerful features and excellent performance.',
    category: 'Database',
    rating: 4.8,
    downloads: 78000,
    price: 0,
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'PostgreSQL Global Development Group',
    tags: ['Database', 'SQL', 'Relational'],
    featured: false,
    verified: true,
    lastUpdated: '2024-01-22'
  },
  {
    id: '5',
    name: 'GitLab CE',
    description: 'Complete DevOps platform with Git repository management, CI/CD, and project management.',
    category: 'Development',
    rating: 4.6,
    downloads: 45000,
    price: 0,
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'GitLab Inc.',
    tags: ['Git', 'CI/CD', 'DevOps', 'Project Management'],
    featured: true,
    verified: true,
    lastUpdated: '2024-01-19'
  },
  {
    id: '6',
    name: 'Nextcloud',
    description: 'Self-hosted cloud storage and collaboration platform with file sharing and sync.',
    category: 'Storage',
    rating: 4.5,
    downloads: 67000,
    price: 0,
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400',
    developer: 'Nextcloud GmbH',
    tags: ['Cloud Storage', 'File Sharing', 'Collaboration'],
    featured: false,
    verified: true,
    lastUpdated: '2024-01-17'
  }
];

const categories = ['All', 'CMS', 'Development', 'Database', 'Web Server', 'Storage', 'Security', 'Monitoring'];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const filteredApps = marketplaceApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.featured ? 1 : -1;
    }
  });

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M`;
    if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)}K`;
    return downloads.toString();
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Marketplace</h1>
        <p className="text-gray-600">Discover and deploy applications with one click</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="rating">Rating</option>
              <option value="downloads">Downloads</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Apps */}
      {selectedCategory === 'All' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceApps.filter(app => app.featured).map(app => (
              <div key={app.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={app.image} alt={app.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {app.verified && (
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </span>
                    )}
                    {app.price === 0 && (
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Free
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{app.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{app.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{formatDownloads(app.downloads)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{app.developer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Deploy Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedCategory === 'All' ? 'All Applications' : `${selectedCategory} Applications`}
          </h2>
          <span className="text-sm text-gray-500">{sortedApps.length} applications found</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedApps.map(app => (
            <div key={app.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={app.image} alt={app.name} className="w-full h-32 object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  {app.verified && (
                    <div className="bg-blue-600 text-white p-1 rounded-full">
                      <Shield className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{app.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{app.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">{app.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>{formatDownloads(app.downloads)}</span>
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {app.category}
                  </span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                  Deploy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}