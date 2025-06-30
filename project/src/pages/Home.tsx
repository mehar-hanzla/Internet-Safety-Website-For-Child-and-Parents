import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Bot, Award, ArrowRight, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      icon: Users,
      title: 'Interactive Kids Learning',
      description: 'Age-appropriate lessons with games and activities to teach internet safety in a fun way.',
      link: '/kids-learning',
      color: 'bg-blue-500'
    },
    {
      icon: Shield,
      title: 'Parent Dashboard',
      description: 'Tools and resources to help parents guide their children\'s online journey safely.',
      link: '/parent-dashboard',
      color: 'bg-green-500'
    },
    {
      icon: Bot,
      title: 'AI Safety Assistant',
      description: 'Get instant help and advice from our AI-powered safety expert available 24/7.',
      link: '/ai-assistant',
      color: 'bg-purple-500'
    },
    {
      icon: Award,
      title: 'Certification Program',
      description: 'Complete courses and earn certificates to validate your internet safety knowledge.',
      link: '/certification',
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Families Protected' },
    { number: '100+', label: 'Interactive Lessons' },
    { number: '98%', label: 'Parent Satisfaction' },
    { number: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Keeping Your Family
                <span className="text-yellow-400"> Safe Online</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Interactive internet safety training for kids and comprehensive tools for parents. 
                Learn about cyberbullying, online scams, and digital citizenship with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/kids-learning"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center"
                >
                  Start Kids Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/parent-dashboard"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200 flex items-center justify-center"
                >
                  Parent Resources
                  <Shield className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
                  <Play className="h-16 w-16 text-white" />
                </div>
                <p className="text-center mt-4 text-blue-100">Watch our introduction video</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Internet Safety Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From interactive learning for kids to comprehensive monitoring tools for parents, 
              we provide everything your family needs to stay safe online.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Families Worldwide
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "NetWise helped my 8-year-old understand online safety in a fun, engaging way. The interactive lessons are fantastic!",
                author: "Sarah Johnson",
                role: "Parent of 2"
              },
              {
                quote: "The parent dashboard gives me peace of mind. I can monitor my kids' progress and get alerts about potential risks.",
                author: "Michael Chen",
                role: "Father"
              },
              {
                quote: "The AI assistant is incredibly helpful. It answered all my questions about cyberbullying and gave practical advice.",
                author: "Lisa Williams",
                role: "Educator"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Your Family Safer Online?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of families who trust NetWise for their internet safety education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/kids-learning"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200"
              >
                Start Free Trial
              </Link>
              <Link
                to="/ai-assistant"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200"
              >
                Try AI Assistant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;