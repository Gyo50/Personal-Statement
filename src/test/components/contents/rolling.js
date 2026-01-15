import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/common/DetailCard';
import RollingImg from '../../assets/images/Rolling.png';

function Rolling({ isDark }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // 0.1초 뒤에 애니메이션 상태를 true로 변경 (Fade-in 효과 유발)
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const techStacks = [
        { name: 'React', percentage: 90, color: 'bg-cyan-400', icon: '⚛️' },
        { name: 'Tailwind CSS', percentage: 95, color: 'bg-sky-500', icon: '🎨' },
        { name: 'JavaScript', percentage: 85, color: 'bg-yellow-400', icon: '⚡' },
        { name: 'Rest API', percentage: 80, color: 'bg-green-500', icon: '🔗' },
    ];

    return (
        /* 1. 전체 컴포넌트 Fade-in & Slide-up 효과 적용 */
        <div className={`flex flex-col md:flex-row gap-8 text-left transition-all duration-1000 ease-out transform pb-10
      ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            <div className="basis-2/5 flex flex-col items-center md:items-start">
                <div className="relative mb-6 group/img w-full">
                    <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-400 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000`}></div>
                    <img
                        src={RollingImg}
                        className='relative w-full h-auto aspect-video md:aspect-[3/4] object-cover rounded-2xl shadow-2xl border-2 border-white/20'
                        alt="롤링 페이퍼 프로젝트"
                    />
                </div>

                <div className={`w-full p-5 rounded-2xl space-y-4 ${isDark ? 'bg-indigo-900/20 border border-indigo-800/50' : 'bg-indigo-50 border border-indigo-100'}`}>
                    <div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Project Name</span>
                        <p className="text-lg font-bold">Rolling Paper</p>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Type</span>
                        <p className="text-lg font-bold font-mono">PC / Mobile (Team)</p>
                    </div>
                    <a
                        href="https://rolling-flax.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className={`group relative flex items-center justify-center w-full py-4 rounded-xl font-black overflow-hidden transition-all duration-500 ${isDark ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-gray-900 text-white hover:bg-black'}`}
                    >
                        <span className="absolute left-0 opacity-0 -translate-x-full transition-all duration-500 ease-in-out group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100 text-2xl">
                            📬
                        </span>

                        <span className="transition-all duration-500 ease-in-out group-hover:translate-x-full group-hover:opacity-0">
                            ROLLING PAPER
                        </span>
                    </a>
                </div>
            </div>

            {/* --- 오른쪽 섹션 --- */}
            <div className="basis-3/5 space-y-4">
                <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
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

                    <DetailCard title="소개" icon="💌" isDark={isDark}>
                        축하와 감사의 마음을 온라인 카드로 전하는 롤링 페이퍼 서비스입니다. 아날로그 감성을 디지털 협업 툴로 재해석했습니다.
                    </DetailCard>

                    <DetailCard title="역할 및 기여" icon="👑" isDark={isDark}>
                        프로젝트 팀장으로서 전체적인 일정 관리 및 API 연동을 담당했으며, 팀원들의 원활한 개발을 위한 공통 컴포넌트 설계와 디자인 총괄을 맡았습니다.
                    </DetailCard>

                    <DetailCard title="배운 점 & 성과" icon="📈" isDark={isDark}>
                        <ul className="list-disc list-inside space-y-1 opacity-90">
                            <li>React와 API 연동을 통한 동적 데이터 바인딩</li>
                            <li>Git-flow 전략을 활용한 팀 단위 협업 능력 향상</li>
                            <li>Tailwind CSS를 통한 생산성 높은 반응형 UI 구현</li>
                            <li>프로젝트 초기 기획부터 배포까지의 전체 라이프사이클 경험</li>
                        </ul>
                    </DetailCard>
                </div>
            </div>
        </div>
    );
}

export default Rolling;