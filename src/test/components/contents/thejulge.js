import React, { useEffect, useRef, useState } from 'react';
import DemoPcimg from '../../assets/images/DemoPc.svg';
import DetailCard from '../../components/common/DetailCard';
// 더 줄게 전용 스크린샷 이미지로 변경하세요
import DemoThejulgeImg from '../../assets/images/DemoThejulge.svg';

/**
 * 스크롤 감지 및 지연 애니메이션 커스텀 훅 (동일)
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

    if (target && target instanceof Element) observer.observe(target);
    return () => target && target instanceof Element && observer.unobserve(target);
  }, [delay]);

  return { ref: domRef, isVisible };
};

function Thejulge({ isDark }) {
  const fadeInImage = useScrollFadeIn(100);
  const fadeInInfo = useScrollFadeIn(400);
  const fadeInDetails = useScrollFadeIn(700);

  // 더 줄게 프로젝트에 특화된 기술 스택
  const techStacks = [
    { name: 'Next.js', percentage: 95, color: 'bg-black', icon: '🚀' },
    { name: 'TypeScript', percentage: 90, color: 'bg-blue-600', icon: '🔷' },
    { name: 'Tailwind CSS', percentage: 95, color: 'bg-cyan-400', icon: '🎨' },
    { name: 'Zustand', percentage: 80, color: 'bg-amber-600', icon: '🐻' },
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
          {/* 더 줄게 테마: 퍼플/핑크 네온 광채 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000"></div>

          <div className="relative w-full md:w-auto overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
            <img
              src={DemoPcimg}
              className='block w-full h-auto object-contain'
              style={{ maxHeight: '500px' }}
              alt="PC Frame"
            />
            {/* 내부 스크린 (Thejulge 스크린샷 적용) */}
            <div className="absolute inset-0 w-[100%] h-[87%] overflow-hidden bg-black rounded-sm">
              <img
                src={DemoThejulgeImg}
                alt="Thejulge Demo Screen"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-110"
              />
            </div>
          </div>
        </div>

        {/* 하단 요약 카드 */}
        <div className={`w-full p-5 rounded-2xl space-y-4 shadow-sm ${isDark ? 'bg-purple-900/20 border border-purple-800/50' : 'bg-purple-50 border border-purple-100'}`}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Project Name</span>
              <p className="text-lg font-bold">Thejulge (더 줄게)</p>
            </div>
            <div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Type</span>
              <p className="text-lg font-bold">PC / Mobile</p>
            </div>
          </div>
          <a href="https://the-julge-zeta.vercel.app/notice/notices-list" target="_blank" rel="noreferrer"
            className={`group relative flex items-center justify-center w-full py-4 rounded-xl font-black overflow-hidden transition-all duration-500 ${isDark ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-gray-900 text-white hover:bg-black'}`}>
            <span className="absolute left-0 opacity-0 -translate-x-full group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100 text-2xl transition-all duration-500">✨</span>
            <span className="group-hover:translate-x-full group-hover:opacity-0 transition-all duration-500">VIEW INTERACTIVE WEB</span>
          </a>
        </div>
      </div>

      {/* [오른쪽 섹션] 기술 스택 및 상세 설명 */}
      <div
        ref={fadeInInfo.ref}
        className={`basis-3/5 space-y-4 transition-all duration-1000 ease-out transform ${fadeInInfo.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
          <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
          EXPERIENCE DETAILS
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {/* 기술 스택 카드 */}
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-gray-800/40 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
            <h4 className="text-xs font-bold mb-4 opacity-60">MAIN STACK</h4>
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
            <DetailCard title="소개" icon="💡" isDark={isDark}>
              기존의 정적인 카드 시스템을 넘어, 사용자에게 시각적인 몰입감을 주는 3D 인터랙티브 카드 서비스입니다. 수학적 알고리즘과 쉐이더를 활용해 생동감 있는 UI를 구현했습니다.
            </DetailCard>

            <DetailCard title="역할 및 기여" icon="👑" isDark={isDark}>
              <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                <li>
                  <span className="font-bold text-purple-500">공통 카드 컴포넌트 설계: </span>
                  다양한 도메인에서 활용 가능한 유연한 공통 카드 컴포넌트를 설계하여 코드 중복을 획기적으로 줄였습니다.
                </li>
                <li>
                  <span className="font-bold text-purple-500">지능형 공고 상세 페이지 구현: </span>
                  비로그인 시에는 Local Storage를 활용하고, 로그인 시에는 Auth Token 기반으로 서버 데이터를 동기화하여 끊김 없는 사용자 공고 기록 서비스를 구현했습니다.
                </li>
                <li>
                  <span className="font-bold text-purple-500">효율적인 API 통합 관리: </span>
                  공통 컴포넌트 단위에서 API 호출 로직을 관리함으로써 유지보수성을 높이고 각 페이지에서의 데이터 사용성을 극대화했습니다.
                </li>
              </ul>
            </DetailCard>

            <DetailCard title="배운 점 & 성과" icon="📈" isDark={isDark}>
              <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                <li>
                  <span className="font-bold text-sky-500">TypeScript 이해도 향상: </span>
                  첫 TypeScript 프로젝트로 타입 불일치, undefined 접근, any 남용 등의 문제를 겪었지만,
                  unknown 타입을 활용해 타입을 점진적으로 좁혀가며 안전하게 처리하는 방법을 학습했습니다.
                </li>

                <li>
                  <span className="font-bold text-sky-500">상태 관리 최적화(Zustand): </span>
                  전역 스토어에서 큰 상태를 그대로 가져오며 불필요한 리렌더링 문제가 발생하는 것을 경험했고,
                  이후 필요한 상태만 선택적으로 구독하는 방식으로 구조를 개선했습니다.
                </li>

                <li>
                  <span className="font-bold text-sky-500">Next.js App Router 구조 이해: </span>
                  초기에는 React 습관대로 클라이언트 컴포넌트에서 데이터를 처리했으나,
                  팀원들과의 논의를 통해 서버 컴포넌트에서 데이터 패칭을 담당하고
                  이벤트 로직은 클라이언트 컴포넌트로 분리하는 구조의 중요성을 이해하고 적용했습니다.
                </li>

                <li>
                  <span className="font-bold text-sky-500">문제 해결 및 협업 경험:</span>
                  새로운 기술 스택으로 인해 잦은 리팩토링과 컴포넌트 분리가 필요했고,
                  스스로 발견하지 못한 문제들을 팀원들과의 코드 리뷰와 소통을 통해 해결하면서
                  협업에서의 커뮤니케이션 중요성을 체감했습니다.
                </li>
              </ul>
            </DetailCard>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Thejulge;