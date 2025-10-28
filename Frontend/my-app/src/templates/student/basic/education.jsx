import React from 'react';
import { motion } from 'framer-motion';

const StudentBasicEducationSection = ({ content, style }) => (
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
            <div className={`font-bold text-base md:text-lg ${style.degree}`}>{item.degree}</div>
            <div className={`text-sm md:text-base ${style.college}`}>{item.college}</div>
            <div className={`text-xs md:text-sm ${style.year}`}>{item.year}</div>
            {item.coursework && <div className={`text-xs md:text-sm mt-1 ${style.coursework}`}>Relevant coursework: {item.coursework}</div>}
          </div>
          <div className={`text-sm md:text-base font-semibold mt-2 md:mt-0 md:text-right ${style.percentage}`}>{item.percentage}</div>
        </div>
      ))}
    </div>
  </motion.section>
);

export default StudentBasicEducationSection; 