import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Dr. Sarah Johnson',
    subheading: 'Passionate Educator & Research Scholar',
    text: 'Empowering students through innovative teaching methods and personalized learning experiences. Specializing in Advanced Mathematics and Physics.',
    images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'],
    stats: [
      { number: '15+', label: 'Years Experience' },
      { number: '500+', label: 'Students Taught' },
      { number: '95%', label: 'Success Rate' },
    ],
  },
  style: {
    bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    heading: 'text-blue-800 font-extrabold',
    subheading: 'text-indigo-600 font-semibold',
    text: 'text-gray-700',
    statNumber: 'text-blue-600',
    statLabel: 'text-gray-600',
  },
};

const TeacherModernHero = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className={`${style.bg} w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8`}
  >
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8">
          <div className="space-y-4 lg:space-y-6">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight ${style.heading}`}>{content.heading}</h1>
            <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed ${style.subheading}`}>{content.subheading}</h2>
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed ${style.text}`}>{content.text}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-md lg:max-w-none">
            {content.stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="text-center bg-white rounded-xl p-3 sm:p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              >
                <div className={`text-2xl sm:text-3xl font-bold ${style.statNumber}`}>{stat.number}</div>
                <div className={`text-xs sm:text-sm ${style.statLabel}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center w-full lg:w-auto">
          <motion.img 
            src={content.images[0]} 
            alt="Teaching environment" 
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl lg:rounded-3xl shadow-2xl object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  </motion.section>
);

export default TeacherModernHero; 