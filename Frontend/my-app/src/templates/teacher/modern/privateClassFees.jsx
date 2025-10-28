import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Private Class Fees',
    items: [
      {
        type: 'Individual Session',
        duration: '1 Hour',
        price: '$80',
        description: 'One-on-one personalized tutoring session',
        features: ['Customized curriculum', 'Flexible scheduling', 'Progress tracking'],
      },
      {
        type: 'Group Session',
        duration: '1.5 Hours',
        price: '$60',
        description: 'Small group learning (2-4 students)',
        features: ['Collaborative learning', 'Peer interaction', 'Cost-effective'],
      },
      {
        type: 'Monthly Package',
        duration: '8 Sessions',
        price: '$500',
        description: 'Comprehensive monthly learning program',
        features: ['Structured curriculum', 'Regular assessments', 'Parent consultations'],
      },
    ],
    note: 'All sessions include study materials and practice problems. Online and in-person options available.',
  },
  style: {
    bg: 'bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50',
    heading: 'text-teal-800 font-bold',
    type: 'text-teal-700',
    duration: 'text-cyan-600',
    price: 'text-blue-600',
    description: 'text-gray-700',
    feature: 'text-gray-600',
    check: 'text-green-500',
    note: 'text-gray-600',
  },
};

const TeacherModernPrivateClassFees = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-12 px-4`}
  >
    <h2 className={`text-3xl lg:text-4xl mb-8 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {content.items.map((package_, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.15 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div className={`text-xl font-semibold mb-2 ${style.type}`}>{package_.type}</div>
          <div className={`font-medium mb-1 ${style.duration}`}>{package_.duration}</div>
          <div className={`text-3xl font-bold mb-2 ${style.price}`}>{package_.price}</div>
          <div className={`mb-4 ${style.description}`}>{package_.description}</div>
          <div className="space-y-2 mb-4">
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
  </motion.section>
);

export default TeacherModernPrivateClassFees; 