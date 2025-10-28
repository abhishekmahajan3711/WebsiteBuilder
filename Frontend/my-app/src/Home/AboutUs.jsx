import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AboutUs = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Link to="/" className="text-purple-600 hover:text-purple-700 font-semibold">
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">About WebBuilder</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                At WebBuilder, we believe that everyone deserves the ability to create beautiful, professional websites without the complexity of traditional web development. Our mission is to democratize web creation by providing an intuitive, powerful, and accessible platform that empowers individuals and businesses to bring their digital visions to life.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Do</h2>
              <p className="mb-4 text-lg leading-relaxed">
                WebBuilder is a comprehensive website creation platform that combines the simplicity of drag-and-drop design with the power of advanced customization. We offer:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li><strong>Professional Templates:</strong> Pre-designed templates for various industries and use cases</li>
                <li><strong>Custom Components:</strong> Easy-to-use building blocks for creating unique layouts</li>
                <li><strong>Real-time Preview:</strong> See your changes instantly as you build</li>
                <li><strong>SEO Optimization:</strong> Built-in tools to help your site rank better in search engines</li>
                <li><strong>Mobile Responsive:</strong> All websites automatically adapt to different screen sizes</li>
                <li><strong>Export Options:</strong> Download your website as HTML or export as JSON data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg leading-relaxed">
                Founded by Abhishek Mahajan, WebBuilder was born from a simple observation: while the internet has become essential for businesses and individuals alike, creating a professional website remains unnecessarily complex and expensive. Traditional web development requires technical expertise, while many website builders are either too limited or too expensive for the average user.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                We set out to bridge this gap by creating a platform that offers the best of both worlds - the simplicity that beginners need with the power that professionals demand. Our credit-based system ensures that users only pay for the features they actually use, making professional web development accessible to everyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Simplicity</h3>
                  <p>We believe that powerful tools should be easy to use. Our interface is designed to be intuitive and accessible to users of all skill levels.</p>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-teal-800 mb-2">Innovation</h3>
                  <p>We continuously push the boundaries of what's possible in web creation, always looking for new ways to make the process easier and more powerful.</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Accessibility</h3>
                  <p>We're committed to making web creation accessible to everyone, regardless of their technical background or budget constraints.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Quality</h3>
                  <p>We maintain high standards in everything we do, from our code quality to our user experience and customer support.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Meet the Team</h2>
              <div className="bg-gradient-to-r from-purple-100 to-teal-100 p-6 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    AM
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Abhishek Mahajan</h3>
                    <p className="text-gray-600">Founder & Lead Developer</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Passionate about empowering everyone to build beautiful websites easily. 
                      With expertise in modern web technologies and a vision for democratizing web creation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
              <p className="mb-4 text-lg">
                WebBuilder is built using cutting-edge technologies to ensure reliability, performance, and scalability:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
                  <p className="text-sm text-gray-600">React.js, Tailwind CSS, Redux</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Backend</h4>
                  <p className="text-sm text-gray-600">Node.js, Express, MongoDB</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Cloud Services</h4>
                  <p className="text-sm text-gray-600">Firebase Storage, Email Services</p>
                </div>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Start Building?</h2>
              <p className="text-lg mb-6">
                Join thousands of users who are already creating amazing websites with WebBuilder.
              </p>
              <div className="text-center mt-12">
                <button
                  onClick={handleGetStarted}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Get Started Today
                </button>
                <p className="text-gray-600 mt-4">Start building amazing websites</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 