import React from 'react';


const StudentBasicFooterSection = ({ content, style }) => (
  <footer className={`w-full max-w-2xl mx-auto ${style.bg} ${style.text} ${style.card} p-4 mt-8 text-center`}>
    <div className="mb-2">{content.text}</div>
    <div className="flex flex-wrap justify-center gap-3">
      {content.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          className={style.link}
        >
          {link.label}
        </a>
      ))}
    </div>
  </footer>
);

export default StudentBasicFooterSection; 