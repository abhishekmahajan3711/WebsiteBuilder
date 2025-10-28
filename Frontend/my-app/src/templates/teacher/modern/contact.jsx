import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Contact Me',
    text: 'Ready to start your learning journey? Get in touch for personalized tutoring sessions and academic guidance.',
    items: [
      {
        type: 'Email',
        value: 'dr.sarah.johnson@stanford.edu',
        icon: '📧',
      },
      {
        type: 'Phone',
        value: '+1 (555) 123-4567',
        icon: '📞',
      },
      {
        type: 'Location',
        value: 'Stanford, California',
        icon: '📍',
      },
    ],
    socialLinks: [
      { name: 'LinkedIn', url: 'https://linkedin.com/in/drsarahjohnson', icon: '💼' },
      { name: 'ResearchGate', url: 'https://researchgate.net/profile/sarah-johnson', icon: '🔬' },
      { name: 'Google Scholar', url: 'https://scholar.google.com/sarahjohnson', icon: '📚' },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50',
    heading: 'text-blue-800 font-bold',
    text: 'text-gray-700',
    contactText: 'text-gray-700',
    contactType: 'text-blue-600',
    socialLink: 'text-blue-700',
  },
};

const TeacherModernContact = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-16 px-4`}
  >
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      <h2 className={`text-3xl lg:text-4xl mb-4 text-center ${style.heading}`}>{content.heading}</h2>
      <p className={`text-lg lg:text-xl mb-6 text-center ${style.text}`}>{content.text}</p>
      <div className="space-y-4 mb-6">
        {content.items.map((info, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-2xl">{info.icon}</span>
            <div>
              <div className={`font-semibold ${style.contactType}`}>{info.type}</div>
              <div className={style.contactText}>{info.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-4 justify-center">
        {content.socialLinks.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors ${style.socialLink}`}
          >
            <span className="text-xl">{link.icon}</span>
            {link.name}
          </motion.a>
        ))}
      </div>
    </div>
  </motion.section>
);

export default TeacherModernContact; 