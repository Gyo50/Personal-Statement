import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./ThreeHelper";

const Paper = ({ index, image, onClick, totalCards }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isFront, setIsFront] = useState(false);
  const entryStart = useRef(null);

  const texture = useTexture(image);
  const uniforms = useRef({
    uTime: { value: 0 },
    uHover: { value: 0 },
    uTexture: { value: texture },
  });

  const radius = 3;
  const travelDuration = 1;

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.elapsedTime;
    if (entryStart.current === null) entryStart.current = state.clock.elapsedTime;
    
    const elapsed = state.clock.elapsedTime - entryStart.current;
    const t = Math.min(elapsed / travelDuration, 1);
    const ease = t * t * (3 - 2 * t);

    const finalAngle = (index * Math.PI * 2) / totalCards;
    const startAngle = finalAngle + Math.PI;
    const currentAngle = startAngle + (finalAngle - startAngle) * ease;

    meshRef.current.position.set(Math.sin(currentAngle) * radius, 0, Math.cos(currentAngle) * radius);
    meshRef.current.rotation.y = ((currentAngle + Math.PI) % (Math.PI * 2)) - Math.PI;
    
    const scale = 1.4 + (1 - 1.4) * ease;
    meshRef.current.scale.set(scale, scale, scale);

    const targetX = isHovered ? -(Math.PI / 180) * 30 : 0;
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
      onPointerEnter={() => isFront && setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={(e) => { e.stopPropagation(); if (isFront) onClick(index); }}
    >
      <planeGeometry args={[2, 3, 32, 32]} />
      <shaderMaterial 
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader} 
        uniforms={uniforms.current} 
        side={THREE.DoubleSide} 
        transparent 
      />
    </mesh>
  );
};

export default Paper;