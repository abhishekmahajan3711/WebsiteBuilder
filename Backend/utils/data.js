import mongoose from 'mongoose';
import Template from '../models/Template.js';
import Component from '../models/Component.js';

const MONGO_URI = process.env.DB_URL;

const studentBasicTemplate = {
  key: 'basic_student_v1',
  name: 'Student Basic Template',
  role: 'student',
  category: 'basic',
  thumbnail: '/thumbnails/basic_student.png',
  availableComponents: [
    'hero_section', 'about', 'contact', 'education', 'experience', 'certificates', 'achievements', 'projects', 'footer'
  ],
};

const studentBasicComponents = [
  {
    type: 'hero_section',
    category: 'basic',
    order: 1,
    customName: 'Student Hero Section',
    content: {
      heading: 'Welcome to My Portfolio',
      subheading: 'Hi, I am John Doe',
      text: 'Aspiring Web Developer passionate about building beautiful and functional web experiences.',
      images: ['https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&q=80'],
    },
    style: {
      heading: 'text-blue-900',
      subheading: 'text-blue-700',
      text: 'text-gray-700',
      bg: 'bg-white',
      card: 'rounded-xl shadow',
    },
    customFields: {},
  },
  {
    type: 'about',
    category: 'basic',
    order: 2,
    customName: 'Student About Section',
    content: {
      heading: 'About Me',
      text: 'I am a passionate web developer with a love for learning and building new things. Currently pursuing my B.Tech in Computer Science.',
    },
    style: {
      heading: 'text-blue-800',
      text: 'text-gray-700',
      bg: 'bg-white',
      card: 'rounded-xl shadow',
    },
    customFields: {},
  },
  {
    type: 'contact',
    category: 'basic',
    order: 3,
    customName: 'Student Contact Section',
    content: {
      heading: 'Contact Me',
      text: 'Feel free to reach out for collaborations or just a friendly hello!',
      links: [
        { label: 'Email', url: 'mailto:johndoe@email.com' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
      ],
    },
    style: {
      heading: 'text-blue-800',
      text: 'text-gray-700',
      link: 'text-blue-600 hover:underline font-medium px-2',
      card: 'bg-white rounded-xl shadow',
      bg: '',
    },
    customFields: {},
  },
  {
    type: 'education',
    category: 'basic',
    order: 4,
    customName: 'Student Education Section',
    content: {
      heading: 'Education',
      items: [
        {
          degree: 'B.Tech in Computer Science',
          college: 'ABC Institute of Technology',
          year: '2021 - 2025',
          percentage: '8.7 CGPA',
          coursework: 'Data Structures, Algorithms, Web Development, DBMS',
        },
        {
          degree: 'High School',
          college: 'XYZ Senior Secondary School',
          year: '2019 - 2021',
          percentage: '92%',
          coursework: 'Mathematics, Physics, Computer Science',
        },
      ],
    },
    style: {
      heading: 'text-blue-800',
      card: 'bg-white rounded-xl shadow',
      degree: 'text-blue-900',
      college: 'text-blue-700',
      year: 'text-gray-500',
      coursework: 'text-gray-600',
      percentage: 'text-blue-600',
      bg: '',
    },
    customFields: {},
  },
  {
    type: 'experience',
    category: 'basic',
    order: 5,
    customName: 'Student Experience Section',
    content: {
      heading: 'Internship & Experience',
      items: [
        {
          role: 'Frontend Intern',
          company: 'Tech Solutions Pvt. Ltd.',
          year: 'June 2024 - Aug 2024',
          description: 'Worked on building responsive React components and improved website performance by 20%.',
        },
        {
          role: 'Web Developer (Freelance)',
          company: 'Freelance',
          year: '2023',
          description: 'Developed personal and small business websites using React and Tailwind CSS.',
        },
      ],
    },
    style: {
      heading: 'text-blue-800',
      card: 'bg-blue-50 rounded-xl shadow',
      role: 'text-blue-900',
      company: 'text-blue-700',
      year: 'text-gray-500',
      description: 'text-gray-600',
      bg: '',
    },
    customFields: {},
  },
  {
    type: 'certificates',
    category: 'basic',
    order: 6,
    customName: 'Student Certificates Section',
    content: {
      heading: 'Certificates',
      items: [
        {
          name: 'React Developer Certification',
          issuer: 'Coursera',
          year: '2024',
          url: 'https://coursera.org/certificate/react-dev',
        },
        {
          name: 'Responsive Web Design',
          issuer: 'freeCodeCamp',
          year: '2023',
          url: 'https://freecodecamp.org/certificate/web-design',
        },
      ],
    },
    style: {
      heading: 'text-blue-800',
      card: 'bg-white rounded-xl shadow',
      name: 'text-blue-900',
      issuer: 'text-blue-700',
      year: 'text-gray-500',
      link: 'text-blue-600 underline font-semibold',
      bg: '',
    },
    customFields: {},
  },
  {
    type: 'achievements',
    category: 'basic',
    order: 7,
    customName: 'Student Achievements Section',
    content: {
      heading: 'Achievements',
      items: [
        {
          title: 'Winner - College Hackathon 2024',
          description: 'Secured 1st place in the annual college hackathon among 100+ teams.',
          date: 'March 2024',
        },
        {
          title: 'Top 10 - National Coding Olympiad',
          description: 'Ranked in the top 10 out of 5000+ participants.',
          date: 'December 2023',
        },
      ],
    },
    style: {
      heading: 'text-blue-800',
      card: 'bg-white rounded-xl shadow',
      title: 'text-blue-900',
      description: 'text-gray-700',
      date: 'text-blue-600',
      bg: '',
    },
    customFields: {},
  },
  {
    type: 'projects',
    category: 'basic',
    order: 8,
    customName: 'Student Projects Section',
    content: {
      heading: 'Projects',
      items: [
        {
          title: 'Personal Portfolio Website',
          description: 'A responsive portfolio website built with React and Vite.',
          images: [],
          links: [
            { label: 'GitHub', url: 'https://github.com/johndoe/portfolio' },
          ],
        },
        {
          title: 'Weather App',
          description: 'A simple weather app using OpenWeatherMap API.',
          images: [],
          links: [
            { label: 'GitHub', url: 'https://github.com/johndoe/weather-app' },
          ],
        },
      ],
    },
    style: {
      heading: 'text-blue-800',
      card: 'bg-white rounded-xl shadow',
      title: 'text-blue-900',
      description: 'text-gray-700',
      link: 'text-blue-600 underline font-medium',
      bg: '',
    },
    customFields: {},
  },
  {
    type: 'footer',
    category: 'basic',
    order: 9,
    customName: 'Student Footer Section',
    content: {
      text: '© 2024 John Doe. All rights reserved.',
    },
    style: {
      text: 'text-gray-500',
      bg: 'bg-white',
      card: '',
    },
    customFields: {},
  },
];

async function seedStudentBasicTemplate() {
  await mongoose.connect("mongodb+srv://abhipersonal3711:apfcCJ9SxdvUdVpf@cluster0.ndxek4f.mongodb.net/website_builder?retryWrites=true&w=majority&appName=Cluster0");
  // Insert template
  await Template.deleteOne({ key: studentBasicTemplate.key });
  await Template.create(studentBasicTemplate);

  // Insert components
  for (const comp of studentBasicComponents) {
    await Component.deleteOne({ type: comp.type, category: comp.category, customName: comp.customName });
    await Component.create(comp);
  }

  console.log('Student Basic Template and components seeded!');
  await mongoose.disconnect();
}

seedStudentBasicTemplate().catch(console.error);