import mongoose from 'mongoose';
import { componentSchema } from './models/Component.js';
import Template from './models/Template.js';
import dbCon from './utils/db.js';
import dotenv from 'dotenv';

dotenv.config();

const Component = mongoose.model('Component', componentSchema, 'components');

// Template data for teacher premium
const teacherPremiumTemplate = {
  key: 'premium_teacher_v1',
  name: 'Teacher Premium Template',
  role: 'teacher',
  category: 'premium',
  thumbnail: 'https://firebasestorage.googleapis.com/v0/b/websitebuilder-b1f96.firebasestorage.app/o/templates%2Fteacher_premium.png?alt=media&token=6e2906de-d79e-41fd-842c-7d56c4b6f35c',
  availableComponents: [
    'hero', 'about', 'education', 'experience', 'achievements', 'coursesTaught', 'professionalJourney', 'privateClassFees', 'privateClassTimings', 'studentFeedback', 'contact'
  ],
};

const teacherPremiumComponents = [
  {
    type: 'hero',
    category: 'premium',
    order: 1,
    customName: 'Teacher Premium Hero Section',
    content: {
      heading: 'Dr. Sarah Johnson',
      subheading: 'Distinguished Professor & Research Scholar',
      text: 'Transforming education through innovative methodologies and cutting-edge research. Leading expert in Advanced Mathematics and Quantum Physics.',
      images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'],
      stats: [
        { number: '20+', label: 'Years Excellence' },
        { number: '1000+', label: 'Students Mentored' },
        { number: '98%', label: 'Success Rate' },
        { number: '50+', label: 'Publications' },
      ],
      badges: ['Ph.D. Stanford', 'MIT Alumni', 'Research Fellow'],
    },
    style: {
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-extrabold',
      subheading: 'text-purple-600 font-semibold',
      text: 'text-slate-700',
      statNumber: 'text-purple-600',
      statLabel: 'text-slate-600',
      badge: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'about',
    category: 'premium',
    order: 2,
    customName: 'Teacher Premium About Section',
    content: {
      heading: 'About Me',
      text: 'I am a distinguished educator with over 20 years of experience in teaching Advanced Mathematics and Physics. My passion lies in making complex concepts accessible and engaging for students of all levels.',
      images: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'],
      skills: [
        'Advanced Mathematics',
        'Quantum Physics',
        'Research Methodology',
        'Student Mentoring',
        'Curriculum Development',
        'Online Teaching',
        'Conference Speaking',
        'Academic Publishing',
      ],
      highlights: [
        { icon: '🎓', text: 'Ph.D. from Stanford University' },
        { icon: '🏆', text: 'Multiple Teaching Awards' },
        { icon: '📚', text: '50+ Research Publications' },
        { icon: '🌟', text: '98% Student Success Rate' },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-bold',
      text: 'text-slate-700',
      longText: 'text-slate-600',
      skill: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      highlightIcon: 'text-2xl',
      highlightText: 'text-slate-700',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'education',
    category: 'premium',
    order: 3,
    customName: 'Teacher Premium Education Section',
    content: {
      heading: 'Education & Qualifications',
      items: [
        {
          degree: 'Ph.D. in Applied Mathematics',
          institution: 'Stanford University',
          year: '2015-2019',
          description: 'Specialized in Mathematical Physics and Quantum Mechanics',
          gpa: '4.0 GPA',
          achievements: ['Summa Cum Laude', 'Research Fellowship', 'Dean\'s List'],
        },
        {
          degree: 'Master of Science in Physics',
          institution: 'MIT',
          year: '2012-2014',
          description: 'Focused on Theoretical Physics and Advanced Mathematics',
          gpa: '3.9 GPA',
          achievements: ['Merit Scholarship', 'Teaching Assistant', 'Conference Presenter'],
        },
        {
          degree: 'Bachelor of Science in Mathematics',
          institution: 'Harvard University',
          year: '2008-2012',
          description: 'Major in Mathematics with minor in Physics',
          gpa: '3.95 GPA',
          achievements: ['Valedictorian', 'Honors Program', 'Research Assistant'],
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-bold',
      degree: 'text-purple-700',
      institution: 'text-blue-600',
      year: 'text-gray-500',
      description: 'text-gray-700',
      gpa: 'text-purple-600',
      achievement: 'text-green-600',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'experience',
    category: 'premium',
    order: 4,
    customName: 'Teacher Premium Experience Section',
    content: {
      heading: 'Professional Experience',
      items: [
        {
          position: 'Distinguished Professor',
          institution: 'Stanford University',
          duration: '2019 - Present',
          description: 'Leading advanced mathematics research and mentoring graduate students. Published 25+ research papers in top-tier journals.',
          achievements: ['Research Excellence Award', '25+ Publications', 'Graduate Student Mentor', 'Department Chair'],
          impact: 'Increased research funding by 300%',
        },
        {
          position: 'Senior Physics Lecturer',
          institution: 'MIT',
          duration: '2014 - 2019',
          description: 'Developed innovative teaching methodologies and curriculum for undergraduate and graduate physics courses.',
          achievements: ['Teaching Innovation Award', 'Curriculum Development', 'Student Success Rate 98%', 'Research Grant PI'],
          impact: 'Improved student retention by 40%',
        },
        {
          position: 'Research Associate',
          institution: 'Harvard University',
          duration: '2012 - 2014',
          description: 'Conducted groundbreaking research in theoretical physics and mathematics. Assisted in teaching undergraduate courses.',
          achievements: ['Research Grant Recipient', 'Conference Presentations', 'Teaching Assistant Excellence', 'Publication Co-author'],
          impact: 'Published 15+ peer-reviewed papers',
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-bold',
      position: 'text-purple-700',
      institution: 'text-blue-600',
      duration: 'text-gray-500',
      description: 'text-gray-700',
      achievement: 'text-green-600',
      impact: 'text-purple-600',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'achievements',
    category: 'premium',
    order: 5,
    customName: 'Teacher Premium Achievements Section',
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
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-bold',
      title: 'text-purple-700',
      organization: 'text-blue-600',
      year: 'text-gray-500',
      description: 'text-gray-700',
      category: 'text-green-600',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'coursesTaught',
    category: 'premium',
    order: 6,
    customName: 'Teacher Premium Courses Taught Section',
    content: {
      heading: 'Courses Taught',
      items: [
        {
          name: 'Advanced Calculus & Analysis',
          level: 'Graduate Level',
          description: 'Comprehensive study of multivariable calculus, vector analysis, and differential equations with real-world applications.',
          students: '150+ Students',
          rating: '4.9/5.0',
          image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Quantum Mechanics & Theory',
          level: 'Graduate Level',
          description: 'Advanced quantum theory, wave functions, and quantum systems analysis with laboratory components.',
          students: '120+ Students',
          rating: '4.8/5.0',
          image: 'https://uyc.thecenterforsalesstrategy.com/hs-fs/hubfs/21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png?width=1600&name=21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png',
        },
        {
          name: 'Linear Algebra & Applications',
          level: 'Undergraduate',
          description: 'Vector spaces, matrices, eigenvalues, and applications in physics and engineering.',
          students: '200+ Students',
          rating: '4.9/5.0',
          image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Mathematical Physics',
          level: 'Graduate Level',
          description: 'Mathematical methods in physics, including complex analysis and group theory.',
          students: '80+ Students',
          rating: '4.7/5.0',
          image: 'https://uyc.thecenterforsalesstrategy.com/hs-fs/hubfs/21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png?width=1600&name=21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png',
        },
        {
          name: 'Differential Equations',
          level: 'Undergraduate',
          description: 'Ordinary and partial differential equations with applications to physical systems.',
          students: '180+ Students',
          rating: '4.8/5.0',
          image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Research Methods & Statistics',
          level: 'Graduate Level',
          description: 'Advanced research methodologies and statistical analysis techniques for academic research.',
          students: '60+ Students',
          rating: '4.9/5.0',
          image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-bold',
      name: 'text-purple-700',
      level: 'text-blue-600',
      description: 'text-gray-700',
      students: 'text-green-600',
      rating: 'text-purple-600',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'professionalJourney',
    category: 'premium',
    order: 7,
    customName: 'Teacher Premium Professional Journey Section',
    content: {
      heading: 'Professional Journey',
      items: [
        {
          year: '2019 - Present',
          title: 'Distinguished Professor at Stanford',
          description: 'Leading advanced mathematics research and mentoring graduate students. Published 25+ research papers in top-tier journals.',
          achievements: ['Research Excellence Award', '25+ Publications', 'Graduate Student Mentor', 'Department Chair'],
          impact: 'Increased research funding by 300%',
        },
        {
          year: '2014 - 2019',
          title: 'Senior Physics Lecturer at MIT',
          description: 'Developed innovative teaching methodologies and curriculum for undergraduate and graduate physics courses.',
          achievements: ['Teaching Innovation Award', 'Curriculum Development', 'Student Success Rate 98%', 'Research Grant PI'],
          impact: 'Improved student retention by 40%',
        },
        {
          year: '2012 - 2014',
          title: 'Research Associate at Harvard',
          description: 'Conducted groundbreaking research in theoretical physics and mathematics. Assisted in teaching undergraduate courses.',
          achievements: ['Research Grant Recipient', 'Conference Presentations', 'Teaching Assistant Excellence', 'Publication Co-author'],
          impact: 'Published 15+ peer-reviewed papers',
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-bold',
      year: 'text-purple-600',
      title: 'text-purple-700',
      description: 'text-gray-700',
      achievement: 'text-green-600',
      impact: 'text-purple-600',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'privateClassFees',
    category: 'premium',
    order: 8,
    customName: 'Teacher Premium Private Class Fees Section',
    content: {
      heading: 'Tutoring Services',
      items: [
        {
          type: 'Elite Individual Session',
          duration: '1.5 Hours',
          price: '$150',
          description: 'Exclusive one-on-one personalized tutoring with comprehensive study materials.',
          features: ['Customized curriculum', 'Flexible scheduling', 'Progress tracking', 'Study materials included'],
        },
        {
          type: 'Premium Group Session',
          duration: '2 Hours',
          price: '$100',
          description: 'Small group learning (2-4 students) with collaborative environment.',
          features: ['Collaborative learning', 'Peer interaction', 'Cost-effective', 'Group projects'],
        },
        {
          type: 'Comprehensive Package',
          duration: '12 Sessions',
          price: '$1,200',
          description: 'Complete learning program with regular assessments and parent consultations.',
          features: ['Structured curriculum', 'Regular assessments', 'Parent consultations', 'Priority support'],
        },
      ],
      note: 'All sessions include premium study materials, practice problems, and 24/7 support. Online and in-person options available.',
    },
    style: {
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-bold',
      type: 'text-purple-700',
      duration: 'text-blue-600',
      price: 'text-purple-600',
      description: 'text-gray-700',
      feature: 'text-gray-600',
      check: 'text-green-500',
      note: 'text-gray-600',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'privateClassTimings',
    category: 'premium',
    order: 9,
    customName: 'Teacher Premium Private Class Timings Section',
    content: {
      heading: 'Class Schedule',
      items: [
        { day: 'Monday - Friday', time: '6:00 PM - 8:30 PM', type: 'Evening Sessions', availability: 'Limited Spots' },
        { day: 'Saturday', time: '10:00 AM - 1:00 PM', type: 'Morning Intensive', availability: 'Available' },
        { day: 'Sunday', time: '2:00 PM - 5:00 PM', type: 'Weekend Workshop', availability: 'Available' },
      ],
      note: 'Premium scheduling with flexible options. Online and in-person sessions available. Weekend intensive programs and custom schedules offered.',
      features: [
        'Flexible scheduling',
        'Online & in-person options',
        'Custom curriculum',
        'Priority booking',
        '24/7 support',
        'Progress tracking',
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-bold',
      day: 'text-purple-700',
      time: 'text-blue-600',
      type: 'text-pink-600',
      availability: 'text-green-600',
      note: 'text-gray-600',
      feature: 'text-gray-700',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'studentFeedback',
    category: 'premium',
    order: 10,
    customName: 'Teacher Premium Student Feedback Section',
    content: {
      heading: 'Student Testimonials',
      items: [
        {
          name: 'Alex Chen',
          course: 'Advanced Calculus',
          feedback: 'Dr. Johnson made complex mathematical concepts incredibly accessible. Her teaching style is both engaging and thorough.',
          rating: 5,
          achievement: 'Graduated with Honors',
        },
        {
          name: 'Sarah Williams',
          course: 'Quantum Mechanics',
          feedback: 'The way she explains quantum theory is mind-blowing. I finally understand the fundamentals thanks to her innovative approach.',
          rating: 5,
          achievement: 'Research Assistant',
        },
        {
          name: 'Michael Rodriguez',
          course: 'Linear Algebra',
          feedback: 'Her real-world applications of linear algebra helped me see the practical side of mathematics. Excellent mentor!',
          rating: 5,
          achievement: 'Published Research',
        },
        {
          name: 'Emma Thompson',
          course: 'Mathematical Physics',
          feedback: 'Dr. Johnson\'s research-based teaching approach has inspired me to pursue graduate studies. She\'s truly exceptional.',
          rating: 5,
          achievement: 'Ph.D. Candidate',
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-slate-50 via-purple-50 to-slate-50',
      heading: 'text-slate-800 font-bold',
      name: 'text-slate-800',
      course: 'text-purple-600',
      feedback: 'text-gray-700',
      achievement: 'text-green-600',
      star: 'text-yellow-400',
    },
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
  {
    type: 'contact',
    category: 'premium',
    order: 11,
    customName: 'Teacher Premium Contact Section',
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
    customFields: {
      template: 'teacher',
      variant: 'premium'
    }
  },
];

const seedTeacherPremiumComponents = async () => {
  try {
    await dbCon();
    
    console.log('🧹 Starting cleanup and seeding process for Teacher Premium...\n');
    
    // 1. Clear ALL existing teacher premium components (wrong data)
    const deletedComponents = await Component.deleteMany({ 
      $or: [
        { 'customFields.template': 'teacher', 'customFields.variant': 'premium' },
        { type: 'hero', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'about', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'education', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'experience', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'achievements', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'coursesTaught', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'professionalJourney', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'privateClassFees', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'privateClassTimings', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'studentFeedback', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } },
        { type: 'contact', category: 'premium', customName: { $regex: 'Teacher Premium', $options: 'i' } }
      ]
    });
    console.log(`🗑️  Deleted ${deletedComponents.deletedCount} existing teacher premium components`);
    
    // 2. Clear existing teacher premium template
    const deletedTemplate = await Template.deleteOne({ key: teacherPremiumTemplate.key });
    if (deletedTemplate.deletedCount > 0) {
      console.log('🗑️  Deleted existing teacher premium template');
    }
    
    // 3. Insert new template
    const template = await Template.create(teacherPremiumTemplate);
    console.log(`✅ Template created: ${template.name} (${template.key})`);
    
    // 4. Insert new components
    const result = await Component.insertMany(teacherPremiumComponents);
    
    console.log(`\n✅ Successfully inserted ${result.length} teacher premium components:`);
    result.forEach(component => {
      console.log(`  - ${component.customName} (${component.type})`);
    });
    
    console.log('\n🎉 Teacher Premium cleanup and seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Deleted ${deletedComponents.deletedCount} old components`);
    console.log(`   - Created 1 new template`);
    console.log(`   - Inserted ${result.length} new components`);
    
  } catch (error) {
    console.error('❌ Error during teacher premium cleanup and seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
};

// Run the cleanup and seeding function
seedTeacherPremiumComponents(); 