import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {Framing} from '../shared/characterRig';

export type DoctorProps = CharacterProps & {
	/** Toggle slim oval doctor glasses (default: true). */
	readonly showGlasses?: boolean;
	/** Toggle stethoscope around neck (default: true). */
	readonly showStethoscope?: boolean;
};

const CharacterInner: React.FC<DoctorProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'doctor',
			uidPrefix: 'dr',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}, extra) => (
				<Torso yaw={yaw} shrug={shrug} uid={uid} showStethoscope={extra.showStethoscope ?? true} />
			),
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps, extra) => <Head {...headProps} showGlasses={extra.showGlasses ?? true} />,
		}}
	/>
);

/** Doctor mascot rig for diagnostic analogies (health checks, debugging, security vaccines) and skits. */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'DoctorCharacter',
	schema: {
		...BASE_CHARACTER_SCHEMA,
		showGlasses: {type: 'boolean', default: true, description: 'Show glasses'},
		showStethoscope: {type: 'boolean', default: true, description: 'Show stethoscope'},
	},
});
