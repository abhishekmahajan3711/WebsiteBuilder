import React from 'react';
const LawyerBasicHeroSection = ({ content }) => (
  <div className="p-6 rounded-xl bg-white shadow text-center">
    <h2 className="text-2xl font-bold text-teal-700 mb-2">{content?.title || 'Lawyer Basic Hero Section'}</h2>
    <p className="text-gray-600">{content?.subtitle || 'Welcome to the lawyer website!'}</p>
  </div>
);
export default LawyerBasicHeroSection; 