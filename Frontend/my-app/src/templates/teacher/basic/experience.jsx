import React from 'react';
import { motion } from 'framer-motion';


const TeacherBasicExperience = ({ content , style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-xl mx-auto ${style.bg} ${style.card} mb-8`}
  >
    <h2 className={`text-xl md:text-2xl mb-3 ${style.heading}`}>{content.heading}</h2>
    <div className="flex flex-col gap-4">
      {content.items.map((item, idx) => (
        <div key={idx} className="mb-2">
          <div className={`font-bold ${style.role}`}>{item.role}</div>
          <div className={style.place}>{item.place}</div>
          <div className={style.year}>{item.year}</div>
          <div className={style.description}>{item.description}</div>
        </div>
      ))}
    </div>
  </motion.section>
);

export default TeacherBasicExperience; 