import React, { useState ,useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ComponentList from './ComponentList';
import ComponentEditor from './ComponentEditor';
import ThemeEditor from './ThemeEditor';
import WebsiteSettings from './WebsiteSettings';
import LivePreview from './LivePreview';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateWebsite as updateWebsiteRedux } from '../redux/websitesSlice';

const EditWebsite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  // Get websiteId from route params or location.state
  const websiteId = id || location.state?.website?._id;
  const websiteFromRedux = useSelector(state =>
    state.websites.websites.find(w => w._id === websiteId)
  );
  const website = websiteFromRedux || location.state?.website;
  const [components, setComponents] = useState(website?.components || []);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [availableComponents, setAvailableComponents] = useState([]);
  const [title, setTitle] = useState(website?.title || '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [template, setTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState('components'); // components, content, design, settings
  const previewRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
   console.log(components)
    setComponents(website.components || []);
    setTitle(website.title || '');
    // Fetch template if needed
    const fetchTemplate = async () => {
      if (!website?.templateKey) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/templates/with-components?key=${website.templateKey}`);
        setTemplate(res.data);
        setAvailableComponents(res.data?.availableComponents || []);
      } catch (err) {
        setAvailableComponents([]);
        setTemplate(null);
      }
    };
    fetchTemplate();
  }, [website]);

  // Remove all code related to setUserSpecialComponents and handleEnableSpecialComponent


  const handleSelect = idx => setSelectedIdx(idx);
  
  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${website._id}`, {
        title,
        components,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSaveMsg('Saved successfully!');
      dispatch(updateWebsiteRedux(res.data));
      setTimeout(() => setSaveMsg(''), 3000);
      return res.data;
    } catch (err) {
      setSaveMsg('Failed to save.');
      console.log(err);
      return null;
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'components', label: 'Components', icon: '📋' },
    { id: 'content', label: 'Content', icon: '✏️' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'components':
        return (
          <ComponentList
            components={components}
            selectedIdx={selectedIdx}
            onSelect={handleSelect}
            availableComponents={availableComponents}
            setComponents={setComponents}
          />
        );
      case 'content':
        return (
          <ComponentEditor
            component={components[selectedIdx]}
            template={template}
            onChange={updated => {
              setComponents(prev => prev.map((c, i) => i === selectedIdx ? { ...c, content: updated.content } : c));
            }}
          />
        );
      case 'design':
        return (
          <ThemeEditor
            component={components[selectedIdx]}
            template={template}
            onChange={updated => {
              setComponents(prev => prev.map((c, i) => i === selectedIdx ? { ...c, style: updated.style } : c));
            }}
          />
        );
      case 'settings':
        return <WebsiteSettings website={website} onSave={handleSave} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          
          {/* Main Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Website Editor</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Title:</span>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="font-medium bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1 min-w-[120px] text-gray-900"
                      placeholder="Enter website title"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>💾</span>
                    Save Changes
                  </div>
                )}
              </button>
              {saveMsg && (
                <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  saveMsg.includes('success') 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {saveMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Editor */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <span>👁️</span>
                  Preview
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      if (saving) return; // Prevent double click
                      await handleSave();
                      const websiteUrl = `${window.location.origin}/preview/${website._id}`;
                      window.open(websiteUrl, '_blank');
                    }}
                    className={`p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors${saving ? ' opacity-50 cursor-not-allowed' : ''}`}
                    title="Open in new tab"
                    disabled={saving}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-h-[600px] max-h-[800px] overflow-y-auto" ref={previewRef} data-preview-root>
                <LivePreview 
                  components={components} 
                  theme={website.theme} 
                  role={website.role} 
                  templateType={website.templateKey?.split('_')[0] || 'basic'} 
                  showTypeOnHover={true}
                  watermark={website.watermark}
                  // website={website}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWebsite;
