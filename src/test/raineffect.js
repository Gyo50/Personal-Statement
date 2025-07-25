// StarShader.js
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  attribute float aAlpha;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    // 점마다 y값 이동
    pos.y -= mod(uTime * 0.1 + position.x * 3.0, 100.0);

    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0;
  }
`;

const fragmentShader = `
  varying float vAlpha;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.8, 0.2, dist); // 둥근 원 모양
    gl_FragColor = vec4(vec3(1.0), alpha * vAlpha); // 반짝임
  }
`;

const StarShader = () => {
  const count = 10000;
  const meshRef = useRef();

  const { geometry, alphaArray } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const alphas = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions.set(
        [Math.random() * 200 - 100, Math.random() * 100, Math.random() * 200 - 100],
        i * 3
      );
      alphas[i] = Math.random(); // 각각 다르게 반짝이도록
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));

    return { geometry, alphaArray: alphas };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      material.uniforms.uTime.value = clock.elapsedTime;

      // 반짝이 랜덤하게 업데이트
      const alphaAttr = meshRef.current.geometry.attributes.aAlpha;
      for (let i = 0; i < count; i++) {
        alphaArray[i] = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 3 + i); // 사인 곡선으로 깜빡임
        alphaAttr.array[i] = alphaArray[i];
      }
      alphaAttr.needsUpdate = true;
    }
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
};

export default StarShader;
