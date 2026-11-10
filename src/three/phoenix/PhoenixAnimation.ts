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
  shoulder: SpringState;
  elbow: SpringState;
  wrist: SpringState;
}

function makeSpring(value = 0): SpringState {
  return { value, velocity: 0 };
}

function springTo(state: SpringState, target: number, delta: number, frequency: number, damping = 0.9) {
  const dt = Math.min(delta, 0.033);
  const stiffness = frequency * frequency;
  const drag = 2 * frequency * damping;
  const acceleration = (target - state.value) * stiffness - state.velocity * drag;
  state.velocity += acceleration * dt;
  state.value += state.velocity * dt;
}

/** Soft saturation keeps the stroke at natural extremes without a hard clamp. */
function softStroke(value: number) {
  return value / Math.sqrt(1 + value * value * 0.42);
}

function poseWing(
  wing: WingHierarchy,
  state: WingState,
  stroke: number,
  opening: number,
  power: number,
  mouse: { x: number; y: number },
  delta: number,
  scrollEnergy: number,
) {
  const side = state.side;

  // Joints trail the shoulder with progressively lower frequency, producing a
  // travelling wave down the wing instead of a rigid flap.
  springTo(state.shoulder, stroke * 0.9, delta, 9.5);
  springTo(state.elbow, state.shoulder.value, delta, 7.2);
  springTo(state.wrist, state.elbow.value, delta, 5.6);

  const shoulderFollow = state.shoulder.value;
  const elbowFollow = state.elbow.value;
  const wristFollow = state.wrist.value;

  const shoulderFlap = -shoulderFollow * 0.5;
  const elbowFlap = -elbowFollow * 0.32;
  const wristFlap = -wristFollow * 0.36;

  const shoulderSweep = 0.1 + opening * 0.09 + mouse.x * 0.05 + stroke * 0.16 + power * 0.07 + scrollEnergy * 0.1;
  const elbowSweep = mouse.x * 0.035 - elbowFollow * 0.11;
  const wristSweep = 0.03 + wristFollow * 0.13;

  const shoulderPitch = 0.03 + stroke * 0.13 + mouse.y * 0.05;
  const elbowPitch = -elbowFollow * 0.07;
  const wristPitch = wristFollow * 0.09;

  wing.shoulder.rotation.set(
    shoulderPitch,
    side * shoulderSweep,
    side * (0.07 + opening * 0.05 + shoulderFlap),
  );
  wing.elbow.rotation.set(
    elbowPitch,
    side * elbowSweep,
    side * (-0.07 + elbowFlap),
  );
  wing.wrist.rotation.set(
    wristPitch,
    side * wristSweep,
    side * (0.03 + wristFlap),
  );
}

export function createPhoenixAnimation(model: PhoenixModelInstance): PhoenixAnimationEngine {
  let elapsed = 0;
  const cycling = Math.PI * 2 * 0.82; // a slow, weighty wingbeat
  const wingStates: [WingState, WingState] = [
    { side: model.leftWing.side, shoulder: makeSpring(-0.9), elbow: makeSpring(-0.86), wrist: makeSpring(-0.82) },
    { side: model.rightWing.side, shoulder: makeSpring(-0.92), elbow: makeSpring(-0.88), wrist: makeSpring(-0.84) },
  ];
  const featherFollow = makeSpring(-0.9);
  const tailFollow = makeSpring(0);
  const bodyFollow = makeSpring(0);
  const legFollow = makeSpring(0);
  const scrollDrive = makeSpring(0);
  const banking = makeSpring(0);
  const tailBase = model.tailGroup.position.clone();
  const bodyBase = model.bodyGroup.position.clone();
  let wingPhase = 0;

  function update(
    delta: number,
    scrollProgress: number,
    mouse: { x: number; y: number },
    _reducedMotion = false,
    scrollSpeed = 0,
  ) {
    const dt = Math.min(delta, 0.05);
    elapsed += dt;

    const scrollTarget = THREE.MathUtils.clamp(Math.abs(scrollSpeed) * 1.4, 0, 1);
    springTo(scrollDrive, scrollTarget, dt, 4.0, 0.92);
    const scrollEnergy = THREE.MathUtils.clamp(scrollDrive.value, 0, 1);

    // The beat deepens and slows through glides, then accelerates on the climb.
    const glide = 0.5 + 0.5 * Math.sin(elapsed * 0.31);
    const beatGain = 0.68 + 0.32 * glide;
    wingPhase += dt * cycling * beatGain * (1 + scrollEnergy * 0.4);

    const progress = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const time = elapsed;
    const opening = THREE.MathUtils.smoothstep(progress, 0.015, 0.31);
    const ascent = THREE.MathUtils.smoothstep(progress, 0.82, 1);

    // Smooth asymmetric stroke: the powering downstroke is quicker than the
    // recovery, and the phase warp keeps its derivative continuous.
    const leftPhase = wingPhase - Math.PI * 0.5 - 0.05;
    const rightPhase = wingPhase - Math.PI * 0.5 + 0.05;
    const leftWarp = leftPhase + 0.26 * Math.sin(leftPhase);
    const rightWarp = rightPhase + 0.26 * Math.sin(rightPhase);
    const leftStroke = softStroke(Math.sin(leftWarp) * 1.18);
    const rightStroke = softStroke(Math.sin(rightWarp) * 1.18);
    const leftPower = Math.max(0, -Math.cos(leftWarp));
    const rightPower = Math.max(0, -Math.cos(rightWarp));
    const stroke = (leftStroke + rightStroke) * 0.5;
    const power = (leftPower + rightPower) * 0.5;
    const asymmetry = leftStroke - rightStroke;

    springTo(featherFollow, stroke, dt, 10.0, 0.92);
    springTo(tailFollow, -stroke, dt, 3.6, 0.94);
    springTo(bodyFollow, stroke, dt, 5.0, 0.94);
    springTo(legFollow, -stroke, dt, 5.0, 0.94);
    springTo(banking, mouse.x * 0.8 + asymmetry * 0.6, dt, 2.4, 0.95);

    model.motion.uWingSweep.value = featherFollow.value;
    model.motion.uWingLift.value = THREE.MathUtils.clamp(power * 0.85 + scrollEnergy * 0.3, 0, 1);
    model.motion.uTailFlow.value = tailFollow.value * 0.6;
    model.motion.uHeadTurn.value = mouse.x * 0.06 + Math.sin(time * 0.45) * 0.02;
    model.motion.uHeadNod.value = -mouse.y * 0.05 + Math.sin(time * 0.62) * 0.018;
    model.motion.uBreath.value = Math.sin(time * 1.7) * 0.07 + power * 0.025;

    poseWing(model.leftWing, wingStates[0], leftStroke, opening, leftPower, mouse, dt, scrollEnergy);
    poseWing(model.rightWing, wingStates[1], rightStroke, opening, rightPower, mouse, dt, scrollEnergy);

    const breath = Math.sin(time * 1.7);
    model.bodyMesh.scale.set(1 + breath * 0.014, 1 + breath * 0.024, 1 + breath * 0.014);
    model.bodyGroup.rotation.set(
      -bodyFollow.value * 0.045 + Math.sin(time * 0.6) * 0.018,
      mouse.x * 0.035 + Math.sin(time * 0.42) * 0.016,
      banking.value * 0.03 + Math.sin(time * 0.7) * 0.014,
    );
    model.bodyGroup.position.set(
      bodyBase.x + Math.sin(time * 0.7) * 0.025 + asymmetry * 0.018,
      bodyBase.y + Math.sin(time * 1.25) * 0.045 + bodyFollow.value * 0.04,
      bodyBase.z + Math.sin(time * 0.62 - 0.3) * 0.02,
    );

    // Continuous floating kinematics of the outer flight rig.
    model.flightGroup.position.set(
      Math.sin(time * 0.55) * 0.07 + mouse.x * 0.1 + asymmetry * 0.025,
      Math.sin(time * 1.3) * 0.11 + power * 0.17 + scrollEnergy * 0.07 + ascent * 0.04,
      Math.sin(time * 0.64 - 0.4) * 0.07 - power * 0.045 - scrollEnergy * 0.2,
    );
    model.flightGroup.rotation.set(
      Math.sin(time * 1.3) * 0.03 - stroke * 0.045 - scrollEnergy * 0.05,
      Math.sin(time * 0.46) * 0.025 + mouse.x * 0.09,
      Math.sin(time * 0.62) * 0.03 - banking.value * 0.02,
    );

    model.headGroup.rotation.set(
      -mouse.y * 0.1 + Math.sin(time * 1.05) * 0.03,
      mouse.x * 0.16 + Math.sin(time * 0.7) * 0.03,
      Math.sin(time * 0.8) * 0.02 - banking.value * 0.012,
    );
    model.tailGroup.rotation.set(
      tailFollow.value * 0.12 + Math.sin(time * 1.4 - 0.5) * 0.08,
      Math.sin(time * 0.7) * 0.05 + mouse.x * 0.035,
      tailFollow.value * 0.09 + Math.sin(time * 1.05 - 0.4) * 0.06,
    );
    model.tailGroup.position.set(
      tailBase.x + tailFollow.value * 0.02,
      tailBase.y + tailFollow.value * 0.04,
      tailBase.z + tailFollow.value * 0.05,
    );

    // Tucked legs: a barely perceptible settle, no dangling.
    for (let index = 0; index < model.legs.length; index++) {
      const leg = model.legs[index];
      const side = index === 0 ? -1 : 1;
      const phaseOffset = index === 0 ? 0.3 : -0.2;
      leg.rotation.set(
        0.12 + legFollow.value * 0.035 + Math.sin(time * 0.9 + phaseOffset) * 0.012,
        Math.sin(time * 0.6 + phaseOffset) * 0.012,
        side * 0.05 + Math.sin(time * 0.8 + phaseOffset) * 0.01,
      );
    }
  }

  return { update };
}
