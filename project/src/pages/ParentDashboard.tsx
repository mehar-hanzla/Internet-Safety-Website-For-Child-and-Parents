import React, { useState } from 'react';
import { Shield, Users, AlertTriangle, TrendingUp, Download, Settings, Eye, Clock, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChild, setSelectedChild] = useState('Emma');

  const children = [
    { name: 'Emma', age: 12, avatar: '👧', status: 'safe', lastActivity: '2 min ago' },
    { name: 'Jack', age: 8, avatar: '👦', status: 'warning', lastActivity: '15 min ago' }
  ];

  const recentAlerts = [
    {
      type: 'warning',
      child: 'Emma',
      message: 'Attempted to visit a blocked website',
      time: '10 minutes ago',
      severity: 'medium'
    },
    {
      type: 'info',
      child: 'Jack',
      message: 'Completed internet safety lesson',
      time: '1 hour ago',
      severity: 'low'
    },
    {
      type: 'alert',
      child: 'Emma',
      message: 'New friend request on social media',
      time: '2 hours ago',
      severity: 'high'
    }
  ];

  const screenTimeData = {
    Emma: { today: 3.2, average: 2.8, limit: 4.0 },
    Jack: { today: 1.8, average: 2.1, limit: 2.5 }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'monitoring', label: 'Monitoring', icon: Eye },
    { id: 'controls', label: 'Parental Controls', icon: Settings },
    { id: 'resources', label: 'Resources', icon: Download }
  ];

  const MonitoringTools = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Screen Time */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Screen Time Today</h3>
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          {children.map((child) => (
            <div key={child.name} className="mb-4 last:mb-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{child.name}</span>
                <span className="text-sm text-gray-600">
                  {screenTimeData[child.name].today}h / {screenTimeData[child.name].limit}h
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    screenTimeData[child.name].today > screenTimeData[child.name].limit
                      ? 'bg-red-500'
                      : screenTimeData[child.name].today > screenTimeData[child.name].limit * 0.8
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{
                    width: `${Math.min((screenTimeData[child.name].today / screenTimeData[child.name].limit) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* App Usage */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Top Apps Used</h3>
            <Smartphone className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            {[
              { app: 'YouTube Kids', time: '1.2h', icon: '🎥' },
              { app: 'Minecraft', time: '45m', icon: '🎮' },
              { app: 'Khan Academy', time: '30m', icon: '📚' },
              { app: 'Roblox', time: '25m', icon: '🎯' }
            ].map((app, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{app.icon}</span>
                  <span className="font-medium">{app.app}</span>
                </div>
                <span className="text-gray-600">{app.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Website Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Website Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Website</th>
                <th className="text-left py-2">Child</th>
                <th className="text-left py-2">Time</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { site: 'youtube.com/kids', child: 'Emma', time: '2:30 PM', status: 'allowed' },
                { site: 'coolmathgames.com', child: 'Jack', time: '2:15 PM', status: 'allowed' },
                { site: 'socialmedia.com', child: 'Emma', time: '1:45 PM', status: 'blocked' },
                { site: 'educational-site.com', child: 'Jack', time: '1:30 PM', status: 'allowed' }
              ].map((activity, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{activity.site}</td>
                  <td className="py-2">{activity.child}</td>
                  <td className="py-2">{activity.time}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activity.status === 'allowed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ParentalControls = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Content Filters</h3>
          <div className="space-y-4">
            {[
              { category: 'Adult Content', enabled: true },
              { category: 'Violence', enabled: true },
              { category: 'Social Media', enabled: false },
              { category: 'Gaming Sites', enabled: false },
              { category: 'Shopping', enabled: true }
            ].map((filter, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{filter.category}</span>
                <button className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                  filter.enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    filter.enabled ? 'translate-x-6' : 'translate-x-1'
                  } mt-1`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Time Limits */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Daily Time Limits</h3>
          <div className="space-y-4">
            {children.map((child) => (
              <div key={child.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{child.name}</span>
                  <span className="text-sm text-gray-600">{screenTimeData[child.name].limit}h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={screenTimeData[child.name].limit}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bedtime Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Bedtime & Schedule Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children.map((child) => (
            <div key={child.name} className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">{child.name}'s Schedule</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedtime</label>
                  <input type="time" className="w-full p-2 border rounded-md" defaultValue="20:00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Wake Up</label>
                  <input type="time" className="w-full p-2 border rounded-md" defaultValue="07:00" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id={`weekend-${child.name}`} defaultChecked />
                  <label htmlFor={`weekend-${child.name}`} className="text-sm">Different weekend schedule</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Parent Dashboard</h1>
          <p className="text-xl text-gray-600">Monitor and guide your children's online activities</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Children Monitored', value: '2', icon: Users, color: 'bg-blue-500' },
            { label: 'Active Alerts', value: '3', icon: AlertTriangle, color: 'bg-orange-500' },
            { label: 'Safety Score', value: '85%', icon: Shield, color: 'bg-green-500' },
            { label: 'Lessons Completed', value: '12', icon: TrendingUp, color: 'bg-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Children Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map((child) => (
              <div key={child.name} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{child.avatar}</span>
                    <div>
                      <h3 className="font-semibold">{child.name}</h3>
                      <p className="text-sm text-gray-600">Age {child.age} • {child.lastActivity}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    child.status === 'safe' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {child.status === 'safe' ? '✓ Safe' : '⚠ Needs Attention'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className={`border-l-4 p-4 rounded-r-lg ${
                alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                alert.severity === 'medium' ? 'border-orange-500 bg-orange-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600">Child: {alert.child} • {alert.time}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="text-center py-8">
                <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Family Protection Active</h3>
                <p className="text-gray-600">Your children are protected with comprehensive monitoring and safety controls.</p>
              </div>
            )}
            {activeTab === 'monitoring' && <MonitoringTools />}
            {activeTab === 'controls' && <ParentalControls />}
            {activeTab === 'resources' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Parent Safety Guide', description: 'Comprehensive guide to online safety', type: 'PDF' },
                  { title: 'Conversation Starters', description: 'Questions to discuss with your kids', type: 'PDF' },
                  { title: 'Emergency Contacts', description: 'Important numbers and resources', type: 'PDF' },
                  { title: 'Social Media Guide', description: 'Platform-specific safety tips', type: 'PDF' },
                  { title: 'Cyberbullying Response', description: 'What to do if your child is bullied', type: 'PDF' },
                  { title: 'Screen Time Guidelines', description: 'Age-appropriate recommendations', type: 'PDF' }
                ].map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{resource.title}</h4>
                      <Download className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Download {resource.type}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;