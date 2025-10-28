import React from 'react';

const component = {
  content: {
    text: '\u00a9 2025 Alexander Lee. Crafted with excellence.',
    links: [
      { label: 'Terms', url: '#' },
      { label: 'Contact', url: 'mailto:alex@alexlee.dev' },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-[#232526] to-[#414345]',
    text: 'text-yellow-400 font-serif',
    link: 'text-yellow-300 hover:underline font-medium px-2',
    card: 'rounded-t-3xl shadow-xl border-t-4 border-yellow-400',
  },
};

const StudentPremiumFooterSection = ({ content = component.content, style = component.style }) => (
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

export default StudentPremiumFooterSection; 