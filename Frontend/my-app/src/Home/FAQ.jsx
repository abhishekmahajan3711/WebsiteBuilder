import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const FAQ = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [openItems, setOpenItems] = useState(new Set());

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  };

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I get started with WebBuilder?",
          answer: "Getting started is easy! Simply sign up for a free account, choose a template that fits your needs, and start customizing. You can begin building immediately without any credit card required. Our intuitive interface makes it easy to create professional websites in minutes."
        },
        {
          question: "Do I need coding knowledge to use WebBuilder?",
          answer: "No coding knowledge required! WebBuilder is designed to be user-friendly for everyone. Our drag-and-drop interface and pre-built templates make website creation accessible to users of all skill levels. You can create professional websites without any technical background."
        },
        {
          question: "What types of websites can I create?",
          answer: "You can create various types of websites including personal portfolios, business websites, professional profiles, educational sites, and more. We offer templates for different industries and purposes, and you can fully customize them to match your specific needs."
        }
      ]
    },
    {
      category: "Pricing & Credits",
      questions: [
        {
          question: "How does the credit system work?",
          answer: "WebBuilder uses a credit-based system where you only pay for the features you use. Credits never expire and you can purchase them as needed. Different features cost different amounts - for example, publishing a website costs 10 credits, while removing watermarks costs 5 credits."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards and digital payment methods. Our secure payment system ensures your information is protected. You can purchase credits anytime and they're immediately available for use."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees! Our pricing is completely transparent. You only pay for the credits you purchase, and there are no monthly subscriptions or hidden charges. Start building for free and only pay when you want to publish or use premium features."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "Can I export my website?",
          answer: "Yes! You can export your website as HTML files or download the raw JSON data for further customization. The export feature costs 8 credits and gives you complete ownership of your website files."
        },
        {
          question: "Can I upload my own images?",
          answer: "Absolutely! You can upload your own images to use in your website components. Image storage costs 2 credits per image, and you can replace images anytime. We support common image formats like JPG, PNG, and GIF."
        },
        {
          question: "What is the watermark and how do I remove it?",
          answer: "The watermark shows 'Built using WebBuilder' on your published websites. You can remove it for 5 credits per website. This gives your site a more professional, unbranded appearance."
        }
      ]
    },
    {
      category: "Publishing & SEO",
      questions: [
        {
          question: "How do I publish my website?",
          answer: "Publishing is simple! Once you're satisfied with your website, click the 'Publish' button in your dashboard. Publishing costs 10 credits and makes your website publicly accessible with a unique URL. You can unpublish and republish anytime."
        },
        {
          question: "Can I customize my website's SEO?",
          answer: "Yes! You can set custom SEO titles for better search engine visibility. This feature costs 7 credits per title and helps improve your website's ranking in search results."
        },
        {
          question: "Can I use my own domain name?",
          answer: "Currently, we provide custom URLs (slugs) for your websites. You can create memorable, custom URLs for your websites at no additional cost. For example: webbuilder.com/your-website-name"
        }
      ]
    },
    {
      category: "Templates & Customization",
      questions: [
        {
          question: "How many templates are available?",
          answer: "We offer a wide variety of templates across different categories including basic, modern, and premium options. Premium templates cost 15 credits each and offer more advanced designs and features."
        },
        {
          question: "Can I customize templates?",
          answer: "Yes! All templates are fully customizable. You can modify colors, fonts, layouts, content, and styling to match your brand and preferences. Our theme editor makes customization easy and intuitive."
        },
        {
          question: "Are templates mobile-responsive?",
          answer: "All our templates are mobile-responsive by default. Your websites will automatically adapt to different screen sizes and look great on desktop, tablet, and mobile devices."
        }
      ]
    },
    {
      category: "Support & Help",
      questions: [
        {
          question: "Is customer support available?",
          answer: "Yes! We provide email support and are always here to help you make the most of WebBuilder. You can reach us through our contact form or directly at abhishekmahajan3711@gmail.com"
        },
        {
          question: "Can I get help with my website design?",
          answer: "While we don't provide custom design services, our templates are professionally designed and easy to customize. Our support team can help you with technical questions and platform usage."
        },
        {
          question: "What if I have a feature request?",
          answer: "We welcome feature requests! You can submit your ideas through our contact form. We regularly update WebBuilder based on user feedback and suggestions."
        }
      ]
    },
    {
      category: "Account & Security",
      questions: [
        {
          question: "How do I reset my password?",
          answer: "You can reset your password by clicking 'Forgot Password?' on the sign-in page. We'll send you a secure link to create a new password. The link expires in 1 hour for security."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we take security seriously. Your data is encrypted and stored securely. We use industry-standard security practices to protect your information and website content."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account at any time. Please contact our support team if you need help with account deletion. Note that deleting your account will permanently remove all your websites and data."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <Link to="/" className="text-purple-600 hover:text-purple-700 font-semibold">
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((item, itemIndex) => {
                    const index = `${categoryIndex}-${itemIndex}`;
                    const isOpen = openItems.has(index);
                    
                    return (
                      <div key={itemIndex} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleItem(index)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{item.question}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Have Questions?</h2>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Contact Us
                </Link>
                <a 
                  href="mailto:abhishekmahajan3711@gmail.com" 
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>

          {/* Get Started Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 mb-6">
                Start building your website today with our easy-to-use platform.
              </p>
              <button
                onClick={handleGetStarted}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Get Started Today
              </button>
              <p className="text-gray-600 mt-4">Start building amazing websites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 