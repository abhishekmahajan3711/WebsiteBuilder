import React from 'react';
import { motion } from 'framer-motion';

const StudentBasicExperienceSection = ({ content, style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-2xl mx-auto mb-6 ${style.bg}`}
  >
    <h2 className={`text-xl md:text-2xl font-semibold mb-4 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="flex flex-col gap-4">
      {content.items.map((item, idx) => (
        <div key={idx} className={`p-4 flex flex-col md:flex-row md:items-center md:justify-between ${style.card}`}>
          <div>
            <div className={`font-bold text-base md:text-lg ${style.role}`}>{item.role}</div>
            <div className={`text-sm md:text-base ${style.company}`}>{item.company}</div>
            <div className={`text-xs md:text-sm ${style.year}`}>{item.year}</div>
            <div className={`text-xs md:text-sm mt-1 ${style.description}`}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

export default StudentBasicExperienceSection; 