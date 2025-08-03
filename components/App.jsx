import React, { useState, useEffect, useRef } from 'react';
import Toast from './Toast';
import Dialog from './Dialog';
import EventEmitter from '../utils/EventEmitter';

// Global event emitter instance
const globalEvents = new EventEmitter();

// View Type Manager Hook
function useViewType() {
  const [viewType, setViewType] = useState('default');
  const [prevViewType, setPrevViewType] = useState('default');

  const setViewTypeHandler = (type) => {
    setPrevViewType(viewType);
    setViewType(type);
    globalEvents.emit('onViewTypeChange', {});
  };

  return { viewType, prevViewType, setViewType: setViewTypeHandler };
}

// Toast Manager Hook
function useToastManager() {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ title, variant = 'success' }) => {
    const id = Date.now() + Math.random();
    const toast = { id, title, variant };
    
    setToasts(prev => [toast, ...prev]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return { toasts, showToast, removeToast, clearAllToasts };
}

// Main App Component
function App() {
  const { viewType, setViewType } = useViewType();
  const { toasts, showToast, removeToast } = useToastManager();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize the app
    const initApp = async () => {
      // Simulate initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    initApp();

    // Set global functions
    window.showWelcomeToast = () => {
      showToast({
        title: "Welcome to E-Cell! Ready to start your entrepreneurial journey?",
        variant: "success"
      });
    };

    window.globalEvents = globalEvents;
    window.showToast = showToast;

    // Analytics
    if (window.plausible) {
      window.plausible('custom-event', {
        name: 'session_file_view',
        props: { type: 'space' }
      });
      
      window.plausible('custom-event', {
        name: 'manus_space_show'
      });
    }

    return () => {
      // Cleanup
      delete window.showWelcomeToast;
      delete window.globalEvents;
      delete window.showToast;
    };
  }, [showToast]);

  const handleGetStarted = () => {
    showToast({
      title: "Welcome to E-Cell! Ready to start your entrepreneurial journey?",
      variant: "success"
    });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading E-Cell...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Toast Container */}
      <div className="toast-manager-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            title={toast.title}
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>E-Cell | Entrepreneurship Club</h1>
          <p>Dream, Create and Inspire...</p>
          <button className="btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h2 className="section-title">Welcome to E-Cell</h2>
          <div className="grid grid-2">
            <div className="card">
              <h3>Innovation</h3>
              <p>Fostering innovative ideas and creative solutions for tomorrow's challenges.</p>
            </div>
            <div className="card">
              <h3>Entrepreneurship</h3>
              <p>Building the next generation of entrepreneurs and business leaders.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <div className="grid grid-3">
            <div className="card">
              <h3>🎯 IDEA</h3>
              <p>Research your idea. See if there's a demand. A lot of people have great ideas, but they don't know if there's a need for it.</p>
            </div>
            <div className="card">
              <h3>✨ Create</h3>
              <p>Gathering tools to turn the make-believe world to believe world.</p>
            </div>
            <div className="card">
              <h3>🚀 Inspire</h3>
              <p>Boosting confidence of those who are oppressed by those who can't think out of the box.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Manus Content Root */}
      <ManusContentRoot />
    </div>
  );
}

// Manus Content Root Component
function ManusContentRoot() {
  useEffect(() => {
    // Initialize Manus space editor info
    window.__manus_space_editor_info = {
      spaceId: 'radrbtaa',
      patchList: []
    };

    window.__manus__global_env = {
      apiHost: "https://api.manus.im",
      host: "https://manus.im",
      amplitudeKey: "46ac3f9abb41dd2d17a5785e052bc6d3"
    };
  }, []);

  return <div id="manus-content-root" />;
}

export default App;