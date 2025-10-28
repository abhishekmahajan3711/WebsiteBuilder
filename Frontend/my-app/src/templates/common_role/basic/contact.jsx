import React from 'react';
const Contact = ({ content }) => (
  <section className="p-6 rounded-xl bg-white shadow text-center my-6">
    <h3 className="text-xl font-bold text-teal-700 mb-2">{content?.heading || 'Contact Us'}</h3>
    <p className="text-gray-600">{content?.email || 'contact@example.com'}</p>
  </section>
);
export default Contact; 