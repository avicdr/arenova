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
  let monolithsGroup: THREE.Group | null = null;
  let monolithMaterial: THREE.MeshStandardMaterial | null = null;
  let monolithMeshes: {
    mesh: THREE.Mesh;
    chaosPos: THREE.Vector3;
    alignedPos: THREE.Vector3;
    chaosRot: THREE.Euler;
    alignedRot: THREE.Euler;
  }[] = [];

  let connectionLines: THREE.LineSegments | null = null;
  let connectionMat: THREE.LineBasicMaterial | null = null;
  let ascentPillarsGroup: THREE.Group | null = null;
  let ascentPillarMaterial: THREE.MeshStandardMaterial | null = null;
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
    const ascent = THREE.MathUtils.smoothstep(p, 0.82, 1);
    const depthTravel = p - 0.11 * Math.sin(Math.PI * p);

    // The scroll layer follows one continuous analytic path instead of moving
    // between a list of authored world-space poses. Depth still carries the
    // chapter journey through the existing environment; lateral/vertical drift
    // stays bounded and eases to the hero and ascent anchors.
    return target.set(
      2.1 * (1 - p) + 2.2 * Math.sin(Math.PI * 3.2 * p) * envelope,
      0.2 + 0.42 * Math.sin(Math.PI * 3.2 * p) * envelope + 8.3 * ascent,
      0.5 - 60.5 * depthTravel,
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
    { at: 0.15, side: -1.0, distance: 8.9, height: 0.65, lookSide: -1.35, lookHeight: 0.12, lookAhead: 0.08 },
    { at: 0.35, side: -0.55, distance: 7.8, height: 0.88, lookSide: -0.12, lookHeight: 0.12, lookAhead: 0.1 },
    { at: 0.50, side: 2.9, distance: 4.5, height: 0.65, lookSide: 1.6, lookHeight: 0.35, lookAhead: 0.12 },
    { at: 0.70, side: -0.35, distance: 5.2, height: 1.25, lookSide: 0.0, lookHeight: 0.3, lookAhead: 0.28 },
    { at: 0.85, side: 0.0, distance: 14.2, height: 1.25, lookSide: 0.0, lookHeight: -0.05, lookAhead: 0.3 },
    { at: 1.00, side: 0.0, distance: 15.5, height: 0.9, lookSide: 0.0, lookHeight: 0.0, lookAhead: 0.45 },
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

    // -------------------------------------------------------------
    // ENVIRONMENTAL 3D OBJECTS:
    // Fragmented Monoliths (Section 2) -> Organized Conduits (Section 3)
    // -------------------------------------------------------------
    monolithsGroup = new THREE.Group();
    scene.add(monolithsGroup);

    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x1c0c09,
      roughness: 0.28,
      metalness: 0.78,
      transparent: true,
      depthWrite: false,
    });
    monolithMaterial = slabMat;

    const numSlabs = 22;
    for (let i = 0; i < numSlabs; i++) {
      const zSlab = -8 - i * 2.4;
      const slabGeo = new THREE.BoxGeometry(0.8 + (i % 3) * 0.4, 3.5 + (i % 2) * 1.5, 0.25);
      const slabMesh = new THREE.Mesh(slabGeo, slabMat);
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;

      // Chaotic fragmented state (Section 2)
      const chaosX = (i % 2 === 0 ? 1 : -1) * (2.2 + Math.sin(i * 1.4) * 2.2);
      const chaosY = Math.sin(i * 0.8) * 2.8 - 0.4;
      const chaosZ = zSlab + Math.cos(i * 2.1) * 1.5;
      const chaosPos = new THREE.Vector3(chaosX, chaosY, chaosZ);
      const chaosRot = new THREE.Euler(
        Math.sin(i * 1.1) * 0.62,
        Math.sin(i * 2.3) * 0.7,
        Math.cos(i * 3.7) * 0.62
      );

      // Aligned harmonious architecture state (Section 3)
      const side = i % 2 === 0 ? 1 : -1;
      const alignedX = side * (3.8 + Math.abs(Math.sin(i * 0.5)) * 0.8);
      const alignedY = 0.5 + (i % 2) * 0.6;
      const alignedZ = zSlab;
      const alignedPos = new THREE.Vector3(alignedX, alignedY, alignedZ);
      const alignedRot = new THREE.Euler(0, side * -0.25, 0);

      slabMesh.position.copy(chaosPos);
      slabMesh.rotation.copy(chaosRot);
      monolithsGroup.add(slabMesh);

      monolithMeshes.push({
        mesh: slabMesh,
        chaosPos,
        alignedPos,
        chaosRot,
        alignedRot,
      });
    }

    // Connection laser lines that light up when transformation occurs
    const linePositions: number[] = [];
    for (let i = 0; i < monolithMeshes.length - 1; i++) {
      linePositions.push(
        monolithMeshes[i].alignedPos.x, monolithMeshes[i].alignedPos.y, monolithMeshes[i].alignedPos.z,
        monolithMeshes[i + 1].alignedPos.x, monolithMeshes[i + 1].alignedPos.y, monolithMeshes[i + 1].alignedPos.z
      );
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    connectionMat = new THREE.LineBasicMaterial({
      color: 0xff8a32,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    connectionLines = new THREE.LineSegments(lineGeo, connectionMat);
    scene.add(connectionLines);

    // -------------------------------------------------------------
    // ASCENT LIGHT PORTAL PILLARS (Section 8)
    // -------------------------------------------------------------
    ascentPillarsGroup = new THREE.Group();
    ascentPillarsGroup.position.set(0, 0, -56);
    scene.add(ascentPillarsGroup);

    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x24100a,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0xff6d00,
      emissiveIntensity: 0.12,
      transparent: true,
      depthWrite: false,
    });
    ascentPillarMaterial = pillarMat;

    for (let p = 0; p < 8; p++) {
      const pSide = p % 2 === 0 ? 1 : -1;
      const pRow = Math.floor(p / 2);
      const pGeo = new THREE.CylinderGeometry(0.35, 0.45, 18, 12);
      const pMesh = new THREE.Mesh(pGeo, pillarMat);
      pMesh.position.set(pSide * (4.5 + pRow * 1.5), 6, -pRow * 5.0);
      ascentPillarsGroup.add(pMesh);
    }

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
    scrollVelocity = velocity || THREE.MathUtils.clamp(measuredVelocity, -3, 3);
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

    // Smooth input once; all poses and effects read this same progress value.
    const ease = 1 - Math.exp(-delta * 5.5);
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

    // -------------------------------------------------------------
    // ENVIRONMENTAL TRANSFORMATION
    // Section 2: Fragmented chaotic monoliths (only visible from Chapter 02 onwards)
    // Section 3: Harmonious alignment into organized conduits
    // -------------------------------------------------------------
    const architectureFade = 1 - THREE.MathUtils.smoothstep(currentProgress, 0.72, 0.84);
    const pillarFade = 1 - THREE.MathUtils.smoothstep(currentProgress, 0.78, 0.86);
    if (monolithMaterial) monolithMaterial.opacity = architectureFade;
    if (ascentPillarMaterial) ascentPillarMaterial.opacity = pillarFade;
    if (monolithsGroup) {
      monolithsGroup.visible = currentProgress >= 0.12 && architectureFade > 0.01;
    }
    if (connectionLines) {
      connectionLines.visible = currentProgress >= 0.25 && architectureFade > 0.01;
    }
    if (ascentPillarsGroup) {
      ascentPillarsGroup.visible = currentProgress >= 0.78 && pillarFade > 0.01;
    }

    if (monolithMeshes.length > 0 && currentProgress >= 0.12) {
      const alignFactor = THREE.MathUtils.smoothstep(currentProgress, 0.25, 0.37);

      for (let i = 0; i < monolithMeshes.length; i++) {
        const item = monolithMeshes[i];
        item.mesh.position.lerpVectors(item.chaosPos, item.alignedPos, alignFactor);
        item.mesh.rotation.x = THREE.MathUtils.lerp(item.chaosRot.x, item.alignedRot.x, alignFactor);
        item.mesh.rotation.y = THREE.MathUtils.lerp(item.chaosRot.y, item.alignedRot.y, alignFactor);
        item.mesh.rotation.z = THREE.MathUtils.lerp(item.chaosRot.z, item.alignedRot.z, alignFactor);
      }

      if (connectionMat) {
        connectionMat.opacity = THREE.MathUtils.smoothstep(currentProgress, 0.26, 0.48) * 0.72 * architectureFade;
      }
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
    if (monolithsGroup) roots.push(monolithsGroup);
    if (connectionLines) roots.push(connectionLines);
    if (ascentPillarsGroup) roots.push(ascentPillarsGroup);
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
    monolithMeshes = [];
    monolithsGroup = null;
    monolithMaterial = null;
    connectionLines = null;
    connectionMat = null;
    ascentPillarsGroup = null;
    ascentPillarMaterial = null;
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
