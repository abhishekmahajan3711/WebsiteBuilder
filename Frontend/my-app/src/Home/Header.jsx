import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { resetWebsites } from '../redux/websitesSlice';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to navigate to home and scroll to section
  const handleNav = (section) => (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/'); // Go to home first, while user is still set
    setTimeout(() => {
      dispatch(logout());
      dispatch(resetWebsites());
      setShowLogoutSuccess(true);
    }, 100);
  };

  const handleLogoutSuccessOk = () => {
    setShowLogoutSuccess(false);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-teal-400 to-purple-400 shadow-md sticky top-0 z-50">
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-xs w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-purple-700">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button onClick={confirmLogout} className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">Yes</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition">No</button>
            </div>
          </div>
        </div>
      )}
      {showLogoutSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-xs w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-purple-700">Successfully logged out</h3>
            <button onClick={handleLogoutSuccessOk} className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">OK</button>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white hover:underline">WebBuilder</Link>
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#features" onClick={handleNav('features')} className="text-white hover:text-teal-100 font-medium transition">Features</a>
          <Link to="/pricing" className="text-white hover:text-teal-100 font-medium transition">Pricing</Link>
          <Link to="/about" className="text-white hover:text-teal-100 font-medium transition">About Us</Link>
          <Link to="/contact" className="text-white hover:text-teal-100 font-medium transition">Contact Us</Link>
          <Link to="/faq" className="text-white hover:text-teal-100 font-medium transition">FAQ</Link>
          {user && (
            <Link to="/dashboard" className="px-5 py-2 bg-white text-purple-700 rounded-lg font-semibold shadow hover:bg-teal-100 transition">Dashboard</Link>
          )}
          {user ? (
            <div className="flex items-center space-x-2 ml-4">
              <span className="px-5 py-2 bg-white text-purple-700 rounded-lg font-semibold shadow">{user.name}</span>
              <button onClick={handleLogout} title="Logout" className="ml-2 p-2 rounded-full bg-white hover:bg-teal-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
              </button>
            </div>
          ) : (
            <Link to="/signin" className="ml-4 px-5 py-2 bg-white text-purple-700 rounded-lg font-semibold shadow hover:bg-teal-100 transition">Sign In</Link>
          )}
        </nav>
        <button className="md:hidden text-3xl text-white focus:outline-none" aria-label="Open Menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span>{menuOpen ? "✖" : "☰"}</span>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-600 via-teal-400 to-purple-400 px-4 pb-4">
          <nav className="flex flex-col space-y-3">
            <a href="#features" onClick={handleNav('features')} className="text-white hover:text-teal-100 font-medium transition">Features</a>
            <Link to="/pricing" className="text-white hover:text-teal-100 font-medium transition">Pricing</Link>
            <Link to="/about" className="text-white hover:text-teal-100 font-medium transition">About Us</Link>
            <Link to="/contact" className="text-white hover:text-teal-100 font-medium transition">Contact Us</Link>
            <Link to="/faq" className="text-white hover:text-teal-100 font-medium transition">FAQ</Link>
            {user && (
              <Link to="/dashboard" className="px-5 py-2 bg-white text-purple-700 rounded-lg font-semibold shadow hover:bg-teal-100 transition">Dashboard</Link>
            )}
            {user ? (
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-5 py-2 bg-white text-purple-700 rounded-lg font-semibold shadow">{user.name}</span>
                <button onClick={handleLogout} title="Logout" className="ml-2 p-2 rounded-full bg-white hover:bg-teal-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
                </button>
              </div>
            ) : (
              <Link to="/signin" className="px-5 py-2 bg-white text-purple-700 rounded-lg font-semibold shadow hover:bg-teal-100 transition">Sign In</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
