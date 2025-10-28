import mongoose from 'mongoose';
import { componentSchema } from './models/Component.js';
import Template from './models/Template.js';
import dbCon from './utils/db.js';
import dotenv from 'dotenv';

dotenv.config();

const Component = mongoose.model('Component', componentSchema, 'components');

// Template data for teacher basic
const teacherBasicTemplate = {
  key: 'basic_teacher_v1',
  name: 'Teacher Basic Template',
  role: 'teacher',
  category: 'basic',
  thumbnail: 'https://firebasestorage.googleapis.com/v0/b/websitebuilder-b1f96.firebasestorage.app/o/templates%2Fteacher_basic1.png?alt=media&token=your-token-here',
  availableComponents: [
    'hero', 'about', 'education', 'experience', 'coursesTaught', 'achievements', 'studentFeedback', 'privateClassFees', 'privateClassTimings', 'contact', 'professionalJourney'
  ],
};

const teacherBasicComponents = [
  {
    type: 'hero',
    category: 'basic',
    order: 1,
    customName: 'Teacher Basic Hero Section',
    content: {
      heading: 'Welcome! I\'m Mrs. Priya Sharma',
      subheading: 'Passionate Math & Science Teacher',
      text: 'Empowering students to love learning and achieve their best, both in school and through private classes.',
      images: ['https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=facearea&w=400&q=80'],
    },
    style: {
      bg: 'bg-blue-50',
      card: 'rounded-2xl shadow-md',
      heading: 'text-blue-700 font-bold',
      subheading: 'text-blue-500',
      text: 'text-gray-700',
      border: 'border-4 border-blue-200',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'about',
    category: 'basic',
    order: 2,
    customName: 'Teacher Basic About Section',
    content: {
      heading: 'About Me',
      text: 'With over 12 years of teaching experience, I specialize in making Math and Science fun and accessible for all students. I believe in nurturing curiosity and confidence in every learner.',
      images: ['https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=facearea&w=400&q=80'],
    },
    style: {
      bg: 'bg-white',
      card: 'rounded-xl shadow',
      heading: 'text-blue-700 font-bold',
      text: 'text-gray-700',
      image: 'w-24 h-24 rounded-xl object-cover shadow mb-4',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'education',
    category: 'basic',
    order: 3,
    customName: 'Teacher Basic Education Section',
    content: {
      heading: 'Education',
      items: [
        {
          degree: 'M.Sc. in Mathematics',
          college: 'Delhi University',
          year: '2010 - 2012',
          result: 'First Class',
        },
        {
          degree: 'B.Sc. in Science',
          college: 'Delhi University',
          year: '2007 - 2010',
          result: 'Distinction',
        },
      ],
    },
    style: {
      bg: 'bg-blue-50',
      card: 'rounded-xl shadow p-4',
      heading: 'text-blue-700 font-bold',
      degree: 'text-blue-600',
      college: 'text-blue-500',
      year: 'text-gray-500',
      result: 'text-blue-400',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'experience',
    category: 'basic',
    order: 4,
    customName: 'Teacher Basic Experience Section',
    content: {
      heading: 'Experience',
      items: [
        {
          role: 'Math & Science Teacher',
          place: 'Green Valley School',
          year: '2015 - Present',
          description: 'Teaching grades 6-10, preparing students for board exams and Olympiads.',
        },
        {
          role: 'Private Tutor',
          place: 'Self-employed',
          year: '2012 - Present',
          description: 'One-on-one and group classes for students needing extra help or advanced learning.',
        },
      ],
    },
    style: {
      bg: 'bg-white',
      card: 'rounded-xl shadow p-4',
      heading: 'text-blue-700 font-bold',
      role: 'text-blue-600',
      place: 'text-blue-500',
      year: 'text-gray-500',
      description: 'text-gray-700',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'coursesTaught',
    category: 'basic',
    order: 5,
    customName: 'Teacher Basic Courses Taught Section',
    content: {
      heading: 'Courses Taught',
      items: [
        { name: 'Mathematics (Grades 6-12)' },
        { name: 'Science (Grades 6-10)' },
        { name: 'Olympiad Preparation' },
        { name: 'NTSE & Board Exam Coaching' },
      ],
    },
    style: {
      bg: 'bg-white',
      card: 'rounded-xl shadow p-4',
      heading: 'text-blue-700 font-bold',
      course: 'text-gray-700',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'achievements',
    category: 'basic',
    order: 6,
    customName: 'Teacher Basic Achievements Section',
    content: {
      heading: 'Achievements',
      items: [
        { title: 'Best Teacher Award', year: '2021', description: 'Awarded by Green Valley School for outstanding teaching.' },
        { title: 'Olympiad Mentor', year: '2019', description: 'Mentored students who won state-level Math Olympiad.' },
        { title: 'Board Exam Results', year: '2020', description: '90% of students scored above 90% in board exams.' },
      ],
    },
    style: {
      bg: 'bg-blue-50',
      card: 'rounded-xl shadow p-4',
      heading: 'text-blue-700 font-bold',
      title: 'text-blue-600',
      year: 'text-blue-400',
      description: 'text-gray-700',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'studentFeedback',
    category: 'basic',
    order: 7,
    customName: 'Teacher Basic Student Feedback Section',
    content: {
      heading: 'Student Feedback',
      items: [
        { name: 'Amit', feedback: 'Ma\'am explains concepts so clearly! My grades improved a lot.' },
        { name: 'Sneha', feedback: 'Very patient and always encourages us to ask questions.' },
        { name: 'Rahul', feedback: 'Her private classes helped me crack the Olympiad.' },
      ],
    },
    style: {
      bg: 'bg-white',
      card: 'rounded-xl shadow p-4',
      heading: 'text-blue-700 font-bold',
      name: 'text-blue-600 font-semibold',
      feedback: 'text-gray-700 italic',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'privateClassFees',
    category: 'basic',
    order: 8,
    customName: 'Teacher Basic Private Class Fees Section',
    content: {
      heading: 'Private Class Fees',
      items: [
        { type: 'One-on-One', fee: '₹500/hour' },
        { type: 'Group (up to 5 students)', fee: '₹300/hour per student' },
        { type: 'Online', fee: '₹400/hour' },
      ],
      note: 'Discounts available for long-term batches.',
    },
    style: {
      bg: 'bg-blue-50',
      card: 'rounded-xl shadow p-4',
      heading: 'text-blue-700 font-bold',
      type: 'text-blue-600',
      fee: 'text-gray-700',
      note: 'text-blue-400 italic',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'privateClassTimings',
    category: 'basic',
    order: 9,
    customName: 'Teacher Basic Private Class Timings Section',
    content: {
      heading: 'Private Class Timings',
      items: [
        { day: 'Monday - Friday', time: '5:00 PM - 7:00 PM' },
        { day: 'Saturday', time: '10:00 AM - 1:00 PM' },
      ],
      note: 'Flexible slots available on request.',
    },
    style: {
      bg: 'bg-blue-50',
      card: 'rounded-xl shadow p-4',
      heading: 'text-blue-700 font-bold',
      day: 'text-blue-600',
      time: 'text-gray-700',
      note: 'text-blue-400 italic',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'contact',
    category: 'basic',
    order: 10,
    customName: 'Teacher Basic Contact Section',
    content: {
      heading: 'Contact Us',
      items: [
        { type: 'Email', value: 'priya.sharma@email.com', link: 'mailto:priya.sharma@email.com' },
        { type: 'Phone', value: '+91-9876543210', link: 'tel:+919876543210' },
        { type: 'Address', value: 'Green Valley School, Delhi' },
      ],
      note: 'Feel free to reach out for private classes or school-related queries!',
    },
    style: {
      bg: 'bg-white',
      card: 'rounded-xl shadow p-4',
      heading: 'text-blue-700 font-bold',
      type: 'text-blue-600',
      value: 'text-gray-700',
      note: 'text-blue-400 italic',
      link: 'text-blue-500 underline',
    },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  },
  {
    type: 'professionalJourney',
    category: 'basic',
    order: 11,
    customName: 'Teacher Basic Professional Journey Section',
    content: {
        heading: 'Professional Journey',
        items: [
          { year: '2012', milestone: 'Started private tutoring for high school students.' },
          { year: '2015', milestone: 'Joined Green Valley School as a full-time teacher.' },
          { year: '2019', milestone: 'Mentored state-level Olympiad winners.' },
          { year: '2021', milestone: 'Received Best Teacher Award.' },
        ],
      },
      style: {
        bg: 'bg-white',
        card: 'rounded-xl shadow p-4',
        heading: 'text-blue-700 font-bold',
        year: 'text-blue-500 font-semibold',
        milestone: 'text-gray-700',
      },
    customFields: {
      template: 'teacher',
      variant: 'basic'
    }
  }
];

const seedTeacherBasicComponents = async () => {
  try {
    await dbCon();
    
    console.log('🧹 Starting cleanup and seeding process for Teacher Basic...\n');
    
    // 1. Clear ALL existing teacher basic components (wrong data)
    const deletedComponents = await Component.deleteMany({ 
      $or: [
        { 'customFields.template': 'teacher', 'customFields.variant': 'basic' },
        { type: 'hero', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } },
        { type: 'about', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } },
        { type: 'education', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } },
        { type: 'experience', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } },
        { type: 'courses_taught', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } },
        { type: 'achievements', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } },
        { type: 'student_feedback', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } },
        { type: 'private_class_fees', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } },
        { type: 'private_class_timings', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } },
        { type: 'contact', category: 'basic', customName: { $regex: 'Teacher Basic', $options: 'i' } }
      ]
    });
    console.log(`🗑️  Deleted ${deletedComponents.deletedCount} existing teacher basic components`);
    
    // 2. Clear existing teacher basic template
    const deletedTemplate = await Template.deleteOne({ key: teacherBasicTemplate.key });
    if (deletedTemplate.deletedCount > 0) {
      console.log('🗑️  Deleted existing teacher basic template');
    }
    
    // 3. Insert new template
    const template = await Template.create(teacherBasicTemplate);
    console.log(`✅ Template created: ${template.name} (${template.key})`);
    
    // 4. Insert new components
    const result = await Component.insertMany(teacherBasicComponents);
    
    console.log(`\n✅ Successfully inserted ${result.length} teacher basic components:`);
    result.forEach(component => {
      console.log(`  - ${component.customName} (${component.type})`);
    });
    
    console.log('\n🎉 Teacher Basic cleanup and seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Deleted ${deletedComponents.deletedCount} old components`);
    console.log(`   - Created 1 new template`);
    console.log(`   - Inserted ${result.length} new components`);
    
  } catch (error) {
    console.error('❌ Error during teacher basic cleanup and seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
};

// Run the cleanup and seeding function
seedTeacherBasicComponents(); 