
import './App.css'
import Header from './Home/Header';
import Footer from './Home/Footer';
import Home from './Home/Home';
import Signup from './User/Signup';
import Signin from './User/Signin';
import ForgotPassword from './User/ForgotPassword';
import ResetPassword from './User/ResetPassword';
import EmailVerification from './User/EmailVerification';
import TermsAndConditions from './Home/TermsAndConditions';
import PrivacyPolicy from './Home/PrivacyPolicy';
import AboutUs from './Home/AboutUs';
import ContactUs from './Home/ContactUs';
import FAQ from './Home/FAQ';
import Pricing from './Home/Pricing';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import UserDashboard from './UserDashboad/UserDashboard';
import NewWebsite from './NewWebsite/NewWebsite';
import UserPlan from './UserDashboad/UserPlan';
import UserProfile from './UserDashboad/UserProfile';
import EditWebsite from './NewWebsite/EditWebsite';
import WebsitePreview from './NewWebsite/WebsitePreview';
import PublicWebsitePreview from './NewWebsite/PublicWebsitePreview';

function ProtectedRoute({ children }) {
  const user = useSelector(state => state.auth.user);
  const authChecked = useSelector(state => state.auth.authChecked);
  if (!authChecked) return <div style={{minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><span>Loading...</span></div>;
  return user ? children : <Navigate to="/signin" replace />;
}

function AppContent() {
  const location = useLocation();
  
  // Check if current route is a preview route
  const isPreviewRoute = location.pathname.startsWith('/preview/') || location.pathname.startsWith('/public/');

  return (
    <>
      {!isPreviewRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/new-website" element={<ProtectedRoute><NewWebsite /></ProtectedRoute>} />
        <Route path="/dashboard/my-plan" element={<ProtectedRoute><UserPlan /></ProtectedRoute>} />
        <Route path="/dashboard/edit-website" element={<ProtectedRoute><EditWebsite /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/preview/:id" element={<ProtectedRoute><WebsitePreview /></ProtectedRoute>} />
        <Route path="/public/:id" element={<PublicWebsitePreview />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      {!isPreviewRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
