import * as THREE from 'three';
import type { PhoenixMaterialSet, PhoenixMotionUniforms } from './PhoenixMaterials';

export interface WingHierarchy {
  side: number;
  shoulder: THREE.Group;
  elbow: THREE.Group;
  wrist: THREE.Group;
}

/** A place a flame tongue can be born. `size` is in model units, `kind` tints it. */
export interface FlameSite {
  parent: THREE.Object3D;
  point: THREE.Vector3;
  size: number;
  kind: number;
  seed: number;
}

export interface PhoenixModelInstance {
  rootGroup: THREE.Group;
  flightGroup: THREE.Group;
  bodyGroup: THREE.Group;
  bodyMesh: THREE.Mesh;
  headGroup: THREE.Group;
  tailGroup: THREE.Group;
  legs: THREE.Group[];
  leftWing: WingHierarchy;
  rightWing: WingHierarchy;
  motion: PhoenixMotionUniforms;
  flameSites: FlameSite[];
  getWingtipPositions: () => { left: THREE.Vector3; right: THREE.Vector3 };
  getEmitterPositions: () => THREE.Vector3[];
  getFlamePositions: () => THREE.Vector3[];
  dispose: () => void;
}

interface FeatherPlacement {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  length: number;
  width: number;
  tint: string;
  burn?: boolean;
  flutter?: number;
  seed: number;
  curve?: number;
  flow?: number;
  flameSize?: number;
  roll?: number;
}

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);
const X_AXIS = new THREE.Vector3(1, 0, 0);
const BODY_PROFILE = [
  [-1.18, 0.05, 0.06, -0.04],
  [-1.02, 0.12, 0.13, -0.02],
  [-0.78, 0.22, 0.21, 0.0],
  [-0.48, 0.31, 0.28, 0.02],
  [-0.12, 0.38, 0.33, 0.035],
  [0.2, 0.36, 0.32, 0.05],
  [0.48, 0.29, 0.26, 0.1],
  [0.72, 0.21, 0.19, 0.18],
  [0.92, 0.16, 0.15, 0.26],
  [1.15, 0.14, 0.13, 0.33],
  [1.35, 0.12, 0.12, 0.35],
  [1.49, 0.06, 0.07, 0.35],
] as const;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(a: number, b: number, value: number) {
  const t = clamp01((value - a) / (b - a));
  return t * t * (3 - 2 * t);
}

function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

function bodyProfileAt(y: number) {
  const clampedY = THREE.MathUtils.clamp(y, BODY_PROFILE[0][0], BODY_PROFILE[BODY_PROFILE.length - 1][0]);
  let index = 0;
  while (index < BODY_PROFILE.length - 2 && clampedY > BODY_PROFILE[index + 1][0]) index++;
  const a = BODY_PROFILE[index];
  const b = BODY_PROFILE[index + 1];
  const t = (clampedY - a[0]) / (b[0] - a[0]);
  const p0 = BODY_PROFILE[Math.max(0, index - 1)];
  const p3 = BODY_PROFILE[Math.min(BODY_PROFILE.length - 1, index + 2)];
  return [
    catmull(p0[1], a[1], b[1], p3[1], t),
    catmull(p0[2], a[2], b[2], p3[2], t),
    catmull(p0[3], a[3], b[3], p3[3], t),
  ];
}

function createBodyGeometry(isMobile: boolean) {
  const ringCount = isMobile ? 40 : 60;
  const radialCount = isMobile ? 32 : 48;
  const minY = BODY_PROFILE[0][0];
  const maxY = BODY_PROFILE[BODY_PROFILE.length - 1][0];
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const deep = new THREE.Color('#33070c');
  const crimson = new THREE.Color('#6c0f16');
  const scarlet = new THREE.Color('#a51a1d');
  const ember = new THREE.Color('#d34622');
  const color = new THREE.Color();

  for (let ring = 0; ring <= ringCount; ring++) {
    const v = ring / ringCount;
    const y = THREE.MathUtils.lerp(minY, maxY, v);
    const [rx, rz, centerZ] = bodyProfileAt(y);
    for (let segment = 0; segment <= radialCount; segment++) {
      const u = segment / radialCount;
      const angle = u * Math.PI * 2;
      const sinAngle = Math.sin(angle);
      const x = rx * Math.cos(angle);
      const z = centerZ + rz * sinAngle;
      positions.push(x, y, z);
      uvs.push(u, v);

      const front = Math.pow(Math.max(0, sinAngle), 1.2);
      const breast = front * Math.exp(-Math.pow((y + 0.05) / 0.7, 2));
      const neck = smoothstep(0.58, 1.2, y);
      color.copy(deep).lerp(crimson, 0.34 + front * 0.3 + neck * 0.08);
      color.lerp(scarlet, breast * 0.4);
      color.lerp(ember, breast * 0.1 * smoothstep(0.1, 0.7, y));
      colors.push(color.r, color.g, color.b);
    }
  }

  for (let ring = 0; ring < ringCount; ring++) {
    for (let segment = 0; segment < radialCount; segment++) {
      const a = ring * (radialCount + 1) + segment;
      const b = a + radialCount + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

/**
 * A single vane shared by every feather. The outline is a smooth leaf with a
 * soft shoulder and a tapered, rounded tip, gently cambered across the vane
 * and swept back along its length so it never reads as a flat card.
 */
function createFeatherGeometry(isMobile: boolean) {
  const alongCount = isMobile ? 16 : 24;
  const acrossCount = 6;
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const base = new THREE.Color('#3a0910');
  const middle = new THREE.Color('#7d1219');
  const tip = new THREE.Color('#d03626');
  const color = new THREE.Color();

  for (let along = 0; along <= alongCount; along++) {
    const v = along / alongCount;
    const profile = Math.pow(
      Math.sin(Math.PI * Math.min(1, v * 0.84 + 0.05)),
      0.56,
    );
    // Elliptical tip cap: the vane rounds off instead of ending in a razor point.
    const tipRound = v > 0.86
      ? Math.sqrt(Math.max(0, 1 - Math.pow((v - 0.86) / 0.14, 2)))
      : 1;
    const envelope = profile * tipRound * (1.04 - 0.16 * v);
    for (let across = 0; across <= acrossCount; across++) {
      const u = across / acrossCount;
      const centered = u - 0.5;
      const vane = centered < 0 ? 0.94 : 1.02;
      const x = centered * 0.29 * envelope * vane;
      const camber = 0.032 * Math.sin(Math.PI * u) * envelope;
      const sweep = -0.03 * v * v;
      const z = camber + sweep + 0.008 * Math.sin(v * Math.PI * 2) * v;
      positions.push(x, v, z);
      uvs.push(u, v);
      color.copy(base).lerp(middle, smoothstep(0.0, 0.62, v));
      color.lerp(tip, smoothstep(0.66, 1.0, v) * 0.7);
      colors.push(color.r, color.g, color.b);
    }
  }

  for (let along = 0; along < alongCount; along++) {
    for (let across = 0; across < acrossCount; across++) {
      const a = along * (acrossCount + 1) + across;
      const b = a + acrossCount + 1;
      indices.push(a, a + 1, b, b, a + 1, b + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function createTaperedTubeGeometry(points: THREE.Vector3[], radii: number[], radialSegments = 10) {
  const curve = new THREE.CatmullRomCurve3(points);
  const tubularSegments = Math.max(12, points.length * 8);
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let ring = 0; ring <= tubularSegments; ring++) {
    const t = ring / tubularSegments;
    const scaled = t * (radii.length - 1);
    const lower = Math.floor(scaled);
    const upper = Math.min(radii.length - 1, lower + 1);
    const radius = THREE.MathUtils.lerp(radii[lower], radii[upper], scaled - lower);
    const center = curve.getPointAt(t);
    for (let segment = 0; segment <= radialSegments; segment++) {
      const angle = (segment / radialSegments) * Math.PI * 2;
      const normal = frames.normals[ring];
      const binormal = frames.binormals[ring];
      const x = center.x + radius * (Math.cos(angle) * normal.x + Math.sin(angle) * binormal.x);
      const y = center.y + radius * (Math.cos(angle) * normal.y + Math.sin(angle) * binormal.y);
      const z = center.z + radius * (Math.cos(angle) * normal.z + Math.sin(angle) * binormal.z);
      positions.push(x, y, z);
      uvs.push(segment / radialSegments, t);
    }
  }
  for (let ring = 0; ring < tubularSegments; ring++) {
    for (let segment = 0; segment < radialSegments; segment++) {
      const a = ring * (radialSegments + 1) + segment;
      const b = a + radialSegments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function facingQuaternion(direction: THREE.Vector3) {
  const axis = direction.clone().normalize();
  const front = Z_AXIS.clone().addScaledVector(axis, -Z_AXIS.dot(axis));
  if (front.lengthSq() < 0.025) front.copy(Y_AXIS).addScaledVector(axis, -Y_AXIS.dot(axis));
  front.normalize();
  const right = new THREE.Vector3().crossVectors(axis, front).normalize();
  const basis = new THREE.Matrix4().makeBasis(right, axis, front);
  return new THREE.Quaternion().setFromRotationMatrix(basis);
}

function makePlacement(
  x: number,
  y: number,
  z: number,
  direction: THREE.Vector3,
  length: number,
  width: number,
  tint: string,
  seed: number,
  options: Partial<Pick<FeatherPlacement, 'burn' | 'flutter' | 'curve' | 'flow' | 'flameSize' | 'roll'>> = {},
): FeatherPlacement {
  return {
    position: new THREE.Vector3(x, y, z),
    direction: direction.clone().normalize(),
    length,
    width,
    tint,
    seed,
    burn: options.burn ?? false,
    flutter: options.flutter ?? 0.035,
    curve: options.curve ?? 0,
    flow: options.flow ?? 0.35,
    flameSize: options.flameSize,
    // A deterministic roll breaks the "row of identical cards" flatness.
    roll: options.roll ?? (Math.sin(seed * 91.7) * 0.5),
  };
}

function addBatch(
  parent: THREE.Group,
  placements: FeatherPlacement[],
  source: THREE.BufferGeometry,
  material: THREE.MeshPhysicalMaterial,
  isMobile: boolean,
  geometries: Set<THREE.BufferGeometry>,
  flameSites: FlameSite[],
) {
  void isMobile;
  if (placements.length === 0) return;

  const sourcePosition = source.getAttribute('position') as THREE.BufferAttribute;
  const sourceNormal = source.getAttribute('normal') as THREE.BufferAttribute;
  const sourceColor = source.getAttribute('color') as THREE.BufferAttribute;
  const sourceUv = source.getAttribute('uv') as THREE.BufferAttribute;
  const sourceIndex = source.getIndex();
  const vertexCount = sourcePosition.count;
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const axes: number[] = [];
  const perps: number[] = [];
  const seeds: number[] = [];
  const flutters: number[] = [];
  const burns: number[] = [];
  const flows: number[] = [];
  const indices: number[] = [];
  const localPos = new THREE.Vector3();
  const localNormal = new THREE.Vector3();
  const axis = new THREE.Vector3();
  const perp = new THREE.Vector3();
  const tint = new THREE.Color();
  const matrix = new THREE.Matrix4();
  const normalMatrix = new THREE.Matrix3();
  const quaternion = new THREE.Quaternion();
  const rollQuaternion = new THREE.Quaternion();
  const temporary = new THREE.Object3D();

  placements.forEach((placement) => {
    quaternion.copy(facingQuaternion(placement.direction));
    rollQuaternion.setFromAxisAngle(Y_AXIS, placement.roll ?? 0);
    quaternion.multiply(rollQuaternion);
    temporary.position.copy(placement.position);
    temporary.quaternion.copy(quaternion);
    temporary.scale.set(placement.width / 0.29, placement.length, 1);
    temporary.updateMatrix();
    matrix.copy(temporary.matrix);
    normalMatrix.getNormalMatrix(matrix);
    tint.set(placement.tint);
    axis.copy(Y_AXIS).applyQuaternion(quaternion).normalize();
    perp.copy(X_AXIS).applyQuaternion(quaternion).normalize();

    const vertexOffset = positions.length / 3;
    for (let vertex = 0; vertex < vertexCount; vertex++) {
      const u = sourceUv.getX(vertex);
      const v = sourceUv.getY(vertex);
      localPos.set(sourcePosition.getX(vertex) + (placement.curve ?? 0) * v * v, sourcePosition.getY(vertex), sourcePosition.getZ(vertex));
      localPos.applyMatrix4(matrix);
      localNormal.set(sourceNormal.getX(vertex), sourceNormal.getY(vertex), sourceNormal.getZ(vertex))
        .applyMatrix3(normalMatrix)
        .normalize();
      positions.push(localPos.x, localPos.y, localPos.z);
      normals.push(localNormal.x, localNormal.y, localNormal.z);
      colors.push(
        THREE.MathUtils.lerp(sourceColor.getX(vertex), tint.r, 0.16),
        THREE.MathUtils.lerp(sourceColor.getY(vertex), tint.g, 0.13),
        THREE.MathUtils.lerp(sourceColor.getZ(vertex), tint.b, 0.11),
      );
      uvs.push(u, v);
      axes.push(axis.x, axis.y, axis.z);
      perps.push(perp.x, perp.y, perp.z);
      seeds.push(placement.seed);
      flutters.push(placement.flutter ?? 0.035);
      burns.push(placement.burn ? 1 : 0);
      flows.push(placement.flow ?? 0.35);
    }
    if (sourceIndex) {
      for (let index = 0; index < sourceIndex.count; index++) indices.push(sourceIndex.getX(index) + vertexOffset);
    } else {
      for (let index = 0; index < vertexCount; index++) indices.push(index + vertexOffset);
    }

    if (placement.burn) {
      flameSites.push({
        parent,
        point: placement.position.clone().addScaledVector(placement.direction, placement.length * 0.94),
        size: placement.flameSize ?? Math.max(0.34, placement.width * 2.6),
        kind: 0,
        seed: placement.seed,
      });
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('aFeatherAxis', new THREE.Float32BufferAttribute(axes, 3));
  geometry.setAttribute('aFeatherPerp', new THREE.Float32BufferAttribute(perps, 3));
  geometry.setAttribute('aFeatherSeed', new THREE.Float32BufferAttribute(seeds, 1));
  geometry.setAttribute('aFlutter', new THREE.Float32BufferAttribute(flutters, 1));
  geometry.setAttribute('aBurn', new THREE.Float32BufferAttribute(burns, 1));
  geometry.setAttribute('aFlow', new THREE.Float32BufferAttribute(flows, 1));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  geometry.name = 'BatchedCurvedFeatherLayer';

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'LayeredPhoenixFeathers';
  mesh.frustumCulled = false;
  parent.add(mesh);
  geometries.add(geometry);
}

function createSphereMesh(
  parent: THREE.Group,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  position: THREE.Vector3,
  scale: THREE.Vector3,
  geometries: Set<THREE.BufferGeometry>,
  name: string,
) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.copy(position);
  mesh.scale.copy(scale);
  parent.add(mesh);
  geometries.add(geometry);
  return mesh;
}

function addTube(
  parent: THREE.Group,
  points: THREE.Vector3[],
  radii: number[],
  material: THREE.Material,
  geometries: Set<THREE.BufferGeometry>,
  name: string,
) {
  const geometry = createTaperedTubeGeometry(points, radii);
  geometry.name = name + 'Geometry';
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  parent.add(mesh);
  geometries.add(geometry);
  return mesh;
}

function surfaceDepth(x: number, y: number) {
  const [rx, rz, centerZ] = bodyProfileAt(y);
  const edge = Math.min(0.98, Math.abs(x) / Math.max(0.01, rx));
  return centerZ + rz * Math.sqrt(Math.max(0.03, 1 - edge * edge));
}

function backSurfaceDepth(x: number, y: number) {
  const [rx, rz, centerZ] = bodyProfileAt(y);
  const edge = Math.min(0.98, Math.abs(x) / Math.max(0.01, rx));
  return centerZ - rz * Math.sqrt(Math.max(0.03, 1 - edge * edge));
}

/** A tuft of short contour feathers used to soften joints and body seams. */
function addTuft(
  placements: FeatherPlacement[],
  center: THREE.Vector3,
  direction: THREE.Vector3,
  count: number,
  length: number,
  width: number,
  spread: number,
  seedBase: number,
  tintA: string,
  tintB: string,
  burn = false,
) {
  const basis = new THREE.Matrix4().lookAt(new THREE.Vector3(), direction.clone().normalize(), Y_AXIS);
  const axisA = new THREE.Vector3(1, 0, 0).applyMatrix4(basis);
  const axisB = new THREE.Vector3(0, 1, 0).applyMatrix4(basis);
  for (let index = 0; index < count; index++) {
    const angle = (index / count) * Math.PI * 2 + seedBase;
    const offset = axisA.clone().multiplyScalar(Math.cos(angle) * spread)
      .add(axisB.clone().multiplyScalar(Math.sin(angle) * spread));
    const dir = direction.clone().add(offset.clone().multiplyScalar(0.9)).normalize();
    placements.push(makePlacement(
      center.x + offset.x,
      center.y + offset.y,
      center.z + offset.z,
      dir,
      length * (0.86 + ((index * 0.37) % 0.28)),
      width,
      index % 2 ? tintA : tintB,
      (seedBase + index * 0.137) % 1,
      { flutter: 0.03, flow: 0.25, burn: burn && index % 3 === 0, curve: (index % 2 ? 1 : -1) * 0.02 },
    ));
  }
}

export function buildPhoenixModel(materials: PhoenixMaterialSet, isMobile = false): PhoenixModelInstance {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'ArenovaPhoenixRoot';
  const flightGroup = new THREE.Group();
  flightGroup.name = 'PhoenixFlightRig';
  rootGroup.add(flightGroup);
  const bodyGroup = new THREE.Group();
  bodyGroup.name = 'PhoenixAnatomy';
  flightGroup.add(bodyGroup);

  const geometries = new Set<THREE.BufferGeometry>();
  const flameSites: FlameSite[] = [];
  const legs: THREE.Group[] = [];
  const featherSource = createFeatherGeometry(isMobile);
  geometries.add(featherSource);

  const bodyGeo = createBodyGeometry(isMobile);
  geometries.add(bodyGeo);
  const bodyMesh = new THREE.Mesh(bodyGeo, materials.sculpture);
  bodyMesh.name = 'ContinuousBreastNeckAndAbdomen';
  bodyGroup.add(bodyMesh);

  // ---------------------------------------------------------------
  // HEAD: elegant swept skull, hooked beak, ember eyes, flame crest.
  // ---------------------------------------------------------------
  const headGroup = new THREE.Group();
  headGroup.name = 'PhoenixHeadAndCrestRig';
  headGroup.position.set(0, 1.3, 0.29);
  bodyGroup.add(headGroup);

  const skullGeo = new THREE.SphereGeometry(1, isMobile ? 24 : 40, isMobile ? 18 : 30);
  const skull = createSphereMesh(
    headGroup,
    skullGeo,
    materials.head,
    new THREE.Vector3(0, 0.04, 0.0),
    new THREE.Vector3(0.26, 0.215, 0.31),
    geometries,
    'SculptedAvianHead',
  );
  skull.rotation.x = -0.07;

  // Forehead wedge: blends the crown into the beak so the profile is a bird's,
  // not a sphere with parts stuck on.
  createSphereMesh(
    headGroup,
    new THREE.SphereGeometry(1, 18, 14),
    materials.head,
    new THREE.Vector3(0, 0.055, 0.2),
    new THREE.Vector3(0.165, 0.105, 0.13),
    geometries,
    'ForeheadCrown',
  );

  // A feathered nape cushion smooths the neck-to-skull transition.
  createSphereMesh(
    headGroup,
    new THREE.SphereGeometry(1, 18, 14),
    materials.wingBone,
    new THREE.Vector3(0, -0.07, -0.12),
    new THREE.Vector3(0.19, 0.19, 0.2),
    geometries,
    'NapeCushion',
  );

  const upperBeakPoints = [
    new THREE.Vector3(0, -0.005, 0.235),
    new THREE.Vector3(0, -0.04, 0.36),
    new THREE.Vector3(0, -0.075, 0.46),
    new THREE.Vector3(0, -0.15, 0.485),
    new THREE.Vector3(0, -0.235, 0.435),
    new THREE.Vector3(0, -0.262, 0.398),
  ];
  addTube(headGroup, upperBeakPoints, [0.092, 0.078, 0.058, 0.036, 0.014, 0.002], materials.beak, geometries, 'HookedPhoenixBeak');
  createSphereMesh(
    headGroup,
    new THREE.SphereGeometry(1, 16, 12),
    materials.beak,
    new THREE.Vector3(0, -0.012, 0.235),
    new THREE.Vector3(0.078, 0.06, 0.055),
    geometries,
    'BeakCere',
  );
  addTube(
    headGroup,
    [new THREE.Vector3(0, -0.1, 0.235), new THREE.Vector3(0, -0.115, 0.33), new THREE.Vector3(0, -0.135, 0.41)],
    [0.052, 0.036, 0.01],
    materials.beak,
    geometries,
    'LowerMandible',
  );

  for (const side of [-1, 1]) {
    const socket = createSphereMesh(
      headGroup,
      new THREE.SphereGeometry(1, 18, 14),
      materials.eyeSocket,
      new THREE.Vector3(side * 0.15, 0.06, 0.215),
      new THREE.Vector3(0.058, 0.046, 0.026),
      geometries,
      'EyeSocket',
    );
    socket.rotation.y = side * 0.5;
    const iris = createSphereMesh(
      headGroup,
      new THREE.SphereGeometry(1, 16, 14),
      materials.eye,
      new THREE.Vector3(side * 0.157, 0.06, 0.232),
      new THREE.Vector3(0.025, 0.026, 0.014),
      geometries,
      'LuminousAmberEye',
    );
    iris.rotation.y = side * 0.5;
    createSphereMesh(
      headGroup,
      new THREE.SphereGeometry(1, 12, 10),
      materials.eyeSocket,
      new THREE.Vector3(side * 0.161, 0.06, 0.242),
      new THREE.Vector3(0.009, 0.012, 0.006),
      geometries,
      'AmberPupil',
    );
    // Brow sweep: a ridge that flows back into the crest.
    addTube(
      headGroup,
      [
        new THREE.Vector3(side * 0.075, 0.107, 0.237),
        new THREE.Vector3(side * 0.165, 0.138, 0.205),
        new THREE.Vector3(side * 0.218, 0.112, 0.115),
      ],
      [0.034, 0.031, 0.01],
      materials.head,
      geometries,
      'PhoenixBrowRidge',
    );
  }

  const headFeathers: FeatherPlacement[] = [];

  // Crest: long, curved flame-feathers sweeping off the crown.
  const crestCount = isMobile ? 6 : 8;
  for (let index = 0; index < crestCount; index++) {
    const fraction = index / (crestCount - 1);
    const spread = (fraction - 0.5) * 2;
    const direction = new THREE.Vector3(spread * 0.36, 0.52 - Math.abs(spread) * 0.14, -0.88 - Math.abs(spread) * 0.08).normalize();
    const centrality = 1 - Math.abs(spread);
    headFeathers.push(makePlacement(
      spread * 0.1, 0.15 - Math.abs(spread) * 0.02, 0.005 - Math.abs(spread) * 0.03,
      direction,
      1.08 + centrality * 0.42,
      0.15 + centrality * 0.03,
      index % 2 ? '#5a0d16' : '#7a1218',
      0.17 + index * 0.109,
      {
        burn: Math.abs(index - (crestCount - 1) / 2) <= 1.8,
        flutter: 0.075,
        flow: 1.0,
        curve: -0.1 - Math.abs(spread) * 0.04,
        flameSize: 0.56 + centrality * 0.24,
      },
    ));
  }

  // Feather hood: vanes laid over the skull so the head reads as plumage,
  // leaving only the face plate and eyes bare.
  const hoodRings = isMobile ? 3 : 4;
  for (let ring = 0; ring < hoodRings; ring++) {
    const polar = 0.34 + (ring / Math.max(1, hoodRings - 1)) * 1.8;
    const count = 6 + ring * 2;
    for (let index = 0; index < count; index++) {
      const lon = (index / count) * Math.PI * 2 + ring * 0.38;
      const nx = Math.sin(polar) * Math.cos(lon);
      const ny = Math.cos(polar);
      const nz = Math.sin(polar) * Math.sin(lon);
      if (nz > 0.42 && Math.abs(nx) < 0.74) continue;
      if (ny < -0.3 && nz > 0.15) continue;
      const direction = new THREE.Vector3(nx * 0.3, ny * 0.18 - 0.4, -0.92).normalize();
      headFeathers.push(makePlacement(
        0.255 * nx,
        0.04 + 0.21 * ny,
        0.3 * nz,
        direction,
        0.24 + ((ring + index) % 3) * 0.022,
        0.095 + (ring % 2) * 0.012,
        ring % 2 ? '#4a0b12' : '#631017',
        (0.07 + ring * 0.17 + index * 0.093) % 1,
        { flutter: 0.012, flow: 0.25, curve: (index % 2 ? 1 : -1) * 0.012 },
      ));
    }
  }

  // Crown and cheek coverts: many small vanes so the head silhouette flows.
  for (let row = 0; row < (isMobile ? 2 : 3); row++) {
    for (let index = 0; index < 5; index++) {
      const spread = index / 4 - 0.5;
      headFeathers.push(makePlacement(
        spread * 0.24, 0.115 - row * 0.075, 0.18 - row * 0.055,
        new THREE.Vector3(spread * 0.5, -0.55 - row * 0.12, -0.55),
        0.24 + row * 0.02, 0.1,
        row % 2 ? '#5c0f16' : '#7d1219',
        (0.13 + index * 0.11 + row * 0.23) % 1,
        { flutter: 0.02, flow: 0.3 },
      ));
    }
  }

  // Cheek fan under each eye, sweeping back toward the nape.
  for (const side of [-1, 1]) {
    for (let row = 0; row < 2; row++) {
      for (let index = 0; index < 3; index++) {
        headFeathers.push(makePlacement(
          side * (0.14 + row * 0.035), -0.03 - row * 0.075, 0.16 - index * 0.045,
          new THREE.Vector3(side * (0.3 + row * 0.1), -0.72, -0.34 - index * 0.1),
          0.3 + index * 0.02, 0.105,
          row ? '#4d0c12' : '#681018',
          (0.37 + side * 0.1 + row * 0.07 + index * 0.11) % 1,
          { flutter: 0.018, flow: 0.35, curve: -side * 0.015 },
        ));
      }
    }
  }
  addBatch(headGroup, headFeathers, featherSource, materials.feather, isMobile, geometries, flameSites);

  // ---------------------------------------------------------------
  // BODY PLUMAGE: overlapping rows, wide vanes, no gaps to the eye.
  // ---------------------------------------------------------------
  const chestFeathers: FeatherPlacement[] = [];
  const chestRows = isMobile
    ? [{ y: 0.42, count: 5 }, { y: 0.18, count: 7 }, { y: -0.08, count: 7 }, { y: -0.34, count: 5 }, { y: -0.58, count: 3 }]
    : [
        { y: 0.5, count: 4 }, { y: 0.34, count: 6 }, { y: 0.17, count: 8 }, { y: 0.0, count: 8 },
        { y: -0.17, count: 9 }, { y: -0.34, count: 7 }, { y: -0.5, count: 5 }, { y: -0.64, count: 3 },
      ];
  chestRows.forEach((row, rowIndex) => {
    const halfWidth = 0.1 + 0.22 * Math.sqrt(Math.max(0, 1 - Math.pow(row.y / 0.92, 2)));
    for (let index = 0; index < row.count; index++) {
      const fraction = row.count === 1 ? 0.5 : index / (row.count - 1);
      const x = THREE.MathUtils.lerp(-halfWidth, halfWidth, fraction);
      const slant = -Math.sign(x) * 0.16 * Math.min(1, Math.abs(x) / halfWidth + 0.25);
      chestFeathers.push(makePlacement(
        x, row.y + 0.1, surfaceDepth(x, row.y) + 0.015,
        new THREE.Vector3(slant, -1, 0.04),
        0.25 + ((index + rowIndex) % 3) * 0.024,
        0.16 + (index % 2) * 0.014,
        rowIndex % 2 ? '#7d1219' : '#a01a1d',
        (index * 0.173 + rowIndex * 0.231) % 1,
        { flutter: 0.008, flow: 0.18, curve: -slant * 0.1, burn: rowIndex === 2 && index % 3 === 0, flameSize: 0.28 },
      ));
    }
  });
  addBatch(bodyGroup, chestFeathers, featherSource, materials.feather, isMobile, geometries, flameSites);

  const neckFeathers: FeatherPlacement[] = [];
  for (let row = 0; row < (isMobile ? 3 : 4); row++) {
    const y = 0.68 + row * 0.16;
    for (let index = 0; index < 5; index++) {
      const x = (index / 4 - 0.5) * (0.22 + row * 0.02);
      neckFeathers.push(makePlacement(
        x, y + 0.07, surfaceDepth(x, y) + 0.012,
        new THREE.Vector3(-Math.sign(x) * 0.16, -1, -0.08),
        0.26 + (row % 2) * 0.03, 0.13,
        row === 2 ? '#7a1219' : '#5e0f16',
        (0.24 + row * 0.12 + index * 0.07) % 1,
        { flutter: 0.008, flow: 0.22 },
      ));
    }
  }
  addBatch(bodyGroup, neckFeathers, featherSource, materials.feather, isMobile, geometries, flameSites);

  // Back plume: hides the spine seam and adds depth behind the wings.
  const backFeathers: FeatherPlacement[] = [];
  for (let row = 0; row < 4; row++) {
    const y = 0.4 - row * 0.3;
    for (let index = 0; index < 5; index++) {
      const x = (index / 4 - 0.5) * 0.5;
      backFeathers.push(makePlacement(
        x, y + 0.06, backSurfaceDepth(x, y) - 0.012,
        new THREE.Vector3(-Math.sign(x) * 0.2, -1, -0.22),
        0.34 + (row % 2) * 0.03, 0.15,
        row % 2 ? '#4c0b12' : '#661017',
        (row * 0.19 + index * 0.09) % 1,
        { flutter: 0.012, flow: 0.3 },
      ));
    }
  }
  addBatch(bodyGroup, backFeathers, featherSource, materials.feather, isMobile, geometries, flameSites);

  // ---------------------------------------------------------------
  // FIRE SEEDS on the torso: soft flame tongues rising through plumage.
  // ---------------------------------------------------------------
  const bodyFlameSites = [
    { x: -0.07, y: 1.04, size: 0.42, back: false, seed: 0.13 },
    { x: 0.09, y: 0.78, size: 0.46, back: false, seed: 0.29 },
    { x: -0.2, y: 0.4, size: 0.44, back: false, seed: 0.43 },
    { x: 0.2, y: 0.14, size: 0.4, back: false, seed: 0.58 },
    { x: -0.12, y: -0.12, size: 0.4, back: false, seed: 0.69 },
    { x: 0.12, y: -0.38, size: 0.38, back: false, seed: 0.76 },
    { x: 0.02, y: 0.5, size: 0.42, back: true, seed: 0.22 },
    { x: -0.16, y: 0.02, size: 0.4, back: true, seed: 0.51 },
    { x: 0.14, y: -0.46, size: 0.38, back: true, seed: 0.82 },
  ];
  bodyFlameSites.forEach((site, index) => {
    if (isMobile && index % 2 === 1) return;
    const depth = site.back ? backSurfaceDepth(site.x, site.y) - 0.02 : surfaceDepth(site.x, site.y) + 0.025;
    flameSites.push({
      parent: bodyGroup,
      point: new THREE.Vector3(site.x, site.y + site.size * 0.3, depth),
      size: site.size,
      kind: 1,
      seed: site.seed,
    });
  });

  // ---------------------------------------------------------------
  // LEGS: tucked beneath the tail for flight, wrapped in thigh plumes.
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  // LEGS: folded compactly beneath the breast, talons curled against the belly.
  // ---------------------------------------------------------------
  for (const side of [-1, 1]) {
    const leg = new THREE.Group();
    leg.name = side < 0 ? 'LeftTuckedLeg' : 'RightTuckedLeg';
    leg.position.set(side * 0.14, -0.9, 0.1);
    leg.rotation.set(0.12, side * 0.05, 0);
    leg.scale.setScalar(0.62);
    bodyGroup.add(leg);
    legs.push(leg);

    addTube(leg, [
      new THREE.Vector3(0, 0.12, -0.02),
      new THREE.Vector3(side * 0.02, -0.04, -0.04),
      new THREE.Vector3(0, -0.17, 0.0),
    ], [0.115, 0.095, 0.066], materials.wingBone, geometries, 'FeatheredPhoenixThigh');

    // The tarsus folds forward so the foot hugs the breast instead of trailing.
    addTube(leg, [
      new THREE.Vector3(0, -0.15, 0.0),
      new THREE.Vector3(side * 0.015, -0.24, 0.08),
      new THREE.Vector3(0, -0.28, 0.16),
    ], [0.056, 0.042, 0.03], materials.beak, geometries, 'PhoenixTarsusAndHock');

    addTube(leg, [
      new THREE.Vector3(0, -0.27, 0.15),
      new THREE.Vector3(0, -0.29, 0.23),
      new THREE.Vector3(0, -0.24, 0.28),
    ], [0.038, 0.042, 0.026], materials.beak, geometries, 'PhoenixFootArch');
    for (const toe of [-1, 0, 1]) {
      addTube(leg, [
        new THREE.Vector3(toe * 0.018, -0.25, 0.24),
        new THREE.Vector3(toe * 0.045, -0.31, 0.3),
        new THREE.Vector3(toe * 0.05, -0.35, 0.27),
      ], [0.028, 0.017, 0.0025], materials.beak, geometries, 'CurledTalons');
    }

    const thighPlumes: FeatherPlacement[] = [];
    addTuft(
      thighPlumes,
      new THREE.Vector3(side * 0.01, -0.04, 0.03),
      new THREE.Vector3(side * 0.3, -1, 0.12),
      6,
      0.3,
      0.15,
      0.07,
      0.4 + side * 0.13,
      '#4a0b11',
      '#6d1117',
    );
    addBatch(leg, thighPlumes, featherSource, materials.feather, isMobile, geometries, flameSites);
  }

  // ---------------------------------------------------------------
  // WINGS: smoothed bones under dense, overlapping plumage.
  // ---------------------------------------------------------------
  const leftWing = createWing(-1, bodyGroup, featherSource, materials, isMobile, geometries, flameSites);
  const rightWing = createWing(1, bodyGroup, featherSource, materials, isMobile, geometries, flameSites);

  // ---------------------------------------------------------------
  // TAIL: long flowing streamers that read as ribbons of flame.
  // ---------------------------------------------------------------
  const tailGroup = new THREE.Group();
  tailGroup.name = 'LayeredTailRig';
  tailGroup.position.set(0, -0.82, -0.18);
  bodyGroup.add(tailGroup);

  const tailHazeGeometry = new THREE.PlaneGeometry(2.0, 2.8);
  const tailHaze = new THREE.Mesh(tailHazeGeometry, materials.haze);
  tailHaze.name = 'TailEmberHaze';
  tailHaze.position.set(0, -1.15, 0.02);
  tailHaze.renderOrder = 2;
  tailHaze.frustumCulled = false;
  tailGroup.add(tailHaze);
  geometries.add(tailHazeGeometry);
  const tailFeathers: FeatherPlacement[] = [];
  const tailCount = isMobile ? 7 : 9;
  for (let index = 0; index < tailCount; index++) {
    const fraction = index / (tailCount - 1);
    const spread = (fraction - 0.5) * 2;
    const centrality = 1 - Math.abs(spread);
    const direction = new THREE.Vector3(spread * 0.34, -1, -0.26 - centrality * 0.1).normalize();
    tailFeathers.push(makePlacement(
      spread * 0.17, 0.05 - Math.abs(spread) * 0.02, -0.04,
      direction,
      1.72 + centrality * 0.95,
      0.2 + centrality * 0.04,
      index % 2 ? '#6c1119' : '#93181c',
      0.11 + index * 0.137,
      {
        burn: true,
        flutter: 0.06,
        flow: 1.0,
        curve: spread * 0.1,
        flameSize: 0.55 + centrality * 0.22,
      },
    ));
  }
  const tailCoverts = isMobile ? 6 : 10;
  for (let index = 0; index < tailCoverts; index++) {
    const fraction = index / Math.max(1, tailCoverts - 1);
    const spread = (fraction - 0.5) * 2;
    tailFeathers.push(makePlacement(
      spread * 0.14, 0.13, 0.05,
      new THREE.Vector3(spread * 0.2, -1, -0.06),
      0.6 + (index % 3) * 0.04, 0.15,
      index % 2 ? '#4e0c12' : '#6a1017',
      0.29 + index * 0.079,
      { flutter: 0.025, flow: 0.5, curve: spread * 0.03 },
    ));
  }
  addBatch(tailGroup, tailFeathers, featherSource, materials.feather, isMobile, geometries, flameSites);

  const leftTip = leftWing.outerTip;
  const rightTip = rightWing.outerTip;
  const tipPositions = { left: new THREE.Vector3(), right: new THREE.Vector3() };

  // Curated anatomical emitter sites: key aerodynamic nodes instead of 200+.
  const keyEmitterAnchors = [
    leftTip,
    rightTip,
    { parent: headGroup, point: new THREE.Vector3(0, 0.66, -0.5) },
    { parent: bodyGroup, point: new THREE.Vector3(0, 0.2, 0.35) },
    { parent: bodyGroup, point: new THREE.Vector3(0, -0.15, -0.24) },
    { parent: tailGroup, point: new THREE.Vector3(0, -1.35, 0.02) },
    { parent: leftWing.hierarchy.elbow, point: new THREE.Vector3(-0.7, 0.35, 0.05) },
    { parent: rightWing.hierarchy.elbow, point: new THREE.Vector3(0.7, 0.35, 0.05) },
    { parent: tailGroup, point: new THREE.Vector3(-0.35, -1.1, 0.0) },
    { parent: tailGroup, point: new THREE.Vector3(0.35, -1.1, 0.0) },
  ];
  const emitterPositions = keyEmitterAnchors.map(() => new THREE.Vector3());
  const flamePositions = flameSites.map(() => new THREE.Vector3());

  function getWingtipPositions() {
    flightGroup.updateMatrixWorld(true);
    leftTip.parent.localToWorld(tipPositions.left.copy(leftTip.point));
    rightTip.parent.localToWorld(tipPositions.right.copy(rightTip.point));
    flightGroup.worldToLocal(tipPositions.left);
    flightGroup.worldToLocal(tipPositions.right);
    return tipPositions;
  }

  function getEmitterPositions() {
    flightGroup.updateMatrixWorld(true);
    for (let index = 0; index < keyEmitterAnchors.length; index++) {
      const anchor = keyEmitterAnchors[index];
      anchor.parent.localToWorld(emitterPositions[index].copy(anchor.point));
      flightGroup.worldToLocal(emitterPositions[index]);
    }
    return emitterPositions;
  }

  function getFlamePositions() {
    flightGroup.updateMatrixWorld(true);
    for (let index = 0; index < flameSites.length; index++) {
      const site = flameSites[index];
      site.parent.localToWorld(flamePositions[index].copy(site.point));
      flightGroup.worldToLocal(flamePositions[index]);
    }
    return flamePositions;
  }

  function dispose() {
    geometries.forEach((geometry) => geometry.dispose());
    geometries.clear();
  }

  return {
    rootGroup,
    flightGroup,
    bodyGroup,
    bodyMesh,
    headGroup,
    tailGroup,
    legs,
    leftWing: leftWing.hierarchy,
    rightWing: rightWing.hierarchy,
    motion: materials.motion,
    flameSites,
    getWingtipPositions,
    getEmitterPositions,
    getFlamePositions,
    dispose,
  };
}

function createWing(
  side: number,
  bodyGroup: THREE.Group,
  featherSource: THREE.BufferGeometry,
  materials: PhoenixMaterialSet,
  isMobile: boolean,
  geometries: Set<THREE.BufferGeometry>,
  flameSites: FlameSite[],
) {
  const shoulder = new THREE.Group();
  shoulder.name = side < 0 ? 'LeftWingShoulder' : 'RightWingShoulder';
  shoulder.position.set(side * 0.28, 0.29, -0.035);
  shoulder.scale.set(isMobile ? 0.34 : 0.76, isMobile ? 1.12 : 1.16, 1);
  bodyGroup.add(shoulder);

  // Ember haze behind the vane layer: gaps glow instead of reading black.
  const wingHazeGeometry = new THREE.PlaneGeometry(3.0, 2.15);
  const wingHaze = new THREE.Mesh(wingHazeGeometry, materials.haze);
  wingHaze.name = 'WingEmberHaze';
  wingHaze.position.set(side * 0.88, -0.02, -0.18);
  wingHaze.rotation.z = side * -0.16;
  wingHaze.renderOrder = 2;
  wingHaze.frustumCulled = false;
  shoulder.add(wingHaze);
  geometries.add(wingHazeGeometry);

  const upperPoints = [
    new THREE.Vector3(0, 0.0, 0),
    new THREE.Vector3(side * 0.42, 0.1, -0.025),
    new THREE.Vector3(side * 0.82, 0.19, -0.04),
    new THREE.Vector3(side * 1.13, 0.2, -0.04),
  ];
  addTube(shoulder, upperPoints, [0.26, 0.235, 0.18, 0.12], materials.wingBone, geometries, 'RoundedUpperWingStructure');
  createSphereMesh(
    shoulder,
    new THREE.SphereGeometry(1, 18, 14),
    materials.wingBone,
    new THREE.Vector3(side * 0.02, -0.02, 0.02),
    new THREE.Vector3(0.22, 0.14, 0.15),
    geometries,
    'FeatheredShoulder',
  );

  const elbow = new THREE.Group();
  elbow.name = side < 0 ? 'LeftWingElbow' : 'RightWingElbow';
  elbow.position.set(side * 1.06, 0.18, -0.035);
  shoulder.add(elbow);

  const wrist = new THREE.Group();
  wrist.name = side < 0 ? 'LeftWingWrist' : 'RightWingWrist';
  wrist.position.set(side * 1.07, -0.005, -0.015);
  elbow.add(wrist);

  addTube(elbow, [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(side * 0.34, 0.015, 0),
    new THREE.Vector3(side * 0.72, -0.035, 0.005),
    new THREE.Vector3(side * 1.04, -0.015, -0.005),
  ], [0.185, 0.165, 0.14, 0.1], materials.wingBone, geometries, 'CurvedWingForearm');
  addTube(wrist, [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(side * 0.26, -0.035, 0.015),
    new THREE.Vector3(side * 0.45, -0.06, 0.01),
  ], [0.115, 0.09, 0.05], materials.wingBone, geometries, 'WristAndPrimarySpars');

  // Covert rows: densely overlapped so the wing surface reads continuous.
  const upperCoverts: FeatherPlacement[] = [];
  const rows = isMobile ? 3 : 5;
  const upperCount = isMobile ? 8 : 12;
  for (let row = 0; row < rows; row++) {
    for (let index = 0; index < upperCount; index++) {
      const fraction = index / Math.max(1, upperCount - 1);
      const x = 0.04 + fraction * 1.04;
      const fanJitter = Math.sin(index * 8.13 + row * 3.7) * 0.03;
      const direction = new THREE.Vector3(side * (0.8 - row * 0.08), -0.14 - row * 0.2 + fanJitter, 0.035);
      upperCoverts.push(makePlacement(
        side * x, 0.25 - row * 0.115 + Math.sin(fraction * Math.PI) * 0.07, 0.1 + row * 0.022,
        direction, 0.5 + row * 0.045 + ((index + row) % 3) * 0.03,
        0.17 + row * 0.014,
        row % 3 === 0 ? '#5a0d14' : row % 3 === 1 ? '#741119' : '#8d161b',
        (index * 0.117 + row * 0.227 + (side > 0 ? 0.13 : 0.31)) % 1,
        {
          burn: row === rows - 1 && index % 3 === 1,
          flutter: 0.026,
          flow: 0.3,
          curve: -fanJitter,
          flameSize: 0.34,
        },
      ));
    }
  }
  addBatch(shoulder, upperCoverts, featherSource, materials.feather, isMobile, geometries, flameSites);

  // Shoulder / elbow tufts hide the joint spheres completely.
  const jointPlumes: FeatherPlacement[] = [];
  addTuft(jointPlumes, new THREE.Vector3(side * 0.06, 0.03, 0.06), new THREE.Vector3(side * 0.4, -0.9, 0.2), 7, 0.4, 0.17, 0.11, 0.21 + side * 0.1, '#5b0d14', '#7c1219');
  addTuft(jointPlumes, new THREE.Vector3(side * 1.0, 0.24, 0.02), new THREE.Vector3(side * 0.7, -0.6, 0.12), 6, 0.34, 0.14, 0.08, 0.64 + side * 0.07, '#4f0c12', '#6f1118');
  addBatch(shoulder, jointPlumes, featherSource, materials.feather, isMobile, geometries, flameSites);

  const secondaryFeathers: FeatherPlacement[] = [];
  const secondaries = isMobile ? 10 : 15;
  for (let index = 0; index < secondaries; index++) {
    const fraction = index / Math.max(1, secondaries - 1);
    const x = 0.05 + fraction * 0.92;
    const direction = new THREE.Vector3(side * (0.42 + fraction * 0.1), -0.92 + fraction * 0.14, 0.02);
    secondaryFeathers.push(makePlacement(
      side * x, -0.01 + Math.sin(fraction * Math.PI) * 0.03, 0.1,
      direction,
      0.9 + 0.14 * Math.sin(fraction * Math.PI) + ((index % 3) - 1) * 0.03,
      0.21 + (index % 2) * 0.014,
      index % 2 ? '#69111a' : '#85151c',
      (index * 0.131 + (side > 0 ? 0.27 : 0.03)) % 1,
      { burn: index % 4 === 1, flutter: 0.055, flow: 0.65, curve: (fraction - 0.5) * 0.05, flameSize: 0.5 },
    ));
  }

  const forearmCoverts: FeatherPlacement[] = [];
  const forearmRows = isMobile ? 2 : 3;
  const forearmCount = isMobile ? 7 : 10;
  for (let row = 0; row < forearmRows; row++) {
    for (let index = 0; index < forearmCount; index++) {
      const fraction = index / Math.max(1, forearmCount - 1);
      const x = 0.08 + fraction * 0.88;
      const direction = new THREE.Vector3(side * (0.79 - row * 0.12), -0.24 - row * 0.22, 0.025);
      forearmCoverts.push(makePlacement(
        side * x, 0.09 - row * 0.12, 0.13 + row * 0.022,
        direction, 0.5 + row * 0.055 + (index % 2) * 0.03,
        0.16 + row * 0.012, row ? '#67101a' : '#8a161d',
        (index * 0.157 + row * 0.21 + (side < 0 ? 0.07 : 0.17)) % 1,
        { flutter: 0.035, flow: 0.4, curve: (fraction - 0.5) * 0.03 },
      ));
    }
  }
  addBatch(elbow, secondaryFeathers, featherSource, materials.feather, isMobile, geometries, flameSites);
  addBatch(elbow, forearmCoverts, featherSource, materials.feather, isMobile, geometries, flameSites);

  const primaryFeathers: FeatherPlacement[] = [];
  const primaryCount = isMobile ? 9 : 13;
  let outerPoint = new THREE.Vector3();
  for (let index = 0; index < primaryCount; index++) {
    const fraction = index / Math.max(1, primaryCount - 1);
    const angle = THREE.MathUtils.lerp(-0.78, 0.46, fraction);
    const direction = new THREE.Vector3(side * Math.cos(angle), Math.sin(angle), 0.015);
    const length = 1.16 + 0.24 * Math.sin(fraction * Math.PI) + ((index % 3) - 1) * 0.035;
    const x = (fraction - 0.5) * 0.36;
    const y = 0.15 - fraction * 0.24;
    const burn = index % 2 === 0 || index === primaryCount - 1;
    const placement = makePlacement(
      side * x, y, 0.08,
      direction, length, 0.225 + (index % 2) * 0.016,
      index % 2 ? '#7b131b' : '#a01a1e',
      (index * 0.143 + (side < 0 ? 0.19 : 0.43)) % 1,
      { burn, flutter: 0.075, flow: 0.85, curve: (fraction - 0.5) * 0.08, flameSize: 0.56 + (index % 2) * 0.1 },
    );
    primaryFeathers.push(placement);
    const candidate = placement.position.clone().addScaledVector(placement.direction, placement.length);
    if (index === primaryCount - 1) outerPoint = candidate;
  }
  const primaryCoverts: FeatherPlacement[] = [];
  const primaryCovertCount = isMobile ? 7 : 10;
  for (let index = 0; index < primaryCovertCount; index++) {
    const fraction = index / Math.max(1, primaryCovertCount - 1);
    primaryCoverts.push(makePlacement(
      (fraction - 0.5) * 0.28, 0.12 - fraction * 0.16, 0.125,
      new THREE.Vector3(side * 0.89, -0.25 + fraction * 0.12, 0.02),
      0.5 + (index % 2) * 0.05, 0.155,
      index % 2 ? '#5f0e16' : '#7d131b', (index * 0.17 + 0.22) % 1,
      { flutter: 0.045, flow: 0.5, curve: (fraction - 0.5) * 0.03 },
    ));
  }
  addBatch(wrist, primaryFeathers, featherSource, materials.feather, isMobile, geometries, flameSites);
  addBatch(wrist, primaryCoverts, featherSource, materials.feather, isMobile, geometries, flameSites);

  return {
    hierarchy: { side, shoulder, elbow, wrist },
    outerTip: { parent: wrist, point: outerPoint },
  };
}
