import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(state => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (user && submitted) setShowPopup(true);
  }, [user, submitted]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    await dispatch(signinUser(form));
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-teal-50 to-white px-4">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-xs w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-purple-700">Signin Successful!</h3>
            <p className="mb-6">Welcome back! You have signed in successfully.</p>
            <button onClick={handlePopupOk} className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">OK</button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">Sign In</h2>
        {error && submitted && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter your email" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required placeholder="Enter your password" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10" />
            <button type="button" tabIndex={-1} className="absolute right-2 top-2 text-gray-500" onClick={() => setShowPassword(v => !v)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition">
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <div className="text-center mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-teal-600 hover:underline">Sign Up</Link>
        </div>
        <div className="text-center mt-2 text-sm">
          <Link to="/forgot-password" className="text-purple-600 hover:underline">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
