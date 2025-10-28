import React from 'react';
import { motion } from 'framer-motion';


const TeacherBasicPrivateClassFees = ({ content , style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-xl mx-auto ${style.bg} ${style.card} mb-8`}
  >
    <h2 className={`text-xl md:text-2xl mb-3 ${style.heading}`}>{content.heading}</h2>
    <ul className="mb-2">
      {content.items.map((item, idx) => (
        <li key={idx} className="flex justify-between mb-1">
          <span className={style.type}>{item.type}</span>
          <span className={style.fee}>{item.fee}</span>
        </li>
      ))}
    </ul>
    <div className={style.note}>{content.note}</div>
  </motion.section>
);

export default TeacherBasicPrivateClassFees; 