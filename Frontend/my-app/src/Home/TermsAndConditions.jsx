import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="mb-3">
                By accessing and using WebBuilder ("the Service"), you accept and agree to be bound by these terms and conditions. If you do not agree, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. User License</h2>
              <p className="mb-3">
                WebBuilder grants you a limited, non-exclusive, non-transferable, and revocable license to use the Service for creating and managing websites for personal or business use, subject to these terms.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may not copy, modify, distribute, sell, or lease any part of the Service or its content without our written permission.</li>
                <li>You may not reverse engineer or attempt to extract the source code of the Service.</li>
                <li>You must comply with all applicable laws and regulations while using the Service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
              <p className="mb-3">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Content Guidelines</h2>
              <p className="mb-3">
                You agree not to use the Service to create websites that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contain illegal, harmful, threatening, abusive, or defamatory content</li>
                <li>Infringe on intellectual property rights</li>
                <li>Contain malware, viruses, or other harmful code</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Service Availability</h2>
              <p>
                We strive to maintain high availability but do not guarantee uninterrupted access to the Service. We reserve the right to modify, suspend, or discontinue the Service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
              <p>
                WebBuilder shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 