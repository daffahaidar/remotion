# Graph Report - remotion  (2026-11-24)

## Corpus Check
- 194 files · ~101,413 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 5)

## Summary
- 1312 nodes · 4570 edges · 78 communities (74 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 79 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7313213b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- hacker/index.ts
- character/README.md
- P2
- Remotion Video Project
- PropShadow
- package.json
- ShadyAppFails.tsx
- Expiry.tsx
- PROP_COLORS
- shared/ui.tsx
- boss/Body.tsx
- face.tsx
- remotion
- project_manager/Body.tsx
- SceneShell
- Headline
- quality_assurance/Body.tsx
- woman/Body.tsx
- react
- HowJwtWorks.tsx
- HandShape
- doctor/Body.tsx
- CharacterRigCanvas
- computeTorsoGeometry
- IconTile
- hacker/Body.tsx
- PoseSpec
- body.tsx
- man/Body.tsx
- PottedPlant.tsx
- shared/rig.ts
- generate-audio.mjs
- resolveFace
- Cara membaca script ini
- Cara membaca script ini
- Reveal
- CoffeeMug.tsx
- Whiteboard.tsx
- Smartphone.tsx
- DatabaseCylinder.tsx
- Cara Menggunakan & Memasangkan dengan Karakter
- Trophy.tsx
- tech_lead/Body.tsx
- Playbook Video Motion Graphic Teknologi (Remotion)
- useLook
- character/index.ts
- add
- 6. Formula per jenis konten
- createHeadProjection
- man/Head.tsx
- HackerFails.tsx
- Pill
- Wristband.tsx
- shared/presets.ts
- TypeScript Compiler Config
- Cara membaca script ini
- Root.tsx
- doctor/index.ts
- characterRig.tsx
- frontend_programmer/Head.tsx
- how-jwt-works/theme.ts
- ServerRack.tsx
- Redirect.tsx
- Stateless.tsx
- NotEncrypted.tsx
- Session.tsx
- face.tsx
- dependencies
- boss/Head.tsx
- check-dubbing.mjs
- frontend_programmer/index.ts
- RigDemo.tsx
- scripts
- allowScripts
- engines
- property/index.ts
- Graphify Claude Workflow Docs

## God Nodes (most connected - your core abstractions)
1. `react` - 111 edges
2. `useLook()` - 101 edges
3. `Reveal()` - 85 edges
4. `Card()` - 82 edges
5. `Pill()` - 67 edges
6. `remotion` - 65 edges
7. `SceneShell()` - 62 edges
8. `Sfx()` - 54 edges
9. `Headline()` - 54 edges
10. `IconTile()` - 46 edges

## Surprising Connections (you probably didn't know these)
- `5. Aturan retensi (WAJIB untuk semua jenis)` --references--> `ChannelOutro()`  [INFERRED]
  src/content/PROMPT_TECH_VIDEO.md → src/content/shared/ChannelOutro.tsx
- `11. Thumbnail cover 3:4 (WAJIB untuk setiap video)` --references--> `ChannelBadge()`  [INFERRED]
  src/content/PROMPT_TECH_VIDEO.md → src/content/shared/ChannelOutro.tsx
- `Memasang dubbing` --references--> `HowInternetWorks()`  [INFERRED]
  src/content/how-internet-works/script_dubbing.md → src/content/how-internet-works/HowInternetWorks.tsx
- `Modul Bersama (`src/assets/character/shared`)` --references--> `SkullShapeParams`  [INFERRED]
  src/assets/character/README.md → src/assets/character/shared/face.tsx
- `Memasang dubbing` --references--> `HowOauthWorks()`  [INFERRED]
  src/content/how-oauth-works/script_dubbing.md → src/content/how-oauth-works/HowOauthWorks.tsx

## Import Cycles
- None detected.

## Communities (78 total, 4 thin omitted)

### Community 0 - "hacker/index.ts"
Cohesion: 0.12
Nodes (22): Character, HackerProps, ProjectManagerProps, QualityAssuranceProps, applyMotion(), applyWave(), blinkAt(), cycle() (+14 more)

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
Cohesion: 0.12
Nodes (19): description, devDependencies, eslint@10.12.0, prettier@3.8.1, @remotion/eslint-config-flat@4.0.543, @types/react@19.3.0, @types/web@0.0.166, typescript@5.9.3 (+11 more)

### Community 6 - "ShadyAppFails.tsx"
Cohesion: 0.10
Nodes (40): CafeHacker(), clamp, NET, STAGES, clamp, EXPRESSIONS, POSES, Sniffer() (+32 more)

### Community 7 - "Expiry.tsx"
Cohesion: 0.53
Nodes (4): Countdown(), Expiry(), Stage(), TokenRow()

### Community 8 - "PROP_COLORS"
Cohesion: 0.09
Nodes (24): BugInner(), BugProps, BugState, SPOTS, STATES, LENSES, MagnifierLens, MagnifyingGlassProps (+16 more)

### Community 9 - "shared/ui.tsx"
Cohesion: 0.10
Nodes (32): RFC-6749, RFC-7636, react-icons, Equation(), Recap(), TIPS, Equation(), Recap() (+24 more)

### Community 10 - "boss/Body.tsx"
Cohesion: 0.21
Nodes (16): Arm(), BODY_PALETTE, DRESS_SHOE_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+8 more)

### Community 11 - "face.tsx"
Cohesion: 0.20
Nodes (27): FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES, TUFTS, Head() (+19 more)

### Community 12 - "remotion"
Cohesion: 0.12
Nodes (16): remotion, BriefcaseInner(), BriefcaseProps, BriefcaseVariant, PALETTES, VARIANTS, CloudServiceInner(), CloudServiceProps (+8 more)

### Community 13 - "project_manager/Body.tsx"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), PM_SHOE_SIZE, TORSO, Torso() (+5 more)

### Community 14 - "SceneShell"
Cohesion: 0.15
Nodes (30): HowOauthWorks(), HowOauthWorksProps, SCENE_SECONDS, Anatomy(), Hook(), NotLogin(), OldWay(), Pkce() (+22 more)

### Community 15 - "Headline"
Cohesion: 0.19
Nodes (21): Badge(), Budi(), Keycap(), Kind(), Problem(), Hook(), HookStage(), RoleEdit() (+13 more)

### Community 16 - "quality_assurance/Body.tsx"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), QA_SHOE_SIZE, TORSO, Torso() (+5 more)

### Community 17 - "woman/Body.tsx"
Cohesion: 0.24
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+6 more)

### Community 18 - "react"
Cohesion: 0.14
Nodes (12): react, ClipboardInner(), ClipboardProps, ClipboardVariant, VARIANTS, LightbulbProps, PackageBoxInner(), PackageBoxProps (+4 more)

### Community 19 - "HowJwtWorks.tsx"
Cohesion: 0.27
Nodes (9): HowJwtWorks(), HowJwtWorksProps, SCENE_SECONDS, Anatomy(), PART_AT, PartCard(), HackerFails(), clamp (+1 more)

### Community 20 - "HandShape"
Cohesion: 0.27
Nodes (12): Arm(), BODY_PALETTE, CLOG_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+4 more)

### Community 21 - "doctor/Body.tsx"
Cohesion: 0.26
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+5 more)

### Community 22 - "CharacterRigCanvas"
Cohesion: 0.25
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), INNER_HEM, Leg(), Neck(), TORSO, Torso() (+6 more)

### Community 23 - "computeTorsoGeometry"
Cohesion: 0.28
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+4 more)

### Community 24 - "IconTile"
Cohesion: 0.12
Nodes (28): RFC-2606, HowInternetWorks(), HowInternetWorksProps, SCENE_SECONDS, SourceNote(), STAGE, Anatomy(), CARDS (+20 more)

### Community 25 - "hacker/Body.tsx"
Cohesion: 0.27
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+5 more)

### Community 26 - "PoseSpec"
Cohesion: 0.15
Nodes (14): Bentuk mulut (lip sync), Berjalan dan berlari, Ekspresi (32), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Kustomisasi, Mascot: Master Character Rig (+6 more)

### Community 27 - "body.tsx"
Cohesion: 0.24
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+6 more)

### Community 28 - "man/Body.tsx"
Cohesion: 0.16
Nodes (21): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+13 more)

### Community 29 - "PottedPlant.tsx"
Cohesion: 0.19
Nodes (12): Cactus(), MONSTERA, Monstera(), PlantVariant, POT_COLORS, PotColor, POTS, PottedPlantInner() (+4 more)

### Community 30 - "shared/rig.ts"
Cohesion: 0.23
Nodes (21): solveArm, solveLeg, Shoe(), add(), blendLimb(), capsulePath(), createLimbSolvers(), cross() (+13 more)

### Community 31 - "generate-audio.mjs"
Cohesion: 0.09
Nodes (20): arp, bus(), CH, claps, drums, duck, fx, keys (+12 more)

### Community 32 - "resolveFace"
Cohesion: 0.15
Nodes (14): Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter, Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot) (+6 more)

### Community 33 - "Cara membaca script ini"
Cohesion: 0.12
Nodes (16): Cara membaca script ini, Memasang dubbing, Scene 10 — Pengaman ekstra: PKCE, Scene 11 — Rangkuman, Scene 12 — Outro channel, Scene 1 — Hook, Scene 2 — Masalahnya, Scene 3 — Cara lama: kasih password (+8 more)

### Community 34 - "Cara membaca script ini"
Cohesion: 0.12
Nodes (15): Cara membaca script ini, Memasang dubbing, Scene 10 — Masa berlaku, Scene 11 — Rangkuman, Scene 12 — Outro channel, Scene 1 — Hook, Scene 2 — Server itu pelupa, Scene 3 — Cara lama: session (+7 more)

### Community 35 - "Reveal"
Cohesion: 0.35
Nodes (15): Flow(), HANDSHAKE, Hop(), S, Flow(), Flow(), S, 12. Implementasi teknis (+7 more)

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
Cohesion: 0.26
Nodes (13): SleeveArm(), Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+5 more)

### Community 43 - "Playbook Video Motion Graphic Teknologi (Remotion)"
Cohesion: 0.14
Nodes (13): 0. Cara pakai (untuk manusia), 10. Format `script_dubbing.md` (WAJIB persis), 11. Thumbnail cover 3:4 (WAJIB untuk setiap video), 13. Alur kerja, 14. Definition of Done (WAJIB, centang semua), 15. Laporan akhir (Bahasa Indonesia), 1. Input, 3. Aturan kerja umum (WAJIB) (+5 more)

### Community 44 - "useLook"
Cohesion: 0.18
Nodes (28): StageStrip(), BrowserCard(), DnsLookup(), NodeCard(), SERVERS, Browser(), Cover(), HowInternetWorksThumbnail() (+20 more)

### Community 45 - "character/index.ts"
Cohesion: 0.11
Nodes (23): BackendProgrammerProps, Character, Character, Character, ChefProps, COLORS, DoctorProps, Character (+15 more)

### Community 46 - "add"
Cohesion: 0.20
Nodes (18): 9. Audio (WAJIB), add(), bass(), chordEp(), clap(), ep(), groove(), hat() (+10 more)

### Community 47 - "6. Formula per jenis konten"
Cohesion: 0.22
Nodes (9): 6.1 Cara Kerja (explainer), contoh susunan video referensi, 6.2 Tutorial (how-to), 6.3 Fakta Unik (listicle), 6.4 Berita Teknologi, 6.5 Perbandingan (X vs Y), 6.6 Mitos vs Fakta, 6.7 Tips & Tools, 6.8 Lainnya (sejarah, review, opini, karier, event, dll.) (+1 more)

### Community 48 - "createHeadProjection"
Cohesion: 0.20
Nodes (14): Head(), Head(), FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES (+6 more)

### Community 49 - "man/Head.tsx"
Cohesion: 0.22
Nodes (8): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, COLORS, FaceSpec

### Community 50 - "HackerFails.tsx"
Cohesion: 0.09
Nodes (6): Compare(), EXPRESSIONS, Hacker(), POSES, Recompute(), Stage()

### Community 51 - "Pill"
Cohesion: 0.21
Nodes (19): Beat(), Calling(), Cipher(), ContactNumber(), PhoneCall(), RING, RoleCard(), TokenCard() (+11 more)

### Community 52 - "Wristband.tsx"
Cohesion: 0.53
Nodes (5): Band(), Stage(), StageCard(), STAGES, Wristband()

### Community 53 - "shared/presets.ts"
Cohesion: 0.12
Nodes (10): BROW, EYE, mixBrow(), mixEye(), mixFace(), NEUTRAL, RELAXED, STAND (+2 more)

### Community 54 - "TypeScript Compiler Config"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 55 - "Cara membaca script ini"
Cohesion: 0.12
Nodes (16): Cara membaca script ini, Memasang dubbing, Scene 10 — Detail penting: paket data, Scene 11 — Rangkuman, Scene 12 — Outro channel, Scene 1 — Hook, Scene 2 — Masalahnya, Scene 3 — Cara lama: satu file (+8 more)

### Community 56 - "Root.tsx"
Cohesion: 0.12
Nodes (4): TOTAL_SECONDS, TOTAL_SECONDS, TOTAL_SECONDS, RemotionRoot()

### Community 58 - "characterRig.tsx"
Cohesion: 0.15
Nodes (10): ArmRenderProps, CharacterProps, CharacterRigConfig, FRAMINGS, HeadRenderProps, LegRenderProps, TorsoRenderProps, VIEWBOX (+2 more)

### Community 59 - "frontend_programmer/Head.tsx"
Cohesion: 0.12
Nodes (15): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, FACE_CFG, HAIRLINE (+7 more)

### Community 60 - "how-jwt-works/theme.ts"
Cohesion: 0.39
Nodes (6): Machine(), Signature(), SPINS, Stage(), SubValue(), JWT

### Community 61 - "ServerRack.tsx"
Cohesion: 0.33
Nodes (4): ServerRackInner(), ServerRackProps, ServerStatus, STATUSES

### Community 62 - "Redirect.tsx"
Cohesion: 0.16
Nodes (14): Field(), LoginWindow(), Request(), AppScreen(), BackWithCode(), Budi(), Button(), clamp (+6 more)

### Community 63 - "Stateless.tsx"
Cohesion: 0.38
Nodes (5): BUBBLES, LoginCard(), REQUESTS, Stage(), Stateless()

### Community 64 - "NotEncrypted.tsx"
Cohesion: 0.38
Nodes (5): DECODED, Decoded(), NEVER, NeverRow(), NotEncrypted()

### Community 66 - "Session.tsx"
Cohesion: 0.43
Nodes (6): Row(), ROWS, SERVERS, Session(), SessionTable(), Stage()

### Community 67 - "face.tsx"
Cohesion: 0.19
Nodes (12): buildHairCapPath(), ell(), evalHairline(), FacePalette, GlassesShape, GlassesSpec, HeadProjection, MouthDef (+4 more)

### Community 68 - "dependencies"
Cohesion: 0.18
Nodes (10): dependencies, react@19.3.1, react-dom@19.3.1, react-icons@^5.7.0, remotion@4.0.543, @remotion/cli@4.0.543, @remotion/media@4.0.543, react-dom (+2 more)

### Community 69 - "boss/Head.tsx"
Cohesion: 0.22
Nodes (8): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, R

### Community 70 - "check-dubbing.mjs"
Cohesion: 0.36
Nodes (4): count(), lines, measure(), syllables()

### Community 71 - "frontend_programmer/index.ts"
Cohesion: 0.33
Nodes (3): Character, FrontendProgrammerProps, LegPose

### Community 72 - "RigDemo.tsx"
Cohesion: 0.40
Nodes (4): @remotion/google-fonts@4.0.543, @remotion/google-fonts, Character, RigDemo()

### Community 73 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, upgrade

### Community 78 - "property/index.ts"
Cohesion: 0.21
Nodes (25): Briefcase, Bug, Clipboard, CloudService, CoffeeMug, DatabaseCylinder, DesktopComputer, Laptop (+17 more)

### Community 89 - "Graphify Claude Workflow Docs"
Cohesion: 0.50
Nodes (4): graphify-out/graph.json, Graphify Knowledge Graph, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md

## Knowledge Gaps
- **8 isolated node(s):** `RFC-2606`, `RFC-6749`, `RFC-7636`, `Remotion CLI Workflow`, `Remotion Company License` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 468 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `P2`, `PropShadow`, `package.json`, `ShadyAppFails.tsx`, `Expiry.tsx`, `PROP_COLORS`, `shared/ui.tsx`, `boss/Body.tsx`, `face.tsx`, `remotion`, `project_manager/Body.tsx`, `SceneShell`, `Headline`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `HowJwtWorks.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `IconTile`, `hacker/Body.tsx`, `body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `Reveal`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `tech_lead/Body.tsx`, `useLook`, `character/index.ts`, `createHeadProjection`, `man/Head.tsx`, `HackerFails.tsx`, `Pill`, `Wristband.tsx`, `characterRig.tsx`, `frontend_programmer/Head.tsx`, `how-jwt-works/theme.ts`, `ServerRack.tsx`, `Redirect.tsx`, `Stateless.tsx`, `NotEncrypted.tsx`, `Session.tsx`, `face.tsx`, `dependencies`, `boss/Head.tsx`, `RigDemo.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.387) - this node is a cross-community bridge._
- **What connects `RFC-2606`, `RFC-6749`, `RFC-7636` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `hacker/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `remotion` connect `remotion` to `hacker/index.ts`, `PropShadow`, `package.json`, `ShadyAppFails.tsx`, `Expiry.tsx`, `PROP_COLORS`, `shared/ui.tsx`, `boss/Body.tsx`, `project_manager/Body.tsx`, `SceneShell`, `Headline`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `react`, `HowJwtWorks.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `IconTile`, `hacker/Body.tsx`, `body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `tech_lead/Body.tsx`, `character/index.ts`, `HackerFails.tsx`, `Wristband.tsx`, `Root.tsx`, `characterRig.tsx`, `how-jwt-works/theme.ts`, `ServerRack.tsx`, `Redirect.tsx`, `Session.tsx`, `dependencies`, `RigDemo.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `character/README.md` be split into smaller, more focused modules?**
  _Cohesion score 0.04717853839037928 - nodes in this community are weakly interconnected._
- **Why does `Playbook Video Motion Graphic Teknologi (Remotion)` connect `Playbook Video Motion Graphic Teknologi (Remotion)` to `add`, `Reveal`, `SceneShell`, `6. Formula per jenis konten`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Should `P2` be split into smaller, more focused modules?**
  _Cohesion score 0.06086956521739131 - nodes in this community are weakly interconnected._