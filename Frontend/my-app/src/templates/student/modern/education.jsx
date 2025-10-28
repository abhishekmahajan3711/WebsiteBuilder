import React from 'react';
import { motion } from 'framer-motion';


const StudentModernEducationSection = ({ content, style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-3xl mx-auto mb-8 ${style.bg}`}
  >
    <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="flex flex-col gap-8">
      {content.items.map((item, idx) => (
        <div key={idx} className={`flex flex-col md:flex-row md:items-center md:justify-between p-6 ${style.card}`}>
          <div>
            <div className={`font-bold text-lg md:text-xl mb-1 ${style.degree}`}>{item.degree}</div>
            <div className={`text-base md:text-lg mb-1 ${style.college}`}>{item.college}</div>
            <div className={`text-xs md:text-sm mb-1 ${style.year}`}>{item.year}</div>
            {item.coursework && <div className={`text-xs md:text-sm mt-1 ${style.coursework}`}>Relevant coursework: {item.coursework}</div>}
          </div>
          <div className={`text-sm md:text-lg font-semibold mt-4 md:mt-0 md:text-right ${style.percentage}`}>{item.percentage}</div>
        </div>
      ))}
    </div>
  </motion.section>
);

export default StudentModernEducationSection; 