import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {Framing} from '../shared/characterRig';

export type ProjectManagerProps = CharacterProps & {
	/** Toggle cat-eye glasses (default: true). */
	readonly showGlasses?: boolean;
	/** Toggle office lanyard & ID card (default: true). */
	readonly showLanyard?: boolean;
};

const CharacterInner: React.FC<ProjectManagerProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'project-manager',
			uidPrefix: 'pm',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}, extra) => (
				<Torso yaw={yaw} shrug={shrug} uid={uid} showLanyard={extra.showLanyard ?? true} />
			),
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps, extra) => (
				<Head {...headProps} showGlasses={extra.showGlasses ?? true} />
			),
		}}
	/>
);

/** Project Manager mascot rig with diamond V-chin face posture, high ponytail, and office lanyard. */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'ProjectManagerCharacter',
	schema: {
		...BASE_CHARACTER_SCHEMA,
		showGlasses: {type: 'boolean', default: true, description: 'Show glasses'},
		showLanyard: {type: 'boolean', default: true, description: 'Show lanyard'},
	},
});
