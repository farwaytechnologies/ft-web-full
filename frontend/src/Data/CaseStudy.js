// Case Studies Data - Corrected Projects
import cctvHero from '../assets/Image/cctv.jpg';
import im1 from '../assets/Image/cpmpu.jpg'
import  im2 from '../assets/Image/design.jpg'


const caseStudies = [
  {
    id: 1,
    title: "Cam Eye Security Solutions",
    subtitle: "Smart surveillance & protection for modern spaces",
    heroImage: cctvHero,
    
    about: "Cam Eye provides advanced security solutions with cutting-edge CCTV systems tailored for homes and businesses. Our comprehensive approach combines state-of-the-art technology with user-friendly interfaces to deliver peace of mind through intelligent monitoring and protection systems. We focused on creating a modern, trustworthy platform that showcases their expertise while making security solutions accessible to everyone.",
    
    services: [
      "UI/UX Design",
      "Web Development", 
      "Search Engine Optimisation",
      "Cloud Services"
    ],
    
    gallery: [
      {
        type: 'image',
        src: im1,
        alt: 'CCTV Security System Dashboard'
      },
      {
        type: 'image',
        src: im2,
        alt: 'Mobile Security App Interface'
      },
      {
        type: 'image',
        src: cctvHero,
        alt: 'Professional CCTV Installation'
      },
      {
        type: 'image',
        src: cctvHero,
        alt: 'Security Camera Monitoring Setup'
      }
    ],
    
    language: "HTML / CSS / JavaScript",
    timescale: "20 Weeks",
    launchDate: "September 2022",
    system: "Static Website",
    
    challenges: [
      "Build trust with a bold, professional design that reflects security and reliability",
      "Showcase complex security services and technology in an easily digestible format",
      "Ensure fast loading times and responsive UI across all devices",
      "Create an intuitive user journey from awareness to conversion",
      "Integrate multiple security product catalogs effectively",
      "Implement secure contact forms for sensitive security inquiries"
    ],
    
    solutions: [
      "Created a visually strong hero section with compelling security imagery",
      "Integrated responsive service pages with clear call-to-actions",
      "Built contact forms with vanilla JavaScript for seamless communication",
      "Implemented SEO best practices for improved search visibility",
      "Developed mobile-first responsive design using CSS Grid and Flexbox",
      "Added form validation and secure data handling with JavaScript"
    ],
    
    link: "https://cameyesecurity.com"
  },
  
  {
    id: 2,
    title: "Syllabase Learning",
    subtitle: "Comprehensive online learning platform for students",
    heroImage: cctvHero, // Replace with actual learning platform image
    
    about: "Syllabase Learning is a modern educational platform designed to provide comprehensive learning resources and interactive courses for students. The platform features course management, progress tracking, interactive quizzes, and a user-friendly interface that makes learning engaging and accessible for students of all levels.",
    
    services: [
      "UI/UX Design",
      "React Development",
      "Backend Integration",
      "Learning Management System"
    ],
    
    gallery: [
      {
        type: 'image',
        src: cctvHero, // Replace with actual screenshots
        alt: 'Syllabase Learning Dashboard'
      },
      {
        type: 'image',
        src: cctvHero,
        alt: 'Course Catalog Interface'
      },
      {
        type: 'image',
        src: cctvHero,
        alt: 'Interactive Learning Modules'
      },
      {
        type: 'image',
        src: cctvHero,
        alt: 'Student Progress Tracking'
      }
    ],
    
    language: "React.js / CSS / JavaScript",
    timescale: "24 Weeks",
    launchDate: "March 2023",
    system: "React Application",
    
    challenges: [
      "Create an engaging and intuitive learning experience for diverse student needs",
      "Implement complex course management and progress tracking systems",
      "Ensure responsive design works seamlessly across all devices",
      "Build interactive components for quizzes and assignments",
      "Optimize performance for large amounts of educational content",
      "Integrate multiple learning tools and resources in one platform"
    ],
    
    solutions: [
      "Developed component-based architecture using React for scalable UI",
      "Implemented state management for complex user progress tracking",
      "Created responsive design using CSS modules and media queries",
      "Built interactive quiz components with real-time feedback",
      "Optimized bundle size and implemented lazy loading for better performance",
      "Integrated APIs for various educational tools and content management"
    ],
    
    link: "https://syllabaselearning.com/"
  },
  
  {
    id: 3,
    title: "Personal Portfolio",
    subtitle: "Showcasing creative work and professional expertise",
    heroImage: cctvHero, // Replace with portfolio screenshot
    
    about: "A modern, interactive personal portfolio website designed to showcase creative projects and professional skills. The portfolio features a clean, minimalist design with smooth animations, project galleries, and an engaging user experience that effectively communicates personal brand and expertise to potential clients and employers.",
    
    services: [
      "Personal Branding",
      "Interactive Design",
      "React Development",
      "Performance Optimization"
    ],
    
    gallery: [
      {
        type: 'image',
        src: cctvHero, // Replace with portfolio screenshots
        alt: 'Portfolio Homepage Hero Section'
      },
      {
        type: 'image',
        src: cctvHero,
        alt: 'Projects Gallery Layout'
      },
      {
        type: 'image',
        src: cctvHero,
        alt: 'About Section Design'
      },
      {
        type: 'image',
        src: cctvHero,
        alt: 'Contact Form Interface'
      }
    ],
    
    language: "React.js / CSS / JavaScript",
    timescale: "12 Weeks",
    launchDate: "August 2023",
    system: "React SPA",
    
    challenges: [
      "Create a unique and memorable personal brand through design",
      "Balance creativity with professional presentation",
      "Implement smooth animations without compromising performance",
      "Ensure portfolio works perfectly on all devices and screen sizes",
      "Organize diverse projects in an intuitive and engaging way",
      "Build fast-loading pages while maintaining visual appeal"
    ],
    
    solutions: [
      "Developed a cohesive design system that reflects personal brand identity",
      "Created balanced layout combining creative elements with professional content",
      "Implemented CSS animations and React transitions for smooth interactions",
      "Built fully responsive design using CSS Grid and Flexbox",
      "Organized projects with filtering and categorization for easy navigation",
      "Optimized images and implemented lazy loading for fast performance"
    ],
    
    link: "#" // Add your portfolio URL here
  }
];

// Utility functions
export const getCaseStudyById = (id) => {
  return caseStudies.find(study => study.id === id);
};

export const getAllCaseStudies = () => {
  return caseStudies;
};

export default caseStudies;