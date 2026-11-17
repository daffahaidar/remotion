# Folder Audio — Voice Over & SFX (SSR vs CSR di Next.js)

Video ini dirancang agar kamu dapat merekam voice-over sendiri secara natural (tanpa AI voice / tanpa TTS).

## Cara Memasukkan Rekaman Voice-Over Kamu

1. Rekam narasi sesuai panduan cue sheet di bawah (total durasi **145 detik** / `02:25`).
2. Simpan file audio hasil rekamanmu (format `.wav`, `.mp3`, atau `.m4a`) ke folder ini dengan nama:
   - `public/audio/voiceover-placeholder.wav` (timpa file placeholder hening yang ada), **atau**
   - ubah nama file pada prop `voiceoverFile` di komposisi `SsrVsCsrNextJs` (bisa diatur langsung dari panel Props di Remotion Studio!).
3. (Opsional) Jika ingin menambahkan background music lembut, taruh file musik di folder ini dan aktifkan atau pasang di Track Audio pada `SsrVsCsrVideo.tsx` (disarankan volume `0.08–0.14` agar tidak menutupi narasi).

## Panduan Cue Sheet Narasi (30 FPS, Total 4350 Frames)

| Scene | Timecode | Frames | Durasi | Naskah Narasi |
| --- | --- | --- | --- | --- |
| **01 — Hook** | `00:00 – 00:12` | `0 – 360` | 12s | "Pernah nggak, kamu buka website terus isinya langsung muncul? Tapi di website lain, yang muncul malah loading muter-muter? Nah, ini ada hubungannya sama SSR dan CSR!" |
| **02 — Analogi Restoran** | `00:12 – 00:27` | `360 – 810` | 15s | "Sebelum kita bahas teknisnya, bayangin kamu lagi pesan makanan di restoran. Ada dua cara restoran menyajikan makanan. Dan ternyata, cara kerjanya mirip banget sama rendering website!" |
| **03 — SSR** | `00:27 – 00:47` | `810 – 1410` | 20s | "Pertama, Server-Side Rendering atau SSR. Bayangin kamu pesan makanan, terus koki langsung memasak makananmu di dapur. Setelah selesai, pelayan langsung mengantarkannya ke meja. Jadi, ketika makanan datang, kamu nggak perlu menunggu lagi untuk mulai makan." |
| **04 — SSR Teknis** | `00:47 – 01:02` | `1410 – 1860` | 15s | "Di SSR, server memproses halaman dan menghasilkan HTML yang sudah berisi konten. HTML itu kemudian dikirim ke browser, sehingga pengguna bisa melihat konten lebih awal. Setelah itu, JavaScript dapat melakukan hydration agar halaman menjadi interaktif." |
| **05 — CSR** | `01:02 – 01:20` | `1860 – 2400` | 18s | "Nah, sekarang Client-Side Rendering atau CSR. Kali ini, restoran memberikan kamu bahan-bahan dan resepnya. Tapi kamu sendiri yang harus memasak dan menyajikan makanannya. Jadi, ada proses tambahan sebelum makanan siap dinikmati." |
| **06 — CSR Teknis** | `01:20 – 01:35` | `2400 – 2850` | 15s | "Pada CSR murni, browser menerima HTML awal yang minimal, kemudian mengunduh dan menjalankan JavaScript. Setelah itu, JavaScript membangun tampilan halaman di browser. Makanya, kalau proses ini belum selesai, pengguna bisa melihat loading terlebih dahulu." |
| **07 — Perbandingan** | `01:35 – 01:55` | `2850 – 3450` | 20s | "Jadi, apa bedanya? SSR biasanya membuat konten tersedia lebih awal karena HTML sudah disiapkan server. Sedangkan CSR mengandalkan browser untuk membangun tampilan setelah JavaScript dijalankan. Tapi ingat, SSR bukan berarti selalu lebih cepat, dan CSR juga bukan berarti buruk." |
| **08 — Plot Twist Next.js** | `01:55 – 02:10` | `3450 – 3900` | 15s | "Eh, tapi ada satu hal menarik di Next.js! Dengan App Router, Next.js menggunakan Server Components secara default. Sementara Client Components tetap bisa diproses menjadi HTML saat initial load, lalu di-hydrate di browser. Jadi, 'use client' bukan berarti otomatis mematikan SSR!" |
| **09 — Closing** | `02:10 – 02:25` | `3900 – 4350` | 15s | "Kesimpulannya, SSR dan CSR punya kelebihan masing-masing. Pilih berdasarkan kebutuhan aplikasi kamu, bukan sekadar ikut tren. Sekarang kamu sudah tahu bedanya, kan? Jangan lupa follow untuk belajar teknologi lainnya!" |

## Daftar SFX Bawaan (`public/audio/sfx/`)
- `pop.wav` — pop elemen UI dan balon dialog
- `whoosh.wav` — transisi halus antar scene
- `ding.wav` — masakan selesai / langkah diagram berhasil
- `click.wav` — interaksi klik tombol setelah hydration
- `sparkle.wav` — efek reveal hydration / plot twist Next.js

Seluruh SFX diset pada volume rendah (`0.14–0.22`) agar tidak menutupi suara voice-over.
