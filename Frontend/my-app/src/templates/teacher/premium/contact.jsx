import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Get In Touch',
    text: 'Ready to embark on your educational journey? Connect with me for personalized tutoring sessions and academic guidance.',
    contactInfo: [
      {
        type: 'Email',
        value: 'dr.sarah.johnson@stanford.edu',
        icon: '📧',
        description: 'Primary contact method',
      },
      {
        type: 'Phone',
        value: '+1 (555) 123-4567',
        icon: '📞',
        description: 'Available 9 AM - 6 PM PST',
      },
      {
        type: 'Location',
        value: 'Stanford, California',
        icon: '📍',
        description: 'In-person sessions available',
      },
    ],
    socialLinks: [
      { name: 'LinkedIn', url: 'https://linkedin.com/in/drsarahjohnson', icon: '💼', description: 'Professional Network' },
      { name: 'ResearchGate', url: 'https://researchgate.net/profile/sarah-johnson', icon: '🔬', description: 'Research Profile' },
      { name: 'Google Scholar', url: 'https://scholar.google.com/sarahjohnson', icon: '📚', description: 'Academic Publications' },
      { name: 'Twitter', url: 'https://twitter.com/drsarahjohnson', icon: '🐦', description: 'Latest Updates' },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
    heading: 'text-slate-800 font-bold',
    text: 'text-slate-700',
    contactText: 'text-slate-700',
    contactType: 'text-purple-600',
    contactDescription: 'text-slate-500',
    socialLink: 'text-white',
  },
};

const TeacherPremiumContact = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full py-16 px-4`}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-4xl lg:text-5xl mb-8 text-center ${style.heading}`}>{content.heading}</h2>
      <p className={`text-xl lg:text-2xl mb-12 text-center ${style.text}`}>{content.text}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
          <h3 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Contact Information</h3>
          <div className="space-y-6">
            {content.contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                  {info.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${style.contactType}`}>{info.type}</div>
                  <div className={`text-lg ${style.contactText}`}>{info.value}</div>
                  <div className={`text-sm ${style.contactDescription}`}>{info.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
          <h3 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Social Links</h3>
          <div className="grid grid-cols-1 gap-4">
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
                className={`flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 justify-center ${style.socialLink}`}
              >
                <span className="text-2xl">{link.icon}</span>
                <div className="text-center">
                  <div className="font-semibold text-lg">{link.name}</div>
                  <div className="text-sm opacity-90">{link.description}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

export default TeacherPremiumContact; 