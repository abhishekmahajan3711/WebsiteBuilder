import React from 'react';
import { motion } from 'framer-motion';


const StudentModernAboutSection = ({ content, style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-3xl mx-auto ${style.bg} ${style.card} p-8 mb-8 flex flex-col md:flex-row items-center gap-8`}
  >
    {content.images && content.images[0] && (
      <img
        src={content.images[0]}
        alt="About"
        className={style.image}
      />
    )}
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
      <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${style.heading}`}>{content.heading}</h2>
      <p className={`text-lg md:text-xl mb-4 ${style.text}`}>{content.text}</p>
      <div className="flex flex-wrap gap-4">
        {content.links && content.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            className={style.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </motion.section>
);

export default StudentModernAboutSection; 