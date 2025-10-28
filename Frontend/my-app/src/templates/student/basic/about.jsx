import React from 'react';
import { motion } from 'framer-motion';

const StudentBasicAboutSection = ({ content, style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-2xl mx-auto ${style.bg} ${style.card} p-6 mb-6`}
  >
    <h2 className={`text-xl md:text-2xl font-semibold mb-2 ${style.heading}`}>{content.heading}</h2>
    <p className={`text-base md:text-lg ${style.text}`}>{content.text}</p>
  </motion.section>
);

export default StudentBasicAboutSection; 