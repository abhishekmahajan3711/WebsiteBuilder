import React from 'react';
import { motion } from 'framer-motion';

const StudentModernAchievementsSection = ({ content, style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-3xl mx-auto mb-8 ${style.bg}`}
  >
    <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${style.heading}`}>{content.heading}</h2>
    <ul className="flex flex-col gap-8">
      {content.items.map((item, idx) => (
        <li key={idx} className={`flex items-center gap-6 p-6 ${style.card}`}
        >
          <span className={`${style.icon}`}>{item.icon}</span>
          <div className="flex-1">
            <div className={`font-bold text-lg md:text-xl mb-1 ${style.title}`}>{item.title}</div>
            <div className={`text-base md:text-lg mb-1 ${style.description}`}>{item.description}</div>
            <div className={`text-xs md:text-sm ${style.date}`}>{item.date}</div>
          </div>
        </li>
      ))}
    </ul>
  </motion.section>
);

export default StudentModernAchievementsSection; 