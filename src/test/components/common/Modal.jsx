import React, { useState } from "react";

const Modal = ({ visible, onClose, title, extra }) => {
  const [isDark, setIsDark] = useState(false);
  if (!visible) return null;

  return (
    /* 터치 이벤트가 캔버스로 전달되지 않도록 fixed와 높은 z-index 설정 */
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 " 
      onClick={onClose} 
      style={{ zIndex: 1000 }}
    >
      <div
        className={`modal-content relative w-full max-w-[700px] rounded-[30px] border transition-all duration-500 
    ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}
    max-h-[90vh] overflow-y-auto scrollbar-hide overscroll-contain`} // scrollbar-hide 추가!
  onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.5)' : '0 20px 50px rgba(0,0,0,0.1)',
          WebkitOverflowScrolling: 'touch' // iOS 부드러운 스크롤
        }}
      >
        {/* 상단 헤더: 스크롤 시 상단에 고정하고 싶다면 이 부분에 sticky를 줄 수 있습니다. */}
        <div className="flex justify-between items-center p-6 pb-0 sticky top-0 z-10 bg-inherit rounded-t-[30px]">
          <h2 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-blue-500' : 'text-blue-400'}`}>
            {title}
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0'} flex items-center justify-center text-[8px]`}>
                {isDark ? '🌙' : '☀️'}
              </div>
            </button>
            <button onClick={onClose} className="text-xl hover:rotate-90 transition-transform px-2">✕</button>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="p-6 pt-9">
          {React.isValidElement(extra) ? React.cloneElement(extra, { isDark }) : extra}
        </div>
      </div>
    </div>
  );
};

export default Modal;