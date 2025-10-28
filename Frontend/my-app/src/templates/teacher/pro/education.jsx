import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Education & Qualifications',
    items: [
      {
        degree: 'Ph.D. in Applied Mathematics',
        institution: 'Stanford University',
        year: '2015-2019',
        description: 'Specialized in Mathematical Physics and Quantum Mechanics',
        gpa: '4.0 GPA',
        achievements: ['Summa Cum Laude', 'Research Fellowship', 'Dean\'s List'],
      },
      {
        degree: 'Master of Science in Physics',
        institution: 'MIT',
        year: '2012-2014',
        description: 'Focused on Theoretical Physics and Advanced Mathematics',
        gpa: '3.9 GPA',
        achievements: ['Merit Scholarship', 'Teaching Assistant', 'Conference Presenter'],
      },
      {
        degree: 'Bachelor of Science in Mathematics',
        institution: 'Harvard University',
        year: '2008-2012',
        description: 'Major in Mathematics with minor in Physics',
        gpa: '3.95 GPA',
        achievements: ['Valedictorian', 'Honors Program', 'Research Assistant'],
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900',
    heading: 'text-white font-bold',
    degree: 'text-purple-300',
    institution: 'text-blue-300',
    year: 'text-gray-400',
    description: 'text-gray-300',
    gpa: 'text-yellow-400',
    achievement: 'text-green-400',
  },
};

const TeacherProEducation = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full py-16 px-4`}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-4xl lg:text-5xl mb-12 text-center ${style.heading}`}>{content.heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.items.map((education, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{idx + 1}</span>
              </div>
              <div className={`text-xl font-semibold mb-2 ${style.degree}`}>{education.degree}</div>
              <div className={`font-medium mb-1 ${style.institution}`}>{education.institution}</div>
              <div className={`text-sm mb-2 ${style.year}`}>{education.year}</div>
              <div className={`font-semibold text-sm ${style.gpa}`}>{education.gpa}</div>
              <div className={`text-sm ${style.description}`}>{education.description}</div>
              <div className="mt-4 space-y-1">
                {education.achievements.map((achievement, i) => (
                  <div key={i} className={`text-xs ${style.achievement}`}>• {achievement}</div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default TeacherProEducation; 