// shaders.js
export const vertexShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float baseWave = -(pow(pos.x * 0.8, 2.0)) * 0.3;
    float hoverWave = sin(pos.x * 1.0 + uTime) * 0.5 * uHover;
    pos.z += baseWave + hoverWave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    vec4 texture = texture2D(uTexture, vUv);
    float opacity = gl_FrontFacing ? 1.0 : 0.2;
    gl_FragColor = vec4(texture.rgb, texture.a * opacity);
  }
`;