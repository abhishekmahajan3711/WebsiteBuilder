import React from 'react';
import { motion } from 'framer-motion';

const component = {
  content: {
    heading: 'Achievements & Awards',
    items: [
      {
        title: 'Outstanding Teaching Award',
        organization: 'Stanford University',
        year: '2023',
        description: 'Recognized for excellence in teaching and innovative pedagogical approaches.',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Research Excellence Prize',
        organization: 'American Mathematical Society',
        year: '2022',
        description: 'Awarded for groundbreaking research in applied mathematics and quantum mechanics.',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Best Paper Award',
        organization: 'International Physics Conference',
        year: '2021',
        description: 'Published research on quantum entanglement and its applications in computing.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Mentorship Excellence',
        organization: 'MIT Alumni Association',
        year: '2020',
        description: 'Recognized for outstanding mentorship of graduate students and research guidance.',
        image: 'https://media.istockphoto.com/id/2062707205/photo/gold-star-on-a-blue-background-as-a-reward-top-performance-award-winners-cup-achievements.jpg?s=612x612&w=0&k=20&c=6HeaeFYryuuOyPTW8ucQKsUMUi3F8oHvE9CSPVgoV60=',
      },
    ],
  },
  style: {
    bg: 'bg-gradient-to-r from-green-50 via-blue-50 to-indigo-50',
    heading: 'text-green-800 font-bold',
    title: 'text-green-700',
    organization: 'text-blue-600',
    year: 'text-gray-500',
    description: 'text-gray-700',
  },
};

const TeacherModernAchievements = ({ content = component.content, style = component.style }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className={`${style.bg} w-full max-w-6xl mx-auto mb-8 py-16 px-4`}
  >
    <h2 className={`text-3xl lg:text-4xl mb-8 text-center ${style.heading}`}>{content.heading}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {content.items.map((achievement, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.15 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <img src={achievement.image} alt={achievement.title} className="w-full h-48 rounded-lg object-cover mb-4" />
          <div className={`text-xl font-semibold mb-2 ${style.title}`}>{achievement.title}</div>
          <div className={`font-medium mb-1 ${style.organization}`}>{achievement.organization}</div>
          <div className={`text-sm mb-3 ${style.year}`}>{achievement.year}</div>
          <div className={style.description}>{achievement.description}</div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default TeacherModernAchievements; 