import React from 'react';
import { motion } from 'framer-motion';


const TeacherBasicHeroSection = ({ content , style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className={`w-full flex flex-col items-center justify-center py-10 px-4 ${style.bg} ${style.card} mb-8`}
    style={{ minHeight: '320px' }}
  >
    <img
      src={content.images[0]}
      alt="Profile"
      className={`w-28 h-28 rounded-full object-cover shadow mb-4 ${style.border}`}
      style={{ maxWidth: 112, maxHeight: 112 }}
    />
    <h1 className={`text-2xl md:text-3xl mb-1 text-center ${style.heading}`}>{content.heading}</h1>
    <h2 className={`text-lg md:text-xl mb-2 text-center ${style.subheading}`}>{content.subheading}</h2>
    <p className={`text-base md:text-lg text-center max-w-xl ${style.text}`}>{content.text}</p>
  </motion.section>
);

export default TeacherBasicHeroSection; 