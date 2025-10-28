import React from 'react';
import { motion } from 'framer-motion';


const StudentModernCertificatesSection = ({ content, style }) => (
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
        <a
          key={idx}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-6 ${style.card} hover:shadow-2xl transition-shadow duration-300`}
        >
          <div>
            <div className={`font-bold text-lg md:text-xl mb-1 ${style.name}`}>{item.name}</div>
            <div className={`text-base md:text-lg mb-1 ${style.issuer}`}>{item.issuer}</div>
            <div className={`text-xs md:text-sm ${style.year}`}>{item.year}</div>
          </div>
          <div className={`text-xs md:text-base mt-2 md:mt-0 md:text-right ${style.link}`}>View Certificate</div>
        </a>
      ))}
    </div>
  </motion.section>
);

export default StudentModernCertificatesSection; 