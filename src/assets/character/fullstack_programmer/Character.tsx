import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {Framing} from '../shared/characterRig';

export type FullstackProgrammerProps = CharacterProps & {
	/** Toggle backwards tech baseball cap (default: true). */
	readonly showCap?: boolean;
	/** Toggle `{</>}` chest emblem (default: true). */
	readonly showBadge?: boolean;
};

const CharacterInner: React.FC<FullstackProgrammerProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'fullstack-programmer',
			uidPrefix: 'fs',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}, extra) => (
				<Torso yaw={yaw} shrug={shrug} uid={uid} showBadge={extra.showBadge ?? true} />
			),
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps, extra) => <Head {...headProps} showCap={extra.showCap ?? true} />,
		}}
	/>
);

/** Fullstack Programmer mascot rig combining Frontend cyan and Backend emerald identity. */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'FullstackProgrammerCharacter',
	schema: {
		...BASE_CHARACTER_SCHEMA,
		showCap: {type: 'boolean', default: true, description: 'Show backwards cap'},
		showBadge: {type: 'boolean', default: true, description: 'Show {</>} badge'},
	},
});
