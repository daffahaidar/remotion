# Graph Report - remotion  (2026-11-19)

## Corpus Check
- 159 files · ~77,744 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 5)

## Summary
- 1042 nodes · 3375 edges · 70 communities (64 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b442a284`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- backend_programmer/index.ts
- Boss / Executive: Master Character Rig (`src/assets/character/boss`)
- P2
- Remotion Video Project
- PropShadow
- package.json
- character/index.ts
- man/index.ts
- PROP_COLORS
- shared/presets.ts
- boss/Body.tsx
- backend_programmer/Head.tsx
- remotion
- project_manager/Body.tsx
- shared/rig.ts
- hacker/Head.tsx
- quality_assurance/Body.tsx
- body.tsx
- react
- ui.tsx
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
- Playbook Video Motion Graphic Teknologi (Remotion)
- chef/index.ts
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
- Root.tsx
- dependencies
- frontend_programmer/Head.tsx
- fullstack_programmer/index.ts
- tech_lead/index.ts
- ServerRack.tsx
- RigDemo.tsx
- scripts
- @remotion/eslint-config-flat
- allowScripts
- engines
- property/index.ts
- Graphify Claude Workflow Docs

## God Nodes (most connected - your core abstractions)
1. `react` - 80 edges
2. `remotion` - 53 edges
3. `useLook()` - 42 edges
4. `PropShadow()` - 40 edges
5. `computeTorsoGeometry()` - 38 edges
6. `Card()` - 36 edges
7. `CharacterRigCanvas()` - 36 edges
8. `Reveal()` - 35 edges
9. `v3()` - 35 edges
10. `smoothPath()` - 32 edges

## Surprising Connections (you probably didn't know these)
- `2. Konteks proyek (WAJIB dibaca sebelum merancang)` --references--> `HowJwtWorks()`  [INFERRED]
  src/content/PROMPT_TECH_VIDEO.md → src/content/how-jwt-works/HowJwtWorks.tsx
- `Memasang dubbing` --references--> `HowJwtWorks()`  [INFERRED]
  src/content/how-jwt-works/script_dubbing.md → src/content/how-jwt-works/HowJwtWorks.tsx
- `Modul Bersama (`src/assets/character/shared`)` --references--> `SkullShapeParams`  [INFERRED]
  src/assets/character/README.md → src/assets/character/shared/face.tsx
- `Kustomisasi` --references--> `FaceSpec`  [INFERRED]
  src/assets/character/man/README.md → src/assets/character/shared/rig.ts
- `Props` --references--> `FaceSpec`  [INFERRED]
  src/assets/character/man/README.md → src/assets/character/shared/rig.ts

## Import Cycles
- None detected.

## Communities (70 total, 6 thin omitted)

### Community 0 - "backend_programmer/index.ts"
Cohesion: 0.14
Nodes (21): BackendProgrammerProps, BossProps, DoctorProps, FrontendProgrammerProps, HackerProps, Kustomisasi, Props, ProjectManagerProps (+13 more)

### Community 1 - "Boss / Executive: Master Character Rig (`src/assets/character/boss`)"
Cohesion: 0.29
Nodes (6): Boss / Executive: Master Character Rig (`src/assets/character/boss`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

### Community 2 - "P2"
Cohesion: 0.06
Nodes (49): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, FACE_CFG (+41 more)

### Community 3 - "Remotion Video Project"
Cohesion: 0.50
Nodes (4): Remotion CLI Workflow, Remotion Company License, Remotion Fundamentals Documentation, Remotion Video Project

### Community 4 - "PropShadow"
Cohesion: 0.09
Nodes (25): DesktopComputerInner(), DesktopComputerProps, SCREEN_MODES, TOWER_SIDES, TowerSide, BADGES_LIST, COLORS_LIST, LaptopBadge (+17 more)

### Community 5 - "package.json"
Cohesion: 0.14
Nodes (17): description, devDependencies, eslint@10.12.0, prettier@3.8.1, @types/react@19.3.0, @types/web@0.0.166, typescript@5.9.3, license (+9 more)

### Community 6 - "character/index.ts"
Cohesion: 0.11
Nodes (26): Character, Character, Character, COLORS, Character, Character, Character, COLORS (+18 more)

### Community 7 - "man/index.ts"
Cohesion: 0.25
Nodes (5): COLORS, solveArm, solveLeg, CharacterProps, LegPose

### Community 8 - "PROP_COLORS"
Cohesion: 0.09
Nodes (24): BugInner(), BugProps, BugState, SPOTS, STATES, LENSES, MagnifierLens, MagnifyingGlassProps (+16 more)

### Community 9 - "shared/presets.ts"
Cohesion: 0.12
Nodes (10): BROW, EYE, mixBrow(), mixEye(), mixFace(), NEUTRAL, RELAXED, STAND (+2 more)

### Community 10 - "boss/Body.tsx"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, DRESS_SHOE_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+5 more)

### Community 11 - "backend_programmer/Head.tsx"
Cohesion: 0.23
Nodes (20): FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES, TUFTS, Head() (+12 more)

### Community 12 - "remotion"
Cohesion: 0.12
Nodes (16): remotion, BriefcaseInner(), BriefcaseProps, BriefcaseVariant, PALETTES, VARIANTS, CloudServiceInner(), CloudServiceProps (+8 more)

### Community 13 - "project_manager/Body.tsx"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), PM_SHOE_SIZE, TORSO, Torso() (+5 more)

### Community 14 - "shared/rig.ts"
Cohesion: 0.13
Nodes (28): RIG, solveArm, solveLeg, Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck() (+20 more)

### Community 15 - "hacker/Head.tsx"
Cohesion: 0.20
Nodes (17): FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS (+9 more)

### Community 16 - "quality_assurance/Body.tsx"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), QA_SHOE_SIZE, TORSO, Torso() (+5 more)

### Community 17 - "body.tsx"
Cohesion: 0.13
Nodes (26): BodyPalette, DEFAULT_SHOE_SIZE, GroundShadow(), Hand(), HandDef, HandPart, HANDS, KNUCKLES (+18 more)

### Community 18 - "react"
Cohesion: 0.14
Nodes (12): react, ClipboardInner(), ClipboardProps, ClipboardVariant, VARIANTS, LightbulbProps, PackageBoxInner(), PackageBoxProps (+4 more)

### Community 19 - "ui.tsx"
Cohesion: 0.08
Nodes (101): react-icons, @remotion/media, Backsound(), HowJwtWorks(), HowJwtWorksProps, SCENE_SECONDS, Anatomy(), PART_AT (+93 more)

### Community 20 - "HandShape"
Cohesion: 0.35
Nodes (10): Arm(), BODY_PALETTE, CLOG_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+2 more)

### Community 21 - "doctor/Body.tsx"
Cohesion: 0.26
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+5 more)

### Community 22 - "CharacterRigCanvas"
Cohesion: 0.31
Nodes (11): Arm(), BODY_PALETTE, GroundShadow(), INNER_HEM, Leg(), Neck(), TORSO, Torso() (+3 more)

### Community 23 - "computeTorsoGeometry"
Cohesion: 0.38
Nodes (10): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+2 more)

### Community 24 - "characterRig.tsx"
Cohesion: 0.14
Nodes (11): ArmRenderProps, BASE_CHARACTER_SCHEMA, CharacterRigConfig, FRAMINGS, HeadRenderProps, LegRenderProps, TorsoRenderProps, VIEWBOX (+3 more)

### Community 25 - "resolveFace"
Cohesion: 0.15
Nodes (14): Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter, Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot) (+6 more)

### Community 26 - "PoseSpec"
Cohesion: 0.18
Nodes (11): Bentuk mulut (lip sync), Berjalan dan berlari, Ekspresi (32), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Mascot: Master Character Rig, Pemakaian dasar (+3 more)

### Community 27 - "backend_programmer/Body.tsx"
Cohesion: 0.28
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+5 more)

### Community 28 - "man/Body.tsx"
Cohesion: 0.31
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+4 more)

### Community 29 - "PottedPlant.tsx"
Cohesion: 0.19
Nodes (12): Cactus(), MONSTERA, Monstera(), PlantVariant, POT_COLORS, PotColor, POTS, PottedPlantInner() (+4 more)

### Community 30 - "face.tsx"
Cohesion: 0.20
Nodes (9): ell(), evalHairline(), FacePalette, GlassesShape, GlassesSpec, HeadProjection, MouthDef, MOUTHS (+1 more)

### Community 31 - "generate-audio.mjs"
Cohesion: 0.08
Nodes (37): add(), arp, bass(), bus(), CH, chordEp(), clap(), claps (+29 more)

### Community 32 - "v3"
Cohesion: 0.50
Nodes (9): Head(), Head(), Head(), Head(), createHeadProjection(), HairHeadShell(), rotX(), v3() (+1 more)

### Community 33 - "man/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, FaceConfig

### Community 34 - "Cara membaca script ini"
Cohesion: 0.13
Nodes (14): Cara membaca script ini, Memasang dubbing, Scene 10 — Masa berlaku, Scene 11 — Rangkuman & ajakan, Scene 1 — Hook, Scene 2 — Server itu pelupa, Scene 3 — Cara lama: session, Scene 4 — Bayangkan gelang konser (+6 more)

### Community 35 - "tech_lead/Body.tsx"
Cohesion: 0.40
Nodes (9): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+1 more)

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
Cohesion: 0.22
Nodes (8): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, OW

### Community 43 - "Playbook Video Motion Graphic Teknologi (Remotion)"
Cohesion: 0.09
Nodes (22): 0. Cara pakai (untuk manusia), 10. Format `script_dubbing.md` (WAJIB persis), 12. Alur kerja, 13. Definition of Done (WAJIB, centang semua), 14. Laporan akhir (Bahasa Indonesia), 1. Input, 2. Konteks proyek (WAJIB dibaca sebelum merancang), 3. Aturan kerja umum (WAJIB) (+14 more)

### Community 45 - "chef/index.ts"
Cohesion: 0.17
Nodes (8): ChefProps, applyMotion(), applyWave(), cycle(), swings(), talkAt(), VISEMES, ArmPose

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

### Community 57 - "dependencies"
Cohesion: 0.20
Nodes (9): dependencies, react@19.3.1, react-dom@19.3.1, react-icons@^5.7.0, remotion@4.0.543, @remotion/cli@4.0.543, @remotion/media@4.0.543, react-dom (+1 more)

### Community 58 - "frontend_programmer/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, JAW

### Community 59 - "fullstack_programmer/index.ts"
Cohesion: 0.25
Nodes (4): FullstackProgrammerProps, solveArm, solveLeg, POSE_NAMES

### Community 60 - "tech_lead/index.ts"
Cohesion: 0.29
Nodes (5): EXPRESSION_NAMES, TechLeadProps, COLORS, solveArm, solveLeg

### Community 61 - "ServerRack.tsx"
Cohesion: 0.33
Nodes (4): ServerRackInner(), ServerRackProps, ServerStatus, STATUSES

### Community 62 - "RigDemo.tsx"
Cohesion: 0.40
Nodes (4): @remotion/google-fonts@4.0.543, @remotion/google-fonts, Character, RigDemo()

### Community 63 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, upgrade

### Community 78 - "property/index.ts"
Cohesion: 0.21
Nodes (25): Briefcase, Bug, Clipboard, CloudService, CoffeeMug, DatabaseCylinder, DesktopComputer, Laptop (+17 more)

### Community 89 - "Graphify Claude Workflow Docs"
Cohesion: 0.50
Nodes (4): graphify-out/graph.json, Graphify Knowledge Graph, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md

## Knowledge Gaps
- **5 isolated node(s):** `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation`, `graphify-out/GRAPH_REPORT.md`, `graphify-out/wiki/index.md`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 374 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `P2`, `PropShadow`, `package.json`, `character/index.ts`, `PROP_COLORS`, `boss/Body.tsx`, `backend_programmer/Head.tsx`, `remotion`, `project_manager/Body.tsx`, `shared/rig.ts`, `hacker/Head.tsx`, `quality_assurance/Body.tsx`, `body.tsx`, `ui.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `characterRig.tsx`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `face.tsx`, `man/Head.tsx`, `tech_lead/Body.tsx`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `boss/Head.tsx`, `dependencies`, `frontend_programmer/Head.tsx`, `ServerRack.tsx`, `RigDemo.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.363) - this node is a cross-community bridge._
- **What connects `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `backend_programmer/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13704994192799072 - nodes in this community are weakly interconnected._
- **Why does `Playbook Video Motion Graphic Teknologi (Remotion)` connect `Playbook Video Motion Graphic Teknologi (Remotion)` to `ui.tsx`, `generate-audio.mjs`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Should `P2` be split into smaller, more focused modules?**
  _Cohesion score 0.05656565656565657 - nodes in this community are weakly interconnected._
- **Why does `11. Implementasi teknis` connect `ui.tsx` to `Playbook Video Motion Graphic Teknologi (Remotion)`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Should `PropShadow` be split into smaller, more focused modules?**
  _Cohesion score 0.0946969696969697 - nodes in this community are weakly interconnected._