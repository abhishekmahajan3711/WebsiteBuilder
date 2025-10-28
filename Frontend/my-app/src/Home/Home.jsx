import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const featureList = [
  {
    key: "publish_limit",
    label: "Publish Websites",
    desc: "Make your websites public and accessible to everyone with just one click.",
    icon: "🌐",
    category: "publishing"
  },
  {
    key: "watermark_removal",
    label: "Remove Watermark",
    desc: "Remove 'Built using WebBuilder' branding from your sites for a professional look.",
    icon: "✨",
    category: "branding"
  },
  {
    key: "title",
    label: "Custom SEO Title",
    desc: "Set custom page titles for better search engine visibility and ranking.",
    icon: "📝",
    category: "seo"
  },
  {
    key: "logoUrl",
    label: "Custom Logo/Favicon",
    desc: "Upload your own logo and favicon for professional branding.",
    icon: "🖼️",
    category: "branding"
  },
  {
    key: "store_images",
    label: "Image Storage",
    desc: "Upload and store images for your website components with secure cloud storage.",
    icon: "📸",
    category: "content"
  },
  {
    key: "export_website",
    label: "Export Website",
    desc: "Download your website as HTML or export as JSON data for complete ownership.",
    icon: "📦",
    category: "export"
  },
  {
    key: "qr_code",
    label: "QR Code Generation",
    desc: "Generate QR codes to easily share your websites on any platform.",
    icon: "📱",
    category: "sharing"
  },
  {
    key: "template_access",
    label: "Premium Templates",
    desc: "Access to modern and premium website templates for every industry.",
    icon: "🎨",
    category: "templates"
  },
  {
    key: "custom_slug",
    label: "Custom URLs",
    desc: "Create custom, memorable URLs for your websites to enhance branding.",
    icon: "🔗",
    category: "urls"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  };

  return (
    <main className="bg-gradient-to-br from-purple-100 via-teal-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="flex justify-center items-center py-8 px-2 bg-transparent">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center gap-10 border border-purple-100">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-6 leading-tight">
              Build Your Website <span className="text-teal-500">In 10 Minutes </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-xl">
              The most flexible website builder. Choose your features, pay for what you need, and launch in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={handleGetStarted} className="px-8 py-3 bg-teal-500 text-white rounded-lg font-semibold shadow hover:bg-teal-600 transition text-lg">Get Started Free</button>
              <a href="#pricing" className="px-8 py-3 border-2 border-purple-600 text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition text-lg">Pricing</a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Website Templates" className="w-full max-w-md rounded-2xl shadow-xl object-cover" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-800 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to create professional websites with ease. Choose the features that work best for your project.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-700 mb-2 group-hover:text-purple-600 transition-colors">{feature.label}</h3>
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">{feature.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">{feature.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-800 mb-4">Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">No hidden fees, no subscriptions. Pay only for the features you use with our credit system.</p>
        </div>
        
        <div className="text-center">
          <Link 
            to="/pricing" 
            className="inline-block bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-purple-700 transition-all duration-300 text-lg"
          >
            View Complete Pricing
          </Link>
          <p className="text-gray-600 mt-4">See all features and their costs in detail</p>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="max-w-3xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">About Us</h2>
        <p className="text-lg text-gray-700 mb-4">Created by <span className="font-semibold">Abhishek Mahajan</span>. Passionate about empowering everyone to build beautiful websites easily.</p>
        <div className="flex space-x-6 justify-center mt-2 mb-4">
          <a href="https://www.linkedin.com/in/abhishek-mahajan-8a5a91252" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-teal-500"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg></a>
          <a href="https://github.com/abhishekmahajan3711" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-teal-500"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
          <a href="https://www.instagram.com/abhishekmahajan3000" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-teal-500"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32 1.28.059 1.689.072 7.191.072s5.911-.013 7.191-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191s-.013-5.911-.072-7.191c-.059-1.277-.353-2.45-1.32-3.417C19.45.425 18.277.131 17 .072 15.721.013 15.311 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
          <a href="mailto:abhishekmahajan3711@gmail.com" aria-label="Email" className="hover:text-teal-500"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.99-7.065v14h24v-14l-12.01 7.065 11.99-7.065z"/></svg></a>
        </div>
        <Link to="/about" className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
          Learn More About Us
        </Link>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="max-w-3xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-2">Phone: <a href="tel:8080142710" className="underline hover:text-teal-500">8080142710</a></p>
        <p className="text-lg text-gray-700 mb-4">Email: <a href="mailto:abhishekmahajan3711@gmail.com" className="underline hover:text-teal-500">abhishekmahajan3711@gmail.com</a></p>
        <Link to="/contact" className="px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">
          Get in Touch
        </Link>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">Ready to Build?</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-xl">Sign up now and start creating your dream website with the features you need. No credit card required!</p>
        <button onClick={handleGetStarted} className="px-8 py-3 bg-teal-500 text-white rounded-lg font-semibold shadow hover:bg-teal-600 transition text-lg">Get Started</button>
      </section>
    </main>
  );
};

export default Home;
