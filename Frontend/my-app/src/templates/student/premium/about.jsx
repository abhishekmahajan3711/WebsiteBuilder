import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'About Me',
    text: 'Award-winning developer, speaker, and mentor. I specialize in building scalable web applications and sharing knowledge at global tech conferences.',
    images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'],
    links: [
      { label: 'CV', url: 'https://alexlee.dev/cv.pdf' },
    ],
  },
  style: {
    bg: 'bg-gradient-to-br from-[#232526] to-[#414345]',
    card: 'rounded-3xl shadow-2xl border-4 border-yellow-400',
    heading: 'text-yellow-400 font-serif',
    text: 'text-white/90',
    link: 'text-yellow-300 hover:underline font-semibold',
    border: 'border-4 border-yellow-400',
    image: 'w-32 h-32 md:w-44 md:h-44 rounded-2xl object-cover shadow-lg border-4 border-yellow-400 mb-6 md:mb-0',
  },
};

const StudentPremiumAboutSection = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-3xl mx-auto ${style.bg} ${style.card} p-10 mb-10 flex flex-col md:flex-row items-center gap-10`}
  >
    {content.images && content.images[0] && (
      <img
        src={content.images[0]}
        alt="About"
        className={style.image}
      />
    )}
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
      <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${style.heading}`}>{content.heading}</h2>
      <p className={`text-lg md:text-xl mb-4 ${style.text}`}>{content.text}</p>
      <div className="flex flex-wrap gap-4">
        {content.links && content.links.map((link) => (
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
    </div>
  </motion.section>
);

export default StudentPremiumAboutSection; 