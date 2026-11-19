import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {Framing} from '../shared/characterRig';

export type QualityAssuranceProps = CharacterProps & {
	/** Toggle crimson cat-eye glasses (default: true). */
	readonly showGlasses?: boolean;
	/** Toggle QA bug & checkmark chest badge (default: true). */
	readonly showBadge?: boolean;
};

const CharacterInner: React.FC<QualityAssuranceProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'quality-assurance',
			uidPrefix: 'qa',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}, extra) => (
				<Torso yaw={yaw} shrug={shrug} uid={uid} showBadge={extra.showBadge ?? true} />
			),
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps, extra) => <Head {...headProps} showGlasses={extra.showGlasses ?? true} />,
		}}
	/>
);

/** Quality Assurance (QA) mascot rig with observant narrow face, crimson cat-eye glasses, and bug/check badge. */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'QualityAssuranceCharacter',
	schema: {
		...BASE_CHARACTER_SCHEMA,
		showGlasses: {type: 'boolean', default: true, description: 'Show glasses'},
		showBadge: {type: 'boolean', default: true, description: 'Show QA badge'},
	},
});
