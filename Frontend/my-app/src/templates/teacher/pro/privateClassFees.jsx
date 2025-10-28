import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Tutoring Services',
    items: [
      {
        type: 'Elite Individual Session',
        duration: '1.5 Hours',
        price: '$150',
        description: 'Exclusive one-on-one personalized tutoring with comprehensive study materials.',
        features: ['Customized curriculum', 'Flexible scheduling', 'Progress tracking', 'Study materials included'],
      },
      {
        type: 'Premium Group Session',
        duration: '2 Hours',
        price: '$100',
        description: 'Small group learning (2-4 students) with collaborative environment.',
        features: ['Collaborative learning', 'Peer interaction', 'Cost-effective', 'Group projects'],
      },
      {
        type: 'Comprehensive Package',
        duration: '12 Sessions',
        price: '$1,200',
        description: 'Complete learning program with regular assessments and parent consultations.',
        features: ['Structured curriculum', 'Regular assessments', 'Parent consultations', 'Priority support'],
      },
    ],
    note: 'All sessions include premium study materials, practice problems, and 24/7 support. Online and in-person options available.',
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900',
    heading: 'text-white',
    type: 'text-purple-300',
    duration: 'text-blue-300',
    price: 'text-yellow-400',
    description: 'text-gray-300',
    feature: 'text-gray-400',
    check: 'text-green-400',
    note: 'text-gray-400',
  },
};

const TeacherProPrivateClassFees = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full py-16 px-4`}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-4xl lg:text-5xl mb-12 text-center ${style.heading} font-bold`}>{content.heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.items.map((package_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-2"
          >
            <div className={`text-xl font-semibold mb-2 ${style.type}`}>{package_.type}</div>
            <div className={`font-medium mb-1 ${style.duration}`}>{package_.duration}</div>
            <div className={`text-4xl font-bold mb-2 ${style.price}`}>{package_.price}</div>
            <div className={`mb-4 ${style.description}`}>{package_.description}</div>
            <div className="space-y-3">
              {package_.features.map((feature, i) => (
                <div key={i} className={`flex items-center gap-2 text-sm ${style.feature}`}>
                  <span className={style.check}>✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className={`text-center italic mt-6 ${style.note}`}>{content.note}</div>
    </div>
  </motion.section>
);

export default TeacherProPrivateClassFees; 