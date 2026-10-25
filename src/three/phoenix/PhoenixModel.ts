import * as THREE from 'three';
import type { PhoenixMaterialSet, PhoenixMotionUniforms } from './PhoenixMaterials';

export interface WingHierarchy {
  side: number;
  shoulder: THREE.Group;
  elbow: THREE.Group;
  wrist: THREE.Group;
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
  tipFlames: THREE.Mesh[];
  getWingtipPositions: () => { left: THREE.Vector3; right: THREE.Vector3 };
  getEmitterPositions: () => THREE.Vector3[];
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
  flameHeight?: number;
}

interface FeatherAnchor {
  parent: THREE.Group;
  point: THREE.Vector3;
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
  [0.48, 0.29, 0.26, 0.10],
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
  const ringCount = isMobile ? 36 : 56;
  const radialCount = isMobile ? 32 : 48;
  const minY = BODY_PROFILE[0][0];
  const maxY = BODY_PROFILE[BODY_PROFILE.length - 1][0];
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const deep = new THREE.Color('#49101b');
  const crimson = new THREE.Color('#9f1a29');
  const scarlet = new THREE.Color('#d63335');
  const ember = new THREE.Color('#df512c');
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

      const front = Math.pow(Math.max(0, sinAngle), 1.3);
      const breast = front * Math.exp(-Math.pow((y + 0.02) / 0.74, 2));
      const neck = smoothstep(0.58, 1.2, y);
      color.copy(deep).lerp(crimson, 0.38 + front * 0.34 + neck * 0.08);
      color.lerp(scarlet, breast * 0.52);
      color.lerp(ember, breast * 0.12 * smoothstep(0.1, 0.7, y));
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

function createFeatherGeometry(isMobile: boolean) {
  const alongCount = isMobile ? 18 : 26;
  const acrossCount = 8;
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const base = new THREE.Color('#71121f');
  const middle = new THREE.Color('#c32531');
  const tip = new THREE.Color('#ed6334');
  const color = new THREE.Color();

  for (let along = 0; along <= alongCount; along++) {
    const v = along / alongCount;
    const envelope = Math.pow(Math.sin(Math.PI * v), 0.72) * (1.04 - 0.2 * v);
    for (let across = 0; across <= acrossCount; across++) {
      const u = across / acrossCount;
      const centered = u - 0.5;
      const x = centered * 0.29 * envelope;
      const z = 0.027 * Math.sin(Math.PI * u) * envelope + 0.007 * Math.sin(v * Math.PI * 2) * v;
      positions.push(x, v, z);
      uvs.push(u, v);
      color.copy(base).lerp(middle, smoothstep(0.02, 0.68, v));
      color.lerp(tip, smoothstep(0.68, 1.0, v) * 0.72);
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

function createFlameGeometry(seed: number, isMobile: boolean) {
  const alongCount = isMobile ? 12 : 18;
  const acrossCount = 6;
  const positions: number[] = [];
  const uvs: number[] = [];
  const seeds: number[] = [];
  const indices: number[] = [];

  for (let along = 0; along <= alongCount; along++) {
    const v = along / alongCount;
    const envelope = (0.035 + Math.sin(Math.PI * v) * 0.9) * (1 - smoothstep(0.78, 1.0, v));
    const center = Math.sin(v * 6.4 + seed * 6.283) * 0.055 * v
      + Math.sin(v * 13.0 - seed * 4.2) * 0.018 * v;
    for (let across = 0; across <= acrossCount; across++) {
      const u = across / acrossCount;
      const edge = (u - 0.5) * envelope;
      const z = Math.sin(Math.PI * u) * Math.sin(Math.PI * v) * 0.045;
      positions.push(center + edge, v, z);
      uvs.push(u, v);
      seeds.push(seed);
    }
  }
  for (let along = 0; along < alongCount; along++) {
    for (let across = 0; across < acrossCount; across++) {
      const a = along * (acrossCount + 1) + across;
      const b = a + acrossCount + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('aFlameSeed', new THREE.Float32BufferAttribute(seeds, 1));
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
  options: Partial<Pick<FeatherPlacement, 'burn' | 'flutter' | 'curve' | 'flameHeight'>> = {},
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
    flameHeight: options.flameHeight,
  };
}

function addBatch(
  parent: THREE.Group,
  placements: FeatherPlacement[],
  source: THREE.BufferGeometry,
  material: THREE.MeshPhysicalMaterial,
  flameMaterial: THREE.ShaderMaterial,
  isMobile: boolean,
  geometries: Set<THREE.BufferGeometry>,
  flames: THREE.Mesh[],
  anchors: FeatherAnchor[],
) {
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
  const indices: number[] = [];
  const localPos = new THREE.Vector3();
  const localNormal = new THREE.Vector3();
  const axis = new THREE.Vector3();
  const perp = new THREE.Vector3();
  const tint = new THREE.Color();
  const matrix = new THREE.Matrix4();
  const normalMatrix = new THREE.Matrix3();
  const quaternion = new THREE.Quaternion();
  const temporary = new THREE.Object3D();

  placements.forEach((placement) => {
    quaternion.copy(facingQuaternion(placement.direction));
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
        THREE.MathUtils.lerp(sourceColor.getX(vertex), tint.r, 0.12),
        THREE.MathUtils.lerp(sourceColor.getY(vertex), tint.g, 0.09),
        THREE.MathUtils.lerp(sourceColor.getZ(vertex), tint.b, 0.08),
      );
      uvs.push(u, v);
      axes.push(axis.x, axis.y, axis.z);
      perps.push(perp.x, perp.y, perp.z);
      seeds.push(placement.seed);
      flutters.push(placement.flutter ?? 0.035);
      burns.push(placement.burn ? 1 : 0);
    }
    if (sourceIndex) {
      for (let index = 0; index < sourceIndex.count; index++) indices.push(sourceIndex.getX(index) + vertexOffset);
    } else {
      for (let index = 0; index < vertexCount; index++) indices.push(index + vertexOffset);
    }

    if (placement.burn) {
      const tip = placement.position.clone().addScaledVector(placement.direction, placement.length);
      const flameGeo = createFlameGeometry(placement.seed, isMobile);
      geometries.add(flameGeo);
      const flame = new THREE.Mesh(flameGeo, flameMaterial);
      flame.name = 'FeatherTipFlame';
      flame.position.copy(tip);
      flame.position.z += 0.015;
      flame.quaternion.copy(quaternion);
      flame.scale.set(Math.max(0.19, placement.width * 1.58), (placement.flameHeight ?? 0.34) * 1.65, 1);
      flame.userData.baseScaleX = flame.scale.x;
      flame.userData.baseScaleY = flame.scale.y;
      parent.add(flame);
      flames.push(flame);
      anchors.push({ parent, point: tip });
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
  mesh.castShadow = true;
  mesh.receiveShadow = true;
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
  mesh.castShadow = true;
  mesh.receiveShadow = true;
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

function addBodyFlame(
  parent: THREE.Group,
  position: THREE.Vector3,
  direction: THREE.Vector3,
  width: number,
  height: number,
  seed: number,
  material: THREE.ShaderMaterial,
  isMobile: boolean,
  geometries: Set<THREE.BufferGeometry>,
  flames: THREE.Mesh[],
  anchors: FeatherAnchor[],
) {
  const geometry = createFlameGeometry(seed, isMobile);
  geometries.add(geometry);
  const flame = new THREE.Mesh(geometry, material);
  flame.name = 'IncandescentBodyFeatherFlame';
  flame.position.copy(position);
  flame.quaternion.copy(facingQuaternion(direction));
  flame.scale.set(width * 1.72, height * 1.68, 1);
  flame.userData.baseScaleX = flame.scale.x;
  flame.userData.baseScaleY = flame.scale.y;
  parent.add(flame);
  flames.push(flame);
  anchors.push({
    parent,
    point: position.clone().addScaledVector(direction, height),
  });
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
  const tipFlames: THREE.Mesh[] = [];
  const legs: THREE.Group[] = [];
  const emitterAnchors: FeatherAnchor[] = [];
  const featherSource = createFeatherGeometry(isMobile);
  geometries.add(featherSource);

  const bodyGeo = createBodyGeometry(isMobile);
  geometries.add(bodyGeo);
  const bodyMesh = new THREE.Mesh(bodyGeo, materials.sculpture);
  bodyMesh.name = 'ContinuousBreastNeckAndAbdomen';
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  bodyGroup.add(bodyMesh);

  const headGroup = new THREE.Group();
  headGroup.name = 'PhoenixHeadAndCrestRig';
  headGroup.position.set(0, 1.31, 0.29);
  bodyGroup.add(headGroup);

  const headGeo = new THREE.SphereGeometry(1, isMobile ? 20 : 28, isMobile ? 16 : 22);
  createSphereMesh(headGroup, headGeo, materials.head, new THREE.Vector3(0, 0.04, 0.02), new THREE.Vector3(0.275, 0.225, 0.31), geometries, 'SculptedAvianHead');

  const beakPoints = [
    new THREE.Vector3(0, -0.045, 0.26),
    new THREE.Vector3(0, -0.09, 0.46),
    new THREE.Vector3(0, -0.18, 0.49),
  ];
  addTube(headGroup, beakPoints, [0.105, 0.068, 0.008], materials.beak, geometries, 'HookedPhoenixBeak');

  const browGeoPoints = [
    [new THREE.Vector3(-0.105, 0.095, 0.236), new THREE.Vector3(-0.18, 0.12, 0.255), new THREE.Vector3(-0.245, 0.075, 0.22)],
    [new THREE.Vector3(0.105, 0.095, 0.236), new THREE.Vector3(0.18, 0.12, 0.255), new THREE.Vector3(0.245, 0.075, 0.22)],
  ];
  browGeoPoints.forEach((points, index) => {
    const side = index === 0 ? -1 : 1;
    createSphereMesh(headGroup, new THREE.SphereGeometry(1, 14, 10), materials.eyeSocket, new THREE.Vector3(side * 0.165, 0.045, 0.256), new THREE.Vector3(0.062, 0.046, 0.026), geometries, 'EyeSocket');
    createSphereMesh(headGroup, new THREE.SphereGeometry(1, 12, 10), materials.eye, new THREE.Vector3(side * 0.17, 0.045, 0.279), new THREE.Vector3(0.029, 0.03, 0.018), geometries, 'LuminousAmberEye');
    addTube(headGroup, points, [0.045, 0.055, 0.015], materials.head, geometries, 'PhoenixBrowRidge');
    createSphereMesh(headGroup, new THREE.SphereGeometry(1, 8, 6), materials.beak,
      new THREE.Vector3(side * 0.06, -0.06, 0.33), new THREE.Vector3(0.018, 0.012, 0.009), geometries, 'BeakNostril');
  });

  const headFeathers: FeatherPlacement[] = [];
  const crestDirections = [
    [-0.30, 0.60, -0.72], [-0.19, 0.74, -0.68], [-0.07, 0.78, -0.63],
    [0.08, 0.76, -0.64], [0.21, 0.68, -0.69], [0.31, 0.57, -0.74],
  ];
  crestDirections.forEach((vector, index) => {
    const direction = new THREE.Vector3(vector[0], vector[1], vector[2]).normalize();
    const length = 0.84 + 0.19 * Math.sin((index / (crestDirections.length - 1)) * Math.PI);
    headFeathers.push(makePlacement(
      (index - 2.5) * 0.062, 0.15 - Math.abs(index - 2.5) * 0.012, -0.025,
      direction, length, 0.15 + (index % 2) * 0.018, index % 2 ? '#d63334' : '#ef5631',
      0.17 + index * 0.119,
      { burn: index === 1 || index === 3 || index === 5, flutter: 0.05, curve: -0.06, flameHeight: 0.42 + (index % 2) * 0.09 },
    ));
  });

  for (const side of [-1, 1]) {
    for (let row = 0; row < 2; row++) {
      for (let index = 0; index < 2; index++) {
        const x = side * (0.18 + index * 0.04);
        headFeathers.push(makePlacement(
          x, -0.04 - row * 0.12, 0.115 - row * 0.08,
          new THREE.Vector3(side * (0.16 + index * 0.08), -0.94, -0.18),
          0.31 + index * 0.035, 0.105, row ? '#9d1c29' : '#c32731',
          0.31 + side * 0.1 + row * 0.07 + index * 0.11,
          { flutter: 0.025, curve: -side * 0.018 },
        ));
      }
    }
  }
  addBatch(headGroup, headFeathers, featherSource, materials.feather, materials.flame, isMobile, geometries, tipFlames, emitterAnchors);

  const chestFeathers: FeatherPlacement[] = [];
  const chestRows = isMobile
    ? [{ y: 0.39, count: 3 }, { y: 0.14, count: 5 }, { y: -0.12, count: 5 }, { y: -0.39, count: 3 }]
    : [{ y: 0.46, count: 3 }, { y: 0.25, count: 5 }, { y: 0.04, count: 7 }, { y: -0.17, count: 7 }, { y: -0.38, count: 5 }, { y: -0.59, count: 3 }];
  chestRows.forEach((row, rowIndex) => {
    const halfWidth = (0.11 + 0.23 * Math.sqrt(Math.max(0, 1 - Math.pow(row.y / 0.9, 2))));
    for (let index = 0; index < row.count; index++) {
      const fraction = row.count === 1 ? 0.5 : index / (row.count - 1);
      const x = THREE.MathUtils.lerp(-halfWidth, halfWidth, fraction);
      const slant = -Math.sign(x) * 0.13;
      chestFeathers.push(makePlacement(
        x, row.y + 0.12, surfaceDepth(x, row.y) + 0.01,
        new THREE.Vector3(slant, -1, 0.025),
        0.25 + ((index + rowIndex) % 3) * 0.022,
        0.135 + (index % 2) * 0.012,
        rowIndex % 2 ? '#db3338' : '#f0443c',
        (index * 0.173 + rowIndex * 0.231) % 1,
        { flutter: 0.009, curve: -slant * 0.12 },
      ));
    }
  });
  addBatch(bodyGroup, chestFeathers, featherSource, materials.feather, materials.flame, isMobile, geometries, tipFlames, emitterAnchors);

  const neckFeathers: FeatherPlacement[] = [];
  for (let row = 0; row < (isMobile ? 2 : 3); row++) {
    const y = 0.70 + row * 0.19;
    for (const side of [-1, 0, 1]) {
      const x = side * (0.105 + row * 0.008);
      neckFeathers.push(makePlacement(
        x, y + 0.09, surfaceDepth(x, y) + 0.01,
        new THREE.Vector3(-side * 0.10, -1, 0.015),
        0.255 + (row % 2) * 0.025, 0.105, row === 1 ? '#c62a32' : '#a9202b',
        0.24 + row * 0.12 + (side + 1) * 0.08, { flutter: 0.008 },
      ));
    }
  }
  addBatch(bodyGroup, neckFeathers, featherSource, materials.feather, materials.flame, isMobile, geometries, tipFlames, emitterAnchors);

  const bodyFlameSites = [
    { x: -0.08, y: 1.02, width: 0.048, height: 0.20, seed: 0.13, back: false },
    { x: 0.09, y: 0.76, width: 0.055, height: 0.22, seed: 0.29, back: false },
    { x: -0.24, y: 0.38, width: 0.055, height: 0.20, seed: 0.43, back: false },
    { x: 0.21, y: 0.12, width: 0.050, height: 0.20, seed: 0.58, back: false },
    { x: -0.13, y: -0.1, width: 0.052, height: 0.18, seed: 0.69, back: false },
    { x: 0.12, y: -0.34, width: 0.048, height: 0.19, seed: 0.76, back: false },
    { x: -0.06, y: -0.61, width: 0.044, height: 0.17, seed: 0.87, back: false },
    { x: 0.13, y: -0.74, width: 0.042, height: 0.18, seed: 0.94, back: false },
    { x: 0.03, y: 0.48, width: 0.050, height: 0.20, seed: 0.22, back: true },
    { x: -0.18, y: 0.02, width: 0.046, height: 0.19, seed: 0.51, back: true },
    { x: 0.15, y: -0.42, width: 0.048, height: 0.19, seed: 0.82, back: true },
  ];
  bodyFlameSites.forEach((site, index) => {
    if (isMobile && index % 2 === 1) return;
    const depth = site.back ? backSurfaceDepth(site.x, site.y) - 0.018 : surfaceDepth(site.x, site.y) + 0.022;
    const position = new THREE.Vector3(site.x, site.y, depth);
    const direction = new THREE.Vector3(site.x * 0.28, 0.94, site.back ? -0.34 : 0.3).normalize();
    addBodyFlame(
      bodyGroup,
      position,
      direction,
      site.width,
      site.height,
      site.seed,
      materials.flame,
      isMobile,
      geometries,
      tipFlames,
      emitterAnchors,
    );
  });

  for (const side of [-1, 1]) {
    const leg = new THREE.Group();
    leg.name = side < 0 ? 'LeftVisiblePhoenixLeg' : 'RightVisiblePhoenixLeg';
    leg.position.set(side * 0.16, -0.78, 0.26);
    bodyGroup.add(leg);
    legs.push(leg);

    addTube(leg, [
      new THREE.Vector3(0, 0.12, -0.03),
      new THREE.Vector3(side * 0.025, -0.1, 0.015),
      new THREE.Vector3(0, -0.34, 0.06),
    ], [0.135, 0.108, 0.078], materials.wingBone, geometries, 'FeatheredPhoenixThigh');
    addTube(leg, [
      new THREE.Vector3(0, -0.3, 0.06),
      new THREE.Vector3(side * 0.018, -0.52, 0.13),
      new THREE.Vector3(0, -0.75, 0.09),
    ], [0.073, 0.056, 0.042], materials.beak, geometries, 'PhoenixTarsusAndHock');
    createSphereMesh(leg, new THREE.SphereGeometry(1, 12, 10), materials.wingBone,
      new THREE.Vector3(0, -0.32, 0.07), new THREE.Vector3(0.082, 0.085, 0.08), geometries, 'PhoenixKneeJoint');

    addTube(leg, [
      new THREE.Vector3(0, -0.73, 0.08),
      new THREE.Vector3(0, -0.78, 0.23),
      new THREE.Vector3(0, -0.76, 0.32),
    ], [0.052, 0.059, 0.043], materials.beak, geometries, 'PhoenixFootArch');
    for (const toe of [-1, 0, 1]) {
      addTube(leg, [
        new THREE.Vector3(toe * 0.025, -0.76, 0.25),
        new THREE.Vector3(toe * 0.062, -0.79, 0.43),
        new THREE.Vector3(toe * 0.078, -0.83, 0.51),
      ], [0.039, 0.026, 0.0035], materials.beak, geometries, 'ForwardPhoenixTalons');
    }
    addTube(leg, [
      new THREE.Vector3(0, -0.75, 0.12),
      new THREE.Vector3(-side * 0.045, -0.79, -0.015),
      new THREE.Vector3(-side * 0.055, -0.84, -0.07),
    ], [0.034, 0.022, 0.0035], materials.beak, geometries, 'RearPhoenixTalon');
  }

  const leftWing = createWing(-1, bodyGroup, featherSource, materials, isMobile, geometries, tipFlames, emitterAnchors);
  const rightWing = createWing(1, bodyGroup, featherSource, materials, isMobile, geometries, tipFlames, emitterAnchors);

  const tailGroup = new THREE.Group();
  tailGroup.name = 'LayeredTailRig';
  tailGroup.position.set(0, -0.78, -0.2);
  bodyGroup.add(tailGroup);
  const tailFeathers: FeatherPlacement[] = [];
  const tailCount = isMobile ? 5 : 7;
  for (let index = 0; index < tailCount; index++) {
    const fraction = index / (tailCount - 1);
    const spread = (fraction - 0.5) * 2;
    const centrality = 1 - Math.abs(spread);
    const direction = new THREE.Vector3(spread * 0.25, -1, -0.13 - centrality * 0.05).normalize();
    tailFeathers.push(makePlacement(
      spread * 0.16, 0.05 - Math.abs(spread) * 0.025, -0.04,
      direction, 1.52 + centrality * 0.62, 0.19 + centrality * 0.035,
      index % 2 ? '#b4232d' : '#d33433',
      0.11 + index * 0.137,
      { burn: index === Math.floor(tailCount / 2) || index === 1 || index === tailCount - 2, flutter: 0.045, curve: spread * 0.08, flameHeight: 0.58 + centrality * 0.12 },
    ));
  }
  const tailCoverts = isMobile ? 5 : 8;
  for (let index = 0; index < tailCoverts; index++) {
    const fraction = index / Math.max(1, tailCoverts - 1);
    const spread = (fraction - 0.5) * 2;
    tailFeathers.push(makePlacement(
      spread * 0.13, 0.13, 0.045,
      new THREE.Vector3(spread * 0.17, -1, -0.04),
      0.58 + (index % 3) * 0.035, 0.13,
      index % 2 ? '#8d1925' : '#b3242e',
      0.29 + index * 0.079,
      { flutter: 0.02, curve: spread * 0.025 },
    ));
  }
  addBatch(tailGroup, tailFeathers, featherSource, materials.feather, materials.flame, isMobile, geometries, tipFlames, emitterAnchors);

  const bodyEmberSites = [
    { x: -0.06, y: 1.04, back: false },
    { x: 0.2, y: 0.76, back: false },
    { x: -0.3, y: 0.48, back: false },
    { x: 0.38, y: 0.28, back: false },
    { x: -0.35, y: 0.02, back: false },
    { x: 0.24, y: -0.2, back: false },
    { x: -0.19, y: -0.43, back: false },
    { x: 0.11, y: -0.68, back: false },
    { x: -0.05, y: 0.86, back: true },
    { x: 0.22, y: 0.53, back: true },
    { x: -0.28, y: 0.2, back: true },
    { x: 0.14, y: -0.14, back: true },
    { x: -0.1, y: -0.51, back: true },
  ];
  const emitterLocals: FeatherAnchor[] = bodyEmberSites.map((site) => ({
    parent: bodyGroup,
    point: new THREE.Vector3(
      site.x,
      site.y,
      (site.back ? backSurfaceDepth(site.x, site.y) : surfaceDepth(site.x, site.y)) + (site.back ? -0.02 : 0.02),
    ),
  }));
  emitterLocals.push({ parent: headGroup, point: new THREE.Vector3(0, 0.72, -0.56) });
  emitterAnchors.unshift(...emitterLocals);
  const emitterPositions = emitterAnchors.map(() => new THREE.Vector3());

  const leftTip = leftWing.outerTip;
  const rightTip = rightWing.outerTip;
  const tipPositions = { left: new THREE.Vector3(), right: new THREE.Vector3() };

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
    for (let index = 0; index < emitterAnchors.length; index++) {
      const anchor = emitterAnchors[index];
      anchor.parent.localToWorld(emitterPositions[index].copy(anchor.point));
      flightGroup.worldToLocal(emitterPositions[index]);
    }
    return emitterPositions;
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
    tipFlames,
    getWingtipPositions,
    getEmitterPositions,
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
  flames: THREE.Mesh[],
  anchors: FeatherAnchor[],
) {
  const shoulder = new THREE.Group();
  shoulder.name = side < 0 ? 'LeftWingShoulder' : 'RightWingShoulder';
  shoulder.position.set(side * 0.30, 0.28, -0.035);
  shoulder.scale.set(isMobile ? 0.30 : 0.68, isMobile ? 1.16 : 1.24, 1);
  bodyGroup.add(shoulder);

  const upperPoints = [
    new THREE.Vector3(0, 0.015, 0),
    new THREE.Vector3(side * 0.42, 0.18, -0.025),
    new THREE.Vector3(side * 0.82, 0.32, -0.04),
    new THREE.Vector3(side * 1.13, 0.31, -0.04),
  ];
  addTube(shoulder, upperPoints, [0.24, 0.22, 0.17, 0.115], materials.wingBone, geometries, 'RoundedUpperWingStructure');
  createSphereMesh(shoulder, new THREE.SphereGeometry(1, 16, 12), materials.wingBone,
    new THREE.Vector3(side * 0.02, 0.02, 0.035), new THREE.Vector3(0.20, 0.16, 0.16), geometries, 'FeatheredShoulder');

  const elbow = new THREE.Group();
  elbow.name = side < 0 ? 'LeftWingElbow' : 'RightWingElbow';
  elbow.position.set(side * 1.06, 0.29, -0.035);
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
  ], [0.17, 0.15, 0.125, 0.09], materials.wingBone, geometries, 'CurvedWingForearm');
  createSphereMesh(elbow, new THREE.SphereGeometry(1, 12, 10), materials.wingBone,
    new THREE.Vector3(0, 0, 0.01), new THREE.Vector3(0.19, 0.15, 0.15), geometries, 'WingElbowJoint');
  addTube(wrist, [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(side * 0.26, -0.035, 0.015),
    new THREE.Vector3(side * 0.45, -0.06, 0.01),
  ], [0.105, 0.082, 0.045], materials.wingBone, geometries, 'WristAndPrimarySpars');

  const upperCoverts: FeatherPlacement[] = [];
  const rows = isMobile ? 3 : 4;
  const upperCount = isMobile ? 7 : 10;
  for (let row = 0; row < rows; row++) {
    for (let index = 0; index < upperCount; index++) {
      const fraction = index / Math.max(1, upperCount - 1);
      const x = 0.05 + fraction * 1.02;
      const fanJitter = Math.sin(index * 8.13 + row * 3.7) * 0.035;
      const direction = new THREE.Vector3(side * (0.78 - row * 0.11), -0.12 - row * 0.22 + fanJitter, 0.035);
      const burn = row === rows - 1 && index % 3 === 1;
      upperCoverts.push(makePlacement(
        side * x, 0.24 - row * 0.14 + Math.sin(fraction * Math.PI) * 0.08, 0.10 + row * 0.026,
        direction, 0.48 + row * 0.055 + ((index + row) % 3) * 0.035,
        0.145 + row * 0.016, row === 0 ? '#a71c29' : row === 1 ? '#c12731' : '#dd3835',
        (index * 0.117 + row * 0.227 + (side > 0 ? 0.13 : 0.31)) % 1,
        { burn, flutter: 0.028, curve: -fanJitter, flameHeight: 0.31 },
      ));
    }
  }
  addBatch(shoulder, upperCoverts, featherSource, materials.feather, materials.flame, isMobile, geometries, flames, anchors);

  const secondaryFeathers: FeatherPlacement[] = [];
  const secondaries = isMobile ? 9 : 12;
  for (let index = 0; index < secondaries; index++) {
    const fraction = index / Math.max(1, secondaries - 1);
    const x = 0.06 + fraction * 0.9;
    const direction = new THREE.Vector3(side * (0.46 + fraction * 0.08), -0.89 + fraction * 0.13, 0.02);
    secondaryFeathers.push(makePlacement(
      side * x, -0.015 + Math.sin(fraction * Math.PI) * 0.03, 0.095,
      direction, 0.82 + 0.13 * Math.sin(fraction * Math.PI) + ((index % 3) - 1) * 0.04,
      0.19 + (index % 2) * 0.018, index % 2 ? '#ae202c' : '#c82a32',
      (index * 0.131 + (side > 0 ? 0.27 : 0.03)) % 1,
      { burn: index % 3 === 1, flutter: 0.065, curve: (fraction - 0.5) * 0.045, flameHeight: 0.43 },
    ));
  }

  const forearmCoverts: FeatherPlacement[] = [];
  const forearmRows = isMobile ? 2 : 3;
  const forearmCount = isMobile ? 6 : 9;
  for (let row = 0; row < forearmRows; row++) {
    for (let index = 0; index < forearmCount; index++) {
      const fraction = index / Math.max(1, forearmCount - 1);
      const x = 0.08 + fraction * 0.88;
      const direction = new THREE.Vector3(side * (0.79 - row * 0.14), -0.22 - row * 0.24, 0.025);
      forearmCoverts.push(makePlacement(
        side * x, 0.08 - row * 0.14, 0.13 + row * 0.024,
        direction, 0.48 + row * 0.065 + (index % 2) * 0.035,
        0.135 + row * 0.014, row ? '#b5212d' : '#d03234',
        (index * 0.157 + row * 0.21 + (side < 0 ? 0.07 : 0.17)) % 1,
        { flutter: 0.04, curve: (fraction - 0.5) * 0.025 },
      ));
    }
  }
  addBatch(elbow, secondaryFeathers, featherSource, materials.feather, materials.flame, isMobile, geometries, flames, anchors);
  addBatch(elbow, forearmCoverts, featherSource, materials.feather, materials.flame, isMobile, geometries, flames, anchors);

  const primaryFeathers: FeatherPlacement[] = [];
  const primaryCount = isMobile ? 8 : 11;
  let outerPoint = new THREE.Vector3();
  for (let index = 0; index < primaryCount; index++) {
    const fraction = index / Math.max(1, primaryCount - 1);
    const angle = THREE.MathUtils.lerp(-0.84, 0.43, fraction);
    const direction = new THREE.Vector3(side * Math.cos(angle), Math.sin(angle), 0.015);
    const length = 1.12 + 0.17 * Math.sin(fraction * Math.PI) + ((index % 3) - 1) * 0.045;
    const x = (fraction - 0.5) * 0.34;
    const y = 0.14 - fraction * 0.24;
    const burn = index % 2 === 0 || index === primaryCount - 1;
    const placement = makePlacement(
      side * x, y, 0.075,
      direction, length, 0.20 + (index % 2) * 0.018,
      index % 2 ? '#d83233' : '#ed4237',
      (index * 0.143 + (side < 0 ? 0.19 : 0.43)) % 1,
      { burn, flutter: 0.085, curve: (fraction - 0.5) * 0.075, flameHeight: 0.42 + (index % 2) * 0.06 },
    );
    primaryFeathers.push(placement);
    const candidate = placement.position.clone().addScaledVector(placement.direction, placement.length);
    if (index === primaryCount - 1) outerPoint = candidate;
  }
  const primaryCoverts: FeatherPlacement[] = [];
  const primaryCovertCount = isMobile ? 6 : 8;
  for (let index = 0; index < primaryCovertCount; index++) {
    const fraction = index / Math.max(1, primaryCovertCount - 1);
    primaryCoverts.push(makePlacement(
      (fraction - 0.5) * 0.26, 0.11 - fraction * 0.16, 0.12,
      new THREE.Vector3(side * 0.89, -0.23 + fraction * 0.12, 0.02),
      0.47 + (index % 2) * 0.06, 0.14,
      index % 2 ? '#b9232f' : '#d32d34', (index * 0.17 + 0.22) % 1,
      { flutter: 0.05, curve: (fraction - 0.5) * 0.025 },
    ));
  }
  addBatch(wrist, primaryFeathers, featherSource, materials.feather, materials.flame, isMobile, geometries, flames, anchors);
  addBatch(wrist, primaryCoverts, featherSource, materials.feather, materials.flame, isMobile, geometries, flames, anchors);

  return {
    hierarchy: { side, shoulder, elbow, wrist },
    outerTip: { parent: wrist, point: outerPoint },
  };
}
