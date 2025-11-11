import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../App';

const OAuth2Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useUser();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('OAuth2Callback - Current URL:', window.location.href);
      console.log('OAuth2Callback - Search params:', location.search);
      
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get('token');
      
      console.log('OAuth2Callback - Extracted token:', token ? token.substring(0, 50) + '...' : 'NO TOKEN');

      if (token) {
        console.log('OAuth2Callback - Saving token to localStorage');
        localStorage.setItem('token', token);
        await refreshUser();
        navigate('/');
      } else {
        console.log('OAuth2Callback - No token found, redirecting to signin');
        navigate('/signin');
      }
    };

    handleCallback();
  }, [location, navigate, refreshUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Completing sign in...</p>
      </div>
    </div>
  );
};

export default OAuth2Callback;