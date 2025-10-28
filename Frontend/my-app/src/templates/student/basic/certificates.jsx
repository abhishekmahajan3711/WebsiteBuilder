import React from 'react';
import { motion } from 'framer-motion';

const StudentBasicCertificatesSection = ({ content, style }) => (
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
        <a
          key={idx}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-4 flex flex-col md:flex-row md:items-center md:justify-between hover:bg-blue-50 transition-colors duration-200 ${style.card}`}
        >
          <div>
            <div className={`font-bold text-base md:text-lg ${style.name}`}>{item.name}</div>
            <div className={`text-sm md:text-base ${style.issuer}`}>{item.issuer}</div>
            <div className={`text-xs md:text-sm ${style.year}`}>{item.year}</div>
          </div>
          <div className={`text-xs md:text-base mt-2 md:mt-0 md:text-right underline ${style.link}`}>View Certificate</div>
        </a>
      ))}
    </div>
  </motion.section>
);

export default StudentBasicCertificatesSection; 