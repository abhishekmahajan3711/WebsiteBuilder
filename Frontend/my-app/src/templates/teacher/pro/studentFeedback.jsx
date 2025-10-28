import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Student Testimonials',
    items: [
      {
        name: 'Alex Chen',
        course: 'Advanced Calculus',
        feedback: 'Dr. Johnson made complex mathematical concepts incredibly accessible. Her teaching style is both engaging and thorough.',
        rating: 5,
        achievement: 'Graduated with Honors',
      },
      {
        name: 'Sarah Williams',
        course: 'Quantum Mechanics',
        feedback: 'The way she explains quantum theory is mind-blowing. I finally understand the fundamentals thanks to her innovative approach.',
        rating: 5,
        achievement: 'Research Assistant',
      },
      {
        name: 'Michael Rodriguez',
        course: 'Linear Algebra',
        feedback: 'Her real-world applications of linear algebra helped me see the practical side of mathematics. Excellent mentor!',
        rating: 5,
        achievement: 'Published Research',
      },
      {
        name: 'Emma Thompson',
        course: 'Mathematical Physics',
        feedback: 'Dr. Johnson\'s research-based teaching approach has inspired me to pursue graduate studies. She\'s truly exceptional.',
        rating: 5,
        achievement: 'Ph.D. Candidate',
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900',
    heading: 'text-white',
    name: 'text-white',
    course: 'text-purple-300',
    feedback: 'text-gray-300',
    achievement: 'text-green-400',
    star: 'text-yellow-400',
  },
};

const TeacherProStudentFeedback = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full py-16 px-4`}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-4xl lg:text-5xl mb-12 text-center ${style.heading} font-bold`}>{content.heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.items.map((feedback, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className={`text-lg font-semibold ${style.name}`}>{feedback.name}</div>
                <div className={`font-medium text-sm ${style.course}`}>{feedback.course}</div>
              </div>
              <div className="flex gap-1">
                {[...Array(feedback.rating)].map((_, i) => (
                  <span key={i} className={`text-lg ${style.star}`}>★</span>
                ))}
              </div>
            </div>
            <div className={`italic mb-3 ${style.feedback}`}>"{feedback.feedback}"</div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-purple-500/20">
              <span className="text-green-400">🏆</span>
              <div className={`text-sm font-medium ${style.achievement}`}>{feedback.achievement}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default TeacherProStudentFeedback; 