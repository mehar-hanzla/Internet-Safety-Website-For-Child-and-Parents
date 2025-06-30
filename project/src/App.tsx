import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import KidsLearning from './pages/KidsLearning';
import ParentDashboard from './pages/ParentDashboard';
import AIAssistant from './pages/AIAssistant';
import Certification from './pages/Certification';
import Resources from './pages/Resources';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kids-learning" element={<KidsLearning />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;