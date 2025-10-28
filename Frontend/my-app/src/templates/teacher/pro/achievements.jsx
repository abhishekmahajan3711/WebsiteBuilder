import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Achievements & Awards',
    items: [
      {
        title: 'Distinguished Teaching Award',
        organization: 'Stanford University',
        year: '2023',
        description: 'Recognized for excellence in teaching and innovative pedagogical approaches.',
        category: 'Teaching Excellence',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Research Excellence Prize',
        organization: 'American Mathematical Society',
        year: '2022',
        description: 'Awarded for groundbreaking research in applied mathematics and quantum mechanics.',
        category: 'Research',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Best Paper Award',
        organization: 'International Physics Conference',
        year: '2021',
        description: 'Published research on quantum entanglement and its applications in computing.',
        category: 'Publication',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Mentorship Excellence',
        organization: 'MIT Alumni Association',
        year: '2020',
        description: 'Recognized for outstanding mentorship of graduate students and research guidance.',
        category: 'Mentorship',
        image: 'https://media.istockphoto.com/id/2062707205/photo/gold-star-on-a-blue-background-as-a-reward-top-performance-award-winners-cup-achievements.jpg?s=612x612&w=0&k=20&c=6HeaeFYryuuOyPTW8ucQKsUMUi3F8oHvE9CSPVgoV60=',
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900',
    heading: 'text-white',
    title: 'text-purple-300',
    organization: 'text-blue-300',
    year: 'text-gray-400',
    description: 'text-gray-300',
    category: 'text-green-400',
  },
};

const TeacherProAchievements = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8`}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl mb-8 lg:mb-12 text-center ${style.heading} font-bold`}>{content.heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {content.items.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl lg:rounded-3xl shadow-2xl p-4 lg:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                🏆
              </div>
              <img src={achievement.image} alt={achievement.title} className="w-full h-40 lg:h-48 rounded-xl lg:rounded-2xl object-cover mb-4" />
              <div className="flex justify-between items-start mb-3">
                <div className={`text-lg lg:text-xl font-semibold mb-2 ${style.title}`}>{achievement.title}</div>
                <span className={`font-semibold text-xs lg:text-sm ${style.category}`}>{achievement.category}</span>
              </div>
              <div className={`font-medium mb-1 text-sm ${style.organization}`}>{achievement.organization}</div>
              <div className={`text-xs lg:text-sm mb-3 ${style.year}`}>{achievement.year}</div>
              <div className={`text-sm leading-relaxed ${style.description}`}>{achievement.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default TeacherProAchievements; 