import React, { useState, useEffect } from 'react';
import DiptyqueImg from '../../assets/images/diptyque.png';
import DetailCard from '../../components/common/DetailCard';

function Diptyque({ isDark }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // 모달 오픈 시 페이드인 및 슬라이드 업 효과
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const techStacks = [
    { name: 'HTML5', percentage: 95, color: 'bg-orange-500', icon: '🌐' },
    { name: 'CSS3', percentage: 95, color: 'bg-blue-500', icon: '🎨' },
    { name: 'JavaScript', percentage: 85, color: 'bg-yellow-400', icon: '⚡' },
  ];

  return (
    <div className={`flex flex-col md:flex-row gap-8 text-left transition-all duration-700 ease-out transform 
      ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* --- 왼쪽 섹션: 썸네일 및 요약 --- */}
      <div className="basis-2/5 flex flex-col items-center md:items-start">
        <div className="relative mb-6 group/img">
          {/* 고급스러운 인디고 광채 효과 */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-400 rounded-3xl blur opacity-20 group-hover/img:opacity-40 transition duration-1000`}></div>
          <img 
            src={DiptyqueImg} 
            className='relative w-full h-auto aspect-video md:aspect-[3/4] object-cover rounded-2xl shadow-2xl border-2 border-white/20' 
            alt="딥디크 프로젝트"
          />
        </div>

        <div className={`w-full p-5 rounded-2xl space-y-6 ${isDark ? 'bg-indigo-900/20 border border-indigo-800/50' : 'bg-indigo-50 border border-indigo-100'}`}>
          <div className="space-y-4">
            <div>
              <span className={`text-[10px] font-black uppercase tracking-widest opacity-60 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Project Name</span>
              <p className="text-lg font-bold">Diptyque Micro Site</p>
            </div>
            <div>
              <span className={`text-[10px] font-black uppercase tracking-widest opacity-60 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Type</span>
              <p className="text-lg font-bold font-mono">PC(1920 X 1080)</p>
            </div>
          </div>
          
          {/* 쇼룸 입장 버튼: 중앙 정렬 애니메이션 */}
          <a 
            href="https://gyo50.github.io/Micro.github.io/" 
            target="_blank" 
            rel="noreferrer"
            className={`group relative flex items-center justify-center w-full py-4 rounded-xl font-black overflow-hidden transition-all duration-500
              ${isDark ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-gray-900 text-white hover:bg-black'}`}
          >
            {/* 이모지: 호버 시 중앙으로 이동 */}
            <span className="absolute left-0 opacity-0 -translate-x-full transition-all duration-500 ease-in-out group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100 text-2xl">
              ✨
            </span>
            {/* 텍스트: 호버 시 오른쪽으로 밀려남 */}
            <span className="transition-all duration-500 ease-in-out group-hover:translate-x-full group-hover:opacity-0">
              SHOWROOM ROOM
            </span>
          </a>
        </div>
      </div>

      {/* --- 오른쪽 섹션: 상세 정보 --- */}
      <div className="basis-3/5 space-y-4">
        <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
          <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
          PROJECT DETAILS
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {/* 기술 스택 카드 */}
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-gray-800/40 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
            <h4 className={`text-xs font-bold mb-4 opacity-60 flex justify-between`}>
              TECH STACK <span>BUILD WITH</span>
            </h4>
            <div className="space-y-4">
              {techStacks.map((tech) => (
                <div key={tech.name} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>{tech.icon} {tech.name}</span>
                    <span>{animate ? tech.percentage : 0}%</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full transition-all duration-1000 ease-out ${tech.color}`}
                      style={{ width: animate ? `${tech.percentage}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DetailCard title="소개" icon="🕯️" isDark={isDark}>
            니치 향수 브랜드 '딥디크'의 아이덴티티를 담아 백화점 쇼룸 형태의 사용자 경험을 제공하는 마이크로 사이트입니다.
          </DetailCard>

          <DetailCard title="개발 배경" icon="🏛️" isDark={isDark}>
            단순한 상품 나열이 아닌, 딥디크 고유의 감성을 웹 공간에 재현해보고자 해외 가상 쇼룸 사이트들을 분석하여 구현했습니다.
          </DetailCard>

          <DetailCard title="배운 점" icon="🎨" isDark={isDark}>
            <ul className="list-disc list-inside space-y-1 opacity-90 text-[13px]">
              <li>CSS 애니메이션을 활용한 감각적인 디자인 구현</li>
              <li>복잡한 JS 로직을 통한 인터랙티브 UI 개발</li>
              <li>시각적 흐름을 고려한 사용자 경험 설계</li>
            </ul>
          </DetailCard>
        </div>
      </div>
    </div>
  );
}



export default Diptyque;