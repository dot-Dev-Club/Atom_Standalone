import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Event from './pages/Event';
import EventModalDemo from './components/events/EventModalDemo';

const TestRoutes: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        {/* Simple Navigation */}
        <nav className="p-4 border-b border-glass-border">
          <div className="max-w-4xl mx-auto flex gap-4">
            <Link 
              to="/events" 
              className="text-atom-primary hover:text-electric transition-colors"
            >
              Events Page
            </Link>
            <Link 
              to="/modal-demo" 
              className="text-atom-primary hover:text-electric transition-colors"
            >
              Modal Demo
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/events" element={<Event />} />
          <Route path="/modal-demo" element={<EventModalDemo />} />
          <Route path="/" element={
            <div className="p-8 text-center">
              <h1 className="text-4xl font-bold gradient-text mb-8">
                Modern Event Modal Integration Test
              </h1>
              <div className="space-y-4">
                <div>
                  <Link 
                    to="/events" 
                    className="bg-gradient-to-r from-atom-primary to-electric px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity inline-block"
                  >
                    Test Events Page
                  </Link>
                </div>
                <div>
                  <Link 
                    to="/modal-demo" 
                    className="bg-gradient-to-r from-electric to-atom-primary px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity inline-block"
                  >
                    Test Modal Demo
                  </Link>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default TestRoutes;