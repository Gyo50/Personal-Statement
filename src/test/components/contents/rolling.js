import React, { useEffect, useRef, useState } from 'react';
import DemoPcimg from '../../assets/images/DemoPc.svg';
import DetailCard from '../../components/common/DetailCard';
import DemoRollingImg from '../../assets/images/DemoRolling.svg';

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
    const fadeInImage = useScrollFadeIn(100);
    const fadeInInfo = useScrollFadeIn(400);
    const fadeInDetails = useScrollFadeIn(700);

    const techStacks = [
        { name: 'React', percentage: 90, color: 'bg-cyan-400', icon: '⚛️' },
        { name: 'Tailwind CSS', percentage: 95, color: 'bg-sky-500', icon: '🎨' },
        { name: 'JavaScript', percentage: 85, color: 'bg-yellow-400', icon: '⚡' },
        { name: 'axios', percentage: 80, color: 'bg-green-500', icon: '🔗' },
    ];

    return (
        <div className="flex flex-col gap-8 text-left pb-10">

            {/* [왼쪽 섹션] PC 프레임 이미지 및 기본 정보 */}
            <div
                ref={fadeInImage.ref}
                className={`basis-2/5 flex flex-col items-center md:items-start transition-all duration-1000 ease-out transform ${fadeInImage.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                className={`basis-3/5 space-y-4 transition-all duration-1000 ease-out transform ${fadeInInfo.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                        className={`space-y-3 transition-all duration-1000 ease-out transform ${fadeInDetails.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        <DetailCard title="소개" icon="💌" isDark={isDark}>
                            어릴때 손으로 쓴 롤링페이퍼의 감동을 디지털로 재현한 웹 애플리케이션입니다. 사용자는 친구나 가족에게 익명으로 메시지를 남기고, 받은 사람은 이를 아름다운 인터랙티브 카드 형태로 확인할 수 있습니다. React와 Tailwind CSS를 활용해 반응형 디자인을 구현했으며, 팀 프로젝트로 진행하여 협업 능력도 향상시켰습니다.
                        </DetailCard>

                        <DetailCard title="역할 및 기여 (팀장)" icon="👑" isDark={isDark}>
                            <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                                <li>
                                    <span className="font-bold text-purple-500">프로젝트 아키텍처 설계: </span>
                                    확장성과 유지보수를 고려한 세부 폴더 구조를 설계하고, 프로젝트 전반의 기술 표준을 정립했습니다.
                                </li>
                                <li>
                                    <span className="font-bold text-purple-500">코드 리뷰 및 UX QA: </span>
                                    팀원들의 코드를 상세히 리뷰하며 공통 코멘트를 통해 UI/UX의 일관성을 유지하고, 사용자 편의성을 극대화하기 위한 코드 품질 관리를 주도했습니다.
                                </li>
                                <li>
                                    <span className="font-bold text-purple-500">리더십 및 커뮤니케이션: </span>
                                    팀장으로서 일정 관리뿐만 아니라 기능 추가 및 기술적 이슈에 대한 논의를 주도하며 팀 내 원활한 의사소통을 이끌었습니다.
                                </li>
                            </ul>
                        </DetailCard>
                        <DetailCard title="배운 점 & 성과" icon="📈" isDark={isDark}>
                            <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">

                                <li>
                                    <span className="font-bold text-sky-500">API 연동 방식에 대한 이해: </span>
                                    처음에는 별도의 설치 없이 사용할 수 있는 fetch 방식을 사용했으나,
                                    JSON 처리와 공통 에러 핸들링, 인터셉트 로직을 추가하는 과정에서 한계를 느꼈습니다.
                                    이후 Axios를 도입해 API 요청 구조를 정리하고,
                                    보다 일관되고 확장 가능한 데이터 처리 방식을 경험했습니다.
                                </li>

                                <li>
                                    <span className="font-bold text-sky-500">협업을 위한 Git 활용 경험: </span>
                                    개인 프로젝트 위주로 개발해왔기 때문에 협업 방식에 익숙하지 않았지만,
                                    Git-flow 전략과 브랜치 관리 방식에 대해 학습하며
                                    기능 단위로 작업을 분리하고 코드 충돌을 최소화하는 협업 프로세스를 경험했습니다.
                                </li>

                                <li>
                                    <span className="font-bold text-sky-500">코드 리뷰와 커뮤니케이션의 중요성: </span>
                                    개발 과정에서 발생한 문제를 혼자 해결하기보다
                                    팀원들과의 코드 리뷰와 논의를 통해 해결하면서,
                                    기술적인 문제 해결뿐만 아니라 의사소통의 중요성을 체감했습니다.
                                </li>

                                <li>
                                    <span className="font-bold text-sky-500">프로젝트 전반에 대한 이해도 향상: </span>
                                    기획부터 개발, 배포(Vercel)까지 전 과정을 경험하며
                                    단순 기능 구현을 넘어 서비스 단위로 프로젝트를 바라보는 시야를 넓힐 수 있었습니다.
                                </li>

                            </ul>
                        </DetailCard>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rolling;