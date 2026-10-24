import * as THREE from 'three';
import { createPhoenixMaterials, type PhoenixMaterialSet } from './PhoenixMaterials';
import { buildPhoenixModel, type PhoenixModelInstance } from './PhoenixModel';
import { createPhoenixFire, type PhoenixFireEffect } from './PhoenixFire';
import { createPhoenixParticles, type PhoenixParticlesSystem } from './PhoenixParticles';
import { createPhoenixAnimation, type PhoenixAnimationEngine } from './PhoenixAnimation';
import { createPhoenixLighting, type PhoenixLightingRig } from './PhoenixLighting';

/**
 * PHOENIX MASTER CONTROLLER
 * High-level coordinator for the fused Arenova phoenix mesh, warm surface shader,
 * wing deformation, ember particles, and cinematic lighting.
 */

export interface PhoenixExperienceInstance {
  rootGroup: THREE.Group;
  materials: PhoenixMaterialSet;
  model: PhoenixModelInstance;
  fire: PhoenixFireEffect;
  particles: PhoenixParticlesSystem;
  animation: PhoenixAnimationEngine;
  lighting: PhoenixLightingRig;
  update: (
    delta: number,
    speed: number,
    scrollProgress: number,
    mouse: { x: number; y: number },
    reducedMotion?: boolean
  ) => void;
  dispose: () => void;
}

export function createPhoenixExperience(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  particleCount: number = 96,
  isMobile = false
): PhoenixExperienceInstance {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'PhoenixMasterGroup';
  scene.add(rootGroup);

  // 1. Initialize warm PBR materials and the procedural studio environment.
  const materials = createPhoenixMaterials(renderer);
  scene.environment = materials.envMap;

  // 2. Build the layered avian anatomy and articulated feather groups.
  const model = buildPhoenixModel(materials, isMobile);
  rootGroup.add(model.rootGroup);

  // 3. Add one soft atmosphere halo behind the fused sculpture.
  const fire = createPhoenixFire();
  model.bodyGroup.add(fire.mesh);

  // 4. Attach Floating Ember Particle System
  const particles = createPhoenixParticles(particleCount);
  model.flightGroup.add(particles.points);

  // 5. Initialize Flight Kinematics Animation Engine
  const animation = createPhoenixAnimation(model);

  // 6. Setup Cinematic Lighting Rig
  const lighting = createPhoenixLighting(scene);
  let elapsed = 0;

  function update(
    delta: number,
    speed: number,
    scrollProgress: number,
    mouse: { x: number; y: number },
    reducedMotion = false
  ) {
    if (!reducedMotion) elapsed += Math.min(delta, 0.05);
    animation.update(delta, scrollProgress, mouse, reducedMotion, speed);

    const wingPower = model.motion.uWingLift.value;
    materials.update(elapsed, scrollProgress, wingPower);

    const scrollEnergy = THREE.MathUtils.clamp(Math.abs(speed) * 1.35, 0, 1);
    fire.update(scrollProgress, elapsed, wingPower, scrollEnergy);

    // Emit from the live feather tips, shoulders, breast, crest, and tail.
    const emitters = model.getEmitterPositions();
    particles.update(scrollProgress, emitters, elapsed, delta, wingPower, scrollEnergy);

    // Update lighting rig
    lighting.update(rootGroup.position, scrollProgress);
  }

  function dispose() {
    scene.remove(rootGroup);
    materials.dispose();
    scene.environment = null;
    model.bodyGroup.remove(fire.mesh);
    model.dispose();
    fire.dispose();
    particles.dispose();
    lighting.dispose();
  }

  return {
    rootGroup,
    materials,
    model,
    fire,
    particles,
    animation,
    lighting,
    update,
    dispose,
  };
}
