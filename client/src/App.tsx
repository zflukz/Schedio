import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage, { User } from './pages/LoginPage';
import Landing from './pages/Landing';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Handle login
  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
          }
        />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Landing user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-red-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <a
                  href="/login"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Go to Login
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
