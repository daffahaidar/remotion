# Graph Report - remotion  (2026-11-23)

## Corpus Check
- 177 files · ~89,908 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 5)

## Summary
- 1179 nodes · 3925 edges · 73 communities (69 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 77 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4968bec6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- character/index.ts
- Boss / Executive: Master Character Rig (`src/assets/character/boss`)
- P2
- Remotion Video Project
- PropShadow
- package.json
- shared/ui.tsx
- ShadyAppFails.tsx
- PROP_COLORS
- useLook
- boss/Body.tsx
- backend_programmer/Head.tsx
- remotion
- project_manager/Body.tsx
- Redirect.tsx
- hacker/Head.tsx
- quality_assurance/Body.tsx
- woman/Body.tsx
- react
- HowJwtWorks.tsx
- HandShape
- doctor/Body.tsx
- CharacterRigCanvas
- computeTorsoGeometry
- body.tsx
- SceneShell
- PoseSpec
- backend_programmer/Body.tsx
- man/Body.tsx
- PottedPlant.tsx
- shared/rig.ts
- generate-audio.mjs
- Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`)
- Cara membaca script ini
- Cara membaca script ini
- HowJwtWorks.tsx
- CoffeeMug.tsx
- Whiteboard.tsx
- Smartphone.tsx
- DatabaseCylinder.tsx
- Cara Menggunakan & Memasangkan dengan Karakter
- Trophy.tsx
- tech_lead/Body.tsx
- Playbook Video Motion Graphic Teknologi (Remotion)
- Reveal
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
- face.tsx
- add
- ServerRack.tsx
- RigDemo.tsx
- scripts
- 6. Formula per jenis konten
- allowScripts
- engines
- boss/Head.tsx
- noise
- Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`)
- property/index.ts
- Graphify Claude Workflow Docs

## God Nodes (most connected - your core abstractions)
1. `react` - 96 edges
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
- `11. Thumbnail cover 3:4 (WAJIB untuk setiap video)` --references--> `ChannelBadge()`  [INFERRED]
  src/content/PROMPT_TECH_VIDEO.md → src/content/shared/ChannelOutro.tsx
- `Modul Bersama (`src/assets/character/shared`)` --references--> `SkullShapeParams`  [INFERRED]
  src/assets/character/README.md → src/assets/character/shared/face.tsx
- `Memasang dubbing` --references--> `HowJwtWorks()`  [INFERRED]
  src/content/how-jwt-works/script_dubbing.md → src/content/how-jwt-works/HowJwtWorks.tsx
- `Memasang dubbing` --references--> `HowOauthWorks()`  [INFERRED]
  src/content/how-oauth-works/script_dubbing.md → src/content/how-oauth-works/HowOauthWorks.tsx
- `12. Implementasi teknis` --references--> `Actor()`  [INFERRED]
  src/content/PROMPT_TECH_VIDEO.md → src/content/shared/ui.tsx

## Import Cycles
- None detected.

## Communities (73 total, 4 thin omitted)

### Community 0 - "character/index.ts"
Cohesion: 0.05
Nodes (90): BackendProgrammerProps, Character, Isi folder, BossProps, Character, Character, ChefProps, DoctorProps (+82 more)

### Community 1 - "Boss / Executive: Master Character Rig (`src/assets/character/boss`)"
Cohesion: 0.29
Nodes (6): Boss / Executive: Master Character Rig (`src/assets/character/boss`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

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

### Community 6 - "shared/ui.tsx"
Cohesion: 0.13
Nodes (21): Equation(), Recap(), TIPS, Equation(), TIPS, fontFamily, SFX, THEME (+13 more)

### Community 7 - "ShadyAppFails.tsx"
Cohesion: 0.14
Nodes (29): Compare(), current(), EXPRESSIONS, Hacker(), HackerFails(), POSES, Recompute(), Stage() (+21 more)

### Community 8 - "PROP_COLORS"
Cohesion: 0.09
Nodes (24): BugInner(), BugProps, BugState, SPOTS, STATES, LENSES, MagnifierLens, MagnifyingGlassProps (+16 more)

### Community 9 - "useLook"
Cohesion: 0.13
Nodes (33): RFC-6749, RFC-7636, Field(), OAUTH, ROLE, Window(), clamp, Hacker() (+25 more)

### Community 10 - "boss/Body.tsx"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, DRESS_SHOE_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+5 more)

### Community 11 - "backend_programmer/Head.tsx"
Cohesion: 0.20
Nodes (27): FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES, TUFTS, Head() (+19 more)

### Community 12 - "remotion"
Cohesion: 0.12
Nodes (16): remotion, BriefcaseInner(), BriefcaseProps, BriefcaseVariant, PALETTES, VARIANTS, CloudServiceInner(), CloudServiceProps (+8 more)

### Community 13 - "project_manager/Body.tsx"
Cohesion: 0.23
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), PM_SHOE_SIZE, TORSO, Torso() (+6 more)

### Community 14 - "Redirect.tsx"
Cohesion: 0.17
Nodes (16): AppEntity(), Entity(), Calendar(), EVENTS, Stage(), AppScreen(), BackWithCode(), Budi() (+8 more)

### Community 15 - "hacker/Head.tsx"
Cohesion: 0.19
Nodes (14): Head(), Head(), FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE (+6 more)

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
Cohesion: 0.09
Nodes (25): Countdown(), Expiry(), Stage(), TokenRow(), Row(), ROWS, SERVERS, Session() (+17 more)

### Community 20 - "HandShape"
Cohesion: 0.25
Nodes (13): Arm(), BODY_PALETTE, CLOG_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+5 more)

### Community 21 - "doctor/Body.tsx"
Cohesion: 0.24
Nodes (14): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Character (+6 more)

### Community 22 - "CharacterRigCanvas"
Cohesion: 0.31
Nodes (11): Arm(), BODY_PALETTE, GroundShadow(), INNER_HEM, Leg(), Neck(), TORSO, Torso() (+3 more)

### Community 23 - "computeTorsoGeometry"
Cohesion: 0.27
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+5 more)

### Community 24 - "body.tsx"
Cohesion: 0.21
Nodes (13): DEFAULT_SHOE_SIZE, Hand(), HandDef, HandPart, HANDS, KNUCKLES, Leg(), pts() (+5 more)

### Community 25 - "SceneShell"
Cohesion: 0.26
Nodes (19): HowOauthWorks(), HowOauthWorksProps, SCENE_SECONDS, Anatomy(), RoleCard(), ROLES, TokenCard(), Hook() (+11 more)

### Community 26 - "PoseSpec"
Cohesion: 0.18
Nodes (11): Bentuk mulut (lip sync), Berjalan dan berlari, Ekspresi (32), Identitas & Panduan Peran (Reusable di Berbagai Plot), Isi folder, Komposisi di Studio (`npm run dev`), Mascot: Master Character Rig, Pemakaian dasar (+3 more)

### Community 27 - "backend_programmer/Body.tsx"
Cohesion: 0.35
Nodes (10): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), CharacterInner() (+2 more)

### Community 28 - "man/Body.tsx"
Cohesion: 0.18
Nodes (18): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso(), Tube() (+10 more)

### Community 29 - "PottedPlant.tsx"
Cohesion: 0.19
Nodes (12): Cactus(), MONSTERA, Monstera(), PlantVariant, POT_COLORS, PotColor, POTS, PottedPlantInner() (+4 more)

### Community 30 - "shared/rig.ts"
Cohesion: 0.24
Nodes (21): Shoe(), add(), ArmLayer, blendLimb(), capsulePath(), createLimbSolvers(), cross(), dot() (+13 more)

### Community 31 - "generate-audio.mjs"
Cohesion: 0.08
Nodes (21): arp, bus(), CH, claps, drums, duck, fx, keys (+13 more)

### Community 32 - "Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`)"
Cohesion: 0.40
Nodes (5): Backend Programmer: Master Character Rig (`src/assets/character/backend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

### Community 33 - "Cara membaca script ini"
Cohesion: 0.12
Nodes (16): Cara membaca script ini, Memasang dubbing, Scene 10 — Pengaman ekstra: PKCE, Scene 11 — Rangkuman, Scene 12 — Outro channel, Scene 1 — Hook, Scene 2 — Masalahnya, Scene 3 — Cara lama: kasih password (+8 more)

### Community 34 - "Cara membaca script ini"
Cohesion: 0.12
Nodes (15): Cara membaca script ini, Memasang dubbing, Scene 10 — Masa berlaku, Scene 11 — Rangkuman, Scene 12 — Outro channel, Scene 1 — Hook, Scene 2 — Server itu pelupa, Scene 3 — Cara lama: session (+7 more)

### Community 35 - "HowJwtWorks.tsx"
Cohesion: 0.10
Nodes (30): react-icons, HowJwtWorks(), HowJwtWorksProps, SCENE_SECONDS, Anatomy(), PART_AT, PartCard(), DECODED (+22 more)

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
Cohesion: 0.25
Nodes (13): GroundShadow(), Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Torso() (+5 more)

### Community 43 - "Playbook Video Motion Graphic Teknologi (Remotion)"
Cohesion: 0.14
Nodes (13): 0. Cara pakai (untuk manusia), 10. Format `script_dubbing.md` (WAJIB persis), 11. Thumbnail cover 3:4 (WAJIB untuk setiap video), 13. Alur kerja, 14. Definition of Done (WAJIB, centang semua), 15. Laporan akhir (Bahasa Indonesia), 1. Input, 3. Aturan kerja umum (WAJIB) (+5 more)

### Community 45 - "Reveal"
Cohesion: 0.25
Nodes (25): Flow(), Caption(), Flow(), S, Exchange(), Intercept(), Stage(), Value() (+17 more)

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

### Community 56 - "Root.tsx"
Cohesion: 0.12
Nodes (3): TOTAL_SECONDS, TOTAL_SECONDS, RemotionRoot()

### Community 57 - "dependencies"
Cohesion: 0.18
Nodes (10): dependencies, react@19.3.1, react-dom@19.3.1, react-icons@^5.7.0, remotion@4.0.543, @remotion/cli@4.0.543, @remotion/media@4.0.543, react-dom (+2 more)

### Community 58 - "frontend_programmer/Head.tsx"
Cohesion: 0.09
Nodes (22): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, FACE_CFG (+14 more)

### Community 59 - "face.tsx"
Cohesion: 0.22
Nodes (10): buildHairCapPath(), ell(), evalHairline(), FacePalette, GlassesShape, GlassesSpec, HeadProjection, MouthDef (+2 more)

### Community 60 - "add"
Cohesion: 0.36
Nodes (10): add(), bass(), chordEp(), clap(), ep(), groove(), hat(), mtof() (+2 more)

### Community 61 - "ServerRack.tsx"
Cohesion: 0.33
Nodes (4): ServerRackInner(), ServerRackProps, ServerStatus, STATUSES

### Community 62 - "RigDemo.tsx"
Cohesion: 0.40
Nodes (4): @remotion/google-fonts@4.0.543, @remotion/google-fonts, Character, RigDemo()

### Community 63 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, upgrade

### Community 64 - "6. Formula per jenis konten"
Cohesion: 0.22
Nodes (9): 6.1 Cara Kerja (explainer), sama seperti video referensi, 6.2 Tutorial (how-to), 6.3 Fakta Unik (listicle), 6.4 Berita Teknologi, 6.5 Perbandingan (X vs Y), 6.6 Mitos vs Fakta, 6.7 Tips & Tools, 6.8 Lainnya (sejarah, review, opini, karier, event, dll.) (+1 more)

### Community 68 - "boss/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS

### Community 69 - "noise"
Cohesion: 0.29
Nodes (7): 9. Audio (WAJIB), impact(), kick(), kickAt(), noise(), rand(), riser()

### Community 70 - "Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`)"
Cohesion: 0.40
Nodes (5): Frontend Programmer: Master Character Rig (`src/assets/character/frontend_programmer`), Identitas & Panduan Peran (Reusable di Berbagai Plot), Komposisi di Studio (`npm run dev`), Pemakaian dasar, Props khusus karakter

### Community 78 - "property/index.ts"
Cohesion: 0.21
Nodes (25): Briefcase, Bug, Clipboard, CloudService, CoffeeMug, DatabaseCylinder, DesktopComputer, Laptop (+17 more)

### Community 89 - "Graphify Claude Workflow Docs"
Cohesion: 0.50
Nodes (4): graphify-out/graph.json, Graphify Knowledge Graph, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md

## Knowledge Gaps
- **7 isolated node(s):** `RFC-6749`, `RFC-7636`, `Remotion CLI Workflow`, `Remotion Company License`, `Remotion Fundamentals Documentation` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 415 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `character/index.ts`, `P2`, `PropShadow`, `package.json`, `shared/ui.tsx`, `ShadyAppFails.tsx`, `PROP_COLORS`, `useLook`, `boss/Body.tsx`, `backend_programmer/Head.tsx`, `remotion`, `project_manager/Body.tsx`, `Redirect.tsx`, `hacker/Head.tsx`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `HowJwtWorks.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `body.tsx`, `SceneShell`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `HowJwtWorks.tsx`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `tech_lead/Body.tsx`, `Reveal`, `dependencies`, `frontend_programmer/Head.tsx`, `face.tsx`, `ServerRack.tsx`, `RigDemo.tsx`, `boss/Head.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.392) - this node is a cross-community bridge._
- **What connects `RFC-6749`, `RFC-7636`, `Remotion CLI Workflow` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `character/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05200433369447454 - nodes in this community are weakly interconnected._
- **Why does `remotion` connect `remotion` to `character/index.ts`, `PropShadow`, `package.json`, `shared/ui.tsx`, `ShadyAppFails.tsx`, `PROP_COLORS`, `useLook`, `boss/Body.tsx`, `project_manager/Body.tsx`, `Redirect.tsx`, `quality_assurance/Body.tsx`, `woman/Body.tsx`, `react`, `HowJwtWorks.tsx`, `HandShape`, `doctor/Body.tsx`, `CharacterRigCanvas`, `computeTorsoGeometry`, `SceneShell`, `backend_programmer/Body.tsx`, `man/Body.tsx`, `PottedPlant.tsx`, `HowJwtWorks.tsx`, `CoffeeMug.tsx`, `Whiteboard.tsx`, `Smartphone.tsx`, `DatabaseCylinder.tsx`, `Trophy.tsx`, `tech_lead/Body.tsx`, `Root.tsx`, `dependencies`, `ServerRack.tsx`, `RigDemo.tsx`, `property/index.ts`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `P2` be split into smaller, more focused modules?**
  _Cohesion score 0.06280193236714976 - nodes in this community are weakly interconnected._
- **Why does `Playbook Video Motion Graphic Teknologi (Remotion)` connect `Playbook Video Motion Graphic Teknologi (Remotion)` to `6. Formula per jenis konten`, `HowJwtWorks.tsx`, `noise`, `Reveal`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `PropShadow` be split into smaller, more focused modules?**
  _Cohesion score 0.0946969696969697 - nodes in this community are weakly interconnected._