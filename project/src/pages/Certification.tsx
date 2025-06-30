import React, { useState } from 'react';
import { Award, CheckCircle, Clock, Download, Star, Trophy, Play, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Certification = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [completedCourses, setCompletedCourses] = useState(['basic-safety']);

  const courses = [
    {
      id: 'basic-safety',
      title: 'Internet Safety Fundamentals',
      description: 'Essential knowledge for safe internet use',
      level: 'Beginner',
      duration: '45 min',
      modules: 8,
      certificate: 'Digital Citizenship Certificate',
      completed: true,
      score: 95,
      color: 'bg-green-500'
    },
    {
      id: 'parent-tools',
      title: 'Parental Monitoring & Controls',
      description: 'Advanced tools for protecting your family',
      level: 'Intermediate',
      duration: '60 min',
      modules: 10,
      certificate: 'Certified Family Safety Guardian',
      completed: false,
      progress: 60,
      color: 'bg-blue-500'
    },
    {
      id: 'cyberbullying',
      title: 'Cyberbullying Prevention & Response',
      description: 'Comprehensive training on handling online harassment',
      level: 'Advanced',
      duration: '90 min',
      modules: 12,
      certificate: 'Anti-Cyberbullying Specialist',
      completed: false,
      progress: 25,
      color: 'bg-purple-500'
    },
    {
      id: 'educator',
      title: 'Educator Internet Safety Program',
      description: 'Professional development for teachers and counselors',
      level: 'Professional',
      duration: '120 min',
      modules: 15,
      certificate: 'Certified Internet Safety Educator',
      completed: false,
      progress: 0,
      color: 'bg-orange-500'
    }
  ];

  const sampleQuiz = {
    id: 'basic-safety-quiz',
    title: 'Internet Safety Fundamentals Quiz',
    questions: [
      {
        id: 1,
        question: 'What should you do if someone you don\'t know tries to contact you online?',
        options: [
          'Give them your personal information',
          'Meet them in person immediately',
          'Tell a trusted adult and don\'t respond',
          'Share your location with them'
        ],
        correct: 2
      },
      {
        id: 2,
        question: 'Which of these is an example of a strong password?',
        options: [
          'password123',
          'MyBirthday2010',
          'Tr0ub4dor&3',
          'qwerty'
        ],
        correct: 2
      },
      {
        id: 3,
        question: 'What should you do if you encounter cyberbullying?',
        options: [
          'Respond with mean messages back',
          'Keep it to yourself',
          'Block, report, and tell a trusted adult',
          'Delete your social media accounts'
        ],
        correct: 2
      }
    ]
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateQuizScore = () => {
    let correct = 0;
    sampleQuiz.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / sampleQuiz.questions.length) * 100);
  };

  const CourseModal = ({ course, onClose }) => (
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
            <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold">{course.duration}</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-semibold">{course.modules} Modules</div>
              <div className="text-sm text-gray-600">Lessons</div>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold">{course.level}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-lg mb-4">Course Modules</h4>
            <div className="space-y-3">
              {[
                'Introduction to Internet Safety',
                'Password Security & Account Protection',
                'Social Media Privacy Settings',
                'Recognizing Online Scams',
                'Cyberbullying Prevention',
                'Safe Communication Online',
                'Digital Footprint Management',
                'Emergency Response Procedures'
              ].slice(0, course.modules).map((module, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    course.completed || (course.progress || 0) > (index * 10)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {course.completed || (course.progress || 0) > (index * 10) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className={course.completed || (course.progress || 0) > (index * 10) ? 'text-gray-900' : 'text-gray-500'}>
                    {module}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            {course.completed ? (
              <>
                <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Award className="h-5 w-5 mr-2" />
                  Download Certificate
                </button>
                <button 
                  onClick={() => setActiveQuiz(sampleQuiz)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Retake Quiz
                </button>
              </>
            ) : (
              <>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Play className="h-5 w-5 mr-2" />
                  {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                </button>
                {course.progress >= 80 && (
                  <button 
                    onClick={() => setActiveQuiz(sampleQuiz)}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Trophy className="h-5 w-5 mr-2" />
                    Take Final Quiz
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const QuizModal = ({ quiz, onClose }) => (
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
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">{quiz.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-4">
                  {index + 1}. {question.question}
                </h4>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={quizAnswers[question.id] === optionIndex}
                        onChange={() => handleQuizAnswer(question.id, optionIndex)}
                        className="text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                const score = calculateQuizScore();
                alert(`Quiz completed! Your score: ${score}%${score >= 80 ? ' - Passed!' : ' - Please review and try again.'}`);
                if (score >= 80) {
                  onClose();
                }
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Submit Quiz
            </button>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Internet Safety Certification</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Earn recognized certificates in internet safety through our comprehensive training programs and assessments.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1</div>
              <div className="text-gray-600">Certificates Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">4</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">2.5</div>
              <div className="text-gray-600">Hours Completed</div>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${course.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  {course.completed ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <Lock className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {course.completed && (
                    <>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{course.score}%</span>
                    </>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Level:</span>
                  <div className="font-medium">{course.level}</div>
                </div>
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <div className="font-medium">{course.duration}</div>
                </div>
                <div>
                  <span className="text-gray-500">Modules:</span>
                  <div className="font-medium">{course.modules}</div>
                </div>
              </div>

              {!course.completed && course.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Certificate:</strong> {course.certificate}
                </p>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    course.completed
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {course.completed ? 'View Certificate' : 'Start Course'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates Earned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8"
        >
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Your Achievements</h2>
            <p className="text-purple-100 mb-6">
              Showcase your internet safety expertise with our recognized certifications
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {completedCourses.map((courseId) => {
                const course = courses.find(c => c.id === courseId);
                return course ? (
                  <div key={courseId} className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                    <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">{course.certificate}</h4>
                    <p className="text-sm text-purple-100">Score: {course.score}%</p>
                    <button className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center mx-auto">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
        {activeQuiz && (
          <QuizModal
            quiz={activeQuiz}
            onClose={() => setActiveQuiz(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certification;