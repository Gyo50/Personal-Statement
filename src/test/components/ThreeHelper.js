export const vertexShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    // 카드 굴곡 효과
    float baseWave = -(pow(pos.x * 0.5, 2.0)) * 0.2;
    float hoverWave = sin(pos.x * 1.5 + uTime) * 0.15 * uHover;
    pos.z += baseWave + hoverWave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }

`;



export const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform float uPulse;
  varying vec2 vUv;

  float sdRoundedBox(vec2 p, vec2 b, vec4 r) {
    r.xy = (p.x > 0.0) ? r.xy : r.zw;
    r.x  = (p.y > 0.0) ? r.x  : r.y;
    vec2 q = abs(p) - b + r.x;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;

    float d1 = sdRoundedBox(p, vec2(0.92), vec4(0.1));
    float innerMask = smoothstep(0.0, -0.01, d1);

    float angle = atan(p.y, p.x);

    float beam = sin(angle * 2.0 - uTime * 4.0);
    float beamMask = pow(clamp(beam, 0.0, 1.0), 7.0);
    beamMask *= uPulse;

    float edge1 = smoothstep(0.01, 0.0, abs(d1));
    float glow1 = exp(-abs(d1) * 25.0) * 1.6;

    vec3 colorCyan = vec3(0.0, 0.9, 1.0);
    vec3 colorBlue = vec3(0.0, 0.2, 1.0);
    vec3 neonColor = mix(colorCyan, colorBlue, vUv.y);

    vec4 texColor = texture2D(uTexture, vUv);
    vec3 cardBg = vec3(0.02, 0.02, 0.05);

    vec3 finalRGB = mix(vec3(0.0), cardBg, innerMask);
    finalRGB = mix(finalRGB, neonColor * 2.0, texColor.a * innerMask);

    float activeGlow =
      (edge1 + glow1) *
      (beamMask * 2.5 + 0.5 + uHover);

    finalRGB += neonColor * activeGlow;

    float alpha = max(innerMask * 0.9, activeGlow);

    gl_FragColor = vec4(finalRGB, alpha);
  }
`;
