import React from 'react';
const DoctorBasicContact = ({ content }) => (
  <section className="p-6 rounded-xl bg-white shadow text-center my-6">
    <h3 className="text-xl font-bold text-teal-700 mb-2">{content?.heading || 'Contact the Doctor'}</h3>
    <p className="text-gray-600">{content?.email || 'doctor@example.com'}</p>
  </section>
);
export default DoctorBasicContact; 