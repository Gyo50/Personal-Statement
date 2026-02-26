import React, { useEffect, useRef, useState } from "react";
import DemoPcimg from "../../assets/images/DemoPc.svg";
import DetailCard from "../../components/common/DetailCard";
import DemoNexonImg from "../../assets/images/DemoNexon.svg";

const useScrollFadeIn = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const target = domRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (target && target instanceof Element) observer.observe(target);
    return () => {
      if (target && target instanceof Element) observer.unobserve(target);
    };
  }, [delay]);

  return { ref: domRef, isVisible };
};

function Nexon({ isDark }) {
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

  const techStacks = [
    { name: "HTML5", percentage: 95, color: "bg-orange-500", icon: "🌐" },
    { name: "CSS3", percentage: 90, color: "bg-blue-500", icon: "🎨" },
    { name: "JavaScript", percentage: 85, color: "bg-yellow-400", icon: "⚡" },
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
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000`}
          ></div>

          <div className="relative w-full md:w-auto overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
            <a
              href="https://gyo50.github.io/Nexon.github.io/"
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
                  src={DemoNexonImg}
                  alt="Nexon Demo Screen"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-110"
                />
              </div>
            </a>
          </div>
        </div>

        <div
          className={`w-full p-5 rounded-2xl space-y-4 shadow-sm ${isDark ? "bg-blue-900/20 border border-blue-800/50" : "bg-blue-50 border border-blue-100"}`}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                Project Name
              </span>
              <p className="text-lg font-bold">Nexon Games Redesign</p>
            </div>
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                Type
              </span>
              <p className="text-lg font-bold">PC / Mobile</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <a
              href="https://github.com/Gyo50/Nexon.github.io"
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-900 hover:bg-black text-white"}`}
            >
              <span>🔗 GitHub</span>
            </a>
            <a
              href="https://www.notion.so/3136fb764ad1806bb5cdc5601745f434?source=copy_link"
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
        className={`basis-3/5 space-y-6 transition-all duration-1000 ease-out transform ${
          fadeInInfo.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3
          className={`text-xl font-black flex items-center gap-2 ${isDark ? "text-blue-300" : "text-blue-900"}`}
        >
          <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
          PROJECT DETAILS
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {/* 기술 스택 카드 */}
          <div
            className={`p-5 rounded-2xl border ${isDark ? "bg-gray-800/40 border-gray-700" : "bg-gray-50 border-gray-100"}`}
          >
            <h4 className="text-xs font-bold mb-4 opacity-60 tracking-tighter">
              USED TECH STACK
            </h4>
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

          {/* 하단 상세 카드 섹션 - 사라졌던 내용들 완전 복구 */}
          <div
            ref={fadeInDetails.ref}
            className={`space-y-4 transition-all duration-1000 ease-out transform ${
              fadeInDetails.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <DetailCard title="소개" icon="📝" isDark={isDark}>
              인트로 영상, 스크롤 애니메이션, 패럴랙스 효과 등을 활용한
              인터랙티브 기업형 랜딩 페이지 웹 프로젝트입니다. 시각적 임팩트와
              동시에 사용자 흐름을 방해하지 않는 자연스러운 전환을 목표로
              제작했습니다.
            </DetailCard>

            <DetailCard title="개발 배경" icon="💡" isDark={isDark}>
              기존 웹사이트의 복잡한 구조를 탈피하고, 시각적인 화려함과 동시에
              사용자의 클릭 반응을 즉각적으로 유도하는 최신 웹 트렌드를
              반영하고자 했습니다.
            </DetailCard>

            <DetailCard title="배운 점 & 성과" icon="🏆" isDark={isDark}>
              <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                <li>
                  <span className="font-bold text-blue-500">웹 표준 준수:</span>{" "}
                  시멘틱 태그를 활용한 구조화로 검색 엔진 최적화(SEO) 기초를
                  다졌습니다.
                </li>
                <li>
                  <span className="font-bold text-blue-500">
                    인터랙티브 디자인:
                  </span>{" "}
                  JavaScript를 활용하여 마우스 스크롤 및 호버에 반응하는 동적
                  애니메이션을 구현했습니다.
                </li>
                <li>
                  <span className="font-bold text-blue-500">반응형 설계:</span>{" "}
                  미디어 쿼리를 사용하여 PC부터 모바일 환경까지 대응하는 유연한
                  레이아웃을 구축했습니다.
                </li>
              </ul>
            </DetailCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nexon;
