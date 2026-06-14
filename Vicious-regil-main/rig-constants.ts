
export const DEFAULT_CANVAS_W = 320;
export const DEFAULT_CANVAS_H = 400;
export const GRID_SIZE = 16;
export const POINT_RADIUS = 8;

export type PointName = 
  | 'head' 
  | 'torsoTop' | 'torsoBottom'
  | 'shoulderL' | 'elbowL' | 'handL'
  | 'shoulderR' | 'elbowR' | 'handR'
  | 'hipL' | 'kneeL' | 'footL'
  | 'hipR' | 'kneeR' | 'footR';

export type ViewType = 'front' | 'back' | 'top';
export type Expression = 'neutral' | 'smile' | 'cry' | 'yell' | 'closed';

export type PosePoint = {
  x: number;
  y: number;
};

export type Keyframe = Record<PointName, PosePoint> & { expression?: Expression };

export interface CanvasDimensions {
  width: number;
  height: number;
}

export const POINT_META: Record<PointName, { label: string; color: string; category: string }> = {
  head: { label: "HEAD", color: "#FBBF24", category: "core" },
  torsoTop: { label: "SHOULDERS", color: "#5E81F3", category: "core" },
  torsoBottom: { label: "HIPS", color: "#5E81F3", category: "core" },
  shoulderL: { label: "L.SHOULDER", color: "#94D4F1", category: "limbs" },
  elbowL: { label: "L.ELBOW", color: "#94D4F1", category: "limbs" },
  handL: { label: "L.HAND", color: "#FFFFFF", category: "extremities" },
  shoulderR: { label: "R.SHOULDER", color: "#94D4F1", category: "limbs" },
  elbowR: { label: "R.ELBOW", color: "#94D4F1", category: "limbs" },
  handR: { label: "R.HAND", color: "#FFFFFF", category: "extremities" },
  hipL: { label: "L.HIP", color: "#A78BFA", category: "limbs" },
  kneeL: { label: "L.KNEE", color: "#A78BFA", category: "limbs" },
  footL: { label: "L.FOOT", color: "#FFFFFF", category: "extremities" },
  hipR: { label: "R.HIP", color: "#A78BFA", category: "limbs" },
  kneeR: { label: "R.KNEE", color: "#A78BFA", category: "limbs" },
  footR: { label: "R.FOOT", color: "#FFFFFF", category: "extremities" },
};

export const BONES: [PointName, PointName][] = [
  ["head", "torsoTop"],
  ["torsoTop", "torsoBottom"],
  ["torsoTop", "shoulderL"],
  ["shoulderL", "elbowL"],
  ["elbowL", "handL"],
  ["torsoTop", "shoulderR"],
  ["shoulderR", "elbowR"],
  ["elbowR", "handR"],
  ["torsoBottom", "hipL"],
  ["hipL", "kneeL"],
  ["kneeL", "footL"],
  ["torsoBottom", "hipR"],
  ["hipR", "kneeR"],
  ["kneeR", "footR"],
];

const BASE_POSE: Keyframe = {
  head: { x: 160, y: 50 },
  torsoTop: { x: 160, y: 100 },
  torsoBottom: { x: 160, y: 220 },
  shoulderL: { x: 130, y: 110 },
  elbowL: { x: 100, y: 140 },
  handL: { x: 80, y: 180 },
  shoulderR: { x: 190, y: 110 },
  elbowR: { x: 220, y: 140 },
  handR: { x: 240, y: 180 },
  hipL: { x: 140, y: 230 },
  kneeL: { x: 135, y: 300 },
  footL: { x: 130, y: 370 },
  hipR: { x: 180, y: 230 },
  kneeR: { x: 185, y: 300 },
  footR: { x: 190, y: 370 },
  expression: 'neutral'
};

export const TEMPLATES: Record<string, Keyframe> = {
  "T-Pose": { ...BASE_POSE },
  "Stand": {
    ...BASE_POSE,
    elbowL: { x: 125, y: 150 },
    handL: { x: 120, y: 200 },
    elbowR: { x: 195, y: 150 },
    handR: { x: 200, y: 200 },
    kneeL: { x: 140, y: 300 },
    footL: { x: 140, y: 370 },
    kneeR: { x: 180, y: 300 },
    footR: { x: 180, y: 370 },
  },
  "Action-Climb": {
    ...BASE_POSE,
    handL: { x: 100, y: 40 },
    elbowL: { x: 110, y: 80 },
    handR: { x: 220, y: 60 },
    elbowR: { x: 200, y: 100 },
    kneeL: { x: 110, y: 240 },
    footL: { x: 130, y: 200 },
    kneeR: { x: 210, y: 280 },
    footR: { x: 190, y: 340 },
  },
  "Action-Spin": {
    ...BASE_POSE,
    torsoTop: { x: 165, y: 100 },
    shoulderL: { x: 180, y: 110 },
    elbowL: { x: 210, y: 110 },
    handL: { x: 250, y: 100 },
    shoulderR: { x: 140, y: 110 },
    elbowR: { x: 110, y: 110 },
    handR: { x: 70, y: 100 },
  },
  "Action-Fall": {
    ...BASE_POSE,
    head: { x: 180, y: 300 },
    torsoTop: { x: 160, y: 240 },
    torsoBottom: { x: 120, y: 180 },
    handL: { x: 240, y: 340 },
    handR: { x: 200, y: 100 },
    kneeL: { x: 100, y: 220 },
    kneeR: { x: 140, y: 120 },
  },
  "Action-Laugh": {
    ...BASE_POSE,
    expression: 'smile',
    head: { x: 160, y: 45 },
    elbowL: { x: 110, y: 160 },
    handL: { x: 130, y: 100 },
    elbowR: { x: 210, y: 160 },
    handR: { x: 190, y: 100 },
  },
  "Action-Cry": {
    ...BASE_POSE,
    expression: 'cry',
    head: { x: 160, y: 60 },
    handL: { x: 140, y: 60 },
    handR: { x: 180, y: 60 },
  },
  "Action-Yell": {
    ...BASE_POSE,
    expression: 'yell',
    head: { x: 170, y: 40 },
    handL: { x: 60, y: 80 },
    handR: { x: 260, y: 80 },
  }
};
