import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Education',
    items: [
      {
        degree: 'Ph.D. in Applied Mathematics',
        institution: 'Stanford University',
        year: '2015-2019',
        description: 'Specialized in Mathematical Physics and Quantum Mechanics',
      },
      {
        degree: 'Master of Science in Physics',
        institution: 'MIT',
        year: '2012-2014',
        description: 'Focused on Theoretical Physics and Advanced Mathematics',
      },
      {
        degree: 'Bachelor of Science in Mathematics',
        institution: 'Harvard University',
        year: '2008-2012',
        description: 'Major in Mathematics with minor in Physics',
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50',
    heading: 'text-indigo-800 font-bold',
    degree: 'text-indigo-700',
    institution: 'text-blue-600',
    year: 'text-gray-500',
    description: 'text-gray-700',
  },
};

const TeacherModernEducation = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-12 px-4`}
  >
    <h2 className={`text-3xl lg:text-4xl mb-8 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {content.items.map((education, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className={`text-lg font-semibold mb-2 ${style.degree}`}>{education.degree}</div>
          <div className={`font-medium mb-1 ${style.institution}`}>{education.institution}</div>
          <div className={`text-sm mb-2 ${style.year}`}>{education.year}</div>
          <div className={`text-sm ${style.description}`}>{education.description}</div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default TeacherModernEducation; 