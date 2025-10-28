import React from 'react';

const component = {
  content: {
    heading: 'Contact Alexander',
    text: 'For consulting, speaking engagements, or collaborations, get in touch below.',
    links: [
      { label: 'Email', url: 'mailto:alex@alexlee.dev' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/alexlee' },
      { label: 'Twitter', url: 'https://twitter.com/alexlee' },
    ],
  },
  style: {
    heading: 'text-yellow-400 font-serif',
    text: 'text-white/90',
    link: 'bg-yellow-400 text-[#232526] px-4 py-2 rounded-full font-bold shadow hover:scale-105 transition-transform',
    card: 'bg-gradient-to-br from-[#232526] to-[#414345] rounded-3xl shadow-2xl border-4 border-yellow-400',
    bg: '',
  },
};

const StudentPremiumContactSection = ({ content = component.content, style = component.style }) => (
  <section className={`w-full max-w-3xl mx-auto mb-10 text-center ${style.bg} ${style.card} p-10`}>
    <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${style.heading}`}>{content.heading}</h2>
    <p className={`text-lg md:text-xl mb-4 ${style.text}`}>{content.text}</p>
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {content.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          className={style.link}
          target={link.url.startsWith('http') ? '_blank' : undefined}
          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  </section>
);

export default StudentPremiumContactSection; 