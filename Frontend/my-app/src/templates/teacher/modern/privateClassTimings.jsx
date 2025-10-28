import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Private Class Timings',
    items: [
      { day: 'Monday - Friday', time: '6:00 PM - 8:00 PM', type: 'Evening Sessions' },
      { day: 'Saturday', time: '10:00 AM - 12:00 PM', type: 'Morning Sessions' },
      { day: 'Sunday', time: '2:00 PM - 4:00 PM', type: 'Afternoon Sessions' },
    ],
    note: 'Flexible scheduling available. Online and in-person options. Weekend intensive programs also offered.',
  },
  style: {
    bg: 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50',
    heading: 'text-indigo-800 font-bold',
    day: 'text-purple-600',
    time: 'text-indigo-600',
    type: 'text-pink-600',
    note: 'text-indigo-600',
  },
};

const TeacherModernPrivateClassTimings = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-16 px-4`}
  >
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      <h2 className={`text-3xl lg:text-4xl mb-6 text-center ${style.heading}`}>{content.heading}</h2>
      <div className="space-y-4">
        {content.items.map((slot, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl"
          >
            <div>
              <div className={`font-semibold ${style.day}`}>{slot.day}</div>
              <div className={`text-sm ${style.type}`}>{slot.type}</div>
            </div>
            <div className={`font-medium ${style.time}`}>{slot.time}</div>
          </motion.div>
        ))}
      </div>
      <div className={`italic mt-4 ${style.note}`}>{content.note}</div>
    </div>
  </motion.section>
);

export default TeacherModernPrivateClassTimings; 