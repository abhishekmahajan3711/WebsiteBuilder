import mongoose from 'mongoose';
import { componentSchema } from './models/Component.js';
import Template from './models/Template.js';
import dbCon from './utils/db.js';
import dotenv from 'dotenv';

dotenv.config();

const Component = mongoose.model('Component', componentSchema, 'components');

// Template data for student premium
const studentPremiumTemplate = {
  key: 'premium_student_v1',
  name: 'Student Premium Template',
  role: 'student',
  category: 'premium',
  thumbnail: 'https://firebasestorage.googleapis.com/v0/b/websitebuilder-b1f96.firebasestorage.app/o/templates%2Fstudent_premium1.png?alt=media&token=3d036e64-96ad-42af-98ce-deb64b4ce4e7',
  availableComponents: [
    'header', 'about', 'education', 'experience', 'projects', 'achievements', 'certificates', 'contact', 'footer'
  ],
};

const studentPremiumComponents = [
  {
    type: 'header',
    category: 'premium',
    order: 1,
    customName: 'Student Premium Hero Section',
    content: {
      heading: 'Alexander Lee',
      subheading: 'Full Stack Developer & Tech Speaker',
      text: 'Crafting digital experiences with precision and passion.',
      images: ['https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&q=80'],
      links: [
        { label: 'Personal Site', url: 'https://alexlee.dev' },
        { label: 'YouTube', url: 'https://youtube.com/alexlee' },
        { label: 'GitHub', url: 'https://github.com/alexlee' },
      ],
    },
    style: {
      bg: 'bg-gradient-to-br from-[#232526] to-[#414345]',
      card: 'rounded-3xl shadow-2xl border-4 border-yellow-400',
      heading: 'text-yellow-400 font-serif',
      subheading: 'text-white/90',
      text: 'text-white/80',
      link: 'text-yellow-300 hover:underline font-semibold',
      border: 'border-4 border-yellow-400',
    },
    customFields: {
      template: 'student',
      variant: 'premium'
    }
  },
  {
    type: 'about',
    category: 'premium',
    order: 2,
    customName: 'Student Premium About Section',
    content: {
      heading: 'About Me',
      text: 'Award-winning developer, speaker, and mentor. I specialize in building scalable web applications and sharing knowledge at global tech conferences.',
      images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'],
      links: [
        { label: 'CV', url: 'https://alexlee.dev/cv.pdf' },
      ],
    },
    style: {
      bg: 'bg-gradient-to-br from-[#232526] to-[#414345]',
      card: 'rounded-3xl shadow-2xl border-4 border-yellow-400',
      heading: 'text-yellow-400 font-serif',
      text: 'text-white/90',
      link: 'text-yellow-300 hover:underline font-semibold',
      border: 'border-4 border-yellow-400',
      image: 'w-32 h-32 md:w-44 md:h-44 rounded-2xl object-cover shadow-lg border-4 border-yellow-400 mb-6 md:mb-0',
    },
    customFields: {
      template: 'student',
      variant: 'premium'
    }
  },
  {
    type: 'education',
    category: 'premium',
    order: 3,
    customName: 'Student Premium Education Section',
    content: {
      heading: 'Education',
      items: [
        {
          degree: 'M.Sc. in Computer Science',
          college: 'Elite University',
          year: '2021 - 2023',
          percentage: '9.5 CGPA',
          coursework: 'Distributed Systems, AI, Cloud Computing',
        },
        {
          degree: 'B.Tech in Computer Science',
          college: 'Prestige Institute of Technology',
          year: '2017 - 2021',
          percentage: '9.2 CGPA',
          coursework: 'Algorithms, Web Development, Databases',
        },
      ],
    },
    style: {
      heading: 'text-yellow-400 font-serif',
      card: 'bg-gradient-to-br from-[#232526] to-[#414345] rounded-3xl shadow-2xl border-4 border-yellow-400',
      degree: 'text-yellow-300',
      college: 'text-yellow-200',
      year: 'text-yellow-100',
      coursework: 'text-white/80',
      percentage: 'text-yellow-400',
      bg: '',
    },
    customFields: {
      template: 'student',
      variant: 'premium'
    }
  },
  {
    type: 'experience',
    category: 'premium',
    order: 4,
    customName: 'Student Premium Experience Section',
    content: {
      heading: 'Experience',
      items: [
        {
          role: 'Lead Developer',
          company: 'Fortune Tech',
          year: '2023 - Present',
          description: 'Leading a team to build scalable enterprise solutions for global clients.',
        },
        {
          role: 'Software Engineer',
          company: 'InnovateX',
          year: '2021 - 2023',
          description: 'Developed AI-powered web applications and optimized cloud infrastructure.',
        },
      ],
    },
    style: {
      heading: 'text-yellow-400 font-serif',
      card: 'bg-gradient-to-br from-[#232526] to-[#414345] rounded-3xl shadow-2xl border-4 border-yellow-400',
      role: 'text-yellow-300',
      company: 'text-yellow-200',
      year: 'text-yellow-100',
      description: 'text-white/80',
      bg: '',
    },
    customFields: {
      template: 'student',
      variant: 'premium'
    }
  },
  {
    type: 'projects',
    category: 'premium',
    order: 5,
    customName: 'Student Premium Projects Section',
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
    customFields: {
      template: 'student',
      variant: 'premium'
    }
  },
  {
    type: 'achievements',
    category: 'premium',
    order: 6,
    customName: 'Student Premium Achievements Section',
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
    customFields: {
      template: 'student',
      variant: 'premium'
    }
  },
  {
    type: 'certificates',
    category: 'premium',
    order: 7,
    customName: 'Student Premium Certificates Section',
    content: {
      heading: 'Certificates',
      items: [
        {
          name: 'Cloud Architect Professional',
          issuer: 'Google Cloud',
          year: '2024',
          url: 'https://cloud.google.com/certification/cloud-architect',
        },
        {
          name: 'AI Specialist',
          issuer: 'Microsoft',
          year: '2023',
          url: 'https://learn.microsoft.com/certifications/ai-engineer/',
        },
      ],
    },
    style: {
      heading: 'text-yellow-400 font-serif',
      card: 'bg-gradient-to-br from-[#232526] to-[#414345] rounded-3xl shadow-2xl border-4 border-yellow-400',
      name: 'text-yellow-300',
      issuer: 'text-yellow-200',
      year: 'text-yellow-100',
      link: 'bg-yellow-400 text-[#232526] px-4 py-2 rounded-full font-bold shadow hover:scale-105 transition-transform',
      bg: '',
    },
    customFields: {
      template: 'student',
      variant: 'premium'
    }
  },
  {
    type: 'contact',
    category: 'premium',
    order: 8,
    customName: 'Student Premium Contact Section',
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
    customFields: {
      template: 'student',
      variant: 'premium'
    }
  },
  {
    type: 'footer',
    category: 'premium',
    order: 9,
    customName: 'Student Premium Footer Section',
    content: {
      text: '© 2025 Alexander Lee. Crafted with excellence.',
      links: [
        { label: 'Terms', url: '#' },
        { label: 'Contact', url: 'mailto:alex@alexlee.dev' },
      ],
    },
    style: {
      bg: 'bg-gradient-to-r from-[#232526] to-[#414345]',
      text: 'text-yellow-400 font-serif',
      link: 'text-yellow-300 hover:underline font-medium px-2',
      card: 'rounded-t-3xl shadow-xl border-t-4 border-yellow-400',
    },
    customFields: {
      template: 'student',
      variant: 'premium'
    }
  }
];

const seedStudentPremiumComponents = async () => {
  try {
    await dbCon();
    
    console.log('🧹 Starting cleanup and seeding process for Student Premium...\n');
    
    // 1. Clear ALL existing student premium components (wrong data)
    const deletedComponents = await Component.deleteMany({ 
      $or: [
        { 'customFields.template': 'student', 'customFields.variant': 'premium' },
        { type: 'hero', category: 'premium', customName: { $regex: 'Student Premium', $options: 'i' } },
        { type: 'about', category: 'premium', customName: { $regex: 'Student Premium', $options: 'i' } },
        { type: 'education', category: 'premium', customName: { $regex: 'Student Premium', $options: 'i' } },
        { type: 'experience', category: 'premium', customName: { $regex: 'Student Premium', $options: 'i' } },
        { type: 'projects', category: 'premium', customName: { $regex: 'Student Premium', $options: 'i' } },
        { type: 'achievements', category: 'premium', customName: { $regex: 'Student Premium', $options: 'i' } },
        { type: 'certificates', category: 'premium', customName: { $regex: 'Student Premium', $options: 'i' } },
        { type: 'contact', category: 'premium', customName: { $regex: 'Student Premium', $options: 'i' } },
        { type: 'footer', category: 'premium', customName: { $regex: 'Student Premium', $options: 'i' } }
      ]
    });
    console.log(`🗑️  Deleted ${deletedComponents.deletedCount} existing student premium components`);
    
    // 2. Clear existing student premium template
    const deletedTemplate = await Template.deleteOne({ key: studentPremiumTemplate.key });
    if (deletedTemplate.deletedCount > 0) {
      console.log('🗑️  Deleted existing student premium template');
    }
    
    // 3. Insert new template
    const template = await Template.create(studentPremiumTemplate);
    console.log(`✅ Template created: ${template.name} (${template.key})`);
    
    // 4. Insert new components
    const result = await Component.insertMany(studentPremiumComponents);
    
    console.log(`\n✅ Successfully inserted ${result.length} student premium components:`);
    result.forEach(component => {
      console.log(`  - ${component.customName} (${component.type})`);
    });
    
    console.log('\n🎉 Student Premium cleanup and seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Deleted ${deletedComponents.deletedCount} old components`);
    console.log(`   - Created 1 new template`);
    console.log(`   - Inserted ${result.length} new components`);
    
  } catch (error) {
    console.error('❌ Error during student premium cleanup and seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Database connection closed');
  }
};

// Run the cleanup and seeding function
seedStudentPremiumComponents(); 