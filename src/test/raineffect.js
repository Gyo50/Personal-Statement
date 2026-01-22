import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed; // 부모에게 받은 속도값
  attribute float aAlpha;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    // uSpeed를 사용하여 이동 속도 조절
    pos.y -= mod(uTime * uSpeed + position.x * 3.0, 100.0);

    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0;
  }
`;

const fragmentShader = `
  varying float vAlpha;
  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.8, 0.2, dist);
    gl_FragColor = vec4(vec3(1.0), alpha * vAlpha);
  }
`;

// props로 speed를 전달받음
const StarShader = ({ speed = 0.5 }) => {
  const count = 10000;
  const meshRef = useRef();

  const { geometry } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const alphas = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions.set(
        [Math.random() * 200 - 100, Math.random() * 100, Math.random() * 200 - 100],
        i * 3
      );
      alphas[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
    return { geometry: geo };
  }, []);

  // uSpeed 유니폼 초기화
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: speed },
        },
        transparent: true,
        depthWrite: false,
      }),
    [speed]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 1. 시간 업데이트
      material.uniforms.uTime.value = clock.elapsedTime;
      
      // 2. 부모로부터 받은 speed props를 셰이더 유니폼에 실시간 반영
      material.uniforms.uSpeed.value = speed;

      // 3. 반짝임 효과 업데이트 (속도 최적화를 위해 sin 파동 활용)
      const alphaAttr = meshRef.current.geometry.attributes.aAlpha;
      for (let i = 0; i < count; i++) {
        alphaAttr.array[i] = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 2.0 + i);
      }
      alphaAttr.needsUpdate = true;
    }
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
};

export default StarShader;