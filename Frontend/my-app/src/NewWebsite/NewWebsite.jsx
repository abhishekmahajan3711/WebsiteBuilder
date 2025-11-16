import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addWebsite } from '../redux/websitesSlice';

// Enhanced roles data structure for future scalability
const roles = [
  { 
    key: 'hospital', 
    label: 'Hospital', 
    icon: '👨‍⚕️',
    description: 'Hospitals, Clinics, and Medical Centers',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    hoverColor: 'hover:border-blue-300'
  },
  { 
    key: 'teacher', 
    label: 'Teacher', 
    icon: '👩‍🏫',
    description: 'Educators and academic professionals',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    hoverColor: 'hover:border-green-300'
  },
  { 
    key: 'lawyer', 
    label: 'Lawyer', 
    icon: '⚖️',
    description: 'Legal professionals and law firms',
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    hoverColor: 'hover:border-purple-300'
  },
  { 
    key: 'student', 
    label: 'Student', 
    icon: '🎓',
    description: 'Students and academic portfolios',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    hoverColor: 'hover:border-orange-300'
  },
  // Future roles can be easily added here
  // { 
  //   key: 'designer', 
  //   label: 'Designer', 
  //   icon: '🎨',
  //   description: 'Creative professionals and designers',
  //   color: 'from-pink-500 to-rose-500',
  //   bgColor: 'bg-pink-50',
  //   borderColor: 'border-pink-200',
  //   hoverColor: 'hover:border-pink-300'
  // },
  // { 
  //   key: 'developer', 
  //   label: 'Developer', 
  //   icon: '💻',
  //   description: 'Software developers and tech professionals',
  //   color: 'from-gray-700 to-gray-900',
  //   bgColor: 'bg-gray-50',
  //   borderColor: 'border-gray-200',
  //   hoverColor: 'hover:border-gray-300'
  // }
];

const NewWebsite = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ref for scrolling to templates section
  const templatesRef = React.useRef(null);

  useEffect(() => {
    if (selectedRole) {
      setLoading(true);
      setError(null);
      setTemplates([]);
      setSelectedTemplate(null);
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      axios
        .get(`${apiUrl}/templates?role=${selectedRole}`)
        .then(res => {
          setTemplates(res.data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load templates');
          setLoading(false);
        });
    }
  }, [selectedRole]);

  const handleCreate = async (template) => {
    try {
      setCreating(true);
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await axios.post(
        `${apiUrl}/websites`,
        { role: selectedRole, templateKey: template.key },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const website = res.data;
      dispatch(addWebsite(website)); // Add to Redux
      navigate('/dashboard/edit-website', { state: { website } });
    } catch (err) {
      setError('Failed to create website');
      console.log(err);
      setCreating(false);
    }
  };

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setSelectedTemplate(null);
    // Scroll to templates section after a short delay to ensure templates are loaded
    setTimeout(() => {
      templatesRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 500);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Role Selection */}
        <div className="mb-16">
          <div className="text-center mb-8">
            {/* <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
              <span className="text-2xl font-bold text-indigo-600">1</span>
            </div> */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Profession</h2>
            <p className="text-gray-600">Select the category that best describes your work</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {roles.map(role => (
              <div
                key={role.key}
                onClick={() => handleRoleSelect(role.key)}
                className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedRole === role.key ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
                }`}
              >
                <div className={`h-full p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedRole === role.key 
                    ? `bg-gradient-to-br ${role.color} text-white border-transparent shadow-lg` 
                    : `bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md`
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl mb-2 ${selectedRole === role.key ? 'filter brightness-0 invert' : ''}`}>
                      {role.icon}
                    </div>
                    <h3 className={`text-sm font-bold mb-1 ${
                      selectedRole === role.key ? 'text-white' : 'text-gray-900'
                    }`}>
                      {role.label}
                    </h3>
                    <p className={`text-xs ${
                      selectedRole === role.key ? 'text-white opacity-90' : 'text-gray-600'
                    }`}>
                      {role.description}
                    </p>
                  </div>
                  
                  {/* Selection indicator */}
                  {selectedRole === role.key && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Template Selection */}
        {selectedRole && (
          <div className="mb-16" ref={templatesRef}>
            <div className="text-center mb-8">
              {/* <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div> */}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
              <p className="text-gray-600">
                Select from our professionally designed templates for {roles.find(r => r.key === selectedRole)?.label}s
              </p>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600">Loading templates...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-800">{error}</span>
                </div>
              </div>
            )}

            {!loading && !error && templates.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map(template => (
                  <div
                    key={template._id || template.key}
                    className={`group relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedTemplate === template.key 
                        ? 'border-indigo-500 shadow-xl' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Template Preview */}
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img
                        src={template.thumbnail || 'https://via.placeholder.com/400x250?text=Template+Preview'}
                        alt={template.name}
                        className="w-full h-48 object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          template.category === 'premium' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : template.category === 'modern'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {template.description || 'Professional template designed for your needs'}
                      </p>

                      {/* Create Button */}
                      <button
                        onClick={() => handleCreate(template)}
                        disabled={creating}
                        className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {creating ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating...
                          </div>
                        ) : (
                          'Create Website'
                        )}
                      </button>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && templates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Templates Available</h3>
                <p className="text-gray-600">Templates for this profession are coming soon!</p>
              </div>
            )}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewWebsite;
