import React from 'react';



const StudentModernContactSection = ({ content, style }) => (
  <section className={`w-full max-w-3xl mx-auto mb-8 text-center ${style.bg} ${style.card} p-8`}>
    <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${style.heading}`}>{content.heading}</h2>
    <p className={`text-lg md:text-xl mb-4 ${style.text}`}>{content.text}</p>
    <div className="flex flex-wrap justify-center gap-4 mt-4">
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

export default StudentModernContactSection; 