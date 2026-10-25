import * as THREE from 'three';

/** A soft fire halo sits behind the single sculpted mesh; embers are handled separately. */
export interface PhoenixFireEffect {
  mesh: THREE.Group;
  update: (scrollProgress: number, time: number, wingPower?: number, scrollEnergy?: number) => void;
  dispose: () => void;
}

export function createPhoenixFire(): PhoenixFireEffect {
  const group = new THREE.Group();
  group.name = 'PhoenixFireAtmosphere';

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not create the phoenix fire halo.');

  const glow = context.createRadialGradient(128, 128, 5, 128, 128, 128);
  glow.addColorStop(0, 'rgba(255,204,105,0.56)');
  glow.addColorStop(0.25, 'rgba(255,103,28,0.42)');
  glow.addColorStop(0.58, 'rgba(217,39,17,0.22)');
  glow.addColorStop(0.84, 'rgba(116,11,7,0.055)');
  glow.addColorStop(1, 'rgba(58,5,3,0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    color: 0xff8130,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const aura = new THREE.Sprite(material);
  aura.name = 'PhoenixFireHalo';
  aura.position.set(0, -0.08, -1.72);
  aura.scale.set(4.8, 5.6, 1);
  group.add(aura);

  const coolEmber = new THREE.Color(0xe84c20);
  const goldEmber = new THREE.Color(0xffbd51);
  function update(scrollProgress: number, time: number, wingPower = 0, scrollEnergy = 0) {
    const rebirth = THREE.MathUtils.smoothstep(scrollProgress, 0.54, 0.88);
    const stroke = THREE.MathUtils.clamp(wingPower, 0, 1);
    const pulse = 1 + Math.sin(time * 0.92) * 0.038 + stroke * 0.035 + scrollEnergy * 0.04;
    aura.scale.set(4.8 * pulse, 5.6 * pulse, 1);
    material.opacity = 0.76 + rebirth * 0.12 + stroke * 0.06 + scrollEnergy * 0.18;
    material.color.lerpColors(coolEmber, goldEmber, rebirth * 0.62);
  }

  function dispose() {
    material.dispose();
    texture.dispose();
  }

  return { mesh: group, update, dispose };
}
