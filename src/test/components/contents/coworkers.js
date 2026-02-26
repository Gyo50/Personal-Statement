import React, { useEffect, useRef, useState } from "react";
import DemoPcimg from "../../assets/images/DemoPc.svg";
import DetailCard from "../../components/common/DetailCard";
import DemoCoworkersImg from "../../assets/images/DemoCoworkers.svg";

/**
 * 스크롤 감지 및 지연 애니메이션을 위한 커스텀 훅
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

function Coworkers({ isDark }) {
  // 섹션별 시차(Delay) 적용
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

  // 1. 기술 스택 수정: Zustand 및 핵심 라이브러리 강조
  const techStacks = [
    { name: "React", percentage: 95, color: "bg-cyan-400", icon: "⚛️" },
    { name: "Zustand", percentage: 90, color: "bg-orange-400", icon: "🐻" },
    { name: "Three.js", percentage: 85, color: "bg-black", icon: "📦" },
    {
      name: "Axios (Interceptor)",
      percentage: 90,
      color: "bg-green-500",
      icon: "🔗",
    },
  ];

  return (
    <div className="flex flex-col gap-8 text-left pb-10">
      {/* 커스텀 마우스 커서 섹션 */}
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
        <div
          className={`absolute inset-0 rounded-full border-2 border-cyan-400/50 transition-all duration-500 ease-out ${
            isClicked ? "scale-[1.8] opacity-0" : "scale-100 opacity-0"
          }`}
        />
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
            <filter id="spaceGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="40"
            className="fill-slate-950/80 backdrop-blur-md stroke-cyan-500/40 stroke-[1]"
          />
          <text
            className="text-[6.5px] font-bold fill-cyan-300/90 tracking-[1.2px] uppercase"
            style={{ filter: "url(#spaceGlow)" }}
          >
            <textPath xlinkHref="#innerCirclePath">
              View Show • View Show • View Show • View Show
            </textPath>
          </text>
        </svg>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 ${isClicked ? "scale-125" : "scale-100"}`}
        >
          <span className="text-[10px] font-black text-white tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
            CLICK
          </span>
        </div>
      </div>

      {/* [왼쪽 섹션] 이미지 및 기본 정보 */}
      <div
        ref={fadeInImage.ref}
        className={`basis-2/5 flex flex-col items-center md:items-start transition-all duration-1000 ease-out transform ${
          fadeInImage.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative mb-6 group/img w-full flex justify-center">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000"></div>
          <div className="relative w-full md:w-auto overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
            <a
              href="https://coworkers-six.vercel.app/"
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
              <div className="absolute inset-0 w-[100%] h-[87%] overflow-hidden bg-black rounded-sm">
                <img
                  src={DemoCoworkersImg}
                  alt="Coworkers Demo Screen"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-110"
                />
              </div>
            </a>
          </div>
        </div>

        {/* 하단 요약 카드 */}
        <div
          className={`w-full p-5 rounded-2xl space-y-4 shadow-sm ${isDark ? "bg-indigo-900/20 border border-indigo-800/50" : "bg-indigo-50 border border-indigo-100"}`}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-indigo-400" : "text-indigo-600"}`}
              >
                Project Name
              </span>
              <p className="text-lg font-bold">Coworkers</p>
            </div>
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-indigo-400" : "text-indigo-600"}`}
              >
                Type
              </span>
              <p className="text-lg font-bold">PC / Mobile</p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <a
              href="https://github.com/codeit-Coworkers/coworkers"
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-900 hover:bg-black text-white"}`}
            >
              <span>🔗 GitHub</span>
            </a>
            <a
              href="https://www.notion.so/Coworkers-3136fb764ad18095af5aeb67e2e395ee?source=copy_link"
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
          className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-indigo-300" : "text-indigo-900"}`}
        >
          <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
          PROJECT DETAILS
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {/* 기술 스택 카드 */}
          <div
            className={`p-5 rounded-2xl border ${isDark ? "bg-gray-800/40 border-gray-700" : "bg-gray-50 border-gray-100"}`}
          >
            <h4 className="text-xs font-bold mb-4 opacity-60">TECH STACK</h4>
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
            <DetailCard title="소개" icon="👥" isDark={isDark}>
              Coworkers는 프로젝트 팀원들이 할 일을 체계적으로 관리하고, 지식과
              의견을 자유롭게 나눌 수 있는 칸반 기반의 협업 툴입니다. 직관적인
              UI와 효율적인 상태 관리를 통해 팀의 생산성을 극대화합니다.
            </DetailCard>

            <DetailCard title="역할 및 기여" icon="👨‍💻" isDark={isDark}>
              <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                <li>
                  <span className="font-bold text-indigo-500">
                    Zustand 기반 인증 상태 관리:
                  </span>{" "}
                  Zustand 스토어를 통해 유저 프로필과 토큰 정보를 중앙
                  집중화하고, 로그인 상태에 따른 전역 라우팅 가드를
                  구현했습니다.
                </li>
                <li>
                  <span className="font-bold text-indigo-500">
                    Three.js 기반 인터랙티브 랜딩 구현:
                  </span>{" "}
                  메인 페이지의 시각적 요소를 전담하여 Three.js 3D 모델을
                  렌더링하고, 사용자 마우스 좌표와 연동된 동적 애니메이션을
                  구현했습니다.
                </li>
                <li>
                  <span className="font-bold text-indigo-500">
                    인증 로직 및 API 자동화:
                  </span>{" "}
                  카카오 간편 로그인 시스템을 구축하고, Axios Interceptor를 통해
                  액세스 토큰 만료 시 Refresh Token으로 자동 갱신하는 보안
                  프로세스를 전담했습니다.
                </li>
              </ul>
            </DetailCard>

            <DetailCard title="배운 점 & 성과" icon="📉" isDark={isDark}>
              <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                <li>
                  <span className="font-bold text-sky-500">
                    Flux 패턴을 활용한 상태 관리 최적화:
                  </span>{" "}
                  Zustand를 사용해 불필요한 Prop Drilling을 제거하고, Selector를
                  통해 애니메이션 성능에 영향을 주지 않는 경량화된 전역 상태
                  관리를 경험했습니다.
                </li>
                <li>
                  <span className="font-bold text-sky-500">
                    인증 레이스 컨디션 해결:
                  </span>{" "}
                  다중 API 호출 시 토큰 갱신 요청이 중복되는 이슈를 요청
                  큐(Queue) 방식으로 해결하며, 비동기 상황에서의 데이터 정합성
                  유지 능력을 길렀습니다.
                </li>
                <li>
                  <span className="font-bold text-sky-500">
                    사용자 친화적 인증 흐름 설계:
                  </span>{" "}
                  소셜 로그인 후 Zustand 상태를 즉시 동기화하여 별도의 새로고침
                  없이 UI가 반응하도록 설계함으로써 매끄러운(Seamless) 가입
                  흐름을 구현했습니다.
                </li>
                <li>
                  <span className="font-bold text-sky-500">
                    3D 웹 성능 최적화:
                  </span>{" "}
                  고용량 3D 모델 로딩 시 Suspense와 자산 프리로딩 전략을
                  사용하여 초기 로딩 속도를 개선하고 쾌적한 인터랙션 환경을
                  구축했습니다.
                </li>
              </ul>
            </DetailCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coworkers;
