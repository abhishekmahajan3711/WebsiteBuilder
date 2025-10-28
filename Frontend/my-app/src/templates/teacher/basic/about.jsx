import React from 'react';
import { motion } from 'framer-motion';


const TeacherBasicAboutMe = ({ content , style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-2xl mx-auto ${style.bg} ${style.card} p-6 mb-8 flex flex-col items-center`}
  >
    <h2 className={`text-xl md:text-2xl mb-2 ${style.heading}`}>{content.heading}</h2>
    <p className={`text-base md:text-lg text-center ${style.text}`}>{content.text}</p>
  </motion.section>
);

export default TeacherBasicAboutMe; 