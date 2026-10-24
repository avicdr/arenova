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

  const ambientLight = new THREE.AmbientLight(0x3b2018, 0.72);
  group.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffd1a0, 2.8);
  keyLight.position.set(-3.5, 6.5, 6.0);
  group.add(keyLight);

  const leftRimLight = new THREE.PointLight(0xff4818, 4.3, 34, 1.4);
  leftRimLight.position.set(-5.5, 2.8, -3.8);
  group.add(leftRimLight);

  const rightRimLight = new THREE.PointLight(0xffb23e, 4.7, 34, 1.4);
  rightRimLight.position.set(5.5, 3.4, -3.3);
  group.add(rightRimLight);

  const fillLight = new THREE.DirectionalLight(0xc35429, 0.82);
  fillLight.position.set(4.5, -2.5, 3.5);
  group.add(fillLight);

  const coreFollowLight = new THREE.PointLight(0xff6d00, 1.8, 10, 1.8);
  group.add(coreFollowLight);

  function update(phoenixPos: THREE.Vector3, scrollProgress: number) {
    coreFollowLight.position.set(phoenixPos.x, phoenixPos.y + 0.1, phoenixPos.z + 0.45);
    leftRimLight.position.z = phoenixPos.z - 3.2;
    rightRimLight.position.z = phoenixPos.z - 3.0;

    const rebirth = THREE.MathUtils.smoothstep(scrollProgress, 0.55, 0.88);
    keyLight.intensity = 2.8 + rebirth * 0.45;
    leftRimLight.intensity = 4.1 + rebirth * 1.2;
    rightRimLight.intensity = 4.5 + rebirth * 1.3;
    coreFollowLight.intensity = 1.8 + rebirth * 1.35;
  }

  function dispose() {
    scene.remove(group);
  }

  return {
    group, keyLight, leftRimLight, rightRimLight, fillLight, coreFollowLight,
    ambientLight, update, dispose,
  };
}
