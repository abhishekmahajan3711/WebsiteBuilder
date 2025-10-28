import React from 'react';
import { motion } from 'framer-motion';


const TeacherBasicContactUs = ({ content , style }) => (
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
        <li key={idx} className="mb-1">
          <span className={style.type}>{item.type}: </span>
          {item.link ? (
            <a href={item.link} className={style.link} target="_blank" rel="noopener noreferrer">
              <span className={style.value}>{item.value}</span>
            </a>
          ) : (
            <span className={style.value}>{item.value}</span>
          )}
        </li>
      ))}
    </ul>
    <div className={style.note}>{content.note}</div>
  </motion.section>
);

export default TeacherBasicContactUs; 