import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/authSlice';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        await axios.post(`${apiUrl}/auth/verify-email`, { token });
        setSuccess(true);
        setLoading(false);
        // If user is logged in, refresh Redux user state
        if (localStorage.getItem('token')) {
          dispatch(loadUser());
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to verify email');
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setError('Invalid verification link');
      setLoading(false);
    }
  }, [token, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <h1 className="text-2xl font-bold text-purple-700 mb-2">Verifying Email</h1>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
            <div className="mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-green-700 mb-2">Email Verified!</h1>
            <p className="text-gray-600 mb-6">Your email address has been successfully verified. You can now access all features of WebBuilder.</p>
            <div className="space-y-3">
              <Link 
                to="/signin" 
                className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link 
                to="/" 
                className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-700 mb-2">Verification Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Link 
              to="/signin" 
              className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Sign In
            </Link>
            <Link 
              to="/forgot-password" 
              className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Request New Verification
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 