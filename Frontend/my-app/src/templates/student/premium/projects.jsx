import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Projects',
    items: [
      {
        title: 'Enterprise Dashboard',
        description: 'A robust analytics dashboard for enterprise clients, featuring real-time data and custom visualizations.',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
        links: [
          { label: 'Case Study', url: 'https://alexlee.dev/enterprise-dashboard' },
          { label: 'GitHub', url: 'https://github.com/alexlee/enterprise-dashboard' },
        ],
      },
      {
        title: 'AI Chatbot Platform',
        description: 'A scalable chatbot platform powered by AI, used by Fortune 500 companies.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        links: [
          { label: 'GitHub', url: 'https://github.com/alexlee/ai-chatbot' },
        ],
      },
    ],
  },
  style: {
    heading: 'text-yellow-400 font-serif',
    card: 'bg-gradient-to-br from-[#232526] to-[#414345] rounded-3xl shadow-2xl border-4 border-yellow-400',
    title: 'text-yellow-300',
    description: 'text-white/90',
    link: 'bg-yellow-400 text-[#232526] px-3 py-1 rounded-full font-semibold shadow hover:scale-105 transition-transform',
    overlay: 'bg-gradient-to-t from-yellow-400/30 to-transparent',
    bg: '',
  },
};

const StudentPremiumProjectsSection = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`w-full max-w-4xl mx-auto mb-10 ${style.bg}`}
  >
    <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="grid gap-10 md:grid-cols-2">
      {content.items.map((item, idx) => (
        <div key={idx} className={`relative group overflow-hidden flex flex-col ${style.card}`}
        >
          {item.image && (
            <div className="relative h-64 w-full mb-0 overflow-hidden rounded-t-3xl">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 ${style.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4`}></div>
            </div>
          )}
          <div className="flex flex-col gap-2 p-8">
            <div className={`font-bold text-xl md:text-2xl ${style.title}`}>{item.title}</div>
            <div className={`text-base md:text-lg ${style.description}`}>{item.description}</div>
            <div className="flex flex-wrap gap-3 mt-4">
              {item.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={style.link}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

export default StudentPremiumProjectsSection; 