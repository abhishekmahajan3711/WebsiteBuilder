import React from 'react';
const About = ({ content }) => (
  <section className="p-6 rounded-xl bg-white shadow text-center my-6">
    <h3 className="text-xl font-bold text-teal-700 mb-2">{content?.heading || 'About Us'}</h3>
    <p className="text-gray-600">{content?.text || 'This is the about section of the website.'}</p>
  </section>
);
export default About; 