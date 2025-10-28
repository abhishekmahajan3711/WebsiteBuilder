import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Class Schedule',
    items: [
      { day: 'Monday - Friday', time: '6:00 PM - 8:30 PM', type: 'Evening Sessions', availability: 'Limited Spots' },
      { day: 'Saturday', time: '10:00 AM - 1:00 PM', type: 'Morning Intensive', availability: 'Available' },
      { day: 'Sunday', time: '2:00 PM - 5:00 PM', type: 'Weekend Workshop', availability: 'Available' },
    ],
    note: 'Premium scheduling with flexible options. Online and in-person sessions available. Weekend intensive programs and custom schedules offered.',
    features: [
      'Flexible scheduling',
      'Online & in-person options',
      'Custom curriculum',
      'Priority booking',
      '24/7 support',
      'Progress tracking',
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
    heading: 'text-slate-800 font-bold',
    day: 'text-purple-700',
    time: 'text-blue-600',
    type: 'text-pink-600',
    availability: 'text-green-600',
    note: 'text-gray-600',
    feature: 'text-gray-700',
  },
};

const TeacherPremiumPrivateClassTimings = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w mx-auto py-16 px-16`}
  >
    <h2 className={`text-4xl lg:text-5xl mb-12 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-slate-800 mb-6">Available Sessions</h3>
          <div className="space-y-6">
            {content.items.map((slot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200"
              >
                <div>
                  <div className={`font-semibold ${style.day}`}>{slot.day}</div>
                  <div className={`text-sm ${style.type}`}>{slot.type}</div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${style.time}`}>{slot.time}</div>
                  <div className={`text-sm font-medium ${style.availability}`}>✓ {slot.availability}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-800 mb-6">Premium Features</h3>
          <div className="grid grid-cols-2 gap-4">
            {content.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <span className="text-purple-500">✨</span>
                <span className={`text-sm ${style.feature}`}>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className={`text-center italic mt-6 ${style.note}`}>{content.note}</div>
    </div>
  </motion.section>
);

export default TeacherPremiumPrivateClassTimings; 