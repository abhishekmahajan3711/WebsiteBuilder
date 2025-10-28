import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Student Feedback',
    items: [
      {
        name: 'Alex Chen',
        course: 'Advanced Calculus',
        feedback: 'Dr. Johnson made complex mathematical concepts incredibly accessible. Her teaching style is both engaging and thorough.',
        rating: 5,
      },
      {
        name: 'Sarah Williams',
        course: 'Quantum Mechanics',
        feedback: 'The way she explains quantum theory is mind-blowing. I finally understand the fundamentals thanks to her innovative approach.',
        rating: 5,
      },
      {
        name: 'Michael Rodriguez',
        course: 'Linear Algebra',
        feedback: 'Her real-world applications of linear algebra helped me see the practical side of mathematics. Excellent mentor!',
        rating: 5,
      },
      {
        name: 'Emma Thompson',
        course: 'Mathematical Physics',
        feedback: 'Dr. Johnson\'s research-based teaching approach has inspired me to pursue graduate studies. She\'s truly exceptional.',
        rating: 5,
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50',
    heading: 'text-orange-800 font-bold',
    name: 'text-gray-800',
    course: 'text-orange-600',
    feedback: 'text-gray-700',
    star: 'text-yellow-400',
  },
};

const TeacherModernStudentFeedback = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-16 px-4`}
  >
    <h2 className={`text-3xl lg:text-4xl mb-8 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {content.items.map((feedback, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="mb-4">
            <div className={`text-lg font-semibold ${style.name}`}>{feedback.name}</div>
            <div className={`font-medium text-sm ${style.course}`}>{feedback.course}</div>
          </div>
          <div className={`italic mb-3 ${style.feedback}`}>"{feedback.feedback}"</div>
          <div className="flex gap-1">
            {[...Array(feedback.rating)].map((_, i) => (
              <span key={i} className={`text-lg ${style.star}`}>★</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default TeacherModernStudentFeedback; 