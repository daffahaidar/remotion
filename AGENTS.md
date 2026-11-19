# AGENTS.md

Instruksi untuk AI coding agent (Codex, Antigravity, Cursor, Gemini, Claude, dll.) yang bekerja di repo ini.

- Selalu balas pengguna dalam Bahasa Indonesia. Nama variabel, fungsi, class, dan file kode memakai bahasa Inggris.
- Repo ini berisi video motion graphic Remotion (React + TypeScript). Konten video ada di `src/content/<slug>/` dan didaftarkan di `src/Root.tsx`.
- Untuk permintaan membuat video baru (cara kerja, tutorial, fakta unik, berita teknologi, perbandingan, mitos vs fakta, tips & tools, dll.): baca dan ikuti `src/content/PROMPT_TECH_VIDEO.md` secara lengkap, meskipun pengguna tidak menyebutnya.
- Tulis kode seminimal mungkin: pakai ulang yang sudah ada, jangan menambah dependency atau abstraksi yang tidak perlu.
- Perintah penting:
  - preview: `npx remotion studio`
  - cek kode: `npx tsc --noEmit`, `npx eslint src`
  - cek React: `npx -y react-doctor@latest --no-telemetry`
- Kalau CLI `graphify` tersedia: pakai `graphify query "<pertanyaan>"` sebelum menjelajah kode, dan jalankan `graphify update .` setelah mengubah kode.
- Jangan commit dan jangan render MP4 final kecuali diminta.
