# Graph Report - remotion  (2026-11-19)

## Corpus Check
- 157 files · ~74,330 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 5)

## Summary
- 994 nodes · 3341 edges · 58 communities (57 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 48 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `559b6156`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- backend_programmer/index.ts
- Boss / Executive: Master Character Rig (`src/assets/character/boss`)
- P2
- Remotion Video Project
- PropShadow
- Project Dependencies & Tooling
- character/index.ts
- hacker/Body.tsx
- PROP_COLORS
- shared/presets.ts
- body.tsx
- smoothPath
- react
- project_manager/Body.tsx
- shared/rig.ts
- hacker/Head.tsx
- quality_assurance/Body.tsx
- woman/Body.tsx
- PropShadow
- ui.tsx
- HandShape
- doctor/Body.tsx
- CharacterRigCanvas
- computeTorsoGeometry
- characterRig.tsx
- Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`)
- PoseSpec
- backend_programmer/Body.tsx
- man/Body.tsx
- PottedPlant.tsx
- face.tsx
- generate-audio.mjs
- v3
- man/Head.tsx
- Cara membaca script ini
- tech_lead/Body.tsx
- CoffeeMug.tsx
- Whiteboard.tsx
- Smartphone.tsx
- DatabaseCylinder.tsx
- Cara Menggunakan & Memasangkan dengan Karakter
- Trophy.tsx
- boss/Head.tsx
- backend_programmer/Head.tsx
- Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`)
- Chef: Culinary Analogy Character Rig (`src/assets/character/chef`)
- Doctor: Diagnostic Analogy Character Rig (`src/assets/character/doctor`)
- Fullstack Programmer: Dual-Stack Character Rig (`src/assets/character/fullstack_programmer`)
- Hacker: Cybersecurity & Stealth Character Rig (`src/assets/character/hacker`)
- Project Manager: Agile Coordinator Character Rig (`src/assets/character/project_manager`)
- Quality Assurance (QA): Bug-Hunter Character Rig (`src/assets/character/quality_assurance`)
- Mascot Character Rigs (`src/assets/character/*`)
- Tech Lead: Senior Architect Character Rig (`src/assets/character/tech_lead`)
- TypeScript Compiler Config
- Woman: Hijabi Master Character Rig (`src/assets/character/woman`)
- property/index.ts
- Graphify Claude Workflow Docs

## God Nodes (most connected - your core abstractions)
1. `react` - 80 edges
2. `remotion` - 53 edges
3. `useLook()` - 42 edges
4. `PropShadow()` - 40 edges
5. `computeTorsoGeometry()` - 38 edges
6. `CharacterRigCanvas()` - 36 edges
7. `v3()` - 35 edges
8. `Card()` - 35 edges
9. `Reveal()` - 34 edges
10. `smoothPath()` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Modul Bersama (`src/assets/character/shared`)` --references--> `SkullShapeParams`  [INFERRED]
  src/assets/character/README.md → src/assets/character/shared/face.tsx
- `Memasang dubbing` --references--> `HowJwtWorks()`  [INFERRED]
  src/content/how-jwt-works/script_dubbing.md → src/content/how-jwt-works/HowJwtWorks.tsx
- `Isi folder` --references--> `resolveFace()`  [INFERRED]
  src/assets/character/backend_programmer/README.md → src/assets/character/shared/presets.ts
- `Isi folder` --references--> `resolveFace()`  [INFERRED]
  src/assets/character/frontend_programmer/README.md → src/assets/character/shared/presets.ts
- `Isi folder` --references--> `resolvePose()`  [INFERRED]
  src/assets/character/backend_programmer/README.md → src/assets/character/shared/presets.ts

## Import Cycles
- None detected.

## Communities (58 total, 1 thin omitted)

### Community 0 - "backend_programmer/index.ts"
Cohesion: 0.11
Nodes (32): BackendProgrammerProps, BossProps, ChefProps, DoctorProps, FrontendProgrammerProps, FullstackProgrammerProps, HackerProps, Kustomisasi (+24 more)

### Community 1 - "Boss / Executive: Master Character Rig (`src/assets/character/boss`)"
Cohesion: 0.29
Nodes (6): Boss / Executive: Master Character Rig (`src/assets/character/boss`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

### Community 2 - "P2"
Cohesion: 0.06
Nodes (40): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, FACE_CFG (+32 more)

### Community 3 - "Remotion Video Project"
Cohesion: 0.50
Nodes (4): Remotion CLI Workflow, Remotion Company License, Remotion Fundamentals Documentation, Remotion Video Project

### Community 4 - "PropShadow"
Cohesion: 0.12
Nodes (15): DesktopComputerInner(), DesktopComputerProps, SCREEN_MODES, TOWER_SIDES, TowerSide, BADGES_LIST, COLORS_LIST, LaptopBadge (+7 more)

### Community 5 - "Project Dependencies & Tooling"
Cohesion: 0.06
Nodes (38): allowScripts, esbuild, dependencies, react@19.3.1, react-dom@19.3.1, react-icons@^5.7.0, remotion@4.0.543, @remotion/cli@4.0.543 (+30 more)

### Community 6 - "character/index.ts"
Cohesion: 0.10
Nodes (37): @remotion/google-fonts, Character, COLORS, Character, COLORS, Character, COLORS, Character (+29 more)

### Community 7 - "hacker/Body.tsx"
Cohesion: 0.38
Nodes (9): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+1 more)

### Community 8 - "PROP_COLORS"
Cohesion: 0.12
Nodes (24): BugInner(), BugProps, BugState, SPOTS, STATES, LENSES, MagnifierLens, MagnifyingGlassProps (+16 more)

### Community 9 - "shared/presets.ts"
Cohesion: 0.10
Nodes (16): Isi folder, Isi folder, ProjectManagerProps, BROW, ExpressionName, EYE, mixBrow(), mixEye() (+8 more)

### Community 10 - "body.tsx"
Cohesion: 0.15
Nodes (24): Arm(), BODY_PALETTE, DRESS_SHOE_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+16 more)

### Community 11 - "smoothPath"
Cohesion: 0.19
Nodes (28): Head(), Head(), FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES (+20 more)

### Community 12 - "react"
Cohesion: 0.09
Nodes (26): react, remotion, ClipboardInner(), ClipboardProps, ClipboardVariant, VARIANTS, CloudServiceInner(), CloudServiceProps (+18 more)

### Community 13 - "project_manager/Body.tsx"
Cohesion: 0.35
Nodes (10): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), PM_SHOE_SIZE, TORSO, Torso() (+2 more)

### Community 14 - "shared/rig.ts"
Cohesion: 0.07
Nodes (40): RIG, solveArm, solveLeg, RIG, solveArm, solveLeg, RIG, solveArm (+32 more)

### Community 15 - "hacker/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS

### Community 16 - "quality_assurance/Body.tsx"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), QA_SHOE_SIZE, TORSO, Torso() (+5 more)

### Community 17 - "woman/Body.tsx"
Cohesion: 0.35
Nodes (10): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+2 more)

### Community 18 - "PropShadow"
Cohesion: 0.12
Nodes (16): BriefcaseInner(), BriefcaseProps, BriefcaseVariant, PALETTES, VARIANTS, PackageBoxInner(), PackageBoxProps, PackageVariant (+8 more)

### Community 19 - "ui.tsx"
Cohesion: 0.09
Nodes (101): react-icons, @remotion/media, ServerRack, Backsound(), HowJwtWorks(), HowJwtWorksProps, SCENE_SECONDS, Anatomy() (+93 more)

### Community 20 - "HandShape"
Cohesion: 0.23
Nodes (14): Arm(), BODY_PALETTE, CLOG_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+6 more)

### Community 21 - "doctor/Body.tsx"
Cohesion: 0.35
Nodes (10): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+2 more)

### Community 22 - "CharacterRigCanvas"
Cohesion: 0.33
Nodes (10): Arm(), BODY_PALETTE, GroundShadow(), INNER_HEM, Leg(), Neck(), TORSO, Torso() (+2 more)

### Community 23 - "computeTorsoGeometry"
Cohesion: 0.42
Nodes (9): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+1 more)

### Community 24 - "characterRig.tsx"
Cohesion: 0.14
Nodes (11): ArmRenderProps, CharacterRigConfig, FRAMINGS, HeadRenderProps, LegRenderProps, TorsoRenderProps, VIEWBOX, POSE_NAMES (+3 more)

### Community 25 - "Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`)"
Cohesion: 0.40
Nodes (5): Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

### Community 26 - "PoseSpec"
Cohesion: 0.18
Nodes (11): Bentuk mulut (lip sync), Berjalan dan berlari, Ekspresi (32), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Mascot: Master Character Rig, Pemakaian dasar (+3 more)

### Community 27 - "backend_programmer/Body.tsx"
Cohesion: 0.38
Nodes (9): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+1 more)

### Community 28 - "man/Body.tsx"
Cohesion: 0.33
Nodes (11): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+3 more)

### Community 29 - "PottedPlant.tsx"
Cohesion: 0.19
Nodes (12): Cactus(), MONSTERA, Monstera(), PlantVariant, POT_COLORS, PotColor, POTS, PottedPlantInner() (+4 more)

### Community 30 - "face.tsx"
Cohesion: 0.22
Nodes (10): buildHairCapPath(), ell(), evalHairline(), FacePalette, GlassesShape, GlassesSpec, HeadProjection, MouthDef (+2 more)

### Community 31 - "generate-audio.mjs"
Cohesion: 0.08
Nodes (36): add(), arp, bass(), bus(), CH, chordEp(), clap(), claps (+28 more)

### Community 32 - "v3"
Cohesion: 0.50
Nodes (9): Head(), Head(), Head(), createHeadProjection(), HairHeadShell(), rotX(), rotY(), v3() (+1 more)

### Community 33 - "man/Head.tsx"
Cohesion: 0.12
Nodes (15): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, JAW, T3 (+7 more)

### Community 34 - "Cara membaca script ini"
Cohesion: 0.13
Nodes (14): Cara membaca script ini, Memasang dubbing, Scene 10 — Masa berlaku, Scene 11 — Rangkuman & ajakan, Scene 1 — Hook, Scene 2 — Server itu pelupa, Scene 3 — Cara lama: session, Scene 4 — Bayangkan gelang konser (+6 more)

### Community 35 - "tech_lead/Body.tsx"
Cohesion: 0.38
Nodes (9): TorsoSection, Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+1 more)

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

### Community 42 - "boss/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS

### Community 43 - "backend_programmer/Head.tsx"
Cohesion: 0.29
Nodes (6): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS

### Community 45 - "Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`)"
Cohesion: 0.40
Nodes (5): Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

### Community 46 - "Chef: Culinary Analogy Character Rig (`src/assets/character/chef`)"
Cohesion: 0.50
Nodes (3): Chef: Culinary Analogy Character Rig (`src/assets/character/chef`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter

### Community 47 - "Doctor: Diagnostic Analogy Character Rig (`src/assets/character/doctor`)"
Cohesion: 0.50
Nodes (3): Doctor: Diagnostic Analogy Character Rig (`src/assets/character/doctor`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter

### Community 48 - "Fullstack Programmer: Dual-Stack Character Rig (`src/assets/character/fullstack_programmer`)"
Cohesion: 0.50
Nodes (3): Fullstack Programmer: Dual-Stack Character Rig (`src/assets/character/fullstack_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter

### Community 49 - "Hacker: Cybersecurity & Stealth Character Rig (`src/assets/character/hacker`)"
Cohesion: 0.50
Nodes (3): Hacker: Cybersecurity & Stealth Character Rig (`src/assets/character/hacker`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter

### Community 50 - "Project Manager: Agile Coordinator Character Rig (`src/assets/character/project_manager`)"
Cohesion: 0.50
Nodes (3): Identitas & Panduan Peran (Reusable di Berbagai Plot), Project Manager: Agile Coordinator Character Rig (`src/assets/character/project_manager`), Props khusus karakter

### Community 51 - "Quality Assurance (QA): Bug-Hunter Character Rig (`src/assets/character/quality_assurance`)"
Cohesion: 0.50
Nodes (3): Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter, Quality Assurance (QA): Bug-Hunter Character Rig (`src/assets/character/quality_assurance`)

### Community 52 - "Mascot Character Rigs (`src/assets/character/*`)"
Cohesion: 0.50
Nodes (4): Import Gabungan dari `../character`, Mascot Character Rigs (`src/assets/character/*`), Modul Bersama (`src/assets/character/shared`), Panduan Casting Cepat (Reusable di Segala Plot)

### Community 53 - "Tech Lead: Senior Architect Character Rig (`src/assets/character/tech_lead`)"
Cohesion: 0.50
Nodes (3): Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter, Tech Lead: Senior Architect Character Rig (`src/assets/character/tech_lead`)

### Community 54 - "TypeScript Compiler Config"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 55 - "Woman: Hijabi Master Character Rig (`src/assets/character/woman`)"
Cohesion: 0.67
Nodes (3): Identitas & Panduan Peran (Reusable di Berbagai Plot), Pemakaian dasar, Woman: Hijabi Master Character Rig (`src/assets/character/woman`)

### Community 78 - "property/index.ts"
Cohesion: 0.21
Nodes (24): Briefcase, Bug, Clipboard, CloudService, CoffeeMug, DatabaseCylinder, DesktopComputer, Laptop (+16 more)

### Community 89 - "Graphify Claude Workflow Docs"
Cohesion: 0.50
Nodes (4): graphify-out/graph.json, Graphify Knowledge Graph, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md

## Knowledge Gaps
- **5 isolated node(s):** `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation`, `graphify-out/GRAPH_REPORT.md`, `graphify-out/wiki/index.md`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 334 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `P2`, `PropShadow`, `Project Dependencies & Tooling`, `character/index.ts`, `hacker/Body.tsx`, `PROP_COLORS`, `body.tsx`, `smoothPath`, `project_manager/Body.tsx`, `hacker/Head.tsx`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `PropShadow`, `ui.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `characterRig.tsx`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `face.tsx`, `man/Head.tsx`, `tech_lead/Body.tsx`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `boss/Head.tsx`, `backend_programmer/Head.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.334) - this node is a cross-community bridge._
- **What connects `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `backend_programmer/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11394230769230769 - nodes in this community are weakly interconnected._
- **Why does `remotion` connect `react` to `backend_programmer/index.ts`, `PropShadow`, `Project Dependencies & Tooling`, `character/index.ts`, `hacker/Body.tsx`, `PROP_COLORS`, `body.tsx`, `project_manager/Body.tsx`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `PropShadow`, `ui.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `characterRig.tsx`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `tech_lead/Body.tsx`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Should `P2` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `SkullShapeParams` connect `P2` to `man/Head.tsx`, `boss/Head.tsx`, `hacker/Head.tsx`, `Mascot Character Rigs (`src/assets/character/*`)`, `face.tsx`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Should `PropShadow` be split into smaller, more focused modules?**
  _Cohesion score 0.12280701754385964 - nodes in this community are weakly interconnected._