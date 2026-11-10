import * as THREE from 'three';

/** Soft key, amber rim and restrained follow light for warm plumage. */
export interface PhoenixLightingRig {
  group: THREE.Group;
  keyLight: THREE.DirectionalLight;
  leftRimLight: THREE.PointLight;
  rightRimLight: THREE.PointLight;
  fillLight: THREE.DirectionalLight;
  coreFollowLight: THREE.PointLight;
  ambientLight: THREE.AmbientLight;
  update: (phoenixPos: THREE.Vector3, scrollProgress: number) => void;
  dispose: () => void;
}

export function createPhoenixLighting(scene: THREE.Scene): PhoenixLightingRig {
  const group = new THREE.Group();
  group.name = 'PhoenixWarmStudioLights';
  scene.add(group);

  const ambientLight = new THREE.AmbientLight(0x33201a, 0.52);
  group.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffd1a0, 2.45);
  keyLight.position.set(-3.5, 6.5, 6.0);
  group.add(keyLight);

  const leftRimLight = new THREE.PointLight(0xff4818, 4.3, 34, 1.4);
  leftRimLight.position.set(-5.5, 2.8, -3.8);
  group.add(leftRimLight);

  const rightRimLight = new THREE.PointLight(0xffb23e, 4.7, 34, 1.4);
  rightRimLight.position.set(5.5, 3.4, -3.3);
  group.add(rightRimLight);

  // A cool counter-rim separates the warm bird from the dark backdrop.
  const coolRimLight = new THREE.PointLight(0x4f6bff, 1.1, 26, 1.5);
  coolRimLight.position.set(-4.5, 1.6, -6.5);
  group.add(coolRimLight);

  const fillLight = new THREE.DirectionalLight(0xc35429, 1.05);
  fillLight.position.set(4.5, -2.5, 3.5);
  group.add(fillLight);

  // The fire itself throws light: a flickering ember lamp under the wings.
  const coreFollowLight = new THREE.PointLight(0xff6d00, 1.8, 10, 1.8);
  group.add(coreFollowLight);
  const fireLight = new THREE.PointLight(0xff8a2e, 2.0, 15, 1.5);
  group.add(fireLight);

  let elapsed = 0;

  function update(phoenixPos: THREE.Vector3, scrollProgress: number) {
    elapsed += 1 / 60;
    const flicker = 0.86 + 0.14 * Math.sin(elapsed * 9.3) * Math.sin(elapsed * 3.7 + 1.2);
    coreFollowLight.position.set(phoenixPos.x, phoenixPos.y + 0.15, phoenixPos.z + 0.55);
    fireLight.position.set(phoenixPos.x + 0.35, phoenixPos.y - 0.15, phoenixPos.z + 0.9);
    leftRimLight.position.z = phoenixPos.z - 3.2;
    rightRimLight.position.z = phoenixPos.z - 3.0;
    coolRimLight.position.set(phoenixPos.x - 4.2, phoenixPos.y + 1.4, phoenixPos.z - 5.5);

    const rebirth = THREE.MathUtils.smoothstep(scrollProgress, 0.55, 0.88);
    keyLight.intensity = 2.45 + rebirth * 0.35;
    leftRimLight.intensity = 4.1 + rebirth * 1.2;
    rightRimLight.intensity = 4.5 + rebirth * 1.3;
    coreFollowLight.intensity = (1.7 + rebirth * 1.1) * flicker;
    fireLight.intensity = (2.0 + rebirth * 1.2) * flicker;
    coolRimLight.intensity = 0.8 + rebirth * 0.5;
  }

  function dispose() {
    scene.remove(group);
  }

  return {
    group, keyLight, leftRimLight, rightRimLight, fillLight, coreFollowLight,
    ambientLight, update, dispose,
  };
}
