import React from 'react';
import { motion } from 'framer-motion';



const StudentModernHeaderSection = ({ content , style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className={`w-full flex flex-col items-center justify-center py-12 px-4 ${style.bg} ${style.card} mb-8`}
    style={{ minHeight: '340px' }}
  >
    <img
      src={content.images[0]}
      alt="Profile"
      className={`w-32 h-32 rounded-full object-cover shadow-xl mb-6 ${style.border}`}
      style={{ maxWidth: 128, maxHeight: 128 }}
    />
    <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 text-center ${style.heading}`}>{content.heading}</h1>
    <h2 className={`text-xl md:text-2xl font-semibold mb-3 text-center ${style.subheading}`}>{content.subheading}</h2>
    <p className={`text-lg md:text-xl text-center max-w-xl ${style.text}`}>{content.text}</p>
  </motion.section>
);

export default StudentModernHeaderSection; 