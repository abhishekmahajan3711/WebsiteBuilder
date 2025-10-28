import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Courses Taught',
    items: [
      {
        name: 'Advanced Calculus',
        level: 'Undergraduate & Graduate',
        description: 'Comprehensive study of multivariable calculus, vector analysis, and differential equations.',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Quantum Mechanics',
        level: 'Graduate Level',
        description: 'Advanced quantum theory, wave functions, and quantum systems analysis.',
        image: 'https://uyc.thecenterforsalesstrategy.com/hs-fs/hubfs/21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png?width=1600&name=21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png',
      },
      {
        name: 'Linear Algebra',
        level: 'Undergraduate',
        description: 'Vector spaces, matrices, eigenvalues, and applications in physics and engineering.',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mathematical Physics',
        level: 'Graduate Level',
        description: 'Mathematical methods in physics, including complex analysis and group theory.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Differential Equations',
        level: 'Undergraduate',
        description: 'Ordinary and partial differential equations with applications to physical systems.',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Research Methods',
        level: 'Graduate Level',
        description: 'Advanced research methodologies and statistical analysis techniques.',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50',
    heading: 'text-purple-800 font-bold',
    name: 'text-purple-700',
    level: 'text-indigo-600',
    description: 'text-gray-700',
  },
};

const TeacherModernCoursesTaught = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-16 px-4`}
  >
    <h2 className={`text-3xl lg:text-4xl mb-8 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content.items.map((course, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <img src={course.image} alt={course.name} className="w-full h-48 rounded-lg object-cover mb-4" />
          <div className={`text-xl font-semibold mb-2 ${style.name}`}>{course.name}</div>
          <div className={`font-medium mb-2 ${style.level}`}>{course.level}</div>
          <div className={`text-sm ${style.description}`}>{course.description}</div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default TeacherModernCoursesTaught; 