import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {Framing} from '../shared/characterRig';

export type BossProps = CharacterProps & {
	/** Toggle sleek executive half-rim glasses (default: false). */
	readonly showGlasses?: boolean;
	/** Toggle executive mustache (default: true). */
	readonly showMustache?: boolean;
};

const CharacterInner: React.FC<BossProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'boss',
			uidPrefix: 'bs',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}) => <Torso yaw={yaw} shrug={shrug} uid={uid} />,
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps, extra) => (
				<Head
					{...headProps}
					showGlasses={extra.showGlasses ?? false}
					showMustache={extra.showMustache ?? true}
				/>
			),
		}}
	/>
);

/**
 * Boss / Executive mascot character rig.
 * Broad square-jawed facial posture, slicked-back silver-streaked hair, and tailored power suit.
 */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'BossCharacter',
	schema: {
		...BASE_CHARACTER_SCHEMA,
		showGlasses: {type: 'boolean', default: false, description: 'Show glasses'},
		showMustache: {type: 'boolean', default: true, description: 'Show mustache'},
	},
});
