import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {Framing} from '../shared/characterRig';

export type HackerProps = CharacterProps & {
	/** Toggle hoodie hood UP over head (default: true). */
	readonly hoodUp?: boolean;
	/** Toggle stealth cyber face mask (default: false). */
	readonly showMask?: boolean;
	/** Toggle matrix `01` chest emblem (default: true). */
	readonly showBadge?: boolean;
};

const CharacterInner: React.FC<HackerProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'hacker',
			uidPrefix: 'hk',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}, extra) => (
				<Torso yaw={yaw} shrug={shrug} uid={uid} showBadge={extra.showBadge ?? true} />
			),
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps, extra) => (
				<Head {...headProps} hoodUp={extra.hoodUp ?? true} showMask={extra.showMask ?? false} />
			),
		}}
	/>
);

/** Hacker mascot rig with sharp V-chin posture, stealth hood UP, matrix-green accents, and optional mask. */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'HackerCharacter',
	schema: {
		...BASE_CHARACTER_SCHEMA,
		hoodUp: {type: 'boolean', default: true, description: 'Hood up'},
		showMask: {type: 'boolean', default: false, description: 'Show cyber mask'},
		showBadge: {type: 'boolean', default: true, description: 'Show 01 badge'},
	},
});
