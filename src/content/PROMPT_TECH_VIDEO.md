# Playbook Video Motion Graphic Teknologi (Remotion)

> **For AI coding agents (Claude Code, Codex, Antigravity, Cursor, Gemini, etc.):** this playbook is written in Indonesian. Read the whole file before doing anything, follow every rule marked **WAJIB**, and reply to the user in Indonesian. Everything you need is in this file and the files it points to; no agent-specific feature is required.

## 0. Cara pakai (untuk manusia)

Kirim pesan ini ke agent mana pun yang membuka repo ini, lalu isi kelima kolomnya:

```text
Baca seluruh file src/content/PROMPT_TECH_VIDEO.md, lalu buatkan video sesuai playbook tersebut.

JENIS KONTEN     : <Cara Kerja | Tutorial | Fakta Unik | Berita Teknologi | Perbandingan | Mitos vs Fakta | Tips & Tools | Lainnya: ...>
TOPIK            : <topik video>
DURASI           : <contoh: 1:30, 90 detik, atau 2 menit>
TOPIK BERIKUTNYA : <teaser video berikutnya>
BAHAN / SUMBER   : <link atau poin penting; tulis "-" jika tidak ada>
```

## 1. Input

| Kolom | Wajib | Format | Jika kosong |
|---|---|---|---|
| JENIS KONTEN | Ya | Salah satu jenis di bagian 6 | Tanya pengguna |
| TOPIK | Ya | Teks bebas | Tanya pengguna |
| DURASI | Ya | `mm:ss`, `N detik`, atau `N menit` | Pakai 2:30 dan catat asumsinya |
| TOPIK BERIKUTNYA | Tidak | Teks bebas | Usulkan topik lanjutan yang relevan |
| BAHAN / SUMBER | Tidak (sangat disarankan untuk Berita) | Link, teks, atau poin | Riset sendiri (bagian 7) |

Kolom tambahan opsional: TARGET PENONTON (default: pemula dan developer junior Indonesia) dan NADA (default: mengikuti jenis konten).

Hanya bertanya bila JENIS KONTEN atau TOPIK kosong. Untuk hal lain, pakai default, lanjutkan pekerjaan, dan tulis asumsinya di laporan akhir.

## 2. Konteks proyek (WAJIB dibaca sebelum merancang)

- **Stack:** Remotion 4, React 19, TypeScript strict. Entry `src/index.ts`; komposisi didaftarkan di `src/Root.tsx`.
- **Video referensi yang sudah disetujui:** `src/content/how-jwt-works/` (komposisi `HowJwtWorks`, 2:56, 12 scene, tier L). Baca `HowJwtWorks.tsx`, `scenes/Hook.tsx`, `scenes/HackerFails.tsx`, dan `script_dubbing.md`, plus kit bersama di `src/content/shared/` (`ui.tsx`, `theme.ts`, `ChannelOutro.tsx`, `generate-audio.mjs`). Gaya visual, ritme, audio, dan format naskah video baru harus setara dengan video ini. Contoh kedua yang memakai kit bersama: `src/content/how-oauth-works/` (`HowOauthWorks`).
- **Aset:**
  - karakter di `src/assets/character/` (README-nya berisi panduan casting);
  - properti di `src/assets/property/` (lihat README-nya);
  - logo channel di `src/assets/channel/profile.png` (dipakai `ChannelOutro`);
  - SFX di `public/audio/sfx/`;
  - musik di `public/audio/music/`.
- **Panduan pendukung:** `.claude/skills/remotion-best-practices/SKILL.md`, `.claude/skills/ui-ux-pro-max/SKILL.md`, dan `.claude/skills/remotion-2d-cartoon/SKILL.md`. Kalau agent-mu tidak mengenal sistem "skill", baca saja sebagai dokumentasi biasa.
- **graphify:** kalau CLI `graphify` tersedia, pakai `graphify query "<pertanyaan>"` untuk menjelajah kode, dan jalankan `graphify update .` setelah mengubah kode.

## 3. Aturan kerja umum (WAJIB)

- **Bahasa:** laporan, narasi, dan teks di layar memakai Bahasa Indonesia. Nama variabel, fungsi, class, dan file kode memakai bahasa Inggris.
- **Kode seminimal mungkin:** pakai ulang yang sudah ada. Jangan menambah dependency atau abstraksi yang tidak diperlukan.
- **Jangan commit** dan jangan render MP4 final kecuali pengguna memintanya. (Render still thumbnail di bagian 11 tetap wajib.)
- **File sementara** (still, WAV untuk analisis) disimpan di folder temp di luar repo, lalu dibersihkan.
- **Internet:** render, Google Fonts, dan riset butuh internet. Kalau lingkungan agent tidak punya internet, kerjakan yang bisa dan laporkan langkah yang tertunda.

## 4. Durasi (WAJIB)

1. **Konversi.** Ubah DURASI ke detik, sebut T. Contoh: `1:30` = 90, `90 detik` = 90, `2 menit` = 120.
2. **Target.** Durasi akhir = T ± 2 detik. Bila T ≤ 180, durasi akhir tidak boleh melebihi 180 detik.
3. **Batas platform** (cek ulang bila platform mengubahnya):
   - YouTube Shorts dan Instagram Reels maksimal 3 menit; TikTok menerima video yang lebih panjang.
   - Bila T > 180: tetap buat sesuai T, tetapi peringatkan di laporan bahwa video tidak lolos sebagai Shorts/Reels.
   - Bila T < 30: peringatkan bahwa durasinya terlalu singkat, lalu buat format teaser (hook, satu inti, Outro channel).
4. **Tier.** Semua angka di tabel dalam detik. Di semua tier, video selalu ditutup **Outro channel** berdurasi tetap 10 detik (`OUTRO_SECONDS`, bagian 5), di luar kolom Rangkuman.

| Tier | T | Jumlah scene (termasuk Outro) | Hook | Rangkuman | Durasi item daftar (nilai tengah) | Re-hook |
|---|---|---|---|---|---|---|
| S | 30–60 | 4–6 | 5–7 | 0–4 (boleh dilewati) | 12–16 (14) | Tidak wajib |
| M | 61–120 | 6–9 | 8–10 | 6–8 | 16–22 (19) | 1× di ±50% |
| L | 121–180 | 9–12 | 10–12 | 10–12 | 22–28 (25) | 1× di 40–60% |
| XL | > 180 | 12+ | 12 | 12–16 | 22–28 (25) | Tiap 45–60 detik |

5. **Pilih scene** dari formula jenis konten (bagian 6):
   - P1 selalu ada;
   - P2 dimasukkan bila T ≥ 75;
   - P3 dimasukkan bila T ≥ 120.

   Untuk tier XL, tambah jumlah item atau langkah, jangan memperpanjang scene.
6. **Hitung jumlah item** untuk jenis berbasis daftar (fakta, mitos, tips, ronde, langkah, poin):
   - N = (T − Hook − Rangkuman − Outro − 8 × jumlah scene non-item) ÷ nilai tengah durasi item tier.
   - Bulatkan ke bawah, lalu batasi ke rentang N pada formula.
   - Tutorial: kalau langkah yang dibutuhkan tidak muat, persempit cakupan (misalnya jadikan "Part 1") dan jelaskan di laporan.
7. **Bagi waktu:**
   - Tetapkan durasi Hook, Rangkuman (tabel tier), dan Outro (10) lebih dulu.
   - Bagi sisa waktu ke scene lain sesuai bobotnya; item daftar berbobot 3.
   - Bulatkan ke detik bulat. Utamakan angka genap supaya setiap cut jatuh di garis bar musik (2 detik).
   - Setiap scene minimal 4 detik dan maksimal 28 detik. Lebih dari 28 detik, pecah jadi dua scene.
   - Sesuaikan scene terbesar agar total tepat T.
8. **Narasi:** ± 2,4 kata per detik (rentang 2,2–2,7), jadi total kata ≈ T × 2,4. Kalau narasi tidak muat, kurangi kata, jangan mempercepat bicara.
9. **Contoh perhitungan:**
   - Cara Kerja, T = 90 (tier M, P1 + P2): Hook 9 · Masalah 8 · Analogi 8 · Anatomi 10 · Twist 8 · Mekanisme 10 · Alur 10 · Payoff 11 · Rangkuman 6 · Outro 10 = 90.
   - Fakta Unik, T = 60 (tier S, rangkuman dilewati): N = (60 − 6 − 0 − 10) ÷ 14 = 3. Hook 6 · Fakta #3 14 · Fakta #2 14 · Fakta #1 16 · Outro 10 = 60.

## 5. Aturan retensi (WAJIB untuk semua jenis)

- **Hook (3 detik pertama):**
  - Frame 0 sudah penuh dan mengejutkan.
  - Kalimat hook maksimal 12 kata, dengan janji video yang jelas.
  - Judul besar muncul di ±2/3 durasi hook.
- **Open loop:** pertanyaan atau janji di hook yang jawabannya ditahan.
- **Re-hook:** pengingat open loop di tengah video (lihat tabel tier).
- **Payoff:** jawaban open loop, diberikan menjelang akhir.
- **Interupsi pola:** ada perubahan visual atau SFX setiap 3–5 detik.
- **Satu ide per layar.** Teks di layar berisi kata kunci, bukan transkrip. Setiap elemen muncul tepat saat disebut narasi.
- **Outro channel (standar semua video):** scene terakhir selalu `<ChannelOutro nextTopic="…" nextQuestion="…" />` dari `src/content/shared/ChannelOutro.tsx`, berdurasi `OUTRO_SECONDS` (10 detik). Jangan buat CTA sendiri; ubah komponen itu bila tampilannya perlu diganti.
  - Isinya: logo channel (`src/assets/channel/profile.png`) dan handle **@daffahaidarnz**; tombol **Like**, **Simpan**, **Follow** yang di-tap jari animasi tepat saat disebut narasi, masing-masing dengan alasan persuasif; lalu kartu "Video berikutnya: TOPIK BERIKUTNYA".
  - Narasi baku (hanya topik berikutnya yang diganti), 22 kata:
    - 00:00–00:03 "Kalau video ini **ngebantu**, kasih **like**..."
    - 00:03–00:05 "**simpan** biar nggak lupa..."
    - 00:05–00:07 "dan **follow** atau **subscribe** daffahaidarnz..."
    - 00:07–00:10 "biar nggak ketinggalan **<TOPIK BERIKUTNYA>** di video berikutnya!"
  - Waktu di atas relatif terhadap awal outro; tulis sebagai waktu absolut di `script_dubbing.md` (contoh: Scene 12 di naskah video referensi).
  - Fakta Unik, Perbandingan, dan Mitos vs Fakta: tambahkan satu pertanyaan ajakan **komen** di akhir scene sebelum outro.
- **Host:** `ManCharacter` ("Budi") sebagai host atau wakil penonton. Karakter lain dipilih sesuai panduan casting.

## 6. Formula per jenis konten

Notasi:
- **P1/P2/P3:** prioritas scene (bagian 4 langkah 5).
- **b:** bobot waktu scene.
- **item:** scene berulang yang jumlahnya dihitung; rentang N tertulis di kurung.
- Setiap formula di bawah selalu ditutup **Outro channel** (P1, 10 detik, bagian 5) setelah langkah terakhirnya.

### 6.1 Cara Kerja (explainer), sama seperti video referensi

1. **Hook gelap** (P1): cold open berupa konflik atau kegagalan, pertanyaan menggantung, judul besar.
2. **Masalah dasar** (P1, b2): kenapa konsep ini perlu ada.
3. **Cara lama / alternatif** (P3, b2): kelemahannya, ditutup stempel vonis.
4. **Analogi sehari-hari** (P2, b2): analogi yang akrab di Indonesia, plus label "X = Y".
5. **Anatomi** (P1, b3): bagian-bagian konsep dengan kode warna konsisten, plus stiker re-hook.
6. **Plot twist "TAPI…"** (P2, b2): miskonsepsi dan daftar "JANGAN"; musik berhenti sebentar.
7. **Mekanisme inti** (P1, b3): demo sebab-akibat.
8. **Alur lengkap** (P2, b3): langkah bernomor.
9. **Payoff gelap** (P1, b3): konflik pembuka diselesaikan.
10. **Detail penting** (P3, b2): batasan, atau hal yang sering dilupakan.
11. **Rangkuman** (P1): model "A + B = konsep", plus tips (2 di tier S/M, 4 di tier L/XL).

### 6.2 Tutorial (how-to)

Tujuannya: penonton bisa meniru satu hasil konkret.

1. **Hook** (P1): hasil akhir ditampilkan lebih dulu, janji "cuma N langkah", dan open loop "langkah ke-X paling sering bikin error".
2. **Kenapa berguna** (P2, b1).
3. **Persiapan** (P1, b1): tools dan versinya dalam checklist. Di tier S cukup satu baris prasyarat di layar.
4. **Langkah 1…N** (P1, item, N 3–8):
   - Pill "LANGKAH n/N" plus progress bar.
   - Kode diketik di layar: maksimal ±8 baris per layar, mono minimal 34 px, baris yang dibahas disorot.
   - Narasi menjelaskan *kenapa*, bukan membaca kode huruf per huruf.
   - Tunjukkan hasil kecil di setiap langkah.
   - Langkah yang dijanjikan di hook menjadi re-hook.
5. **Error umum** (P2, b2): kartu error merah, lalu perbaikannya dalam warna hijau.
6. **Hasil akhir** (P1, b2): demo yang berjalan; ini payoff-nya.
7. **Rangkuman checklist** (P1).

### 6.3 Fakta Unik (listicle)

1. **Hook** (P1): teaser fakta paling mengejutkan, plus "fakta nomor 1 paling gila" sebagai open loop.
2. **Fakta #N…#2** (P1, item, total fakta 3–7). Setiap fakta berurutan:
   - klaim mengejutkan;
   - pembuktian visual (counter, perbandingan skala, atau analogi);
   - kenapa fakta ini penting;
   - kalimat jembatan ke fakta berikutnya.
3. **Fakta #1** (P1, item berbobot 4): payoff terbesar.
4. **Rangkuman** (P1).

### 6.4 Berita Teknologi

Nada serius dan netral. Opini diberi label "OPINI".

1. **Hook** (P1): inti berita plus kenapa penonton harus peduli. Label "TERBARU" dan pill tanggal.
2. **Apa yang terjadi** (P1, b3): 5W1H (siapa, apa, kapan, di mana, kenapa, bagaimana).
3. **Latar belakang** (P3, b2): timeline mini tiga titik.
4. **Angka dan detail kunci** (P2, b3).
5. **Dampak buat kamu** (P1, b3): dampak bagi pengguna dan developer di Indonesia.
6. **Sisi lain** (P2, b2): kritik, risiko, atau hal yang belum pasti.
7. **Yang perlu dilakukan atau dipantau** (P3, b2).
8. **Rangkuman 3 poin** (P1).

### 6.5 Perbandingan (X vs Y)

1. **Hook** (P1): teaser vonis yang mengejutkan.
2. **Kenalan dengan X dan Y** (P1, b2): dua kartu berdampingan (VS).
3. **Ronde 1…N** (P1, item, N 2–6): satu kriteria per ronde, bar skor, dan stempel pemenang ronde.
4. **"Tergantung kebutuhan"** (P2, b2): kapan memilih X, kapan memilih Y.
5. **Skor akhir** (P1).

### 6.6 Mitos vs Fakta

1. **Hook** (P1): mitos populer diucapkan dengan yakin, lalu stempel "SALAH!".
2. **Mitos 1…N** (P1, item, N 2–6). Setiap mitos berurutan:
   - kartu MITOS (merah);
   - kenapa orang memercayainya;
   - FAKTA (hijau, animasi flip) beserta buktinya;
   - pelajaran yang bisa dibawa pulang.
3. **Rangkuman** (P1).

### 6.7 Tips & Tools

1. **Hook** (P1): manfaat terbesar (contoh: "Tips nomor 4 hemat 2 jam sehari").
2. **Tips 1…N** (P1, item, N 3–7): masalah → tips/tools → demo sebelum vs sesudah → hasil dalam angka.
3. **Bonus tips** (P2, b2): payoff.

### 6.8 Lainnya (sejarah, review, opini, karier, event, dll.)

1. **Hook** (P1) dengan open loop.
2. **Konteks** (P2, b2).
3. **Poin inti 1…N** (P1, item, N 3–5), dengan visual yang berbeda di tiap poin.
4. **Sisi lain / twist** (P2, b2).
5. **Payoff** (P1, b2).
6. **Rangkuman** (P1).

## 7. Akurasi dan riset (WAJIB)

- **Berlaku untuk** Berita, Fakta Unik, Perbandingan, Mitos vs Fakta, dan Tips & Tools:
  - Utamakan BAHAN / SUMBER dari pengguna, lalu lengkapi dengan pencarian web bila agent punya akses.
  - Setiap klaim penting butuh minimal 2 sumber kredibel (rilis atau dokumentasi resmi, media teknologi tepercaya). Tulis tanggal kejadiannya.
  - Jangan mengarang angka, kutipan, nama, atau tanggal. Buang klaim yang tidak bisa diverifikasi.
  - Peristiwa yang lebih baru dari pengetahuan model hanya boleh diambil dari sumber yang berhasil dibaca.
  - Untuk Berita: kalau agent tidak punya akses web dan BAHAN / SUMBER kosong, berhenti dan minta bahan ke pengguna.
- **Penulisan sumber:** tampilkan catatan kecil "Sumber: …" di layar (di dalam safe zone), dan tulis daftar lengkap sumber beserta tanggal aksesnya di akhir `script_dubbing.md`.
- **Tutorial:** kode dan perintah harus benar untuk versi yang disebut. Uji di folder temp bila memungkinkan, dan cantumkan versinya di layar.
- **Cara Kerja:** data contoh harus valid (seperti token JWT asli di video referensi).
- **Laporan:** sebutkan klaim yang masih meragukan.

## 8. Gaya visual (WAJIB setara video referensi)

- **Neumorphism:** kanvas terang `#e8eef5` untuk penjelasan; gelap `#1e232c` untuk konflik, mitos, berita mendesak, dan layar editor/terminal. Pergantian terang↔gelap memakai SFX `switch`.
- **Font:** Plus Jakarta Sans 800 untuk headline (88–110 px); JetBrains Mono untuk kode/data (30–52 px). Teks pendukung minimal 34 px.
- **Gerak:**
  - Headline kinetik kata per kata, dengan marker pada kata kunci.
  - Pill chapter di atas setiap scene.
  - Cut punch-in (zoom-blur) + whoosh.
  - Momen vonis: stempel slam + shake + flash.
- **Kode warna** dipakai konsisten untuk konsep atau pilihan utama sepanjang video.
- **Aset:** karakter dari `src/assets/character/`, properti dari `src/assets/property/`. Ikon dari `react-icons` (`fa6`; atau `si` untuk logo brand, hanya untuk identifikasi). Tanpa emoji.
- **Konten nyata:**
  - Jangan meniru tampilan media berita asli.
  - Jangan membuat tiruan tweet atau screenshot seolah-olah asli; kutipan tampil sebagai kartu kutipan dengan atribusi.
  - Foto Unsplash hanya sebagai ilustrasi umum, bukan foto peristiwa yang diberitakan.
- **Safe zone (kanvas 1080×1920):**
  - Konten penting di y ≈ 190–1460 px.
  - Hindari x > 960 pada y 1000–1500 (tombol like/comment).
  - Sisakan ±460 px terbawah untuk caption platform.
- **Tumpukan elemen:** stempel atau callout tidak boleh menutupi wajah karakter maupun teks utama.

## 9. Audio (WAJIB)

- **Backsound orisinal** dari generator `src/content/shared/generate-audio.mjs`:
  - Tempo 120 BPM (1 bar = 2 detik), deterministik, tanpa sampel berhak cipta.
  - Pakai ulang generatornya, jangan diduplikasi. Tambahkan satu entri `SONGS['<slug>']` berisi `sections` (peta section per bar, diturunkan dari `SCENE_SECONDS`) dan `loop` (progresi akor = mood); durasi file dihitung otomatis dari jumlah bar.
  - Jalankan `node src/content/shared/generate-audio.mjs <slug>`. Output: `public/audio/music/<slug>.mp3`. Flag `--sfx` hanya dipakai saat menambah/mengubah SFX sintetis (menulis ulang `public/audio/sfx/`).
- **Mood per jenis:**

| Jenis | Mood backsound | SFX khas |
|---|---|---|
| Cara Kerja | Groove lo-fi, tegang di adegan konflik | Stempel, glitch, ding |
| Tutorial | Lo-fi tenang, drum dikurangi saat menjelaskan kode | `typing`, `ding` tiap langkah selesai |
| Fakta Unik | Ceria (kunci mayor) | `pop`/`whoosh` tiap fakta, `riser` sebelum fakta #1 |
| Berita | Pulse mendesak (kunci minor) | Minim, tanpa SFX meme |
| Perbandingan | Kompetitif | `ding` pemenang ronde |
| Mitos vs Fakta | Penasaran, lalu lega | `denied` untuk mitos, `ding` untuk fakta |
| Tips & Tools | Positif, energik | `pop`, `sparkle` |

- **Musik di Outro channel:** groove tanpa arpeggio (section `A`) supaya ajakan terdengar jelas, lalu chord penutup (`end`) ±2 detik sebelum video selesai.
- **SFX yang tersedia** di `public/audio/sfx/`: whoosh, pop, click, ding, sparkle, switch, vine-boom, record-scratch, page-turn, price-is-right-fail, typing, glitch, denied, riser, beep, ticking, whirr, impact.
  - Butuh yang baru: sintesis lewat generator, atau unduh dari daftar `remotion.media` ke `public/` (jangan hotlink).
  - SFX meme hanya untuk konten santai.
- **Mix:**
  - Prop `musicVolume` default 0.28.
  - Fade in di awal dan fade out 3 detik di akhir.
  - Musik berhenti ±1 detik di momen twist.
  - Volume SFX 0.3–0.6; hindari menumpuk banyak SFX keras sekaligus.
  - Puncak audio akhir ≤ −1 dBFS.

## 10. Format `script_dubbing.md` (WAJIB persis)

- **Header:** jenis konten, durasi total, format (1080×1920, 30 fps), id komposisi, cara membaca (**tebal** = tekanan suara, `...` = jeda, 🔊 = SFX keras), dan gaya bicara (sesuai nada, ± 150 kata/menit, menyapa penonton dengan "kamu").
- **Setiap scene** ditulis seperti ini:

```
### Scene 1 — Hook

Detik 00:00 - 00:03:
"Narasi yang harus diucapkan..."
*(Visual: apa yang muncul di layar)*
```

- **Waktu** ditulis sebagai waktu absolut di video (mm:ss) dan harus cocok persis dengan animasi.
- **Penutup** berisi:
  - bagian "Memasang dubbing" (Opsi A: editor video; Opsi B: satu baris `<Audio>` di komposisi utama);
  - cara mengubah durasi lewat `SCENE_SECONDS`;
  - `musicVolume: 0` untuk versi tanpa backsound;
  - bila relevan: "Sumber", atau "Kode lengkap" untuk Tutorial.

## 11. Thumbnail cover 3:4 (WAJIB untuk setiap video)

Setiap video selalu disertai satu cover thumbnail, tanpa perlu diminta.

- **Format:** 3:4, 1080×1440 px, PNG di `src/content/<slug>/thumbnail.png`. Batas 2 MB (YouTube); kalau PNG lebih besar, render JPEG `--image-format=jpeg --jpeg-quality=90` ke `thumbnail.jpg`.
- **Cara membuat:** komponen `<Still>` di `src/content/<slug>/Thumbnail.tsx` (ekspor `<PascalId>Thumbnail`), didaftarkan di `src/Root.tsx` dalam `<Folder name="Thumbnails">` dengan `width={1080} height={1440}`, lalu dirender dengan `npx remotion still <PascalId>Thumbnail src/content/<slug>/thumbnail.png`. Contoh: `src/content/how-oauth-works/Thumbnail.tsx` dan `src/content/how-jwt-works/Thumbnail.tsx`.
- **Gaya: neumorphism semenarik mungkin**, memakai UI kit dan kode warna video yang sama:
  - **Selalu tema putih/terang** seperti thumbnail OAuth: kanvas `SceneShell` terang (`#e8eef5`, `cut={false} whoosh={false}`, tanpa `theme="dark"`) plus 2–3 `Glow` lembut dengan warna utama video. Jangan pakai kanvas gelap, meskipun videonya bertema konflik, keamanan, atau hacker; nuansa itu cukup dibawa lewat karakter, stempel, dan warna aksen.
  - Still dirender di frame 0, jadi semua komponen beranimasi diberi `at={-10}` supaya tampil penuh (kartu sudah timbul, teks lengkap).
  - Hierarki, harus tetap terbaca saat diperkecil ke ±25%:
    1. Judul topik 240–300 px dengan gradasi warna video, efek timbul neumorphism (dua `drop-shadow`: sorot putih kiri-atas, bayangan slate kanan-bawah). Di atasnya pill cekung (inset) berisi jenis konten, misalnya "CARA KERJA".
    2. Pertanyaan/janji hook, maksimal ±6 kata, di kartu timbul; kata kunci 110–140 px dengan marker.
    3. Visual utama: karakter dengan ekspresi kuat (`surprised`, `excited`, `scared`) yang menunjuk atau bereaksi ke objek inti topik.
    4. Maksimal 2 objek pendukung (kartu, properti, stempel) yang juga muncul di video.
  - `ChannelBadge` (logo + @daffahaidarnz, dari `src/content/shared/ChannelOutro.tsx`) di kiri atas.
  - Maksimal 6–8 elemen. Jangan ada elemen penting dalam 48 px dari tepi, jangan menutupi wajah karakter, tanpa emoji, ikon dari `react-icons`, logo brand hanya untuk identifikasi.
  - Teks Bahasa Indonesia, selaras dengan hook. Jangan menjanjikan hal yang tidak ada di video (misalnya "2 menit paham" untuk video 2:48).
- **QA:** buka PNG hasil render dan periksa: judul terbaca, wajah karakter terlihat, tidak ada tumpang-tindih atau elemen terpotong di tepi, arah tunjuk karakter mengarah ke objek inti. Perbaiki lalu render ulang.

## 12. Implementasi teknis

- **Folder:** `src/content/<slug>/` dengan slug bahasa Inggris kebab-case (misalnya `how-oauth-works`, `express-rest-api-tutorial`, `internet-fun-facts`, `news-<topik>-<yyyy-mm>`). Isinya: komposisi utama `<PascalId>.tsx`, `scenes/*.tsx`, `script_dubbing.md`, `Thumbnail.tsx`, dan `thumbnail.png` (bagian 11).
- **Registrasi** di `src/Root.tsx`, di dalam `<Folder name="Content">`:

```tsx
<Composition
	id="HowOauthWorks"
	component={HowOauthWorks}
	width={1080}
	height={1920}
	fps={30}
	durationInFrames={TOTAL_SECONDS * 30}
	defaultProps={{musicVolume: 0.28}}
/>
```

- **Durasi scene** hanya didefinisikan di satu tempat:

```tsx
export const SCENE_SECONDS = {hook: 10, problem: 12 /* … */, outro: OUTRO_SECONDS} as const;
export const TOTAL_SECONDS = Object.values(SCENE_SECONDS).reduce((a: number, b) => a + b, 0);
```

- **Struktur:** scene dirangkai dengan `<Series>` + `<Series.Sequence name="01 Hook" durationInFrames={SCENE_SECONDS.hook * fps}>`. SFX diletakkan di dalam scene (`<Sfx at={detik}>`); backsound di komposisi utama.
- **UI kit:** pakai ulang `src/content/shared/ui.tsx` + `theme.ts` + `ChannelOutro.tsx` (`SceneShell`, `Headline`, `Reveal`, `Card`, `Pill`, `Stamp`, `TypeText`, `Scramble`, `Travel`, `Arrow`, `Glow`, `Actor`, `Place`, `HackerDesk`, `Sfx`, `Backsound`, `Lane`/`LifeLine`/`Step`/`Note` untuk diagram alur, `Term`/`EqSymbol`/`TipCard` untuk rangkuman, `useRamp`, dll.).
  - Jangan copy-paste. Kalau butuh bagian generik baru dari video lain, pindahkan ke `src/content/shared/` dan perbarui import video asalnya; video lama harus tetap lolos tsc dan tampil sama.
  - Data dan warna khusus topik tetap di folder topik.
- **Animasi:** semua digerakkan oleh `useCurrentFrame()`, `interpolate()`, dan `spring()` dari `remotion`. Jangan pakai CSS transition/animation. Nilai acak harus deterministik (`random(seed)` dari `remotion`).
- **Jebakan yang sudah diketahui:**
  - `tsconfig` memakai lib es2015, jadi hindari API baru seperti `Array.prototype.findLastIndex`.
  - ESLint memeriksa file `.mjs` di `src` sebagai kode browser. Impor `Buffer` dan `stdout` dari `node:buffer` dan `node:process`.
  - Frame pertama setiap scene harus sudah berisi konten (headline dan pill chapter mulai sedikit sebelum cut).
  - Rig karakter memakai viewBox 840×900 dengan kaki di y = 860 (posisikan dengan `Actor`). Skala meja 1,18× dan laptop 0,7× dari skala karakter, supaya wajah tidak tertutup.
  - Di adegan gelap, beri `Glow` di belakang karakter dan properti yang konturnya gelap.
  - ffmpeg bawaan Remotion (`npx remotion ffmpeg`) tidak punya filter `volumedetect`. Ukur level audio dengan skrip Node dari WAV.
  - Skrip Node yang meng-import paket repo (`@remotion/bundler`, `@remotion/renderer`) harus dijalankan dari dalam repo (misalnya file sementara di root repo yang dihapus setelah selesai), supaya import-nya bisa di-resolve.

## 13. Alur kerja

1. Baca playbook ini dan video referensi (bagian 2).
2. Parse input (bagian 1) dan hitung rencana durasi (bagian 4).
3. Riset dan verifikasi fakta bila diperlukan (bagian 7).
4. Tulis konsep, tabel scene (nama, durasi, isi visual, SFX), dan naskah. Timing narasi menentukan timing animasi.
5. Jalankan Remotion Studio (`npx remotion studio`) dan biarkan menyala. Komposisi bisa dibuka di `http://localhost:3000/<id>`.
6. Bangun Scene 1 dulu, render still, periksa, baru lanjut ke scene lain.
7. Buat backsound sesuai rencana scene, lalu pasang SFX.
8. QA visual:
   - Render still di momen kunci tiap scene (skala 0.5) dengan `bundle()` dari `@remotion/bundler`, lalu `selectComposition()` dan `renderStill()` dari `@remotion/renderer`.
   - Lihat gambarnya dan periksa: frame pertama tiap scene tidak kosong, tidak ada tumpang-tindih, safe zone terpenuhi, wajah tidak tertutup, teks terbaca.
   - Perbaiki semua temuan.
9. QA audio: jalankan `npx remotion render <id> <temp>/mix.wav --codec=wav`, lalu pastikan durasinya = TOTAL_SECONDS dan puncaknya ≤ −1 dBFS.
10. Buat thumbnail cover 3:4 (bagian 11), render ke `src/content/<slug>/thumbnail.png`, lalu QA dan perbaiki.
11. Jalankan `npx tsc --noEmit`, `npx eslint src`, dan `npx -y react-doctor@latest --no-telemetry` (perbaiki temuan di file baru), lalu `graphify update .` bila tersedia.

## 14. Definition of Done (WAJIB, centang semua)

- [ ] Komposisi baru terdaftar dan terbuka di Remotion Studio.
- [ ] Durasi akhir = T ± 2 detik, dan ≤ 180 detik bila T ≤ 180.
- [ ] Struktur cerita sesuai formula jenis konten dan aturan retensi (hook, open loop, re-hook sesuai tier, payoff).
- [ ] Scene terakhir = `ChannelOutro` (logo + @daffahaidarnz, Like/Simpan/Follow-Subscribe, kartu video berikutnya) dengan narasi baku.
- [ ] `script_dubbing.md` sesuai format, timing cocok dengan animasi, kepadatan narasi 2,2–2,7 kata/detik.
- [ ] QA visual lolos untuk semua scene.
- [ ] Backsound orisinal, SFX terpasang, puncak audio ≤ −1 dBFS.
- [ ] Fakta bersumber, bila jenis kontennya membutuhkan.
- [ ] Thumbnail 3:4 (1080×1440, neumorphism) ada di `src/content/<slug>/thumbnail.png` (atau `.jpg`), ≤ 2 MB, dan lolos QA.
- [ ] `tsc` dan ESLint lolos; React Doctor tanpa temuan baru di folder konten baru.
- [ ] Tidak ada commit dan tidak ada render MP4 final tanpa permintaan.

## 15. Laporan akhir (Bahasa Indonesia)

Laporan berisi:
- link Studio;
- daftar file, termasuk path thumbnail;
- tabel rencana scene beserta durasinya;
- strategi hook dan open loop;
- hasil semua pengecekan;
- daftar sumber (bila ada) dan klaim yang masih meragukan;
- asumsi yang dipakai (default input);
- peringatan durasi atau platform (bila ada);
- hal yang perlu dicek sendiri oleh pengguna (misalnya mendengarkan backsound).
