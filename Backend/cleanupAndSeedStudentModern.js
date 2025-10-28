import mongoose from 'mongoose';
import { componentSchema } from './models/Component.js';
import Template from './models/Template.js';
import dbCon from './utils/db.js';
import dotenv from 'dotenv';

dotenv.config();

const Component = mongoose.model('Component', componentSchema, 'components');

// Template data for student modern
const studentModernTemplate = {
  key: 'modern_student_v1',
  name: 'Student Modern Template',
  role: 'student',
  category: 'modern',
  thumbnail: '/thumbnails/modern_student.png',
  availableComponents: [
    'hero', 'about', 'education', 'experience', 'projects', 'achievements', 'certificates', 'contact', 'footer'
  ],
};

const studentModernComponents = [
  {
    type: 'hero',
    category: 'modern',
    order: 1,
    customName: 'Student Modern Hero Section',
    content: {
      heading: 'Hi, I\'m Jane Smith',
      subheading: 'UI/UX Enthusiast & Frontend Developer',
      text: 'Designing the future, one pixel at a time. Welcome to my creative space!',
      images: ['https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&q=80'],
    },
    style: {
      bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400',
      card: 'rounded-3xl shadow-2xl',
      heading: 'text-white',
      subheading: 'text-pink-200',
      text: 'text-white/90',
      border: 'border-4 border-white',
    },
    customFields: {
      template: 'student',
      variant: 'modern'
    }
  },
  {
    type: 'about',
    category: 'modern',
    order: 2,
    customName: 'Student Modern About Section',
    content: {
      heading: 'About Me',
      text: 'I am a creative frontend developer with a passion for UI/UX and digital art. Currently pursuing my B.Des in Interaction Design.',
      images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'],
      links: [
        { label: 'Resume', url: 'https://janesmith.dev/resume.pdf' },
      ],
    },
    style: {
      bg: 'bg-white',
      card: 'rounded-2xl shadow-xl',
      heading: 'text-indigo-700',
      text: 'text-gray-700',
      link: 'text-pink-500 hover:underline font-semibold',
      accent: 'bg-gradient-to-r from-indigo-400 to-pink-400',
      image: 'w-40 h-40 rounded-2xl object-cover shadow-lg border-4 border-white mb-4 md:mb-0',
    },
    customFields: {
      template: 'student',
      variant: 'modern'
    }
  },
  {
    type: 'education',
    category: 'modern',
    order: 3,
    customName: 'Student Modern Education Section',
    content: {
      heading: 'Education',
      items: [
        {
          degree: 'B.Des in Interaction Design',
          college: 'Creative Arts University',
          year: '2021 - 2025',
          percentage: '9.1 CGPA',
          coursework: 'UI/UX, Digital Art, Animation, Human-Computer Interaction',
        },
        {
          degree: 'High School',
          college: 'Modern Public School',
          year: '2019 - 2021',
          percentage: '95%',
          coursework: 'Mathematics, Fine Arts, Computer Science',
        },
      ],
    },
    style: {
      heading: 'text-pink-500',
      card: 'bg-gradient-to-r from-indigo-100 to-pink-100 rounded-2xl shadow-xl',
      degree: 'text-indigo-700',
      college: 'text-pink-600',
      year: 'text-gray-500',
      coursework: 'text-gray-600',
      percentage: 'text-indigo-500',
      bg: '',
    },
    customFields: {
      template: 'student',
      variant: 'modern'
    }
  },
  {
    type: 'experience',
    category: 'modern',
    order: 4,
    customName: 'Student Modern Experience Section',
    content: {
      heading: 'Experience',
      items: [
        {
          role: 'UI/UX Intern',
          company: 'Pixel Labs',
          year: 'May 2023 - Aug 2023',
          description: 'Designed interactive prototypes and improved user flows for a SaaS dashboard.',
        },
        {
          role: 'Frontend Developer',
          company: 'Freelance',
          year: '2022 - 2023',
          description: 'Built modern, responsive websites for creative agencies and startups.',
        },
      ],
    },
    style: {
      heading: 'text-indigo-500',
      card: 'bg-gradient-to-r from-pink-100 to-indigo-100 rounded-2xl shadow-xl',
      role: 'text-pink-700',
      company: 'text-indigo-700',
      year: 'text-gray-500',
      description: 'text-gray-700',
      bg: '',
    },
    customFields: {
      template: 'student',
      variant: 'modern'
    }
  },
  {
    type: 'projects',
    category: 'modern',
    order: 5,
    customName: 'Student Modern Projects Section',
    content: {
      heading: 'Projects',
      items: [
        {
          title: 'Modern Portfolio',
          description: 'A visually stunning portfolio template with animations and dark mode.',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
          links: [
            { label: 'Live Demo', url: 'https://janesmith.dev/modern' },
            { label: 'GitHub', url: 'https://github.com/janesmith/modern-portfolio' },
          ],
        },
        {
          title: 'UI Kit Library',
          description: 'A reusable UI kit for React projects.',
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
          links: [
            { label: 'GitHub', url: 'https://github.com/janesmith/ui-kit' },
          ],
        },
      ],
    },
    style: {
      heading: 'text-pink-500',
      card: 'bg-white rounded-3xl shadow-2xl hover:shadow-pink-200 transition-shadow duration-300',
      title: 'text-indigo-700',
      description: 'text-gray-700',
      link: 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-3 py-1 rounded-full font-semibold shadow hover:scale-105 transition-transform',
      overlay: 'bg-gradient-to-t from-indigo-900/80 to-pink-400/30',
      bg: '',
    },
    customFields: {
      template: 'student',
      variant: 'modern'
    }
  },
  {
    type: 'achievements',
    category: 'modern',
    order: 6,
    customName: 'Student Modern Achievements Section',
    content: {
      heading: 'Achievements',
      items: [
        {
          title: 'Best Design Award',
          organization: 'Design Institute',
          year: '2024',
          description: 'Recognized for outstanding portfolio design',
          icon: '🏆'
        },
        {
          title: 'Hackathon Winner',
          organization: 'TechStart Competition',
          year: '2023',
          description: 'First place in UI/UX design challenge',
          icon: '💻'
        }
      ]
    },
    style: {
      heading: 'text-pink-500',
      card: 'bg-white rounded-2xl shadow-xl hover:shadow-pink-200 transition-shadow duration-300',
      title: 'text-indigo-700',
      organization: 'text-pink-500',
      year: 'text-gray-500',
      description: 'text-gray-700',
      icon: 'text-2xl',
      bg: ''
    },
    customFields: {
      template: 'student',
      variant: 'modern'
    }
  },
  {
    type: 'certificates',
    category: 'modern',
    order: 7,
    customName: 'Student Modern Certificates Section',
    content: {
      heading: 'Certificates',
      items: [
        {
          name: 'UI/UX Design Fundamentals',
          issuer: 'Coursera',
          year: '2024',
          url: 'https://coursera.org/certificate/uiux-fundamentals'
        },
        {
          name: 'React Development',
          issuer: 'Udemy',
          year: '2023',
          url: 'https://udemy.com/certificate/react-development'
        }
      ]
    },
    style: {
      heading: 'text-pink-500',
      card: 'bg-white rounded-2xl shadow-xl hover:shadow-pink-200 transition-shadow duration-300',
      name: 'text-indigo-700',
      issuer: 'text-pink-500',
      year: 'text-gray-500',
      link: 'text-pink-500 underline font-semibold',
      bg: ''
    },
    customFields: {
      template: 'student',
      variant: 'modern'
    }
  },
  {
    type: 'contact',
    category: 'modern',
    order: 8,
    customName: 'Student Modern Contact Section',
    content: {
      heading: 'Let\'s Connect',
      text: 'Open to freelance, internships, and creative collaborations. Drop a message!',
      links: [
        { label: 'Email', url: 'mailto:jane@janesmith.dev' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/janesmith' },
        { label: 'Instagram', url: 'https://instagram.com/janesmith.design' },
      ],
    },
    style: {
      heading: 'text-pink-500',
      text: 'text-indigo-900',
      link: 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow hover:scale-105 transition-transform',
      card: 'bg-white rounded-2xl shadow-xl',
      bg: '',
    },
    customFields: {
      template: 'student',
      variant: 'modern'
    }
  },
  {
    type: 'footer',
    category: 'modern',
    order: 9,
    customName: 'Student Modern Footer Section',
    content: {
      text: 'Designed & Built by Jane Smith',
      links: [
        { label: 'Twitter', url: 'https://twitter.com/janesmith' },
        { label: 'Contact', url: 'mailto:jane@janesmith.dev' },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-indigo-600 to-pink-500',
      text: 'text-white',
      link: 'text-pink-200 hover:underline font-medium px-2',
      card: 'rounded-t-2xl shadow-xl',
    },
    customFields: {
      template: 'student',
      variant: 'modern'
    }
  }
];

const cleanupAndSeedStudentModern = async () => {
  try {
    await dbCon();
    
    console.log('🧹 Starting cleanup and seeding process...\n');
    
    // 1. Clear ALL existing student modern components (wrong data)
    const deletedComponents = await Component.deleteMany({ 
      $or: [
        { 'customFields.template': 'student', 'customFields.variant': 'modern' },
        { type: 'hero', category: 'modern', customName: { $regex: 'Student Modern', $options: 'i' } },
        { type: 'about', category: 'modern', customName: { $regex: 'Student Modern', $options: 'i' } },
        { type: 'education', category: 'modern', customName: { $regex: 'Student Modern', $options: 'i' } },
        { type: 'experience', category: 'modern', customName: { $regex: 'Student Modern', $options: 'i' } },
        { type: 'projects', category: 'modern', customName: { $regex: 'Student Modern', $options: 'i' } },
        { type: 'achievements', category: 'modern', customName: { $regex: 'Student Modern', $options: 'i' } },
        { type: 'certificates', category: 'modern', customName: { $regex: 'Student Modern', $options: 'i' } },
        { type: 'contact', category: 'modern', customName: { $regex: 'Student Modern', $options: 'i' } },
        { type: 'footer', category: 'modern', customName: { $regex: 'Student Modern', $options: 'i' } }
      ]
    });
    console.log(`🗑️  Deleted ${deletedComponents.deletedCount} existing student modern components`);
    
    // 2. Clear existing student modern template
    const deletedTemplate = await Template.deleteOne({ key: studentModernTemplate.key });
    if (deletedTemplate.deletedCount > 0) {
      console.log('🗑️  Deleted existing student modern template');
    }
    
    // 3. Insert new template
    const template = await Template.create(studentModernTemplate);
    console.log(`✅ Template created: ${template.name} (${template.key})`);
    
    // 4. Insert new components
    const result = await Component.insertMany(studentModernComponents);
    
    console.log(`\n✅ Successfully inserted ${result.length} student modern components:`);
    result.forEach(component => {
      console.log(`  - ${component.customName} (${component.type})`);
    });
    
    console.log('\n🎉 Cleanup and seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Deleted ${deletedComponents.deletedCount} old components`);
    console.log(`   - Created 1 new template`);
    console.log(`   - Inserted ${result.length} new components`);
    
  } catch (error) {
    console.error('❌ Error during cleanup and seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
};

// Run the cleanup and seeding function
cleanupAndSeedStudentModern(); 