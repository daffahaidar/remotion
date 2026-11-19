# Graph Report - remotion  (2026-11-19)

## Corpus Check
- 141 files · ~59,779 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 5)

## Summary
- 818 nodes · 2613 edges · 47 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `41682d9d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- backend_programmer/index.ts
- character/README.md
- P2
- Remotion Video Project
- PropShadow
- Project Dependencies & Tooling
- character/index.ts
- hacker/Body.tsx
- PROP_COLORS
- shared/presets.ts
- boss/Body.tsx
- backend_programmer/Head.tsx
- remotion
- project_manager/Body.tsx
- shared/rig.ts
- hacker/Head.tsx
- quality_assurance/Body.tsx
- woman/Body.tsx
- react
- shared/motion.ts
- HandShape
- doctor/Body.tsx
- CharacterRigCanvas
- computeTorsoGeometry
- characterRig.tsx
- resolveFace
- PoseSpec
- backend_programmer/Body.tsx
- man/Body.tsx
- PottedPlant.tsx
- face.tsx
- project_manager/Head.tsx
- v3
- man/Head.tsx
- frontend_programmer/Head.tsx
- body.tsx
- CoffeeMug.tsx
- Whiteboard.tsx
- Smartphone.tsx
- DatabaseCylinder.tsx
- Cara Menggunakan & Memasangkan dengan Karakter
- Trophy.tsx
- ServerRack.tsx
- hacker/rig.ts
- TypeScript Compiler Config
- property/index.ts
- Graphify Claude Workflow Docs

## God Nodes (most connected - your core abstractions)
1. `react` - 67 edges
2. `remotion` - 44 edges
3. `PropShadow()` - 40 edges
4. `computeTorsoGeometry()` - 38 edges
5. `CharacterRigCanvas()` - 36 edges
6. `v3()` - 35 edges
7. `smoothPath()` - 32 edges
8. `FaceSpec` - 30 edges
9. `P2` - 28 edges
10. `createHeadProjection()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `Modul Bersama (`src/assets/character/shared`)` --references--> `SkullShapeParams`  [INFERRED]
  src/assets/character/README.md → src/assets/character/shared/face.tsx
- `Isi folder` --references--> `mixFace()`  [INFERRED]
  src/assets/character/backend_programmer/README.md → src/assets/character/shared/presets.ts
- `Isi folder` --references--> `mixFace()`  [INFERRED]
  src/assets/character/frontend_programmer/README.md → src/assets/character/shared/presets.ts
- `Kustomisasi` --references--> `FaceSpec`  [INFERRED]
  src/assets/character/man/README.md → src/assets/character/shared/rig.ts
- `Props` --references--> `FaceSpec`  [INFERRED]
  src/assets/character/man/README.md → src/assets/character/shared/rig.ts

## Import Cycles
- None detected.

## Communities (47 total, 0 thin omitted)

### Community 0 - "backend_programmer/index.ts"
Cohesion: 0.17
Nodes (21): BackendProgrammerProps, BossProps, DoctorProps, FullstackProgrammerProps, HackerProps, QualityAssuranceProps, blinkAt(), Motion (+13 more)

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

### Community 5 - "Project Dependencies & Tooling"
Cohesion: 0.06
Nodes (38): allowScripts, esbuild, dependencies, react@19.3.1, react-dom@19.3.1, react-icons@^5.7.0, remotion@4.0.543, @remotion/cli@4.0.543 (+30 more)

### Community 6 - "character/index.ts"
Cohesion: 0.12
Nodes (30): @remotion/google-fonts, Character, COLORS, Character, COLORS, Character, COLORS, Character (+22 more)

### Community 7 - "hacker/Body.tsx"
Cohesion: 0.38
Nodes (10): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+2 more)

### Community 8 - "PROP_COLORS"
Cohesion: 0.09
Nodes (24): BugInner(), BugProps, BugState, SPOTS, STATES, LENSES, MagnifierLens, MagnifyingGlassProps (+16 more)

### Community 9 - "shared/presets.ts"
Cohesion: 0.12
Nodes (10): BROW, EYE, mixBrow(), mixEye(), mixFace(), NEUTRAL, RELAXED, STAND (+2 more)

### Community 10 - "boss/Body.tsx"
Cohesion: 0.27
Nodes (12): Arm(), BODY_PALETTE, DRESS_SHOE_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+4 more)

### Community 11 - "backend_programmer/Head.tsx"
Cohesion: 0.17
Nodes (27): FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES, TUFTS, FACE_CFG (+19 more)

### Community 12 - "remotion"
Cohesion: 0.12
Nodes (16): remotion, BriefcaseInner(), BriefcaseProps, BriefcaseVariant, PALETTES, VARIANTS, CloudServiceInner(), CloudServiceProps (+8 more)

### Community 13 - "project_manager/Body.tsx"
Cohesion: 0.24
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), PM_SHOE_SIZE, TORSO, Torso() (+5 more)

### Community 14 - "shared/rig.ts"
Cohesion: 0.12
Nodes (33): COLORS, solveArm, solveLeg, Shoe(), CharacterRigCanvas(), add(), blendLimb(), capsulePath() (+25 more)

### Community 15 - "hacker/Head.tsx"
Cohesion: 0.19
Nodes (16): FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS (+8 more)

### Community 16 - "quality_assurance/Body.tsx"
Cohesion: 0.24
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), QA_SHOE_SIZE, TORSO, Torso() (+6 more)

### Community 17 - "woman/Body.tsx"
Cohesion: 0.24
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+6 more)

### Community 18 - "react"
Cohesion: 0.14
Nodes (12): react, ClipboardInner(), ClipboardProps, ClipboardVariant, VARIANTS, LightbulbProps, PackageBoxInner(), PackageBoxProps (+4 more)

### Community 19 - "shared/motion.ts"
Cohesion: 0.18
Nodes (5): applyMotion(), applyWave(), cycle(), swings(), VISEMES

### Community 20 - "HandShape"
Cohesion: 0.14
Nodes (20): Arm(), BODY_PALETTE, CLOG_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+12 more)

### Community 21 - "doctor/Body.tsx"
Cohesion: 0.28
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+4 more)

### Community 22 - "CharacterRigCanvas"
Cohesion: 0.22
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), INNER_HEM, Leg(), Neck(), TORSO, Torso() (+5 more)

### Community 23 - "computeTorsoGeometry"
Cohesion: 0.28
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+4 more)

### Community 24 - "characterRig.tsx"
Cohesion: 0.15
Nodes (10): ArmRenderProps, CharacterRigConfig, FRAMINGS, HeadRenderProps, LegRenderProps, TorsoRenderProps, VIEWBOX, ArmLayer (+2 more)

### Community 25 - "resolveFace"
Cohesion: 0.15
Nodes (14): Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter, Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot) (+6 more)

### Community 26 - "PoseSpec"
Cohesion: 0.15
Nodes (14): Bentuk mulut (lip sync), Berjalan dan berlari, Ekspresi (32), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Kustomisasi, Mascot: Master Character Rig (+6 more)

### Community 27 - "backend_programmer/Body.tsx"
Cohesion: 0.33
Nodes (10): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+2 more)

### Community 28 - "man/Body.tsx"
Cohesion: 0.31
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+4 more)

### Community 29 - "PottedPlant.tsx"
Cohesion: 0.19
Nodes (12): Cactus(), MONSTERA, Monstera(), PlantVariant, POT_COLORS, PotColor, POTS, PottedPlantInner() (+4 more)

### Community 30 - "face.tsx"
Cohesion: 0.20
Nodes (9): ell(), evalHairline(), FacePalette, GlassesShape, GlassesSpec, HeadProjection, MouthDef, MOUTHS (+1 more)

### Community 31 - "project_manager/Head.tsx"
Cohesion: 0.22
Nodes (8): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, OW

### Community 32 - "v3"
Cohesion: 0.57
Nodes (8): Head(), Head(), Head(), createHeadProjection(), HairHeadShell(), rotX(), v3(), Head()

### Community 33 - "man/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, FaceSpec

### Community 34 - "frontend_programmer/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, JAW

### Community 35 - "body.tsx"
Cohesion: 0.26
Nodes (11): DEFAULT_SHOE_SIZE, Hand(), HandDef, HandPart, HANDS, KNUCKLES, Leg(), pts() (+3 more)

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

### Community 42 - "ServerRack.tsx"
Cohesion: 0.33
Nodes (4): ServerRackInner(), ServerRackProps, ServerStatus, STATUSES

### Community 43 - "hacker/rig.ts"
Cohesion: 0.50
Nodes (3): COLORS, solveArm, solveLeg

### Community 54 - "TypeScript Compiler Config"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 78 - "property/index.ts"
Cohesion: 0.21
Nodes (25): Briefcase, Bug, Clipboard, CloudService, CoffeeMug, DatabaseCylinder, DesktopComputer, Laptop (+17 more)

### Community 89 - "Graphify Claude Workflow Docs"
Cohesion: 0.50
Nodes (4): graphify-out/graph.json, Graphify Knowledge Graph, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md

## Knowledge Gaps
- **5 isolated node(s):** `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation`, `graphify-out/GRAPH_REPORT.md`, `graphify-out/wiki/index.md`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 279 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `P2`, `PropShadow`, `Project Dependencies & Tooling`, `character/index.ts`, `hacker/Body.tsx`, `PROP_COLORS`, `boss/Body.tsx`, `backend_programmer/Head.tsx`, `remotion`, `project_manager/Body.tsx`, `shared/rig.ts`, `hacker/Head.tsx`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `characterRig.tsx`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `face.tsx`, `project_manager/Head.tsx`, `man/Head.tsx`, `frontend_programmer/Head.tsx`, `body.tsx`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `ServerRack.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.324) - this node is a cross-community bridge._
- **What connects `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `character/README.md` be split into smaller, more focused modules?**
  _Cohesion score 0.04717853839037928 - nodes in this community are weakly interconnected._
- **Why does `remotion` connect `remotion` to `PropShadow`, `Project Dependencies & Tooling`, `character/index.ts`, `hacker/Body.tsx`, `PROP_COLORS`, `boss/Body.tsx`, `project_manager/Body.tsx`, `shared/rig.ts`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `react`, `shared/motion.ts`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `characterRig.tsx`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `ServerRack.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `P2` be split into smaller, more focused modules?**
  _Cohesion score 0.06280193236714976 - nodes in this community are weakly interconnected._
- **Why does `SkullShapeParams` connect `P2` to `character/README.md`, `backend_programmer/Head.tsx`, `hacker/Head.tsx`, `face.tsx`, `project_manager/Head.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Should `PropShadow` be split into smaller, more focused modules?**
  _Cohesion score 0.0946969696969697 - nodes in this community are weakly interconnected._