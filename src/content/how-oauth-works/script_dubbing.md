# Script Dubbing — "Cara Kerja OAuth"

**Jenis konten:** Cara Kerja · **Durasi total:** 02:48 (168 detik) · **Format:** 9:16 (1080×1920), 30 fps · **Komposisi Remotion:** `HowOauthWorks`

## Cara membaca script ini

- **Detik** = waktu absolut di video (menit:detik). Mulai bicara di awal rentang, selesai sebelum rentang berakhir.
- **Tebal** = kata yang diberi tekanan suara. `...` = jeda singkat (± setengah detik).
- *(Visual: …)* = apa yang muncul di layar saat itu, sebagai patokan sinkron. Tidak perlu dibaca.
- Gaya bicara: santai dan bersemangat, seperti menjelaskan ke teman. Sapa penonton dengan "kamu". Tempo ± 150 kata/menit.
- Bagian bertanda 🔊 punya efek suara keras. Beri jeda sepersekian detik supaya suaramu tidak bertabrakan dengan SFX.

---

### Scene 1 — Hook

Detik 00:00 - 00:03:
"Budi kasih **password** Google ke aplikasi jadwal..."
*(Visual: layar gelap, aplikasi JadwalKu minta email + password Google, password diketik, tombol Masuk ditekan, label "password Budi" terbang ke laptop hacker)*

Detik 00:03 - 00:05:
"...dan semua emailnya langsung **bocor**!"
*(Visual: kotak masuk Budi dibaca hacker: slip gaji, kode OTP, scan KTP; 🔊 stempel "AKUN BOCOR!" tepat di 00:04)*

Detik 00:05 - 00:08:
"Terus, kenapa tombol **Login pakai Google** justru aman?"
*(Visual: tulisan "Kok Login pakai Google aman?", tombol "Lanjutkan dengan Google", tanda tanya bermunculan)*

Detik 00:08 - 00:09:
"Jawabannya: **OAuth**!"
*(Visual: 🔊 judul besar "CARA KERJA OAuth" tepat di 00:08)*

Detik 00:09 - 00:12:
"Tonton sampai habis, kita lihat aplikasi nakal ini **gagal**."
*(Visual: IZIN → KODE → TOKEN, lalu "Tonton sampai habis")*

### Scene 2 — Masalahnya

Detik 00:12 - 00:15:
"Padahal, aplikasi memang sering butuh **data kamu**."
*(Visual: layar terang, judul "Aplikasi butuh data kamu", kartu JadwalKu muncul)*

Detik 00:15 - 00:18:
"Misalnya, aplikasi jadwal butuh isi **Google Calendar** kamu."
*(Visual: kartu Google Calendar berisi jadwal, panah "butuh akses" dari JadwalKu)*

Detik 00:18 - 00:22:
"Pertanyaannya: gimana kasih akses... **tanpa** kasih password?"
*(Visual: Budi berpikir, balon "Kasih akses...", lalu balon merah "tanpa password?" di 00:20)*

### Scene 3 — Cara lama: kasih password

Detik 00:22 - 00:25:
"Cara lama: ya kasih saja **password**-nya."
*(Visual: judul "Cara lama: kasih password", JadwalKu minta password, titik-titik password diketik)*

Detik 00:25 - 00:28:
"Masalahnya, aplikasi dapat akses **penuh**: email, Drive, semuanya."
*(Visual: kartu "Akses penuh", ikon email, Drive, dan kontak terbuka satu per satu)*

Detik 00:28 - 00:31:
"Izinnya nggak bisa **dicabut**, kecuali kamu ganti password."
*(Visual: kartu "Nggak bisa dicabut · kecuali ganti password")*

Detik 00:31 - 00:34:
"Dan kalau aplikasinya bocor... password kamu **ikut bocor**."
*(Visual: kartu "Ikut bocor"; 🔊 stempel "TERLALU BERISIKO" di 00:32,8)*

### Scene 4 — Bayangkan kartu tamu

Detik 00:34 - 00:39:
"OAuth lebih cerdas. Bayangkan **kurir** mau antar paket ke apartemen kamu."
*(Visual: judul "Bayangkan kartu tamu", kartu Kurir → kartu Apartemen)*

Detik 00:39 - 00:43:
"Kamu nggak kasih **kunci**. **Satpam** yang telepon kamu, minta izin."
*(Visual: label "Kunci? Nggak!", kartu Satpam, telepon berdering ke kartu Kamu, balon "Izinkan kurir?" lalu "Boleh!")*

Detik 00:43 - 00:48:
"Lalu kurir dapat **kartu tamu**: cuma bisa ke lantai kamu, berlaku **satu jam**."
*(Visual: kartu tamu emas, chip "Lantai 12 saja" dan "Berlaku 1 jam", lalu label "Kartu tamu = Access token" dan "Lantai = Scope")*

### Scene 5 — Anatomi OAuth

Detik 00:48 - 00:51:
"Nah, di OAuth ada **empat** peran."
*(Visual: judul "4 peran di OAuth")*

Detik 00:51 - 00:53:
"**Kamu**, pemilik data: Resource Owner."
*(Visual: kartu ungu "Kamu · Resource Owner")*

Detik 00:53 - 00:56:
"**JadwalKu**, aplikasi yang minta akses: Client."
*(Visual: kartu oranye "JadwalKu · Client = si kurir")*

Detik 00:56 - 00:59:
"Si satpam, server login Google: **Authorization Server**."
*(Visual: kartu biru "Login Google · Authorization Server = si satpam")*

Detik 00:59 - 01:02:
"Dan Google Calendar, tempat datanya disimpan: **Resource Server**."
*(Visual: kartu hijau "Google Calendar · Resource Server = apartemen")*

Detik 01:02 - 01:06:
"Kartu tamunya? **Access token**, dengan batas izin bernama **scope**."
*(Visual: kartu emas "Access token = kartu tamu", lalu pill "scope: calendar.readonly")*

### Scene 6 — Awas, OAuth bukan buat login!

Detik 01:06 - 01:07:
"Tapi... **hati-hati**!"
*(Visual: 🔊 suara piringan tergores + tulisan besar "TAPI...", musik berhenti sebentar)*

Detik 01:07 - 01:09:
"OAuth itu **bukan** buat login."
*(Visual: judul "OAuth bukan buat login", kartu "Login · autentikasi · Kamu siapa?" dicoret merah)*

Detik 01:09 - 01:11:
"OAuth cuma mengurus **izin**."
*(Visual: kartu "OAuth · otorisasi · Boleh ngapain?" dicentang hijau)*

Detik 01:11 - 01:15:
"Tombol Login pakai Google memakai **OpenID Connect**: OAuth plus **ID token**."
*(Visual: "dipakai tombol Login pakai Google", lalu persamaan OAuth + ID token = OpenID Connect)*

Detik 01:15 - 01:18:
"Jadi, **jangan** jadikan access token bukti login."
*(Visual: label merah "JANGAN:", kartu "Access token dipakai sebagai bukti login" dengan tanda silang)*

### Scene 7 — Rahasianya

Detik 01:18 - 01:21:
"Terus, kenapa Login pakai Google **aman**?"
*(Visual: judul "Kenapa aman?", stiker merah "Ini kunci aplikasi nakal gagal!", jendela aplikasi JadwalKu)*

Detik 01:21 - 01:24:
"Kamu **nggak pernah** ngetik password di aplikasinya."
*(Visual: kotak putus-putus "kolom password — nggak ada")*

Detik 01:24 - 01:27:
"JadwalKu cuma **mengarahkan** kamu ke halaman Google."
*(Visual: tombol "Lanjutkan dengan Google" ditekan, alamat berubah jadi accounts.google.com)*

Detik 01:27 - 01:31:
"Di sana kamu **login**, dan Google bertanya: izinkan JadwalKu **lihat kalender**?"
*(Visual: password diketik di halaman Google, label "Password cuma diketik di Google", lalu layar izin "JadwalKu ingin: Lihat kalender kamu", tombol Izinkan ditekan di 01:31)*

Detik 01:31 - 01:36:
"Setuju? Google mengembalikan kamu ke aplikasi, membawa **kode izin** sekali pakai."
*(Visual: alamat kembali ke jadwalku.app/cb?code=…, kode `SplxlOBeZQQYbYS6WxSbIA`, label "Aplikasi cuma terima kode" dan "sekali pakai · cepat kedaluwarsa")*

### Scene 8 — Alur lengkap

Detik 01:36 - 01:37:
"Alur **lengkapnya**:"
*(Visual: tiga jalur: APLIKASI, GOOGLE, CALENDAR)*

Detik 01:37 - 01:41:
"**Satu**: aplikasi mengarahkan kamu ke Google, membawa scope dan state."
*(Visual: langkah 1, GET /authorize, catatan "scope · state · code_challenge")*

Detik 01:41 - 01:44:
"**Dua**: kamu login dan setuju."
*(Visual: langkah 2 di jalur Google, "kamu login + setuju")*

Detik 01:44 - 01:47:
"**Tiga**: Google redirect balik, membawa kode."
*(Visual: langkah 3, redirect /cb, catatan "code=SplxlOBe…&state=xyz")*

Detik 01:47 - 01:51:
"**Empat**: lewat jalur belakang, aplikasi menukar kode itu, plus bukti rahasia."
*(Visual: langkah 4, POST /token + label "jalur belakang", catatan "code + code_verifier")*

Detik 01:51 - 01:53:
"**Lima**: Google memberi access token."
*(Visual: langkah 5, access_token emas dikirim balik, `2YotnFZFEjr1zCsicMWpAA`)*

Detik 01:53 - 01:56:
"**Enam**: aplikasi memanggil API Calendar dengan token itu."
*(Visual: langkah 6, GET /calendar + "Authorization: Bearer 2YotnF…", lalu "200 OK · isi kalender")*

### Scene 9 — Balik ke aplikasi nakal

Detik 01:56 - 01:58:
"Sekarang... ingat **aplikasi nakal** tadi?"
*(Visual: 🔊 layar kembali gelap, hacker di mejanya, server GOOGLE API di kanan)*

Detik 01:58 - 02:02:
"Kali ini Budi pakai **OAuth**. Aplikasinya **nggak pernah** lihat password."
*(Visual: "Budi login lewat Google", lalu "Password Budi: ???", hacker bingung)*

Detik 02:02 - 02:05:
"Yang dia pegang cuma token **lihat kalender**."
*(Visual: judul "Cuma pegang token", kartu access token + "scope: calendar.readonly")*

Detik 02:05 - 02:08:
"Dia coba baca **Gmail** pakai token itu..."
*(Visual: request "GET /gmail" terbang ke server, perbandingan "Butuh: gmail.readonly" vs "Token: calendar.readonly", tanda ≠)*

Detik 02:08 - 02:10:
"**Ditolak!** Scope-nya nggak cukup."
*(Visual: 🔊 stempel "403 · DITOLAK" tepat di 02:08, layar bergetar, hacker menangis, terompet "gagal")*

Detik 02:10 - 02:13:
"Budi tinggal **cabut izinnya**, token langsung **mati**."
*(Visual: judul "Cabut izinnya", sakelar "Akses JadwalKu" dimatikan di 02:10,8, token dicoret + "401 · invalid_token")*

Detik 02:13 - 02:14:
"Password? Tetap **aman**."
*(Visual: gembok emas, "Password Budi tetap aman")*

### Scene 10 — Pengaman ekstra: PKCE

Detik 02:14 - 02:18:
"Satu lagi: kode izin bisa **dicegat**. Makanya ada **PKCE**."
*(Visual: kode berjalan dari JadwalKu ke Google, pencuri muncul "dicegat!", label "Proof Key for Code Exchange")*

Detik 02:18 - 02:24:
"Aplikasi kirim **hash** dari kata rahasia acak di awal, lalu tunjukkan **aslinya** saat menukar kode."
*(Visual: code_verifier → SHA-256 → code_challenge "dikirim di awal", lalu "Tukar kode: code + code_verifier" → "cocok ✓")*

Detik 02:24 - 02:26:
"Pencuri kodenya? **Gagal**."
*(Visual: kartu "Pencuri: cuma code" + invalid_grant; 🔊 stempel "GAGAL!" di 02:25)*

### Scene 11 — Rangkuman

Detik 02:26 - 02:30:
"Kesimpulannya: **izin** kamu, plus **token** terbatas, itulah OAuth."
*(Visual: Izin kamu + Token terbatas = OAuth)*

Detik 02:30 - 02:32:
"Password tetap di **tangan kamu**."
*(Visual: "Password tetap di tangan kamu")*

Detik 02:32 - 02:38:
"Tips aman: login cuma di halaman **resmi**, kasih izin **seperlunya**, **cabut** akses lama, dan pakai **PKCE**."
*(Visual: empat kartu tips muncul satu per satu sesuai yang kamu sebut)*

### Scene 12 — Outro channel

Detik 02:38 - 02:41:
"Kalau video ini **ngebantu**, kasih **like**..."
*(Visual: foto profil + @daffahaidarnz, tiga tombol muncul, teks "Kalau videonya ngebantu"; jari men-tap tombol Like di 02:40, hati jadi merah)*

Detik 02:41 - 02:43:
"**simpan** biar nggak lupa..."
*(Visual: jari men-tap tombol Simpan di 02:41, bookmark jadi emas, teks "Biar nggak lupa")*

Detik 02:43 - 02:45:
"dan **follow** atau **subscribe** daffahaidarnz..."
*(Visual: jari men-tap tombol Follow di 02:43, foto profil berdenyut, teks "Follow / Subscribe, gratis kok!")*

Detik 02:45 - 02:48:
"biar nggak ketinggalan **cara kerja internet** di video berikutnya!"
*(Visual: kartu "Video berikutnya: Cara Kerja Internet · Apa yang terjadi saat kita buka Google?")*

---

## Memasang dubbing

**Opsi A — di editor video (CapCut, Premiere, dll.):** render video dari Remotion (`npx remotion render HowOauthWorks`), lalu taruh rekaman suara di track baru mulai 00:00. Backsound sudah dicampur pelan, jadi suaramu tetap terdengar jelas.

**Opsi B — langsung di Remotion:** simpan rekaman sebagai `public/audio/voiceover-oauth.mp3`, lalu tambahkan satu baris ini di dalam fragmen komponen `HowOauthWorks` (di file `HowOauthWorks.tsx`, tepat di atas `<Backsound … />`; impor `Audio` dari `@remotion/media`):

```tsx
<Audio name="Voice-over" src={staticFile('audio/voiceover-oauth.mp3')} />
```

**Kalau tempo bicaramu berbeda:** ubah durasi scene di `SCENE_SECONDS` (`HowOauthWorks.tsx`). Panjang video menyesuaikan otomatis. Animasi di dalam scene tetap memakai detik relatif terhadap awal scene. Kalau durasi scene berubah, sesuaikan juga entri `how-oauth-works` di `src/content/shared/generate-audio.mjs`, lalu jalankan `node src/content/shared/generate-audio.mjs how-oauth-works` supaya backsound tetap pas dengan cut.

**Mau pakai lagu trending dari TikTok/IG?** Set prop `musicVolume` ke `0` di panel Props Remotion Studio, lalu render. Efek suara tetap ada, backsound hilang.

## Sumber

Semua diakses 22 November 2026.

- OAuth.net, "OAuth 2.0" — definisi OAuth 2.0 sebagai protokol standar industri untuk otorisasi: https://oauth.net/2/
- RFC 6749, "The OAuth 2.0 Authorization Framework" (Oktober 2012) — empat peran (§1.1), Authorization Code Grant (§4.1), contoh nilai `code=SplxlOBeZQQYbYS6WxSbIA`, `state=xyz`, `access_token=2YotnFZFEjr1zCsicMWpAA`: https://www.rfc-editor.org/rfc/rfc6749
- RFC 7636, "Proof Key for Code Exchange" (September 2015) — PKCE, S256, contoh `code_verifier`/`code_challenge` di Lampiran B (sudah diverifikasi: BASE64URL(SHA256(verifier)) = challenge): https://www.rfc-editor.org/rfc/rfc7636
- OAuth.net, "PKCE": https://oauth.net/2/pkce/
- OAuth.net, "Scope" — scope membatasi akses aplikasi ke akun pengguna: https://oauth.net/2/scope/
- OAuth.net, "User Authentication with OAuth 2.0" — "OAuth 2.0 is not an authentication protocol"; OpenID Connect dibangun di atas OAuth 2.0 dan menambahkan ID Token: https://oauth.net/articles/authentication/
- OAuth.net, "OAuth 2.1" (masih draft) — PKCE wajib untuk semua klien Authorization Code: https://oauth.net/2.1/
- RFC 6750, "Bearer Token Usage" — kode error `insufficient_scope` (403) dan `invalid_token` (401): https://www.rfc-editor.org/rfc/rfc6750

Catatan: JadwalKu dan Budi adalah contoh fiktif. Scope asli Google Calendar ditulis lengkap sebagai `https://www.googleapis.com/auth/calendar.readonly`; di layar disingkat `calendar.readonly`.
