import React from 'react';
import axios from 'axios';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeatureAccess } from '../redux/authSlice';

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm';
const labelClass = 'block text-sm font-medium text-gray-700 mb-2';
const textareaClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm resize-vertical min-h-[80px]';

const ComponentEditor = ({ component, template, onChange }) => {
  if (!component) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-3">✏️</div>
        <p className="text-gray-500 text-sm">Select a component to edit its content</p>
      </div>
    );
  }

  // Find the template definition for this component type
  let templateComponentDef = null;
  if (template && Array.isArray(template.components)) {
    templateComponentDef = template.components.find(tc => tc.type === component.type);
  }
  // Get the list of editable content fields from the template, or fallback to all fields in content
  const editableFields = templateComponentDef && templateComponentDef.content
    ? Object.keys(templateComponentDef.content)
    : (component.content && typeof component.content === 'object' ? Object.keys(component.content) : []);

  // Helper to update nested fields
  const update = (field, value, section = 'content') => {
    onChange({
      ...component,
      [section]: {
        ...component[section],
        [field]: value,
      },
    });
  };

  // Helper to safely access content fields
  const getContentValue = (field) => {
    if (!component.content || typeof component.content !== 'object') {
      return '';
    }
    return component.content[field] || '';
  };

  // For array fields (images, videos, links)
  const updateArray = (field, value, idx, section = 'content') => {
    const currentSection = component[section] || {};
    const arr = Array.isArray(currentSection[field]) ? [...currentSection[field]] : [];
    arr[idx] = value;
    update(field, arr, section);
  };
  const addToArray = (field, section = 'content', defaultValue = '') => {
    const currentSection = component[section] || {};
    const arr = Array.isArray(currentSection[field]) ? [...currentSection[field]] : [];
    arr.push(defaultValue);
    update(field, arr, section);
  };
  const removeFromArray = (field, idx, section = 'content') => {
    const currentSection = component[section] || {};
    const arr = Array.isArray(currentSection[field]) ? [...currentSection[field]] : [];
    arr.splice(idx, 1);
    update(field, arr, section);
  };

  // For array of objects (items)
  // Get item field keys from template if available
  let itemFieldKeys = [];
  if (
    templateComponentDef &&
    templateComponentDef.content &&
    Array.isArray(templateComponentDef.content.items) &&
    templateComponentDef.content.items.length > 0
  ) {
    itemFieldKeys = Object.keys(templateComponentDef.content.items[0]);
  } else if (
    component.content &&
    Array.isArray(component.content.items) &&
    component.content.items.length > 0
  ) {
    // Fallback to existing items structure
    itemFieldKeys = Object.keys(component.content.items[0]);
  }

  const updateItemField = (idx, key, value) => {
    const items = Array.isArray(component.content?.items) ? [...component.content.items] : [];
    items[idx] = { ...items[idx], [key]: value };
    update('items', items);
  };
  const addItem = () => {
    const items = Array.isArray(component.content?.items) ? [...component.content.items] : [];
    let newItem = {};
    if (itemFieldKeys.length > 0) {
      newItem = Object.fromEntries(
        itemFieldKeys.map(key => {
          // If the first item has an array for this key, initialize as array with one object with correct keys
          if (
            Array.isArray(component.content?.items) &&
            component.content.items.length > 0 &&
            Array.isArray(component.content.items[0][key])
          ) {
            // Try to get the structure from the first item, or fallback to a single empty object
            const first = component.content.items[0][key][0];
            if (first && typeof first === 'object') {
              // Initialize with one object with same keys
              const obj = Object.fromEntries(Object.keys(first).map(k => [k, '']));
              return [key, [obj]];
            }
            return [key, [{}]];
          }
          return [key, ''];
        })
      );
    } else {
      newItem = { field: '' };
    }
    items.push(newItem);
    update('items', items);
  };
  const removeItem = (idx) => {
    const items = Array.isArray(component.content?.items) ? [...component.content.items] : [];
    items.splice(idx, 1);
    update('items', items);
  };

  // Helper to safely get items array
  const getItemsArray = () => {
    return Array.isArray(component.content?.items) ? component.content.items : [];
  };

  // Helper to render nested array of objects (e.g., links, images inside items)
  const renderNestedArray = (item, idx, key) => {
    return (
      <div className="mb-2" key={key}>
        <label className={labelClass}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
        {Array.isArray(item[key]) && item[key].map((sub, subIdx) => (
          <div key={subIdx} className="flex gap-2 mb-2 items-center">
            {Object.keys(sub).map(subKey => (
              <input
                key={subKey}
                className={inputClass}
                value={sub[subKey] || ''}
                onChange={e => {
                  const newArr = [...item[key]];
                  newArr[subIdx] = { ...newArr[subIdx], [subKey]: e.target.value };
                  updateItemField(idx, key, newArr);
                }}
                placeholder={subKey.charAt(0).toUpperCase() + subKey.slice(1)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const getComponentIcon = (type) => {
    const icons = {
      hero: '🎯',
      about: 'ℹ️',
      contact: '📞',
      header: '📋',
      footer: '🔗',
      achievements: '🏆',
      certificates: '📜',
      education: '🎓',
      experience: '💼',
      projects: '💻'
    };
    return icons[type] || '📄';
  };

  const [uploadingIdx, setUploadingIdx] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  // Firebase image upload handler
  const handleFirebaseImageUpload = async (file, idx) => {
    setUploadingIdx(idx);
    setUploadProgress(0);
    try {
      // Check if the file name matches the current image URL
      const currentImgUrl = component.content.images[idx];
      let currentImgName = '';
      let fileName = '';
      if (currentImgUrl) {
        try {
          const urlParts = currentImgUrl.split('/');
          currentImgName = urlParts[urlParts.length - 1].split('?')[0]; // Remove query params if any
          const decoded = decodeURIComponent(currentImgName);
          fileName = decoded.split('/').pop();
        } catch {}
      }
      let shouldDecrement = true;
      if (fileName === file.name) {
        shouldDecrement = false;
      }
      // Decrement image credit before upload if needed
      if (shouldDecrement) {
        const token = localStorage.getItem('token');
        try {
          const res = await axios.post('http://localhost:5000/api/auth/decrement-image-credit', {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.data && res.data.featureAccess) {
            dispatch(updateFeatureAccess(res.data.featureAccess));
          }
        } catch (err) {
          setUploadingIdx(null);
          setUploadProgress(0);
          alert(err.response?.data?.message || 'Not enough image credits.');
          return;
        }
      }
      // Proceed with Firebase upload
      const emailFolder = user?.email ? user.email.replace(/[^a-zA-Z0-9._-]/g, '_') : 'unknown_user';
      const storageRef = ref(storage, `component-images/${emailFolder}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setUploadingIdx(null);
          setUploadProgress(0);
          alert('Image upload failed: ' + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          updateArray('images', downloadURL, idx);
          setUploadingIdx(null);
          setUploadProgress(100);
        }
      );
    } catch (err) {
      setUploadingIdx(null);
      setUploadProgress(0);
      alert('Image upload failed: ' + err.message);
    }
  };

  const handlePurchaseImageCredits = () => {
    navigate('/dashboard/plan');
  };

  const featureAccess = useSelector(state => state.auth.featureAccess);
  const imageCredits = featureAccess?.features?.store_images?.value ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="text-2xl">{getComponentIcon(component.type)}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 capitalize">{component.type} Content</h3>
          <p className="text-sm text-gray-500">Edit the content for this component</p>
        </div>
      </div>

      {/* Content Fields */}
      <div className="space-y-4">
        {/* Dynamic content field rendering for Mixed content */}
        {editableFields.map(field => {
          const value = component.content?.[field];
          
          // Skip complex fields that have their own sections
          if (['images', 'videos', 'links', 'items'].includes(field)) {
            return null;
          }
          
          // Handle string fields
          if (typeof value === 'string' || value === null || value === undefined) {
            const isLongText = field === 'text' || (value && value.length > 100);
            return (
              <div key={field}>
                <label className={labelClass}>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                {isLongText ? (
                  <textarea 
                    className={textareaClass} 
                    value={value || ''} 
                    onChange={e => update(field, e.target.value)}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  />
                ) : (
                  <input 
                    className={inputClass} 
                    value={value || ''} 
                    onChange={e => update(field, e.target.value)}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  />
                )}
              </div>
            );
          }
          
          // Handle other types (objects, arrays, etc.)
          return (
            <div key={field}>
              <label className={labelClass}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <textarea 
                className={textareaClass} 
                value={JSON.stringify(value, null, 2)} 
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    update(field, parsed);
                  } catch (err) {
                    // Invalid JSON, don't update
                  }
                }}
                placeholder={`Enter ${field} as JSON`}
              />
            </div>
          );
        })}

        {/* Images: fixed length, only replace */}
        {editableFields.includes('images') && component.content && Array.isArray(component.content.images) && component.content.images.length > 0 && (
          <div>
            <label className={labelClass}>Image URL{component.content.images.length > 1 ? 's' : ''}</label>
            <div className="space-y-2">
              {component.content.images.map((img, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input 
                    className={inputClass} 
                    value={img} 
                    onChange={e => updateArray('images', e.target.value, idx)}
                    placeholder={`Image ${idx + 1} URL`}
                  />
                  <label className="px-3 py-1.5 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors text-xs">
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={async e => {
                        if (imageCredits <= 0) {
                          alert('You have no image credits left. Please purchase more to upload images.');
                          return;
                        }
                        const file = e.target.files[0];
                        if (file) {
                          await handleFirebaseImageUpload(file, idx);
                        }
                      }}
                      disabled={uploadingIdx === idx || imageCredits <= 0}
                    />
                  </label>
                  {uploadingIdx === idx && (
                    <div className="w-24 bg-gray-200 rounded h-2">
                      <div className="bg-blue-500 h-2 rounded" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}
                  {img && (
                    <img src={img} alt="" className="h-12 w-12 object-cover rounded" />
                  )}
                </div>
              ))}
              {imageCredits <= 0 && (
                <>
                  <div className="text-xs text-red-600 mt-1">You have no image credits left. Please purchase more to upload images.</div>
                  <button
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition"
                    onClick={handlePurchaseImageCredits}
                  >
                    Purchase Image Credits
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Videos: fixed length, only replace */}
        {editableFields.includes('videos') && component.content && Array.isArray(component.content.videos) && component.content.videos.length > 0 && (
          <div>
            <label className={labelClass}>Video URL{component.content.videos.length > 1 ? 's' : ''}</label>
            <div className="space-y-2">
              {component.content.videos.map((vid, idx) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    className={inputClass} 
                    value={vid} 
                    onChange={e => updateArray('videos', e.target.value, idx)}
                    placeholder={`Video ${idx + 1} URL`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links: fixed length, only replace */}
        {editableFields.includes('links') && component.content && Array.isArray(component.content.links) && component.content.links.length > 0 && (
          <div>
            <label className={labelClass}>Links (Label + URL)</label>
            <div className="space-y-3">
              {component.content.links.map((link, idx) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    className={inputClass + ' w-1/3'} 
                    placeholder="Label" 
                    value={link.label} 
                    onChange={e => updateArray('links', { ...link, label: e.target.value }, idx)} 
                  />
                  <input 
                    className={inputClass + ' w-2/3'} 
                    placeholder="URL" 
                    value={link.url} 
                    onChange={e => updateArray('links', { ...link, url: e.target.value }, idx)} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items (array of objects): add/remove allowed, use template for keys */}
        {editableFields.includes('items') && component.content && Array.isArray(component.content?.items) && itemFieldKeys.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className={labelClass}>Items</label>
              <button 
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                onClick={addItem}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Item
              </button>
            </div>
            
            <div className="space-y-3">
              {getItemsArray().map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Item #{idx + 1}</span>
                    <button 
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                      onClick={() => removeItem(idx)}
                      title="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {itemFieldKeys.map((key) => {
                      // Nested array of objects (e.g., links, images)
                      if (Array.isArray(item[key]) && item[key].length > 0 && typeof item[key][0] === 'object') {
                        return renderNestedArray(item, idx, key);
                      }
                      // Primitive field
                      return (
                        <div key={key}>
                          <label className={labelClass}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                          <input
                            className={inputClass}
                            value={item[key] || ''}
                            onChange={e => updateItemField(idx, key, e.target.value)}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* No editable fields message */}
      {editableFields.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-3">📝</div>
          <p className="text-gray-500 text-sm">No editable content fields for this component</p>
        </div>
      )}
    </div>
  );
};

export default ComponentEditor; 