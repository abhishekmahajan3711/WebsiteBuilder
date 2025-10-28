import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Courses Taught',
    items: [
      {
        name: 'Advanced Calculus & Analysis',
        level: 'Graduate Level',
        description: 'Comprehensive study of multivariable calculus, vector analysis, and differential equations with real-world applications.',
        students: '150+ Students',
        rating: '4.9/5.0',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Quantum Mechanics & Theory',
        level: 'Graduate Level',
        description: 'Advanced quantum theory, wave functions, and quantum systems analysis with laboratory components.',
        students: '120+ Students',
        rating: '4.8/5.0',
        image: 'https://uyc.thecenterforsalesstrategy.com/hs-fs/hubfs/21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png?width=1600&name=21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png',
      },
      {
        name: 'Linear Algebra & Applications',
        level: 'Undergraduate',
        description: 'Vector spaces, matrices, eigenvalues, and applications in physics and engineering.',
        students: '200+ Students',
        rating: '4.9/5.0',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Mathematical Physics',
        level: 'Graduate Level',
        description: 'Mathematical methods in physics, including complex analysis and group theory.',
        students: '80+ Students',
        rating: '4.7/5.0',
        image: 'https://uyc.thecenterforsalesstrategy.com/hs-fs/hubfs/21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png?width=1600&name=21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png',
      },
      {
        name: 'Differential Equations',
        level: 'Undergraduate',
        description: 'Ordinary and partial differential equations with applications to physical systems.',
        students: '180+ Students',
        rating: '4.8/5.0',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
      },
      {
        name: 'Research Methods & Statistics',
        level: 'Graduate Level',
        description: 'Advanced research methodologies and statistical analysis techniques for academic research.',
        students: '60+ Students',
        rating: '4.9/5.0',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
    heading: 'text-slate-800 font-bold',
    name: 'text-purple-700',
    level: 'text-blue-600',
    description: 'text-gray-700',
    students: 'text-green-600',
    rating: 'text-purple-600',
  },
};

const TeacherPremiumCoursesTaught = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full mx-auto py-16 px-16`}
  >
    <h2 className={`text-4xl lg:text-5xl mb-12 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {content.items.map((course, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="bg-white rounded-3xl shadow-2xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2"
        >
          <div className="relative mb-4">
            <img src={course.image} alt={course.name} className="w-full h-48 rounded-2xl object-cover mb-4" />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {course.rating}
            </div>
          </div>
          <div className={`text-xl font-semibold mb-2 ${style.name}`}>{course.name}</div>
          <div className={`font-medium mb-2 ${style.level}`}>{course.level}</div>
          <div className={`text-sm ${style.description}`}>{course.description}</div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-purple-200">
            <div className={`text-sm font-medium ${style.students}`}>👥 {course.students}</div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">
                  {i < Math.floor(parseFloat(course.rating)) ? '★' : '☆'}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default TeacherPremiumCoursesTaught; 