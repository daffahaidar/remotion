import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {CharacterProps, Framing} from '../shared/characterRig';

const CharacterInner: React.FC<CharacterProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'mascot',
			uidPrefix: 'c',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}) => <Torso yaw={yaw} shrug={shrug} uid={uid} />,
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps) => <Head {...headProps} />,
		}}
	/>
);

/**
 * The mascot. Every prop in the schema below can be edited and keyframed in
 * Remotion Studio. Place and size it with `style` (translate / scale).
 */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'Character',
	schema: BASE_CHARACTER_SCHEMA,
});
