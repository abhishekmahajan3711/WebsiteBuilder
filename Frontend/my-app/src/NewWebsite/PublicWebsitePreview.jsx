import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LivePreview from './LivePreview';

const PublicWebsitePreview = () => {
  const { id: slug } = useParams();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/preview/${slug}`
        );
        setWebsite(response.data);
      } catch (err) {
        if (err.response?.status === 403) {
          setError('This website is not published yet');
        } else if (err.response?.status === 404) {
          setError('Website not found');
        } else {
          setError('Failed to load website');
        }
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchWebsite();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading website...</p>
        </div>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Website Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The website you are looking for does not exist.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Website Content */}
      <div className="w-full">
        <LivePreview 
          components={website.components || []} 
          theme={website.theme} 
          role={website.role} 
          templateType={website.templateKey?.split('_')[0] || 'basic'} 
          watermark={website.watermark}
          website={website}
        />
      </div>
    </div>
  );
};

export default PublicWebsitePreview; 