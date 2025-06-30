import React, { useState } from 'react';
import { Download, ExternalLink, Search, Filter, FileText, Video, Headphones, Book } from 'lucide-react';
import { motion } from 'framer-motion';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Resources', count: 24 },
    { id: 'guides', label: 'Safety Guides', count: 8 },
    { id: 'videos', label: 'Educational Videos', count: 6 },
    { id: 'podcasts', label: 'Podcasts', count: 4 },
    { id: 'worksheets', label: 'Worksheets', count: 6 }
  ];

  const resources = [
    {
      id: 1,
      title: 'Complete Parent Safety Guide',
      description: 'Comprehensive 50-page guide covering all aspects of online safety for families',
      category: 'guides',
      type: 'PDF',
      size: '2.1 MB',
      downloads: 15420,
      icon: FileText,
      featured: true
    },
    {
      id: 2,
      title: 'Cyberbullying Response Handbook',
      description: 'Step-by-step guide for parents and educators on handling cyberbullying incidents',
      category: 'guides',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 8930,
      icon: FileText,
      featured: true
    },
    {
      id: 3,
      title: 'Kids Internet Safety Video Series',
      description: 'Age-appropriate videos teaching internet safety concepts through fun stories',
      category: 'videos',
      type: 'Video Playlist',
      size: '45 minutes',
      downloads: 12340,
      icon: Video,
      featured: false
    },
    {
      id: 4,
      title: 'Social Media Privacy Settings Checklist',
      description: 'Platform-specific instructions for securing privacy on major social networks',
      category: 'guides',
      type: 'PDF',
      size: '850 KB',
      downloads: 9870,
      icon: FileText,
      featured: false
    },
    {
      id: 5,
      title: 'Digital Citizenship Workbook',
      description: 'Interactive exercises for middle and high school students',
      category: 'worksheets',
      type: 'PDF',
      size: '3.2 MB',
      downloads: 6540,
      icon: Book,
      featured: false
    },
    {
      id: 6,
      title: 'Online Safety Podcast for Parents',
      description: 'Weekly discussions on current internet safety topics and trends',
      category: 'podcasts',
      type: 'Audio Series',
      size: '20-30 min episodes',
      downloads: 4230,
      icon: Headphones,
      featured: false
    },
    {
      id: 7,
      title: 'Sextortion Prevention Guide',
      description: 'Critical information for teens and parents about online exploitation',
      category: 'guides',
      type: 'PDF',
      size: '1.2 MB',
      downloads: 7650,
      icon: FileText,
      featured: true
    },
    {
      id: 8,
      title: 'Family Internet Agreement Template',
      description: 'Customizable contract for establishing household internet rules',
      category: 'worksheets',
      type: 'PDF',
      size: '320 KB',
      downloads: 11230,
      icon: FileText,
      featured: false
    },
    {
      id: 9,
      title: 'Scam Awareness Training Video',
      description: 'Learn to identify and avoid common online scams and fraud',
      category: 'videos',
      type: 'Video',
      size: '25 minutes',
      downloads: 5670,
      icon: Video,
      featured: false
    },
    {
      id: 10,
      title: 'Emergency Response Quick Reference',
      description: 'What to do in various online safety emergency situations',
      category: 'guides',
      type: 'PDF',
      size: '650 KB',
      downloads: 8940,
      icon: FileText,
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Resources Library</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download comprehensive guides, watch educational videos, and access tools to keep your family safe online.
          </p>
        </motion.div>

        {/* Featured Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <resource.icon className="h-8 w-8" />
                  <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                <p className="text-blue-100 text-sm mb-4">{resource.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-200">{resource.downloads.toLocaleString()} downloads</span>
                  <span className="text-blue-200">{resource.size}</span>
                </div>
                <button className="w-full mt-4 bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <resource.icon className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{resource.size}</span>
                  <span>•</span>
                  <span>{resource.type}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{resource.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{resource.downloads.toLocaleString()} downloads</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full" />
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-red-50 border border-red-200 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-red-900 mb-4">Emergency Resources</h2>
          <p className="text-red-800 mb-6">
            If you or someone you know is experiencing online harassment, exploitation, or other serious internet safety issues, 
            these resources can provide immediate help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'National Center for Missing & Exploited Children',
                contact: '1-800-THE-LOST (1-800-843-5678)',
                website: 'missingkids.org'
              },
              {
                title: 'Cyberbullying Research Center',
                contact: 'cyberbullying.org',
                website: 'Report & Get Help'
              },
              {
                title: 'FBI Internet Crime Complaint Center',
                contact: 'ic3.gov',
                website: 'Report Cyber Crimes'
              },
              {
                title: 'Crisis Text Line',
                contact: 'Text HOME to 741741',
                website: 'crisistextline.org'
              },
              {
                title: 'National Suicide Prevention Lifeline',
                contact: '988',
                website: '24/7 Crisis Support'
              },
              {
                title: 'NCMEC CyberTipline',
                contact: 'cybertipline.org',
                website: 'Report Online Exploitation'
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
                <h3 className="font-semibold text-red-900 mb-2">{resource.title}</h3>
                <p className="text-red-700 text-sm mb-1">{resource.contact}</p>
                <p className="text-red-600 text-xs">{resource.website}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Stay Updated on Internet Safety</h2>
          <p className="text-green-100 mb-6">
            Get the latest safety guides, alerts about new threats, and tips for keeping your family protected online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;