import React, { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./ThreeHelper";

const Paper = ({ index, onClick, totalCards, image, text, subText }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isFront, setIsFront] = useState(false);
  const entryStart = useRef(null);
  const radius = 3;
  const travelDuration = 1;

  // Texture
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");
    const tex = new THREE.CanvasTexture(canvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 50px Arial";
      ctx.textAlign = "center";
      ctx.fillText(text || "", canvas.width / 2, 340);

      if (subText) {
        ctx.fillStyle = "#00eaff";
        ctx.font = "30px Arial";
        const lines = subText.split("\n");
        lines.forEach((line, i) => {
          ctx.fillText(line, canvas.width / 2, 420 + i * 40);
        });
      }
      tex.needsUpdate = true;
    };

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

  useEffect(() => {
    uniforms.current.uTexture.value = texture;
  }, [texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    // 시간 업데이트
    uniforms.current.uTime.value = state.clock.elapsedTime;

    if (entryStart.current === null)
      entryStart.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - entryStart.current;
    const t = Math.min(elapsed / travelDuration, 1);
    const ease = t * t * (3 - 2 * t);
    const finalAngle = (index * Math.PI * 2) / totalCards;
    const startAngle = finalAngle + Math.PI;
    const currentAngle = startAngle + (finalAngle - startAngle) * ease;

    // 위치
    mesh.position.set(
      Math.sin(currentAngle) * radius,
      0.5,
      Math.cos(currentAngle) * radius,
    );

    // 회전
    mesh.rotation.set(0, 0, 0);
    mesh.rotation.order = "YXZ";
    mesh.rotation.y = ((currentAngle + Math.PI) % (Math.PI * 2)) - Math.PI;
    // Hover easing
    const hoverTarget = isHovered ? 1 : 0;

    uniforms.current.uHover.value +=
      (hoverTarget - uniforms.current.uHover.value) * 0.1;
    mesh.rotation.x = uniforms.current.uHover.value * -(Math.PI / 180) * 25;
    mesh.scale.set(1, 1, 1);

    // 정면 판별
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(mesh.quaternion);
    const cameraDir = new THREE.Vector3();
    state.camera.getWorldDirection(cameraDir);
    const front = forward.dot(cameraDir) < -0.85;
    if (front !== isFront) setIsFront(front);
    if (!front && isHovered) setIsHovered(false);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={(e) => {
        if (!isFront) return;
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setIsHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (isFront) onClick(index);
      }}
      pointerEvents={isFront ? "auto" : "none"}
    >
      <planeGeometry args={[2, 3, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

export default Paper;
