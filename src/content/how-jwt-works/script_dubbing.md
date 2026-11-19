# Script Dubbing — "Cara Kerja JWT"

**Durasi total:** 02:51 (171 detik) · **Format:** 9:16 (1080×1920), 30 fps · **Komposisi Remotion:** `HowJwtWorks`

## Cara membaca script ini

- **Detik** = waktu absolut di video (menit:detik). Mulai bicara di awal rentang, selesai sebelum rentang berakhir.
- **Tebal** = kata yang diberi tekanan suara. `...` = jeda singkat (± setengah detik).
- *(Visual: …)* = apa yang muncul di layar saat itu, sebagai patokan sinkron. Tidak perlu dibaca.
- Gaya bicara: santai dan bersemangat, seperti menjelaskan ke teman. Tempo ± 150 kata/menit.
- Bagian bertanda 🔊 punya efek suara keras. Beri jeda sepersekian detik supaya suaramu tidak bertabrakan dengan SFX.

---

### Scene 1 — Hook

Detik 00:00 - 00:03:
"Hacker ini cuma ganti **satu** kata di tokennya..."
*(Visual: hacker mengetik, `"user"` diganti jadi `"admin"`)*

Detik 00:03 - 00:04:
"...dan berharap langsung jadi **admin**."
*(Visual: label "ADMIN?!" muncul di atas kepalanya)*

Detik 00:04 - 00:06:
"Tapi... server langsung **menolaknya**!"
*(Visual: 🔊 stempel "401 · DITOLAK" menghantam layar di 00:04,5)*

Detik 00:06 - 00:08:
"Kok bisa ketahuan? Rahasianya ada di..."
*(Visual: tulisan "Kok bisa ketahuan?", tanda tanya bermunculan)*

Detik 00:08 - 00:09:
"**JWT**!"
*(Visual: 🔊 judul besar "CARA KERJA JWT" muncul tepat di 00:08)*

Detik 00:09 - 00:12:
"Tonton sampai habis, biar tahu kenapa dia **gagal**."
*(Visual: label HEADER · PAYLOAD · SIGNATURE, lalu "Tonton sampai habis")*

### Scene 2 — Server itu pelupa

Detik 00:12 - 00:15:
"Pertama, kamu harus tahu: server itu **pelupa**."
*(Visual: layar berubah terang, judul "Server itu PELUPA")*

Detik 00:15 - 00:19:
"Setiap kali kamu kirim request, dia **nggak ingat** kamu siapa."
*(Visual: request terbang ke server, server bertanya "Kamu siapa?" tiga kali)*

Detik 00:19 - 00:21:
"Istilahnya: HTTP itu **stateless**."
*(Visual: label "HTTP = stateless")*

Detik 00:21 - 00:25:
"Masa iya, tiap pindah halaman, kamu harus **login ulang**?"
*(Visual: kartu login bertumpuk, "Login lagi?!")*

### Scene 3 — Cara lama: session

Detik 00:25 - 00:27:
"Cara lama namanya: **session**."
*(Visual: judul "Cara lama: SESSION")*

Detik 00:27 - 00:30:
"Setelah kamu login, server **mencatat**: sesi ini milik Budi."
*(Visual: buku catatan sesi, baris `sess_8f3a → Budi` diketik)*

Detik 00:30 - 00:33:
"Kamu cuma dikasih nomor sesinya, lewat **cookie**."
*(Visual: cookie terbang ke Budi)*

Detik 00:33 - 00:35:
"Masalahnya, kalau user-nya **jutaan**..."
*(Visual: catatan membanjir, penghitung naik sampai 1.000.000)*

Detik 00:35 - 00:37:
"...dan servernya banyak, catatan ini harus **dibagi** ke semua server."
*(Visual: tiga server muncul, server B bingung "Nggak kenal!", lalu panah sinkronisasi)*

Detik 00:37 - 00:39:
"Berat... dan **ribet**."
*(Visual: 🔊 stempel "BERAT & RIBET")*

### Scene 4 — Bayangkan gelang konser

Detik 00:39 - 00:42:
"JWT punya cara yang lebih cerdas. Bayangkan **gelang konser**."
*(Visual: judul "Bayangkan gelang konser")*

Detik 00:42 - 00:46:
"Sekali tunjukkan tiket di pintu masuk, kamu dapat gelang **bersegel resmi**."
*(Visual: kartu tiket, lalu gelang dengan segel hologram, label "Gelang = Token" dan "Segel = Tanda tangan")*

Detik 00:46 - 00:52:
"Mau ke panggung mana pun, petugas cukup **cek gelangnya**. Nggak perlu buka buku tamu."
*(Visual: Panggung A, B, C dipindai satu per satu lalu dicentang, "buku tamu" dicoret)*

### Scene 5 — Anatomi JWT

Detik 00:52 - 00:56:
"Nah, di dunia web, gelang itu adalah **JWT**: JSON Web Token."
*(Visual: token panjang diketik di layar)*

Detik 00:56 - 01:00:
"Kelihatannya cuma teks acak, tapi sebenarnya ada **tiga bagian**, dipisah titik."
*(Visual: dua titik pada token membesar dan menyala, label "3 bagian")*

Detik 01:00 - 01:03:
"Yang **merah**: header. Isinya jenis algoritma."
*(Visual: bagian merah menyala, kartu HEADER muncul)*

Detik 01:03 - 01:08:
"Yang **ungu**: payload. Isinya data kamu, seperti ID, nama, role, dan masa berlakunya."
*(Visual: bagian ungu menyala, kartu PAYLOAD muncul)*

Detik 01:08 - 01:11:
"Dan yang **biru**: signature, tanda tangan digitalnya."
*(Visual: bagian biru menyala, kartu SIGNATURE muncul)*

Detik 01:11 - 01:14:
"Ingat bagian ini, karena inilah alasan hacker tadi **gagal**."
*(Visual: stiker merah "Ini kenapa hacker gagal!")*

### Scene 6 — Awas, bukan enkripsi!

Detik 01:14 - 01:16:
"Tapi... **hati-hati**!"
*(Visual: 🔊 suara piringan tergores + tulisan besar "TAPI...", musik berhenti sebentar)*

Detik 01:16 - 01:19:
"Payload ini cuma di-encode pakai Base64, **bukan dienkripsi**."
*(Visual: payload Base64 di-decode jadi JSON, stempel "BUKAN DIENKRIPSI!")*

Detik 01:19 - 01:22:
"Artinya, siapa pun yang dapat tokennya bisa **membaca** isinya."
*(Visual: label "Siapa pun bisa baca")*

Detik 01:22 - 01:26:
"Jadi, **jangan pernah** taruh password, PIN, atau data rahasia di sini."
*(Visual: daftar "JANGAN simpan" dengan tanda silang)*

### Scene 7 — Kuncinya: signature

Detik 01:26 - 01:29:
"Terus, apa yang bikin JWT aman? Jawabannya: **signature**."
*(Visual: judul "Kuncinya: SIGNATURE")*

Detik 01:29 - 01:33:
"Server menggabungkan **header** dan **payload**..."
*(Visual: label HEADER + PAYLOAD)*

Detik 01:33 - 01:36:
"...lalu mengolahnya bersama **secret key**, kunci rahasia yang cuma dimiliki server."
*(Visual: kartu SECRET KEY "cuma server", lalu mesin HMAC-SHA256 berputar)*

Detik 01:36 - 01:38:
"Hasilnya: tanda tangan yang **unik**."
*(Visual: signature keluar dari mesin)*

Detik 01:38 - 01:42:
"Ubah **satu karakter** saja, misalnya ID 123 jadi 124, tanda tangannya langsung **berubah total**."
*(Visual: "123" berubah jadi "124", signature teracak jadi baru, stempel "BERUBAH TOTAL!")*

### Scene 8 — Alur lengkap

Detik 01:42 - 01:44:
"Jadi, begini alur **lengkapnya**."
*(Visual: dua jalur: APLIKASI dan SERVER)*

Detik 01:44 - 01:48:
"**Satu**: kamu login pakai email dan password."
*(Visual: langkah 1, POST /login)*

Detik 01:48 - 01:52:
"**Dua**: server mengecek, lalu membuat JWT dan mengirimkannya ke kamu."
*(Visual: langkah 2, token warna-warni dikirim balik)*

Detik 01:52 - 01:55:
"**Tiga**: aplikasi menyimpan token itu."
*(Visual: langkah 3, simpan token)*

Detik 01:55 - 02:00:
"**Empat**: setiap request berikutnya, token ikut dikirim lewat header Authorization."
*(Visual: langkah 4, GET /profil + Authorization: Bearer)*

Detik 02:00 - 02:04:
"**Lima**: server cukup cek tanda tangannya. Valid? Data langsung dikirim, tanpa cek catatan sesi."
*(Visual: langkah 5, cek signature, lalu "200 OK · data profil")*

### Scene 9 — Balik ke hacker

Detik 02:04 - 02:06:
"Nah, sekarang... ingat **hacker** tadi?"
*(Visual: 🔊 layar kembali gelap, hacker di mejanya)*

Detik 02:06 - 02:10:
"Dia mengubah role-nya jadi **admin**, lalu mengirim token itu ke server."
*(Visual: `"user"` diganti `"admin"`, token terbang ke server)*

Detik 02:10 - 02:13:
"Server lalu **menghitung ulang** tanda tangannya, dari payload baru itu, pakai secret key."
*(Visual: HEADER + PAYLOAD (admin) + kunci masuk mesin, signature baru keluar)*

Detik 02:13 - 02:16:
"Hasilnya... **beda** dengan signature yang ada di token!"
*(Visual: dua signature dibandingkan, tanda ≠ merah)*

Detik 02:16 - 02:18:
"**Ketahuan!** Token ditolak."
*(Visual: 🔊 stempel "TOKEN DITOLAK!" tepat di 02:16, layar bergetar, hacker menangis, terompet "gagal")*

Detik 02:18 - 02:22:
"Tanpa secret key, **mustahil** bikin tanda tangan yang cocok."
*(Visual: gembok emas, "Tanpa secret key = mustahil dipalsukan")*

### Scene 10 — Masa berlaku

Detik 02:22 - 02:25:
"Satu lagi: JWT punya **masa berlaku**."
*(Visual: kartu access token dengan hitungan mundur)*

Detik 02:25 - 02:29:
"Biasanya cuma sekitar **lima belas menit**. Jadi kalau dicuri pun, cepat kedaluwarsa."
*(Visual: jam berputar cepat, 15:00 → 00:00, stempel "KEDALUWARSA")*

Detik 02:29 - 02:34:
"Setelah habis, aplikasi minta token baru pakai **refresh token**. Tanpa perlu login ulang."
*(Visual: refresh token → access token baru, "Tanpa login ulang")*

### Scene 11 — Rangkuman & ajakan

Detik 02:34 - 02:37:
"Kesimpulannya: JWT itu **data kamu**, ditambah **tanda tangan digital**."
*(Visual: Data kamu + Tanda tangan = JWT)*

Detik 02:37 - 02:40:
"Server nggak perlu ingat kamu. Cukup **cek tanda tangannya**."
*(Visual: "Server cukup cek tanda tangannya")*

Detik 02:40 - 02:46:
"Dan ingat empat aturan aman: pakai **HTTPS**, jangan simpan **data sensitif**, jaga **secret key**, dan buat masa berlaku **pendek**."
*(Visual: empat kartu aturan muncul satu per satu sesuai yang kamu sebut)*

Detik 02:46 - 02:51:
"**Simpan** video ini biar nggak lupa, dan **follow** buat bahas OAuth di video berikutnya!"
*(Visual: kartu "Video berikutnya: OAuth 2.0", Budi melambai, tombol Simpan & Follow)*

---

## Memasang dubbing

**Opsi A — di editor video (CapCut, Premiere, dll.):** render video dari Remotion (`npx remotion render HowJwtWorks`), lalu taruh rekaman suara di track baru mulai 00:00. Backsound sudah dicampur pelan, jadi suaramu tetap terdengar jelas.

**Opsi B — langsung di Remotion:** simpan rekaman sebagai `public/audio/voiceover.mp3`, lalu tambahkan satu baris ini di dalam fragmen komponen `HowJwtWorks` (di file `HowJwtWorks.tsx`, tepat di atas `<Backsound … />`):

```tsx
<Audio name="Voice-over" src={staticFile('audio/voiceover.mp3')} />
```

**Kalau tempo bicaramu berbeda:** ubah durasi scene di `SCENE_SECONDS` (`HowJwtWorks.tsx`). Panjang video menyesuaikan otomatis. Animasi di dalam scene tetap memakai detik relatif terhadap awal scene.

**Mau pakai lagu trending dari TikTok/IG?** Set prop `musicVolume` ke `0` di panel Props Remotion Studio, lalu render. Efek suara tetap ada, backsound hilang.
