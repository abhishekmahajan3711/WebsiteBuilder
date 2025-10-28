import React from 'react';

const StudentBasicProjectsSection = ({ content, style }) => (
  <section className={`w-full max-w-2xl mx-auto ${style.bg} p-6 mb-6`}>
    <h2 className={`text-xl md:text-2xl font-semibold mb-4 ${style.heading}`}>{content.heading}</h2>
    <ul className="flex flex-col gap-4">
      {content.items.map((item, idx) => (
        <li key={idx} className={`p-4 flex flex-col md:flex-row md:items-center md:justify-between ${style.card} rounded-lg`}>
          <div>
            <div className={`font-bold text-base md:text-lg ${style.title}`}>{item.title}</div>
            <div className={`text-sm md:text-base ${style.description}`}>{item.description}</div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0 md:text-right">
            {item.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={style.link}>
                {link.label}
              </a>
            ))}
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default StudentBasicProjectsSection; 