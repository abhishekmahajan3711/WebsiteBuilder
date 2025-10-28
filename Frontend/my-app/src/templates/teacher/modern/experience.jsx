import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Professional Experience',
    items: [
      {
        position: 'Senior Mathematics Professor',
        institution: 'Stanford University',
        duration: '2019 - Present',
        description: 'Teaching advanced mathematics courses and conducting research in applied mathematics. Mentoring graduate students and publishing research papers.',
      },
      {
        position: 'Physics Lecturer',
        institution: 'MIT',
        duration: '2014 - 2019',
        description: 'Taught undergraduate and graduate physics courses. Developed innovative teaching methodologies and curriculum.',
      },
      {
        position: 'Research Assistant',
        institution: 'Harvard University',
        duration: '2012 - 2014',
        description: 'Conducted research in theoretical physics and mathematics. Assisted in teaching undergraduate courses.',
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50',
    heading: 'text-blue-800 font-bold',
    position: 'text-blue-700',
    institution: 'text-indigo-600',
    duration: 'text-gray-500',
    description: 'text-gray-700',
  },
};

const TeacherModernExperience = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-16 px-4`}
  >
    <h2 className={`text-3xl lg:text-4xl mb-8 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="space-y-8">
      {content.items.map((experience, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          className="flex flex-col lg:flex-row items-start gap-6"
        >
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
            <div className={`text-xl font-semibold mb-2 ${style.position}`}>{experience.position}</div>
            <div className={`font-medium mb-1 ${style.institution}`}>{experience.institution}</div>
            <div className={`text-sm mb-3 ${style.duration}`}>{experience.duration}</div>
            <div className={style.description}>{experience.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default TeacherModernExperience; 