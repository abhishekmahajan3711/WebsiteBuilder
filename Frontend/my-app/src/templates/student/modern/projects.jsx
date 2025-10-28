import React from 'react';
import { motion } from 'framer-motion';


const StudentModernProjectsSection = ({ content , style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-4xl mx-auto mb-8 ${style.bg}`}
  >
    <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="grid gap-10 md:grid-cols-2">
      {content.items.map((item, idx) => (
        <div key={idx} className={`relative group overflow-hidden flex flex-col ${style.card}`}
        >
          {item.image && (
            <div className="relative h-56 w-full mb-0 overflow-hidden rounded-t-3xl">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 ${style.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4`}></div>
            </div>
          )}
          <div className="flex flex-col gap-2 p-6">
            <div className={`font-bold text-xl md:text-2xl ${style.title}`}>{item.title}</div>
            <div className={`text-base md:text-lg ${style.description}`}>{item.description}</div>
            <div className="flex flex-wrap gap-3 mt-4">
              {item.links && item.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={style.link}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

export default StudentModernProjectsSection; 