import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy & Cookie Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Name and email address</li>
                <li>Phone number </li>
                <li>Account credentials</li>
                <li>Website content and settings</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Information:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Website creation and editing activities</li>
                <li>Feature usage and credit consumption</li>
                <li>Error logs and performance data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our website builder service</li>
                <li>Process payments and manage your account</li>
                <li>Send you service-related communications</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
              <p className="mb-3">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account and associated data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies and Tracking</h2>
              <p className="mb-3">
                We use cookies and similar technologies to enhance your experience on our website:
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Essential Cookies:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Authentication and session management</li>
                <li>Security and fraud prevention</li>
                <li>Basic website functionality</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics Cookies:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Website usage statistics</li>
                <li>Performance monitoring</li>
                <li>Service improvement insights</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Preference Cookies:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Language and region settings</li>
                <li>User interface preferences</li>
                <li>Feature customization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Third-Party Services</h2>
              <p className="mb-3">
                We may use third-party services that collect information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors (PayPal)</li>
                <li>Cloud storage providers (Firebase, MongoDB)</li>
                <li>Analytics services (Google Analytics)</li>
                <li>Email service providers (Gmail, Nodemailer)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. 
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 