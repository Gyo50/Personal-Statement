import React, { useEffect, useRef, useState } from "react";
import DemoPcimg from "../../assets/images/DemoPc.svg";
import DetailCard from "../../components/common/DetailCard";
import DemoThejulgeImg from "../../assets/images/DemoThejulge.svg";

/**
 * 스크롤 감지 및 지연 애니메이션 커스텀 훅 (동일)
 */
const useScrollFadeIn = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const target = domRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (target && target instanceof Element) observer.observe(target);
    return () =>
      target && target instanceof Element && observer.unobserve(target);
  }, [delay]);

  return { ref: domRef, isVisible };
};

function Thejulge({ isDark }) {
  const fadeInImage = useScrollFadeIn(100);
  const fadeInInfo = useScrollFadeIn(400);
  const fadeInDetails = useScrollFadeIn(700);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseDown = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  // 더 줄게 프로젝트에 특화된 기술 스택
  const techStacks = [
    { name: "Next.js", percentage: 95, color: "bg-black", icon: "🚀" },
    { name: "TypeScript", percentage: 90, color: "bg-blue-600", icon: "🔷" },
    { name: "Tailwind CSS", percentage: 95, color: "bg-cyan-400", icon: "🎨" },
    { name: "Zustand", percentage: 80, color: "bg-amber-600", icon: "🐻" },
  ];

  return (
    <div className="flex flex-col gap-8 text-left pb-10">
      <div
        className={`fixed pointer-events-none z-[9999] transition-[transform,opacity] duration-300 ease-out ${
          isHovering ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.8 : 1})`,
          width: "100px",
          height: "100px",
          willChange: "left, top",
        }}
      >
        {/* 1. 클릭 시 퍼지는 파동 (Ripple Effect) */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-cyan-400/50 transition-all duration-500 ease-out ${
            isClicked ? "scale-[1.8] opacity-0" : "scale-100 opacity-0"
          }`}
        />

        {/* 2. 우주 안개(Glow) 효과 */}
        <div className="absolute inset-4 rounded-full bg-blue-500/20 blur-xl animate-pulse" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-spin-slow overflow-visible"
        >
          <defs>
            <path
              id="innerCirclePath"
              d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
            />
            {/* 네온 빛 번짐 필터 */}
            <filter id="spaceGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 블랙홀 스타일 배경 원 */}
          <circle
            cx="50"
            cy="50"
            r="40"
            className="fill-slate-950/80 backdrop-blur-md stroke-cyan-500/40 stroke-[1]"
          />

          {/* 회전하는 우주 문구 */}
          <text
            className="text-[6.5px] font-bold fill-cyan-300/90 tracking-[1.2px] uppercase"
            style={{ filter: "url(#spaceGlow)" }}
          >
            <textPath xlinkHref="#innerCirclePath">
              View Show • View Show • View Show • View Show
            </textPath>
          </text>
        </svg>

        {/* 3. 중앙 텍스트 (클릭 시 확대 효과) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 ${isClicked ? "scale-125" : "scale-100"}`}
        >
          <span className="text-[10px] font-black text-white tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
            CLICK
          </span>
        </div>
      </div>
      {/* [왼쪽 섹션] PC 프레임 이미지 및 기본 정보 */}
      <div
        ref={fadeInImage.ref}
        className={`basis-2/5 flex flex-col items-center md:items-start transition-all duration-1000 ease-out transform ${
          fadeInImage.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative mb-6 group/img w-full flex justify-center">
          {/* 더 줄게 테마: 퍼플/핑크 네온 광채 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000"></div>

          <div className="relative w-full md:w-auto overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
            <a
              href="https://the-julge-zeta.vercel.app/notice/notices-list"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              className="cursor-none block"
            >
              <img
                src={DemoPcimg}
                className="block w-full h-auto object-contain"
                style={{ maxHeight: "500px" }}
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
            </a>
          </div>
        </div>

        {/* 하단 요약 카드 */}
        <div
          className={`w-full p-5 rounded-2xl space-y-4 shadow-sm ${isDark ? "bg-purple-900/20 border border-purple-800/50" : "bg-purple-50 border border-purple-100"}`}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-purple-400" : "text-purple-600"}`}
              >
                Project Name
              </span>
              <p className="text-lg font-bold">Thejulge (더 줄게)</p>
            </div>
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-purple-400" : "text-purple-600"}`}
              >
                Type
              </span>
              <p className="text-lg font-bold">PC / Mobile</p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <a
              href="https://github.com/Gyo50/the-julge-frontend"
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-900 hover:bg-black text-white"}`}
            >
              <span>🔗 GitHub</span>
            </a>
            <a
              href="https://www.notion.so/The-Julge-3136fb764ad18068b1a1d1cd9fa32557?source=copy_link"
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${isDark ? "bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border border-blue-500/30" : "bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200"}`}
            >
              <span>📘 Issue Note</span>
            </a>
          </div>
        </div>
      </div>

      {/* [오른쪽 섹션] 기술 스택 및 상세 설명 */}
      <div
        ref={fadeInInfo.ref}
        className={`basis-3/5 space-y-4 transition-all duration-1000 ease-out transform ${
          fadeInInfo.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3
          className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-purple-300" : "text-purple-900"}`}
        >
          <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
          EXPERIENCE DETAILS
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {/* 기술 스택 카드 */}
          <div
            className={`p-5 rounded-2xl border ${isDark ? "bg-gray-800/40 border-gray-700" : "bg-gray-50 border-gray-100"}`}
          >
            <h4 className="text-xs font-bold mb-4 opacity-60">MAIN STACK</h4>
            <div className="space-y-4">
              {techStacks.map((tech) => (
                <div key={tech.name} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>
                      {tech.icon} {tech.name}
                    </span>
                    <span>{fadeInInfo.isVisible ? tech.percentage : 0}%</span>
                  </div>
                  <div
                    className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                  >
                    <div
                      className={`h-full transition-all duration-[1500ms] ease-out ${tech.color}`}
                      style={{
                        width: fadeInInfo.isVisible
                          ? `${tech.percentage}%`
                          : "0%",
                      }}
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
              fadeInDetails.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <DetailCard title="소개" icon="💡" isDark={isDark}>
              고액 알바 및 단기 일자리 매칭을 위한 구인구직 플랫폼 웹
              서비스입니다. 사장님은 공고를 등록하고 관리할 수 있으며, 알바생은
              프로필을 등록하고 공고를 검색하여 지원할 수 있습니다.
            </DetailCard>

            <DetailCard title="역할 및 기여" icon="👑" isDark={isDark}>
              <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                <li>
                  <span className="font-bold text-purple-500">
                    공통 카드 컴포넌트 설계:{" "}
                  </span>
                  다양한 도메인에서 활용 가능한 유연한 공통 카드 컴포넌트를
                  설계하여 코드 중복을 획기적으로 줄였습니다.
                </li>
                <li>
                  <span className="font-bold text-purple-500">
                    지능형 공고 상세 페이지 구현:{" "}
                  </span>
                  비로그인 시에는 Local Storage를 활용하고, 로그인 시에는 Auth
                  Token 기반으로 서버 데이터를 동기화하여 끊김 없는 사용자 공고
                  기록 서비스를 구현했습니다.
                </li>
                <li>
                  <span className="font-bold text-purple-500">
                    효율적인 API 통합 관리:{" "}
                  </span>
                  공통 컴포넌트 단위에서 API 호출 로직을 관리함으로써
                  유지보수성을 높이고 각 페이지에서의 데이터 사용성을
                  극대화했습니다.
                </li>
              </ul>
            </DetailCard>

            <DetailCard title="배운 점 & 성과" icon="📈" isDark={isDark}>
              <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                <li>
                  <span className="font-bold text-sky-500">
                    TypeScript 이해도 향상:{" "}
                  </span>
                  첫 TypeScript 프로젝트로 타입 불일치, undefined 접근, any 남용
                  등의 문제를 겪었지만, unknown 타입을 활용해 타입을 점진적으로
                  좁혀가며 안전하게 처리하는 방법을 학습했습니다.
                </li>

                <li>
                  <span className="font-bold text-sky-500">
                    상태 관리 최적화(Zustand):{" "}
                  </span>
                  전역 스토어에서 큰 상태를 그대로 가져오며 불필요한 리렌더링
                  문제가 발생하는 것을 경험했고, 이후 필요한 상태만 선택적으로
                  구독하는 방식으로 구조를 개선했습니다.
                </li>

                <li>
                  <span className="font-bold text-sky-500">
                    Next.js App Router 구조 이해:{" "}
                  </span>
                  초기에는 React 습관대로 클라이언트 컴포넌트에서 데이터를
                  처리했으나, 팀원들과의 논의를 통해 서버 컴포넌트에서 데이터
                  패칭을 담당하고 이벤트 로직은 클라이언트 컴포넌트로 분리하는
                  구조의 중요성을 이해하고 적용했습니다.
                </li>

                <li>
                  <span className="font-bold text-sky-500">
                    문제 해결 및 협업 경험:
                  </span>
                  새로운 기술 스택으로 인해 잦은 리팩토링과 컴포넌트 분리가
                  필요했고, 스스로 발견하지 못한 문제들을 팀원들과의 코드 리뷰와
                  소통을 통해 해결하면서 협업에서의 커뮤니케이션 중요성을
                  체감했습니다.
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
