import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {Framing} from '../shared/characterRig';

export type FrontendProgrammerProps = CharacterProps & {
	/** Toggle designer glasses (default: true). */
	readonly showGlasses?: boolean;
	/** Toggle `</>` chest emblem (default: true). */
	readonly showBadge?: boolean;
};

const CharacterInner: React.FC<FrontendProgrammerProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'frontend-programmer',
			uidPrefix: 'fe',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}, extra) => (
				<Torso yaw={yaw} shrug={shrug} uid={uid} showBadge={extra.showBadge ?? true} />
			),
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps, extra) => (
				<Head {...headProps} showGlasses={extra.showGlasses ?? true} />
			),
		}}
	/>
);

/**
 * Frontend Programmer mascot character rig.
 * All props can be animated in code or edited/keyframed directly in Remotion Studio.
 */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'FrontendProgrammerCharacter',
	schema: {
		...BASE_CHARACTER_SCHEMA,
		showGlasses: {type: 'boolean', default: true, description: 'Show glasses'},
		showBadge: {type: 'boolean', default: true, description: 'Show </> badge'},
	},
});
