import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Professional Journey',
    items: [
      {
        year: '2019 - Present',
        title: 'Distinguished Professor at Stanford',
        description: 'Leading advanced mathematics research and mentoring graduate students. Published 25+ research papers in top-tier journals.',
        achievements: ['Research Excellence Award', '25+ Publications', 'Graduate Student Mentor', 'Department Chair'],
        impact: 'Increased research funding by 300%',
      },
      {
        year: '2014 - 2019',
        title: 'Senior Physics Lecturer at MIT',
        description: 'Developed innovative teaching methodologies and curriculum for undergraduate and graduate physics courses.',
        achievements: ['Teaching Innovation Award', 'Curriculum Development', 'Student Success Rate 98%', 'Research Grant PI'],
        impact: 'Improved student retention by 40%',
      },
      {
        year: '2012 - 2014',
        title: 'Research Associate at Harvard',
        description: 'Conducted groundbreaking research in theoretical physics and mathematics. Assisted in teaching undergraduate courses.',
        achievements: ['Research Grant Recipient', 'Conference Presentations', 'Teaching Assistant Excellence', 'Publication Co-author'],
        impact: 'Published 15+ peer-reviewed papers',
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900',
    heading: 'text-white',
    year: 'text-purple-300',
    title: 'text-purple-300',
    description: 'text-gray-300',
    achievement: 'text-green-400',
    impact: 'text-yellow-400',
  },
};

const TeacherProProfessionalJourney = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full py-16 px-4`}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-4xl lg:text-5xl mb-12 text-center ${style.heading} font-bold`}>{content.heading}</h2>
      <div className="space-y-8">
        {content.items.map((journey, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`font-bold text-lg mb-2 ${style.year}`}>{journey.year}</div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                </div>
                <div className={`text-2xl font-semibold mb-3 ${style.title}`}>{journey.title}</div>
              </div>
            </div>
            
            <div className={`text-lg mb-4 ${style.description}`}>{journey.description}</div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20">
              <div className={`text-lg font-semibold text-sm ${style.impact}`}>🏯 {journey.impact}</div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-white mb-4">Key Achievements:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {journey.achievements.map((achievement, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl text-sm ${style.achievement}`}>
                    <span className="text-green-400">✓</span>
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default TeacherProProfessionalJourney; 