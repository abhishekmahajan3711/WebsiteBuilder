import mongoose from 'mongoose';
import { componentSchema } from './models/Component.js';
import Template from './models/Template.js';
import dbCon from './utils/db.js';
import dotenv from 'dotenv';

dotenv.config();

const Component = mongoose.model('Component', componentSchema, 'components');

// Template data for teacher modern
const teacherModernTemplate = {
  key: 'modern_teacher_v1',
  name: 'Teacher Modern Template',
  role: 'teacher',
  category: 'modern',
  thumbnail: 'https://firebasestorage.googleapis.com/v0/b/websitebuilder-b1f96.firebasestorage.app/o/templates%2Fteacher_modern.png?alt=media&token=d255fdca-dbc6-46db-8ac1-3fe7d949531a',
  availableComponents: [
    'hero', 'about', 'education', 'experience', 'achievements', 'coursesTaught', 'professionalJourney', 'privateClassFees', 'privateClassTimings', 'studentFeedback', 'contact'
  ],
};

const teacherModernComponents = [
  {
    type: 'hero',
    category: 'modern',
    order: 1,
    customName: 'Teacher Modern Hero Section',
    content: {
      heading: 'Dr. Sarah Johnson',
      subheading: 'Passionate Educator & Research Scholar',
      text: 'Empowering students through innovative teaching methods and personalized learning experiences. Specializing in Advanced Mathematics and Physics.',
      images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'],
      stats: [
        { number: '15+', label: 'Years Experience' },
        { number: '500+', label: 'Students Taught' },
        { number: '95%', label: 'Success Rate' },
      ],
    },
    style: {
      bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      heading: 'text-blue-800 font-extrabold',
      subheading: 'text-indigo-600 font-semibold',
      text: 'text-gray-700',
      statNumber: 'text-blue-600',
      statLabel: 'text-gray-600',
    },
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'about',
    category: 'modern',
    order: 2,
    customName: 'Teacher Modern About Section',
    content: {
      heading: 'About Me',
      text: 'I am a dedicated educator with over 15 years of experience in teaching Advanced Mathematics and Physics. My passion lies in making complex concepts accessible and engaging for students of all levels.',
      longText: 'My teaching philosophy centers around creating an interactive learning environment where students feel confident to explore, question, and discover. I believe in adapting my teaching methods to suit individual learning styles, ensuring every student reaches their full potential.',
      images: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'],
      skills: [
        'Advanced Mathematics',
        'Physics & Engineering',
        'Research Methodology',
        'Student Mentoring',
        'Curriculum Development',
        'Online Teaching',
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-white via-blue-50 to-indigo-50',
      heading: 'text-blue-800 font-bold',
      text: 'text-gray-700',
      longText: 'text-gray-600',
      skill: 'bg-blue-100 text-blue-800',
    },
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'education',
    category: 'modern',
    order: 3,
    customName: 'Teacher Modern Education Section',
    content: {
      heading: 'Education',
      items: [
        {
          degree: 'Ph.D. in Applied Mathematics',
          institution: 'Stanford University',
          year: '2015-2019',
          description: 'Specialized in Mathematical Physics and Quantum Mechanics',
        },
        {
          degree: 'Master of Science in Physics',
          institution: 'MIT',
          year: '2012-2014',
          description: 'Focused on Theoretical Physics and Advanced Mathematics',
        },
        {
          degree: 'Bachelor of Science in Mathematics',
          institution: 'Harvard University',
          year: '2008-2012',
          description: 'Major in Mathematics with minor in Physics',
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50',
      heading: 'text-indigo-800 font-bold',
      degree: 'text-indigo-700',
      institution: 'text-blue-600',
      year: 'text-gray-500',
      description: 'text-gray-700',
    },
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'experience',
    category: 'modern',
    order: 4,
    customName: 'Teacher Modern Experience Section',
    content: {
      heading: 'Professional Experience',
      items: [
        {
          position: 'Senior Mathematics Professor',
          institution: 'Stanford University',
          duration: '2019 - Present',
          description: 'Teaching advanced mathematics courses and conducting research in applied mathematics. Mentoring graduate students and publishing research papers.',
        },
        {
          position: 'Physics Lecturer',
          institution: 'MIT',
          duration: '2014 - 2019',
          description: 'Taught undergraduate and graduate physics courses. Developed innovative teaching methodologies and curriculum.',
        },
        {
          position: 'Research Assistant',
          institution: 'Harvard University',
          duration: '2012 - 2014',
          description: 'Conducted research in theoretical physics and mathematics. Assisted in teaching undergraduate courses.',
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50',
      heading: 'text-blue-800 font-bold',
      position: 'text-blue-700',
      institution: 'text-indigo-600',
      duration: 'text-gray-500',
      description: 'text-gray-700',
    },
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'achievements',
    category: 'modern',
    order: 5,
    customName: 'Teacher Modern Achievements Section',
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
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'coursesTaught',
    category: 'modern',
    order: 6,
    customName: 'Teacher Modern Courses Taught Section',
    content: {
      heading: 'Courses Taught',
      items: [
        {
          name: 'Advanced Calculus',
          level: 'Undergraduate & Graduate',
          description: 'Comprehensive study of multivariable calculus, vector analysis, and differential equations.',
          image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Quantum Mechanics',
          level: 'Graduate Level',
          description: 'Advanced quantum theory, wave functions, and quantum systems analysis.',
          image: 'https://uyc.thecenterforsalesstrategy.com/hs-fs/hubfs/21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png?width=1600&name=21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png',
        },
        {
          name: 'Linear Algebra',
          level: 'Undergraduate',
          description: 'Vector spaces, matrices, eigenvalues, and applications in physics and engineering.',
          image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Mathematical Physics',
          level: 'Graduate Level',
          description: 'Mathematical methods in physics, including complex analysis and group theory.',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Differential Equations',
          level: 'Undergraduate',
          description: 'Ordinary and partial differential equations with applications to physical systems.',
          image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Research Methods',
          level: 'Graduate Level',
          description: 'Advanced research methodologies and statistical analysis techniques.',
          image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50',
      heading: 'text-purple-800 font-bold',
      name: 'text-purple-700',
      level: 'text-indigo-600',
      description: 'text-gray-700',
    },
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'professionalJourney',
    category: 'modern',
    order: 7,
    customName: 'Teacher Modern Professional Journey Section',
    content: {
      heading: 'Professional Journey',
      items: [
        {
          year: '2019 - Present',
          title: 'Senior Professor at Stanford',
          description: 'Leading advanced mathematics research and mentoring graduate students. Published 15+ research papers in top-tier journals.',
          achievements: ['Research Excellence Award', '15+ Publications', 'Graduate Student Mentor'],
        },
        {
          year: '2014 - 2019',
          title: 'Physics Lecturer at MIT',
          description: 'Developed innovative teaching methodologies and curriculum for undergraduate and graduate physics courses.',
          achievements: ['Teaching Innovation Award', 'Curriculum Development', 'Student Success Rate 95%'],
        },
        {
          year: '2012 - 2014',
          title: 'Research Assistant at Harvard',
          description: 'Conducted groundbreaking research in theoretical physics and mathematics. Assisted in teaching undergraduate courses.',
          achievements: ['Research Grant Recipient', 'Conference Presentations', 'Teaching Assistant Excellence'],
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50',
      heading: 'text-purple-800 font-bold',
      year: 'text-purple-600',
      title: 'text-purple-700',
      description: 'text-gray-700',
      achievement: 'text-gray-600',
      check: 'text-green-500',
    },
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'privateClassFees',
    category: 'modern',
    order: 8,
    customName: 'Teacher Modern Private Class Fees Section',
    content: {
      heading: 'Private Class Fees',
      items: [
        {
          type: 'Individual Session',
          duration: '1 Hour',
          price: '$80',
          description: 'One-on-one personalized tutoring session',
          features: ['Customized curriculum', 'Flexible scheduling', 'Progress tracking'],
        },
        {
          type: 'Group Session',
          duration: '1.5 Hours',
          price: '$60',
          description: 'Small group learning (2-4 students)',
          features: ['Collaborative learning', 'Peer interaction', 'Cost-effective'],
        },
        {
          type: 'Monthly Package',
          duration: '8 Sessions',
          price: '$500',
          description: 'Comprehensive monthly learning program',
          features: ['Structured curriculum', 'Regular assessments', 'Parent consultations'],
        },
      ],
      note: 'All sessions include study materials and practice problems. Online and in-person options available.',
    },
    style: {
      bg: 'bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50',
      heading: 'text-teal-800 font-bold',
      type: 'text-teal-700',
      duration: 'text-cyan-600',
      price: 'text-blue-600',
      description: 'text-gray-700',
      feature: 'text-gray-600',
      check: 'text-green-500',
      note: 'text-gray-600',
    },
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'privateClassTimings',
    category: 'modern',
    order: 9,
    customName: 'Teacher Modern Private Class Timings Section',
    content: {
      heading: 'Private Class Timings',
      items: [
        { day: 'Monday - Friday', time: '6:00 PM - 8:00 PM', type: 'Evening Sessions' },
        { day: 'Saturday', time: '10:00 AM - 12:00 PM', type: 'Morning Sessions' },
        { day: 'Sunday', time: '2:00 PM - 4:00 PM', type: 'Afternoon Sessions' },
      ],
      note: 'Flexible scheduling available. Online and in-person options. Weekend intensive programs also offered.',
    },
    style: {
      bg: 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50',
      heading: 'text-indigo-800 font-bold',
      day: 'text-purple-600',
      time: 'text-indigo-600',
      type: 'text-pink-600',
      note: 'text-indigo-600',
    },
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'studentFeedback',
    category: 'modern',
    order: 10,
    customName: 'Teacher Modern Student Feedback Section',
    content: {
      heading: 'Student Feedback',
      items: [
        {
          name: 'Alex Chen',
          course: 'Advanced Calculus',
          feedback: 'Dr. Johnson made complex mathematical concepts incredibly accessible. Her teaching style is both engaging and thorough.',
          rating: 5,
        },
        {
          name: 'Sarah Williams',
          course: 'Quantum Mechanics',
          feedback: 'The way she explains quantum theory is mind-blowing. I finally understand the fundamentals thanks to her innovative approach.',
          rating: 5,
        },
        {
          name: 'Michael Rodriguez',
          course: 'Linear Algebra',
          feedback: 'Her real-world applications of linear algebra helped me see the practical side of mathematics. Excellent mentor!',
          rating: 5,
        },
        {
          name: 'Emma Thompson',
          course: 'Mathematical Physics',
          feedback: 'Dr. Johnson\'s research-based teaching approach has inspired me to pursue graduate studies. She\'s truly exceptional.',
          rating: 5,
        },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50',
      heading: 'text-orange-800 font-bold',
      name: 'text-gray-800',
      course: 'text-orange-600',
      feedback: 'text-gray-700',
      star: 'text-yellow-400',
    },
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
  {
    type: 'contact',
    category: 'modern',
    order: 11,
    customName: 'Teacher Modern Contact Section',
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
    customFields: {
      template: 'teacher',
      variant: 'modern'
    }
  },
];

const seedTeacherModernComponents = async () => {
  try {
    await dbCon();
    
    console.log('🧹 Starting cleanup and seeding process for Teacher Modern...\n');
    
    // 1. Clear ALL existing teacher modern components (wrong data)
    const deletedComponents = await Component.deleteMany({ 
      $or: [
        { 'customFields.template': 'teacher', 'customFields.variant': 'modern' },
        { type: 'hero_section', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'about', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'education', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'experience', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'achievements', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'coursesTaught', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'professionalJourney', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'privateClassFees', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'privateClassTimings', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'studentFeedback', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } },
        { type: 'contact', category: 'modern', customName: { $regex: 'Teacher Modern', $options: 'i' } }
      ]
    });
    console.log(`🗑️  Deleted ${deletedComponents.deletedCount} existing teacher modern components`);
    
    // 2. Clear existing teacher modern template
    const deletedTemplate = await Template.deleteOne({ key: teacherModernTemplate.key });
    if (deletedTemplate.deletedCount > 0) {
      console.log('🗑️  Deleted existing teacher modern template');
    }
    
    // 3. Insert new template
    const template = await Template.create(teacherModernTemplate);
    console.log(`✅ Template created: ${template.name} (${template.key})`);
    
    // 4. Insert new components
    const result = await Component.insertMany(teacherModernComponents);
    
    console.log(`\n✅ Successfully inserted ${result.length} teacher modern components:`);
    result.forEach(component => {
      console.log(`  - ${component.customName} (${component.type})`);
    });
    
    console.log('\n🎉 Teacher Modern cleanup and seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Deleted ${deletedComponents.deletedCount} old components`);
    console.log(`   - Created 1 new template`);
    console.log(`   - Inserted ${result.length} new components`);
    
  } catch (error) {
    console.error('❌ Error during teacher modern cleanup and seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
};

// Run the cleanup and seeding function
seedTeacherModernComponents(); 