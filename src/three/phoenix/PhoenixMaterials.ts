import * as THREE from 'three';

export interface PhoenixMotionUniforms {
  uWingSweep: THREE.IUniform<number>;
  uWingLift: THREE.IUniform<number>;
  uTailFlow: THREE.IUniform<number>;
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
  haze: THREE.ShaderMaterial;
  motion: PhoenixMotionUniforms;
  envMap: THREE.Texture;
  update: (time: number, scrollProgress: number, wingPower?: number) => void;
  dispose: () => void;
}

/**
 * PHOENIX MATERIAL SYSTEM
 * Ember-plumage shading: deep oxblood feathers with incandescent rims, a
 * velvet body that never reads as plastic, and a slow travelling flow wave
 * that ripples down every vane.
 */
export function createPhoenixMaterials(renderer: THREE.WebGLRenderer): PhoenixMaterialSet {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 384;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not create the phoenix reflection environment.');

  const background = context.createLinearGradient(0, 0, 0, canvas.height);
  background.addColorStop(0, '#140706');
  background.addColorStop(0.5, '#070404');
  background.addColorStop(1, '#1d0905');
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const key = context.createRadialGradient(170, 96, 10, 170, 96, 250);
  key.addColorStop(0, 'rgba(255,196,132,0.62)');
  key.addColorStop(0.38, 'rgba(255,104,40,0.24)');
  key.addColorStop(1, 'rgba(255,60,16,0)');
  context.fillStyle = key;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const rim = context.createLinearGradient(520, 0, 700, canvas.height);
  rim.addColorStop(0, 'rgba(255,163,74,0.34)');
  rim.addColorStop(1, 'rgba(214,38,14,0)');
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
    uTailFlow: { value: 0 },
    uHeadTurn: { value: 0 },
    uHeadNod: { value: 0 },
    uBreath: { value: 0 },
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uHeat: { value: 0.3 },
  };

  // ---------------------------------------------------------------
  // BODY: velvet ember skin, not lacquer. Sheen supplies the soft
  // feather-like falloff that reads as plumage at any distance.
  // ---------------------------------------------------------------
  const sculpture = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    roughness: 0.74,
    metalness: 0.015,
    clearcoat: 0.04,
    clearcoatRoughness: 0.72,
    sheen: 0.8,
    sheenColor: new THREE.Color(0xff6a2a),
    sheenRoughness: 0.62,
    envMap,
    envMapIntensity: 0.18,
    side: THREE.DoubleSide,
  });

  sculpture.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, motion);
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        ['#include <common>', 'uniform float uBreath;', 'varying vec3 vPhoenixBodyLocal;'].join('\n'),
      )
      .replace(
        '#include <begin_vertex>',
        [
          '#include <begin_vertex>',
          'vPhoenixBodyLocal = position;',
          'transformed.z += uBreath * smoothstep(-0.2, 0.85, position.y) * max(position.z, 0.0) * 0.16;',
        ].join('\n'),
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        [
          '#include <common>',
          'uniform float uTime;',
          'uniform float uHeat;',
          'uniform float uWingLift;',
          'varying vec3 vPhoenixBodyLocal;',
        ].join('\n'),
      )
      .replace(
        '#include <color_fragment>',
        [
          '#include <color_fragment>',
          'float frontMask = 0.2 + 0.8 * smoothstep(-0.4, 0.42, vPhoenixBodyLocal.z);',
          'float emberVein = pow(max(0.0, sin(vPhoenixBodyLocal.y * 21.0 + sin(vPhoenixBodyLocal.x * 15.0) * 1.2)), 26.0);',
          'float motes = sin(vPhoenixBodyLocal.x * 38.0 + uTime * 0.7) * sin(vPhoenixBodyLocal.y * 34.0 - uTime * 0.52);',
          'float glowMote = smoothstep(0.86, 0.995, motes) * frontMask;',
          'diffuseColor.rgb *= 0.95 + 0.05 * sin(vPhoenixBodyLocal.y * 9.0 + vPhoenixBodyLocal.z * 7.0);',
          'diffuseColor.rgb += vec3(0.16, 0.02, 0.002) * emberVein * frontMask * (0.4 + uHeat * 0.55);',
          'diffuseColor.rgb += vec3(0.1, 0.017, 0.002) * glowMote * (0.3 + uHeat * 0.4);',
        ].join('\n'),
      )
      .replace(
        '#include <emissivemap_fragment>',
        [
          '#include <emissivemap_fragment>',
          'totalEmissiveRadiance += vec3(1.0, 0.06, 0.004) * emberVein * frontMask * (0.22 + uHeat * 0.4);',
          'totalEmissiveRadiance += vec3(1.0, 0.14, 0.012) * glowMote * (0.16 + uHeat * 0.34 + uWingLift * 0.05);',
          'float bodyFresnel = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 3.2);',
          'totalEmissiveRadiance += vec3(1.0, 0.07, 0.006) * bodyFresnel * (0.32 + uHeat * 0.5);',
          'totalEmissiveRadiance += vec3(0.2, 0.014, 0.001) * (0.42 + uHeat * 0.5);',
        ].join('\n'),
      );
  };
  sculpture.customProgramCacheKey = () => 'arenova-phoenix-ember-skin-v5';

  // ---------------------------------------------------------------
  // FEATHERS: dark vanes, incandescent rims, travelling flow wave.
  // ---------------------------------------------------------------
  const feather = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    roughness: 0.68,
    metalness: 0.0,
    clearcoat: 0.0,
    clearcoatRoughness: 0.8,
    sheen: 0.7,
    sheenColor: new THREE.Color(0xff7a30),
    sheenRoughness: 0.6,
    envMap,
    envMapIntensity: 0.16,
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
  });

  feather.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, motion);
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        [
          '#include <common>',
          'attribute vec3 aFeatherAxis;',
          'attribute vec3 aFeatherPerp;',
          'attribute float aFeatherSeed;',
          'attribute float aFlutter;',
          'attribute float aBurn;',
          'attribute float aFlow;',
          'uniform float uTime;',
          'uniform float uWingSweep;',
          'uniform float uWingLift;',
          'uniform float uTailFlow;',
          'varying vec2 vFeatherUv;',
          'varying float vFeatherBurn;',
          'varying float vFeatherSeed;',
          'varying float vFeatherFlow;',
        ].join('\n'),
      )
      .replace(
        '#include <begin_vertex>',
        [
          '#include <begin_vertex>',
          'vFeatherUv = uv;',
          'vFeatherBurn = aBurn;',
          'vFeatherSeed = aFeatherSeed;',
          'vFeatherFlow = aFlow;',
          'float seedPhase = aFeatherSeed * 6.28318;',
          'float strokeFlex = uWingSweep * 0.42 - uWingLift * 0.18;',
          'float waveA = sin(uTime * 2.6 - uv.y * 3.4 + seedPhase);',
          'float waveB = sin(uTime * 4.1 - uv.y * 6.1 + seedPhase * 1.7) * 0.42;',
          'float flowWave = (waveA + waveB) * (0.25 + uv.y * 0.85);',
          'float tailPush = uTailFlow * 0.55 * uv.y;',
          'transformed += aFeatherPerp * (strokeFlex + flowWave * aFlow * 0.16 + tailPush) * aFlutter * uv.y * uv.y;',
          'transformed += aFeatherAxis * (sin(uTime * 3.3 - uv.y * 4.8 + seedPhase) * 0.05 + uWingLift * 0.05) * aFlutter * uv.y * uv.y;',
        ].join('\n'),
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        [
          '#include <common>',
          'uniform float uTime;',
          'uniform float uHeat;',
          'uniform float uWingLift;',
          'varying vec2 vFeatherUv;',
          'varying float vFeatherBurn;',
          'varying float vFeatherSeed;',
          'varying float vFeatherFlow;',
        ].join('\n'),
      )
      .replace(
        '#include <color_fragment>',
        [
          '#include <color_fragment>',
          'float across = abs(vFeatherUv.x - 0.5);',
          'float rachis = 1.0 - smoothstep(0.008, 0.03, across);',
          'float barbPhase = across * 64.0 - vFeatherUv.y * 7.4 + sin(vFeatherUv.y * 16.0 + vFeatherSeed) * 0.28;',
          'float barb = pow(max(0.0, cos(barbPhase)), 16.0) * smoothstep(0.05, 0.14, across);',
          'float grain = sin(vFeatherUv.y * 41.0 + vFeatherSeed * 19.0) * sin(vFeatherUv.x * 21.0 + vFeatherSeed * 11.0);',
          'float tip = smoothstep(0.62, 1.0, vFeatherUv.y);',
          'float rim = smoothstep(0.33, 0.5, across) * (0.18 + 0.82 * tip);',
          'float emberPulse = 0.78 + 0.22 * sin(uTime * 1.35 + vFeatherSeed * 12.0);',
          'float perFeather = 0.88 + 0.12 * sin(vFeatherSeed * 53.0 + 1.7);',
          'float rootDepth = mix(0.74, 1.0, smoothstep(0.02, 0.62, vFeatherUv.y));',
          'diffuseColor.rgb *= perFeather * rootDepth;',
          'diffuseColor.rgb *= 0.9 + grain * 0.022 - barb * 0.05;',
          'diffuseColor.rgb += vec3(0.09, 0.014, 0.004) * rachis;',
          'diffuseColor.rgb += vec3(0.2, 0.035, 0.004) * rim * vFeatherBurn * (0.25 + uHeat * 0.45);',
          '// Soft vanes: edges melt together and the tips dissolve into the fire.',
          'float edgeX = smoothstep(0.0, 0.12, vFeatherUv.x) * smoothstep(0.0, 0.12, 1.0 - vFeatherUv.x);',
          'float distal = 1.0 - smoothstep(0.3, 1.0, vFeatherUv.y) * 0.42;',
          'float edgeRoot = smoothstep(0.0, 0.035, vFeatherUv.y);',
          'diffuseColor.a *= edgeX * distal * edgeRoot * 0.94;',
        ].join('\n'),
      )
      .replace(
        '#include <emissivemap_fragment>',
        [
          '#include <emissivemap_fragment>',
          'float rimGlow = smoothstep(0.36, 0.5, across) * (0.2 + 0.8 * tip);',
          'float tipGlow = smoothstep(0.78, 1.0, vFeatherUv.y);',
          'totalEmissiveRadiance += vec3(1.0, 0.09, 0.004) * rimGlow * vFeatherBurn * emberPulse * (0.4 + uHeat * 0.55);',
          'totalEmissiveRadiance += vec3(1.0, 0.3, 0.025) * tipGlow * vFeatherBurn * (0.45 + uHeat * 0.6);',
          'totalEmissiveRadiance += vec3(0.42, 0.03, 0.003) * rachis * vFeatherBurn * 0.22;',
          'float featherFresnel = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.8);',
          'totalEmissiveRadiance += vec3(1.0, 0.07, 0.005) * featherFresnel * (0.28 + uHeat * 0.48);',
          'totalEmissiveRadiance += vec3(0.26, 0.019, 0.0015) * (0.4 + uHeat * 0.5);',
        ].join('\n'),
      );
  };
  feather.customProgramCacheKey = () => 'arenova-phoenix-ember-plumage-v5';
  // Double-sided transparency is drawn twice by default; one pass is enough
  // here because every vane is nearly flat and depth-tested.
  feather.forceSinglePass = true;

  const wingBone = new THREE.MeshPhysicalMaterial({
    color: 0x6a160c,
    roughness: 0.72,
    metalness: 0.0,
    emissive: 0xff4a12,
    emissiveIntensity: 0.55,
    sheen: 0.7,
    sheenColor: new THREE.Color(0xb03217),
    sheenRoughness: 0.7,
    envMap,
    envMapIntensity: 0.22,
  });
  const head = new THREE.MeshPhysicalMaterial({
    color: 0x7a1216,
    roughness: 0.68,
    metalness: 0.0,
    emissive: 0x8a1a08,
    emissiveIntensity: 0.22,
    sheen: 0.85,
    sheenColor: new THREE.Color(0xff6a34),
    sheenRoughness: 0.5,
    envMap,
    envMapIntensity: 0.3,
  });
  const beak = new THREE.MeshPhysicalMaterial({
    color: 0x9c5a24,
    roughness: 0.34,
    metalness: 0.32,
    clearcoat: 0.24,
    clearcoatRoughness: 0.3,
    envMap,
    envMapIntensity: 0.5,
  });
  const eyeSocket = new THREE.MeshStandardMaterial({ color: 0x1a0707, roughness: 0.7 });
  const eye = new THREE.MeshStandardMaterial({
    color: 0xffb347,
    emissive: 0xff6a10,
    emissiveIntensity: 1.35,
    roughness: 0.18,
  });

  // ---------------------------------------------------------------
  // WING / TAIL HAZE: soft additive ember light that fills the gaps
  // between vanes so the plumage never reads as black cut-outs.
  // ---------------------------------------------------------------
  const haze = new THREE.ShaderMaterial({
    uniforms: {
      uTime: motion.uTime,
      uHeat: motion.uHeat,
      uStrength: { value: 0.6 },
    },
    vertexShader: [
      'varying vec2 vUv;',
      'void main() {',
      '  vUv = uv;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '}',
    ].join('\n'),
    fragmentShader: [
      'uniform float uTime;',
      'uniform float uHeat;',
      'uniform float uStrength;',
      'varying vec2 vUv;',
      'void main() {',
      '  vec2 p = vUv * 2.0 - 1.0;',
      '  float r = length(p * vec2(0.82, 1.0));',
      '  float falloff = 1.0 - smoothstep(0.25, 1.0, r);',
      '  float swirl = 0.86 + 0.14 * sin(p.x * 5.0 + p.y * 3.2 + uTime * 1.4);',
      '  float alpha = falloff * swirl * uStrength * (0.35 + uHeat * 0.55);',
      '  if (alpha < 0.006) discard;',
      '  vec3 color = mix(vec3(0.85, 0.06, 0.003), vec3(1.0, 0.28, 0.02), (1.0 - r) * 0.8);',
      '  gl_FragColor = vec4(color, alpha);',
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
  haze.toneMapped = false;

  function update(time: number, scrollProgress: number, wingPower = 0) {
    const progress = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const awakening = THREE.MathUtils.smoothstep(progress, 0.02, 0.3);
    const rekindle = THREE.MathUtils.smoothstep(progress, 0.7, 1);
    motion.uTime.value = time;
    motion.uProgress.value = progress;
    motion.uHeat.value =
      0.38 + awakening * 0.2 + rekindle * 0.26 + THREE.MathUtils.clamp(wingPower, 0, 1) * 0.1;
    // Tail flow leans on the same spring that drives the tail rig.
    motion.uTailFlow.value = Math.sin(time * 1.1) * 0.12 + wingPower * 0.1;
  }

  function dispose() {
    sculpture.dispose();
    feather.dispose();
    wingBone.dispose();
    head.dispose();
    beak.dispose();
    eyeSocket.dispose();
    eye.dispose();
    haze.dispose();
    envMap.dispose();
  }

  return {
    sculpture,
    feather,
    wingBone,
    head,
    beak,
    eyeSocket,
    eye,
    haze,
    motion,
    envMap,
    update,
    dispose,
  };
}
