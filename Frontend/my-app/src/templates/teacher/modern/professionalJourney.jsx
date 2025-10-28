import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Professional Journey',
    items: [
      {
        year: '2019 - Present',
        title: 'Senior Professor at Stanford',
        description: 'Leading advanced mathematics research and mentoring graduate students. Published 15+ research papers in top-tier journals.',
        achievements: ['Research Excellence Award', '15+ Publications', 'Graduate Student Mentor'],
      },
      {
        year: '2014 - 2019',
        title: 'Physics Lecturer at MIT',
        description: 'Developed innovative teaching methodologies and curriculum for undergraduate and graduate physics courses.',
        achievements: ['Teaching Innovation Award', 'Curriculum Development', 'Student Success Rate 95%'],
      },
      {
        year: '2012 - 2014',
        title: 'Research Assistant at Harvard',
        description: 'Conducted groundbreaking research in theoretical physics and mathematics. Assisted in teaching undergraduate courses.',
        achievements: ['Research Grant Recipient', 'Conference Presentations', 'Teaching Assistant Excellence'],
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50',
    heading: 'text-purple-800 font-bold',
    year: 'text-purple-600',
    title: 'text-purple-700',
    description: 'text-gray-700',
    achievement: 'text-gray-600',
    check: 'text-green-500',
  },
};

const TeacherModernProfessionalJourney = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-12 px-4`}
  >
    <h2 className={`text-3xl lg:text-4xl mb-8 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="space-y-8">
      {content.items.map((journey, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: idx * 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className={`font-bold text-lg mb-2 ${style.year}`}>{journey.year}</div>
          <div className={`text-2xl font-semibold mb-3 ${style.title}`}>{journey.title}</div>
          <div className={`mb-4 ${style.description}`}>{journey.description}</div>
          <div className="space-y-2">
            {journey.achievements.map((achievement, i) => (
              <div key={i} className={`flex items-center gap-2 text-sm ${style.achievement}`}>
                <span className={style.check}>✓</span>
                {achievement}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default TeacherModernProfessionalJourney; 