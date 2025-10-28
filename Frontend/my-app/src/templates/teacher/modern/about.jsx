import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'About Me',
    text: 'I am a dedicated educator with over 15 years of experience in teaching Advanced Mathematics and Physics. My passion lies in making complex concepts accessible and engaging for students of all levels.',
    longText: 'My teaching philosophy centers around creating an interactive learning environment where students feel confident to explore, question, and discover. I believe in adapting my teaching methods to suit individual learning styles, ensuring every student reaches their full potential.',
    images: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'],
    skills: [
      'Advanced Mathematics',
      'Physics & Engineering',
      'Research Methodology',
      'Student Mentoring',
      'Curriculum Development',
      'Online Teaching',
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-white via-blue-50 to-indigo-50',
    heading: 'text-blue-800 font-bold',
    text: 'text-gray-700',
    longText: 'text-gray-600',
    skill: 'bg-blue-100 text-blue-800',
  },
};

const TeacherModernAbout = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-16 px-4`}
  >
    <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col lg:flex-row items-center gap-8">
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
        <h2 className={`text-3xl lg:text-4xl mb-4 ${style.heading}`}>{content.heading}</h2>
        <p className={`text-lg lg:text-xl mb-4 ${style.text}`}>{content.text}</p>
        <p className={`text-base lg:text-lg mb-6 ${style.longText}`}>{content.longText}</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {content.skills.map((skill, idx) => (
            <div key={idx} className={`px-3 py-2 rounded-lg text-sm font-medium ${style.skill}`}>{skill}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={content.images[0]} alt="Professional teacher" className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl object-cover shadow-lg border-4 border-blue-200" />
      </div>
    </div>
  </motion.section>
);

export default TeacherModernAbout; 