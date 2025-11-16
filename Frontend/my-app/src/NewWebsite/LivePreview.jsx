import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Watermark from '../components/Watermark';

// Use Vite's glob import to dynamically load all template components
// This allows Vite to analyze and bundle all components at build time
const componentModules = import.meta.glob('../templates/**/*.jsx', { eager: false });

// Helper to map type to filename
const typeToFile = {
  hero: 'hero',
  about: 'about',
  contact: 'contact',
  header: 'header',
  footer: 'footer',
  achievements:'achievements',
  certificates:'certificates',
  education:'education',
  experience:'experience',
  projects:'projects',
  coursesTaught:'coursesTaught',
  privateClassFees:'privateClassFees',
  privateClassTimings:'privateClassTimings',
  proffesionalJourney:'professionalJourney',
  studentFeedback:'studentFeedback'
};

// Helper to get the component path
const getComponentPath = (role, templateType, type) => {
  const file = typeToFile[type] || type;
  // Try role-specific first, then common_role
  const rolePath = `../templates/${role}/${templateType}/${file}.jsx`;
  const commonPath = `../templates/common_role/${templateType}/${file}.jsx`;
  return [rolePath, commonPath];
};

const DynamicComponent = ({ role, templateType, type, content, style }) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const [rolePath, commonPath] = getComponentPath(role, templateType, type);
    
    // Find the module in the glob map
    const moduleLoader = componentModules[rolePath] || componentModules[commonPath];
    
    if (moduleLoader) {
      moduleLoader()
        .then((module) => {
          setComponent(() => module.default);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load component:', err);
          setError(err);
          setLoading(false);
        });
    } else {
      setError(new Error(`Component not found: ${rolePath} or ${commonPath}`));
      setLoading(false);
    }
  }, [role, templateType, type]);

  if (loading) {
    return (
      <div className="h-36 w-full bg-gray-200 rounded-lg animate-pulse mb-4"></div>
    );
  }

  if (error || !Component) {
    return (
      <div className="rounded-xl border-2 border-dashed border-red-200 bg-red-50 p-6 text-center">
        <div className="text-red-500 text-4xl mb-3">⚠️</div>
        <h3 className="text-red-700 font-medium mb-1">Component Not Found</h3>
        <p className="text-red-600 text-sm">Component for type "{type}" could not be loaded</p>
        <p className="text-red-500 text-xs mt-1">Role: {role}, Template: {templateType}</p>
      </div>
    );
  }

  return <Component content={content} style={style} />;
};



const LivePreview = ({ components, theme, role = 'common_role', templateType = 'basic', watermark, website }) => {
  // Set document title and favicon manually
  useEffect(() => {
    if (website?.seo?.title) {
      document.title = website.seo.title;
    } else {
      document.title = 'Website Builder';
    }
    if (website?.seo?.logoUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = website.seo.logoUrl;
    }
  }, [website]);


  return (
    <div className="space-y-6 min-h-screen relative">
      {/* Components */}
      {components.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-300 text-6xl mb-4">👁️</div>
          <h3 className="text-gray-500 font-medium mb-2">No Components to Preview</h3>
          <p className="text-gray-400 text-sm">Add components from the Components tab to see them here</p>
        </div>
      ) : (
        <div className="space-y-0">
          {components.map((comp, idx) => (
            <div key={idx} className="relative group">
              {/* Component Content */}
              <div className="relative">
                <DynamicComponent
                  role={role}
                  templateType={templateType}
                  type={comp.type}
                  content={comp.content}
                  style={comp.style}
                />
              </div>
            </div>
          ))}
          {/* Watermark at the bottom if not removed */}
          {watermark && <Watermark />}
        </div>
      )}
    </div>
  );
};

LivePreview.propTypes = {
  components: PropTypes.array.isRequired,
  theme: PropTypes.object,
  role: PropTypes.string,
  templateType: PropTypes.string,
  watermark: PropTypes.bool,
};

export default LivePreview; 