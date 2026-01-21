import React, { useEffect, useRef, useState } from 'react';
import DemoPcimg from '../../assets/images/DemoPc.svg'; 
import DetailCard from '../../components/common/DetailCard';
import DemoDiqtyqueImg from '../../assets/images/DemoDiptyque.svg'; 

const useScrollFadeIn = (delay = 0) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const target = domRef.current;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            });
        }, { threshold: 0.1 });

        if (target && target instanceof Element) observer.observe(target);
        return () => { if (target && target instanceof Element) observer.unobserve(target); };
    }, [delay]);

    return { ref: domRef, isVisible };
};

function Diptyque({ isDark }) {
    const fadeInImage = useScrollFadeIn(100);   
    const fadeInInfo = useScrollFadeIn(400);    
    const fadeInDetails = useScrollFadeIn(700); 

    const techStacks = [
        { name: 'HTML5', percentage: 95, color: 'bg-orange-500', icon: '🌐' },
        { name: 'CSS3', percentage: 95, color: 'bg-blue-500', icon: '🎨' },
        { name: 'JavaScript', percentage: 85, color: 'bg-yellow-400', icon: '⚡' },
    ];

    return (
        <div className="flex flex-col gap-8 text-left pb-10">

            {/* [왼쪽 섹션] */}
            <div
                ref={fadeInImage.ref}
                className={`basis-2/5 flex flex-col items-center md:items-start transition-all duration-1000 ease-out transform ${
                    fadeInImage.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="relative mb-6 group/img w-full flex justify-center">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-400 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000"></div>

                    <div className="relative w-full md:w-auto overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
                        <img
                            src={DemoPcimg}
                            className='block w-full h-auto object-contain'
                            style={{ maxHeight: '500px' }}
                            alt="PC Frame"
                        />
                        <div className="absolute inset-0 w-[100%] h-[87%] overflow-hidden bg-black rounded-sm">
                            <img
                                src={DemoDiqtyqueImg}
                                alt="Diptyque Demo Screen"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-110"
                            />
                        </div>
                    </div>
                </div>

                <div className={`w-full p-5 rounded-2xl space-y-4 shadow-sm ${isDark ? 'bg-indigo-900/20 border border-indigo-800/50' : 'bg-indigo-50 border border-indigo-100'}`}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Project Name</span>
                            <p className="text-lg font-bold">Diptyque Micro Site</p>
                        </div>
                        <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Type</span>
                            <p className="text-lg font-bold">PC Showroom</p>
                        </div>
                    </div>
                    <a href="https://gyo50.github.io/Micro.github.io/" target="_blank" rel="noreferrer"
                        className={`group relative flex items-center justify-center w-full py-4 rounded-xl font-black overflow-hidden transition-all duration-500 ${isDark ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-gray-900 text-white hover:bg-black'}`}>
                        <span className="absolute left-0 opacity-0 -translate-x-full group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100 text-2xl transition-all duration-500">✨</span>
                        <span className="group-hover:translate-x-full group-hover:opacity-0 transition-all duration-500">SHOWROOM VIEW</span>
                    </a>
                </div>
            </div>

            {/* [오른쪽 섹션] */}
            <div
                ref={fadeInInfo.ref}
                className={`basis-3/5 space-y-4 transition-all duration-1000 ease-out transform ${
                    fadeInInfo.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
                    PROJECT DETAILS
                </h3>

                <div className="grid grid-cols-1 gap-3">
                    <div className={`p-5 rounded-2xl border ${isDark ? 'bg-gray-800/40 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                        <h4 className="text-xs font-bold mb-4 opacity-60">TECH STACK</h4>
                        <div className="space-y-4">
                            {techStacks.map((tech) => (
                                <div key={tech.name} className="space-y-1">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span>{tech.icon} {tech.name}</span>
                                        <span>{fadeInInfo.isVisible ? tech.percentage : 0}%</span>
                                    </div>
                                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                        <div
                                            className={`h-full transition-all duration-[1500ms] ease-out ${tech.color}`}
                                            style={{ width: fadeInInfo.isVisible ? `${tech.percentage}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={fadeInDetails.ref}
                        className={`space-y-3 transition-all duration-1000 ease-out transform ${
                            fadeInDetails.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}
                    >
                        <DetailCard title="소개" icon="🕯️" isDark={isDark}>
                            니치 향수 브랜드 '딥디크'의 아이덴티티를 담아 백화점 쇼룸 형태의 사용자 경험을 제공하는 마이크로 사이트입니다.
                        </DetailCard>

                        <DetailCard title="개발 배경" icon="🏛️" isDark={isDark}>
                            단순한 상품 나열이 아닌, 딥디크 고유의 감성을 웹 공간에 재현해보고자 해외 가상 쇼룸 사이트들을 분석하여 구현했습니다.
                        </DetailCard>

                        {/* 🔥 이 부분을 다른 프로젝트와 동일한 형식으로 수정했습니다. */}
                        <DetailCard title="배운 점 & 성과" icon="🎨" isDark={isDark}>
                            <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                                <li><span className="font-bold text-indigo-500">비주얼 구현:</span> CSS 애니메이션을 활용하여 브랜드 특유의 감각적이고 부드러운 전환 효과 구현</li>
                                <li><span className="font-bold text-indigo-500">인터랙티브 UI:</span> JavaScript를 활용하여 사용자의 움직임에 실시간으로 반응하는 쇼룸 인터랙션 개발</li>
                                <li><span className="font-bold text-indigo-500">UX 설계:</span> 브랜드 서사와 시각적 흐름을 고려하여 체류 시간을 높이는 사용자 중심의 레이아웃 설계</li>
                            </ul>
                        </DetailCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diptyque;