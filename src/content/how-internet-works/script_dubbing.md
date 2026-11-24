# Script Dubbing — "Cara Kerja Internet: Apa yang Sebenarnya Terjadi Saat Kita Membuka Google?"

**Jenis konten:** Cara Kerja · **Durasi total:** 02:56 (176 detik) · **Format:** 9:16 (1080×1920), 30 fps · **Komposisi Remotion:** `HowInternetWorks`

## Cara membaca script ini

- **Detik** = waktu absolut di video (menit:detik). Mulai bicara di awal rentang, selesai sebelum rentang berakhir.
- **Tebal** = kata yang diberi tekanan suara. `...` = jeda singkat (± setengah detik).
- *(Visual: …)* = apa yang muncul di layar saat itu, sebagai patokan sinkron. Tidak perlu dibaca.
- Gaya bicara: santai, penasaran, dan jelas, seperti menjelaskan ke teman. Sapa penonton dengan "kamu". Tempo tenang ± 120 kata/menit.
- Setiap baris sudah dicek muat diucapkan dengan tenang di rentang waktunya (`node src/content/shared/check-dubbing.mjs src/content/how-internet-works/script_dubbing.md`). Kalau masih sisa waktu, biarkan jeda; jangan menambah kata.
- Angka ditulis sebagaimana diucapkan. IP address **tidak dibaca** angkanya.
- Bagian bertanda 🔊 punya efek suara keras. Beri jeda sepersekian detik supaya suaramu tidak bertabrakan dengan SFX.

---

### Scene 1 — Hook

Detik 00:00 - 00:03:
"Hacker ini nyadap **Wi-Fi kafe**, mau ngintip..."
*(Visual: layar gelap, hacker di meja kafe; aplikasi sniffer "WiFi Kafe Gratis" merekam, baris `HP-Budi → 142.250.190.78` tertangkap, "isi pencarian: membaca...")*

Detik 00:03 - 00:05:
"...tapi cuma dapat **data acak**!"
*(Visual: isi pencarian teracak jadi `17 03 03 00 5a 9c …`; 🔊 stempel "NGGAK KEBACA!" tepat di 00:04, layar bergetar, hacker melongo)*

Detik 00:05 - 00:07:
"Kok bisa? Wi-Fi-nya **sama**!"
*(Visual: tulisan "Kok nggak kebaca?", label "Padahal Wi-Fi-nya sama!" di 00:06, tanda tanya bermunculan, hacker angkat bahu)*

Detik 00:07 - 00:09:
"Ini cara kerja **internet**!"
*(Visual: 🔊 judul besar "CARA KERJA Internet" tepat di 00:08, subjudul "Apa yang terjadi saat buka Google?")*

Detik 00:09 - 00:12:
"Tonton sampai habis, biar tahu **kenapa**."
*(Visual: label "Tonton sampai habis" di 00:09, lalu DNS → TCP → TLS → HTTP di 00:10)*

### Scene 2 — Masalahnya

Detik 00:12 - 00:15:
"Kamu ketik **google.com**, lalu **Enter**."
*(Visual: layar terang, judul "Kamu ketik google.com", alamat diketik di browser, tombol Enter ditekan di 00:14)*

Detik 00:15 - 00:18:
"Masalahnya, komputer **nggak kenal nama**."
*(Visual: judul "Komputer cuma kenal angka", kartu "Nama: google.com · buat manusia" diberi tanda silang di 00:16)*

Detik 00:18 - 00:21:
"Mereka cuma kenal **angka**: IP address."
*(Visual: kartu "IP address: 142.250.190.78 · buat komputer" muncul di 00:18,8 dan dicentang di 00:19)*

Detik 00:21 - 00:23:
"Mirip **alamat rumah**."
*(Visual: label "= alamat rumah" di 00:21)*

Detik 00:23 - 00:26:
"Jadi, google.com itu **alamatnya** di mana?"
*(Visual: Budi berpikir, balon "Alamatnya di mana?" di 00:23)*

### Scene 3 — Cara lama: satu file

Detik 00:26 - 00:29:
"Dulu, semua alamat ada di **satu file**."
*(Visual: judul "Dulu: satu file", kartu HOSTS.TXT "di satu pusat (NIC)" berisi daftar nama → alamat)*

Detik 00:29 - 00:33:
"Tiap komputer harus **download ulang** dari satu pusat."
*(Visual: deretan komputer muncul dengan ikon download, meter "beban server pusat" naik)*

Detik 00:33 - 00:36:
"Makin banyak komputer... makin **kewalahan**!"
*(Visual: komputer membanjir, meter merah penuh; 🔊 stempel "KEWALAHAN!" di 00:34,6)*

Detik 00:36 - 00:38:
"Lalu lahirlah **DNS**!"
*(Visual: label "1983: lahirlah DNS" di 00:36)*

### Scene 4 — Bayangkan kamu nelepon

Detik 00:38 - 00:41:
"Bayangkan kamu mau **nelepon** Ibu."
*(Visual: judul "Bayangkan kamu nelepon", "Memanggil Ibu..." berdering)*

Detik 00:41 - 00:44:
"Nggak hafal nomornya? Cari di **kontak**."
*(Visual: kartu "Cari kontak: Ibu · 0812-xxxx-xxxx", label "Kontak = DNS" di 00:43)*

Detik 00:44 - 00:47:
"Tersambung: "Halo?" "Halo, kedengaran!""
*(Visual: kartu "Tersambung", balon "Halo?" lalu "Halo, kedengaran!", label "Halo-halo = TCP" di 00:46)*

Detik 00:47 - 00:50:
"Biar nggak dikuping, pakai **bahasa sandi**."
*(Visual: kartu "Bahasa sandi" berisi teks acak, label "Sandi = TLS" di 00:49)*

Detik 00:50 - 00:52:
"Baru deh, **ngobrol**."
*(Visual: kartu "Ngobrol", balon "Minta halaman, dong!", label "Obrolan = HTTP" di 00:51)*

### Scene 5 — Anatomi: 4 tahap

Detik 00:52 - 00:55:
"Buka Google juga lewat **empat tahap**."
*(Visual: judul "Ada 4 tahap")*

Detik 00:55 - 00:59:
"**Biru**, DNS: mengubah nama jadi **IP address**."
*(Visual: kartu biru "1 · DNS · cari alamat", `google.com → 142.250.190.78`)*

Detik 00:59 - 01:02:
"**Hijau**, TCP: membuka **sambungan**."
*(Visual: kartu hijau "2 · TCP · buka sambungan", `SYN → SYN-ACK → ACK`)*

Detik 01:02 - 01:06:
"**Emas**, TLS: memasang **gembok**, isinya diacak."
*(Visual: kartu emas "3 · TLS · pasang gembok", `isi → 17 03 03 00 5a 9c …`)*

Detik 01:06 - 01:10:
"**Ungu**, HTTP: meminta **halaman** Google."
*(Visual: kartu ungu "4 · HTTP · minta halaman", `GET / → 200 OK`)*

Detik 01:10 - 01:14:
"Ingat yang **emas**... inilah alasan hacker tadi **gagal**."
*(Visual: kartu lain meredup dan kartu TLS bercincin emas di 01:10; stiker merah "Ini kenapa hacker gagal!" di 01:11,5)*

### Scene 6 — Awas, gembok belum tentu asli!

Detik 01:14 - 01:16:
"Tapi... **hati-hati**!"
*(Visual: 🔊 suara piringan tergores + tulisan besar "TAPI...", musik berhenti sebentar)*

Detik 01:16 - 01:18:
"Gembok artinya **terenkripsi**..."
*(Visual: judul "Gembok belum tentu asli", situs hadiah palsu dengan gembok di alamatnya; label "terenkripsi ✓" di 01:16,6)*

Detik 01:18 - 01:20:
"...bukan berarti situsnya **asli**!"
*(Visual: label "asli? belum tentu" di 01:18)*

Detik 01:20 - 01:23:
"Hampir semua situs **penipu** juga punya gembok."
*(Visual: 🔊 stempel "SITUS PENIPU!" tepat di 01:20, layar bergetar, catatan "Sumber: Chromium Blog")*

Detik 01:23 - 01:26:
"**Jangan** cuma lihat gembok: cek **alamatnya**!"
*(Visual: baris "JANGAN: cuma lihat gembok" di 01:23, "CEK: alamat situsnya" di 01:24,4; huruf "ooo" pada alamat palsu disorot merah)*

### Scene 7 — Cara DNS bekerja

Detik 01:26 - 01:29:
"Begini cara DNS mencari **alamat**."
*(Visual: judul "Cara DNS cari alamat", kartu Browser)*

Detik 01:29 - 01:32:
"Browser bertanya ke **DNS resolver**."
*(Visual: panah ke kartu "DNS resolver · biasanya dari ISP", label `google.com?`)*

Detik 01:32 - 01:35:
"Resolver tanya **server root**: "Tanya .com!""
*(Visual: panah ke kartu "Server root ( . )", jawaban "Tanya .com!" di 01:33,6)*

Detik 01:35 - 01:38:
"Server **.com**: "Tanya server Google.""
*(Visual: panah ke kartu "Server .com", jawaban "Tanya Google!" di 01:36,4)*

Detik 01:38 - 01:41:
"Server Google menjawab: **IP address**-nya."
*(Visual: kartu "Server Google · ns1.google.com", jawaban `142.250.190.78` di 01:39,2 lalu terbang kembali ke Browser)*

Detik 01:41 - 01:44:
"Jawaban **disimpan**, berikutnya lebih **cepat**."
*(Visual: label "disimpan" di samping resolver di 01:41,4, lalu "Kunjungan berikutnya lebih cepat")*

### Scene 8 — Alur lengkap

Detik 01:44 - 01:46:
"Alur **lengkapnya**:"
*(Visual: tiga jalur: BROWSER, DNS, GOOGLE)*

Detik 01:46 - 01:49:
"**Satu**, DNS memberi **IP** Google."
*(Visual: langkah 1 `google.com?`, jawaban "IP: 142.250.190.78")*

Detik 01:49 - 01:52:
"**Dua**, TCP: jabat tangan **tiga langkah**."
*(Visual: langkah 2 `SYN · SYN-ACK · ACK`, tiga panah bolak-balik)*

Detik 01:52 - 01:56:
"**Tiga**, TLS: cek **sertifikat**, bikin **kunci rahasia**."
*(Visual: langkah 3 "sertifikat + kunci rahasia", catatan "www.google.com · Google Trust Services")*

Detik 01:56 - 01:59:
"**Empat**, browser mengirim permintaan **GET**."
*(Visual: langkah 4 `GET /`, catatan "Host: www.google.com")*

Detik 01:59 - 02:01:
"**Lima**: dua ratus **OK**!"
*(Visual: langkah 5 `200 OK`, catatan `<!doctype html>…`)*

Detik 02:01 - 02:04:
"**Enam**, browser **menggambar** halamannya."
*(Visual: langkah 6 "menggambar halaman", lalu "halaman tampil!" di 02:02,6)*

### Scene 9 — Balik ke hacker

Detik 02:04 - 02:06:
"Nah... ingat **hacker** tadi?"
*(Visual: 🔊 layar kembali gelap, hacker di mejanya, server GOOGLE di kanan)*

Detik 02:06 - 02:10:
"Dia cuma tahu Budi terhubung ke **Google**."
*(Visual: kartu "Yang dia lihat: HP-Budi → 142.250.190.78", label "= server Google" di 02:08)*

Detik 02:10 - 02:13:
"Isinya sudah dikunci **TLS**."
*(Visual: judul "Isinya dikunci TLS", isi terenkripsi `17 03 03 00 5a 9c …`, paket Budi bergembok melintas ke server)*

Detik 02:13 - 02:16:
"Tanpa kunci, yang dia dapat cuma **data acak**."
*(Visual: roda gigi berputar "buka isi: …" dengan hasil acak; label "kunci: nggak punya" di 02:13,5)*

Detik 02:16 - 02:18:
"**Gagal!**"
*(Visual: 🔊 stempel "GAGAL NGINTIP!" tepat di 02:16, layar bergetar, hacker menangis, terompet "gagal")*

Detik 02:18 - 02:22:
"Kuncinya cuma di browser Budi dan Google. Pencariannya **aman**."
*(Visual: gembok emas, "Kunci cuma di browser & Google", lalu "Pencarian Budi: rahasia" di 02:20)*

### Scene 10 — Detail penting: paket data

Detik 02:22 - 02:25:
"Satu lagi: data nggak dikirim **utuh**."
*(Visual: judul "Data dipecah jadi paket", kartu "HTML Google ±30 KB")*

Detik 02:25 - 02:28:
"Dipecah jadi sekitar **dua puluh paket**."
*(Visual: paket bernomor 1–10 bermunculan, label "±20 paket" di 02:26,4)*

Detik 02:28 - 02:31:
"Lewat banyak **router**, kadang kabel **bawah laut**."
*(Visual: rute kamu → router → kabel laut → router → Google, paket-paket melaju)*

Detik 02:31 - 02:34:
"Ada yang hilang? TCP minta **kirim ulang**."
*(Visual: paket 7 "hilang!" di 02:31,2, "TCP: kirim ulang paket 7" di 02:32,2, lalu "Lengkap & urut lagi" di 02:33,4)*

### Scene 11 — Rangkuman

Detik 02:34 - 02:37:
"Alamat plus **paket data**: itulah **internet**."
*(Visual: Alamat (IP) + Paket data = Internet)*

Detik 02:37 - 02:40:
"Semuanya lewat **empat tahap** tadi."
*(Visual: DNS → TCP → TLS → HTTP)*

Detik 02:40 - 02:46:
"Tips: pakai **HTTPS**, cek **alamat**, waspada **Wi-Fi publik**, **update browser**."
*(Visual: empat kartu tips muncul satu per satu sesuai yang kamu sebut)*

### Scene 12 — Outro channel

Detik 02:46 - 02:49:
"Kalau video ini **ngebantu**, kasih **like**..."
*(Visual: foto profil + @daffahaidarnz, tiga tombol muncul, teks "Kalau videonya ngebantu"; jari men-tap tombol Like di 02:48, hati jadi merah)*

Detik 02:49 - 02:51:
"**simpan** biar nggak lupa..."
*(Visual: jari men-tap tombol Simpan di 02:49, bookmark jadi emas, teks "Biar nggak lupa")*

Detik 02:51 - 02:53:
"**follow** atau **subscribe** daffahaidarnz..."
*(Visual: jari men-tap tombol Follow di 02:51, foto profil berdenyut, teks "Follow / Subscribe, gratis kok!")*

Detik 02:53 - 02:56:
"biar nggak ketinggalan **video berikutnya**!"
*(Visual: foto profil, @daffahaidarnz, dan tiga tombol yang sudah aktif tetap tampil; tanpa kartu "Video berikutnya" karena topiknya belum ditentukan)*

---

## Memasang dubbing

**Opsi A — di editor video (CapCut, Premiere, dll.):** render video dari Remotion (`npx remotion render HowInternetWorks`), lalu taruh rekaman suara di track baru mulai 00:00. Backsound sudah dicampur pelan, jadi suaramu tetap terdengar jelas.

**Opsi B — langsung di Remotion:** simpan rekaman sebagai `public/audio/voiceover-internet.mp3`, lalu tambahkan satu baris ini di dalam fragmen komponen `HowInternetWorks` (di file `HowInternetWorks.tsx`, tepat di atas `<Backsound … />`; impor `Audio` dari `@remotion/media`):

```tsx
<Audio name="Voice-over" src={staticFile('audio/voiceover-internet.mp3')} />
```

**Kalau tempo bicaramu berbeda:** ubah durasi scene di `SCENE_SECONDS` (`HowInternetWorks.tsx`). Panjang video menyesuaikan otomatis. Animasi di dalam scene tetap memakai detik relatif terhadap awal scene. Kalau durasi scene berubah, sesuaikan juga entri `how-internet-works` di `src/content/shared/generate-audio.mjs`, lalu jalankan `node src/content/shared/generate-audio.mjs how-internet-works` supaya backsound tetap pas dengan cut. Setelah mengubah naskah, jalankan lagi `node src/content/shared/check-dubbing.mjs src/content/how-internet-works/script_dubbing.md`.

**Mau pakai lagu trending dari TikTok/IG?** Set prop `musicVolume` ke `0` di panel Props Remotion Studio, lalu render. Efek suara tetap ada, backsound hilang.

**Topik berikutnya belum ditentukan.** Outro tampil tanpa kartu "Video berikutnya". Kalau topiknya sudah ada, tambahkan `nextTopic` dan `nextQuestion` pada `<ChannelOutro />` di `HowInternetWorks.tsx` (kartunya otomatis muncul di 02:53), lalu ganti narasi 02:53 menjadi: "biar nggak ketinggalan **<topik>**!"

## Sumber

Semua diakses 24 November 2026.

- MDN Web Docs, "HTTP: Hypertext Transfer Protocol" (bahan dari pengguna) — HTTP adalah protokol lapisan aplikasi untuk mengirim dokumen seperti HTML: https://developer.mozilla.org/en-US/docs/Web/HTTP
- MDN, "Overview of HTTP" — model klien-server (request/response), berjalan di atas TCP atau TCP+TLS, format pesan `GET / HTTP/1.1` + `Host` + `Accept-Language`, dan "there are routers, modems, and more" di antara browser dan server: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview
- MDN, "Populating the page: how browsers work" — urutan DNS lookup → TCP three-way handshake (SYN, SYN-ACK, ACK) → negosiasi TLS (verifikasi server, kunci enkripsi) → HTTP GET → respons → DOM, CSSOM, layout, paint: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work
- MDN, "How does the Internet work?" — internet sebagai jaringan dari jaringan, router, ISP; "google.com is the domain name used on top of the IP address 142.250.190.78" (IP bisa berubah): https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work
- MDN, "What is a domain name?" — browser memeriksa cache DNS lokal, lalu bertanya ke server DNS; jawaban disimpan sementara lalu diperbarui: https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name
- RFC 1034, "Domain Names — Concepts and Facilities" (P. Mockapetris, November 1987), §2.1 — pemetaan nama ke alamat dikelola NIC dalam satu file HOSTS.TXT yang di-FTP oleh semua host; beban distribusinya sebanding dengan kuadrat jumlah host: https://www.rfc-editor.org/rfc/rfc1034
- RFC 882, "Domain Names — Concepts and Facilities" (P. Mockapetris, November 1983) — memperkenalkan nama domain; tabel global HOSTS.TXT di host SRI-NIC disebut "near the limit of manageability": https://www.rfc-editor.org/rfc/rfc882
- IANA, "Root Name Servers" — 13 otoritas bernama a.root-servers.net sampai m.root-servers.net, dilayani ratusan server di banyak negara: https://www.iana.org/domains/root/servers
- Chromium Blog, "An Update on the Lock Icon" (2 Mei 2023) — "nearly all phishing sites use HTTPS, and therefore also display the lock icon"; riset 2021: hanya 11% peserta paham arti tepat ikon gembok; ikon diganti ikon "tune" di Chrome 117 (September 2023): https://blog.chromium.org/2023/05/an-update-on-lock-icon.html
- TeleGeography, "Submarine Cable Frequently Asked Questions" — kabel bawah laut membawa data internasional jauh lebih murah daripada satelit; porsi satelit "a very small percentage": https://www2.telegeography.com/submarine-cable-faqs-frequently-asked-questions
- Diukur sendiri, 24 November 2026: sertifikat `www.google.com` diterbitkan Google Trust Services (WE2) (`openssl s_client`); beranda Google membalas `200` dengan `<!doctype html><html … lang="id">` untuk `Accept-Language: id`; HTML beranda terkompresi gzip 29.810 byte, ≈ 20 segmen TCP berukuran 1.460 byte (`curl`).

**Catatan:**

- Budi, "WiFi Kafe Gratis", nomor `0812-xxxx-xxxx`, dan situs `gooogle-hadiah.example` fiktif. TLD `.example` dicadangkan oleh RFC 2606, jadi pasti bukan situs nyata.
- IP 142.250.190.78 adalah contoh dari MDN. IP Google yang kamu dapat bisa berbeda, tergantung lokasi dan jaringan.
- Isi terenkripsi `17 03 03 …`: tiga byte pertama adalah header rekaman TLS 1.3 asli (application_data, versi 03 03); sisanya ilustrasi ciphertext acak.
- Pesan HTTP ditampilkan dalam format teks HTTP/1.1 agar mudah dibaca, seperti contoh MDN. Chrome sebenarnya memakai HTTP/2 atau HTTP/3 (QUIC) ke Google: isinya sama, hanya dibungkus frame biner, dan HTTP/3 menggabungkan jabat tangan sambungan dengan TLS.
- Urutan "root → .com → server Google" menggambarkan pencarian dari nol. Dalam praktiknya resolver sudah menyimpan jawaban root dan .com di cache.
- "Kadang kabel bawah laut" berlaku bila server Google yang menjawab ada di luar negeri; bila servernya di dalam negeri, rutenya bisa tanpa kabel laut.
