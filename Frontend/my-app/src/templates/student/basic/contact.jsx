import React from 'react';

const StudentBasicContactSection = ({ content, style }) => (
  <section className={`w-full max-w-2xl mx-auto ${style.bg} ${style.card} p-6 mb-6 text-center`}>
    <h2 className={`text-xl md:text-2xl font-semibold mb-2 ${style.heading}`}>{content.heading}</h2>
    <p className={`text-base md:text-lg mb-3 ${style.text}`}>{content.text}</p>
    <div className="flex flex-wrap justify-center gap-3">
      {content.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          className={style.link}
          target={link.url.startsWith('http') ? '_blank' : undefined}
          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  </section>
);

export default StudentBasicContactSection; 