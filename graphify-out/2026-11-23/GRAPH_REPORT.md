# Graph Report - remotion  (2026-11-23)

## Corpus Check
- 178 files · ~90,460 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 5)

## Summary
- 1193 nodes · 3954 edges · 61 communities (60 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 77 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4968bec6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- hacker/index.ts
- character/README.md
- P2
- Remotion Video Project
- PropShadow
- package.json
- character/index.ts
- HowJwtWorks.tsx
- PROP_COLORS
- shared/ui.tsx
- boss/Body.tsx
- v3
- remotion
- project_manager/Body.tsx
- shared/presets.ts
- hacker/Head.tsx
- quality_assurance/Body.tsx
- woman/Body.tsx
- react
- Session.tsx
- HandShape
- doctor/Body.tsx
- CharacterRigCanvas
- computeTorsoGeometry
- body.tsx
- hacker/Body.tsx
- PoseSpec
- backend_programmer/Body.tsx
- man/Body.tsx
- PottedPlant.tsx
- shared/rig.ts
- generate-audio.mjs
- resolveFace
- Cara membaca script ini
- Cara membaca script ini
- how-jwt-works/theme.ts
- CoffeeMug.tsx
- Whiteboard.tsx
- Smartphone.tsx
- DatabaseCylinder.tsx
- Cara Menggunakan & Memasangkan dengan Karakter
- Trophy.tsx
- tech_lead/Body.tsx
- Playbook Video Motion Graphic Teknologi (Remotion)
- how-jwt-works/Thumbnail.tsx
- man/index.ts
- shared/motion.ts
- backend_programmer/Head.tsx
- frontend_programmer/Head.tsx
- man/Head.tsx
- tech_lead/index.ts
- Signature.tsx
- Wristband.tsx
- TypeScript Compiler Config
- Root.tsx
- boss/Head.tsx
- face.tsx
- ServerRack.tsx
- property/index.ts
- Graphify Claude Workflow Docs

## God Nodes (most connected - your core abstractions)
1. `react` - 97 edges
2. `useLook()` - 70 edges
3. `remotion` - 59 edges
4. `Card()` - 56 edges
5. `Reveal()` - 55 edges
6. `Pill()` - 42 edges
7. `PropShadow()` - 40 edges
8. `computeTorsoGeometry()` - 38 edges
9. `SceneShell()` - 38 edges
10. `CharacterRigCanvas()` - 36 edges

## Surprising Connections (you probably didn't know these)
- `Modul Bersama (`src/assets/character/shared`)` --references--> `SkullShapeParams`  [INFERRED]
  src/assets/character/README.md → src/assets/character/shared/face.tsx
- `Memasang dubbing` --references--> `HowOauthWorks()`  [INFERRED]
  src/content/how-oauth-works/script_dubbing.md → src/content/how-oauth-works/HowOauthWorks.tsx
- `Memasang dubbing` --references--> `HowJwtWorks()`  [INFERRED]
  src/content/how-jwt-works/script_dubbing.md → src/content/how-jwt-works/HowJwtWorks.tsx
- `11. Thumbnail cover 3:4 (WAJIB untuk setiap video)` --references--> `ChannelBadge()`  [INFERRED]
  src/content/PROMPT_TECH_VIDEO.md → src/content/shared/ChannelOutro.tsx
- `Kustomisasi` --references--> `FaceSpec`  [INFERRED]
  src/assets/character/man/README.md → src/assets/character/shared/rig.ts

## Import Cycles
- None detected.

## Communities (61 total, 1 thin omitted)

### Community 0 - "hacker/index.ts"
Cohesion: 0.15
Nodes (22): BackendProgrammerProps, BossProps, ChefProps, DoctorProps, FrontendProgrammerProps, FullstackProgrammerProps, HackerProps, ProjectManagerProps (+14 more)

### Community 1 - "character/README.md"
Cohesion: 0.05
Nodes (34): Boss / Executive: Master Character Rig (`src/assets/character/boss`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter, Chef: Culinary Analogy Character Rig (`src/assets/character/chef`), Identitas & Panduan Peran (Reusable di Berbagai Plot) (+26 more)

### Community 2 - "P2"
Cohesion: 0.06
Nodes (41): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, FACE_CFG (+33 more)

### Community 3 - "Remotion Video Project"
Cohesion: 0.50
Nodes (4): Remotion CLI Workflow, Remotion Company License, Remotion Fundamentals Documentation, Remotion Video Project

### Community 4 - "PropShadow"
Cohesion: 0.09
Nodes (25): DesktopComputerInner(), DesktopComputerProps, SCREEN_MODES, TOWER_SIDES, TowerSide, BADGES_LIST, COLORS_LIST, LaptopBadge (+17 more)

### Community 5 - "package.json"
Cohesion: 0.06
Nodes (40): allowScripts, esbuild, dependencies, react@19.3.1, react-dom@19.3.1, react-icons@^5.7.0, remotion@4.0.543, @remotion/cli@4.0.543 (+32 more)

### Community 6 - "character/index.ts"
Cohesion: 0.13
Nodes (23): Character, Character, Character, Character, Character, Character, Character, Character (+15 more)

### Community 7 - "HowJwtWorks.tsx"
Cohesion: 0.26
Nodes (9): HowJwtWorks(), HowJwtWorksProps, SCENE_SECONDS, TOTAL_SECONDS, Countdown(), Expiry(), Stage(), TokenRow() (+1 more)

### Community 8 - "PROP_COLORS"
Cohesion: 0.09
Nodes (24): BugInner(), BugProps, BugState, SPOTS, STATES, LENSES, MagnifierLens, MagnifyingGlassProps (+16 more)

### Community 9 - "shared/ui.tsx"
Cohesion: 0.05
Nodes (159): RFC-6749, RFC-7636, react-icons, Flow(), Compare(), current(), EXPRESSIONS, Hacker() (+151 more)

### Community 10 - "boss/Body.tsx"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, DRESS_SHOE_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+5 more)

### Community 11 - "v3"
Cohesion: 0.33
Nodes (21): Head(), Head(), Head(), Head(), Head(), Head(), Head(), Head() (+13 more)

### Community 12 - "remotion"
Cohesion: 0.12
Nodes (16): remotion, BriefcaseInner(), BriefcaseProps, BriefcaseVariant, PALETTES, VARIANTS, CloudServiceInner(), CloudServiceProps (+8 more)

### Community 13 - "project_manager/Body.tsx"
Cohesion: 0.18
Nodes (17): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), PM_SHOE_SIZE, TORSO, Torso() (+9 more)

### Community 14 - "shared/presets.ts"
Cohesion: 0.12
Nodes (10): BROW, EYE, mixBrow(), mixEye(), mixFace(), NEUTRAL, RELAXED, STAND (+2 more)

### Community 15 - "hacker/Head.tsx"
Cohesion: 0.21
Nodes (15): FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS (+7 more)

### Community 16 - "quality_assurance/Body.tsx"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), QA_SHOE_SIZE, TORSO, Torso() (+5 more)

### Community 17 - "woman/Body.tsx"
Cohesion: 0.30
Nodes (12): Solid(), Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+4 more)

### Community 18 - "react"
Cohesion: 0.14
Nodes (12): react, ClipboardInner(), ClipboardProps, ClipboardVariant, VARIANTS, LightbulbProps, PackageBoxInner(), PackageBoxProps (+4 more)

### Community 19 - "Session.tsx"
Cohesion: 0.18
Nodes (11): Row(), ROWS, SERVERS, Session(), SessionTable(), Stage(), BUBBLES, LoginCard() (+3 more)

### Community 20 - "HandShape"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, CLOG_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+5 more)

### Community 21 - "doctor/Body.tsx"
Cohesion: 0.26
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+5 more)

### Community 22 - "CharacterRigCanvas"
Cohesion: 0.31
Nodes (11): Arm(), BODY_PALETTE, GroundShadow(), INNER_HEM, Leg(), Neck(), TORSO, Torso() (+3 more)

### Community 23 - "computeTorsoGeometry"
Cohesion: 0.28
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+4 more)

### Community 24 - "body.tsx"
Cohesion: 0.20
Nodes (15): DEFAULT_SHOE_SIZE, Hand(), HandDef, HandPart, HANDS, KNUCKLES, Leg(), pts() (+7 more)

### Community 25 - "hacker/Body.tsx"
Cohesion: 0.28
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+4 more)

### Community 26 - "PoseSpec"
Cohesion: 0.15
Nodes (14): Bentuk mulut (lip sync), Berjalan dan berlari, Ekspresi (32), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Kustomisasi, Mascot: Master Character Rig (+6 more)

### Community 27 - "backend_programmer/Body.tsx"
Cohesion: 0.26
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+5 more)

### Community 28 - "man/Body.tsx"
Cohesion: 0.26
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+5 more)

### Community 29 - "PottedPlant.tsx"
Cohesion: 0.19
Nodes (12): Cactus(), MONSTERA, Monstera(), PlantVariant, POT_COLORS, PotColor, POTS, PottedPlantInner() (+4 more)

### Community 30 - "shared/rig.ts"
Cohesion: 0.15
Nodes (23): ArmRenderProps, CharacterRigConfig, FRAMINGS, HeadRenderProps, LegRenderProps, TorsoRenderProps, VIEWBOX, add() (+15 more)

### Community 31 - "generate-audio.mjs"
Cohesion: 0.08
Nodes (37): add(), arp, bass(), bus(), CH, chordEp(), clap(), claps (+29 more)

### Community 32 - "resolveFace"
Cohesion: 0.15
Nodes (14): Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter, Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot) (+6 more)

### Community 33 - "Cara membaca script ini"
Cohesion: 0.12
Nodes (16): Cara membaca script ini, Memasang dubbing, Scene 10 — Pengaman ekstra: PKCE, Scene 11 — Rangkuman, Scene 12 — Outro channel, Scene 1 — Hook, Scene 2 — Masalahnya, Scene 3 — Cara lama: kasih password (+8 more)

### Community 34 - "Cara membaca script ini"
Cohesion: 0.12
Nodes (15): Cara membaca script ini, Memasang dubbing, Scene 10 — Masa berlaku, Scene 11 — Rangkuman, Scene 12 — Outro channel, Scene 1 — Hook, Scene 2 — Server itu pelupa, Scene 3 — Cara lama: session (+7 more)

### Community 35 - "how-jwt-works/theme.ts"
Cohesion: 0.24
Nodes (9): Anatomy(), PART_AT, PartCard(), DECODED, Decoded(), NEVER, NeverRow(), NotEncrypted() (+1 more)

### Community 36 - "CoffeeMug.tsx"
Cohesion: 0.25
Nodes (7): CoffeeMugColor, CoffeeMugInner(), CoffeeMugProps, CoffeeMugVariant, COLORS_LIST, PALETTES, VARIANTS

### Community 37 - "Whiteboard.tsx"
Cohesion: 0.33
Nodes (4): MODES, WhiteboardInner(), WhiteboardMode, WhiteboardProps

### Community 38 - "Smartphone.tsx"
Cohesion: 0.25
Nodes (7): FRAME_COLORS, PALETTES, SCREENS, SmartphoneFrameColor, SmartphoneInner(), SmartphoneProps, SmartphoneScreen

### Community 39 - "DatabaseCylinder.tsx"
Cohesion: 0.29
Nodes (5): DatabaseCylinderInner(), DatabaseCylinderProps, DatabaseVariant, PALETTE, VARIANTS

### Community 40 - "Cara Menggunakan & Memasangkan dengan Karakter"
Cohesion: 0.29
Nodes (6): 1. Karakter Mengetik di Meja Kerja (`pose="typing"`), 2. Analogi Tutorial: Chef Menyajikan HTML / JSON, 3. Analogi Sistem & Server Down: Doctor + Monitor ECG + ServerRack, Cara Menggunakan & Memasangkan dengan Karakter, Daftar Properti & Variannya, Reusable Character Properties (`src/assets/property/`)

### Community 41 - "Trophy.tsx"
Cohesion: 0.33
Nodes (6): PALETTES, star(), TrophyInner(), TrophyProps, TrophyVariant, VARIANTS

### Community 42 - "tech_lead/Body.tsx"
Cohesion: 0.38
Nodes (10): computeTorsoGeometry(), Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+2 more)

### Community 43 - "Playbook Video Motion Graphic Teknologi (Remotion)"
Cohesion: 0.08
Nodes (24): 0. Cara pakai (untuk manusia), 10. Format `script_dubbing.md` (WAJIB persis), 11. Thumbnail cover 3:4 (WAJIB untuk setiap video), 13. Alur kerja, 14. Definition of Done (WAJIB, centang semua), 15. Laporan akhir (Bahasa Indonesia), 1. Input, 2. Konteks proyek (WAJIB dibaca sebelum merancang) (+16 more)

### Community 44 - "how-jwt-works/Thumbnail.tsx"
Cohesion: 0.17
Nodes (5): Cover(), HowJwtWorksThumbnail(), Payload(), Question(), Title()

### Community 45 - "man/index.ts"
Cohesion: 0.20
Nodes (5): CharacterProps, blinkAt(), EXPRESSION_NAMES, solveArm, solveLeg

### Community 46 - "shared/motion.ts"
Cohesion: 0.27
Nodes (5): applyMotion(), applyWave(), cycle(), swings(), VISEMES

### Community 47 - "backend_programmer/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, D2R

### Community 48 - "frontend_programmer/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, FaceConfig

### Community 49 - "man/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, FaceSpec

### Community 50 - "tech_lead/index.ts"
Cohesion: 0.25
Nodes (4): EXPRESSIONS, TechLeadProps, solveArm, solveLeg

### Community 51 - "Signature.tsx"
Cohesion: 0.53
Nodes (5): Machine(), Signature(), SPINS, Stage(), SubValue()

### Community 52 - "Wristband.tsx"
Cohesion: 0.53
Nodes (5): Band(), Stage(), StageCard(), STAGES, Wristband()

### Community 54 - "TypeScript Compiler Config"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 56 - "Root.tsx"
Cohesion: 0.12
Nodes (4): Character, TOTAL_SECONDS, RigDemo(), RemotionRoot()

### Community 58 - "boss/Head.tsx"
Cohesion: 0.12
Nodes (16): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, FACE_CFG (+8 more)

### Community 59 - "face.tsx"
Cohesion: 0.21
Nodes (11): buildHairCapPath(), ell(), evalHairline(), FacePalette, GlassesShape, GlassesSpec, HeadProjection, MouthDef (+3 more)

### Community 61 - "ServerRack.tsx"
Cohesion: 0.33
Nodes (4): ServerRackInner(), ServerRackProps, ServerStatus, STATUSES

### Community 78 - "property/index.ts"
Cohesion: 0.21
Nodes (25): Briefcase, Bug, Clipboard, CloudService, CoffeeMug, DatabaseCylinder, DesktopComputer, Laptop (+17 more)

### Community 89 - "Graphify Claude Workflow Docs"
Cohesion: 0.50
Nodes (4): graphify-out/graph.json, Graphify Knowledge Graph, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md

## Knowledge Gaps
- **7 isolated node(s):** `RFC-6749`, `RFC-7636`, `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 423 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `P2`, `PropShadow`, `package.json`, `character/index.ts`, `HowJwtWorks.tsx`, `PROP_COLORS`, `shared/ui.tsx`, `boss/Body.tsx`, `remotion`, `project_manager/Body.tsx`, `hacker/Head.tsx`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `Session.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `body.tsx`, `hacker/Body.tsx`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `shared/rig.ts`, `how-jwt-works/theme.ts`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `tech_lead/Body.tsx`, `how-jwt-works/Thumbnail.tsx`, `backend_programmer/Head.tsx`, `frontend_programmer/Head.tsx`, `man/Head.tsx`, `Signature.tsx`, `Wristband.tsx`, `Root.tsx`, `boss/Head.tsx`, `face.tsx`, `ServerRack.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.417) - this node is a cross-community bridge._
- **What connects `RFC-6749`, `RFC-7636`, `Remotion CLI Workflow` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `hacker/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14693446088794926 - nodes in this community are weakly interconnected._
- **Why does `remotion` connect `remotion` to `PropShadow`, `package.json`, `character/index.ts`, `HowJwtWorks.tsx`, `PROP_COLORS`, `shared/ui.tsx`, `boss/Body.tsx`, `project_manager/Body.tsx`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `react`, `Session.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `hacker/Body.tsx`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `shared/rig.ts`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `tech_lead/Body.tsx`, `shared/motion.ts`, `Signature.tsx`, `Wristband.tsx`, `Root.tsx`, `ServerRack.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Should `character/README.md` be split into smaller, more focused modules?**
  _Cohesion score 0.04717853839037928 - nodes in this community are weakly interconnected._
- **Why does `Playbook Video Motion Graphic Teknologi (Remotion)` connect `Playbook Video Motion Graphic Teknologi (Remotion)` to `shared/ui.tsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `P2` be split into smaller, more focused modules?**
  _Cohesion score 0.06280193236714976 - nodes in this community are weakly interconnected._