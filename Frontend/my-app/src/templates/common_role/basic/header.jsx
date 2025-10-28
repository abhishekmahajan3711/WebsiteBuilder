import React from 'react';
const Header = ({ content }) => (
  <header className="py-4 px-6 bg-white rounded-xl shadow flex items-center justify-between mb-8">
    <div className="text-xl font-bold text-purple-700">{content?.title || 'My Website'}</div>
    <nav>
      <ul className="flex gap-4">
        {(content?.navLinks || ['Home', 'About', 'Contact']).map((link, idx) => (
          <li key={idx} className="text-teal-600 hover:underline cursor-pointer">{link}</li>
        ))}
      </ul>
    </nav>
  </header>
);
export default Header;
