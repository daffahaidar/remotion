import React from 'react';
import {Interactive} from 'remotion';
import {BASE_CHARACTER_SCHEMA, CharacterRigCanvas, type CharacterProps} from '../shared/characterRig';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {RIG} from './rig';

export type {Framing} from '../shared/characterRig';

export type TechLeadProps = CharacterProps & {
	/** Toggle gunmetal oval glasses (default: true). */
	readonly showGlasses?: boolean;
	/** Toggle short chin goatee (default: true). */
	readonly showGoatee?: boolean;
	/** Toggle subtle tired under-eye lines (default: true). */
	readonly showUnderEyeBags?: boolean;
};

const CharacterInner: React.FC<TechLeadProps> = (props) => (
	<CharacterRigCanvas
		props={props}
		config={{
			rig: RIG,
			defaultSeed: 'tech-lead',
			uidPrefix: 'tl',
			renderShadow: (lift) => <GroundShadow lift={lift} />,
			renderNeck: () => <Neck />,
			renderTorso: ({yaw, shrug, uid}) => <Torso yaw={yaw} shrug={shrug} uid={uid} />,
			renderArm: (armProps) => <Arm {...armProps} />,
			renderLeg: (legProps) => <Leg {...legProps} />,
			renderHead: (headProps, extra) => (
				<Head
					{...headProps}
					showGlasses={extra.showGlasses ?? true}
					showGoatee={extra.showGoatee ?? true}
					showUnderEyeBags={extra.showUnderEyeBags ?? true}
				/>
			),
		}}
	/>
);

/** Tech Lead mascot rig with longer angular facial posture, flannel overshirt, and seasoned dev vibe. */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'TechLeadCharacter',
	schema: {
		...BASE_CHARACTER_SCHEMA,
		showGlasses: {type: 'boolean', default: true, description: 'Show glasses'},
		showGoatee: {type: 'boolean', default: true, description: 'Show goatee'},
		showUnderEyeBags: {type: 'boolean', default: true, description: 'Show tired eye lines'},
	},
});
