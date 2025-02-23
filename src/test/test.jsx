import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import "./styles.css";
import { useNavigate } from "react-router-dom";

// 종이 휘어짐 효과를 위한 vertex shader
const vertexShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // 기본적으로 살짝 바깥으로 휘어진 형태
    // x 좌표를 -1에서 1로 정규화하고, 중앙(0)에서 최대로 튀어나오고 끝(-1, 1)에서 뒤로 들어가도록 함
    float baseWave = -(pow(pos.x * 0.8, 2.0)) * 0.3;  // 2차 함수 형태로 휘어짐
    
    // 호버 시 추가되는 웨이브 효과 (약하게 조정)
    float hoverWave = sin(pos.x * 1.0 + uTime) * 0.05 * uHover;
    
    pos.z += baseWave + hoverWave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader 수정
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec4 texture = texture2D(uTexture, vUv);
    
    // gl_FrontFacing을 사용하여 앞면/뒷면 구분
    float opacity = gl_FrontFacing ? 1.0 : 0.2;  // 뒷면일 경우 0.2의 투명도
    
    gl_FragColor = vec4(texture.rgb, texture.a * opacity);
  }
`;

const Paper = ({ index, scroll, texture, onClick, isClicked }) => {
  const meshRef = useRef();
  const { viewport } = useThree();
  const [isHovered, setIsHovered] = useState(false);
  const uniforms = useRef({
    uTime: { value: 0 },
    uHover: { value: 0 },
    uTexture: { value: texture },
  });

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.elapsedTime;

    // 기본 회전 각도 (각 종이의 고정된 위치)
    const baseRotation = (index * Math.PI) / 3;
    // 스크롤에 따른 추가 회전
    const scrollRotation = scroll * Math.PI * 2;
    // 최종 목표 회전 각도
    let targetRotation = baseRotation + scrollRotation;

    // 회전 각도를 -PI에서 PI 사이로 정규화
    targetRotation = ((targetRotation + Math.PI) % (Math.PI * 2)) - Math.PI;

    // 클릭 시 애니메이션
    let targetScale = 1;
    let targetZ = 0;
    let targetY = 0;
    let targetRotationY = targetRotation;
    let targetRotationX = isHovered ? -(Math.PI / 180) * 30 : 0;

    if (isClicked) {
      targetScale = 2; // 2배로 확대
      targetZ = 5; // 앞으로 이동
      targetY = 0; // 수직 중앙
      targetRotationY = 0; // 정면 바라보기
      targetRotationX = 0; // 수직 회전 제거
    }

    // 부드러운 애니메이션 적용
    meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
    meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.1;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1;

    // 클릭되지 않은 상태에서만 원형 배치 위치 계산
    if (!isClicked) {
      const radius = 3;
      meshRef.current.position.x = Math.sin(baseRotation + scrollRotation) * radius;
      meshRef.current.position.z = Math.cos(baseRotation + scrollRotation) * radius;
    } else {
      // 클릭된 상태에서는 중앙으로 이동
      meshRef.current.position.x += (0 - meshRef.current.position.x) * 0.1;
    }

    // 호버 값 부드럽게 변경
    uniforms.current.uHover.value += (isHovered ? 1 : 0 - uniforms.current.uHover.value) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      position={[Math.sin((index * Math.PI) / 3) * 3, 0, Math.cos((index * Math.PI) / 3) * 3]}
      onPointerEnter={() => !isClicked && setIsHovered(true)}
      onPointerLeave={() => !isClicked && setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick(index);
      }}
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

const Scene = () => {
  const [scroll, setScroll] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);
  const texture = useTexture("https://www.fl-ex.co.kr/images/class/student/ljb-mc1th.jpg");
  const navigate = useNavigate(); // React Router의 navigate 훅

  useEffect(() => {
    const handleScroll = (e) => {
      if (clickedIndex === null) {
        // 클릭되지 않은 상태에서만 스크롤 적용
        setScroll((prev) => prev + e.deltaY * 0.001);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [clickedIndex]);

  // 클릭 시 페이지 전환
  useEffect(() => {
    if (clickedIndex !== null) {
      // 애니메이션 시간 후 페이지 전환
      const timer = setTimeout(() => {
        navigate(`/detail/${clickedIndex}`); // 적절한 경로로 수정하세요
      }, 1000); // 1초 후 전환
      return () => clearTimeout(timer);
    }
  }, [clickedIndex, navigate]);

  return (
    <group>
      {Array.from({ length: 6 }, (_, i) => (
        <Paper
          key={i}
          index={i}
          scroll={scroll}
          texture={texture}
          onClick={setClickedIndex}
          isClicked={clickedIndex === i}
        />
      ))}
    </group>
  );
};

const Test = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
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
        <Scene />
      </Canvas>
    </div>
  );
};

export default Test;
