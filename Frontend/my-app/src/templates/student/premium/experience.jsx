import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Experience',
    items: [
      {
        role: 'Lead Developer',
        company: 'Fortune Tech',
        year: '2023 - Present',
        description: 'Leading a team to build scalable enterprise solutions for global clients.',
      },
      {
        role: 'Software Engineer',
        company: 'InnovateX',
        year: '2021 - 2023',
        description: 'Developed AI-powered web applications and optimized cloud infrastructure.',
      },
    ],
  },
  style: {
    heading: 'text-yellow-400 font-serif',
    card: 'bg-gradient-to-br from-[#232526] to-[#414345] rounded-3xl shadow-2xl border-4 border-yellow-400',
    role: 'text-yellow-300',
    company: 'text-yellow-200',
    year: 'text-yellow-100',
    description: 'text-white/80',
    bg: '',
  },
};

const StudentPremiumExperienceSection = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-3xl mx-auto mb-10 ${style.bg}`}
  >
    <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="flex flex-col gap-8">
      {content.items.map((item, idx) => (
        <div key={idx} className={`flex flex-col md:flex-row md:items-center md:justify-between p-8 ${style.card}`}
        >
          <div>
            <div className={`font-bold text-lg md:text-xl mb-1 ${style.role}`}>{item.role}</div>
            <div className={`text-base md:text-lg mb-1 ${style.company}`}>{item.company}</div>
            <div className={`text-xs md:text-sm mb-1 ${style.year}`}>{item.year}</div>
            <div className={`text-xs md:text-sm mt-1 ${style.description}`}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

export default StudentPremiumExperienceSection; 