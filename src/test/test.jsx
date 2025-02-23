import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import "./styles.css";

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

const Paper = ({ index, scroll, texture }) => {
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

    // 현재 회전 각도로 부드럽게 이동
    meshRef.current.rotation.y = targetRotation;

    // 호버 시 위쪽을 바라보는 각도 조정
    const targetRotationX = isHovered ? -(Math.PI / 180) * 30 : 0;
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1;

    // 고정된 원형 배치 위치 계산
    const radius = 3;
    meshRef.current.position.x = Math.sin(baseRotation + scrollRotation) * radius;
    meshRef.current.position.z = Math.cos(baseRotation + scrollRotation) * radius;

    // 호버 값 부드럽게 변경
    uniforms.current.uHover.value += (isHovered ? 1 : 0 - uniforms.current.uHover.value) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      position={[Math.sin((index * Math.PI) / 3) * 3, 0, Math.cos((index * Math.PI) / 3) * 3]}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[2, 3, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        side={THREE.DoubleSide} // FrontSide에서 DoubleSide로 다시 변경
        transparent={true}
      />
    </mesh>
  );
};

const Scene = () => {
  const [scroll, setScroll] = useState(0);
  const texture = useTexture("https://www.fl-ex.co.kr/images/class/student/ljb-mc1th.jpg");

  // 스크롤 이벤트 처리 : 현재 휠 감도가 이상함 너무 수치값을 작게 잡아야 하는데...
  useEffect(() => {
    const handleScroll = (e) => {
      setScroll((prev) => prev + e.deltaY * 0.00005);
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <group>
      {Array.from({ length: 6 }, (_, i) => (
        <Paper key={i} index={i} scroll={scroll} texture={texture} />
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
