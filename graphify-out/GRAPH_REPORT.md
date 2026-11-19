# Graph Report - remotion  (2026-11-19)

## Corpus Check
- 141 files · ~1,235,579 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1867 nodes · 3782 edges · 113 communities (112 shown, 1 thin omitted)
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 615 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `adc14470`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Property Components & Shared Primitives
- Backend Programmer Head Rig
- Property Visual Sheet
- Character Documentation & Rigs
- Boss & Backend Character Exports
- Project Dependencies & Tooling
- Remotion Compositions & Entry
- QA Model Sheet & Palette
- Backend Programmer Body Rig
- Frontend Programmer Model Sheet
- Frontend & Doctor Body Rigs
- Backend Positive & Alert Expressions
- PM Positive & Action Expressions
- Chef Body Rig
- Project Manager Body Rig
- QA Body Rig
- Tech Lead Body & Shared Face
- Backend Negative & Comic Expressions
- Doctor Distress Expressions & Glasses
- Fullstack Negative & Comic Expressions
- Man Negative & Distress Expressions
- Hacker Positive & Alert Expressions
- PM Negative & Distress Expressions
- Woman Negative & Distress Expressions
- Character Motion & Shared Rig
- Boss Expressions & Gesture Poses
- Chef Positive Expressions & Stances
- Doctor Body Parts & Torso
- Tech Lead Negative Expressions
- Woman Positive & Cheeky Expressions
- Chef Negative & Comic Expressions
- Fullstack Programmer Body Rig
- Fullstack Positive & Excited Expressions
- Hacker Negative & Cognitive Expressions
- Doctor Positive & Social Expressions
- Shared Rig Geometry & Math
- Backend Rig & Character Props
- Boss Negative & Distress Expressions
- Man Positive & Excited Expressions
- Hacker Visual Style & Palette
- Tech Lead Comic & Social Expressions
- Backend Programmer Visual Design
- Fullstack Programmer Visual Design
- Man Body Rig
- Project Manager Visual Design
- Shared Expression Presets
- Boss Comic & Skeptical Expressions
- Tech Lead Visual Design
- Boss Body Rig
- Chef Visual Design & Palette
- Hacker Body Rig
- Boss Visual Design & Palette
- PM Lip Sync & Front Rig
- Tech Lead Lip Sync & Surprise
- TypeScript Compiler Config
- Boss Lip Sync & Surprise
- Man Master Rig Overview
- Woman Lip Sync & Surprise
- Backend Lip Sync Visemes
- Chef Cognitive & Skeptical Expressions
- Chef Stance & Locomotion Poses
- Doctor Lip Sync Visemes
- Hacker Lip Sync Visemes
- Doctor Visual Design & Stethoscope
- Hacker Distress & Relief Expressions
- Tech Lead Turnaround & Locomotion
- Woman Turnaround & Locomotion
- Chef Sad & Embarrassed Expressions
- Fullstack Lip Sync Visemes
- Man Turnaround & Locomotion
- Man Lip Sync Visemes
- Woman Visual Design & Hijab
- Chef Lip Sync Visemes
- Hacker Turnaround & Locomotion
- Backend Turnaround & Locomotion
- Boss Turnaround & Idle Pose
- Doctor Angry & Peace Poses
- Doctor Turnaround & Locomotion
- Fullstack Character Module Exports
- Fullstack Turnaround & Locomotion
- PM Turnaround & Locomotion
- Tech Lead Cheer & Clap Poses
- Fullstack Celebratory Expressions & Poses
- Doctor Eureka & Dance Poses
- Fullstack Skeptical & Think Poses
- Man Surprised & Idea Poses
- PM Bashful & Blush Motifs
- PM Surprised & Idea Poses
- Woman Embarrassed & Welcome Poses
- Graphify Claude Workflow Docs
- Man Thinking & Shrug Poses
- Man Focused & Typing Poses
- Tech Lead Thinking & Shrug Poses
- Woman Excited & Dance Poses
- Hacker Bashful & Heart Eyes
- Woman Bashful & Heart Eyes
- Backend Bashful & Heart Eyes
- PM Focused & Typing Poses
- PropShadow
- PottedPlant.tsx
- CoffeeMug.tsx
- Smartphone.tsx
- boss/Head.tsx
- Trophy.tsx
- Briefcase.tsx
- PackageBox.tsx
- Padlock.tsx
- ServerRack.tsx
- Expression: surprised (Raised Brows, Wide Eyes, O-Mouth)
- Expression: wink
- Expression: excited

## God Nodes (most connected - your core abstractions)
1. `Expressions Grid (32 Facial Expressions)` - 40 edges
2. `Expressions Section (32 Facial Expressions)` - 36 edges
3. `Expressions Section (32 Facial Expression Heads)` - 36 edges
4. `32 Facial Expressions Grid` - 35 edges
5. `Expressions Section (32 Facial Expressions)` - 35 edges
6. `Expressions Section (32 Facial Expressions)` - 34 edges
7. `Expressions Section (32 Facial Expressions)` - 34 edges
8. `Expressions Section (32 Facial Expressions)` - 34 edges
9. `Poses and Actions Grid (28 Full-Body Poses)` - 34 edges
10. `Expressions Section (32 Facial Expression States)` - 34 edges

## Surprising Connections (you probably didn't know these)
- `Master Character Rigs Catalog` --conceptually_related_to--> `Remotion Video Project`  [INFERRED]
  character/README.md → README.md
- `Reusable Character Properties Collection` --conceptually_related_to--> `Remotion Video Project`  [INFERRED]
  property/README.md → README.md
- `Floor Alignment & Desk Pairing Pattern` --shares_data_with--> `Rig Coordinate & Grounding System`  [EXTRACTED]
  property/README.md → character/man/README.md
- `Head()` --indirect_call--> `pts()`  [INFERRED]
  character/hacker/Head.tsx → character/shared/body.tsx
- `Head()` --indirect_call--> `pts()`  [INFERRED]
  character/woman/Head.tsx → character/shared/body.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Floor-Aligned Typing Workstation Scene Composition** — property_readme_flooralignmentpattern, character_man_readme_rigcoordinatesystem, character_frontend_programmer_readme_frontendcharacter, property_readme_officedesk, property_readme_laptop, property_readme_coffeemug [EXTRACTED 1.00]
- **Shared 2D SVG Character Rig Interface & Core Modules** — character_readme_mastercharacterrigcatalog, character_readme_sharedrigmodule, character_shared_rig, character_shared_presets, character_shared_motion, character_shared_face, character_shared_body, character_shared_characterrig, character_man_readme_standardcharacterprops [EXTRACTED 1.00]
- **Software Engineering Team Drama & Release Workflow Ensemble** — character_boss_readme_bosscharacter, character_project_manager_readme_pmcharacter, character_tech_lead_readme_techleadcharacter, character_frontend_programmer_readme_frontendcharacter, character_backend_programmer_readme_backendcharacter, character_fullstack_programmer_readme_fullstackcharacter, character_quality_assurance_readme_qacharacter [INFERRED 0.85]

## Communities (113 total, 1 thin omitted)

### Community 0 - "Property Components & Shared Primitives"
Cohesion: 0.11
Nodes (14): DesktopComputer, DesktopComputerProps, SCREEN_MODES, TOWER_SIDES, TowerSide, BADGES_LIST, COLORS_LIST, LaptopBadge (+6 more)

### Community 1 - "Backend Programmer Head Rig"
Cohesion: 0.11
Nodes (24): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, ell() (+16 more)

### Community 2 - "Property Visual Sheet"
Cohesion: 0.05
Nodes (58): Web/API Culinary Analogy (Serving HTML </> and JSON { } under ServingCloche), Server Health & Incident Diagnostics Metaphor (ERR 500, DB-FAIL, API-ERR, Vitals Monitor), Briefcase (dark): Dark Slate Executive Briefcase with Dual Latches, Briefcase (leather): Warm Tan Leather Briefcase with Twin Buckles & Sparkle, Chef Character Rig (Toque Hat, Mustache, Chef Jacket & Apron), Doctor Character Rig (Glasses, White Lab Coat, Teal Scrubs, Stethoscope), Frontend Character Rig (Glasses, Dark Ponytail, Purple Hoodie), Clipboard (medical): VITALS Clipboard with Red Cross & ECG Waveform (+50 more)

### Community 3 - "Character Documentation & Rigs"
Cohesion: 0.11
Nodes (55): BackendProgrammerCharacter, Backend Character Props (showGlasses, showHeadphones, showBadge), Mascot/BackendProgrammerRig & ModelSheet, BossCharacter (Executive / Client Rig), Boss Character Props (showMustache, showGlasses), Mascot/BossRig & BossModelSheet, ChefCharacter (Culinary Analogy Rig), Chef Character Props (showHat, showMustache) (+47 more)

### Community 4 - "Boss & Backend Character Exports"
Cohesion: 0.06
Nodes (42): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS, FACE_CFG (+34 more)

### Community 5 - "Project Dependencies & Tooling"
Cohesion: 0.05
Nodes (42): eslint, allowScripts, esbuild, dependencies, react, react-dom, react-icons, remotion (+34 more)

### Community 6 - "Remotion Compositions & Entry"
Cohesion: 0.08
Nodes (31): Character, ACTIONS, BACKEND_SWATCHES, BackendProgrammerModelSheet(), BOSS_SWATCHES, BossModelSheet(), CHEF_SWATCHES, ChefModelSheet() (+23 more)

### Community 7 - "QA Model Sheet & Palette"
Cohesion: 0.09
Nodes (37): 2D Flat Vector Cartoon Style (Dark Ink Outlines, Chibi Proportions, Soft Cream Backdrop), Amber Sweater Vest over White Long-Sleeve Collared Shirt, Character Color Palette (6 Swatches), Negative and Distress Expressions (angry, furious, sad, crying, worried, scared, disgusted, pleading, dizzy, embarrassed, nervousLaugh, sleepy), Neutral and Cognitive Expressions (neutral, thinking, confused, eureka, skeptical, focused, determined), Positive Expressions (happy, laugh, smirk, wink, excited, love, proud, relief), Reactive and Playful Expressions (surprised, jawDrop, sideEye, eyeRoll, cheeky), 32 Facial Expressions Grid (4x8) (+29 more)

### Community 8 - "Backend Programmer Body Rig"
Cohesion: 0.09
Nodes (28): DEFAULT_SHOE_SIZE, Hand(), HandDef, HandPart, HANDS, KNUCKLES, Leg(), pts() (+20 more)

### Community 9 - "Frontend Programmer Model Sheet"
Cohesion: 0.10
Nodes (34): Indigo Crewneck Sweater with Cyan </> Code Emblem, Character Six-Swatch Color Palette, Cognitive & Skeptical Expressions (thinking, confused, focused, skeptical, sideEye, eyeRoll, determined), Stylized Comic & Anime-Trope Expressions (excited star-eyes, love heart-eyes, dizzy X-eyes, cheeky tongue, crying tears, embarrassed/nervousLaugh sweat-drops), Positive & Friendly Expressions (neutral, happy, laugh, smirk, wink, proud, relief), Surprise, Anger & Distress Expressions (surprised, jawDrop, eureka, angry, furious, sad, worried, scared, pleading, disgusted, sleepy), 32 Facial Expressions Grid, Thick Dark-Rimmed Rounded-Square Eyeglasses (+26 more)

### Community 10 - "Frontend & Doctor Body Rigs"
Cohesion: 0.20
Nodes (11): Arm(), BODY_PALETTE, GroundShadow(), INNER_HEM, Leg(), Neck(), TORSO, Character (+3 more)

### Community 11 - "Backend Positive & Alert Expressions"
Cohesion: 0.08
Nodes (30): Expression: confused, Expression: eureka (wide eyes, o-mouth), Expression: excited (star eyes), Expression: focused (narrowed concentrated gaze), Expression: happy, Expression: laugh, Expression: thinking, Expression: wink (+22 more)

### Community 12 - "PM Positive & Action Expressions"
Cohesion: 0.10
Nodes (26): Expression: confused, Expression: determined, Expression: focused, Expression: happy, Expression: laugh, Expression: skeptical, Expression: thinking, Pose: Arms crossed (+18 more)

### Community 13 - "Chef Body Rig"
Cohesion: 0.18
Nodes (12): Arm(), BODY_PALETTE, CLOG_SIZE, GroundShadow(), Leg(), Neck(), TORSO, Character (+4 more)

### Community 14 - "Project Manager Body Rig"
Cohesion: 0.18
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), PM_SHOE_SIZE, TORSO, Character (+4 more)

### Community 15 - "QA Body Rig"
Cohesion: 0.18
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), QA_SHOE_SIZE, TORSO, Character (+4 more)

### Community 16 - "Tech Lead Body & Shared Face"
Cohesion: 0.20
Nodes (11): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Character, TechLeadProps (+3 more)

### Community 17 - "Backend Negative & Comic Expressions"
Cohesion: 0.09
Nodes (25): Expression: angry, Expression: cheeky (wink, tongue out), Expression: crying (tears), Expression: determined, Expression: disgusted (squinting grimace), Expression: dizzy (X eyes), Expression: embarrassed (blushing cheeks, awkward smile), Expression: eyeRoll (+17 more)

### Community 18 - "Doctor Distress Expressions & Glasses"
Cohesion: 0.10
Nodes (25): Round Thin-Framed Glasses, Expression: crying (tears), Expression: determined, Expression: disgusted, Expression: dizzy (X eyes), Expression: embarrassed, Expression: eyeRoll, Expression: jawDrop (+17 more)

### Community 19 - "Fullstack Negative & Comic Expressions"
Cohesion: 0.11
Nodes (25): Expression: angry, Expression: cheeky (wink, tongue out), Expression: crying (blue teardrops), Expression: determined, Expression: disgusted (squinted eyes, wavy mouth), Expression: dizzy (X eyes, wavy mouth), Expression: embarrassed (blush, sweat drop), Expression: eyeRoll (+17 more)

### Community 20 - "Man Negative & Distress Expressions"
Cohesion: 0.10
Nodes (25): Expression: angry, Expression: cheeky, Expression: crying, Expression: dizzy, Expression: embarrassed, Expression: eyeRoll, Expression: furious, Expression: love (+17 more)

### Community 21 - "Hacker Positive & Alert Expressions"
Cohesion: 0.11
Nodes (23): Expression: eureka, Expression: excited (Star Eyes), Expression: happy, Expression: laugh, Expression: love (Heart Eyes and Kiss Mouth), Expression: proud, Pose: Bashful, Pose: Cheer (+15 more)

### Community 22 - "PM Negative & Distress Expressions"
Cohesion: 0.12
Nodes (24): Expression: angry, Expression: cheeky, Expression: crying, Expression: disgusted, Expression: dizzy, Expression: embarrassed, Expression: eyeRoll, Expression: furious (+16 more)

### Community 23 - "Woman Negative & Distress Expressions"
Cohesion: 0.12
Nodes (22): Expression: angry, Expression: cheeky (Wink & Tongue Out), Expression: confused, Expression: crying (Streaming Tears), Expression: determined, Expression: disgusted, Expression: eureka, Expression: eyeRoll (+14 more)

### Community 24 - "Character Motion & Shared Rig"
Cohesion: 0.06
Nodes (55): FK/IK & Preset Customization, SkullShapeParams, ArmRenderProps, CharacterRigCanvas(), CharacterRigConfig, FRAMINGS, HeadRenderProps, LegRenderProps (+47 more)

### Community 25 - "Boss Expressions & Gesture Poses"
Cohesion: 0.24
Nodes (10): Expression: determined (Serious Angled Brows, Focused Gaze), Expression: excited (Yellow Star-Shaped Eyes, Wide Open Smile), Expression: focused (Lowered Serious Brows, Tight Flat Mouth), Locomotion and Dynamic Action Poses, Pose: Dance (Tilted Groove Stance with Star Eyes), Pose: Run (Side Profile Forward-Leaning Sprint), Pose: Sit (Seated Posture with Bent Knees and Hands on Lap), Pose: Typing / Work (Focused Expression with Hands Typing) (+2 more)

### Community 26 - "Chef Positive Expressions & Stances"
Cohesion: 0.18
Nodes (23): Expression: happy, Expression: laugh (squinted happy eyes, wide laugh mouth), Expression: proud (happy curved closed eyes, warm smile), Expression: smirk (lopsided confident grin), Pose: Arms crossed (folded arms smirk stance), Pose: Cheer (both arms raised in celebration), Pose: Clap / Applause (hands clapping in front of chest), Pose: Dance (dynamic leaning groove with star eyes) (+15 more)

### Community 27 - "Doctor Body Parts & Torso"
Cohesion: 0.18
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Character, DoctorProps (+4 more)

### Community 28 - "Tech Lead Negative Expressions"
Cohesion: 0.12
Nodes (22): Expression: angry, Expression: cheeky (Wink with Tongue Out), Expression: crying (Streaming Blue Tears), Expression: determined, Expression: disgusted, Expression: dizzy (X Eyes and Wavy Mouth), Expression: embarrassed, Expression: eyeRoll (+14 more)

### Community 29 - "Woman Positive & Cheeky Expressions"
Cohesion: 0.13
Nodes (22): Expression: excited (Star Eyes), Expression: happy, Expression: laugh, Expression: smirk, Visual Motif: Yellow Star Eyes, Pose: Arms crossed, Pose: Cheer, Pose: Clap / Applause (+14 more)

### Community 30 - "Chef Negative & Comic Expressions"
Cohesion: 0.17
Nodes (22): Expression: angry (furrowed brows, frown), Expression: cheeky (wink eye, tongue sticking out), Expression: determined (focused brows, firm grin), Expression: disgusted (scrunched brows, grimacing wavy mouth), Expression: dizzy (X-shaped eyes, sweat drop), Expression: eureka (bright wide eyes, open smile), Expression: excited (star-shaped eyes, wide smile), Expression: focused (narrowed brows, resolute flat mouth) (+14 more)

### Community 31 - "Fullstack Programmer Body Rig"
Cohesion: 0.18
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Character, FullstackProgrammerProps (+4 more)

### Community 32 - "Fullstack Positive & Excited Expressions"
Cohesion: 0.11
Nodes (22): Expression: eureka (wide eyes, open O mouth), Expression: excited (yellow star eyes), Expression: love (red heart eyes, kiss), Expression: relief (peaceful closed eyes), Expression: smirk, Expression: wink, Pose: Bashful (clasped hands, heart eyes), Pose: Cheer (both arms raised) (+14 more)

### Community 33 - "Hacker Negative & Cognitive Expressions"
Cohesion: 0.11
Nodes (22): Expression: angry, Expression: confused, Expression: crying, Expression: determined, Expression: disgusted, Expression: eyeRoll, Expression: furious, Expression: jawDrop (+14 more)

### Community 34 - "Doctor Positive & Social Expressions"
Cohesion: 0.13
Nodes (21): Expression: confused, Expression: focused, Expression: happy, Expression: laugh, Expression: love (heart eyes), Expression: proud, Expression: smirk, Pose: Arms crossed (+13 more)

### Community 35 - "Shared Rig Geometry & Math"
Cohesion: 0.22
Nodes (22): FACE_CFG, HAIRLINE, Head(), HeadProps, PUFFS, SHINES, TUFTS, Head() (+14 more)

### Community 36 - "Backend Rig & Character Props"
Cohesion: 0.21
Nodes (13): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, BackendProgrammerProps, Character (+5 more)

### Community 37 - "Boss Negative & Distress Expressions"
Cohesion: 0.14
Nodes (20): Expression: angry (Furrowed Downward Brows, Tight Frown), Expression: cheeky (Winking Eye, Sticking-Out Tongue), Expression: crying (Streaming Blue Tears, Open Sobbing Mouth), Expression: dizzy (X-Shaped Eyes, Wavy Mouth), Expression: embarrassed (Closed Curved Eyes, Wavy Shy Smile), Expression: eyeRoll (Upward Rolled Pupils, Flat Mouth), Expression: furious (Steeply Furrowed Brows, Open Shouting Mouth), Expression: nervousLaugh (Blue Sweat Drop, Open Grimacing Smile) (+12 more)

### Community 38 - "Man Positive & Excited Expressions"
Cohesion: 0.17
Nodes (20): Expression: disgusted, Expression: excited, Expression: happy, Expression: laugh, Expression: proud, Pose: Cheer, Pose: Clap / Applause, Pose: Dance (+12 more)

### Community 39 - "Hacker Visual Style & Palette"
Cohesion: 0.16
Nodes (19): 01 Binary Chest Pocket Badge in Matrix Green, Hood Color Swatch (#161b24 Dark Charcoal), Mask Color Swatch (#111827 Deep Slate), Matrix Color Swatch (#22c55e Neon Green Accent), Hacker Character 6-Swatch Color Palette, Pants Color Swatch (#13171f Near-Black), Shoes Color Swatch (#111827 Dark Slate), Skin Color Swatch (#f2c9ac Warm Peach) (+11 more)

### Community 40 - "Tech Lead Comic & Social Expressions"
Cohesion: 0.12
Nodes (20): Expression: excited (Yellow Star Eyes), Expression: focused, Expression: love (Pink Heart Eyes), Expression: smirk, Expression: worried, Pose: Arms crossed, Pose: Bashful, Pose: Dance (+12 more)

### Community 41 - "Backend Programmer Visual Design"
Cohesion: 0.16
Nodes (18): Square Dark-Rimmed Eyeglasses, Over-Ear Headset with Emerald Earcup Rings, Backend Programmer Male Developer Character Design, Hair Color Swatch (#1e232b), Headset Color Swatch (#10b981), Hoodie Color Swatch (#243042), Joggers Color Swatch (#1f242d), Character Rig Color Palette (6 Swatches) (+10 more)

### Community 42 - "Fullstack Programmer Visual Design"
Cohesion: 0.20
Nodes (18): Asymmetric Dual-Sleeve Jacket (Slate Vest, Emerald Right & Blue Left Sleeves), Backward Baseball Cap (Blue Crown, Emerald Brim), Fullstack Programmer 2D Cartoon Character Design, Dark Charcoal Pants, Chest Code Tag Emblem (< > / </>), Cap Blue Color (#0284c7), Emerald Green Color (#10b981), Jacket Dark Slate Color (#1e293b) (+10 more)

### Community 43 - "Man Body Rig"
Cohesion: 0.19
Nodes (10): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, COLORS, RIG (+2 more)

### Community 44 - "Project Manager Visual Design"
Cohesion: 0.16
Nodes (18): Amber Sneakers with White Midsole, Blue Neck Lanyard with ID Badge, Stylized Chibi Proportions (~3.5-Head Height), PM Character Color Swatch Palette, Corporate Project Manager Visual Identity, Cream Crew-Neck Inner Top, Dark Navy Slim Trousers, Flat Vector Cartoon Style with Crisp Dark Outlines (+10 more)

### Community 45 - "Shared Expression Presets"
Cohesion: 0.14
Nodes (18): Bug, BugProps, BugState, SPOTS, STATES, LENSES, MagnifierLens, MagnifyingGlass (+10 more)

### Community 46 - "Boss Comic & Skeptical Expressions"
Cohesion: 0.15
Nodes (26): Expression: confused (Tilted Asymmetric Brows, Wavy Uncertain Mouth), Expression: disgusted (Squinted Angled Brows, Wavy Disgusted Frown), Expression: love (Red Heart-Shaped Eyes, Puckered Kiss Lips), Expression: smirk (Slight Sideways Confident Smile), Expression: thinking (Asymmetric Brows, Upward Glance, Pursed Mouth), Communication and Presentation Gesture Poses, Pose: Arms crossed (Folded Arms Stance), Pose: Bashful (Hands Clasped Shyly with Heart Eyes) (+18 more)

### Community 47 - "Tech Lead Visual Design"
Cohesion: 0.18
Nodes (17): 2D Flat Vector Cartoon Style (Clean Dark Outlines, Compact Chibi Proportions), Tech Lead 2D Character Rig, Accent Color (#a3e635 Lime Green), Flannel Color (#4d7c0f Olive Green), Hair Color (#2b2422 Dark Brown), Tech Lead Character Color Palette (6 Swatches), Pants Color (#293548 Dark Navy), Skin Color (#f2c7a5 Warm Peach) (+9 more)

### Community 48 - "Boss Body Rig"
Cohesion: 0.18
Nodes (13): Arm(), BODY_PALETTE, DRESS_SHOE_SIZE, GroundShadow(), Leg(), Neck(), TORSO, BossProps (+5 more)

### Community 49 - "Chef Visual Design & Palette"
Cohesion: 0.21
Nodes (15): Double-Breasted White Chef Coat (Six Dark Buttons), Chef Character Rig (2D Vector Modular Rig), Puffy White Chef Toque Hat (Three-Scallop Crown and Band), Color Swatch: Apron (#334155), Color Swatch: Coat (#ffffff), Color Swatch: Hair (#4f3528), Chef Rig Color Palette (Six Named Swatches), Color Swatch: Scarf (#ef4444) (+7 more)

### Community 50 - "Hacker Body Rig"
Cohesion: 0.18
Nodes (12): Arm(), BODY_PALETTE, GroundShadow(), Leg(), Neck(), TORSO, Character, HackerProps (+4 more)

### Community 51 - "Boss Visual Design & Palette"
Cohesion: 0.22
Nodes (14): 2D Vector Cartoon Style (Dark Outlines, Flat Shading), Boss Character (Executive Male Cartoon Rig), Business Attire (Dark Suit, White Dress Shirt, Red Tie, Brown Dress Shoes), Color Swatch: Hair (#222630), Boss Character Color Palette (6 Swatches), Color Swatch: Shoes (#2c1d18), Color Swatch: Silver (#94a3b8), Color Swatch: Skin (#f3c59f) (+6 more)

### Community 52 - "PM Lip Sync & Front Rig"
Cohesion: 0.16
Nodes (14): Expression: neutral, Lip Sync Mouth Chart (9 Phoneme Visemes), Modular 2D Rig System (Swappable Head Bust, Mouth Visemes, and Body Poses), Pose: Idle, Turnaround View: Front, Viseme: A I (Open Smiling Mouth with Teeth and Tongue), Viseme: C D G K S T (Semi-Open Teeth-Baring Mouth), Viseme: E (Wide Horizontal Smile Showing Teeth) (+6 more)

### Community 53 - "Tech Lead Lip Sync & Surprise"
Cohesion: 0.14
Nodes (14): Expression: eureka, Expression: jawDrop, Expression: surprised, Lip Sync Mouth Chart Section (9 Phoneme Visemes), Pose: Idea / Aha!, Pose: Surprised, Lip Sync Viseme: A I (Wide Open Vowel), Lip Sync Viseme: C D G K S T (Parted Teeth Consonant) (+6 more)

### Community 54 - "TypeScript Compiler Config"
Cohesion: 0.12
Nodes (15): es2015, remotion.config.ts, compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib, module (+7 more)

### Community 55 - "Boss Lip Sync & Surprise"
Cohesion: 0.18
Nodes (11): Expression: happy (Open Smile Showing Teeth), Expression: laugh (Closed Curved Eyes, Wide Laughing Mouth), Lip Sync Mouth Chart Section (9 Phoneme Visemes), Pose: Jump (Mid-Air Leap with Arms Up and Bent Knees), Lip Sync Viseme: AI (Wide Open Mouth with Teeth and Tongue), Lip Sync Viseme: CDGKST (Narrow Clenched Teeth Opening), Lip Sync Viseme: E (Horizontal Open Mouth Showing Teeth), Lip Sync Viseme: FV (Upper Teeth on Lower Lip) (+3 more)

### Community 56 - "Man Master Rig Overview"
Cohesion: 0.29
Nodes (13): Full-Body Pose and Turnaround Rig, Man Character Rig (character/man), Master Character Color Palette, Modular Head and Facial Expression Rig, Cartoon Rig Proportions (Large Head, Compact Body, Simplified Limbs), Man Master Character Rig Model Sheet, 2D Flat Vector Cartoon Style (Dark Outlines and Soft Shading), Glasses Accessory and Swatch (Dark Brown Round Frames) (+5 more)

### Community 57 - "Woman Lip Sync & Surprise"
Cohesion: 0.15
Nodes (13): Expression: jawDrop, Expression: surprised, Lip Sync Mouth Chart (9 Visemes), Pose: Surprised, Viseme: A I, Viseme: C D G K S T, Viseme: E, Viseme: F V (+5 more)

### Community 58 - "Backend Lip Sync Visemes"
Cohesion: 0.17
Nodes (12): Expression: neutral, Pose: Idle, Lip Sync Mouth Chart Section (9 Visemes), Lip Sync Viseme: A I, Lip Sync Viseme: C D G K S T, Lip Sync Viseme: E, Lip Sync Viseme: F V, Lip Sync Viseme: L (+4 more)

### Community 59 - "Chef Cognitive & Skeptical Expressions"
Cohesion: 0.23
Nodes (12): Expression: confused (asymmetric brows, wavy mouth), Expression: eyeRoll (pupils rolled upward), Neutral, Thinking, and Skeptical Expressions, Expression: sideEye (pupils glancing sideways), Expression: skeptical (one raised brow, flat mouth), Expression: thinking (glancing up, asymmetric brow), Cognitive, Communication, and Task Poses, Pose: Idea / Aha! (index finger raised in eureka moment) (+4 more)

### Community 60 - "Chef Stance & Locomotion Poses"
Cohesion: 0.29
Nodes (12): Expression: neutral, Chef Character Rig Model Sheet (model-sheet.png), Locomotion and Base Stance Poses, Pose: Idle (standing front neutral stance), Pose: Run (right-facing forward-leaning sprint), Pose: Walk (right-facing side profile stride), Turnaround Chart (Five-Angle Character Rotation), Turnaround View: Back (180-Degree Rear View) (+4 more)

### Community 61 - "Doctor Lip Sync Visemes"
Cohesion: 0.17
Nodes (12): Expression: neutral, 9-Viseme Lip Sync Mouth Chart, Pose: Idle, Viseme: A I (wide open), Viseme: C D G K S T (narrow parted teeth), Viseme: E (horizontal smile teeth), Viseme: F V (upper teeth on lower lip), Viseme: L (raised tongue) (+4 more)

### Community 62 - "Hacker Lip Sync Visemes"
Cohesion: 0.17
Nodes (12): Expression: neutral, Lip Sync Mouth Chart Section (9 Viseme Shapes), Pose: Sit, Lip Sync Viseme: A I (Wide Open Mouth), Lip Sync Viseme: C D G K S T (Parted Teeth), Lip Sync Viseme: E (Wide Open Smile Teeth), Lip Sync Viseme: F V (Teeth Over Lower Lip), Lip Sync Viseme: L (Open Mouth with Raised Tongue) (+4 more)

### Community 63 - "Doctor Visual Design & Stethoscope"
Cohesion: 0.33
Nodes (11): Stethoscope Draped Around Neck, Chibi Proportions Flat-Vector Bold-Outline Style, 2D Cartoon Doctor Character Rig Design, White Lab Coat #ffffff, Red Cross Pocket Emblem #ef4444, Dark Brown Hair #3a2722, Character Color Palette Swatches, Teal Medical Scrubs #0d9488 (+3 more)

### Community 64 - "Hacker Distress & Relief Expressions"
Cohesion: 0.20
Nodes (11): Expression: dizzy (X-Shaped Eyes), Expression: embarrassed, Expression: nervousLaugh, Expression: relief, Expression: scared, Expression: worried, Pose: Facepalm, Pose: Hold on / Stop (+3 more)

### Community 65 - "Tech Lead Turnaround & Locomotion"
Cohesion: 0.20
Nodes (11): Expression: neutral, Pose: Idle, Pose: Run (Side-Profile Sprint), Pose: Walk (Side-Profile Stride), Turnaround Views Section (5 Camera Angles), Turnaround View: Back, Turnaround View: Front, Turnaround View: Side Profile (+3 more)

### Community 66 - "Woman Turnaround & Locomotion"
Cohesion: 0.27
Nodes (11): Expression: neutral, Pose: Idle, Pose: Run, Pose: Sit, Pose: Walk, Turnaround Section (5 Rotation Views), Back Turnaround View (Full Rear Hijab Drape), Front Turnaround View (+3 more)

### Community 67 - "Chef Sad & Embarrassed Expressions"
Cohesion: 0.29
Nodes (10): Expression: crying (streaming tears, open wailing mouth), Expression: embarrassed (closed curved eyes, sweat drop, wavy mouth), Sad, Anxious, and Embarrassed Expressions, Expression: nervousLaugh (clenched-teeth grin, sweat drop), Expression: pleading (large glistening teary eyes, sad frown), Expression: sad (drooped brows, downturned mouth), Expression: scared (wide eyes, trembling wavy mouth, sweat drop), Expression: worried (angled brows, sweat drop) (+2 more)

### Community 68 - "Fullstack Lip Sync Visemes"
Cohesion: 0.27
Nodes (10): Lip Sync Mouth Chart (9 Visemes), Viseme: A I (open mouth showing teeth and tongue), Viseme: C D G K S T (wide clenched teeth smile), Viseme: E (parted mouth showing upper teeth), Viseme: F V (upper teeth resting on lower lip), Viseme: L (open mouth with raised tongue tip), Viseme: M B P (pressed closed lips), Viseme: O (medium rounded O-shape mouth) (+2 more)

### Community 69 - "Man Turnaround & Locomotion"
Cohesion: 0.31
Nodes (10): Expression: neutral, Pose: Idle, Pose: Run, Pose: Walk, Turnaround Section (5 Rotation Views), Turnaround View: 3/4 Back, Turnaround View: 3/4 Front, Turnaround View: Back (+2 more)

### Community 70 - "Man Lip Sync Visemes"
Cohesion: 0.27
Nodes (10): Lip Sync Mouth Chart Section (9 Visemes), Lip Sync Viseme: AI, Lip Sync Viseme: CDGKST, Lip Sync Viseme: E, Lip Sync Viseme: FV, Lip Sync Viseme: L, Lip Sync Viseme: MBP, Lip Sync Viseme: O (+2 more)

### Community 71 - "Woman Visual Design & Hijab"
Cohesion: 0.36
Nodes (10): 2D Cartoon Vector Style (Bold Dark Outlines, Chibi Proportions, Cel Shading), Ciput Underscarf (#f7cece Pale Soft Pink Forehead Band), Character Color Palette (6 Swatches), Hijab (#d96b8a Dusty Rose Headscarf with Draped Collar & Back Volume), Modest Casual Outfit (Hijab, Ciput, Tunic, Pants, Sneakers), Pants (#2b3e5e Dark Navy Straight Trousers), Sneakers (#d96b8a Dusty Rose Sneakers with White Soles & Toe Caps), Skin Tone (#f8d3b4 Warm Peach) (+2 more)

### Community 72 - "Chef Lip Sync Visemes"
Cohesion: 0.33
Nodes (9): Lip Sync Mouth Chart (Nine Phoneme Viseme Shapes), Lip Sync Viseme: A I (Wide Open Vowel Mouth with Tongue), Lip Sync Viseme: E (Horizontal Open Smile Mouth), Lip Sync Viseme: F V (Upper Teeth on Lower Lip), Lip Sync Viseme: L (Open Mouth with Raised Tongue Tip), Lip Sync Viseme: M B P (Pressed Bilabial Closure), Lip Sync Viseme: O (Medium Rounded Oval Mouth), Lip Sync Viseme: Rest (Relaxed Closed Mouth) (+1 more)

### Community 73 - "Hacker Turnaround & Locomotion"
Cohesion: 0.25
Nodes (9): Pose: Idle, Pose: Run (Side Leaning Stride), Pose: Walk (Side Stride), Turnaround Section (5 Character Views), Turnaround View: Back, Turnaround View: Front, Turnaround View: Side Profile, Turnaround View: 3/4 Back (+1 more)

### Community 74 - "Backend Turnaround & Locomotion"
Cohesion: 0.29
Nodes (8): Pose: Run (side profile sprint), Pose: Walk (side profile stride), Turnaround Views Section (5 Angles), Turnaround View: 3/4 Back, Turnaround View: 3/4 Front, Turnaround View: Back, Turnaround View: Front, Turnaround View: Side

### Community 75 - "Boss Turnaround & Idle Pose"
Cohesion: 0.32
Nodes (8): Expression: neutral (Calm Open Eyes, Relaxed Mouth), Pose: Idle (Standing Upright, Arms at Sides), Turnaround Section (5 Character Views), Turnaround View: Back, Turnaround View: Front, Turnaround View: 3/4 Back, Turnaround View: 3/4 Front, Lip Sync Viseme: Rest (Closed Neutral Mouth)

### Community 76 - "Doctor Angry & Peace Poses"
Cohesion: 0.25
Nodes (8): Expression: angry, Expression: cheeky (tongue out wink), Expression: furious, Expression: wink, Pose: Peace sign, Pose: Thumbs down, Pose: Thumbs up, Pose: Wave

### Community 77 - "Doctor Turnaround & Locomotion"
Cohesion: 0.43
Nodes (8): Pose: Run, Pose: Walk, 5-View Character Turnaround, Turnaround View: Back, Turnaround View: Front, Turnaround View: Side, Turnaround View: 3/4 Back, Turnaround View: 3/4 Front

### Community 78 - "Fullstack Character Module Exports"
Cohesion: 0.09
Nodes (14): CloudService, DatabaseCylinder, Laptop, Lightbulb, LightbulbProps, DeskVariant, OfficeDesk, OfficeDeskProps (+6 more)

### Community 79 - "Fullstack Turnaround & Locomotion"
Cohesion: 0.29
Nodes (8): Pose: Idle, Pose: Run (side profile sprint), Pose: Walk (side profile stride), Turnaround Section (5 Views), Turnaround View: 3/4 Back, Turnaround View: 3/4 Front, Turnaround View: Front, Turnaround View: Side Profile

### Community 80 - "PM Turnaround & Locomotion"
Cohesion: 0.43
Nodes (8): PM Character Rig Model Sheet, Dark Brown Ponytail with Yellow Hair Tie, Pose: Run (Side Stride), Pose: Walk (Side Stride), Turnaround Section (5 Views), Turnaround View: Back, Turnaround View: Side Profile, Turnaround View: 3/4 Back

### Community 81 - "Tech Lead Cheer & Clap Poses"
Cohesion: 0.29
Nodes (7): Expression: happy, Expression: laugh, Expression: proud (Closed Happy Curved Eyes), Pose: Cheer, Pose: Clap / Applause, Pose: Jump, Pose: Wave

### Community 82 - "Fullstack Celebratory Expressions & Poses"
Cohesion: 0.33
Nodes (6): Expression: happy (blush smile), Expression: laugh (closed eyes, open grin), Expression: proud (closed happy eyes, blush), Pose: Clap / Applause, Pose: Jump (mid-air leap), Pose: Welcome (welcoming arm gesture)

### Community 83 - "Doctor Eureka & Dance Poses"
Cohesion: 0.40
Nodes (5): Expression: eureka, Expression: excited (star eyes), Pose: Dance, Pose: Fist pump, Pose: Idea / Aha!

### Community 84 - "Fullstack Skeptical & Think Poses"
Cohesion: 0.40
Nodes (5): Expression: confused, Expression: skeptical (asymmetrical brows), Expression: thinking, Pose: Shrug, Pose: Think

### Community 85 - "Man Surprised & Idea Poses"
Cohesion: 0.40
Nodes (5): Expression: eureka, Expression: jawDrop, Expression: surprised, Pose: Idea / Aha!, Pose: Surprised

### Community 86 - "PM Bashful & Blush Motifs"
Cohesion: 0.60
Nodes (5): Visual Motif: Pink Rosy Blush Cheeks, Expression: love, Expression: proud, Visual Motif: Red Heart-Shaped Eyes, Pose: Bashful

### Community 87 - "PM Surprised & Idea Poses"
Cohesion: 0.40
Nodes (5): Expression: eureka, Expression: jawDrop, Expression: surprised, Pose: Idea / Aha!, Pose: Surprised

### Community 88 - "Woman Embarrassed & Welcome Poses"
Cohesion: 0.17
Nodes (12): Expression: dizzy (X Eyes), Expression: embarrassed, Expression: nervousLaugh, Expression: proud, Expression: relief, Expression: scared, Expression: worried, Visual Motif: Rosy Cheek Blush (+4 more)

### Community 89 - "Graphify Claude Workflow Docs"
Cohesion: 0.50
Nodes (5): graphify-out/graph.json, Graphify Knowledge Graph, Graphify Query-First Workflow, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md

### Community 90 - "Man Thinking & Shrug Poses"
Cohesion: 0.50
Nodes (4): Expression: confused, Expression: thinking, Pose: Shrug, Pose: Think

### Community 91 - "Man Focused & Typing Poses"
Cohesion: 0.50
Nodes (4): Expression: determined, Expression: focused, Pose: Point, Pose: Typing / Work

### Community 92 - "Tech Lead Thinking & Shrug Poses"
Cohesion: 0.50
Nodes (4): Expression: confused, Expression: thinking, Pose: Shrug, Pose: Think

### Community 93 - "Woman Excited & Dance Poses"
Cohesion: 0.11
Nodes (12): CloudServiceProps, CloudStatus, STATUSES, MedicalKit, MedicalKitProps, MedicalKitVariant, VARIANTS, ClocheDish (+4 more)

### Community 94 - "Hacker Bashful & Heart Eyes"
Cohesion: 0.13
Nodes (14): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, TUFTS, FACE_CFG, HAIRLINE (+6 more)

### Community 95 - "Woman Bashful & Heart Eyes"
Cohesion: 1.00
Nodes (3): Expression: love (Heart Eyes & Kiss Mouth), Visual Motif: Red Heart Eyes, Pose: Bashful

### Community 97 - "PM Focused & Typing Poses"
Cohesion: 0.14
Nodes (14): Head(), Head(), Head(), createHeadProjection(), JAW, rotX(), FACE_CFG, HAIRLINE (+6 more)

### Community 98 - "PropShadow"
Cohesion: 0.15
Nodes (9): Clipboard, ClipboardProps, ClipboardVariant, VARIANTS, DatabaseCylinderProps, DatabaseVariant, PALETTE, VARIANTS (+1 more)

### Community 99 - "PottedPlant.tsx"
Cohesion: 0.15
Nodes (9): MONSTERA, PlantVariant, POT_COLORS, PotColor, POTS, PottedPlant, PottedPlantProps, SNAKE (+1 more)

### Community 100 - "CoffeeMug.tsx"
Cohesion: 0.22
Nodes (7): CoffeeMug, CoffeeMugColor, CoffeeMugProps, CoffeeMugVariant, COLORS_LIST, PALETTES, VARIANTS

### Community 101 - "Smartphone.tsx"
Cohesion: 0.22
Nodes (7): FRAME_COLORS, PALETTES, SCREENS, Smartphone, SmartphoneFrameColor, SmartphoneProps, SmartphoneScreen

### Community 102 - "boss/Head.tsx"
Cohesion: 0.25
Nodes (7): FACE_CFG, HAIRLINE, HeadProps, PUFFS, SHINES, SKULL_SHAPE, TUFTS

### Community 103 - "Trophy.tsx"
Cohesion: 0.29
Nodes (7): PALETTES, star(), Trophy, TrophyInner(), TrophyProps, TrophyVariant, VARIANTS

### Community 104 - "Briefcase.tsx"
Cohesion: 0.29
Nodes (5): Briefcase, BriefcaseProps, BriefcaseVariant, PALETTES, VARIANTS

### Community 105 - "PackageBox.tsx"
Cohesion: 0.29
Nodes (5): PackageBox, PackageBoxProps, PackageVariant, PALETTES, VARIANTS

### Community 106 - "Padlock.tsx"
Cohesion: 0.29
Nodes (5): COLORS_LIST, Padlock, PadlockColor, PadlockProps, PALETTES

### Community 107 - "ServerRack.tsx"
Cohesion: 0.29
Nodes (4): ServerRack, ServerRackProps, ServerStatus, STATUSES

### Community 108 - "Expression: surprised (Raised Brows, Wide Eyes, O-Mouth)"
Cohesion: 0.33
Nodes (6): Expression: eureka (Wide Bright Eyes, Open Excited O-Mouth), Expression: jawDrop (Wide Eyes, Tall Dropped Open Mouth), Expression: surprised (Raised Brows, Wide Eyes, O-Mouth), Pose: Idea / Aha! (Raised Index Finger Epiphany Gesture), Pose: Surprised (Both Hands Raised to Cheeks, Wide Eyes), Lip Sync Viseme: O (Rounded Open O-Shaped Mouth)

### Community 109 - "Expression: wink"
Cohesion: 0.50
Nodes (4): Expression: cheeky (Wink with Tongue Out), Expression: wink, Pose: Peace sign, Pose: Thumbs up

### Community 110 - "Expression: excited"
Cohesion: 0.83
Nodes (4): Expression: excited, Pose: Dance, Pose: Fist pump, Visual Motif: Golden Star-Shaped Eyes

## Knowledge Gaps
- **418 isolated node(s):** `BODY_PALETTE`, `FACE_CFG`, `HAIRLINE`, `PUFFS`, `TUFTS` (+413 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MagnifyingGlassInner()` connect `Project Dependencies & Tooling` to `Shared Expression Presets`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Expressions Grid (32 Facial Expressions)` (e.g. with `Angry, Disgusted, and Focused Expressions` and `Neutral, Thinking, and Skeptical Expressions`) actually correct?**
  _`Expressions Grid (32 Facial Expressions)` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Expressions Section (32 Facial Expressions)` (e.g. with `Modular 2D Rig System (Swappable Head Bust, Mouth Visemes, and Body Poses)` and `Lip Sync Mouth Chart (9 Phoneme Visemes)`) actually correct?**
  _`Expressions Section (32 Facial Expressions)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Expressions Section (32 Facial Expressions)` (e.g. with `Lip Sync Mouth Chart Section (9 Viseme Shapes)` and `Poses and Actions Section (28 Character Poses)`) actually correct?**
  _`Expressions Section (32 Facial Expressions)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `BODY_PALETTE`, `FACE_CFG`, `HAIRLINE` to the rest of the system?**
  _418 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Property Components & Shared Primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._
- **Should `Backend Programmer Head Rig` be split into smaller, more focused modules?**
  _Cohesion score 0.11396011396011396 - nodes in this community are weakly interconnected._