export {
	Character,
	Character as FullstackProgrammerCharacter,
	type FullstackProgrammerProps,
	type FullstackProgrammerProps as CharacterProps,
	type Framing,
} from './Character';
export {
	EXPRESSIONS,
	EXPRESSION_NAMES,
	POSES,
	POSE_NAMES,
	mixFace,
	resolveFace,
	resolvePose,
	type ExpressionName,
	type PoseName,
} from './presets';
export {MOTIONS, applyMotion, blinkAt, talkAt, type Motion} from './motion';
export {
	COLORS,
	MOUTH_SHAPES,
	type ArmPose,
	type FaceSpec,
	type HandShape,
	type LegPose,
	type MouthShape,
	type PoseSpec,
} from './rig';
