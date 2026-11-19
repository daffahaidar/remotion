import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {Framing} from '../shared/characterRig';

export type ChefProps = CharacterProps & {
	/** Toggle pleated chef hat (default: true). */
	readonly showHat?: boolean;
	/** Toggle curled chef mustache (default: true). */
	readonly showMustache?: boolean;
};

const CharacterInner: React.FC<ChefProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'chef',
			uidPrefix: 'cf',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}) => <Torso yaw={yaw} shrug={shrug} uid={uid} />,
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps, extra) => (
				<Head {...headProps} showHat={extra.showHat ?? true} showMustache={extra.showMustache ?? true} />
			),
		}}
	/>
);

/** Chef mascot rig for culinary analogies (SSR/API kitchens, queues, batching) and skits. */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'ChefCharacter',
	schema: {
		...BASE_CHARACTER_SCHEMA,
		showHat: {type: 'boolean', default: true, description: 'Show chef hat'},
		showMustache: {type: 'boolean', default: true, description: 'Show mustache'},
	},
});
