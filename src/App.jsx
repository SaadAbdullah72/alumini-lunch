import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import SnakeBorder from './components/SnakeBorder';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import { AdminProvider } from './context/AdminContext';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import SmoothScroll from './components/SmoothScroll';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate high-security check / loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <AdminProvider>
      {loading ? (
        <Preloader />
      ) : (
        <ErrorBoundary>
          <div className="app-container">
            <SmoothScroll />
            <ScrollProgress />
            <CustomCursor />
            <SnakeBorder />
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </AnimatePresence>
          </div>
        </ErrorBoundary>
      )}
    </AdminProvider>
  );
}

export default App;
