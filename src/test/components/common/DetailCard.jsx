import React from 'react';

function DetailCard({ title, icon, children, isDark }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      isDark 
        ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-800/60' 
        : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
    }`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className={`text-[13px] font-bold ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
          {title}
        </h4>
        <span className="text-lg">{icon}</span>
      </div>
      <div className={`text-[13px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {children}
      </div>
    </div>
  );
}

export default DetailCard;