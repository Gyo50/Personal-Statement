import React, { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./ThreeHelper";

const Paper = ({ index, onClick, totalCards, image, text, subText }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isFront, setIsFront] = useState(false);
  const entryStart = useRef(null);
  const [hoverLock, setHoverLock] = useState(false);

  const radius = 3;
  const travelDuration = 1;

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 메인 텍스트 (가운데 위)
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 50px Arial";
      ctx.textAlign = "center";
      ctx.fillText(text || "", canvas.width / 2, 340);

      // 서브 텍스트 (가운데 아래, 줄바꿈 처리)
      if (subText) {
        ctx.fillStyle = "#00eaff"; // 파란색 계열 네온 느낌
        ctx.font = "30px Arial";
        const lines = subText.split("\n");
        lines.forEach((line, i) => {
          ctx.fillText(line, canvas.width / 2, 420 + i * 40);
        });
      }
      tex.needsUpdate = true;
    };

    const tex = new THREE.CanvasTexture(canvas);
    render();

    if (image) {
      const img = new Image();
      img.src = image;
      img.crossOrigin = "anonymous";
      img.onload = render;
    }
    return tex;
  }, [text, subText, image]);

  const uniforms = useRef({
    uTime: { value: 0 },
    uHover: { value: 0 },
    uTexture: { value: texture },
  });


  useEffect(() => { uniforms.current.uTexture.value = texture; }, [texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    uniforms.current.uTime.value = state.clock.elapsedTime;
    if (entryStart.current === null) entryStart.current = state.clock.elapsedTime;
    if (hoverLock && Math.abs(meshRef.current.rotation.x) < 1) {
      setHoverLock(false);
    }
    const elapsed = state.clock.elapsedTime - entryStart.current;
    const t = Math.min(elapsed / travelDuration, 1);
    const ease = t * t * (3 - 2 * t);

    const finalAngle = (index * Math.PI * 2) / totalCards;
    const startAngle = finalAngle + Math.PI;
    const currentAngle = startAngle + (finalAngle - startAngle) * ease;

    meshRef.current.position.set(Math.sin(currentAngle) * radius, 0, Math.cos(currentAngle) * radius);
    meshRef.current.rotation.y = ((currentAngle + Math.PI) % (Math.PI * 2)) - Math.PI;
    meshRef.current.scale.set(1.4 + (1 - 1.4) * ease, 1.4 + (1 - 1.4) * ease, 1.4 + (1 - 1.4) * ease);

    const targetX = isHovered ? -(Math.PI / 180) * 25 : 0;
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.1;
    uniforms.current.uHover.value += ((isHovered ? 1 : 0) - uniforms.current.uHover.value) * 0.1;

    const cardForward = new THREE.Vector3(0, 0, 1).applyQuaternion(meshRef.current.quaternion);
    const cameraDir = new THREE.Vector3();
    state.camera.getWorldDirection(cameraDir).normalize();
    setIsFront(cardForward.dot(cameraDir) < -0.85);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => {
        if (!isFront) return;
        setIsHovered(true);
        setHoverLock(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        if (hoverLock) return;
        setIsHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => { e.stopPropagation(); if (isFront) onClick(index); }}
      pointerEvents={isFront ? "auto" : "none"}
    >
      <planeGeometry args={[2, 3, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        side={THREE.DoubleSide}
        transparent={true}  // 배경을 투명하게 하기 위해 true로 설정
        depthWrite={false}  // 투명한 물체끼리 겹칠 때 어색함을 줄이기 위해 false 권장
      />
    </mesh>
  );
};

export default Paper;