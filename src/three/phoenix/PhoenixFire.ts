import * as THREE from 'three';
import type { FlameSite } from './PhoenixModel';

/**
 * PHOENIX FIRE
 * Soft, camera-facing flame tongues born from every burning feather tip,
 * crest quill and torso ember seam. Each tongue is a billboard whose alpha is
 * carved out of animated fBm noise, so no geometry edge ever shows: the fire
 * dissolves into the air the way real flame does.
 */
export interface PhoenixFireEffect {
  mesh: THREE.Group;
  update: (
    time: number,
    delta: number,
    scrollProgress: number,
    sites: readonly FlameSite[],
    positions: readonly THREE.Vector3[],
    wingPower?: number,
    scrollEnergy?: number,
  ) => void;
  dispose: () => void;
}

const FLAME_VERTEX = [
  'attribute vec3 aOffset;',
  'attribute vec2 aSize;',
  'attribute float aSeed;',
  'attribute float aLife;',
  'attribute float aAngle;',
  'attribute float aHeat;',
  'varying vec2 vUv;',
  'varying float vSeed;',
  'varying float vLife;',
  'varying float vHeat;',
  'void main() {',
  '  vUv = uv;',
  '  vSeed = aSeed;',
  '  vLife = aLife;',
  '  vHeat = aHeat;',
  '  vec4 mv = modelViewMatrix * vec4(aOffset, 1.0);',
  '  float s = sin(aAngle);',
  '  float c = cos(aAngle);',
  '  vec2 local = vec2(position.x, position.y + 0.5);',
  '  vec2 p = vec2(local.x * c - local.y * s, local.x * s + local.y * c) * aSize;',
  '  mv.xy += p;',
  '  gl_Position = projectionMatrix * mv;',
  '}',
].join('\n');

const FLAME_FRAGMENT = [
  'uniform float uTime;',
  'uniform float uIntensity;',
  'varying vec2 vUv;',
  'varying float vSeed;',
  'varying float vLife;',
  'varying float vHeat;',
  'float hash(vec2 p) {',
  '  p = fract(p * vec2(123.34, 456.21));',
  '  p += dot(p, p + 45.32);',
  '  return fract(p.x * p.y);',
  '}',
  'float noise(vec2 p) {',
  '  vec2 i = floor(p);',
  '  vec2 f = fract(p);',
  '  f = f * f * (3.0 - 2.0 * f);',
  '  float a = hash(i);',
  '  float b = hash(i + vec2(1.0, 0.0));',
  '  float c = hash(i + vec2(0.0, 1.0));',
  '  float d = hash(i + vec2(1.0, 1.0));',
  '  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);',
  '}',
  'float fbm(vec2 p) {',
  '  float value = 0.0;',
  '  float amplitude = 0.55;',
  '  for (int i = 0; i < 3; i++) {',
  '    value += amplitude * noise(p);',
  '    p = p * 2.07 + vec2(9.7, 5.3);',
  '    amplitude *= 0.5;',
  '  }',
  '  return value;',
  '}',
  'void main() {',
  '  float h = vUv.y;',
  '  float x = (vUv.x - 0.5) * 2.0;',
  '  float drift = uTime * 2.1 + vSeed * 17.0;',
  '  // A clean, soft tongue: broad root, wavering waist, thin licking tip.',
  '  float waist = mix(0.92, 0.1, pow(h, 0.72));',
  '  waist *= 1.0 + 0.22 * sin(h * 8.5 - drift * 1.7 + vSeed * 6.0);',
  '  float d = abs(x) / max(0.05, waist);',
  '  float body = exp(-d * d * 1.9);',
  '  float rise = smoothstep(0.0, 0.1, h) * (1.0 - smoothstep(0.55 + vSeed * 0.16, 1.0, h));',
  '  float flicker = 0.78 + 0.22 * fbm(vec2(x * 2.2 + vSeed * 3.0, h * 3.4 - drift));',
  '  float lifeFade = smoothstep(0.0, 0.14, vLife) * (1.0 - smoothstep(0.48, 1.0, vLife));',
  '  float alpha = body * rise * flicker * lifeFade;',
  '  if (alpha < 0.01) discard;',
  '  float heatCore = exp(-d * d * 5.0) * (1.0 - smoothstep(0.05, 0.55, h));',
  '  vec3 deepRed = vec3(0.45, 0.01, 0.001);',
  '  vec3 orange = vec3(1.0, 0.075, 0.003);',
  '  vec3 gold = vec3(1.0, 0.22, 0.012);',
  '  vec3 color = mix(deepRed, orange, smoothstep(0.0, 0.65, 1.0 - h));',
  '  color = mix(color, gold, heatCore * 0.65);',
  '  color = mix(color, vec3(1.0, 0.6, 0.18), pow(heatCore, 7.0) * 0.4);',
  '  color = mix(color, deepRed, smoothstep(0.65, 1.0, h) * 0.5);',
  '  gl_FragColor = vec4(color * (1.35 + vHeat * 0.55), alpha * uIntensity);',
  '  #include <tonemapping_fragment>',
  '  #include <colorspace_fragment>',
  '}',
].join('\n');

interface FlameParticle {
  active: boolean;
  site: number;
  age: number;
  lifespan: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  angle: number;
  spin: number;
  width: number;
  height: number;
  seed: number;
  heat: number;
}

export function createPhoenixFire(flameCount = 260): PhoenixFireEffect {
  const group = new THREE.Group();
  group.name = 'PhoenixFireField';

  // ---------------------------------------------------------------
  // AMBIENT EMBER HALO: two soft, breathing veils behind the bird.
  // ---------------------------------------------------------------
  const haloCanvas = document.createElement('canvas');
  haloCanvas.width = 256;
  haloCanvas.height = 256;
  const haloContext = haloCanvas.getContext('2d');
  if (!haloContext) throw new Error('Could not create the phoenix fire halo.');

  const haloGradient = haloContext.createRadialGradient(128, 128, 6, 128, 128, 128);
  haloGradient.addColorStop(0, 'rgba(255,190,96,0.5)');
  haloGradient.addColorStop(0.22, 'rgba(255,96,24,0.34)');
  haloGradient.addColorStop(0.55, 'rgba(198,32,12,0.16)');
  haloGradient.addColorStop(0.82, 'rgba(96,9,5,0.04)');
  haloGradient.addColorStop(1, 'rgba(50,4,2,0)');
  haloContext.fillStyle = haloGradient;
  haloContext.fillRect(0, 0, 256, 256);

  const haloTexture = new THREE.CanvasTexture(haloCanvas);
  haloTexture.colorSpace = THREE.SRGBColorSpace;

  const outerMaterial = new THREE.SpriteMaterial({
    map: haloTexture,
    color: 0xff6a24,
    transparent: true,
    opacity: 0.42,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
  });
  const outerHalo = new THREE.Sprite(outerMaterial);
  outerHalo.name = 'PhoenixFireHaloOuter';
  outerHalo.position.set(0, -0.05, -1.85);
  outerHalo.scale.set(5.6, 6.6, 1);
  group.add(outerHalo);

  const innerMaterial = new THREE.SpriteMaterial({
    map: haloTexture,
    color: 0xffb45a,
    transparent: true,
    opacity: 0.26,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
  });
  const innerHalo = new THREE.Sprite(innerMaterial);
  innerHalo.name = 'PhoenixFireHaloInner';
  innerHalo.position.set(0, 0.15, -1.2);
  innerHalo.scale.set(3.0, 3.6, 1);
  group.add(innerHalo);

  // ---------------------------------------------------------------
  // FLAME BILLBOARDS
  // ---------------------------------------------------------------
  const count = Math.max(32, Math.floor(flameCount));
  const base = new THREE.PlaneGeometry(1, 1);
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.index = base.index;
  geometry.setAttribute('position', base.getAttribute('position'));
  geometry.setAttribute('uv', base.getAttribute('uv'));
  geometry.instanceCount = count;

  const offsets = new Float32Array(count * 3);
  const sizes = new Float32Array(count * 2);
  const seeds = new Float32Array(count);
  const lives = new Float32Array(count);
  const angles = new Float32Array(count);
  const heats = new Float32Array(count);

  const offsetAttribute = new THREE.InstancedBufferAttribute(offsets, 3).setUsage(THREE.DynamicDrawUsage);
  const sizeAttribute = new THREE.InstancedBufferAttribute(sizes, 2).setUsage(THREE.DynamicDrawUsage);
  const seedAttribute = new THREE.InstancedBufferAttribute(seeds, 1);
  const lifeAttribute = new THREE.InstancedBufferAttribute(lives, 1).setUsage(THREE.DynamicDrawUsage);
  const angleAttribute = new THREE.InstancedBufferAttribute(angles, 1).setUsage(THREE.DynamicDrawUsage);
  const heatAttribute = new THREE.InstancedBufferAttribute(heats, 1).setUsage(THREE.DynamicDrawUsage);

  geometry.setAttribute('aOffset', offsetAttribute);
  geometry.setAttribute('aSize', sizeAttribute);
  geometry.setAttribute('aSeed', seedAttribute);
  geometry.setAttribute('aLife', lifeAttribute);
  geometry.setAttribute('aAngle', angleAttribute);
  geometry.setAttribute('aHeat', heatAttribute);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: 0.9 },
    },
    vertexShader: FLAME_VERTEX,
    fragmentShader: FLAME_FRAGMENT,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
  });
  material.toneMapped = false;

  const flames = new THREE.Mesh(geometry, material);
  flames.name = 'PhoenixFlameTongues';
  flames.frustumCulled = false;
  flames.renderOrder = 4;
  group.add(flames);

  const particles: FlameParticle[] = [];
  for (let index = 0; index < count; index++) {
    particles.push({
      active: false,
      site: 0,
      age: 0,
      lifespan: 1,
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      angle: 0,
      spin: 0,
      width: 0.4,
      height: 0.8,
      seed: 0,
      heat: 1,
    });
    // Stagger the first ignition so the field does not all flash at once.
    const particle = particles[index];
    particle.seed = Math.random();
    particle.age = -Math.random() * 1.4;
    particle.lifespan = 0.7 + Math.random() * 0.6;
    particle.width = 0.2;
    particle.height = 0.2;
    particle.heat = 1;
    seeds[index] = particle.seed;
    heats[index] = particle.heat + Math.random() * 0.2;
    sizes[index * 2] = 0;
    sizes[index * 2 + 1] = 0;
  }
  seedAttribute.needsUpdate = true;

  let elapsed = 0;
  const debugState = { elapsed: 0, dt: 0, active: 0, sampleAges: [] as number[] };
  group.userData.debug = debugState;

  function spawn(particle: FlameParticle, sites: readonly FlameSite[], positions: readonly THREE.Vector3[]) {
    const siteCount = sites.length;
    if (siteCount === 0) return false;
    // Bias births toward the wingtips and tail by picking uniformly; those
    // sites vastly outnumber the torso embers, which is what we want.
    const siteIndex = Math.floor(Math.random() * siteCount);
    const site = sites[siteIndex];
    const origin = positions[siteIndex];
    if (!site || !origin) return false;

    const spread = site.size * 0.55;
    particle.site = siteIndex;
    particle.x = origin.x + (Math.random() - 0.5) * spread;
    particle.y = origin.y + (Math.random() - 0.5) * spread * 0.4;
    particle.z = origin.z + (Math.random() - 0.5) * spread;
    particle.vx = (Math.random() - 0.5) * 0.34;
    particle.vy = 0.55 + Math.random() * 0.55;
    particle.vz = (Math.random() - 0.5) * 0.22 - 0.06;
    particle.age = 0;
    particle.lifespan = 0.62 + Math.random() * 0.62;
    particle.width = site.size * (0.58 + Math.random() * 0.36);
    particle.height = site.size * (0.9 + Math.random() * 0.55);
    particle.angle = (Math.random() - 0.5) * 1.3;
    particle.spin = (Math.random() - 0.5) * 0.7;
    particle.seed = Math.random();
    particle.heat = site.kind === 1 ? 0.86 : 1.0;
    return true;
  }

  function update(
    _time: number,
    delta: number,
    scrollProgress: number,
    sites: readonly FlameSite[],
    positions: readonly THREE.Vector3[],
    wingPower = 0,
    scrollEnergy = 0,
  ) {
    const dt = Math.min(delta, 0.05);
    elapsed += dt;
    material.uniforms.uTime.value = elapsed;

    const awakening = THREE.MathUtils.smoothstep(scrollProgress, 0.02, 0.32);
    const rekindle = THREE.MathUtils.smoothstep(scrollProgress, 0.66, 1);
    const stroke = THREE.MathUtils.clamp(wingPower, 0, 1);
    const energy = THREE.MathUtils.clamp(scrollEnergy, 0, 1);
    material.uniforms.uIntensity.value = 0.52 + awakening * 0.12 + rekindle * 0.14 + stroke * 0.1 + energy * 0.12;

    const haloPulse = 1 + Math.sin(elapsed * 0.8) * 0.03 + stroke * 0.05 + energy * 0.05;
    outerHalo.scale.set(5.6 * haloPulse, 6.6 * haloPulse, 1);
    innerHalo.scale.set(3.0 * haloPulse, 3.6 * haloPulse, 1);
    outerMaterial.opacity = 0.36 + rekindle * 0.14 + stroke * 0.06 + energy * 0.12;
    innerMaterial.opacity = 0.22 + rekindle * 0.1 + stroke * 0.05 + energy * 0.1;
    outerMaterial.color.setRGB(1.0, 0.14 + rekindle * 0.04, 0.018);
    innerMaterial.color.setRGB(1.0, 0.3 + rekindle * 0.06, 0.05);

    for (let index = 0; index < count; index++) {
      const particle = particles[index];
      if (particle.age < 0) {
        // Still waiting for its ignition moment.
        particle.age += dt;
        if (particle.age < 0) {
          sizes[index * 2] = 0;
          sizes[index * 2 + 1] = 0;
          lives[index] = 0;
          continue;
        }
      }
      if (particle.age >= particle.lifespan) {
        if (!spawn(particle, sites, positions)) {
          sizes[index * 2] = 0;
          sizes[index * 2 + 1] = 0;
          continue;
        }
        seeds[index] = particle.seed;
      }

      particle.age += dt;
      const life = THREE.MathUtils.clamp(particle.age / particle.lifespan, 0, 1);

      // Buoyant rise with a lazy curl, drifting into the wake of the bird.
      const curlPhase = elapsed * 1.7 + particle.seed * 6.283;
      particle.vx += Math.sin(curlPhase) * dt * 0.55;
      particle.vz += Math.cos(curlPhase * 0.8) * dt * 0.34;
      particle.vy += dt * (0.75 + stroke * 0.5 + energy * 0.35);
      particle.vx *= 1 - dt * 1.1;
      particle.vy *= 1 - dt * 0.35;
      particle.vz *= 1 - dt * 1.0;

      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.z += particle.vz * dt;
      particle.angle += particle.spin * dt;

      const grow = 1 + life * 0.55;
      const stretch = 1 + life * (0.4 + stroke * 0.25);
      offsets[index * 3] = particle.x;
      offsets[index * 3 + 1] = particle.y;
      offsets[index * 3 + 2] = particle.z;
      sizes[index * 2] = particle.width * grow;
      sizes[index * 2 + 1] = particle.height * stretch;
      lives[index] = life;
      angles[index] = particle.angle;
      heats[index] = particle.heat + stroke * 0.18 + energy * 0.2;
    }

    offsetAttribute.needsUpdate = true;
    sizeAttribute.needsUpdate = true;
    lifeAttribute.needsUpdate = true;
    angleAttribute.needsUpdate = true;
    heatAttribute.needsUpdate = true;
    seedAttribute.needsUpdate = true;

    debugState.elapsed = elapsed;
    debugState.dt = dt;
    debugState.sampleAges = particles.slice(0, 12).map((p) => p.age);
    debugState.active = particles.filter((p) => p.age >= 0).length;
  }

  function dispose() {
    material.dispose();
    geometry.dispose();
    base.dispose();
    outerMaterial.dispose();
    innerMaterial.dispose();
    haloTexture.dispose();
  }

  return { mesh: group, update, dispose };
}
