import React, { useState } from 'react';
import { Gamepad2, Lock, User, MessageCircle, Download, Play, Star, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const KidsLearning = () => {
  const [selectedAge, setSelectedAge] = useState('6-8');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState({
    '6-8': { completed: 3, total: 8 },
    '9-12': { completed: 5, total: 10 },
    '13-16': { completed: 2, total: 12 }
  });

  const ageGroups = [
    { value: '6-8', label: '6-8 Years', color: 'bg-green-500' },
    { value: '9-12', label: '9-12 Years', color: 'bg-blue-500' },
    { value: '13-16', label: '13-16 Years', color: 'bg-purple-500' }
  ];

  const lessons = {
    '6-8': [
      {
        id: 1,
        title: 'Stranger Danger Online',
        description: 'Learn about talking to strangers on the internet',
        duration: '10 min',
        type: 'Interactive Story',
        completed: true,
        icon: User
      },
      {
        id: 2,
        title: 'Password Heroes',
        description: 'Create strong passwords to protect your accounts',
        duration: '15 min',
        type: 'Game',
        completed: true,
        icon: Lock
      },
      {
        id: 3,
        title: 'Kind Words Online',
        description: 'How to be nice to others on the internet',
        duration: '12 min',
        type: 'Video + Quiz',
        completed: true,
        icon: MessageCircle
      },
      {
        id: 4,
        title: 'Safe Sharing',
        description: 'What information is safe to share online',
        duration: '8 min',
        type: 'Interactive Game',
        completed: false,
        icon: User
      }
    ],
    '9-12': [
      {
        id: 1,
        title: 'Cyberbullying Defense',
        description: 'Recognize and respond to online bullying',
        duration: '20 min',
        type: 'Scenario Training',
        completed: true,
        icon: MessageCircle
      },
      {
        id: 2,
        title: 'Social Media Safety',
        description: 'How to use social media responsibly',
        duration: '25 min',
        type: 'Interactive Course',
        completed: true,
        icon: User
      },
      {
        id: 3,
        title: 'Digital Footprint Detective',
        description: 'Understanding your online presence',
        duration: '18 min',
        type: 'Investigation Game',
        completed: true,
        icon: User
      },
      {
        id: 4,
        title: 'Scam Spotter',
        description: 'Identify and avoid online scams',
        duration: '22 min',
        type: 'Challenge Game',
        completed: false,
        icon: Lock
      }
    ],
    '13-16': [
      {
        id: 1,
        title: 'Advanced Privacy Settings',
        description: 'Master privacy controls across platforms',
        duration: '30 min',
        type: 'Technical Training',
        completed: true,
        icon: Lock
      },
      {
        id: 2,
        title: 'Sextortion Awareness',
        description: 'Understand and prevent online exploitation',
        duration: '35 min',
        type: 'Serious Discussion',
        completed: true,
        icon: User
      },
      {
        id: 3,
        title: 'Digital Citizenship',
        description: 'Rights and responsibilities online',
        duration: '28 min',
        type: 'Interactive Course',
        completed: false,
        icon: MessageCircle
      },
      {
        id: 4,
        title: 'Mental Health & Screen Time',
        description: 'Healthy relationship with technology',
        duration: '32 min',
        type: 'Wellness Program',
        completed: false,
        icon: User
      }
    ]
  };

  const InteractiveLesson = ({ lesson, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">{lesson.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">{lesson.description}</p>
        </div>
        
        <div className="p-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
            <Play className="h-16 w-16 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Interactive Lesson Ready!</h4>
            <p className="mb-6">This lesson includes games, videos, and quizzes to make learning fun and engaging.</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Lesson
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Gamepad2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h5 className="font-semibold text-green-800">Interactive Games</h5>
              <p className="text-sm text-green-600">Learn through play</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Play className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-800">Video Stories</h5>
              <p className="text-sm text-blue-600">Engaging scenarios</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h5 className="font-semibold text-purple-800">Earn Badges</h5>
              <p className="text-sm text-purple-600">Track your progress</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kids Internet Safety Learning</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fun, interactive lessons designed for different age groups to teach internet safety through games, stories, and activities.
          </p>
        </motion.div>

        {/* Age Group Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {ageGroups.map((group) => (
            <button
              key={group.value}
              onClick={() => setSelectedAge(group.value)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedAge === group.value
                  ? `${group.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        {/* Progress Overview */}
        <motion.div
          key={selectedAge}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Progress Overview</h2>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-700">
                {progress[selectedAge].completed}/{progress[selectedAge].total} Completed
              </span>
            </div>
          </div>
          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(progress[selectedAge].completed / progress[selectedAge].total) * 100}%`
              }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {Math.round((progress[selectedAge].completed / progress[selectedAge].total) * 100)}% Complete
          </p>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {lessons[selectedAge].map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                lesson.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'
              }`}
              onClick={() => setCurrentLesson(lesson)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${lesson.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <lesson.icon className={`h-6 w-6 ${lesson.completed ? 'text-green-600' : 'text-gray-600'}`} />
                </div>
                {lesson.completed && <Trophy className="h-5 w-5 text-yellow-500 fill-current" />}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {lesson.type}
                </span>
                <span className="text-gray-500">{lesson.duration}</span>
              </div>
              <button className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors ${
                lesson.completed
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                {lesson.completed ? 'Review Lesson' : 'Start Lesson'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Download Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8 text-center"
        >
          <Download className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Download Safety Resources</h2>
          <p className="text-purple-100 mb-6">
            Get printable safety guides, activity sheets, and parent discussion guides for offline learning.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Safety Coloring Book
            </button>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Family Discussion Guide
            </button>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Emergency Contact Sheet
            </button>
          </div>
        </motion.div>
      </div>

      {/* Interactive Lesson Modal */}
      <AnimatePresence>
        {currentLesson && (
          <InteractiveLesson
            lesson={currentLesson}
            onClose={() => setCurrentLesson(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default KidsLearning;