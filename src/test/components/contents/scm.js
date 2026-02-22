import React, { useEffect, useRef, useState } from 'react';
import DemoPcimg from '../../assets/images/DemoPc.svg';
import DetailCard from '../../components/common/DetailCard';
import DemoScmImg from '../../assets/images/DemoScm.svg';

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

function Scm({ isDark }) {
    // 섹션별 시차(Delay) 적용
    const fadeInImage = useScrollFadeIn(100);
    const fadeInInfo = useScrollFadeIn(400);
    const fadeInDetails = useScrollFadeIn(700);

    const techStacks = [
        { name: 'Next.js', percentage: 90, color: 'bg-black', icon: '🌐' },
        { name: 'React', percentage: 90, color: 'bg-cyan-400', icon: '⚛️' },
        { name: 'Supabase', percentage: 85, color: 'bg-emerald-500', icon: '⚡' },
        { name: 'Tailwind CSS', percentage: 95, color: 'bg-sky-500', icon: '🎨' },
    ];

    return (
        <div className="flex flex-col gap-8 text-left pb-10">

            {/* [왼쪽 섹션] 이미지 및 기본 정보 */}
            <div
                ref={fadeInImage.ref}
                className={`basis-2/5 flex flex-col items-center md:items-start transition-all duration-1000 ease-out transform ${fadeInImage.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="relative mb-6 group/img w-full flex justify-center">
                    <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000`}></div>

                    <div className="relative w-full md:w-auto overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
                        <img
                            src={DemoPcimg}
                            className='block w-full h-auto object-contain'
                            style={{ maxHeight: '500px' }}
                            alt="PC Frame"
                        />
                        <div className="absolute inset-0 w-[100%] h-[87%] overflow-hidden bg-black rounded-sm">
                            <img
                                src={DemoScmImg}
                                alt="Nexon Demo Screen"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-110"
                            />
                        </div>
                    </div>
                </div>

                <div className={`w-full p-5 rounded-2xl space-y-4 shadow-sm ${isDark ? 'bg-blue-900/20 border border-blue-800/50' : 'bg-blue-50 border border-blue-100'}`}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Project Name</span>
                            <p className="text-lg font-bold">SCM</p>
                        </div>
                        <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Type</span>
                            <p className="text-lg font-bold">PC / Mobile</p>
                        </div>
                    </div>
                    <a href="https://scm-cafemap.vercel.app/" target="_blank" rel="noreferrer"
                        className={`group relative flex items-center justify-center w-full py-4 rounded-xl font-black overflow-hidden transition-all duration-500 ${isDark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-900 text-white hover:bg-black'}`}>
                        <span className="absolute left-0 opacity-0 -translate-x-full group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100 text-2xl transition-all duration-500">🎮</span>
                        <span className="group-hover:translate-x-full group-hover:opacity-0 transition-all duration-500">LIVE DEMO VIEW</span>
                    </a>
                    <p className={`font-bold ${isDark ? 'text-gray-200 opacity-50' : 'text-gray-600 opacity-50'} mt-4 text-sm text-center`}>
                        현재 노량진 부근의 카페만 제공하고 있습니다.
                    </p>
                </div>
            </div>
                {/* [오른쪽 섹션] 기술 스택 및 상세 설명 */}
                <div
                    ref={fadeInInfo.ref}
                    className={`basis-3/5 space-y-6 transition-all duration-1000 ease-out transform ${fadeInInfo.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                        <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                        PROJECT DETAILS
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                        {/* 기술 스택 카드 */}
                        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-gray-800/40 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                            <h4 className="text-xs font-bold mb-4 opacity-60 tracking-tighter">USED TECH STACK</h4>
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

                        {/* 하단 상세 카드 섹션 - 사라졌던 내용들 완전 복구 */}
                        <div
                            ref={fadeInDetails.ref}
                            className={`space-y-4 transition-all duration-1000 ease-out transform ${fadeInDetails.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                }`}
                        >
                            <DetailCard title="소개" icon="📝" isDark={isDark}>
                                SCM(Study Cafe Map)은 카카오 맵 API와 Supabase를 결합해,
                                공부와 작업에 적합한 카페를 한눈에 탐색할 수 있도록 만든 위치 기반 서비스입니다.
                                단순히 장소를 보여주는 데 그치지 않고,
                                요일별로 복잡하게 관리되는 영업시간 데이터를 분석해
                                ‘오늘 기준으로 실제 이용 가능한지’를 직관적으로 제공하는 데 초점을 맞췄습니다.
                            </DetailCard>


                            <DetailCard title="개발 배경" icon="💡" isDark={isDark}>
                                기존 지도 서비스들은 카페의 기본 정보는 풍부하지만,
                                요일마다 다른 영업시간이나 실제로 공부하기 적합한지 판단하는 데에는 불편함이 있었습니다.
                                이러한 문제를 해결하기 위해 복잡하지 않고 간단한 UI/UX를 제공하여,
                                사용자는 필요한 정보만 빠르게 확인할 수 있는
                                ‘공부하는 사람을 위한 맞춤형 지도 서비스’를 기획하게 되었습니다.
                            </DetailCard>


                            <DetailCard title="배운 점 & 성과" icon="🏆" isDark={isDark}>
                                <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                                    <li>
                                        <span className="font-bold text-blue-500">복잡한 영업시간 데이터 구조화:</span>
                                        카페마다 요일별로 중첩된 영업시간 데이터를 그대로 노출하면
                                        사용자가 정보를 이해하기 어렵다는 문제를 인식했습니다.
                                        이를 현재 날짜 기준으로 분석해 ‘오늘의 운영 상태’만 제공하는
                                        데이터 전처리 로직을 직접 설계하며,
                                        사용자 관점에서 데이터를 가공하는 경험을 쌓았습니다.
                                    </li>

                                    <li>
                                        <span className="font-bold text-blue-500">외부 지도 API 로딩 이슈 해결:</span>
                                        배포 환경에서 카카오 맵 API가 간헐적으로 정상 로드되지 않는 문제를 겪었고,
                                        Script 로딩 전략과 로드 완료 여부에 따른 조건부 렌더링을 적용해
                                        지도 영역이 안정적으로 표시되도록 개선했습니다.
                                    </li>

                                    {/* <li>
                                        <span className="font-bold text-blue-500">Next.js App Router 구조 이해:</span>
                                        초기에는 모든 로직을 클라이언트 컴포넌트에서 처리하며
                                        구조가 복잡해지는 문제를 경험했습니다.
                                        이후 서버 컴포넌트에서 데이터 패칭을 담당하고,
                                        사용자 인터랙션만 클라이언트로 분리하면서
                                        App Router 환경에 맞는 역할 분리 방식을 학습했습니다.
                                        </li>

                                        <li>
                                        <span className="font-bold text-blue-500">환경 변수 및 배포 안정화 경험:</span>
                                        Vercel 배포 과정에서 환경 변수 설정 누락으로
                                        지도 API가 동작하지 않는 문제를 직접 겪으며,
                                        환경 변수 관리와 재배포 흐름을 정리해
                                        실서비스 배포 과정에 대한 이해도를 높였습니다.
                                        </li> */}

                                    <li>
                                        <span className="font-bold text-blue-500">1인 개발에서의 문제 해결 역량:</span>
                                        현재도 모든 기획·개발·디버깅 과정을 혼자 진행하며,
                                        에러 로그 분석과 공식 문서, 실험을 통해 문제를 해결하는 과정에서
                                        스스로 문제를 정의하고 해결책을 찾아가는 개발 방식에 익숙해질 수 있었습니다.
                                    </li>
                                </ul>
                            </DetailCard>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Scm