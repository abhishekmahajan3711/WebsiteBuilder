import React from 'react';
import PropTypes from 'prop-types';

const ComponentList = ({ components, selectedIdx, onSelect, availableComponents, setComponents }) => {
  // Map for quick lookup
  const componentMap = Object.fromEntries((components || []).map((c, i) => [c.type, { ...c, idx: i }]));

  // Drag and drop state
  const [draggedIdx, setDraggedIdx] = React.useState(null);
  const [dragOverIdx, setDragOverIdx] = React.useState(null);

  const handleToggle = (type) => {
    if (componentMap[type]) {
      // Remove component
      setComponents(prev => prev.filter(c => c.type !== type));
    } else {
      // Add component (with default content)
      setComponents(prev => [...prev, { type, content: {}, customName: type, order: prev.length + 1 }]);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (idx) => setDraggedIdx(idx);
  const handleDragOver = (e, idx) => {
    e.preventDefault();
    setDragOverIdx(idx);
  };
  const handleDragLeave = () => setDragOverIdx(null);
  const handleDrop = (idx) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    setComponents(prev => {
      const newArr = [...prev];
      const [removed] = newArr.splice(draggedIdx, 1);
      newArr.splice(idx, 0, removed);
      return newArr;
    });
    setDraggedIdx(null);
    setDragOverIdx(null);
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span>📋</span>
          Website Components
        </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {(components || []).length} active
        </span>
      </div>

      {/* Active Components */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Active Components
        </h4>
        
  {(components || []).length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <div className="text-gray-400 text-4xl mb-2">📝</div>
            <p className="text-gray-500 text-sm">No components selected</p>
            <p className="text-gray-400 text-xs mt-1">Add components from the list below</p>
          </div>
        )}

        <div className="space-y-2">
          {(components || []).map((comp, idx) => (
            <div
              key={comp.type}
              className={`group relative transition-all duration-200`}
            >
              {/* Drag drop indicator */}
              {dragOverIdx === idx && draggedIdx !== idx && (
                <div className="absolute inset-0 bg-blue-100 border-2 border-blue-300 rounded-lg -z-10"></div>
              )}
              
              <div
                className={`bg-white border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedIdx === idx 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${draggedIdx === idx ? 'opacity-50 scale-95' : ''}`}
                onClick={() => onSelect(idx)}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(idx)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-2xl">{getComponentIcon(comp.type)}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 capitalize">{comp.type}</div>
                      <div className="text-xs text-gray-500">Component #{idx + 1}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(comp.type);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-red-500 hover:bg-red-50 rounded"
                      title="Remove component"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="text-gray-400 cursor-move" title="Drag to reorder">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Components */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          Available Components
        </h4>
        
        <div className="grid grid-cols-1 gap-2">
          {availableComponents.filter(type => !componentMap[type]).map(type => (
            <div
              key={type}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => handleToggle(type)}
            >
              <div className="flex items-center gap-3">
                <div className="text-xl">{getComponentIcon(type)}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-700 capitalize">{type}</div>
                  <div className="text-xs text-gray-500">Click to add</div>
                </div>
                <div className="text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {availableComponents.filter(type => !componentMap[type]).length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            All available components are already added
          </div>
        )}
      </div>
    </div>
  );
};

ComponentList.propTypes = {
  components: PropTypes.array.isRequired,
  selectedIdx: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  availableComponents: PropTypes.array.isRequired,
  setComponents: PropTypes.func.isRequired,
};

export default ComponentList; 