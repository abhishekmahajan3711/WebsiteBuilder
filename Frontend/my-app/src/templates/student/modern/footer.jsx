import React from 'react';

const StudentModernFooterSection = ({ content , style }) => (
  <footer className={`w-full max-w-3xl mx-auto ${style.bg} ${style.text} ${style.card} p-6 mt-12 text-center`}>
    <div className="mb-2 font-semibold text-lg">{content.text}</div>
    <div className="flex flex-wrap justify-center gap-4">
      {content.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          className={style.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
  </footer>
);

export default StudentModernFooterSection; 