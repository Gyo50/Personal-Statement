// Test.jsx

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import "./styles.css";

// ---------------------- Vertex Shader ----------------------
const vertexShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float baseWave = -(pow(pos.x * 0.8, 2.0)) * 0.3;
    float hoverWave = sin(pos.x * 1.0 + uTime) * 0.05 * uHover;

    pos.z += baseWave + hoverWave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// ---------------------- Fragment Shader ----------------------
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec4 texture = texture2D(uTexture, vUv);
    float opacity = gl_FrontFacing ? 1.0 : 0.2;
    gl_FragColor = vec4(texture.rgb, texture.a * opacity);
  }
`;

// ---------------------- Modal Component ----------------------
const Modal = ({ visible, onClose, title, extra }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="modal-extra">{extra}</div>
        <button onClick={onClose} className="modal-close">닫기</button>
      </div>
    </div>
  );
};


// ✅ Paper 컴포넌트 (동일)
const Paper = ({ index, scroll, texture, onClick }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const uniforms = useRef({
    uTime: { value: 0 },
    uHover: { value: 0 },
    uTexture: { value: texture },
  });

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.elapsedTime;
    const baseRotation = (index * Math.PI) / 3;
    const scrollRotation = scroll * Math.PI * 2;
    let targetRotation = baseRotation + scrollRotation;
    targetRotation = ((targetRotation + Math.PI) % (Math.PI * 2)) - Math.PI;
    meshRef.current.rotation.y = targetRotation;
    const targetRotationX = isHovered ? -(Math.PI / 180) * 30 : 0;
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1;
    const radius = 3;
    meshRef.current.position.x = Math.sin(baseRotation + scrollRotation) * radius;
    meshRef.current.position.z = Math.cos(baseRotation + scrollRotation) * radius;
    uniforms.current.uHover.value += (isHovered ? 1 : 0 - uniforms.current.uHover.value) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      position={[Math.sin((index * Math.PI) / 3) * 3, 0, Math.cos((index * Math.PI) / 3) * 3]}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => onClick(index)}
    >
      <planeGeometry args={[2, 3, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
};

// ✅ Scene 컴포넌트
const Scene = ({ onPaperClick }) => {
  const [scroll, setScroll] = useState(0);
  const texture = useTexture("https://www.fl-ex.co.kr/images/class/student/ljb-mc1th.jpg");

  useEffect(() => {
    const handleScroll = (e) => {
      setScroll((prev) => prev - e.deltaY * 0.00005);
    };
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <group>
      {Array.from({ length: 6 }, (_, i) => (
        <Paper key={i} index={i} scroll={scroll} texture={texture} onClick={onPaperClick} />
      ))}
    </group>
  );
};

// ✅ Main (Test) 컴포넌트
const Test = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({ title: "", description: "" });

  const contents = [
    {
      title: "👋 나의 소개",
      extra: (
        <div>
          <p>안녕하세요! 저는 창의적이고 사용자 경험 중심의 개발을 지향하는 프론트엔드 개발자입니다.</p>
          <p>팀워크와 소통을 중시하며, 항상 새로운 기술을 배우고 적용하는 데에 열정을 가지고 있습니다.</p>
        </div>
      ),
    },
    {
      title: "💻 나의 스킬",
      extra: (
        <div>
          <ul>
            <li>⚛️ React / Next.js</li>
            <li>🎨 TailwindCSS / Styled-components</li>
            <li>🧠 TypeScript / JavaScript</li>
            <li>🌐 WebGL / Three.js</li>
            <li>🛠️ Git / GitHub / CI</li>
          </ul>
          <p style={{ marginTop: "10px" }}>위 기술들을 활용해 반응형 인터페이스와 인터랙티브 웹을 구현할 수 있습니다.</p>
        </div>
      ),
    },
    {
      title: "📁 프로젝트 1 – 포트폴리오 생성기",
      extra: (
        <div>
          <p><strong>설명:</strong> GPT 기반 자기소개 페이지 자동 생성 도구</p>
          <p><strong>기능:</strong> 사용자가 입력한 정보로 자동 생성되는 이력서/포트폴리오</p>
          <a href="https://gptonline.ai/ko/" target="_blank" rel="noopener noreferrer">👉 데모 보기</a>
        </div>
      ),
    },
    {
      title: "📁 프로젝트 2 – 3D 인터랙티브 뷰어",
      extra: (
        <div>
          <p><strong>설명:</strong> Three.js 기반 학습 도구 (3D 객체 회전, 확대/축소 가능)</p>
          <p><strong>기술:</strong> React Three Fiber, GLSL Shader</p>
          <img src="https://via.placeholder.com/300x180" alt="3D 뷰어" style={{ borderRadius: "8px", marginTop: "10px" }} />
        </div>
      ),
    },
    {
      title: "📁 프로젝트 3 – 실시간 협업툴",
      extra: (
        <div>
          <p><strong>설명:</strong> WebSocket 기반 채팅 및 문서 편집 기능 구현</p>
          <p><strong>기술:</strong> React, Socket.IO, Quill.js</p>
          <ul>
            <li>✅ 사용자 간 실시간 동기화</li>
            <li>✅ 간단한 권한 분기 시스템</li>
          </ul>
        </div>
      ),
    },
    {
      title: "📁 프로젝트 4 – 여행 기록 앱",
      extra: (
        <div>
          <p><strong>설명:</strong> 여행지 사진, 위치, 날짜 기록이 가능한 모바일 앱</p>
          <p><strong>기술:</strong> React Native, Firebase, Google Maps API</p>
          <p>사진과 메모를 함께 저장하여 여행 추억을 간직할 수 있는 기능을 구현했습니다.</p>
        </div>
      ),
    },
  ];
  

  const handlePaperClick = (index) => {
    setPopupData(contents[index]);
    setPopupVisible(true);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", position: "relative" }}>
      <Canvas
        camera={{
          position: [0, 4, 8],
          rotation: [-(Math.PI / 180) * 30, 0, 0],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
      >
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Scene onPaperClick={handlePaperClick} />
      </Canvas>

      <Modal
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        title={popupData.title}
        extra={popupData.extra}
      />
    </div>
  );
};

export default Test;