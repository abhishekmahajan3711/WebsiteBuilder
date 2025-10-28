import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'About Me',
    text: 'I am a distinguished educator with over 20 years of experience in teaching Advanced Mathematics and Physics. My passion lies in making complex concepts accessible and engaging for students of all levels.',
    images: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'],
    skills: [
      'Advanced Mathematics',
      'Quantum Physics',
      'Research Methodology',
      'Student Mentoring',
      'Curriculum Development',
      'Online Teaching',
      'Conference Speaking',
      'Academic Publishing',
    ],
    highlights: [
      { icon: '🎓', text: 'Ph.D. from Stanford University' },
      { icon: '🏆', text: 'Multiple Teaching Awards' },
      { icon: '📚', text: '50+ Research Publications' },
      { icon: '🌟', text: '98% Student Success Rate' },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900',
    heading: 'text-white font-bold',
    text: 'text-gray-300',
    longText: 'text-gray-400',
    skill: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    highlightIcon: 'text-2xl',
    highlightText: 'text-gray-300',
  },
};

const TeacherProAbout = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full py-12 px-4`}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-4xl lg:text-5xl mb-8 text-center ${style.heading}`}>{content.heading}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
          <p className={`text-lg lg:text-xl mb-4 ${style.text}`}>{content.text}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {content.highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 p-3 rounded-xl border border-purple-500/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <span className={style.highlightIcon}>{highlight.icon}</span>
                <span className={`font-medium ${style.highlightText}`}>{highlight.text}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {content.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                className={`px-4 py-2 rounded-xl text-sm font-medium ${style.skill}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20"></div>
            <img src={content.images[0]} alt="Professional teacher" className="relative w-102 h-102 rounded-3xl object-cover shadow-2xl border-4 border-purple-500/20" />
          </motion.div>
        </div>
      </div>
    </div>
  </motion.section>
);

export default TeacherProAbout; 