import * as THREE from 'three';

export interface PhoenixParticlesSystem {
  points: THREE.Points;
  update: (scrollProgress: number, emitters: readonly THREE.Vector3[], time: number, delta: number, wingPower?: number, scrollEnergy?: number) => void;
  dispose: () => void;
}

interface ParticleSeed {
  a: number;
  b: number;
  c: number;
  source: number;
}

function fract(value: number) {
  return value - Math.floor(value);
}

export function createPhoenixParticles(count = 180): PhoenixParticlesSystem {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const warmth = new Float32Array(count);
  const lifeProgress = new Float32Array(count);
  const seeds: ParticleSeed[] = [];
  const lifetimes = new Float32Array(count);
  const velocityX = new Float32Array(count);
  const velocityY = new Float32Array(count);
  const velocityZ = new Float32Array(count);
  const ageSeconds = new Float32Array(count);

  for (let index = 0; index < count; index++) {
    const a = fract(index * 0.61803398875 + 0.17);
    const b = fract(index * 0.75487766625 + 0.39);
    const c = fract(index * 0.56984029099 + 0.71);
    seeds.push({ a, b, c, source: 0 });
    sizes[index] = index % 17 === 0 ? 0.16 + c * 0.05 : 0.05 + c * 0.065;
    warmth[index] = a;
    ageSeconds[index] = -1;
  }

  const positionAttribute = new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage);
  const sizeAttribute = new THREE.BufferAttribute(sizes, 1);
  const warmthAttribute = new THREE.BufferAttribute(warmth, 1);
  const lifeAttribute = new THREE.BufferAttribute(lifeProgress, 1).setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', positionAttribute);
  geometry.setAttribute('size', sizeAttribute);
  geometry.setAttribute('warmth', warmthAttribute);
  geometry.setAttribute('life', lifeAttribute);

  const material = new THREE.ShaderMaterial({
    uniforms: { uIntensity: { value: 0.2 }, uTime: { value: 0 } },
    vertexShader: [
      'attribute float size;',
      'attribute float warmth;',
      'attribute float life;',
      'varying float vWarmth;',
      'varying float vLife;',
      'varying float vDepth;',
      'void main() {',
      '  vWarmth = warmth;',
      '  vLife = life;',
      '  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
      '  vDepth = clamp(1.0 - (-mvPosition.z / 32.0), 0.18, 1.0);',
      '  float growth = 0.6 + 0.55 * sin(3.14159 * clamp(1.0 - life, 0.0, 1.0));',
      '  gl_PointSize = size * growth * (560.0 / max(1.0, -mvPosition.z));',
      '  gl_Position = projectionMatrix * mvPosition;',
      '}',
    ].join('\n'),
    fragmentShader: [
      'uniform float uIntensity;',
      'uniform float uTime;',
      'varying float vWarmth;',
      'varying float vLife;',
      'varying float vDepth;',
      'void main() {',
      '  vec2 p = gl_PointCoord - vec2(0.5);',
      '  p.y *= 1.55;',
      '  float d = length(p);',
      '  if (d > 0.5) discard;',
      '  float irregular = 0.03 * sin(atan(p.y, p.x) * 5.0 + vWarmth * 16.0);',
      '  float core = exp(-d * d * 120.0);',
      '  float glow = exp(-d * d * 16.0);',
      '  float ageFade = smoothstep(0.0, 0.1, vLife) * smoothstep(0.0, 0.22, 1.0 - vLife);',
      '  float twinkle = 0.82 + 0.18 * sin(uTime * 17.0 + vWarmth * 40.0);',
      '  vec3 emberRed = vec3(0.32, 0.008, 0.001);',
      '  vec3 orange = vec3(1.0, 0.13, 0.008);',
      '  vec3 gold = vec3(1.0, 0.52, 0.13);',
      '  vec3 color = mix(emberRed, orange, smoothstep(0.02, 0.7, vLife));',
      '  color = mix(color, gold, smoothstep(0.66, 1.0, vLife) * (0.55 + vWarmth * 0.25));',
      '  color = mix(color, vec3(1.0, 0.85, 0.5), core * 0.45);',
      '  float alpha = (glow * 0.42 + core * 0.85) * ageFade * uIntensity * vDepth;',
      '  gl_FragColor = vec4(color * twinkle, alpha);',
      '  #include <tonemapping_fragment>',
      '  #include <colorspace_fragment>',
      '}',
    ].join('\n'),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
  });
  material.toneMapped = true;

  const points = new THREE.Points(geometry, material);
  points.name = 'PhoenixAnatomicalEmbers';
  points.frustumCulled = false;
  points.renderOrder = 3;

  function respawn(index: number, emitters: readonly THREE.Vector3[]) {
    const seed = seeds[index];
    const sourceCount = Math.max(1, emitters.length);
    const sourceIndex = Math.floor(seed.a * sourceCount) % sourceCount;
    const source = emitters[sourceIndex];
    seed.source = sourceIndex;
    const offset = index * 3;
    positions[offset] = (source?.x ?? 0) + (seed.b - 0.5) * 0.1;
    positions[offset + 1] = (source?.y ?? 0) + (seed.c - 0.5) * 0.08;
    positions[offset + 2] = (source?.z ?? 0) + (seed.a - 0.5) * 0.09;
    velocityX[index] = (seed.b - 0.42) * (0.16 + seed.c * 0.22);
    velocityY[index] = 0.34 + seed.c * 0.5;
    velocityZ[index] = -0.15 - seed.a * 0.23;
    lifetimes[index] = 0.85 + seed.c * 1.45;
    ageSeconds[index] = 0.015 + seed.a * 0.18;
  }

  function update(scrollProgress: number, emitters: readonly THREE.Vector3[], time: number, delta: number, wingPower = 0, scrollEnergy = 0) {
    const opening = THREE.MathUtils.smoothstep(scrollProgress, 0.04, 0.34);
    const ascent = THREE.MathUtils.smoothstep(scrollProgress, 0.8, 1);
    const strokePower = THREE.MathUtils.clamp(wingPower, 0, 1);
    material.uniforms.uIntensity.value = 0.62 + opening * 0.18 + ascent * 0.12 + strokePower * 0.14 + scrollEnergy * 0.22;
    material.uniforms.uTime.value = time;

    for (let index = 0; index < count; index++) {
      if (ageSeconds[index] < 0 || ageSeconds[index] >= lifetimes[index]) respawn(index, emitters);
      const age = ageSeconds[index];
      const life = THREE.MathUtils.clamp(age / lifetimes[index], 0, 1);
      const source = emitters[seeds[index].source];
      const phase = time * (0.48 + seeds[index].b * 0.34) + seeds[index].a * Math.PI * 2;
      const offset = index * 3;
      positions[offset] += velocityX[index] * delta + Math.sin(phase) * delta * 0.082;
      positions[offset + 1] += velocityY[index] * delta;
      positions[offset + 2] += velocityZ[index] * delta;
      if (source && life < 0.18) {
        const follow = (1 - life / 0.18) * delta * 0.08;
        positions[offset] += (source.x - positions[offset]) * follow;
        positions[offset + 1] += (source.y - positions[offset + 1]) * follow;
        positions[offset + 2] += (source.z - positions[offset + 2]) * follow;
      }
      velocityX[index] += Math.sin(phase * 1.7) * delta * 0.052;
      velocityY[index] += (strokePower * 0.22 + scrollEnergy * 0.19) * delta;
      velocityX[index] *= 1 - delta * 0.16;
      velocityY[index] *= 1 - delta * 0.06;
      lifeProgress[index] = 1 - life;
      ageSeconds[index] += delta;
    }

    positionAttribute.needsUpdate = true;
    lifeAttribute.needsUpdate = true;
  }

  function dispose() {
    geometry.dispose();
    material.dispose();
  }

  return { points, update, dispose };
}
