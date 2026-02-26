import React, { useEffect, useRef, useState } from "react";
import DemoPcimg from "../../assets/images/DemoPc.svg";
import DetailCard from "../../components/common/DetailCard";
import DemoDiptyqueImg from "../../assets/images/DemoDiptyque.svg";

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

function Diptyque({ isDark }) {
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
    { name: "CSS3", percentage: 95, color: "bg-blue-500", icon: "🎨" },
    { name: "JavaScript", percentage: 85, color: "bg-yellow-400", icon: "⚡" },
  ];

  return (
    <div className="relative flex flex-col gap-8 text-left pb-10">
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

      {/* [왼쪽 섹션] */}
      <div
        ref={fadeInImage.ref}
        className={`basis-2/5 flex flex-col items-center md:items-start transition-all duration-1000 ease-out transform ${
          fadeInImage.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative mb-6 group/img w-full flex justify-center">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-400 rounded-3xl blur opacity-30 group-hover/img:opacity-60 transition duration-1000"></div>

          <div className="relative w-full md:w-auto overflow-hidden rounded-2xl shadow-2xl border-2 border-white/20">
            <a
              href="https://gyo50.github.io/Micro.github.io/"
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
                  src={DemoDiptyqueImg}
                  alt="Diptyque Demo Screen"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-110"
                />
              </div>
            </a>
          </div>
        </div>

        <div
          className={`w-full p-5 rounded-2xl space-y-4 shadow-sm ${
            isDark
              ? "bg-indigo-900/20 border border-indigo-800/50"
              : "bg-indigo-50 border border-indigo-100"
          }`}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${
                  isDark ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                Project Name
              </span>
              <p className="text-lg font-bold">Diptyque Micro Site</p>
            </div>
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${
                  isDark ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                Type
              </span>
              <p className="text-lg font-bold">PC Showroom</p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <a
              href="https://github.com/Gyo50/Micro.github.io"
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-900 hover:bg-black text-white"}`}
            >
              <span>🔗 GitHub</span>
            </a>
            <a
              href="https://www.notion.so/Diptyque-3136fb764ad180f5b7f4cd5882f4bacb?source=copy_link"
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${isDark ? "bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border border-blue-500/30" : "bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200"}`}
            >
              <span>📘 Issue Note</span>
            </a>
          </div>
        </div>
      </div>

      {/* [오른쪽 섹션] */}
      <div
        ref={fadeInInfo.ref}
        className={`basis-3/5 space-y-4 transition-all duration-1000 ease-out transform ${
          fadeInInfo.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3
          className={`text-xl font-black flex items-center gap-2 ${
            isDark ? "text-indigo-300" : "text-indigo-900"
          }`}
        >
          <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
          PROJECT DETAILS
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <div
            className={`p-5 rounded-2xl border ${
              isDark
                ? "bg-gray-800/40 border-gray-700"
                : "bg-gray-50 border-gray-100"
            }`}
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
                    className={`w-full h-1.5 rounded-full overflow-hidden ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
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

          <div
            ref={fadeInDetails.ref}
            className={`space-y-3 transition-all duration-1000 ease-out transform ${
              fadeInDetails.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <DetailCard title="소개" icon="🕯️" isDark={isDark}>
              향수 브랜드 감성을 웹으로 표현한 Diptyque 홈페이지 클론 코딩
              프로젝트입니다. 고해상도 이미지와 층별 레이아웃 구조를 활용하여
              브랜드 특유의 분위기를 구현했으며, 단순한 UI 구현을 넘어 이미지
              로딩 최적화와 인터랙션 성능 개선을 중심으로 개발했습니다.
            </DetailCard>

            <DetailCard title="개발 배경" icon="🏛️" isDark={isDark}>
              단순한 상품 나열이 아닌, 딥디크 고유의 감성을 웹 공간에
              재현해보고자 해외 가상 쇼룸 사이트들을 분석하여 구현했습니다.
            </DetailCard>

            <DetailCard title="배운 점 & 성과" icon="🎨" isDark={isDark}>
              <ul className="list-disc list-inside space-y-2 opacity-90 text-sm leading-relaxed">
                <li>
                  <span className="font-bold text-indigo-500">
                    비주얼 구현:
                  </span>{" "}
                  CSS 애니메이션을 활용하여 브랜드 특유의 감각적이고 부드러운
                  전환 효과 구현
                </li>
                <li>
                  <span className="font-bold text-indigo-500">
                    인터랙티브 UI:
                  </span>{" "}
                  JavaScript를 활용하여 사용자의 움직임에 실시간으로 반응하는
                  쇼룸 인터랙션 개발
                </li>
                <li>
                  <span className="font-bold text-indigo-500">UX 설계:</span>{" "}
                  브랜드 서사와 시각적 흐름을 고려하여 체류 시간을 높이는 사용자
                  중심의 레이아웃 설계
                </li>
              </ul>
            </DetailCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diptyque;
