import React from 'react';

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm';
const labelClass = 'block text-sm font-medium text-gray-700 mb-2';

// Tailwind options for each style key
const textColors = [
  'text-blue-800', 'text-red-600', 'text-green-700', 'text-gray-700', 'text-black', 'text-white',
];
const bgColors = [
  'bg-white', 'bg-gray-100', 'bg-blue-50', 'bg-red-50', 'bg-green-50', 'bg-yellow-50',
];
const cardStyles = [
  '', 'rounded', 'rounded-lg', 'rounded-xl', 'shadow', 'shadow-lg', 'border',
];
const fontSizes = [
  '', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl',
];

const styleOptions = {
  heading: [...textColors],
  subheading:[...textColors],
  text: [...textColors, ...fontSizes],
  link: [...textColors, 'hover:underline', 'font-medium', 'px-2','text-blue-600 underline font-medium'],
  degree: [...textColors],
  college: [...textColors],
  year: [...textColors],
  coursework: [...textColors],
  percentage: [...textColors],
  role: [...textColors],
  description: [...textColors],
  company: [...textColors],
  name: [...textColors],
  issuer: [...textColors],
  date: [...textColors],
  title: [...textColors],
  bg: bgColors,
  card: [...bgColors,...cardStyles]
};

const fieldLabels = {
  heading: 'Heading Style',
  subheading: 'Sub-heading',
  text: 'Text Style',
  link: 'Link Style',
  degree: 'Degree',
  college: 'College',
  year: 'Year',
  coursework: 'Coursework',
  percentage: 'Percentage',
  role: 'Role',
  description: 'Description',
  company: 'Company',
  name: 'Name',
  issuer: 'Issuer',
  date: 'Date',
  title: 'Title',
  bg: 'Background',
  card: 'Card Style',
};

const ThemeEditor = ({ component, onChange }) => {
  if (!component) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-3">🎨</div>
        <p className="text-gray-500 text-sm">Select a component to edit its design</p>
      </div>
    );
  }

  const { style = {} } = component;

  // Update a style key
  const update = (key, value) => {
    onChange({
      ...component,
      style: {
        ...style,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="text-2xl">🎨</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 capitalize">{component.type} Design</h3>
          <p className="text-sm text-gray-500">Customize the appearance of this component</p>
        </div>
      </div>

      {/* Style Fields - Only show keys present in style object */}
      <div className="space-y-4">
        {Object.keys(style).map((key) => (
          <div key={key} className="space-y-2">
            <label className={labelClass}>{fieldLabels[key] || key}</label>
            {styleOptions[key] ? (
              <select
                className={inputClass}
                value={style[key] || ''}
                onChange={e => update(key, e.target.value)}
              >
                <option value="">Default</option>
                {styleOptions[key].map(opt => (
                  <option key={opt} value={opt}>{opt || 'None'}</option>
                ))}
              </select>
            ) : (
              <input
                className={inputClass}
                value={style[key] || ''}
                onChange={e => update(key, e.target.value)}
                placeholder="Enter Tailwind class(es)"
              />
            )}
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => {
            onChange({
              ...component,
              style: {},
            });
          }}
        >
          Reset to Default Styles
        </button>
      </div>
    </div>
  );
};

export default ThemeEditor; 