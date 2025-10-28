import React from 'react';
const Footer = ({ content }) => (
  <footer className="py-4 px-6 bg-gray-100 rounded-xl text-center text-gray-600 mt-8">
    <div>{content?.text || '© 2025 My Website. All rights reserved.'}</div>
  </footer>
);
export default Footer;
