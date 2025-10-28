import React from 'react';

const Watermark = () => {
  return (
    <div className=" w-full bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto text-center py-2">
        <span className="text-xs text-gray-500">
          Built using <span className="font-semibold text-blue-600">WebBuilder</span>
        </span>
      </div>
    </div>
  );
};

export default Watermark; 