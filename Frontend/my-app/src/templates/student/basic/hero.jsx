import React from 'react';
import { motion } from 'framer-motion';


const StudentBasicHeroSection = ({ content,style }) => (
  <motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className={`w-full max-w-2xl mx-auto ${style.bg} ${style.card} p-6 mb-6 flex flex-col items-center text-center`}
>
  <img
    src={content.images[0]}
    alt="Profile"
    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-4"
    style={{ maxWidth: 112, maxHeight: 112 }}
  />
  <h1 className={`text-2xl md:text-3xl font-bold mb-1 ${style.heading}`}>{content.heading}</h1>
  <h2 className={`text-lg md:text-xl mb-2 ${style.subheading}`}>{content.subheading}</h2>
  <p className={`text-base md:text-lg max-w-md ${style.text}`}>{content.text}</p>
</motion.section>
);
export default StudentBasicHeroSection; 