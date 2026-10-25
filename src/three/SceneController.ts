import * as THREE from 'three';
import { createPhoenixExperience, type PhoenixExperienceInstance } from './phoenix/PhoenixExperience';

/**
 * ARENOVA 3D SCENE CONTROLLER
 * Manages persistent Three.js Canvas, scroll layout path, camera choreography,
 * environmental transformations (fragmentation -> connection -> ascent), and lighting.
 */

export interface SceneController {
  init: (container: HTMLElement) => boolean;
  setScrollProgress: (progress: number, velocity: number) => void;
  setMouse: (x: number, y: number) => void;
  setReducedMotion: (enabled: boolean) => void;
  resize: () => void;
  dispose: () => void;
}

export function createSceneController(): SceneController {
  let containerEl: HTMLElement | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let phoenix: PhoenixExperienceInstance | null = null;

  let animFrameId: number = 0;
  let lastTime: number = performance.now();
  let reducedMotion = false;
  let pageVisible = document.visibilityState === 'visible';

  // Scroll tracking with smooth damping (lerp)
  let targetProgress = 0;
  let currentProgress = 0;
  let scrollVelocity = 0;
  let lastScrollTarget = 0;
  let lastScrollSampleTime = 0;

  // Mouse parallax
  let mouse = { x: 0, y: 0 };
  let targetMouse = { x: 0, y: 0 };
  const worldUp = new THREE.Vector3(0, 1, 0);
  const pathRight = new THREE.Vector3();
  const cameraPositionTarget = new THREE.Vector3();
  const cameraLookTarget = new THREE.Vector3();
  const cameraLookCurrent = new THREE.Vector3();
  const layoutPosition = new THREE.Vector3();
  const layoutTangent = new THREE.Vector3();
  const layoutBefore = new THREE.Vector3();
  const layoutAfter = new THREE.Vector3();
  const orientationLookTarget = new THREE.Vector3();
  const orientationTarget = new THREE.Object3D();
  const heroOrientation = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.035, -0.58, -0.025));
  let hasCameraPose = false;

  // -------------------------------------------------------------
  // ENVIRONMENTAL 3D OBJECTS
  // -------------------------------------------------------------
  let ambientDataGrid: THREE.Points | null = null;

  // -------------------------------------------------------------
  // SCROLL-DRIVEN LAYOUT PATH (AWAKEN -> ASCEND)
  // This outer experience transform is reserved for chapter composition.
  // Continuous idle flight lives on the nested PhoenixFlightRig instead.
  // -------------------------------------------------------------
  // 0.00: Hero Awakening (right flank close-up, headline visible)
  // 0.14: The Problem (diving low left through dark fractured monoliths)
  // 0.28: Transformation (bursting through center, aligning conduits)
  // 0.42: Services part 1 (right flank glide)
  // 0.56: Services part 2 (left flank glide)
  // 0.68: Workflow Demo (stable observation vantage)
  // 0.78: Industries (swooping wide curve)
  // 0.88: Approach (weaving through milestones)
  // 1.00: The Ascent (steep soaring upward into celestial horizon)

  function getLayoutPosition(progress: number, target: THREE.Vector3) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const envelope = Math.sin(Math.PI * p);
    const ascent = THREE.MathUtils.smoothstep(p, 0.80, 1);
    // Eager responsive travel curve: accelerates flight traversal on less scroll
    const depthTravel = Math.pow(p, 0.82);

    // The scroll layer follows one continuous analytic path. Lateral/vertical drift
    // provides cinematic swooping while depth carries the chapter journey.
    return target.set(
      2.2 * (1 - p) + 2.6 * Math.sin(Math.PI * 3.2 * p) * envelope,
      0.25 + 1.25 * Math.sin(Math.PI * 3.2 * p) * envelope + 8.8 * ascent,
      0.5 - 62.0 * depthTravel,
    );
  }

  function getLayoutTangent(progress: number, target: THREE.Vector3) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const before = Math.max(0, p - 0.001);
    const after = Math.min(1, p + 0.001);
    getLayoutPosition(before, layoutBefore);
    getLayoutPosition(after, layoutAfter);
    return target.subVectors(layoutAfter, layoutBefore).normalize();
  }

  const cameraKeys = [
    { at: 0.00, side: -2.3, distance: 9.2, height: 0.65, lookSide: -3.65, lookHeight: 0.18, lookAhead: 0.05 },
    { at: 0.18, side: -2.2, distance: 8.8, height: 0.70, lookSide: -3.50, lookHeight: 0.18, lookAhead: 0.08 },
    { at: 0.32, side: -2.3, distance: 8.4, height: 0.80, lookSide: -3.60, lookHeight: 0.20, lookAhead: 0.10 },
    { at: 0.50, side: -2.2, distance: 8.2, height: 0.75, lookSide: -3.45, lookHeight: 0.20, lookAhead: 0.12 },
    { at: 0.70, side: -2.0, distance: 8.6, height: 0.85, lookSide: -3.20, lookHeight: 0.22, lookAhead: 0.18 },
    { at: 0.85, side: -0.8, distance: 12.0, height: 1.10, lookSide: -1.20, lookHeight: 0.10, lookAhead: 0.28 },
    { at: 1.00, side: 0.0, distance: 15.0, height: 0.90, lookSide: 0.00, lookHeight: 0.00, lookAhead: 0.45 },
  ];
  const cameraPose = { side: 0, distance: 0, height: 0, lookSide: 0, lookHeight: 0, lookAhead: 0 };

  function getCameraPose(progress: number) {
    let index = 0;
    while (index < cameraKeys.length - 2 && progress > cameraKeys[index + 1].at) index++;
    const from = cameraKeys[index];
    const to = cameraKeys[index + 1];
    const blend = THREE.MathUtils.smoothstep(progress, from.at, to.at);
    cameraPose.side = THREE.MathUtils.lerp(from.side, to.side, blend);
    cameraPose.distance = THREE.MathUtils.lerp(from.distance, to.distance, blend);
    cameraPose.height = THREE.MathUtils.lerp(from.height, to.height, blend);
    cameraPose.lookSide = THREE.MathUtils.lerp(from.lookSide, to.lookSide, blend);
    cameraPose.lookHeight = THREE.MathUtils.lerp(from.lookHeight, to.lookHeight, blend);
    cameraPose.lookAhead = THREE.MathUtils.lerp(from.lookAhead, to.lookAhead, blend);
    return cameraPose;
  }

  function init(container: HTMLElement): boolean {
    containerEl = container;

    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080505);
    scene.fog = new THREE.FogExp2(0x080505, 0.012);

    // CAMERA
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    camera = new THREE.PerspectiveCamera(isMobile ? 54 : 46, width / height, 0.1, 170);
    camera.position.set(0, 1, 6);

    // RENDERER
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.devicePixelRatio < 2,
        powerPreference: 'high-performance',
        alpha: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.15 : 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = false;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to basic rendering', e);
      renderer?.dispose();
      renderer = null;
      return false;
    }

    // -------------------------------------------------------------
    // BUILD THE FEATHERED PHOENIX, EMBERS, MATERIALS AND WARM LIGHT RIG
    // -------------------------------------------------------------
    try {
      phoenix = createPhoenixExperience(renderer, scene, isMobile ? 160 : 520, isMobile);
    } catch (error) {
      console.warn('Phoenix rendering is unavailable; using the atmospheric fallback.', error);
      renderer.domElement.remove();
      renderer.dispose();
      renderer = null;
      return false;
    }

    // Position phoenix at initial hero position
    const startPos = getLayoutPosition(0, layoutPosition);
    phoenix.rootGroup.position.copy(startPos);
    phoenix.rootGroup.scale.setScalar(isMobile ? 0.86 : 1.03);

    // Monolith slabs removed - celestial space is completely open and unobstructed so the Phoenix is never hidden



    // -------------------------------------------------------------
    // AMBIENT CELESTIAL DUST
    // -------------------------------------------------------------
    const gridCount = isMobile ? 110 : 250;
    const gridGeo = new THREE.BufferGeometry();
    const gridPositions = new Float32Array(gridCount * 3);
    for (let g = 0; g < gridCount; g++) {
      gridPositions[g * 3] = (Math.sin(g * 12.9898) * 0.5) * 35;
      gridPositions[g * 3 + 1] = (Math.cos(g * 7.233) * 0.5) * 20;
      gridPositions[g * 3 + 2] = -((g * 0.61803398875) % 1) * 65;
    }
    gridGeo.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
    const gridMat = new THREE.PointsMaterial({
      color: 0xd17b38,
      size: 0.05,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
    });
    ambientDataGrid = new THREE.Points(gridGeo, gridMat);
    scene.add(ambientDataGrid);

    // START RENDER LOOP
    lastTime = performance.now();
    animate();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return true;
  }

  function setScrollProgress(progress: number, velocity: number) {
    const nextProgress = Math.max(0, Math.min(1, progress));
    const now = performance.now();
    const sampleDelta = (now - lastScrollSampleTime) / 1000;
    const measuredVelocity = sampleDelta > 0.002
      ? (nextProgress - lastScrollTarget) / sampleDelta
      : 0;
    targetProgress = nextProgress;
    scrollVelocity = velocity || THREE.MathUtils.clamp(measuredVelocity, -5, 5);
    lastScrollTarget = nextProgress;
    lastScrollSampleTime = now;
    if (reducedMotion && pageVisible && animFrameId === 0) {
      animFrameId = requestAnimationFrame(animate);
    }
  }

  function setMouse(x: number, y: number) {
    targetMouse.x = reducedMotion ? 0 : x;
    targetMouse.y = reducedMotion ? 0 : y;
  }

  function setReducedMotion(enabled: boolean) {
    if (reducedMotion === enabled) return;
    reducedMotion = enabled;
    cancelAnimationFrame(animFrameId);
    animFrameId = 0;
    lastTime = performance.now();
    if (pageVisible) animFrameId = requestAnimationFrame(animate);
  }

  function handleVisibilityChange() {
    pageVisible = document.visibilityState === 'visible';
    if (!pageVisible) {
      cancelAnimationFrame(animFrameId);
      animFrameId = 0;
      return;
    }
    lastTime = performance.now();
    if (animFrameId === 0) animFrameId = requestAnimationFrame(animate);
  }

  function resize() {
    if (!renderer || !camera || !containerEl) return;
    const width = containerEl.clientWidth || window.innerWidth;
    const height = containerEl.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.fov = width < 768 ? 54 : 46;
    camera.updateProjectionMatrix();
    phoenix?.rootGroup.scale.setScalar(width < 768 ? 0.86 : 1.03);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 768 ? 1.15 : 1.5));
    renderer.setSize(width, height);
    if (reducedMotion && pageVisible && animFrameId === 0) {
      animFrameId = requestAnimationFrame(animate);
    }
  }

  function animate() {
    if (!pageVisible) {
      animFrameId = 0;
      return;
    }
    animFrameId = reducedMotion ? 0 : requestAnimationFrame(animate);

    const now = performance.now();
    const delta = reducedMotion ? 1 / 60 : Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    if (now - lastScrollSampleTime > 70) {
      scrollVelocity *= Math.exp(-delta * 7.5);
      if (Math.abs(scrollVelocity) < 0.015) scrollVelocity = 0;
    }

    // Smooth input with responsive damping so it reacts immediately to scroll
    const ease = 1 - Math.exp(-delta * 8.5);
    if (reducedMotion) currentProgress = targetProgress;
    else currentProgress += (targetProgress - currentProgress) * ease;

    // Smooth mouse interpolation
    if (reducedMotion) {
      mouse.x = 0;
      mouse.y = 0;
    } else {
      mouse.x += (targetMouse.x - mouse.x) * (1 - Math.exp(-delta * 4.5));
      mouse.y += (targetMouse.y - mouse.y) * (1 - Math.exp(-delta * 4.5));
    }

    // -------------------------------------------------------------
    // SCROLL LAYOUT: keep chapter composition on the outer experience group.
    // The nested model flight rig owns all continuous idle motion.
    // -------------------------------------------------------------
    const t = THREE.MathUtils.clamp(currentProgress, 0, 1);
    getLayoutPosition(t, layoutPosition);
    getLayoutTangent(t, layoutTangent);
    orientationLookTarget.copy(layoutPosition).add(layoutTangent);

    if (phoenix) {
      phoenix.rootGroup.position.copy(layoutPosition);
      orientationTarget.position.copy(layoutPosition);
      orientationTarget.lookAt(orientationLookTarget);
      const orientationBlend = THREE.MathUtils.smoothstep(currentProgress, 0.08, 0.28);
      phoenix.rootGroup.quaternion.slerpQuaternions(heroOrientation, orientationTarget.quaternion, orientationBlend);
      phoenix.update(delta, scrollVelocity, currentProgress, mouse, reducedMotion);
    }

    // -------------------------------------------------------------
    // CAMERA CHOREOGRAPHY
    // Smooth cinematic tracking composed for Arenova editorial layout
    // -------------------------------------------------------------
    if (camera) {
      const isMobile = window.innerWidth < 768;
      const pose = getCameraPose(currentProgress);
      const mobileDistance = isMobile ? 0.92 : 1;
      const mobileSide = isMobile ? 0.52 : 1;
      const mobileLookSide = isMobile ? 0.35 : 1;
      pathRight.crossVectors(layoutTangent, worldUp);
      if (pathRight.lengthSq() < 0.001) pathRight.set(1, 0, 0);
      else pathRight.normalize();

      cameraPositionTarget.copy(layoutPosition)
        .addScaledVector(layoutTangent, -pose.distance * mobileDistance)
        .addScaledVector(pathRight, pose.side * mobileSide + mouse.x * (isMobile ? 0.12 : 0.28))
        .addScaledVector(worldUp, pose.height + mouse.y * (isMobile ? 0.08 : 0.16));
      cameraLookTarget.copy(layoutPosition)
        .addScaledVector(pathRight, pose.lookSide * mobileLookSide)
        .addScaledVector(worldUp, pose.lookHeight)
        .addScaledVector(layoutTangent, pose.lookAhead);

      if (!hasCameraPose) {
        camera.position.copy(cameraPositionTarget);
        cameraLookCurrent.copy(cameraLookTarget);
        hasCameraPose = true;
      } else {
        camera.position.lerp(cameraPositionTarget, ease);
        cameraLookCurrent.lerp(cameraLookTarget, ease);
      }
      camera.lookAt(cameraLookCurrent);
    }

    // Ambient floating celestial dust motion
    if (ambientDataGrid) {
      ambientDataGrid.rotation.y = currentProgress * 0.12;
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }

  }

  function dispose() {
    cancelAnimationFrame(animFrameId);
    animFrameId = 0;
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    if (phoenix) phoenix.dispose();
    phoenix = null;

    const roots: THREE.Object3D[] = [];
    if (ambientDataGrid) roots.push(ambientDataGrid);
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    for (const root of roots) {
      scene?.remove(root);
      root.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          geometries.add(object.geometry);
          const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
          objectMaterials.forEach((material) => materials.add(material));
        }
      });
    }
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());

    if (renderer) {
      renderer.domElement.remove();
      renderer.dispose();
    }
    ambientDataGrid = null;
    hasCameraPose = false;
    scene = null;
    camera = null;
    renderer = null;
  }

  return {
    init,
    setScrollProgress,
    setMouse,
    setReducedMotion,
    resize,
    dispose,
  };
}
