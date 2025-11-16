import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Pricing = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  };

  const features = [
    {
      name: "Publish Website",
      description: "Make your website public and accessible to everyone",
      price: "₹10",
      unit: "per publish",
      icon: "🌐"
    },
    {
      name: "Remove Watermark",
      description: "Remove 'Built using WebBuilder' branding from your sites",
      price: "₹5",
      unit: "per removal",
      icon: "✨"
    },
    {
      name: "Custom Logo/Favicon",
      description: "Upload your own logo and favicon for professional branding",
      price: "₹7",
      unit: "per logo",
      icon: "🖼️"
    },
    {
      name: "Custom SEO Title",
      description: "Set custom page titles for better search engine visibility",
      price: "₹7",
      unit: "per title",
      icon: "📝"
    },
    {
      name: "Image Storage",
      description: "Upload and store images for your website components",
      price: "₹2",
      unit: "per image",
      icon: "📸"
    },
    {
      name: "Export Website",
      description: "Download your website as HTML or export as JSON data",
      price: "₹8",
      unit: "per export",
      icon: "📦"
    },
    {
      name: "QR Code Generation",
      description: "Generate QR codes to easily share your websites",
      price: "Free",
      unit: "",
      icon: "📱"
    },
    {
      name: "Premium Templates",
      description: "Access to modern and premium website templates",
      price: "₹15",
      unit: "per template",
      icon: "🎨"
    },
    {
      name: "Custom URLs",
      description: "Create custom, memorable URLs for your websites",
      price: "Free",
      unit: "",
      icon: "🔗"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-xl text-gray-600">Pay only for what you use. No monthly fees.</p>
        </div>


        {/* Features List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Features & Pricing</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {features.map((feature, index) => (
              <div key={index} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{feature.price}</div>
                  {feature.unit && <div className="text-sm text-gray-500">{feature.unit}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button 
            onClick={handleGetStarted}
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Get Started Free
          </button>
          <p className="text-gray-600 mt-4">Start building your website today</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 