import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Dr. Sarah Johnson',
    subheading: 'Distinguished Professor & Research Scholar',
    text: 'Transforming education through innovative methodologies and cutting-edge research. Leading expert in Advanced Mathematics and Quantum Physics.',
    images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'],
    stats: [
      { number: '20+', label: 'Years Excellence' },
      { number: '1000+', label: 'Students Mentored' },
      { number: '98%', label: 'Success Rate' },
      { number: '50+', label: 'Publications' },
    ],
    badges: ['Ph.D. Stanford', 'MIT Alumni', 'Research Fellow'],
  },
  style: {
    bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    heading: 'text-white font-extrabold',
    subheading: 'text-purple-300 font-semibold',
    text: 'text-gray-300',
    statNumber: 'text-yellow-400',
    statLabel: 'text-gray-400',
    badge: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  },
};

const TeacherProHero = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className={`${style.bg} w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}
  >
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-48 sm:w-72 h-48 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
    </div>

    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-6xl mx-auto">
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8">
        <div className="space-y-4 lg:space-y-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
            {content.badges.map((badge, idx) => (
              <motion.span
                key={idx}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${style.badge}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight ${style.heading}`}>{content.heading}</h1>
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed ${style.subheading}`}>{content.subheading}</h2>
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed ${style.text}`}>{content.text}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 w-full max-w-lg lg:max-w-none">
          {content.stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
            >
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${style.statNumber}`}>{stat.number}</div>
              <div className={`text-xs sm:text-sm ${style.statLabel}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center w-full lg:w-auto">
        <motion.div
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl lg:rounded-3xl blur-xl opacity-30"></div>
          <img 
            src={content.images[0]} 
            alt="Teaching environment" 
            className="relative w-full rounded-2xl lg:rounded-3xl shadow-2xl object-cover border-2 sm:border-4 border-white/20"
          />
        </motion.div>
      </div>
    </div>
  </motion.section>
);

export default TeacherProHero; 