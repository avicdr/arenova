import * as THREE from 'three';

export interface PhoenixMotionUniforms {
  uWingSweep: THREE.IUniform<number>;
  uWingLift: THREE.IUniform<number>;
  uTailSway: THREE.IUniform<number>;
  uHeadTurn: THREE.IUniform<number>;
  uHeadNod: THREE.IUniform<number>;
  uBreath: THREE.IUniform<number>;
  uTime: THREE.IUniform<number>;
  uProgress: THREE.IUniform<number>;
  uHeat: THREE.IUniform<number>;
}

export interface PhoenixMaterialSet {
  sculpture: THREE.MeshPhysicalMaterial;
  feather: THREE.MeshPhysicalMaterial;
  wingBone: THREE.MeshPhysicalMaterial;
  head: THREE.MeshPhysicalMaterial;
  beak: THREE.MeshPhysicalMaterial;
  eyeSocket: THREE.MeshStandardMaterial;
  eye: THREE.MeshStandardMaterial;
  flame: THREE.ShaderMaterial;
  motion: PhoenixMotionUniforms;
  envMap: THREE.Texture;
  update: (time: number, scrollProgress: number, wingPower?: number) => void;
  dispose: () => void;
}

export function createPhoenixMaterials(renderer: THREE.WebGLRenderer): PhoenixMaterialSet {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 384;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not create the phoenix reflection environment.');

  const background = context.createLinearGradient(0, 0, 0, canvas.height);
  background.addColorStop(0, '#160807');
  background.addColorStop(0.5, '#090505');
  background.addColorStop(1, '#210b06');
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const key = context.createRadialGradient(170, 96, 10, 170, 96, 250);
  key.addColorStop(0, 'rgba(255,224,176,0.82)');
  key.addColorStop(0.38, 'rgba(255,130,52,0.34)');
  key.addColorStop(1, 'rgba(255,72,20,0)');
  context.fillStyle = key;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const rim = context.createLinearGradient(520, 0, 700, canvas.height);
  rim.addColorStop(0, 'rgba(255,183,88,0.46)');
  rim.addColorStop(1, 'rgba(224,45,18,0)');
  context.fillStyle = rim;
  context.fillRect(470, 0, 250, canvas.height);

  const sourceEnvironment = new THREE.CanvasTexture(canvas);
  sourceEnvironment.colorSpace = THREE.SRGBColorSpace;
  sourceEnvironment.mapping = THREE.EquirectangularReflectionMapping;
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envMap = pmrem.fromEquirectangular(sourceEnvironment).texture;
  pmrem.dispose();
  sourceEnvironment.dispose();

  const motion: PhoenixMotionUniforms = {
    uWingSweep: { value: 0 },
    uWingLift: { value: 0 },
    uTailSway: { value: 0 },
    uHeadTurn: { value: 0 },
    uHeadNod: { value: 0 },
    uBreath: { value: 0 },
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uHeat: { value: 0.28 },
  };

  const sculpture = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    roughness: 0.49,
    metalness: 0.025,
    clearcoat: 0.12,
    clearcoatRoughness: 0.5,
    envMap,
    envMapIntensity: 0.42,
    side: THREE.DoubleSide,
  });

  sculpture.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, motion);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', [
        '#include <common>',
        'uniform float uBreath;',
        'varying vec3 vPhoenixBodyLocal;',
      ].join('\n'))
      .replace('#include <begin_vertex>', [
        '#include <begin_vertex>',
        'vPhoenixBodyLocal = position;',
        'transformed.z += uBreath * smoothstep(-0.2, 0.85, position.y) * max(position.z, 0.0) * 0.18;',
      ].join('\n'));

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', [
        '#include <common>',
        'uniform float uTime;',
        'uniform float uHeat;',
        'uniform float uWingLift;',
        'varying vec3 vPhoenixBodyLocal;',
      ].join('\n'))
      .replace('#include <color_fragment>', [
        '#include <color_fragment>',
        'float frontMask = 0.16 + 0.84 * smoothstep(-0.32, 0.38, vPhoenixBodyLocal.z);',
        'float heatFlow = sin(vPhoenixBodyLocal.x * 15.0 + sin(vPhoenixBodyLocal.y * 10.0 + vPhoenixBodyLocal.z * 12.0) * 1.7)',
        '  * cos(vPhoenixBodyLocal.y * 14.0 - vPhoenixBodyLocal.z * 11.0 + uTime * 0.24);',
        'float emberSeam = smoothstep(0.972, 0.997, abs(heatFlow)) * frontMask * (0.35 + 0.65 * smoothstep(-0.72, 0.55, vPhoenixBodyLocal.y));',
        'diffuseColor.rgb *= 0.96 + 0.035 * sin(vPhoenixBodyLocal.y * 8.0 + vPhoenixBodyLocal.z * 9.0);',
        'diffuseColor.rgb += vec3(0.12, 0.022, 0.003) * emberSeam * (0.35 + uHeat * 0.42);',
      ].join('\n'))
      .replace('#include <emissivemap_fragment>', [
        '#include <emissivemap_fragment>',
        'totalEmissiveRadiance += vec3(0.95, 0.16, 0.018) * emberSeam * (0.2 + uHeat * 0.42 + uWingLift * 0.04);',
      ].join('\n'));
  };
  sculpture.customProgramCacheKey = () => 'arenova-phoenix-sculpted-core-v4-ember-flight';

  const feather = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    roughness: 0.47,
    metalness: 0.018,
    clearcoat: 0.16,
    clearcoatRoughness: 0.42,
    envMap,
    envMapIntensity: 0.38,
    side: THREE.DoubleSide,
  });

  feather.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, motion);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', [
        '#include <common>',
        'attribute vec3 aFeatherAxis;',
        'attribute vec3 aFeatherPerp;',
        'attribute float aFeatherSeed;',
        'attribute float aFlutter;',
        'attribute float aBurn;',
        'uniform float uTime;',
        'uniform float uWingSweep;',
        'uniform float uWingLift;',
        'varying vec2 vFeatherUv;',
        'varying float vFeatherBurn;',
        'varying float vFeatherSeed;',
      ].join('\n'))
      .replace('#include <begin_vertex>', [
        '#include <begin_vertex>',
        'vFeatherUv = uv;',
        'vFeatherBurn = aBurn;',
        'vFeatherSeed = aFeatherSeed;',
        'float lag = sin(uTime * 5.15 - 0.62 + aFeatherSeed * 0.18);',
        'float strokeFlex = uWingSweep * 0.62 - uWingLift * 0.24;',
        'transformed += aFeatherPerp * (lag * 0.22 + strokeFlex) * aFlutter * uv.y * uv.y;',
        'transformed += aFeatherAxis * (sin(uTime * 4.2 - 0.48 + aFeatherSeed * 0.2) * 0.08 + uWingLift * 0.08) * aFlutter * uv.y * uv.y;',
      ].join('\n'));

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', [
        '#include <common>',
        'uniform float uTime;',
        'uniform float uHeat;',
        'varying vec2 vFeatherUv;',
        'varying float vFeatherBurn;',
        'varying float vFeatherSeed;',
      ].join('\n'))
      .replace('#include <color_fragment>', [
        '#include <color_fragment>',
        'float across = abs(vFeatherUv.x - 0.5);',
        'float rachis = 1.0 - smoothstep(0.012, 0.035, across);',
        'float barbPhase = across * 72.0 - vFeatherUv.y * 8.2 + sin(vFeatherUv.y * 18.0 + vFeatherSeed) * 0.32;',
        'float barb = pow(max(0.0, cos(barbPhase)), 20.0) * smoothstep(0.055, 0.15, across);',
        'float grain = sin(vFeatherUv.y * 47.0 + vFeatherSeed * 19.0) * sin(vFeatherUv.x * 23.0 + vFeatherSeed * 11.0);',
        'float veinHeat = smoothstep(0.975, 0.999, sin(vFeatherUv.y * 19.0 + vFeatherSeed * 5.0 + uTime * 0.32));',
        'diffuseColor.rgb *= 0.93 + grain * 0.018 - barb * 0.065;',
        'diffuseColor.rgb += vec3(0.11, 0.026, 0.006) * rachis;',
        'diffuseColor.rgb += vec3(0.18, 0.035, 0.004) * veinHeat * vFeatherBurn * (0.22 + uHeat * 0.35);',
      ].join('\n'))
      .replace('#include <emissivemap_fragment>', [
        '#include <emissivemap_fragment>',
        'float shaftGlow = (rachis * 0.12 + veinHeat * 0.46) * vFeatherBurn;',
        'float tipGlow = smoothstep(0.82, 1.0, vFeatherUv.y) * vFeatherBurn;',
        'totalEmissiveRadiance += vec3(1.0, 0.18, 0.018) * shaftGlow * (0.28 + uHeat * 0.42);',
        'totalEmissiveRadiance += vec3(1.0, 0.42, 0.055) * tipGlow * (0.3 + uHeat * 0.38);',
      ].join('\n'));
  };
  feather.customProgramCacheKey = () => 'arenova-individual-feather-plumage-v3-flight';

  const wingBone = new THREE.MeshPhysicalMaterial({
    color: 0x681721,
    roughness: 0.58,
    metalness: 0.02,
    clearcoat: 0.12,
    clearcoatRoughness: 0.5,
    envMap,
    envMapIntensity: 0.3,
  });
  const head = new THREE.MeshPhysicalMaterial({
    color: 0xb72a31,
    roughness: 0.42,
    metalness: 0.025,
    clearcoat: 0.18,
    clearcoatRoughness: 0.38,
    envMap,
    envMapIntensity: 0.4,
  });
  const beak = new THREE.MeshPhysicalMaterial({
    color: 0x331813,
    roughness: 0.36,
    metalness: 0.08,
    clearcoat: 0.26,
    clearcoatRoughness: 0.28,
    envMap,
    envMapIntensity: 0.35,
  });
  const eyeSocket = new THREE.MeshStandardMaterial({ color: 0x280c0b, roughness: 0.62 });
  const eye = new THREE.MeshStandardMaterial({
    color: 0xffa62c,
    emissive: 0xff5b08,
    emissiveIntensity: 1.55,
    roughness: 0.2,
  });

  const flame = new THREE.ShaderMaterial({
    uniforms: { uTime: motion.uTime, uHeat: motion.uHeat, uWingLift: motion.uWingLift },
    vertexShader: [
      'attribute float aFlameSeed;',
      'uniform float uTime;',
      'uniform float uHeat;',
      'uniform float uWingLift;',
      'varying vec2 vUv;',
      'varying float vSeed;',
      'void main() {',
      '  vUv = uv;',
      '  vSeed = aFlameSeed;',
      '  vec3 p = position;',
      '  float pulse = 0.5 + 0.5 * sin(uTime * 4.1 + aFlameSeed * 6.28318);',
      '  p.x += sin(p.y * 13.0 + uTime * 3.1 + aFlameSeed * 9.0) * (0.032 + 0.085 * p.y) * (0.65 + uHeat);',
      '  p.x += sin(p.y * 25.0 - uTime * 4.2 + aFlameSeed * 4.0) * 0.018 * p.y;',
      '  p.z += cos(p.y * 10.0 - uTime * 2.7 + aFlameSeed * 7.0) * 0.032 * p.y * pulse;',
      '  p.y += sin(p.y * 8.0 + uTime * 3.0 + aFlameSeed * 5.0) * 0.04 * p.y * uHeat + uWingLift * 0.024 * p.y;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);',
      '}',
    ].join('\n'),
    fragmentShader: [
      'uniform float uTime;',
      'uniform float uHeat;',
      'uniform float uWingLift;',
      'varying vec2 vUv;',
      'varying float vSeed;',
      'void main() {',
      '  float u = vUv.x;',
      '  float h = vUv.y;',
      '  float edge = smoothstep(0.0, 0.16, u) * (1.0 - smoothstep(0.84, 1.0, u));',
      '  float baseFade = smoothstep(0.0, 0.07, h) * (1.0 - smoothstep(0.88, 1.0, h));',
      '  float ripple = 0.72 + 0.28 * sin(h * 22.0 - uTime * 4.2 + vSeed * 12.0);',
      '  float sideCore = exp(-abs(u - 0.5) * 34.0);',
      '  float hotCore = exp(-abs(u - 0.5) * 48.0) * smoothstep(0.1, 0.4, h) * (1.0 - smoothstep(0.72, 0.96, h));',
      '  vec3 ember = vec3(0.62, 0.018, 0.004);',
      '  vec3 scarlet = vec3(1.0, 0.095, 0.008);',
      '  vec3 orange = vec3(1.0, 0.36, 0.025);',
      '  vec3 gold = vec3(1.0, 0.92, 0.58);',
      '  vec3 color = mix(ember, scarlet, smoothstep(0.02, 0.36, h));',
      '  color = mix(color, orange, smoothstep(0.28, 0.72, h));',
      '  color = mix(color, gold, smoothstep(0.76, 0.99, h) * 0.92);',
      '  color += vec3(0.9, 0.64, 0.22) * sideCore * smoothstep(0.2, 0.78, h) * 0.42;',
      '  color = mix(color, vec3(1.0, 0.78, 0.42), hotCore * 0.38);',
      '  color = mix(color, vec3(1.0, 0.96, 0.76), sideCore * smoothstep(0.72, 0.96, h) * 0.3);',
      '  float alpha = edge * baseFade * ripple * (0.82 + uHeat * 0.24 + uWingLift * 0.06);',
      '  float brightness = 1.32 + sideCore * 0.58 + 0.12 * sin(uTime * 6.0 + vSeed * 20.0) + uWingLift * 0.08;',
      '  gl_FragColor = vec4(color * brightness * 1.25, alpha);',
      '  #include <tonemapping_fragment>',
      '  #include <colorspace_fragment>',
      '}',
    ].join('\n'),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
  });
  flame.toneMapped = false;

  function update(time: number, scrollProgress: number, wingPower = 0) {
    const progress = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const awakening = THREE.MathUtils.smoothstep(progress, 0.02, 0.3);
    const ascent = THREE.MathUtils.smoothstep(progress, 0.78, 1);
    motion.uTime.value = time;
    motion.uProgress.value = progress;
    motion.uHeat.value = 0.34 + awakening * 0.22 + ascent * 0.28 + THREE.MathUtils.clamp(wingPower, 0, 1) * 0.09;
  }

  function dispose() {
    sculpture.dispose();
    feather.dispose();
    wingBone.dispose();
    head.dispose();
    beak.dispose();
    eyeSocket.dispose();
    eye.dispose();
    flame.dispose();
    envMap.dispose();
  }

  return { sculpture, feather, wingBone, head, beak, eyeSocket, eye, flame, motion, envMap, update, dispose };
}
