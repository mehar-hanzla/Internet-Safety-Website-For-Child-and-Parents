import React from 'react';
import { Shield, Users, Target, Award, Heart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Safety Officer',
      bio: 'Former FBI cybersecurity expert with 15 years of experience in online safety education.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Child Psychology Expert',
      bio: 'Licensed child psychologist specializing in digital behavior and online learning.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Education Director',
      bio: 'Former elementary school principal with expertise in age-appropriate curriculum design.',
      avatar: '👩‍🏫'
    },
    {
      name: 'David Park',
      role: 'Technology Lead',
      bio: 'AI and machine learning specialist focused on creating safe, intelligent educational tools.',
      avatar: '👨‍💻'
    }
  ];

  const milestones = [
    { year: '2020', event: 'NetWise founded with mission to make internet safety accessible' },
    { year: '2021', event: 'Launched first interactive safety curriculum for elementary students' },
    { year: '2022', event: 'Reached 10,000 families with comprehensive safety training' },
    { year: '2023', event: 'Introduced AI-powered safety assistant and parent monitoring tools' },
    { year: '2024', event: 'Expanded to serve over 50,000 families across 25 countries' },
    { year: '2025', event: 'Launching advanced certification programs for educators and parents' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every feature and lesson is designed with user safety as the primary concern.'
    },
    {
      icon: Users,
      title: 'Family-Centered',
      description: 'We believe internet safety education works best when the whole family is involved.'
    },
    {
      icon: Heart,
      title: 'Empathy-Driven',
      description: 'We understand the challenges families face and provide supportive, non-judgmental guidance.'
    },
    {
      icon: Globe,
      title: 'Accessible to All',
      description: 'Quality internet safety education should be available to every family, regardless of background.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About NetWise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make the internet a safer place for families worldwide through 
            innovative education, cutting-edge technology, and compassionate support.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 mb-16 text-center"
        >
          <Target className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            To empower families with the knowledge, tools, and confidence they need to navigate the digital world safely. 
            We believe that with proper education and support, the internet can be a positive force in every child's life.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              NetWise was born from a simple observation: while technology advances rapidly, internet safety education 
              hasn't kept pace. Traditional approaches often fail to engage children or provide parents with practical, 
              actionable guidance.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our founders, a team of cybersecurity experts, child psychologists, and educators, came together with a 
              shared vision: create an internet safety platform that's both comprehensive and engaging, serious about 
              safety yet fun for kids to use.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we're proud to serve families worldwide with interactive lessons, AI-powered assistance, and 
              evidence-based resources that make internet safety education accessible, effective, and even enjoyable.
            </p>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-green-100">Families Protected</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-green-100">Lessons Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-green-100">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-green-100">Parent Satisfaction</div>
            </div>
          </div>
        </motion.div>

        {/* Awards and Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                award: 'Best Educational Technology Platform 2024',
                organization: 'EdTech Awards',
                icon: Award
              },
              {
                award: 'Family Safety Innovation Award',
                organization: 'National Safety Council',
                icon: Shield
              },
              {
                award: 'Top 10 Parenting Apps',
                organization: 'Parents Magazine',
                icon: Users
              }
            ].map((recognition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <recognition.icon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{recognition.award}</h3>
                <p className="text-gray-600">{recognition.organization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;