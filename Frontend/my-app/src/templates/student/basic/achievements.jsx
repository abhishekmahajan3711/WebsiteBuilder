import React from 'react';

const StudentBasicAchievementsSection = ({ content, style }) => (
  <section className={`w-full max-w-2xl mx-auto ${style.bg} ${style.card} p-6 mb-6`}>
    <h2 className={`text-xl md:text-2xl font-semibold mb-4 ${style.heading}`}>{content.heading}</h2>
    <ul className="flex flex-col gap-4">
      {content.items.map((item, idx) => (
        <li key={idx} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-blue-50 rounded-lg">
          <div>
            <div className={`font-bold text-base md:text-lg ${style.title}`}>{item.title}</div>
            <div className={`text-sm md:text-base ${style.description}`}>{item.description}</div>
          </div>
          <div className={`text-xs md:text-base font-semibold mt-2 md:mt-0 md:text-right ${style.date}`}>{item.date}</div>
        </li>
      ))}
    </ul>
  </section>
);

export default StudentBasicAchievementsSection; 