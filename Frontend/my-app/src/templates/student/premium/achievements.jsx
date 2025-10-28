import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Achievements',
    items: [
      {
        title: 'Keynote Speaker - Global Dev Summit',
        description: 'Delivered a keynote on scalable web architectures to 5,000+ attendees.',
        date: 'May 2024',
        icon: '🏆',
      },
      {
        title: 'Best Open Source Project',
        description: 'Awarded for contributions to a major open source initiative.',
        date: 'November 2023',
        icon: '🥇',
      },
    ],
  },
  style: {
    heading: 'text-yellow-400 font-serif',
    card: 'bg-gradient-to-br from-[#232526] to-[#414345] rounded-3xl shadow-2xl border-4 border-yellow-400',
    title: 'text-yellow-300',
    description: 'text-white/90',
    date: 'text-yellow-200',
    icon: 'text-3xl md:text-4xl',
    bg: '',
  },
};

const StudentPremiumAchievementsSection = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-3xl mx-auto mb-10 ${style.bg}`}
  >
    <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${style.heading}`}>{content.heading}</h2>
    <ul className="flex flex-col gap-8">
      {content.items.map((item, idx) => (
        <li key={idx} className={`flex items-center gap-6 p-8 ${style.card}`}
        >
          <span className={`${style.icon}`}>{item.icon}</span>
          <div className="flex-1">
            <div className={`font-bold text-lg md:text-xl mb-1 ${style.title}`}>{item.title}</div>
            <div className={`text-base md:text-lg mb-1 ${style.description}`}>{item.description}</div>
            <div className={`text-xs md:text-sm ${style.date}`}>{item.date}</div>
          </div>
        </li>
      ))}
    </ul>
  </motion.section>
);

export default StudentPremiumAchievementsSection; 