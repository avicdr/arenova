import * as THREE from 'three';
import type { PhoenixModelInstance, WingHierarchy } from './PhoenixModel';

export interface PhoenixAnimationEngine {
  update: (
    delta: number,
    scrollProgress: number,
    mouse: { x: number; y: number },
    reducedMotion?: boolean,
    scrollSpeed?: number,
  ) => void;
}

interface SpringState {
  value: number;
  velocity: number;
}

interface WingState {
  side: number;
  elbow: SpringState;
  wrist: SpringState;
}

function makeSpring(value = 0): SpringState {
  return { value, velocity: 0 };
}

function springTo(state: SpringState, target: number, delta: number, frequency: number) {
  const dt = Math.min(delta, 0.05);
  const stiffness = frequency * frequency;
  const damping = 2 * frequency * 0.86;
  const acceleration = (target - state.value) * stiffness - state.velocity * damping;
  state.velocity += acceleration * dt;
  state.value += state.velocity * dt;
}

function poseWing(
  wing: WingHierarchy,
  state: WingState,
  stroke: number,
  opening: number,
  power: number,
  mouse: { x: number; y: number },
  delta: number,
  reducedMotion: boolean,
  scrollEnergy: number,
) {
  const side = state.side;
  if (reducedMotion) {
    wing.shoulder.rotation.set(0.055, side * (0.1 + opening * 0.045), side * (0.12 + opening * 0.06));
    wing.elbow.rotation.set(side * 0.025, side * -0.035, side * -0.025);
    wing.wrist.rotation.set(side * 0.018, side * 0.025, side * 0.015);
    return;
  }

  // The elbow and wrist follow the shoulder through damped springs. This keeps
  // the large wing stroke readable while adding the natural lag of flight feathers.
  springTo(state.elbow, stroke, delta, 12.5);
  springTo(state.wrist, state.elbow.value, delta, 8.4);
  const sweepAmplitude = 0.56 + opening * 0.12 + scrollEnergy * 0.26;
  const elbowFollow = state.elbow.value;
  const wristFollow = state.wrist.value;

  wing.shoulder.rotation.set(
    0.025 + stroke * 0.035 + mouse.y * 0.018,
    side * (0.1 + opening * 0.045 + mouse.x * 0.014 + stroke * sweepAmplitude + power * (0.035 + scrollEnergy * 0.045)),
    side * (0.105 + opening * 0.06 + stroke * 0.035),
  );
  wing.elbow.rotation.set(
    side * (0.025 + elbowFollow * 0.035),
    side * (mouse.x * 0.014 - elbowFollow * (0.17 + opening * 0.035 + scrollEnergy * 0.05) - power * 0.035),
    side * (-0.025 - elbowFollow * 0.035),
  );
  wing.wrist.rotation.set(
    side * (0.018 + wristFollow * 0.04),
    side * (0.025 + wristFollow * (0.22 + opening * 0.04 + scrollEnergy * 0.065) + power * 0.035 - mouse.x * 0.01),
    side * (0.015 + wristFollow * 0.055),
  );
}

export function createPhoenixAnimation(model: PhoenixModelInstance): PhoenixAnimationEngine {
  let elapsed = 0;
  const cycleRate = Math.PI * 2 * 0.82;
  const wingStates: [WingState, WingState] = [
    { side: model.leftWing.side, elbow: makeSpring(-0.99), wrist: makeSpring(-0.99) },
    { side: model.rightWing.side, elbow: makeSpring(-1), wrist: makeSpring(-1) },
  ];
  const featherFollow = makeSpring(-1);
  const tailFollow = makeSpring(0);
  const bodyFollow = makeSpring(0);
  const legFollow = makeSpring(0);
  const scrollDrive = makeSpring(0);
  const tailBase = model.tailGroup.position.clone();
  const bodyBase = model.bodyGroup.position.clone();
  let wingPhase = 0;

  function update(
    delta: number,
    scrollProgress: number,
    mouse: { x: number; y: number },
    reducedMotion = false,
    scrollSpeed = 0,
  ) {
    if (!reducedMotion) elapsed += Math.min(delta, 0.05);
    const dt = Math.min(delta, 0.05);
    if (!reducedMotion) {
      const scrollTarget = THREE.MathUtils.clamp(Math.abs(scrollSpeed) * 1.35, 0, 1);
      springTo(scrollDrive, scrollTarget, dt, 4.4);
      wingPhase += dt * cycleRate * (1 + scrollDrive.value * 0.2);
    } else {
      scrollDrive.value = 0;
      scrollDrive.velocity = 0;
      wingPhase = 0;
    }
    const scrollEnergy = reducedMotion ? 0 : THREE.MathUtils.clamp(scrollDrive.value, 0, 1);
    const progress = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const time = reducedMotion ? 0 : elapsed;
    const opening = THREE.MathUtils.smoothstep(progress, 0.015, 0.31);
    const ascent = THREE.MathUtils.smoothstep(progress, 0.82, 1);
    const leftPhase = wingPhase - Math.PI * 0.5 - 0.065;
    const rightPhase = wingPhase - Math.PI * 0.5 + 0.065;

    // A gentle phase warp gives the downstroke a decisive power phase and lets
    // the recovery arc take longer. The second harmonic rounds the stroke ends.
    const leftWarp = leftPhase + 0.16 * Math.cos(leftPhase);
    const rightWarp = rightPhase + 0.16 * Math.cos(rightPhase);
    const leftStroke = THREE.MathUtils.clamp(
      (Math.sin(leftWarp) + 0.1 * Math.sin(leftWarp * 2 + 0.24)) / 1.08,
      -1,
      1,
    );
    const rightStroke = THREE.MathUtils.clamp(
      (Math.sin(rightWarp) + 0.1 * Math.sin(rightWarp * 2 + 0.24)) / 1.08,
      -1,
      1,
    );
    const leftPower = Math.max(0, -Math.cos(leftWarp));
    const rightPower = Math.max(0, -Math.cos(rightWarp));
    const stroke = (leftStroke + rightStroke) * 0.5;
    const power = (leftPower + rightPower) * 0.5;

    if (!reducedMotion) {
      springTo(featherFollow, stroke, dt, 10.5);
      springTo(tailFollow, -stroke, dt, 4.8);
      springTo(bodyFollow, stroke, dt, 5.6);
      springTo(legFollow, -stroke, dt, 6.2);
    } else {
      featherFollow.value = 0;
      featherFollow.velocity = 0;
      tailFollow.value = 0;
      tailFollow.velocity = 0;
      bodyFollow.value = 0;
      bodyFollow.velocity = 0;
      legFollow.value = 0;
      legFollow.velocity = 0;
    }

    // These shared shader signals bend batched feathers and pulse their heat
    // without touching React state or allocating per-feather update objects.
    model.motion.uWingSweep.value = reducedMotion ? 0 : featherFollow.value;
    model.motion.uWingLift.value = reducedMotion ? 0 : THREE.MathUtils.clamp(power + scrollEnergy * 0.2, 0, 1);
    model.motion.uTailSway.value = reducedMotion ? 0 : tailFollow.value * 0.04;
    model.motion.uHeadTurn.value = reducedMotion ? 0 : mouse.x * 0.05 + Math.sin(time * 0.38) * 0.014;
    model.motion.uHeadNod.value = reducedMotion ? 0 : -mouse.y * 0.035 + Math.sin(time * 0.58) * 0.012;
    model.motion.uBreath.value = reducedMotion ? 0 : Math.sin(time * 1.45) * 0.058 + power * 0.014;

    poseWing(model.leftWing, wingStates[0], reducedMotion ? 0 : leftStroke, opening, reducedMotion ? 0 : leftPower, mouse, dt, reducedMotion, scrollEnergy);
    poseWing(model.rightWing, wingStates[1], reducedMotion ? 0 : rightStroke, opening, reducedMotion ? 0 : rightPower, mouse, dt, reducedMotion, scrollEnergy);

    const breath = reducedMotion ? 0 : Math.sin(time * 1.45);
    model.bodyMesh.scale.set(1 + breath * 0.009, 1 + breath * 0.018, 1 + breath * 0.012);
    model.bodyGroup.rotation.set(
      reducedMotion ? 0 : -bodyFollow.value * (0.022 + scrollEnergy * 0.008) + Math.sin(time * 0.48) * 0.012,
      reducedMotion ? 0 : mouse.x * 0.018 + Math.sin(time * 0.37) * 0.01,
      reducedMotion ? 0 : Math.sin(time * 0.64) * 0.015 - mouse.x * 0.015 + (leftStroke - rightStroke) * 0.014,
    );
    model.bodyGroup.position.set(
      bodyBase.x + (reducedMotion ? 0 : Math.sin(time * 0.72 + 0.4) * 0.018 + (rightStroke - leftStroke) * 0.012),
      bodyBase.y + (reducedMotion ? 0 : Math.sin(time * 1.12) * 0.022 + bodyFollow.value * 0.018),
      bodyBase.z + (reducedMotion ? 0 : Math.sin(time * 0.58 - 0.3) * 0.014),
    );

    // The inner flight rig owns all idle-flight offsets. Scroll layout remains
    // on the outer experience group, so a chapter update cannot cancel this motion.
    model.flightGroup.position.set(
      reducedMotion ? 0 : Math.sin(time * 0.43) * 0.042 + mouse.x * 0.018 + (rightStroke - leftStroke) * 0.02,
      reducedMotion ? 0 : Math.sin(time * 0.82) * 0.072 + power * (0.082 + scrollEnergy * 0.035) + ascent * 0.035,
      reducedMotion ? 0 : Math.sin(time * 0.51 - 0.4) * 0.032 - power * 0.02,
    );
    model.flightGroup.rotation.set(
      reducedMotion ? 0 : -bodyFollow.value * (0.022 + scrollEnergy * 0.01) + Math.sin(time * 0.42) * 0.009,
      reducedMotion ? 0 : Math.sin(time * 0.38) * 0.012,
      reducedMotion ? 0 : Math.sin(time * 0.46) * 0.016 - mouse.x * 0.012,
    );

    model.headGroup.rotation.set(
      reducedMotion ? 0 : -mouse.y * 0.022 + Math.sin(time * 0.54) * 0.009,
      reducedMotion ? 0 : mouse.x * 0.035 + Math.sin(time * 0.35) * 0.012,
      reducedMotion ? 0 : Math.sin(time * 0.43) * 0.008,
    );
    model.tailGroup.rotation.set(
      reducedMotion ? 0 : tailFollow.value * 0.026 + Math.sin(time * 0.72 - 0.42) * 0.012,
      reducedMotion ? 0 : Math.sin(time * 0.56) * 0.018,
      reducedMotion ? 0 : tailFollow.value * (0.052 + scrollEnergy * 0.018) + Math.sin(time * 0.68 - 0.6) * 0.012,
    );
    model.tailGroup.position.set(
      tailBase.x + (reducedMotion ? 0 : tailFollow.value * 0.012),
      tailBase.y + (reducedMotion ? 0 : tailFollow.value * 0.018),
      tailBase.z + (reducedMotion ? 0 : tailFollow.value * 0.028),
    );

    for (let index = 0; index < model.legs.length; index++) {
      const leg = model.legs[index];
      const side = index === 0 ? -1 : 1;
      const phaseOffset = index === 0 ? 0.24 : -0.16;
      const swing = reducedMotion ? 0 : legFollow.value * 0.12 + Math.sin(time * 0.82 + phaseOffset) * 0.028;
      leg.rotation.set(
        swing,
        reducedMotion ? 0 : Math.sin(time * 0.62 + phaseOffset) * 0.012,
        reducedMotion ? 0 : side * (0.02 + power * 0.025) + Math.sin(time * 0.74 + phaseOffset) * 0.014,
      );
    }

    for (let index = 0; index < model.tipFlames.length; index++) {
      const flame = model.tipFlames[index];
      const flicker = reducedMotion ? 0 : Math.sin(time * (4.0 + (index % 5) * 0.43) + index * 1.7);
      const powerStretch = 1 + power * (index % 3 === 0 ? 0.25 : 0.13) + scrollEnergy * 0.2;
      flame.scale.x = flame.userData.baseScaleX * (0.96 + flicker * 0.1);
      flame.scale.y = flame.userData.baseScaleY * (0.92 + flicker * 0.16) * powerStretch;
    }
  }

  return { update };
}
