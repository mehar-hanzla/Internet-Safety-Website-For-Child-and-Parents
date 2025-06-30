import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">NetWise</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering families with comprehensive internet safety education through interactive learning and AI-powered assistance.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">support@netwise.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">1-800-NETWISE</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/kids-learning" className="text-gray-300 hover:text-white transition-colors">Kids Learning</Link></li>
              <li><Link to="/parent-dashboard" className="text-gray-300 hover:text-white transition-colors">Parent Tools</Link></li>
              <li><Link to="/ai-assistant" className="text-gray-300 hover:text-white transition-colors">AI Assistant</Link></li>
              <li><Link to="/certification" className="text-gray-300 hover:text-white transition-colors">Certification</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Safety Guides</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 NetWise. All rights reserved. Making the internet safer for families worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;