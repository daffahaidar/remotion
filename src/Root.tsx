import { Composition, Folder, Still } from "remotion";
import { Character } from "../character";
import { ModelSheet } from "./ModelSheet";
import { RigDemo } from "./RigDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Mascot">
      <Composition
        id="MascotRig"
        component={Character}
        width={1080}
        height={1080}
        fps={30}
        durationInFrames={150}
        defaultProps={{
          expression: "neutral",
          pose: "idle",
          yaw: 0,
          talking: false,
          style: { translate: "120px 90px" },
        }}
      />
      <Composition
        id="RigDemo"
        component={RigDemo}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={540}
      />
      <Still
        id="ModelSheet"
        component={ModelSheet}
        width={2400}
        height={5380}
      />
    </Folder>
  );
};
