# Mascot Character Rigs (`character/*`)

Folder ini berisi **12 Master Character Rig** kartun 2D (vektor SVG) untuk Remotion yang berbagi antarmuka props, 32 ekspresi, 28 pose, 24 bentuk mulut (lip-sync), 5 siklus gerak (`idle`, `still`, `walk`, `run`, `dance`), dan memiliki **postur wajah serta identitas visual yang berbeda-beda**:

1. **Pria / Host (`character/man`)** — [README](./man/README.md) · [Model Sheet](./man/model-sheet.png)
2. **Wanita Berhijab / Mentor (`character/woman`)** — [README](./woman/README.md) · [Model Sheet](./woman/model-sheet.png)
3. **Frontend Programmer (`character/frontend_programmer`)** — [README](./frontend_programmer/README.md) · [Model Sheet](./frontend_programmer/model-sheet.png)
4. **Backend Programmer (`character/backend_programmer`)** — [README](./backend_programmer/README.md) · [Model Sheet](./backend_programmer/model-sheet.png)
5. **Boss / Eksekutif (`character/boss`)** — [README](./boss/README.md) · [Model Sheet](./boss/model-sheet.png)
6. **Chef (`character/chef`)** — [README](./chef/README.md) · [Model Sheet](./chef/model-sheet.png)
7. **Doctor (`character/doctor`)** — [README](./doctor/README.md) · [Model Sheet](./doctor/model-sheet.png)
8. **Project Manager (`character/project_manager`)** — [README](./project_manager/README.md) · [Model Sheet](./project_manager/model-sheet.png)
9. **Tech Lead (`character/tech_lead`)** — [README](./tech_lead/README.md) · [Model Sheet](./tech_lead/model-sheet.png)
10. **Fullstack Programmer (`character/fullstack_programmer`)** — [README](./fullstack_programmer/README.md) · [Model Sheet](./fullstack_programmer/model-sheet.png)
11. **Quality Assurance (`character/quality_assurance`)** — [README](./quality_assurance/README.md) · [Model Sheet](./quality_assurance/model-sheet.png)
12. **Hacker (`character/hacker`)** — [README](./hacker/README.md) · [Model Sheet](./hacker/model-sheet.png)

## Import Gabungan dari `../character`

```tsx
import {
  ManCharacter,
  WomanCharacter,
  FrontendProgrammerCharacter,
  BackendProgrammerCharacter,
  BossCharacter,
  ChefCharacter,
  DoctorCharacter,
  ProjectManagerCharacter,
  TechLeadCharacter,
  FullstackProgrammerCharacter,
  QualityAssuranceCharacter,
  HackerCharacter,
} from "../character";
```

## Modul Bersama (`character/shared`)

Seluruh karakter di atas berbagi logika inti yang sama dari [`character/shared/`](./shared): matematika 3D, `SkullShapeParams` & IK/FK (`rig.ts`), 32 ekspresi & 28 pose (`presets.ts`), siklus gerak & lip-flap (`motion.ts`), primitif wajah/mulut/kacamata (`face.tsx`), primitif tubuh/tangan/lengan/sepatu (`body.tsx`), dan renderer/skema Studio (`characterRig.tsx`).

## Panduan Casting Cepat (Reusable di Segala Plot)

Setiap karakter dirancang fleksibel untuk berbagai format konten teknologi (**Drama / Sketsa**, **Tutorial Coding**, **Perumpamaan / Analogi**, **Problem Solving**, maupun **Fakta Menarik**):

| Karakter | Peran Utama (Drama) | Peran Utama (Tutorial / Analogi / Problem Solving / Fakta) | Ciri Postur Wajah & Visual |
| --- | --- | --- | --- |
| **`ManCharacter`** | Rekan kerja ramah, user awam | **Host utama**, pembawa fakta menarik, penanya pemula | Wajah bulat-oval bersahabat, kacamata bulat, kaos biru |
| **`WomanCharacter`** | Penengah logis, mentor | **Educator utama**, *fact-checker*, analisis solusi | Wajah oval lembut, hijab dusty rose & bros emas, tunik teal |
| **`FrontendProgrammerCharacter`** | Dev UI yang pusing soal revisi desain | **Tutorial CSS/React/animasi**, debug client-side | Wajah oval ramping, *streak* rambut cyan, sweater `</>` |
| **`BackendProgrammerCharacter`** | Dev logis penunggu server (*"di lokal aman"*) | **Tutorial API/DB/server**, *post-mortem outage* | Wajah oval, headphone studio LED emerald, hoodie `>_` |
| **`BossCharacter`** | **Bos / CEO / Klien / Investor** pembawa deadline | Narator fakta bisnis tech, sudut pandang biaya/ROI | **Rahang kotak lebar tegas**, uban perak, kumis, jas & dasi merah |
| **`ChefCharacter`** | Koki restoran tempat nongkrong tim | **Perumpamaan tutorial** (SSR/dapur, queue, caching, load balancer) | **Wajah bulat pipi tembem**, kumis melengkung, topi *toque*, celemek |
| **`DoctorCharacter`** | Dokter yang memeriksa dev kelelahan | **Perumpamaan problem solving** (*health check*, profiling, antivirus) | **Wajah tirus rapi lebih panjang**, kacamata oval, jas putih & stetoskop |
| **`ProjectManagerCharacter`** | Pembawa revisi mendadak & pengatur sprint | **Tutorial Agile/Scrum/workflow tim**, bahas *scope creep* | **Wajah diamond V-chin**, kuncir kuda, *cat-eye glasses*, *lanyard* ID |
| **`TechLeadCharacter`** | Penengah paling lelah antara Bos & dev | **Tutorial arsitektur/clean code**, *code review*, RCA | **Wajah panjang tirus angular**, garis mata lelah, *goatee*, flanel |
| **`FullstackProgrammerCharacter`** | Dev serba bisa yang jadi andalan semua divisi | **Tutorial end-to-end** (FE ↔ API ↔ DB), proyek solo/startup | **Wajah oval lebar ceria**, topi terbalik, jaket dual-tone `{</>}` |
| **`QualityAssuranceCharacter`** | Pengadang rilis Jumat sore (*"Ada 20 bug!"*) | **Tutorial testing/E2E**, bahas *edge-cases* & fakta bug | **Wajah persegi-ramping tajam**, kacamata *cat-eye* merah, lencana bug |
| **`HackerCharacter`** | Pentester / antagonis komedi serangan siber | **Tutorial cybersecurity** (SQLi, XSS, enkripsi, auth) | **Wajah tirus V-shape runcing**, tudung hoodie gelap naik, aksen *matrix-green* |
