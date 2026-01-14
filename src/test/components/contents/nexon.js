import React, { useState, useEffect } from 'react';
import Nexonimg from '../../assets/images/Nexon.png';
import DetailCard from '../../components/common/DetailCard';

function Nexon({ isDark }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // 0.1초 뒤에 애니메이션 상태를 true로 변경 (Fade-in 효과 유발)
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const techStacks = [
        { name: 'HTML5', percentage: 95, color: 'bg-orange-500', icon: '🌐' },
        { name: 'CSS3', percentage: 90, color: 'bg-blue-500', icon: '🎨' },
        { name: 'JavaScript', percentage: 85, color: 'bg-yellow-400', icon: '⚡' },
    ];

    return (
        /* 1. 전체 컴포넌트 Fade-in & Slide-up 효과 적용 */
        <div className={`flex flex-col md:flex-row gap-8 text-left transition-all duration-1000 ease-out transform 
      ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 '}`}>

            <div className="basis-2/5 flex flex-col items-center md:items-start">
                <div className="relative mb-6 group/img">
                    <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000`}></div>
                    <img
                        src={Nexonimg}
                        className='relative w-full h-auto aspect-video md:aspect-[3/4] object-cover rounded-2xl shadow-2xl border-2 border-white/20'
                        alt="넥슨 프로젝트"
                    />
                </div>

                <div className={`w-full p-5 rounded-2xl space-y-4 ${isDark ? 'bg-blue-900/20 border border-blue-800/50' : 'bg-blue-50 border border-blue-100'}`}>
                    <div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Project Name</span>
                        <p className="text-lg font-bold">Nexon Games Redesign</p>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Type</span>
                        <p className="text-lg font-bold">PC / Mobile</p>
                    </div>
                    <a
                        href="https://gyo50.github.io/Nexon.github.io/"
                        target="_blank"
                        rel="noreferrer"
                        className={`group relative flex items-center justify-center w-full py-4 rounded-xl font-black overflow-hidden transition-all duration-500 ${isDark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-900 text-white hover:bg-black'}`}
                    >
                        <span className="absolute left-0 opacity-0 -translate-x-full transition-all duration-500 ease-in-out group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100 text-2xl">
                            🎮
                        </span>

                        <span className="transition-all duration-500 ease-in-out group-hover:translate-x-full group-hover:opacity-0">
                            LIVE DEMO VIEW
                        </span>
                    </a>
                </div>
            </div>

            {/* --- 오른쪽 섹션 --- */}
            <div className="basis-3/5 space-y-4">
                <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                    <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                    PROJECT DETAILS
                </h3>

                <div className="grid grid-cols-1 gap-3">
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

                    <DetailCard title="소개" icon="📝" isDark={isDark}>
                        넥슨게임즈 웹 사이트를 모티브로 하여, 복잡한 게임 홍보보다는 웹 사이트 본연의 기능적 인터랙션을 강조한 나만의 리디자인 프로젝트입니다.
                    </DetailCard>

                    <DetailCard title="개발 배경" icon="💡" isDark={isDark}>
                        단순 정보 나열에서 벗어나 시각적인 화려함과 사용자의 클릭 반응을 유도하는 '동적인 웹'을 직접 설계해보고자 시작했습니다.
                    </DetailCard>

                    <DetailCard title="배운 점 & 성과" icon="🏆" isDark={isDark}>
                        <ul className="list-disc list-inside space-y-1 opacity-90">
                            <li>시멘틱 구조를 통한 웹 표준 준수</li>
                            <li>JavaScript를 활용한 다양한 애니메이션 제어</li>
                            <li>문제 해결을 위한 디버깅 능력 향상</li>
                        </ul>
                    </DetailCard>
                </div>
            </div>
        </div>
    );
}


export default Nexon;