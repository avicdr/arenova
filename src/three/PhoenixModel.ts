import * as THREE from 'three';

/**
 * ARENOVA PHOENIX GENERATOR
 * High-end sculptural 3D Phoenix character with articulated multi-joint wings,
 * layered metallic feathers, radiant ember eye, dynamic undulating ribbon tail,
 * and particle trail.
 */

export interface PhoenixController {
  group: THREE.Group;
  update: (delta: number, speed: number, scrollProgress: number, mouse: { x: number; y: number }) => void;
  dispose: () => void;
}

export function createPhoenix(): PhoenixController {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'PhoenixRoot';

  // Bank & Tilt sub-group for smooth flight dynamics
  const flightBankGroup = new THREE.Group();
  flightBankGroup.name = 'FlightBankGroup';
  rootGroup.add(flightBankGroup);

  // Body container
  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'BodyGroup';
  flightBankGroup.add(bodyGroup);

  // -------------------------------------------------------------
  // MATERIALS: Sculptural Dark Body + Copper / Vermilion / Gold PBR
  // -------------------------------------------------------------
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x161514,
    roughness: 0.28,
    metalness: 0.88,
    flatShading: false,
  });

  const beakMaterial = new THREE.MeshStandardMaterial({
    color: 0xD4AF37, // Rich brushed gold
    roughness: 0.2,
    metalness: 0.95,
  });

  const eyeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF4500, // Blazing vermilion ember
  });

  const eyeGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF7A00,
    transparent: true,
    opacity: 0.7,
  });

  // Layered feather materials (Obsidian -> Burnt Copper -> Vermilion -> Gold)
  const covertFeatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x221F1D,
    roughness: 0.35,
    metalness: 0.75,
    side: THREE.DoubleSide,
  });

  const secondaryFeatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x8C381E, // Burnt copper
    roughness: 0.3,
    metalness: 0.82,
    emissive: 0x4A1709,
    emissiveIntensity: 0.4,
    side: THREE.DoubleSide,
  });

  const primaryFeatherMaterial = new THREE.MeshStandardMaterial({
    color: 0xBA3B1C, // Rich vermilion
    roughness: 0.25,
    metalness: 0.85,
    emissive: 0xE84B2C,
    emissiveIntensity: 0.65,
    side: THREE.DoubleSide,
  });

  const crestFeatherMaterial = new THREE.MeshStandardMaterial({
    color: 0xC86938,
    roughness: 0.25,
    metalness: 0.85,
    emissive: 0x6E2510,
    emissiveIntensity: 0.5,
    side: THREE.DoubleSide,
  });

  // -------------------------------------------------------------
  // 1. SCULPTURAL TORSO & BREASTPLATE
  // -------------------------------------------------------------
  // Streamlined aerodynamic body using compound curved geometry
  const bodyCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0.4, 1.4),   // Neck base
    new THREE.Vector3(0, -0.4, 0.5),  // Deep muscular breast
    new THREE.Vector3(0, -0.2, -1.0), // Tapered abdomen
    new THREE.Vector3(0, 0.1, -2.0)   // Tail dock
  );

  const bodyGeo = new THREE.TubeGeometry(bodyCurve, 28, 0.42, 14, false);
  // Scale along x to give an aerodynamic teardrop cross-section
  const bodyPos = bodyGeo.attributes.position;
  for (let i = 0; i < bodyPos.count; i++) {
    const z = bodyPos.getZ(i);
    const taper = Math.max(0.18, 1.0 - Math.abs(z + 0.3) * 0.4);
    bodyPos.setX(i, bodyPos.getX(i) * taper * 1.15);
    bodyPos.setY(i, bodyPos.getY(i) * taper);
  }
  bodyGeo.computeVertexNormals();

  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  bodyGroup.add(bodyMesh);

  // Sculpted chest crest / keel
  const keelGeo = new THREE.ConeGeometry(0.35, 1.6, 4);
  keelGeo.rotateX(Math.PI / 2);
  keelGeo.scale(0.3, 0.4, 1.0);
  const keelMesh = new THREE.Mesh(keelGeo, secondaryFeatherMaterial);
  keelMesh.position.set(0, -0.35, 0.3);
  bodyGroup.add(keelMesh);

  // -------------------------------------------------------------
  // 2. HEAD, CURVED BEAK & EMBER EYES
  // -------------------------------------------------------------
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.55, 1.55);
  bodyGroup.add(headGroup);

  // Head skull
  const headGeo = new THREE.SphereGeometry(0.32, 16, 14);
  headGeo.scale(0.85, 1.0, 1.35);
  const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
  headMesh.castShadow = true;
  headGroup.add(headMesh);

  // Curved raptor beak (upper)
  const beakUpperGeo = new THREE.ConeGeometry(0.14, 0.7, 8);
  beakUpperGeo.rotateX(Math.PI / 2 + 0.28);
  beakUpperGeo.scale(0.7, 1.0, 1.0);
  const beakUpper = new THREE.Mesh(beakUpperGeo, beakMaterial);
  beakUpper.position.set(0, -0.06, 0.48);
  beakUpper.castShadow = true;
  headGroup.add(beakUpper);

  // Lower beak
  const beakLowerGeo = new THREE.ConeGeometry(0.1, 0.45, 6);
  beakLowerGeo.rotateX(Math.PI / 2 + 0.15);
  const beakLower = new THREE.Mesh(beakLowerGeo, beakMaterial);
  beakLower.position.set(0, -0.16, 0.38);
  headGroup.add(beakLower);

  // Ember Eyes (Left and Right)
  const eyeGeo = new THREE.SphereGeometry(0.065, 12, 10);
  const eyeGlowGeo = new THREE.SphereGeometry(0.09, 10, 8);

  const eyeLeft = new THREE.Mesh(eyeGeo, eyeMaterial);
  eyeLeft.position.set(0.22, 0.08, 0.22);
  const eyeLeftGlow = new THREE.Mesh(eyeGlowGeo, eyeGlowMaterial);
  eyeLeft.add(eyeLeftGlow);
  headGroup.add(eyeLeft);

  const eyeRight = new THREE.Mesh(eyeGeo, eyeMaterial);
  eyeRight.position.set(-0.22, 0.08, 0.22);
  const eyeRightGlow = new THREE.Mesh(eyeGlowGeo, eyeGlowMaterial);
  eyeRight.add(eyeRightGlow);
  headGroup.add(eyeRight);

  // Head Plumes / Crest (5 layered swept feathers)
  const crestGroup = new THREE.Group();
  crestGroup.position.set(0, 0.22, -0.05);
  headGroup.add(crestGroup);

  const crestFeathers: THREE.Mesh[] = [];
  for (let c = 0; c < 5; c++) {
    const angleOffset = (c - 2) * 0.12;
    const length = 0.75 + (2 - Math.abs(c - 2)) * 0.25;
    const cGeo = createFeatherGeometry(length, 0.1, 0.2);
    const cMesh = new THREE.Mesh(cGeo, crestFeatherMaterial);
    cMesh.rotation.set(-0.45 - (c % 2) * 0.15, angleOffset, angleOffset * 0.5);
    cMesh.position.set(angleOffset * 0.25, 0.05, -c * 0.08);
    cMesh.castShadow = true;
    crestGroup.add(cMesh);
    crestFeathers.push(cMesh);
  }

  // -------------------------------------------------------------
  // 3. ARTICULATED MULTI-JOINT WINGS (LEFT & RIGHT)
  // -------------------------------------------------------------
  // Helper to build tapered, curved blade feather geometry
  function createFeatherGeometry(length: number, width: number, curve: number): THREE.BufferGeometry {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(width * 0.8, length * 0.45, width * 0.35, length);
    shape.quadraticCurveTo(0, length * 1.05, -width * 0.35, length);
    shape.quadraticCurveTo(-width * 0.8, length * 0.45, 0, 0);

    const geo = new THREE.ShapeGeometry(shape, 8);
    // Add longitudinal curvature and dihedral spine
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const ratio = Math.max(0, Math.min(1.2, y / length));
      // Arch the feather backward
      pos.setZ(i, -Math.pow(ratio, 1.8) * curve);
    }
    geo.computeVertexNormals();
    return geo;
  }

  interface WingRig {
    side: number; // 1 for right, -1 for left
    shoulder: THREE.Group;
    elbow: THREE.Group;
    wrist: THREE.Group;
    primaryFeathers: THREE.Mesh[];
    secondaryFeathers: THREE.Mesh[];
    covertFeathers: THREE.Mesh[];
  }

  function buildWing(side: number): WingRig {
    const shoulder = new THREE.Group();
    shoulder.name = side === 1 ? 'RightShoulder' : 'LeftShoulder';
    shoulder.position.set(side * 0.35, 0.2, 0.6);
    bodyGroup.add(shoulder);

    // Shoulder bone mesh (muscular upper wing arm)
    const armUpperGeo = new THREE.CylinderGeometry(0.12, 0.09, 1.3, 8);
    armUpperGeo.rotateZ(side * Math.PI / 2.3);
    armUpperGeo.translate(side * 0.65, 0, 0);
    const armUpper = new THREE.Mesh(armUpperGeo, bodyMaterial);
    armUpper.castShadow = true;
    shoulder.add(armUpper);

    // Elbow joint
    const elbow = new THREE.Group();
    elbow.name = side === 1 ? 'RightElbow' : 'LeftElbow';
    elbow.position.set(side * 1.3, 0, -0.15);
    shoulder.add(elbow);

    // Forewing bone mesh
    const armMidGeo = new THREE.CylinderGeometry(0.09, 0.06, 1.5, 8);
    armMidGeo.rotateZ(side * Math.PI / 2.2);
    armMidGeo.translate(side * 0.75, 0, 0);
    const armMid = new THREE.Mesh(armMidGeo, bodyMaterial);
    armMid.castShadow = true;
    elbow.add(armMid);

    // Wrist joint (wingtip)
    const wrist = new THREE.Group();
    wrist.name = side === 1 ? 'RightWrist' : 'LeftWrist';
    wrist.position.set(side * 1.5, 0, -0.1);
    elbow.add(wrist);

    const primaryFeathers: THREE.Mesh[] = [];
    const secondaryFeathers: THREE.Mesh[] = [];
    const covertFeathers: THREE.Mesh[] = [];

    // --- COVERT FEATHERS (Covering upper arm, 7 layered blades) ---
    for (let i = 0; i < 7; i++) {
      const fGeo = createFeatherGeometry(0.95 + i * 0.08, 0.24, 0.15);
      const feather = new THREE.Mesh(fGeo, covertFeatherMaterial);
      feather.position.set(side * (0.2 + i * 0.15), 0.03, -0.05);
      feather.rotation.set(Math.PI / 2 - 0.2, side * (-0.15 - i * 0.04), side * (-0.4 - i * 0.08));
      feather.castShadow = true;
      shoulder.add(feather);
      covertFeathers.push(feather);
    }

    // --- SECONDARY FEATHERS (Forewing flight feathers, 10 sweeping blades) ---
    for (let i = 0; i < 10; i++) {
      const length = 1.45 + i * 0.08;
      const fGeo = createFeatherGeometry(length, 0.28, 0.25);
      const feather = new THREE.Mesh(fGeo, secondaryFeatherMaterial);
      feather.position.set(side * (0.1 + i * 0.14), 0.02, -0.08);
      feather.rotation.set(Math.PI / 2 - 0.25, side * (-0.2 - i * 0.05), side * (-0.5 - i * 0.07));
      feather.castShadow = true;
      elbow.add(feather);
      secondaryFeathers.push(feather);
    }

    // --- PRIMARY FEATHERS (Wingtip flight blades, 9 long tapered fingered feathers) ---
    for (let i = 0; i < 9; i++) {
      const length = 1.95 + (8 - i) * 0.12;
      const fGeo = createFeatherGeometry(length, 0.26, 0.35);
      const feather = new THREE.Mesh(fGeo, primaryFeatherMaterial);
      feather.position.set(side * (0.05 + i * 0.12), -0.01, -0.05);
      // Swept back and splayed outward
      feather.rotation.set(
        Math.PI / 2 - 0.3,
        side * (-0.3 - i * 0.09),
        side * (-0.7 - i * 0.08)
      );
      feather.castShadow = true;
      wrist.add(feather);
      primaryFeathers.push(feather);
    }

    return {
      side,
      shoulder,
      elbow,
      wrist,
      primaryFeathers,
      secondaryFeathers,
      covertFeathers,
    };
  }

  const rightWing = buildWing(1);
  const leftWing = buildWing(-1);

  // -------------------------------------------------------------
  // 4. FLOWING TAIL FEATHERS / DYNAMIC UNDULATING RIBBONS (7 PLUMES)
  // -------------------------------------------------------------
  const tailGroup = new THREE.Group();
  tailGroup.position.set(0, 0.08, -1.9);
  bodyGroup.add(tailGroup);

  interface TailPlume {
    mesh: THREE.Mesh;
    geo: THREE.PlaneGeometry;
    basePositions: Float32Array;
    length: number;
    spreadAngle: number;
    phaseOffset: number;
  }

  const tailPlumes: TailPlume[] = [];
  const numPlumes = 7;
  const tailMaterial = new THREE.MeshStandardMaterial({
    color: 0xE84B2C,
    roughness: 0.3,
    metalness: 0.8,
    emissive: 0x94270C,
    emissiveIntensity: 0.75,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95,
  });

  for (let t = 0; t < numPlumes; t++) {
    const spreadIndex = t - 3; // -3 to 3
    const length = 4.2 - Math.abs(spreadIndex) * 0.55; // Center plume longest (4.2 units!)
    const segments = 24;
    const planeGeo = new THREE.PlaneGeometry(0.24, length, 2, segments);
    planeGeo.translate(0, -length / 2, 0); // Origin at root
    planeGeo.rotateX(Math.PI / 2); // Lay flat extending backwards

    // Taper width toward the tip and save original vertex positions
    const posAttr = planeGeo.attributes.position;
    for (let v = 0; v < posAttr.count; v++) {
      const zDist = Math.max(0, -posAttr.getZ(v)); // Safe non-negative distance
      const ratio = Math.min(1.0, zDist / length);
      const taperFactor = 1.0 - Math.pow(ratio, 1.2) * 0.75;
      posAttr.setX(v, posAttr.getX(v) * taperFactor);
    }
    planeGeo.computeVertexNormals();

    const basePositions = new Float32Array(posAttr.array);
    const plumeMesh = new THREE.Mesh(planeGeo, tailMaterial);
    const spreadAngle = spreadIndex * 0.14;
    plumeMesh.rotation.set(0.12 + Math.abs(spreadIndex) * 0.04, spreadAngle, spreadIndex * 0.08);
    plumeMesh.position.set(spreadIndex * 0.1, -0.05, 0);
    plumeMesh.castShadow = true;
    tailGroup.add(plumeMesh);

    tailPlumes.push({
      mesh: plumeMesh,
      geo: planeGeo,
      basePositions,
      length,
      spreadAngle,
      phaseOffset: spreadIndex * 0.45,
    });
  }

  // -------------------------------------------------------------
  // 5. EMBER & LIGHT PARTICLES TRAIL
  // -------------------------------------------------------------
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities: { x: number; y: number; z: number; life: number; maxLife: number }[] = [];

  for (let p = 0; p < particleCount; p++) {
    particlePositions[p * 3] = (Math.random() - 0.5) * 2;
    particlePositions[p * 3 + 1] = (Math.random() - 0.5) * 2;
    particlePositions[p * 3 + 2] = -Math.random() * 8;
    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.4,
      y: (Math.random() - 0.5) * 0.4 + 0.1,
      z: -Math.random() * 1.5 - 0.5,
      life: Math.random() * 100,
      maxLife: 70 + Math.random() * 50,
    });
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xFFAA33,
    size: 0.14,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  particleSystem.frustumCulled = false;
  rootGroup.add(particleSystem);

  // -------------------------------------------------------------
  // KINEMATICS & UPDATE LOOP
  // -------------------------------------------------------------
  let flapTime = 0;
  let glidePhase = 0;
  let currentBank = 0;
  let currentPitch = 0;
  let currentYaw = 0;

  function update(delta: number, speed: number, scrollProgress: number, mouse: { x: number; y: number }) {
    // Dynamic flap frequency: Accelerates with speed, slows to majestic soaring when cruising
    const isAccelerating = Math.abs(speed) > 0.0008;
    const flapFrequency = 2.4 + Math.min(speed * 320, 7.5);
    const flapAmplitude = isAccelerating ? 0.65 : 0.22;

    flapTime += delta * flapFrequency;
    glidePhase += delta * 1.5;

    // Wing Flap Formula:
    // Flap cycle with aerodynamic phase offset from shoulder -> elbow -> wrist
    const shoulderAngle = Math.sin(flapTime) * flapAmplitude;
    const elbowAngle = Math.sin(flapTime - 0.35) * flapAmplitude * 0.75;
    const wristAngle = Math.sin(flapTime - 0.7) * flapAmplitude * 0.9;

    // Wing dihedral and forward sweep
    const sweepBack = 0.25 + Math.cos(flapTime * 0.5) * 0.08;

    // Right Wing
    rightWing.shoulder.rotation.z = shoulderAngle;
    rightWing.shoulder.rotation.y = -sweepBack;
    rightWing.elbow.rotation.z = -elbowAngle * 0.6;
    rightWing.wrist.rotation.z = -wristAngle * 0.5;
    rightWing.wrist.rotation.y = Math.cos(flapTime) * 0.15; // Feather twist

    // Left Wing (mirrored)
    leftWing.shoulder.rotation.z = -shoulderAngle;
    leftWing.shoulder.rotation.y = sweepBack;
    leftWing.elbow.rotation.z = elbowAngle * 0.6;
    leftWing.wrist.rotation.z = wristAngle * 0.5;
    leftWing.wrist.rotation.y = -Math.cos(flapTime) * 0.15;

    // Wing unfolding during Hero Awakening (scrollProgress 0 -> 0.1)
    if (scrollProgress < 0.15) {
      const unfoldProgress = Math.min(1.0, scrollProgress / 0.12);
      const foldFactor = 1.0 - unfoldProgress;
      rightWing.shoulder.rotation.z += foldFactor * 0.5;
      rightWing.shoulder.rotation.y -= foldFactor * 0.8;
      leftWing.shoulder.rotation.z -= foldFactor * 0.5;
      leftWing.shoulder.rotation.y += foldFactor * 0.8;
    }

    // Dynamic Banking & Pitch from flight direction & desktop mouse parallax
    const targetBank = mouse.x * 0.35 + (rightWing.shoulder.rotation.z - leftWing.shoulder.rotation.z) * 0.1;
    const targetPitch = -mouse.y * 0.22 + (isAccelerating ? 0.18 : 0.0);
    const targetYaw = mouse.x * 0.25;

    currentBank += (targetBank - currentBank) * (delta * 4.5);
    currentPitch += (targetPitch - currentPitch) * (delta * 4.5);
    currentYaw += (targetYaw - currentYaw) * (delta * 4.5);

    flightBankGroup.rotation.z = currentBank;
    flightBankGroup.rotation.x = currentPitch;
    flightBankGroup.rotation.y = currentYaw;

    // Head reacts subtly to mouse look
    headGroup.rotation.y = mouse.x * 0.35;
    headGroup.rotation.x = -mouse.y * 0.25;

    // Animate Head Crest Feathers
    crestFeathers.forEach((cMesh, idx) => {
      cMesh.rotation.x = -0.45 - Math.sin(flapTime * 0.8 + idx) * 0.08;
    });

    // Animate Tail Ribbons with trailing sine waves & aerodynamic flutter
    const tailPositionsArr = tailPlumes;
    for (let t = 0; t < tailPositionsArr.length; t++) {
      const plume = tailPositionsArr[t];
      const posAttr = plume.geo.attributes.position;
      const basePos = plume.basePositions;
      const count = posAttr.count;

      for (let v = 0; v < count; v++) {
        const v3Idx = v * 3;
        const origX = basePos[v3Idx];
        const origY = basePos[v3Idx + 1];
        const origZ = basePos[v3Idx + 2];

        // Normalized distance along tail feather
        const zRatio = Math.min(1.0, Math.max(0, Math.abs(origZ) / plume.length));
        const flexAmp = Math.pow(zRatio, 1.6);

        // Undulating wave equation
        const waveX = Math.sin(glidePhase * 3.5 - origZ * 0.9 + plume.phaseOffset) * 0.28 * flexAmp;
        const waveY = Math.cos(glidePhase * 2.8 - origZ * 0.8 + plume.phaseOffset) * 0.35 * flexAmp;

        posAttr.setX(v, origX + waveX);
        posAttr.setY(v, origY + waveY - currentPitch * zRatio * 0.8);
      }
      posAttr.needsUpdate = true;
    }

    // Eye Ember Breathing Pulse
    const eyeIntensity = 0.85 + Math.sin(glidePhase * 4) * 0.25;
    eyeMaterial.color.setRGB(1.0 * eyeIntensity, 0.27 * eyeIntensity, 0.0);
    eyeGlowMaterial.opacity = 0.5 + Math.sin(glidePhase * 4) * 0.3;

    // Primary Feather Emissive Shimmer
    const featherGlow = 0.5 + Math.abs(Math.sin(flapTime * 0.5)) * 0.45;
    primaryFeatherMaterial.emissiveIntensity = featherGlow;

    // Update Particle System (Trailing Embers behind wingtips & tail)
    const pPos = particleGeo.attributes.position;
    for (let p = 0; p < particleCount; p++) {
      const vel = particleVelocities[p];
      vel.life += delta * 60;

      if (vel.life >= vel.maxLife) {
        // Respawn particle at tail or wingtips
        vel.life = 0;
        const emitterChoice = Math.random();
        if (emitterChoice < 0.4) {
          // Tail dock
          pPos.setXYZ(p, (Math.random() - 0.5) * 0.3, -0.1, -1.8);
        } else if (emitterChoice < 0.7) {
          // Right wingtip
          pPos.setXYZ(p, 2.8 + (Math.random() - 0.5) * 0.4, rightWing.wrist.position.y, -0.6);
        } else {
          // Left wingtip
          pPos.setXYZ(p, -2.8 + (Math.random() - 0.5) * 0.4, leftWing.wrist.position.y, -0.6);
        }
        vel.x = (Math.random() - 0.5) * 0.25;
        vel.y = (Math.random() - 0.5) * 0.25;
        vel.z = -Math.random() * 2.5 - 1.2;
      } else {
        const px = pPos.getX(p) + vel.x * delta * 40;
        const py = pPos.getY(p) + vel.y * delta * 40;
        const pz = pPos.getZ(p) + vel.z * delta * 40;
        pPos.setXYZ(p, px, py, pz);
      }
    }
    pPos.needsUpdate = true;
  }

  function dispose() {
    bodyGeo.dispose();
    keelGeo.dispose();
    headGeo.dispose();
    beakUpperGeo.dispose();
    beakLowerGeo.dispose();
    eyeGeo.dispose();
    eyeGlowGeo.dispose();
    particleGeo.dispose();
    bodyMaterial.dispose();
    beakMaterial.dispose();
    eyeMaterial.dispose();
    eyeGlowMaterial.dispose();
    covertFeatherMaterial.dispose();
    secondaryFeatherMaterial.dispose();
    primaryFeatherMaterial.dispose();
    crestFeatherMaterial.dispose();
    tailMaterial.dispose();
    particleMat.dispose();

    tailPlumes.forEach(t => t.geo.dispose());
  }

  return {
    group: rootGroup,
    update,
    dispose,
  };
}
