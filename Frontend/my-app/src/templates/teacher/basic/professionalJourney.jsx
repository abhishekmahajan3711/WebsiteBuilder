import React from 'react';
import { motion } from 'framer-motion';


const TeacherBasicProfessionalJourney = ({ content , style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-xl mx-auto ${style.bg} ${style.card} mb-8`}
  >
    <h2 className={`text-xl md:text-2xl mb-3 ${style.heading}`}>{content.heading}</h2>
    <ul>
      {content.items.map((item, idx) => (
        <li key={idx} className="mb-2 flex gap-2 items-center">
          <span className={style.year}>{item.year}:</span>
          <span className={style.milestone}>{item.milestone}</span>
        </li>
      ))}
    </ul>
  </motion.section>
);

export default TeacherBasicProfessionalJourney; 