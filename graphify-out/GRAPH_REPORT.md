# Graph Report - remotion  (2026-11-19)

## Corpus Check
- 141 files · ~59,779 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 5)

## Summary
- 960 nodes · 2573 edges · 61 communities (57 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `47ee48b5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- characterRig.tsx
- Boss / Executive: Master Character Rig (`src/assets/character/boss`)
- P2
- Remotion Video Project
- PropShadow
- Project Dependencies & Tooling
- ModelSheet.tsx
- hacker/Body.tsx
- PROP_COLORS
- boss/Body.tsx
- v3
- PROP_OW
- project_manager/Body.tsx
- shared/rig.ts
- hacker/Head.tsx
- quality_assurance/Body.tsx
- woman/Body.tsx
- PackageBox.tsx
- Root.tsx
- chef/Head.tsx
- doctor/Body.tsx
- CharacterRigCanvas
- computeTorsoGeometry
- tech_lead/Body.tsx
- Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`)
- PoseSpec
- backend_programmer/Body.tsx
- man/Body.tsx
- PottedPlant.tsx
- face.tsx
- react
- backend_programmer/Head.tsx
- boss/Head.tsx
- frontend_programmer/Head.tsx
- body.tsx
- remotion
- Briefcase.tsx
- property/index.ts
- DatabaseCylinder.tsx
- Cara Menggunakan & Memasangkan dengan Karakter
- Trophy.tsx
- ServerRack.tsx
- OfficeDesk.tsx
- Padlock.tsx
- PROP_INK
- Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`)
- Chef: Culinary Analogy Character Rig (`src/assets/character/chef`)
- Doctor: Diagnostic Analogy Character Rig (`src/assets/character/doctor`)
- Fullstack Programmer: Dual-Stack Character Rig (`src/assets/character/fullstack_programmer`)
- Hacker: Cybersecurity & Stealth Character Rig (`src/assets/character/hacker`)
- Project Manager: Agile Coordinator Character Rig (`src/assets/character/project_manager`)
- Quality Assurance (QA): Bug-Hunter Character Rig (`src/assets/character/quality_assurance`)
- TypeScript Compiler Config
- Mascot Character Rigs (`src/assets/character/*`)
- Tech Lead: Senior Architect Character Rig (`src/assets/character/tech_lead`)
- Woman: Hijabi Master Character Rig (`src/assets/character/woman`)
- @remotion/google-fonts
- PropertySheet.tsx
- Graphify Claude Workflow Docs

## God Nodes (most connected - your core abstractions)
1. `react` - 67 edges
2. `remotion` - 44 edges
3. `PropShadow()` - 40 edges
4. `computeTorsoGeometry()` - 38 edges
5. `CharacterRigCanvas()` - 36 edges
6. `createHeadProjection()` - 27 edges
7. `HairHeadShell()` - 26 edges
8. `Framing` - 25 edges
9. `v3()` - 25 edges
10. `FaceSpec` - 24 edges

## Surprising Connections (you probably didn't know these)
- `Modul Bersama (`src/assets/character/shared`)` --references--> `SkullShapeParams`  [INFERRED]
  src/assets/character/README.md → src/assets/character/shared/face.tsx
- `Isi folder` --references--> `mixFace()`  [INFERRED]
  src/assets/character/backend_programmer/README.md → src/assets/character/shared/presets.ts
- `Isi folder` --references--> `resolveFace()`  [INFERRED]
  src/assets/character/backend_programmer/README.md → src/assets/character/shared/presets.ts
- `Isi folder` --references--> `resolvePose()`  [INFERRED]
  src/assets/character/backend_programmer/README.md → src/assets/character/shared/presets.ts
- `Isi folder` --references--> `mixFace()`  [INFERRED]
  src/assets/character/frontend_programmer/README.md → src/assets/character/shared/presets.ts

## Import Cycles
- None detected.

## Communities (61 total, 4 thin omitted)

### Community 0 - "characterRig.tsx"
Cohesion: 0.09
Nodes (48): Isi folder, Isi folder, Kustomisasi, Props, ArmRenderProps, CharacterRigConfig, Framing, FRAMINGS (+40 more)

### Community 1 - "Boss / Executive: Master Character Rig (`src/assets/character/boss`)"
Cohesion: 0.29
Nodes (6): Boss / Executive: Master Character Rig (`src/assets/character/boss`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

### Community 2 - "P2"
Cohesion: 0.07
Nodes (34): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, FACE_CFG (+26 more)

### Community 3 - "Remotion Video Project"
Cohesion: 0.50
Nodes (4): Remotion CLI Workflow, Remotion Company License, Remotion Fundamentals Documentation, Remotion Video Project

### Community 4 - "PropShadow"
Cohesion: 0.11
Nodes (20): CoffeeMugInner(), DesktopComputer, DesktopComputerInner(), DesktopComputerProps, SCREEN_MODES, TOWER_SIDES, TowerSide, BADGES_LIST (+12 more)

### Community 5 - "Project Dependencies & Tooling"
Cohesion: 0.06
Nodes (37): allowScripts, esbuild, dependencies, react@19.3.1, react-dom@19.3.1, react-icons@^5.7.0, remotion@4.0.543, @remotion/cli@4.0.543 (+29 more)

### Community 6 - "ModelSheet.tsx"
Cohesion: 0.09
Nodes (10): ACTIONS, Label(), ModelSheet(), MOUTH_CHART, Section(), Sheet, SheetId, SheetLayout() (+2 more)

### Community 7 - "hacker/Body.tsx"
Cohesion: 0.21
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Character (+6 more)

### Community 8 - "PROP_COLORS"
Cohesion: 0.12
Nodes (22): Bug, BugInner(), BugProps, BugState, SPOTS, STATES, LENSES, MagnifierLens (+14 more)

### Community 10 - "boss/Body.tsx"
Cohesion: 0.15
Nodes (18): Arm(), BODY_PALETTE, DRESS_SHOE_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+10 more)

### Community 11 - "v3"
Cohesion: 0.30
Nodes (22): Head(), Head(), Head(), Head(), Head(), Head(), Head(), buildEars() (+14 more)

### Community 12 - "PROP_OW"
Cohesion: 0.29
Nodes (7): CloudService, CloudServiceInner(), CloudServiceProps, CloudStatus, STATUSES, SyncArrow(), PROP_OW

### Community 13 - "project_manager/Body.tsx"
Cohesion: 0.21
Nodes (15): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), PM_SHOE_SIZE, TORSO, Torso() (+7 more)

### Community 14 - "shared/rig.ts"
Cohesion: 0.18
Nodes (24): COLORS, solveArm, solveLeg, Shoe(), add(), blendLimb(), capsulePath(), createLimbSolvers() (+16 more)

### Community 15 - "hacker/Head.tsx"
Cohesion: 0.12
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS

### Community 16 - "quality_assurance/Body.tsx"
Cohesion: 0.10
Nodes (23): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), QA_SHOE_SIZE, TORSO, Torso() (+15 more)

### Community 17 - "woman/Body.tsx"
Cohesion: 0.13
Nodes (15): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+7 more)

### Community 18 - "PackageBox.tsx"
Cohesion: 0.29
Nodes (6): PackageBox, PackageBoxInner(), PackageBoxProps, PackageVariant, PALETTES, VARIANTS

### Community 20 - "chef/Head.tsx"
Cohesion: 0.10
Nodes (23): Arm(), BODY_PALETTE, CLOG_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+15 more)

### Community 21 - "doctor/Body.tsx"
Cohesion: 0.27
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Character (+5 more)

### Community 22 - "CharacterRigCanvas"
Cohesion: 0.16
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), INNER_HEM, Leg(), Neck(), TORSO, Torso() (+6 more)

### Community 23 - "computeTorsoGeometry"
Cohesion: 0.17
Nodes (15): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Character (+7 more)

### Community 24 - "tech_lead/Body.tsx"
Cohesion: 0.23
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Character (+6 more)

### Community 25 - "Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`)"
Cohesion: 0.40
Nodes (5): Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

### Community 26 - "PoseSpec"
Cohesion: 0.18
Nodes (11): Bentuk mulut (lip sync), Berjalan dan berlari, Ekspresi (32), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Mascot: Master Character Rig, Pemakaian dasar (+3 more)

### Community 27 - "backend_programmer/Body.tsx"
Cohesion: 0.17
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), BackendProgrammerProps (+6 more)

### Community 28 - "man/Body.tsx"
Cohesion: 0.15
Nodes (17): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+9 more)

### Community 29 - "PottedPlant.tsx"
Cohesion: 0.18
Nodes (13): Cactus(), MONSTERA, Monstera(), PlantVariant, POT_COLORS, PotColor, POTS, PottedPlant (+5 more)

### Community 30 - "face.tsx"
Cohesion: 0.18
Nodes (13): buildHairCapPath(), ell(), evalHairline(), FacePalette, GlassesShape, GlassesSpec, HeadProjection, MouthDef (+5 more)

### Community 31 - "react"
Cohesion: 0.18
Nodes (9): react, Lightbulb, LightbulbProps, MedicalKit, MedicalKitInner(), MedicalKitProps, MedicalKitVariant, VARIANTS (+1 more)

### Community 32 - "backend_programmer/Head.tsx"
Cohesion: 0.17
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, JAW

### Community 33 - "boss/Head.tsx"
Cohesion: 0.14
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS

### Community 34 - "frontend_programmer/Head.tsx"
Cohesion: 0.13
Nodes (14): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, FACE_CFG, HAIRLINE (+6 more)

### Community 35 - "body.tsx"
Cohesion: 0.23
Nodes (11): DEFAULT_SHOE_SIZE, Hand(), HandDef, HandPart, HANDS, KNUCKLES, Leg(), pts() (+3 more)

### Community 36 - "remotion"
Cohesion: 0.29
Nodes (6): remotion, Clipboard, ClipboardInner(), ClipboardProps, ClipboardVariant, VARIANTS

### Community 37 - "Briefcase.tsx"
Cohesion: 0.29
Nodes (6): Briefcase, BriefcaseInner(), BriefcaseProps, BriefcaseVariant, PALETTES, VARIANTS

### Community 38 - "property/index.ts"
Cohesion: 0.12
Nodes (20): CoffeeMug, CoffeeMugColor, CoffeeMugProps, CoffeeMugVariant, COLORS_LIST, PALETTES, VARIANTS, FRAME_COLORS (+12 more)

### Community 39 - "DatabaseCylinder.tsx"
Cohesion: 0.25
Nodes (6): DatabaseCylinder, DatabaseCylinderInner(), DatabaseCylinderProps, DatabaseVariant, PALETTE, VARIANTS

### Community 40 - "Cara Menggunakan & Memasangkan dengan Karakter"
Cohesion: 0.29
Nodes (6): 1. Karakter Mengetik di Meja Kerja (`pose="typing"`), 2. Analogi Tutorial: Chef Menyajikan HTML / JSON, 3. Analogi Sistem & Server Down: Doctor + Monitor ECG + ServerRack, Cara Menggunakan & Memasangkan dengan Karakter, Daftar Properti & Variannya, Reusable Character Properties (`src/assets/property/`)

### Community 41 - "Trophy.tsx"
Cohesion: 0.29
Nodes (7): PALETTES, star(), Trophy, TrophyInner(), TrophyProps, TrophyVariant, VARIANTS

### Community 42 - "ServerRack.tsx"
Cohesion: 0.29
Nodes (5): ServerRack, ServerRackInner(), ServerRackProps, ServerStatus, STATUSES

### Community 43 - "OfficeDesk.tsx"
Cohesion: 0.29
Nodes (5): DeskVariant, OfficeDesk, OfficeDeskInner(), OfficeDeskProps, VARIANTS

### Community 44 - "Padlock.tsx"
Cohesion: 0.29
Nodes (6): COLORS_LIST, Padlock, PadlockColor, PadlockInner(), PadlockProps, PALETTES

### Community 45 - "PROP_INK"
Cohesion: 0.29
Nodes (6): ClocheDish, DISHES, ServingCloche, ServingClocheInner(), ServingClocheProps, PROP_INK

### Community 47 - "Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`)"
Cohesion: 0.40
Nodes (5): Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

### Community 48 - "Chef: Culinary Analogy Character Rig (`src/assets/character/chef`)"
Cohesion: 0.50
Nodes (3): Chef: Culinary Analogy Character Rig (`src/assets/character/chef`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter

### Community 49 - "Doctor: Diagnostic Analogy Character Rig (`src/assets/character/doctor`)"
Cohesion: 0.50
Nodes (3): Doctor: Diagnostic Analogy Character Rig (`src/assets/character/doctor`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter

### Community 50 - "Fullstack Programmer: Dual-Stack Character Rig (`src/assets/character/fullstack_programmer`)"
Cohesion: 0.50
Nodes (3): Fullstack Programmer: Dual-Stack Character Rig (`src/assets/character/fullstack_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter

### Community 51 - "Hacker: Cybersecurity & Stealth Character Rig (`src/assets/character/hacker`)"
Cohesion: 0.50
Nodes (3): Hacker: Cybersecurity & Stealth Character Rig (`src/assets/character/hacker`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter

### Community 52 - "Project Manager: Agile Coordinator Character Rig (`src/assets/character/project_manager`)"
Cohesion: 0.50
Nodes (3): Identitas & Panduan Peran (Reusable di Berbagai Plot), Project Manager: Agile Coordinator Character Rig (`src/assets/character/project_manager`), Props khusus karakter

### Community 53 - "Quality Assurance (QA): Bug-Hunter Character Rig (`src/assets/character/quality_assurance`)"
Cohesion: 0.50
Nodes (3): Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter, Quality Assurance (QA): Bug-Hunter Character Rig (`src/assets/character/quality_assurance`)

### Community 54 - "TypeScript Compiler Config"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module, moduleResolution, noEmit (+5 more)

### Community 55 - "Mascot Character Rigs (`src/assets/character/*`)"
Cohesion: 0.50
Nodes (4): Import Gabungan dari `../character`, Mascot Character Rigs (`src/assets/character/*`), Modul Bersama (`src/assets/character/shared`), Panduan Casting Cepat (Reusable di Segala Plot)

### Community 56 - "Tech Lead: Senior Architect Character Rig (`src/assets/character/tech_lead`)"
Cohesion: 0.50
Nodes (3): Identitas & Panduan Peran (Reusable di Berbagai Plot), Props khusus karakter, Tech Lead: Senior Architect Character Rig (`src/assets/character/tech_lead`)

### Community 57 - "Woman: Hijabi Master Character Rig (`src/assets/character/woman`)"
Cohesion: 0.67
Nodes (3): Identitas & Panduan Peran (Reusable di Berbagai Plot), Pemakaian dasar, Woman: Hijabi Master Character Rig (`src/assets/character/woman`)

### Community 78 - "PropertySheet.tsx"
Cohesion: 0.08
Nodes (3): PropCard(), PropertySheet(), SectionTitle()

### Community 89 - "Graphify Claude Workflow Docs"
Cohesion: 0.50
Nodes (4): graphify-out/graph.json, Graphify Knowledge Graph, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md

## Knowledge Gaps
- **5 isolated node(s):** `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation`, `graphify-out/GRAPH_REPORT.md`, `graphify-out/wiki/index.md`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 394 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `characterRig.tsx`, `P2`, `PropShadow`, `Project Dependencies & Tooling`, `ModelSheet.tsx`, `hacker/Body.tsx`, `PROP_COLORS`, `boss/Body.tsx`, `PROP_OW`, `project_manager/Body.tsx`, `hacker/Head.tsx`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `PackageBox.tsx`, `Root.tsx`, `chef/Head.tsx`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `tech_lead/Body.tsx`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `face.tsx`, `backend_programmer/Head.tsx`, `boss/Head.tsx`, `frontend_programmer/Head.tsx`, `body.tsx`, `remotion`, `Briefcase.tsx`, `property/index.ts`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `ServerRack.tsx`, `OfficeDesk.tsx`, `Padlock.tsx`, `PROP_INK`, `PropertySheet.tsx`?**
  _High betweenness centrality (0.387) - this node is a cross-community bridge._
- **What connects `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `characterRig.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08837719298245614 - nodes in this community are weakly interconnected._
- **Why does `remotion` connect `remotion` to `characterRig.tsx`, `PropShadow`, `Project Dependencies & Tooling`, `ModelSheet.tsx`, `hacker/Body.tsx`, `PROP_COLORS`, `boss/Body.tsx`, `PROP_OW`, `project_manager/Body.tsx`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `PackageBox.tsx`, `Root.tsx`, `chef/Head.tsx`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `tech_lead/Body.tsx`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `react`, `Briefcase.tsx`, `property/index.ts`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `ServerRack.tsx`, `OfficeDesk.tsx`, `Padlock.tsx`, `PROP_INK`, `PropertySheet.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `P2` be split into smaller, more focused modules?**
  _Cohesion score 0.07396870554765292 - nodes in this community are weakly interconnected._
- **Why does `SkullShapeParams` connect `P2` to `boss/Head.tsx`, `hacker/Head.tsx`, `quality_assurance/Body.tsx`, `chef/Head.tsx`, `Mascot Character Rigs (`src/assets/character/*`)`, `face.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `PropShadow` be split into smaller, more focused modules?**
  _Cohesion score 0.10507246376811594 - nodes in this community are weakly interconnected._