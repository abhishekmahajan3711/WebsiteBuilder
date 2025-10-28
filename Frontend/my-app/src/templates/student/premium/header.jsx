import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Alexander Lee',
    subheading: 'Full Stack Developer & Tech Speaker',
    text: 'Crafting digital experiences with precision and passion.',
    images: ['https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&q=80'],
    links: [
      { label: 'Personal Site', url: 'https://alexlee.dev' },
      { label: 'YouTube', url: 'https://youtube.com/alexlee' },
      { label: 'GitHub', url: 'https://github.com/alexlee' },
    ],
  },
  style: {
    bg: 'bg-gradient-to-br from-[#232526] to-[#414345]',
    card: 'rounded-3xl shadow-2xl border-4 border-yellow-400',
    heading: 'text-yellow-400 font-serif',
    subheading: 'text-white/90',
    text: 'text-white/80',
    link: 'text-yellow-300 hover:underline font-semibold',
    border: 'border-4 border-yellow-400',
  },
};

const StudentPremiumHeaderSection = ({ content = component.content, style = component.style }) => (
  <motion.header
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className={`w-full max-w-3xl mx-auto ${style.bg} ${style.card} p-10 mb-10 flex flex-col items-center text-center`}
  >
    {content.images[0] && (
      <img
        src={content.images[0]}
        alt="Profile"
        className={`w-32 h-32 md:w-44 md:h-44 rounded-full object-cover shadow-xl mb-6 ${style.border}`}
        style={{ maxWidth: 176, maxHeight: 176 }}
      />
    )}
    <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 ${style.heading}`}>{content.heading}</h1>
    <h2 className={`text-xl md:text-2xl font-semibold mb-3 ${style.subheading}`}>{content.subheading}</h2>
    <p className={`text-lg md:text-xl mb-4 ${style.text}`}>{content.text}</p>
    <div className="flex flex-wrap justify-center gap-4 mt-2">
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
  </motion.header>
);

export default StudentPremiumHeaderSection; 