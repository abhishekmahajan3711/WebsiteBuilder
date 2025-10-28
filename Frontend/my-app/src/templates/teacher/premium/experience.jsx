import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Professional Experience',
    items: [
      {
        position: 'Distinguished Professor',
        institution: 'Stanford University',
        duration: '2019 - Present',
        description: 'Leading advanced mathematics research and mentoring graduate students. Published 25+ research papers in top-tier journals.',
        achievements: ['Research Excellence Award', '25+ Publications', 'Graduate Student Mentor', 'Department Chair'],
        impact: 'Increased research funding by 300%',
      },
      {
        position: 'Senior Physics Lecturer',
        institution: 'MIT',
        duration: '2014 - 2019',
        description: 'Developed innovative teaching methodologies and curriculum for undergraduate and graduate physics courses.',
        achievements: ['Teaching Innovation Award', 'Curriculum Development', 'Student Success Rate 98%', 'Research Grant PI'],
        impact: 'Improved student retention by 40%',
      },
      {
        position: 'Research Associate',
        institution: 'Harvard University',
        duration: '2012 - 2014',
        description: 'Conducted groundbreaking research in theoretical physics and mathematics. Assisted in teaching undergraduate courses.',
        achievements: ['Research Grant Recipient', 'Conference Presentations', 'Teaching Assistant Excellence', 'Publication Co-author'],
        impact: 'Published 15+ peer-reviewed papers',
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
    heading: 'text-slate-800 font-bold',
    position: 'text-purple-600',
    institution: 'text-blue-600',
    duration: 'text-gray-500',
    description: 'text-gray-600',
    achievement: 'text-green-600',
    impact: 'text-purple-500',
  },
};

const TeacherPremiumExperience = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8`}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl mb-8 lg:mb-12 text-center ${style.heading}`}>{content.heading}</h2>
      <div className="space-y-8 lg:space-y-12">
        {content.items.map((experience, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 border border-purple-100 hover:border-purple-200 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-lg">
                    {idx + 1}
                  </div>
                  <div>
                    <div className={`text-xl lg:text-2xl font-semibold mb-2 ${style.position}`}>{experience.position}</div>
                    <div className={`font-medium mb-1 ${style.institution}`}>{experience.institution}</div>
                    <div className={`text-sm mb-3 ${style.duration}`}>{experience.duration}</div>
                  </div>
                </div>
                <div className={`text-sm lg:text-base leading-relaxed ${style.description}`}>{experience.description}</div>
                <div className="mt-4 lg:mt-6">
                  <div className={`font-semibold text-sm ${style.impact}`}>🎯 {experience.impact}</div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Achievements:</h4>
                <div className="space-y-2">
                  {experience.achievements.map((achievement, i) => (
                    <div key={i} className={`text-sm ${style.achievement}`}>✓ {achievement}</div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default TeacherPremiumExperience; 