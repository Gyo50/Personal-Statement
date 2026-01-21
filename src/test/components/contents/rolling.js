import React, { useEffect, useRef, useState } from 'react';
import DemoPcimg from '../../assets/images/DemoPc.svg'; // PC 프레임 공통 이미지
import DetailCard from '../../components/common/DetailCard';
import DemoRollingImg from '../../assets/images/DemoRolling.svg'; // 롤링페이퍼 스크린 이미지

/**
 * 스크롤 감지 및 지연 애니메이션을 위한 커스텀 훅
 */
const useScrollFadeIn = (delay = 0) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const target = domRef.current;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            });
        }, { threshold: 0.1 });

        if (target && target instanceof Element) {
            observer.observe(target);
        }

        return () => {
            if (target && target instanceof Element) {
                observer.unobserve(target);
            }
        };
    }, [delay]);

    return { ref: domRef, isVisible };
};

function Rolling({ isDark }) {
    // 섹션별 시차(Delay) 적용
    const fadeInImage = useScrollFadeIn(100);   // 이미지 섹션
    const fadeInInfo = useScrollFadeIn(400);    // 기술 스택 섹션
    const fadeInDetails = useScrollFadeIn(700); // 하단 상세 정보

    const techStacks = [
        { name: 'React', percentage: 90, color: 'bg-cyan-400', icon: '⚛️' },
        { name: 'Tailwind CSS', percentage: 95, color: 'bg-sky-500', icon: '🎨' },
        { name: 'JavaScript', percentage: 85, color: 'bg-yellow-400', icon: '⚡' },
        { name: 'Rest API', percentage: 80, color: 'bg-green-500', icon: '🔗' },
    ];

    return (
        <div className="flex flex-col gap-8 text-left pb-10">

            {/* [왼쪽 섹션] PC 프레임 이미지 및 기본 정보 */}
            <div
                ref={fadeInImage.ref}
                className={`basis-2/5 flex flex-col items-center md:items-start transition-all duration-1000 ease-out transform ${
                    fadeInImage.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="relative mb-6 group/img w-full flex justify-center">
                    {/* 프로젝트 테마에 맞춘 스카이 블루/인디고 광채 */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000"></div>

                    <div className="relative w-full md:w-auto overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
                        {/* PC 프레임 공통 사용 */}
                        <img
                            src={DemoPcimg}
                            className='block w-full h-auto object-contain'
                            style={{ maxHeight: '500px' }}
                            alt="PC Frame"
                        />
                        {/* 내부 스크린 (DemoRollingImg 적용) */}
                        <div className="absolute inset-0 w-[100%] h-[87%] overflow-hidden bg-black rounded-sm">
                            <img
                                src={DemoRollingImg}
                                alt="Rolling Paper Demo Screen"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-110"
                            />
                        </div>
                    </div>
                </div>

                {/* 하단 요약 카드 */}
                <div className={`w-full p-5 rounded-2xl space-y-4 shadow-sm ${isDark ? 'bg-indigo-900/20 border border-indigo-800/50' : 'bg-indigo-50 border border-indigo-100'}`}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Project Name</span>
                            <p className="text-lg font-bold">Rolling Paper</p>
                        </div>
                        <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Type</span>
                            <p className="text-lg font-bold">PC / Mobile (Team)</p>
                        </div>
                    </div>
                    <a href="https://rolling-flax.vercel.app/" target="_blank" rel="noreferrer"
                        className={`group relative flex items-center justify-center w-full py-4 rounded-xl font-black overflow-hidden transition-all duration-500 ${isDark ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-gray-900 text-white hover:bg-black'}`}>
                        <span className="absolute left-0 opacity-0 -translate-x-full group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100 text-2xl transition-all duration-500">📬</span>
                        <span className="group-hover:translate-x-full group-hover:opacity-0 transition-all duration-500">VIEW PROJECT</span>
                    </a>
                </div>
            </div>

            {/* [오른쪽 섹션] 기술 스택 및 상세 설명 */}
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
                    {/* 기술 스택 카드 */}
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

                    {/* 하단 상세 카드 섹션 */}
                    <div
                        ref={fadeInDetails.ref}
                        className={`space-y-3 transition-all duration-1000 ease-out transform ${
                            fadeInDetails.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}
                    >
                        <DetailCard title="소개" icon="💌" isDark={isDark}>
                            축하와 감사의 마음을 온라인 카드로 전하는 롤링 페이퍼 서비스입니다. 아날로그 감성을 디지털 협업 툴로 재해석했습니다.
                        </DetailCard>

                        <DetailCard title="역할 및 기여" icon="👑" isDark={isDark}>
                            프로젝트 팀장으로서 전체적인 일정 관리 및 API 연동을 담당했으며, 팀원들의 원활한 개발을 위한 공통 컴포넌트 설계와 디자인 총괄을 맡았습니다.
                        </DetailCard>

                        <DetailCard title="배운 점 & 성과" icon="📈" isDark={isDark}>
                            <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                                <li><span className="font-bold text-sky-500">데이터 바인딩:</span> React와 Rest API 연동을 통한 실시간 동적 데이터 처리 구현</li>
                                <li><span className="font-bold text-sky-500">팀 협업:</span> Git-flow 전략을 활용하여 코드 충돌을 최소화하고 효율적인 협업 프로세스 구축</li>
                                <li><span className="font-bold text-sky-500">UI/UX 설계:</span> Tailwind CSS를 활용해 모바일과 PC 모두 최적화된 높은 수준의 반응형 디자인 완성</li>
                                <li><span className="font-bold text-sky-500">풀사이클 경험:</span> 기획 단계부터 Vercel 배포까지 프로젝트의 전체 생애주기 주도</li>
                            </ul>
                        </DetailCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rolling;