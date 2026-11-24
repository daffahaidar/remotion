# Agenda Konten TikTok 90 Hari — @daffahaidarnz

**Periode:** Selasa, 1 Desember 2026 – Minggu, 28 Februari 2027 · 1 video per hari · 13 tema mingguan.
**Dipakai bersama:** `src/content/PROMPT_TECH_VIDEO.md`. Setiap blok Day berisi lima kolom input di bagian 0 playbook.

## Cara pakai

1. Salin satu blok Day, lalu tempel di bawah kalimat "Baca seluruh file src/content/PROMPT_TECH_VIDEO.md, lalu buatkan video sesuai playbook tersebut."
2. `TOPIK BERIKUTNYA` ditulis `Nama pendek — pertanyaan teaser`. Nama pendek diucapkan di outro (maksimal ±9 suku kata), pertanyaannya tampil di kartu "Video berikutnya". Isinya selalu topik Day berikutnya, jadi setiap video menggiring penonton ke video besok.
3. `BAHAN / SUMBER` berisi hook, poin inti, analogi, dan sumber awal. Agent tetap wajib memverifikasi (bagian 7 playbook). Poin bertanda "(cek)" harus dikonfirmasi dulu, terutama angka dan peristiwa tahun 2026.
4. Mulai di tanggal lain? Urutan tetap jalan; cukup geser hari yang punya momen musiman (kolom "Momen" di peta di bawah).
5. Ada berita teknologi besar? Tukar dengan Day "Studi Kasus" terdekat (JENIS KONTEN: Berita Teknologi), lalu ubah `TOPIK BERIKUTNYA` di hari sebelumnya. Bisa juga ambil dari [Topik cadangan](#topik-cadangan).
6. Siapkan stok 3–5 video sebelum Day 1 supaya jadwal harian tidak bolong.

## Kenapa disusun begini

- **Pasarnya besar.** TikTok punya ±160 juta pengguna di Indonesia (Bisnis.com, Juni 2026).
- **Yang didorong FYP:** video yang ditonton sampai habis, lalu dibagikan, disimpan, dan dikomentari. Jumlah followers bukan faktor langsung (TikTok Newsroom). Karena itu: hook 3 detik + open loop (sudah diatur playbook), mayoritas durasi 1:15–1:30, ajakan komentar di Mitos/Perbandingan, dan Tips yang layak disimpan.
- **Seri mingguan.** Satu tema per minggu (cocok dijadikan playlist TikTok), dan setiap video men-teaser video besok supaya penonton maraton.
- **Tiga lapis audiens.** Topik sehari-hari yang relatable (war tiket, OTP, QR code, FYP) untuk jangkauan luas; kasus kerja nyata (race condition, bottleneck, postmortem insiden) untuk citra senior engineer; karier untuk calon mahasiswa dan anak magang.
- **Momen musiman Indonesia:** Spotify Wrapped, 12.12, Natal dan Tahun Baru, hari kerja pertama 2027, musim pilih jurusan, Imlek, awal Ramadan, Valentine.

Sumber riset strategi: [Bisnis.com — 160 juta pengguna TikTok Indonesia](https://teknologi.bisnis.com/read/20260618/101/1981684/tiktok-beber-cara-bikin-160-juta-pengguna-di-indonesia-betah-tatap-layar-hp) · [TikTok Newsroom — How TikTok recommends videos #ForYou](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you) · [Buffer — TikTok Algorithm Guide 2026](https://buffer.com/library/tiktok-algorithm/)

## Peta 13 minggu

| Minggu | Day   | Tanggal      | Tema                               | Momen                                                       |
| ------ | ----- | ------------ | ---------------------------------- | ----------------------------------------------------------- |
| 1      | 1–7   | 1–7 Des      | Bug Legendaris                     | Spotify Wrapped (Day 3)                                     |
| 2      | 8–14  | 8–14 Des     | Perang Flash Sale                  | Harbolnas 12.12 (Day 12)                                    |
| 3      | 15–21 | 15–21 Des    | Kenapa Aplikasi Lemot?             | –                                                           |
| 4      | 22–28 | 22–28 Des    | Kerja di Tim: Git, Review, Deploy  | Natal (Day 25)                                              |
| 5      | 29–35 | 29 Des–4 Jan | Waktu Itu Rumit                    | Tahun Baru (Day 31–32), hari kerja pertama 2027 (Day 35)    |
| 6      | 36–42 | 5–11 Jan     | Mau Masuk Dunia IT?                | Musim pilih jurusan                                         |
| 7      | 43–49 | 12–18 Jan    | Frontend & Browser                 | –                                                           |
| 8      | 50–56 | 19–25 Jan    | Mobile: Android & iOS              | –                                                           |
| 9      | 57–63 | 26 Jan–1 Feb | DevOps & Cloud                     | –                                                           |
| 10     | 64–70 | 2–8 Feb      | Security                           | Imlek (Day 67–68)                                           |
| 11     | 71–77 | 9–15 Feb     | Algoritma di Balik Aplikasi        | Awal Ramadan (perkiraan 8 Feb, cek sidang isbat), Valentine (Day 76) |
| 12     | 78–84 | 16–22 Feb    | AI untuk Engineer                  | –                                                           |
| 13     | 85–90 | 23–28 Feb    | Cara Berpikir Senior Engineer      | Penutup musim                                               |

**Komposisi:** 39 Cara Kerja · 12 Perbandingan · 9 Mitos vs Fakta · 6 Fakta Unik · 5 Tips & Tools · 3 Berita Teknologi · 10 Studi Kasus · 6 Karier/Dunia Kerja.
**Durasi:** 2× 1:00 · 19× 1:15 · 57× 1:30 · 5× 1:45 · 7× 2:00 (video unggulan ±1 per minggu).

---

## Minggu 1 · Day 1–7 · 1–7 Des 2026 — Bug Legendaris

### Day 1: Selasa, 1 Des 2026

```text
JENIS KONTEN     : Fakta Unik
TOPIK            : 4 Bug Legendaris yang Bikin Rugi Triliunan Rupiah
DURASI           : 1:30
TOPIK BERIKUTNYA : Integer Overflow — Kenapa angka di komputer bisa "muter balik" jadi minus?
BAHAN / SUMBER   : - Hook: "Satu konversi angka bikin roket hancur 40 detik setelah meluncur."
                   - #4 Mars Climate Orbiter (23 Sep 1999): software darat menghitung dalam pound-force·detik, navigasi mengharapkan newton·detik → wahana terlalu dekat ke Mars dan hilang.
                   - #3 Ariane 5 Flight 501 (4 Jun 1996): angka 64-bit dikonversi ke integer 16-bit dan melebihi batas → sistem referensi inersia mati → roket hancur ±40 detik setelah peluncuran.
                   - #2 Knight Capital (1 Agu 2012): deploy yang tidak lengkap → >4 juta order dalam 45 menit, rugi >US$460 juta.
                   - #1 CrowdStrike (19 Jul 2024): update konfigurasi sensor yang rusak → ±8,5 juta perangkat Windows blue screen; bandara, bank, dan rumah sakit terganggu.
                   - Penutup: semuanya berawal dari hal "kecil": satuan, tipe data, deploy, pengujian.
                   - Sumber: https://www.esa.int/Newsroom/Press_Releases/Ariane_501_-_Presentation_of_Inquiry_Board_report
                             https://en.wikipedia.org/wiki/Mars_Climate_Orbiter (lanjut ke laporan Mishap Investigation Board NASA, 1999)
                             https://www.sec.gov/news/press-release/2013-222
                             https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/
```

### Day 2: Rabu, 2 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Integer Overflow: Kenapa Angka di Komputer Bisa "Muter Balik" Jadi Minus?
DURASI           : 1:30
TOPIK BERIKUTNYA : Spotify Wrapped — Gimana Spotify tahu lagu favoritmu setahun penuh?
BAHAN / SUMBER   : - Hook: jumlah views "Gangnam Style" nyaris menembus batas penghitung YouTube (Des 2014).
                   - Poin: tiap tipe angka punya kapasitas. Integer 32-bit bertanda maksimal 2.147.483.647; ditambah 1 lagi, nilainya "muter" jadi −2.147.483.648 (two's complement).
                   - YouTube mengganti penghitungnya ke integer 64-bit sebelum benar-benar rusak. Ariane 5 (video sebelumnya) tidak seberuntung itu: angka 64-bit dipaksa masuk ke 16-bit.
                   - Kasus kerja: ID 64-bit dari backend bisa berubah nilainya di JavaScript karena batas aman Number = 2^53 − 1 → kirim ID sebagai string.
                   - Analogi: odometer motor atau argo taksi yang balik ke 0000 setelah 9999.
                   - Sumber: https://techcrunch.com/2014/12/03/gangnam-style-has-been-viewed-so-many-times-it-broke-youtubes-code/
                             https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
                             https://www.esa.int/Newsroom/Press_Releases/Ariane_501_-_Presentation_of_Inquiry_Board_report
```

### Day 3: Kamis, 3 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Spotify Wrapped: Gimana Spotify Tahu Lagu Favoritmu Setahun Penuh?
DURASI           : 1:30
TOPIK BERIKUTNYA : Jebakan Float — Kenapa 0,1 + 0,2 di komputer nggak sama dengan 0,3?
BAHAN / SUMBER   : - Timing: tayangkan saat Wrapped 2026 sedang ramai (biasanya rilis awal Desember); tukar hari bila perlu.
                   - Poin: setiap lagu yang diputar tercatat sebagai event. Wrapped tidak dihitung saat kamu membuka aplikasi, tapi diproses massal (batch) jauh hari sebelumnya: kumpulkan event setahun → kelompokkan per pengguna → hitung top lagu, artis, menit → simpan → tinggal ditampilkan.
                   - Fakta: Spotify memproses Wrapped dengan Google Cloud Dataflow dan Scio (library open-source buatan Spotify). Tulisan engineering Maret 2026 membahas pipeline Wrapped 2025 untuk ratusan juta pengguna (cek angka pastinya).
                   - Analogi: merekap struk belanja setahun: kumpulkan, kelompokkan, hitung, urutkan.
                   - Sumber: https://engineering.atspotify.com/2020/2/spotify-unwrapped-how-we-brought-you-a-decade-of-data
                             https://newsroom.spotify.com/2020-02-18/unwrapping-wrapped-2019-spotify-vp-of-engineering-tyson-singer-explains/
                             https://engineering.atspotify.com/2026/3/inside-the-archive-2025-wrapped
```

### Day 4: Jumat, 4 Des 2026

```text
JENIS KONTEN     : Mitos vs Fakta
TOPIK            : "Komputer Nggak Mungkin Salah Hitung": Kenapa 0,1 + 0,2 ≠ 0,3 dan Uang Jangan Disimpan Pakai Float
DURASI           : 1:15
TOPIK BERIKUTNYA : Lonjakan Serangan Siber — 1,6 juta serangan sehari ke Indonesia, separah apa?
BAHAN / SUMBER   : - Mitos 1 "komputer selalu tepat" → Fakta: di JavaScript dan Python, 0.1 + 0.2 = 0.30000000000000004. Angka disimpan dalam biner (IEEE 754) dan 0,1 tidak bisa ditulis pas, mirip 1/3 = 0,333… di desimal.
                   - Mitos 2 "float aman untuk saldo" → Fakta: simpan rupiah sebagai integer (satuan terkecil) atau DECIMAL/NUMERIC; di Java/Kotlin pakai BigDecimal.
                   - Mitos 3 "selisih kecil nggak berbahaya" → Fakta: rudal Patriot (25 Feb 1991), galat pembulatan waktu bergeser ±0,34 detik setelah ±100 jam menyala, rudal Scud gagal dicegat, 28 tentara tewas (laporan GAO). Bawakan dengan hormat.
                   - Ajak komen: "Pernah nemu bug pembulatan uang di kerjaan?"
                   - Sumber: https://0.30000000000000004.com/
                             https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
                             https://www.postgresql.org/docs/current/datatype-numeric.html
                             https://www.gao.gov/products/imtec-92-26
```

### Day 5: Sabtu, 5 Des 2026

```text
JENIS KONTEN     : Berita Teknologi
TOPIK            : 1,6 Juta Serangan Siber Sehari ke Indonesia (November 2026): Separah Apa Sebenarnya?
DURASI           : 1:30
TOPIK BERIKUTNYA : "Coba Restart Dulu" — Kenapa restart beneran bisa memperbaiki error?
BAHAN / SUMBER   : - WAJIB verifikasi ke sumber resmi (BSSN, Komdigi, OJK) dan media arus utama sebelum produksi. Kalau sumber kredibel tidak cukup, ganti dengan topik cadangan.
                   - Temuan riset awal (cek semua): dasbor FortiGuard Labs mencatat ±1,6 juta aktivitas serangan terdeteksi dan diblokir dalam 24 jam (9 Nov 2026), naik dari ±350 ribu (7 Nov); OJK berkoordinasi dengan tim TI perbankan sejak 6 Nov; Komdigi mengirim surat imbauan (9 Nov) ke pengguna PDN/cloud pemerintah, pengelola domain, dan PSE publik; BSSN dan pakar menyebut sebagian besar angka itu pemindaian otomatis oleh botnet yang sudah diblokir, bukan pembobolan.
                   - Sudut edukasi: "serangan terdeteksi" ≠ "kebobolan"; cara kerja pemindaian otomatis; yang perlu dilakukan developer: patch rutin, MFA, rate limit, WAF, pantau log.
                   - Sumber awal: https://marketing.co.id/serangan-siber-indonesia-november-2026/
                                  https://r17.co.id/id/blog/serangan-siber-ke-indonesia-melonjak-pada-november-2026-seberapa-siap-organisasi-menghadapinya
                                  https://brandefense.io/odin-research/country-reports/indonesia-2026/
```

### Day 6: Minggu, 6 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : "Coba Restart Dulu": Kenapa Restart Beneran Bisa Memperbaiki Error?
DURASI           : 1:15
TOPIK BERIKUTNYA : Memory Leak — Kenapa aplikasi makin lama dipakai makin lemot?
BAHAN / SUMBER   : - Hook: nasihat IT paling legendaris ternyata ada penjelasan teknisnya.
                   - Poin: restart mengosongkan RAM, mematikan proses yang macet, mereset state/cache yang korup, dan membuka ulang koneksi. Masalah yang menumpuk seiring waktu (memory leak, counter yang terus naik) hilang sementara.
                   - Fakta: FAA (2015) mewajibkan Boeing 787 dimatikan-nyalakan berkala karena counter software di unit kontrol generator bisa overflow setelah 248 hari menyala terus (nyambung ke video Integer Overflow).
                   - Twist: restart cuma meredakan gejala. Kalau bug-nya tetap ada, error akan kembali; engineer mencari akar masalahnya.
                   - Analogi: kamar kos berantakan dibereskan total, padahal yang bikin berantakan belum ketemu.
                   - Sumber: https://www.federalregister.gov/documents/2015/05/01/2015-10066/airworthiness-directives-the-boeing-company-airplanes
                             Konsep "software aging & rejuvenation": Huang, Kintala, Kolettis & Fulton (IEEE FTCS-25, 1995)
```

### Day 7: Senin, 7 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Memory Leak: Kenapa Aplikasi Makin Lama Dipakai Makin Lemot?
DURASI           : 1:30
TOPIK BERIKUTNYA : Race Condition — Kenapa stok flash sale bisa minus?
BAHAN / SUMBER   : - Hook: aplikasi kencang saat baru dibuka, dua jam kemudian berat lalu crash.
                   - Poin: program terus meminta memori tapi tidak pernah melepasnya. Contoh: event listener atau setInterval yang tidak dibersihkan (web), Activity yang masih dirujuk setelah ditutup (Android), cache/Map global tanpa batas (backend).
                   - Cara menemukan: heap snapshot di Chrome DevTools, LeakCanary (Android), Instruments › Leaks (iOS). Grafik memori yang terus naik dan tak pernah turun = tanda bahaya.
                   - Analogi: keran bocor setetes demi setetes; lama-lama ember penuh.
                   - Sumber: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management
                             https://developer.chrome.com/docs/devtools/memory-problems
                             https://square.github.io/leakcanary/
```

---

## Minggu 2 · Day 8–14 · 8–14 Des 2026 — Perang Flash Sale

### Day 8: Selasa, 8 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Race Condition: Kenapa Stok Flash Sale Bisa Minus?
DURASI           : 2:00
TOPIK BERIKUTNYA : Locking Database — Optimistic atau pessimistic, mana yang cocok buat flash sale?
BAHAN / SUMBER   : - Hook: stok tinggal 1, dua pembeli klik "Beli" di milidetik yang sama → dua-duanya berhasil, stok jadi −1.
                   - Mekanisme: "cek stok → kurangi → simpan" adalah tiga langkah terpisah (tidak atomik). Dua request bisa sama-sama membaca stok = 1 sebelum salah satunya menyimpan.
                   - Solusi: update atomik `UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0` lalu cek jumlah baris yang berubah; transaksi + `SELECT … FOR UPDATE`; DECR atomik di Redis; constraint `CHECK (stock >= 0)` sebagai jaring pengaman terakhir.
                   - Analogi: dua kasir bioskop menjual kursi terakhir yang sama.
                   - Teaser: race condition juga pernah bikin AWS down hampir 15 jam (video Day 13).
                   - Sumber: https://www.postgresql.org/docs/current/explicit-locking.html
                             https://www.postgresql.org/docs/current/transaction-iso.html
                             https://redis.io/docs/latest/commands/decr/
```

### Day 9: Rabu, 9 Des 2026

```text
JENIS KONTEN     : Perbandingan
TOPIK            : Optimistic vs Pessimistic Locking: Mana yang Cocok Buat Flash Sale?
DURASI           : 1:30
TOPIK BERIKUTNYA : Thundering Herd — Kenapa website war tiket langsung down tepat jam 10.00?
BAHAN / SUMBER   : - Pessimistic: kunci data dulu (`SELECT … FOR UPDATE`), yang lain menunggu → aman, tapi lambat saat rebutan tinggi dan rawan deadlock.
                   - Optimistic: tanpa kunci; tiap baris punya kolom `version`, update hanya berhasil kalau versinya belum berubah; kalau bentrok → ulangi → cocok saat bentrok jarang (edit profil, artikel).
                   - Ronde: kecepatan saat sepi, kecepatan saat rebutan tinggi, kerumitan kode, risiko deadlock.
                   - Vonis: stok flash sale (rebutan ekstrem) → update atomik atau antrean; data yang jarang bentrok → optimistic; transaksi pendek yang wajib konsisten → pessimistic.
                   - Analogi: kunci kamar mandi (pessimistic) vs Git: semua bebas mengedit, bentrok baru dicek saat merge (optimistic).
                   - Ajak komen: "Tim kamu pakai yang mana?"
                   - Sumber: https://martinfowler.com/eaaCatalog/optimisticOfflineLock.html
                             https://martinfowler.com/eaaCatalog/pessimisticOfflineLock.html
                             https://www.postgresql.org/docs/current/explicit-locking.html
```

### Day 10: Kamis, 10 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Thundering Herd: Kenapa Website War Tiket Langsung Down Tepat Jam 10.00?
DURASI           : 1:30
TOPIK BERIKUTNYA : Rate Limiting — Kenapa muncul "terlalu banyak permintaan, coba lagi nanti"?
BAHAN / SUMBER   : - Hook: jutaan orang menekan tombol yang sama di detik yang sama.
                   - Poin: lonjakan serentak (thundering herd); cache kedaluwarsa bersamaan → semua request langsung menghantam database (cache stampede); refresh dan retry massal memperparah (retry storm).
                   - Solusi: antrean virtual (waiting room); retry dengan backoff + jitter (jeda acak); request coalescing/lease supaya hanya satu request yang mengisi ulang cache; halaman statis lewat CDN.
                   - Analogi: pintu mal dibuka saat midnight sale.
                   - Sumber: https://developers.cloudflare.com/waiting-room/
                             https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/
                             https://www.usenix.org/conference/nsdi13/technical-sessions/presentation/nishtala (Scaling Memcache at Facebook, bagian "leases")
```

### Day 11: Jumat, 11 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Rate Limiting: Kenapa Muncul "Terlalu Banyak Permintaan, Coba Lagi Nanti"?
DURASI           : 1:15
TOPIK BERIKUTNYA : Idempotency — Klik "Bayar" dua kali, kok saldo cuma kepotong sekali?
BAHAN / SUMBER   : - Poin: server membatasi jumlah request per pengguna/IP/token dalam rentang waktu tertentu untuk melindungi diri dari bot dan lonjakan; ditandai status HTTP 429 Too Many Requests (bisa disertai header Retry-After).
                   - Algoritma populer: token bucket. Tiap pengguna punya "token" yang terisi ulang berkala; token habis = ditolak sementara.
                   - Konteks: bot war tiket dan flash sale yang menembak ratusan request per detik.
                   - Analogi: wahana taman bermain yang memasukkan pengunjung per gelombang sesuai kapasitas.
                   - Sumber: https://www.rfc-editor.org/rfc/rfc6585#section-4
                             https://stripe.com/blog/rate-limiters
                             https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429
```

### Day 12: Sabtu, 12 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Idempotency: Klik "Bayar" Dua Kali, Kok Saldo Cuma Kepotong Sekali?
DURASI           : 1:30
TOPIK BERIKUTNYA : Insiden AWS — Gimana satu race condition bikin aplikasi di seluruh dunia tumbang?
BAHAN / SUMBER   : - Timing: tayang tepat 12.12.
                   - Hook: sinyal putus saat bayar, kamu klik ulang. Apakah tertagih dua kali?
                   - Poin: jaringan tidak bisa diandalkan, jadi request ulang (retry) itu wajar. Operasi idempoten = diulang berkali-kali hasilnya tetap sama. Aplikasi mengirim Idempotency-Key unik per transaksi; server menyimpan hasil pertama dan mengembalikan hasil yang sama untuk request ulang dengan key tersebut.
                   - Twist: GET aman diulang, POST pembayaran tidak, kecuali sengaja dibuat idempoten.
                   - Analogi: nomor kuitansi; kuitansi bernomor sama = transaksi yang sama, tidak dibayar dua kali.
                   - Sumber: https://docs.stripe.com/api/idempotent_requests
                             https://stripe.com/blog/idempotency
                             https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/
```

### Day 13: Minggu, 13 Des 2026

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : AWS Down Hampir 15 Jam (Okt 2025): Gimana Satu Race Condition Bikin Aplikasi di Seluruh Dunia Tumbang?
DURASI           : 1:45
TOPIK BERIKUTNYA : Message Queue — Kenapa status pesanan "diproses" lama banget pas flash sale?
BAHAN / SUMBER   : - Kronologi: 19–20 Okt 2025, region us-east-1 (N. Virginia); dampak dari 11:48 PM PDT 19 Okt sampai 2:20 PM PDT 20 Okt.
                   - Akar masalah (ringkasan resmi AWS): race condition laten di otomasi DNS DynamoDB. Satu DNS Enactor sangat terlambat menerapkan rencana lama, sementara Enactor lain sudah menerapkan rencana baru dan menjalankan pembersihan → record DNS endpoint regional DynamoDB jadi kosong (cek urutan persisnya di ringkasan AWS).
                   - Efek domino: layanan yang bergantung pada DynamoDB, termasuk EC2 dan Network Load Balancer, ikut terganggu.
                   - Perbaikan: otomasi DNS Planner/Enactor dimatikan secara global sampai pengamannya siap.
                   - Pelajaran: race condition bukan cuma urusan kode aplikasi; otomasi infrastruktur juga butuh lock dan validasi.
                   - Sumber: https://aws.amazon.com/message/101925/
                             https://www.theregister.com/2025/10/23/amazon_outage_postmortem/
                             https://www.thousandeyes.com/blog/aws-outage-analysis-october-20-2025
```

### Day 14: Senin, 14 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Message Queue: Kenapa Status Pesanan "Sedang Diproses" Lama Banget Pas Flash Sale?
DURASI           : 1:30
TOPIK BERIKUTNYA : Bottleneck — Kenapa nambah server nggak bikin aplikasi lebih cepat?
BAHAN / SUMBER   : - Poin: pesanan tidak langsung dikerjakan, tapi dicatat ke antrean (producer → queue → worker/consumer). Antrean menyerap lonjakan supaya database dan layanan pembayaran tidak tumbang; worker memproses sesuai kapasitas → status "diproses".
                   - Detail kerja: kebanyakan antrean menjamin pengiriman "at-least-once" (pesan bisa terkirim dua kali) → consumer harus idempoten (video Idempotency). Pesan yang gagal terus dipindah ke dead-letter queue untuk diperiksa.
                   - Analogi: warung bakso saat ramai; pesanan dicatat di kertas, dimasak satu per satu.
                   - Sumber: https://aws.amazon.com/message-queue/
                             https://www.rabbitmq.com/tutorials
                             https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html
```

---

## Minggu 3 · Day 15–21 · 15–21 Des 2026 — Kenapa Aplikasi Lemot?

### Day 15: Selasa, 15 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Bottleneck: Kenapa Nambah Server Nggak Bikin Aplikasi Lebih Cepat?
DURASI           : 2:00
TOPIK BERIKUTNYA : Index Database — Kok query 10 detik bisa jadi 10 milidetik?
BAHAN / SUMBER   : - Hook: tim menggandakan jumlah server, aplikasi tetap lemot.
                   - Poin: sistem hanya secepat bagian paling lambatnya (leher botol). Ukur dulu sebelum mengoptimasi: 4 golden signals (latency, traffic, errors, saturation) dan metode USE (Utilization, Saturation, Errors) per resource.
                   - Biang umum: query database, N+1, API pihak ketiga, lock yang diperebutkan, CPU/garbage collection.
                   - Twist: kalau leher botolnya di database, menambah server aplikasi justru menambah antrean ke database.
                   - Analogi: tol 4 lajur yang menyempit di gerbang tol.
                   - Sumber: https://sre.google/sre-book/monitoring-distributed-systems/
                             https://www.brendangregg.com/usemethod.html
```

### Day 16: Rabu, 16 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Index Database: Kok Query 10 Detik Bisa Jadi 10 Milidetik?
DURASI           : 1:30
TOPIK BERIKUTNYA : N+1 Query — Bug diam-diam yang bikin halaman lemot?
BAHAN / SUMBER   : - Poin: tanpa index, database membaca seluruh tabel baris demi baris (sequential/full scan). Dengan index (umumnya B-tree), database langsung melompat ke data yang dicari.
                   - Trade-off: index mempercepat baca tapi memperlambat tulis (INSERT/UPDATE) dan memakan storage; index di kolom yang salah tidak akan dipakai.
                   - Cara cek: `EXPLAIN` → bandingkan Seq Scan vs Index Scan.
                   - Catatan: "10 detik → 10 milidetik" tampilkan sebagai ilustrasi, bukan janji.
                   - Analogi: indeks di halaman belakang buku pelajaran.
                   - Sumber: https://www.postgresql.org/docs/current/indexes.html
                             https://use-the-index-luke.com/
                             https://www.postgresql.org/docs/current/using-explain.html
```

### Day 17: Kamis, 17 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : N+1 Query: Bug Diam-diam yang Bikin Halaman Lemot
DURASI           : 1:30
TOPIK BERIKUTNYA : Query Lambat — Gimana cara nemuin query biang lemot dalam 5 menit?
BAHAN / SUMBER   : - Hook: halaman berisi 50 produk ternyata menjalankan 51 query.
                   - Poin: 1 query mengambil daftar + N query mengambil relasinya satu per satu (lazy loading di ORM). Terasa cepat di laptop karena datanya sedikit, lemot di production.
                   - Fix: eager loading; Laravel `with()`, Django `select_related`/`prefetch_related`, Rails `includes`, atau JOIN. Di Laravel, `Model::preventLazyLoading()` membuat lazy loading langsung error saat development.
                   - Analogi: belanja 50 barang dengan bolak-balik ke minimarket 50 kali vs sekali jalan membawa daftar belanja.
                   - Sumber: https://laravel.com/docs/eloquent-relationships#eager-loading
                             https://docs.djangoproject.com/en/stable/ref/models/querysets/#select-related
```

### Day 18: Jumat, 18 Des 2026

```text
JENIS KONTEN     : Tips & Tools
TOPIK            : 4 Cara Nemuin Query Biang Lemot dalam 5 Menit
DURASI           : 1:15
TOPIK BERIKUTNYA : Cache Basi — Harga sudah berubah, kok aplikasi masih tampil harga lama?
BAHAN / SUMBER   : - Tips 1: nyalakan slow query log (MySQL `slow_query_log` + `long_query_time`; PostgreSQL `log_min_duration_statement`).
                   - Tips 2: `pg_stat_statements` → urutkan berdasarkan total waktu. Query 20 ms yang dipanggil sejuta kali bisa lebih "mahal" daripada query 5 detik yang jarang jalan.
                   - Tips 3: `EXPLAIN ANALYZE` → cari Seq Scan di tabel besar dan estimasi jumlah baris yang meleset jauh.
                   - Tips 4: tracing/APM (misalnya OpenTelemetry) → lihat query apa saja yang jalan dalam satu request; N+1 langsung ketahuan.
                   - Bonus: uji dengan volume data yang realistis (anonimkan data pribadi), bukan 10 baris data dummy.
                   - Sumber: https://www.postgresql.org/docs/current/pgstatstatements.html
                             https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html
                             https://www.postgresql.org/docs/current/using-explain.html
                             https://opentelemetry.io/docs/what-is-opentelemetry/
```

### Day 19: Sabtu, 19 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Cache: Harga Sudah Berubah, Kok Aplikasi Masih Tampil Harga Lama?
DURASI           : 1:30
TOPIK BERIKUTNYA : SQL vs NoSQL — Mana yang lebih cepat?
BAHAN / SUMBER   : - Hook: kutipan Phil Karlton, "Cuma ada dua hal sulit di ilmu komputer: cache invalidation dan memberi nama."
                   - Poin: cache = salinan data di tempat yang lebih cepat (memori, CDN, browser). Masalahnya: kapan salinan dibuang atau diperbarui. Teknik: TTL, cache-aside, hapus cache saat data berubah.
                   - Twist: cache bertingkat (browser → CDN → server → database) bisa basi di salah satu tingkat saja.
                   - Analogi: papan menu warung yang belum diganti padahal harga sudah naik.
                   - Sumber: https://martinfowler.com/bliki/TwoHardThings.html
                             https://aws.amazon.com/builders-library/caching-challenges-and-strategies/
                             https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching
```

### Day 20: Minggu, 20 Des 2026

```text
JENIS KONTEN     : Perbandingan
TOPIK            : SQL vs NoSQL: Mana yang Lebih Cepat? (Jawaban Senior: Tergantung)
DURASI           : 1:30
TOPIK BERIKUTNYA : Outage Microsoft — Kenapa Microsoft 365 bisa down hampir seharian?
BAHAN / SUMBER   : - Kartu: SQL/relasional (tabel, skema tegas, JOIN, transaksi ACID; PostgreSQL, MySQL) vs NoSQL (dokumen, key-value, wide-column, graph; MongoDB, Redis, Cassandra).
                   - Ronde: konsistensi transaksi, fleksibilitas skema, skala horizontal, query kompleks/JOIN, kecepatan untuk pola akses tertentu.
                   - Mitos yang dipatahkan: "NoSQL pasti lebih cepat". Cepat atau lambat tergantung pola akses dan desain data; PostgreSQL pun bisa menyimpan dokumen (JSONB).
                   - Vonis: uang/transaksi → relasional; cache/sesi → key-value; banyak perusahaan memakai keduanya (polyglot persistence).
                   - Ajak komen: "Di kantormu pakai database apa?"
                   - Sumber: https://martinfowler.com/bliki/PolyglotPersistence.html
                             https://www.postgresql.org/docs/current/datatype-json.html
                             https://redis.io/docs/latest/
```

### Day 21: Senin, 21 Des 2026

```text
JENIS KONTEN     : Berita Teknologi
TOPIK            : Microsoft 365 Down Hampir 24 Jam (12–13 Nov 2026): Bug Lama Ketemu Kapasitas yang Menipis
DURASI           : 1:30
TOPIK BERIKUTNYA : Merge Conflict — Kenapa Git bingung saat dua orang edit baris yang sama?
BAHAN / SUMBER   : - WAJIB cek Post-Incident Report final Microsoft (dijanjikan sekitar 20 Nov 2026); poin di bawah dari laporan awal yang dikutip media.
                   - Ringkasan awal (cek): gangguan ±16:20 UTC 12 Nov sampai 16:10 UTC 13 Nov 2026. Tiga faktor: cacat laten dari pembaruan Windows beberapa bulan sebelumnya di server networking gateway, pergeseran trafik yang menaikkan beban, dan maintenance yang mengurangi ±14% kapasitas. Puncaknya >80% server gateway tidak merespons; saat mulai pulih, trafik yang kembali membanjir membuat server tumbang lagi. Microsoft menyatakan bukan serangan siber.
                   - Pelajaran: insiden besar jarang punya satu penyebab (model "keju Swiss"); sisakan cadangan kapasitas; pulihkan trafik bertahap.
                   - Sumber: https://en.wikipedia.org/wiki/2026_Microsoft_outage
                             https://www.slashgear.com/2320849/microsoft-november-2026-outage-cause-explained/
                             https://windowsforum.com/news/microsoft-365-november-2026-outage-gateway-defect-teams-failover-and-recovery.453521/
```

---

## Minggu 4 · Day 22–28 · 22–28 Des 2026 — Kerja di Tim: Git, Review, Deploy

### Day 22: Selasa, 22 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Merge Conflict: Kenapa Git Bingung Saat Dua Orang Edit Baris yang Sama?
DURASI           : 1:30
TOPIK BERIKUTNYA : Merge vs Rebase — Kenapa senior melarang rebase di branch bersama?
BAHAN / SUMBER   : - Hook: 5 menit sebelum demo, muncul `CONFLICT (content): Merge conflict in ...`.
                   - Poin: Git menggabungkan dengan 3-way merge, yaitu membandingkan versi dasar (common ancestor), versimu, dan versi temanmu. Kalau dua sisi mengubah baris yang sama dengan cara berbeda, Git tidak menebak; ia menandai dengan `<<<<<<<`, `=======`, `>>>>>>>`.
                   - Cara menyelesaikan: pilih atau gabungkan manual, hapus penanda, jalankan test, commit.
                   - Pencegahan: PR kecil, sering menarik perubahan dari main, komunikasikan siapa mengerjakan file apa.
                   - Analogi: dua penulis mengedit paragraf yang sama di naskah cetak, lalu editor harus memilih.
                   - Sumber: https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
                             https://git-scm.com/docs/git-merge#_how_conflicts_are_presented
```

### Day 23: Rabu, 23 Des 2026

```text
JENIS KONTEN     : Perbandingan
TOPIK            : Git Merge vs Rebase: Kenapa Senior Melarang Rebase di Branch Bersama?
DURASI           : 1:30
TOPIK BERIKUTNYA : Git Penyelamat — Commit hilang atau salah push, gimana cara balikinnya?
BAHAN / SUMBER   : - Merge: menyatukan histori apa adanya + merge commit; aman untuk branch bersama, tapi histori bisa ramai.
                   - Rebase: memindahkan commit-mu ke ujung branch lain sehingga histori lurus; tapi commit "ditulis ulang" (hash berubah).
                   - Aturan emas (Pro Git): jangan rebase commit yang sudah ada di luar repositori lokalmu dan mungkin sudah dipakai orang lain.
                   - Ronde: kerapian histori, keamanan kerja tim, kemudahan revert, kemudahan dipahami pemula.
                   - Vonis: rebase branch pribadimu sebelum PR; merge (atau squash merge) ke branch bersama.
                   - Ajak komen: "Tim kamu merge, rebase, atau squash?"
                   - Sumber: https://git-scm.com/book/en/v2/Git-Branching-Rebasing
                             https://git-scm.com/docs/git-rebase
```

### Day 24: Kamis, 24 Des 2026

```text
JENIS KONTEN     : Tips & Tools
TOPIK            : 4 Perintah Git Penyelamat Saat Kamu Panik
DURASI           : 1:15
TOPIK BERIKUTNYA : Fakta Unik Programmer — Kenapa programmer menghitung mulai dari nol?
BAHAN / SUMBER   : - `git reflog`: catatan semua posisi HEAD → commit yang "hilang" setelah reset atau rebase bisa dikembalikan.
                   - `git revert <commit>`: membatalkan commit yang sudah di-push dengan commit baru (aman untuk branch bersama), beda dengan `git reset` yang menulis ulang histori.
                   - `git stash`: simpan sementara perubahan yang belum siap di-commit saat harus pindah branch mendadak.
                   - `git bisect`: cari commit penyebab bug dengan pencarian biner.
                   - Bonus: terlanjur commit file `.env` atau API key? Menghapus commit tidak cukup; anggap sudah bocor dan segera rotate key-nya. Cegah dengan `.gitignore` dan secret scanning.
                   - Sumber: https://git-scm.com/docs/git-reflog
                             https://git-scm.com/docs/git-revert
                             https://git-scm.com/docs/git-bisect
                             https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning
```

### Day 25: Jumat, 25 Des 2026

```text
JENIS KONTEN     : Fakta Unik
TOPIK            : 5 Fakta Unik Dunia Programming yang Jarang Diketahui
DURASI           : 1:15
TOPIK BERIKUTNYA : Code Review — Kenapa PR-mu dikomentari 30 kali?
BAHAN / SUMBER   : - Kenapa programmer menghitung dari 0: Edsger Dijkstra menuliskan alasannya di catatan EWD831 (1982).
                   - "Bug" yang benar-benar serangga: ngengat ditemukan di komputer Harvard Mark II (9 Sep 1947) dan ditempel di buku log dengan tulisan "First actual case of bug being found". Istilah "bug" sendiri sudah dipakai sebelumnya.
                   - Git dibuat Linus Torvalds dalam hitungan hari; commit pertama Git tercatat 7 April 2005.
                   - Python dinamai dari grup komedi Monty Python, bukan dari ular.
                   - Kubernetes berasal dari bahasa Yunani "juru mudi"; K8s = K + 8 huruf + s.
                   - Sumber: https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD831.html
                             https://americanhistory.si.edu/collections/object/nmah_334663
                             https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290
                             https://docs.python.org/3/faq/general.html#why-is-it-called-python
                             https://kubernetes.io/docs/concepts/overview/
```

### Day 26: Sabtu, 26 Des 2026

```text
JENIS KONTEN     : Lainnya: Dunia Kerja
TOPIK            : Code Review: Kenapa PR-mu Dikomentari 30 Kali (dan Itu Bukan Personal)
DURASI           : 1:30
TOPIK BERIKUTNYA : Deploy Hari Jumat — Mitos atau aturan wajib?
BAHAN / SUMBER   : - Tujuan code review: menjaga kesehatan codebase, berbagi pengetahuan, menangkap bug dan celah keamanan; yang dinilai kodenya, bukan orangnya.
                   - Standar Google: setujui PR kalau secara keseluruhan membuat kode lebih baik, walau belum sempurna; komentar kecil diberi label "Nit".
                   - Tips untuk junior: PR kecil dan fokus, deskripsi jelas (apa, kenapa, cara tes), review diri sendiri dulu, tanya balik dengan sopan kalau tidak setuju.
                   - Tips untuk reviewer: komentari kode, bukan orangnya; jelaskan alasan; bedakan wajib vs saran.
                   - Sumber: https://google.github.io/eng-practices/review/reviewer/standard.html
                             https://google.github.io/eng-practices/review/developer/small-cls.html
```

### Day 27: Minggu, 27 Des 2026

```text
JENIS KONTEN     : Mitos vs Fakta
TOPIK            : "Jangan Deploy Hari Jumat": Mitos atau Aturan Wajib?
DURASI           : 1:15
TOPIK BERIKUTNYA : Knight Capital — Kok bisa rugi US$460 juta dalam 45 menit?
BAHAN / SUMBER   : - Kenapa orang percaya: kalau rusak, yang memperbaiki harus lembur di akhir pekan. Banyak perusahaan juga menerapkan "code freeze" menjelang libur akhir tahun atau event besar.
                   - Fakta: risiko datang dari perubahan besar yang jarang dirilis dan sulit di-rollback, bukan dari harinya. Riset DORA menunjukkan tim berkinerja tinggi merilis perubahan kecil dengan sering dan cepat pulih saat gagal.
                   - Pelajaran: deploy kecil, otomatis, bisa di-rollback, ada monitoring dan feature flag → hari apa pun aman. Kalau semua itu belum ada, menahan deploy di hari Jumat masuk akal.
                   - Ajak komen: "Kantormu boleh deploy hari Jumat?"
                   - Sumber: https://dora.dev/
                             https://charity.wtf/2019/05/01/friday-deploy-freezes-are-exactly-like-murdering-puppies/
                             https://martinfowler.com/articles/feature-toggles.html
```

### Day 28: Senin, 28 Des 2026

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : Knight Capital: Rugi US$460 Juta dalam 45 Menit Gara-gara Deploy yang Ketinggalan Satu Server
DURASI           : 1:45
TOPIK BERIKUTNYA : Bug Timezone — Kenapa jadwal bisa geser satu jam di Makassar?
BAHAN / SUMBER   : - Kronologi (1 Agu 2012): kode baru di-deploy manual ke 8 server dan satu server terlewat. Flag lama yang dipakai ulang justru mengaktifkan fitur usang "Power Peg" di server itu. Dalam 45 menit sistem mengirim >4 juta order; rugi >US$460 juta. SEC menjatuhkan denda US$12 juta (Okt 2013).
                   - Detail 8 server dan Power Peg ada di dokumen putusan SEC; angka kerugian dan 45 menit ada di rilis pers SEC.
                   - Pelajaran: hapus kode mati, jangan pakai ulang flag lama, otomasi deploy dan verifikasi setiap server, siapkan kill switch dan alert yang jelas.
                   - Sumber: https://www.sec.gov/news/press-release/2013-222
                             https://www.sec.gov/litigation/admin/2013/34-70694.pdf
                             https://en.wikipedia.org/wiki/Knight_Capital_Group
```

---

## Minggu 5 · Day 29–35 · 29 Des 2026–4 Jan 2027 — Waktu Itu Rumit

### Day 29: Selasa, 29 Des 2026

```text
JENIS KONTEN     : Tips & Tools
TOPIK            : Bug Timezone: 4 Aturan Biar Jadwal Nggak Geser Satu Jam di Makassar
DURASI           : 1:30
TOPIK BERIKUTNYA : Fakta Waktu — Kenapa waktu komputer dimulai 1 Januari 1970?
BAHAN / SUMBER   : - Hook: notifikasi "promo mulai jam 10.00", pengguna di Makassar dan Jayapura bingung jam berapa.
                   - Fakta: Indonesia punya 3 zona waktu, yaitu WIB (UTC+7), WITA (UTC+8), dan WIT (UTC+9), berdasarkan Keppres No. 41 Tahun 1987.
                   - Aturan 1: simpan waktu dalam UTC (atau timestamp beserta offset); konversi ke waktu lokal hanya saat ditampilkan.
                   - Aturan 2: pakai nama zona IANA (Asia/Jakarta, Asia/Makassar, Asia/Jayapura), jangan hardcode "+7".
                   - Aturan 3: kirim waktu dalam format ISO 8601/RFC 3339, misalnya `2026-12-29T10:00:00+07:00`.
                   - Aturan 4: cek zona waktu server dan cron (sering UTC), dan ingat ada negara yang memakai daylight saving time.
                   - Sumber: https://www.iana.org/time-zones
                             https://www.rfc-editor.org/rfc/rfc3339
                             https://infiniteundo.com/post/25326999628/falsehoods-programmers-believe-about-time
                             Keppres No. 41 Tahun 1987 tentang Pembagian Wilayah Republik Indonesia Menjadi 3 Wilayah Waktu
```

### Day 30: Rabu, 30 Des 2026

```text
JENIS KONTEN     : Fakta Unik
TOPIK            : 4 Fakta Aneh Soal Waktu di Komputer (Pernah Ada Menit yang Isinya 61 Detik!)
DURASI           : 1:15
TOPIK BERIKUTNYA : Y2K Berikutnya — Kenapa komputer bisa error di tahun 2038?
BAHAN / SUMBER   : - Sistem Unix menghitung waktu sebagai jumlah detik sejak 1 Januari 1970 00:00:00 UTC (Unix epoch).
                   - Detik kabisat: menit terakhir 31 Des 2016 berisi 61 detik (23:59:60 UTC). Konferensi metrologi dunia (CGPM, 2022) memutuskan detik kabisat dihentikan paling lambat 2035.
                   - Samoa melompati tanggal 30 Desember 2011 karena pindah sisi Garis Tanggal Internasional.
                   - Jam HP-mu disetel otomatis lewat jaringan/NTP yang bersumber dari jam atom.
                   - Sumber: https://en.wikipedia.org/wiki/Unix_time
                             https://en.wikipedia.org/wiki/Leap_second
                             https://en.wikipedia.org/wiki/Time_in_Samoa
                             https://www.rfc-editor.org/rfc/rfc5905
```

### Day 31: Kamis, 31 Des 2026

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Y2K Berikutnya: Kenapa Komputer Bisa Error di Tahun 2038?
DURASI           : 1:30
TOPIK BERIKUTNYA : Detik Kabisat — Gimana satu detik di malam tahun baru bikin Cloudflare error?
BAHAN / SUMBER   : - Timing: tayang malam tahun baru (tema hitung mundur).
                   - Poin: sistem lama menyimpan waktu Unix di integer 32-bit bertanda. Batasnya 19 Januari 2038 pukul 03:14:07 UTC (10:14:07 WIB); satu detik kemudian angkanya "muter" jadi negatif dan terbaca sebagai 13 Desember 1901 (lanjutan video Integer Overflow).
                   - Kasus kerja: kolom TIMESTAMP di MySQL hanya sampai 2038-01-19 03:14:07 UTC → pertimbangkan DATETIME atau tipe 64-bit; perangkat embedded/IoT lama paling berisiko.
                   - Solusi: waktu 64-bit; Linux 5.6 (2020) menambah dukungan waktu 64-bit untuk sistem 32-bit.
                   - Sumber: https://en.wikipedia.org/wiki/Year_2038_problem
                             https://dev.mysql.com/doc/refman/8.4/en/datetime.html
                             https://kernelnewbies.org/Linux_5.6
```

### Day 32: Jumat, 1 Jan 2027

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : Satu Detik di Malam Tahun Baru yang Bikin Cloudflare Error (2017)
DURASI           : 1:30
TOPIK BERIKUTNYA : Jam HP Selalu Tepat — Kok jam HP-mu nggak pernah perlu disetel?
BAHAN / SUMBER   : - Kronologi: detik kabisat 31 Des 2016 23:59:60 UTC (1 Jan 2017 pukul 06:59:60 WIB). Software DNS Cloudflare (RRDNS, ditulis dengan Go) menghitung selisih dua waktu dan mendapat angka negatif.
                   - Akar masalah: asumsi "waktu tidak pernah mundur". Angka negatif masuk ke fungsi pemilihan server → program panic.
                   - Dampak: terbatas; puncaknya ±0,2% query DNS dan ±1% request HTTP ke Cloudflare (pelanggan yang memakai record CNAME); mesin yang paling terdampak ditambal dalam ±90 menit.
                   - Pelajaran: ukur durasi dengan jam monotonic, bukan jam dinding. Go 1.9 (2017) menambahkan jam monotonic secara otomatis.
                   - Sumber: https://blog.cloudflare.com/how-and-why-the-leap-second-affected-cloudflare-dns/
                             https://www.theregister.com/2017/01/04/cloudflare_trips_over_leap_second/
                             https://go.dev/doc/go1.9#monotonic-time
```

### Day 33: Sabtu, 2 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Kok Jam di HP-mu Selalu Tepat Tanpa Pernah Disetel?
DURASI           : 1:15
TOPIK BERIKUTNYA : Roadmap Programmer — Mau jadi software engineer di 2027, mulai dari mana?
BAHAN / SUMBER   : - Poin: HP mengambil waktu dari jaringan operator (NITZ) dan/atau server waktu internet lewat NTP (Network Time Protocol). Server NTP tersusun berlapis (stratum): stratum 0 = jam atom/GPS, stratum 1 = server yang terhubung langsung ke stratum 0, dan seterusnya.
                   - Cara NTP mengoreksi jeda jaringan: mencatat waktu kirim dan terima di kedua sisi, lalu memperkirakan selisih jam dan waktu tempuh.
                   - Kenapa penting buat engineer: jam server yang meleset bikin urutan log kacau, token/sertifikat dianggap kedaluwarsa, dan kode OTP gagal (video Kode OTP).
                   - Analogi: mencocokkan jam tangan dengan pengumuman waktu di radio sambil memperhitungkan jeda siarannya.
                   - Sumber: https://www.rfc-editor.org/rfc/rfc5905
                             https://www.ntppool.org/en/
                             https://en.wikipedia.org/wiki/NITZ
```

### Day 34: Minggu, 3 Jan 2027

```text
JENIS KONTEN     : Lainnya: Karier
TOPIK            : Resolusi 2027: Roadmap Jadi Software Engineer dari Nol
DURASI           : 1:30
TOPIK BERIKUTNYA : Slack Tumbang — Kenapa Slack down di hari pertama kerja setelah tahun baru?
BAHAN / SUMBER   : - Fondasi dulu: logika dan 1 bahasa sampai lancar, Git, cara kerja web/HTTP, SQL dasar, membaca dokumentasi dan pesan error.
                   - Pilih jalur setelah fondasi kuat: frontend, backend, mobile, DevOps/cloud, atau data (peta lengkap di roadmap.sh).
                   - Belajar dengan membangun: 1 proyek kecil per bulan, deploy, minta feedback.
                   - AI sebagai tutor, bukan autopilot: minta penjelasan, jangan sekadar copy-paste.
                   - Konsistensi mengalahkan durasi: 1 jam per hari lebih efektif daripada maraton sebulan sekali.
                   - Sumber: https://roadmap.sh/
                             https://survey.stackoverflow.co/2025/
```

### Day 35: Senin, 4 Jan 2027

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : Hari Pertama Kerja Setelah Libur, Slack Tumbang: Kisah 4 Januari 2021
DURASI           : 1:30
TOPIK BERIKUTNYA : Pilih Jurusan IT — TI, SI, atau Ilmu Komputer, bedanya apa?
BAHAN / SUMBER   : - Timing: tayang di hari kerja pertama 2027.
                   - Kronologi: 4 Jan 2021, hari kerja pertama setelah libur akhir tahun; jutaan pengguna kembali login hampir bersamaan. Menurut RCA Slack, insiden berlangsung ±07:00–10:40 PST.
                   - Akar masalah (laporan Slack): AWS Transit Gateway yang menghubungkan jaringan Slack kelebihan beban dan tidak menambah kapasitas cukup cepat untuk lonjakan trafik; gangguan jaringan itu ikut mengacaukan autoscaling server Slack.
                   - Pelajaran: lonjakan "hari pertama" bisa diprediksi → siapkan kapasitas lebih awal (pre-scaling), uji beban skenario cache dingin, waspadai ketergantungan pada komponen yang dikelola pihak lain.
                   - Sumber: https://slack.engineering/slacks-outage-on-january-4th-2021/
                             https://www.theregister.com/2021/02/02/slack_outage_aws_autoscaling/
```

---

## Minggu 6 · Day 36–42 · 5–11 Jan 2027 — Mau Masuk Dunia IT?

### Day 36: Selasa, 5 Jan 2027

```text
JENIS KONTEN     : Perbandingan
TOPIK            : Teknik Informatika vs Sistem Informasi vs Ilmu Komputer: Bedanya Apa, Cocok Buat Siapa?
DURASI           : 1:30
TOPIK BERIKUTNYA : Programmer & Matematika — Harus jago matematika buat jadi programmer?
BAHAN / SUMBER   : - Timing: musim calon mahasiswa memilih jurusan (SNBP/SNBT).
                   - Acuan internasional (ACM): Computer Science (teori komputasi, algoritma, sistem), Information Systems (sistem informasi untuk proses bisnis dan organisasi), Information Technology (infrastruktur, jaringan, operasional), Software Engineering.
                   - Di Indonesia namanya beragam: umumnya Ilmu Komputer ≈ CS, Teknik Informatika ≈ CS/SE yang lebih terapan, Sistem Informasi ≈ IS. Tegaskan: cek daftar mata kuliah kampus tujuan, jangan hanya nama jurusannya.
                   - Ronde: porsi matematika dan algoritma, porsi bisnis dan manajemen, porsi praktik coding, contoh karier.
                   - Vonis: ketiganya bisa jadi software engineer; pilih sesuai minat.
                   - Ajak komen: "Kamu anak jurusan apa?"
                   - Sumber: https://www.acm.org/education/curricula-recommendations
                             https://csed.acm.org/
```

### Day 37: Rabu, 6 Jan 2027

```text
JENIS KONTEN     : Mitos vs Fakta
TOPIK            : "Harus Jago Matematika Buat Jadi Programmer?" Mitos atau Fakta?
DURASI           : 1:15
TOPIK BERIKUTNYA : Debat HTML — HTML itu bahasa pemrograman atau bukan?
BAHAN / SUMBER   : - Mitos 1 "semua programmer pakai kalkulus tiap hari" → Fakta: pekerjaan web/mobile sehari-hari lebih banyak butuh logika, struktur data, dan ketelitian.
                   - Mitos 2 "programmer nggak butuh matematika sama sekali" → Fakta: kurikulum ilmu komputer tetap memuat dasar matematika (logika, matematika diskrit, statistik), dan bidang seperti AI/ML, grafika/game, kriptografi, serta data science butuh matematika lebih dalam (misalnya aljabar linear untuk ML).
                   - Takeaway: matematika itu alat; seberapa dalam kamu butuh tergantung bidang yang dipilih.
                   - Ajak komen: "Nilai matematikamu dulu berapa?"
                   - Sumber: https://csed.acm.org/ (knowledge area Mathematical and Statistical Foundations di CS2023)
                             https://developers.google.com/machine-learning/crash-course/prereqs-and-prework
```

### Day 38: Kamis, 7 Jan 2027

```text
JENIS KONTEN     : Mitos vs Fakta
TOPIK            : HTML Itu Bahasa Pemrograman atau Bukan? (Debat Abadi Anak IT)
DURASI           : 1:00
TOPIK BERIKUTNYA : Jalur Karier IT — Frontend, backend, mobile, atau DevOps, pilih yang mana?
BAHAN / SUMBER   : - Hook: tulis "HTML bahasa pemrograman" di kolom komentar dan lihat perangnya.
                   - Fakta: HTML adalah bahasa markup; ia mendeskripsikan struktur dan makna konten (judul, paragraf, tombol), tanpa variabel, kondisi, atau perulangan. MDN menulis bahwa HTML bukan bahasa pemrograman.
                   - Twist: bukan berarti remeh. HTML semantik menentukan aksesibilitas (pembaca layar) dan SEO; yang membuat halaman "berpikir" adalah JavaScript.
                   - Ajak komen: "Tim HTML bahasa pemrograman atau bukan?"
                   - Sumber: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
                             https://developer.mozilla.org/en-US/docs/Glossary/HTML
```

### Day 39: Jumat, 8 Jan 2027

```text
JENIS KONTEN     : Lainnya: Karier
TOPIK            : Frontend, Backend, Mobile, DevOps, Cloud: Kerjanya Ngapain Aja dan Cocok Buat Siapa?
DURASI           : 1:30
TOPIK BERIKUTNYA : Bahasa Pertama — Python, JavaScript, atau Java buat pemula?
BAHAN / SUMBER   : - Frontend: tampilan dan interaksi web (HTML, CSS, JavaScript/TypeScript, React/Vue); cocok untuk yang suka visual dan detail UX.
                   - Backend: logika bisnis, API, database, keamanan (Go, Java/Kotlin, PHP/Laravel, Node.js, Python); cocok untuk yang suka sistem dan data.
                   - Mobile: aplikasi Android/iOS (Kotlin, Swift, Flutter, React Native); gabungan UI dan performa perangkat.
                   - DevOps/Cloud: otomasi rilis, server, monitoring, biaya cloud (Docker, Kubernetes, CI/CD, AWS/GCP); cocok untuk yang suka "membuat semuanya jalan".
                   - Twist (cerita pribadi): banyak senior menyentuh beberapa jalur; mulai dari satu, perdalam, baru melebar (T-shaped).
                   - Sumber: https://roadmap.sh/
                             https://survey.stackoverflow.co/2025/
```

### Day 40: Sabtu, 9 Jan 2027

```text
JENIS KONTEN     : Perbandingan
TOPIK            : Python vs JavaScript vs Java: Bahasa Pertama Terbaik Buat Pemula?
DURASI           : 1:30
TOPIK BERIKUTNYA : AI vs Programmer — Apa AI bakal menggantikan programmer?
BAHAN / SUMBER   : - Python: sintaks ringkas; populer untuk data, AI, dan otomasi.
                   - JavaScript: bahasa bawaan browser, hasilnya langsung terlihat; jalur web dan full-stack.
                   - Java (dan Kotlin): banyak dipakai di enterprise dan Android; konsep tipe data dan OOP tegas.
                   - Ronde: kemudahan sintaks, kecepatan melihat hasil, peluang kerja dan ekosistem, bekal konsep.
                   - Vonis: pilih sesuai tujuan; konsep dasar (variabel, perulangan, fungsi, struktur data) terbawa ke bahasa mana pun.
                   - Ajak komen: "Bahasa pertamamu apa?"
                   - Sumber: https://survey.stackoverflow.co/2025/technology
                             https://www.tiobe.com/tiobe-index/
```

### Day 41: Minggu, 10 Jan 2027

```text
JENIS KONTEN     : Mitos vs Fakta
TOPIK            : "AI Bakal Menggantikan Programmer": Mitos atau Fakta?
DURASI           : 1:30
TOPIK BERIKUTNYA : Portofolio — Proyek apa yang bikin CV programmer pemula dilirik?
BAHAN / SUMBER   : - Mitos 1 "AI pasti bikin programmer lebih cepat" → Fakta: uji acak METR (Juli 2025) pada 16 developer open-source berpengalaman (246 tugas): dengan AI mereka ±19% lebih lambat, padahal merasa ±20% lebih cepat. Sebutkan batasannya: sampel kecil, kondisi awal 2025.
                   - Mitos 2 "developer sudah percaya penuh pada AI" → Fakta: Stack Overflow Developer Survey 2025, ±84% memakai atau berencana memakai AI, tapi 46% tidak percaya akurasinya (yang percaya 33%).
                   - Mitos 3 "nggak perlu belajar dasar, tinggal prompt" → Fakta: kode buatan AI tetap harus dibaca, diuji, dan dipertanggungjawabkan; dasar yang kuat justru makin penting.
                   - Takeaway (beri label OPINI): pekerjaan bergeser dari mengetik kode ke merancang, mereview, dan mengambil keputusan.
                   - Ajak komen: "Kamu takut digantikan AI?"
                   - Sumber: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
                             https://stackoverflow.blog/2025/07/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/
                             https://survey.stackoverflow.co/2025/ai
```

### Day 42: Senin, 11 Jan 2027

```text
JENIS KONTEN     : Tips & Tools
TOPIK            : 5 Proyek Portofolio yang Bikin CV Programmer Pemula Dilirik
DURASI           : 1:15
TOPIK BERIKUTNYA : Cara Kerja Browser — Gimana kode berubah jadi tampilan di layar?
BAHAN / SUMBER   : - 1) Aplikasi CRUD lengkap dengan login dan sudah di-deploy online, bukan sekadar to-do list lokal.
                   - 2) Klon fitur nyata dengan tantangan teknis, misalnya checkout anti stok minus (seri Flash Sale).
                   - 3) Proyek yang memakai API publik lokal, misalnya data cuaca atau gempa dari BMKG.
                   - 4) Kontribusi open source lewat label "good first issue".
                   - 5) README yang jelas: masalah yang diselesaikan, cara menjalankan, screenshot/demo, keputusan teknis.
                   - Bonus: tulis test sederhana dan commit yang rapi; reviewer teknis bisa melihat cara kerjamu dari histori Git.
                   - Sumber: https://data.bmkg.go.id/
                             https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/encouraging-helpful-contributions-to-your-project-with-labels
```

---

## Minggu 7 · Day 43–49 · 12–18 Jan 2027 — Frontend & Browser

### Day 43: Selasa, 12 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Cara Kerja Browser: Gimana Kode HTML, CSS, dan JavaScript Berubah Jadi Tampilan di Layar?
DURASI           : 2:00
TOPIK BERIKUTNYA : Event Loop — JavaScript cuma punya satu thread, kok bisa ngerjain banyak hal?
BAHAN / SUMBER   : - Hook: layar putih 3 detik sebelum halaman muncul. Apa yang sedang dikerjakan browser?
                   - Alur (critical rendering path): HTML → DOM; CSS → CSSOM; DOM + CSSOM → render tree; layout (hitung posisi dan ukuran); paint (gambar piksel); composite (susun layer).
                   - Kenapa lemot: CSS dan JavaScript sinkron memblokir render; JavaScript yang mengubah layout memicu hitung ulang (reflow).
                   - Tips: `defer`/`async` untuk script, CSS kritis sekecil mungkin, animasikan `transform`/`opacity`.
                   - Lanjutan video "Cara Kerja Internet" (apa yang terjadi setelah HTML diterima).
                   - Sumber: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work
                             https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path
                             https://web.dev/articles/critical-rendering-path
```

### Day 44: Rabu, 13 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Event Loop: JavaScript Cuma Punya Satu Thread, Kok Bisa Ngerjain Banyak Hal?
DURASI           : 1:30
TOPIK BERIKUTNYA : CORS Error — Kenapa API jalan di Postman tapi gagal di browser?
BAHAN / SUMBER   : - Poin: satu call stack menjalankan kode satu per satu. Tugas lambat (fetch, timer) diserahkan ke browser (Web API); hasilnya masuk antrean; event loop memindahkan antrean ke stack saat stack kosong. Microtask (Promise) didahulukan sebelum task biasa (setTimeout).
                   - Demo: tebak urutan output `console.log` dengan setTimeout 0 dan Promise; hasilnya bikin kaget.
                   - Kasus kerja: loop berat di main thread bikin tombol dan scroll macet → pecah tugas atau pakai Web Worker.
                   - Analogi: satu barista; pesanan yang lama diberi buzzer, barista lanjut melayani antrean.
                   - Sumber: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model
                             https://html.spec.whatwg.org/multipage/webappapis.html#event-loops
                             https://www.youtube.com/watch?v=cCOL7MC4Pl0 (Jake Archibald, "In The Loop", JSConf.Asia 2018)
```

### Day 45: Kamis, 14 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : CORS Error: Kenapa API Jalan di Postman Tapi Gagal di Browser?
DURASI           : 1:30
TOPIK BERIKUTNYA : Debounce vs Throttle — Gimana bikin kolom search nggak nge-spam server?
BAHAN / SUMBER   : - Hook: pesan merah "has been blocked by CORS policy", error yang paling sering dialami frontend junior.
                   - Poin: browser menerapkan same-origin policy (beda domain, port, atau protokol = beda origin). CORS adalah cara server memberi izin lewat header seperti `Access-Control-Allow-Origin`; request tertentu didahului preflight `OPTIONS`.
                   - Kenapa Postman lolos: CORS ditegakkan oleh browser untuk melindungi pengguna, bukan oleh server; Postman bukan browser.
                   - Fix yang benar: atur header di server atau API gateway untuk origin yang diizinkan; jangan mematikan keamanan browser, dan jangan asal `*` untuk API yang memakai cookie/kredensial.
                   - Analogi: satpam kompleks (browser) yang mengecek daftar tamu (header) dari pemilik rumah (server).
                   - Sumber: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
                             https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
                             https://fetch.spec.whatwg.org/#http-cors-protocol
```

### Day 46: Jumat, 15 Jan 2027

```text
JENIS KONTEN     : Perbandingan
TOPIK            : Debounce vs Throttle: Bikin Kolom Search Nggak Nge-spam Server
DURASI           : 1:15
TOPIK BERIKUTNYA : CSR vs SSR — Kenapa website-mu lemot saat pertama dibuka?
BAHAN / SUMBER   : - Masalah: setiap ketikan memicu request; 10 huruf = 10 request.
                   - Debounce: tunggu sampai pengguna berhenti mengetik sekian milidetik, baru jalan sekali → cocok untuk search/autocomplete.
                   - Throttle: jalan paling banyak sekali per interval → cocok untuk scroll, resize, dan tombol yang diklik berkali-kali.
                   - Ronde: jumlah request, responsivitas, kasus terbaik.
                   - Analogi: lift yang menunggu orang terakhir masuk (debounce) vs lampu lalu lintas yang hijau tiap 30 detik (throttle).
                   - Sumber: https://developer.mozilla.org/en-US/docs/Glossary/Debounce
                             https://developer.mozilla.org/en-US/docs/Glossary/Throttle
                             https://css-tricks.com/debouncing-throttling-explained-examples/
```

### Day 47: Sabtu, 16 Jan 2027

```text
JENIS KONTEN     : Perbandingan
TOPIK            : CSR vs SSR vs SSG: Kenapa Website-mu Lemot Saat Pertama Dibuka?
DURASI           : 1:30
TOPIK BERIKUTNYA : Kode Status HTTP — Kenapa ada error 404 dan "I'm a teapot"?
BAHAN / SUMBER   : - CSR (client-side rendering): server mengirim HTML kosong + JavaScript besar, browser yang merakit → baru tampil dan interaktif setelah JavaScript selesai; tampilan pertama dan SEO bisa lambat.
                   - SSR (server-side rendering): server merakit HTML di setiap request → konten cepat tampil, beban server naik.
                   - SSG (static site generation): HTML dibuat saat build → sangat cepat lewat CDN, cocok untuk konten yang jarang berubah.
                   - Ronde: kecepatan tampilan pertama, SEO, beban server, data real-time.
                   - Vonis: campur per halaman (misalnya landing page SSG, dashboard CSR); framework seperti Next.js dan Nuxt mendukung semuanya.
                   - Sumber: https://web.dev/articles/rendering-on-the-web
```

### Day 48: Minggu, 17 Jan 2027

```text
JENIS KONTEN     : Fakta Unik
TOPIK            : Kode Status HTTP: Kenapa Ada Error 404, 418 "I'm a Teapot", dan 451?
DURASI           : 1:15
TOPIK BERIKUTNYA : Cookie vs LocalStorage — Token login sebaiknya disimpan di mana?
BAHAN / SUMBER   : - Kode status dikelompokkan dari digit pertamanya: 1xx informasi, 2xx sukses, 3xx pengalihan, 4xx kesalahan di sisi klien, 5xx kesalahan di sisi server.
                   - 404 Not Found: server tidak menemukan resource yang diminta.
                   - 418 I'm a teapot: lelucon April Mop dari RFC 2324 (1998) tentang protokol pengendali teko kopi; standar HTTP terbaru mencatat kode ini tidak boleh dipakai untuk keperluan lain karena sudah terlanjur populer sebagai lelucon.
                   - 429 Too Many Requests (video Rate Limiting) dan 503 Service Unavailable saat server kewalahan.
                   - 451 Unavailable For Legal Reasons: konten diblokir karena alasan hukum; angkanya penghormatan untuk novel Fahrenheit 451.
                   - Sumber: https://www.rfc-editor.org/rfc/rfc9110#name-status-codes
                             https://www.rfc-editor.org/rfc/rfc2324
                             https://www.rfc-editor.org/rfc/rfc7725
                             https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
```

### Day 49: Senin, 18 Jan 2027

```text
JENIS KONTEN     : Perbandingan
TOPIK            : Cookie vs localStorage vs sessionStorage: Token Login Sebaiknya Disimpan di Mana?
DURASI           : 1:30
TOPIK BERIKUTNYA : Aplikasi Not Responding — Kenapa aplikasi tiba-tiba "tidak merespons"?
BAHAN / SUMBER   : - localStorage: bertahan sampai dihapus; bisa dibaca JavaScript apa pun di halaman itu → kalau ada celah XSS, token bisa dicuri.
                   - sessionStorage: sama, tapi hilang saat tab ditutup.
                   - Cookie `HttpOnly` + `Secure` + `SameSite`: tidak bisa dibaca JavaScript, otomatis ikut dikirim ke server; tetap perlu perlindungan CSRF.
                   - Ronde: tahan XSS, tahan CSRF, kemudahan pakai, kapasitas.
                   - Vonis: OWASP menyarankan tidak menyimpan session identifier di local storage; untuk web, cookie HttpOnly umumnya pilihan paling aman (sambung ke video JWT).
                   - Sumber: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
                             https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
                             https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage
```

---

## Minggu 8 · Day 50–56 · 19–25 Jan 2027 — Mobile: Android & iOS

### Day 50: Selasa, 19 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : "Aplikasi Tidak Merespons": Rahasia Main Thread di Android & iOS
DURASI           : 1:30
TOPIK BERIKUTNYA : Native vs Flutter — Kotlin/Swift, Flutter, atau React Native?
BAHAN / SUMBER   : - Hook: dialog "Aplikasi tidak merespons". Apa yang sebenarnya macet?
                   - Poin: semua gambar di layar dan sentuhan diproses di satu thread utama (UI thread). Kalau thread ini dipakai untuk kerja berat (baca file besar, query database, request jaringan), layar membeku.
                   - Android: ANR muncul bila aplikasi tidak merespons input dalam 5 detik.
                   - iOS: watchdog sistem bisa menghentikan aplikasi yang terlalu lama tidak responsif; kode crash-nya terkenal: 0x8badf00d ("ate bad food").
                   - Fix: pindahkan kerja berat ke background (Kotlin coroutines + Dispatchers.IO, Swift concurrency/GCD), kembali ke main thread hanya untuk update UI.
                   - Analogi: kasir yang meninggalkan mesin kasir untuk mengambil stok di gudang; antrean langsung macet.
                   - Sumber: https://developer.android.com/topic/performance/vitals/anr
                             https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations
```

### Day 51: Rabu, 20 Jan 2027

```text
JENIS KONTEN     : Perbandingan
TOPIK            : Native (Kotlin/Swift) vs Flutter vs React Native: Pilih yang Mana di 2027?
DURASI           : 1:30
TOPIK BERIKUTNYA : Push Notification — Kok HP dapat notifikasi padahal aplikasinya ditutup?
BAHAN / SUMBER   : - Native: akses penuh dan paling langsung ke fitur perangkat; dua codebase (Android dan iOS).
                   - Flutter (Dart): satu codebase, UI digambar sendiri oleh engine-nya → tampilan konsisten di semua platform.
                   - React Native (JavaScript/TypeScript): satu codebase, memakai komponen native; cocok untuk tim yang sudah kuat di React.
                   - Ronde: performa, akses fitur native, kecepatan development, ketersediaan talenta di tim.
                   - Vonis: tergantung tim dan produk. Aplikasi yang sangat bergantung pada fitur perangkat → native; tim kecil yang ingin dua platform sekaligus → cross-platform.
                   - Ajak komen: "Tim kamu pakai apa?"
                   - Sumber: https://flutter.dev/showcase
                             https://reactnative.dev/showcase
                             https://developer.android.com/kotlin
                             https://developer.apple.com/swift/
```

### Day 52: Kamis, 21 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Push Notification: Kok HP Dapat Notifikasi Padahal Aplikasinya Ditutup?
DURASI           : 1:30
TOPIK BERIKUTNYA : Mitos Tutup Aplikasi — Menutup aplikasi bikin HP lebih cepat dan hemat baterai?
BAHAN / SUMBER   : - Poin: aplikasi tidak "berjaga" sendiri. Sistem operasi menjaga satu koneksi ke layanan push (FCM di Android, APNs di Apple). Server aplikasi mengirim pesan + device token ke FCM/APNs, lalu diteruskan ke HP.
                   - Kenapa notifikasi kadang telat: mode hemat daya (Doze), pengaturan baterai agresif dari sebagian vendor HP, prioritas pesan, token kedaluwarsa.
                   - Kasus kerja: simpan dan perbarui device token; kirim pesan prioritas tinggi hanya untuk hal penting.
                   - Analogi: kantor pos (FCM/APNs) mengantar surat ke alamatmu (device token); kamu tidak perlu menunggu di depan rumah.
                   - Sumber: https://firebase.google.com/docs/cloud-messaging
                             https://developer.apple.com/documentation/usernotifications
                             https://developer.android.com/training/monitoring-device-state/doze-standby
                             https://dontkillmyapp.com/
```

### Day 53: Jumat, 22 Jan 2027

```text
JENIS KONTEN     : Mitos vs Fakta
TOPIK            : "Tutup Semua Aplikasi Biar HP Cepat dan Hemat Baterai": Mitos atau Fakta?
DURASI           : 1:00
TOPIK BERIKUTNYA : Chat Tanpa Sinyal — Kok chat tetap bisa diketik dan terkirim belakangan?
BAHAN / SUMBER   : - Mitos 1 "swipe tutup semua aplikasi bikin hemat baterai" → Fakta: Apple menyebut umumnya tidak perlu menutup paksa aplikasi kecuali tidak merespons; membuka ulang dari nol butuh energi lebih besar daripada melanjutkan aplikasi yang sedang dibekukan sistem.
                   - Mitos 2 "RAM kosong = HP cepat" → Fakta: Android sengaja menyimpan proses di memori (cache) supaya aplikasi cepat dibuka lagi, dan membuangnya sendiri saat memori dibutuhkan.
                   - Pengecualian: tutup aplikasi yang macet atau terbukti boros di menu Baterai.
                   - Ajak komen: "Kamu tim swipe-semua atau biarin aja?"
                   - Sumber: https://support.apple.com/HT201330
                             https://www.macrumors.com/2016/03/10/force-quitting-apps-doesnt-help-battery/
                             https://developer.android.com/topic/performance/memory-management
```

### Day 54: Sabtu, 23 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Offline-First: Kok Chat Tetap Bisa Diketik Saat Sinyal Hilang dan Terkirim Belakangan?
DURASI           : 1:30
TOPIK BERIKUTNYA : Fakta Unik Aplikasi — Kenapa ada kode crash bernama "ate bad food"?
BAHAN / SUMBER   : - Poin: aplikasi offline-first menulis dulu ke database lokal di HP (SQLite/Room/Core Data), langsung menampilkannya di layar, lalu menaruh perubahan di antrean kirim. Saat online, antrean disinkronkan ke server.
                   - Tanda di UI: ikon jam/pending sampai server mengonfirmasi.
                   - Tantangan: konflik data dari dua perangkat, urutan pesan, retry yang aman (video Idempotency).
                   - Pakai aplikasi chat dan catatan sebagai contoh relatable, tapi jangan klaim detail internal aplikasi tertentu.
                   - Sumber: https://developer.android.com/topic/architecture/data-layer/offline-first
                             https://developer.android.com/training/data-storage/room
```

### Day 55: Minggu, 24 Jan 2027

```text
JENIS KONTEN     : Fakta Unik
TOPIK            : 4 Fakta Unik di Balik Aplikasi di HP-mu
DURASI           : 1:15
TOPIK BERIKUTNYA : Lag Game Online — Udah nembak duluan, kok kamu yang kalah?
BAHAN / SUMBER   : - App Store dibuka Juli 2008 dengan ±500 aplikasi pihak ketiga; iPhone pertama (2007) belum punya App Store.
                   - Kode crash iOS 0x8badf00d dibaca "ate bad food": aplikasi dihentikan watchdog karena terlalu lama memblokir main thread (video Aplikasi Not Responding).
                   - Versi Android dulu dinamai makanan manis (Cupcake, KitKat, Pie); sejak Android 10 (2019) nama makanan tidak dipakai lagi di nama resmi.
                   - Sejak Google I/O 2019, Google menyatakan pengembangan Android "Kotlin-first".
                   - Sumber: https://www.apple.com/newsroom/2008/07/10Apples-App-Store-Launches-with-More-than-500-Apps/
                             https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations
                             https://blog.google/products/android/android-is-for-everyone/ (cek)
                             https://developer.android.com/kotlin/first
```

### Day 56: Senin, 25 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Lag di Game Online: Udah Nembak Duluan, Kok Kamu yang Kalah?
DURASI           : 1:30
TOPIK BERIKUTNYA : Docker — Kenapa "di laptopku jalan" nggak berlaku di server?
BAHAN / SUMBER   : - Hook: momen klasik di game kompetitif; kamu yakin menang duel, ternyata kalah.
                   - Poin: server yang menentukan kebenaran (authoritative server). HP-mu menebak gerakanmu dulu supaya terasa responsif (client-side prediction), lalu dikoreksi server. Saat menilai tembakan, server "memutar balik waktu" sesuai ping (lag compensation) → pemain dengan ping berbeda melihat kejadian yang sedikit berbeda.
                   - Ping = waktu bolak-balik data (ms); jitter dan packet loss bikin karakter "teleport".
                   - Analogi: wasit yang menilai ulang lewat rekaman (VAR) dengan jeda.
                   - Jangan klaim detail internal game tertentu.
                   - Sumber: https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking
                             https://developer.valvesoftware.com/wiki/Lag_Compensation
                             https://www.gabrielgambetta.com/client-server-game-architecture.html
```

---

## Minggu 9 · Day 57–63 · 26 Jan–1 Feb 2027 — DevOps & Cloud

### Day 57: Selasa, 26 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Docker: Kenapa "Di Laptopku Jalan Kok!" Nggak Berlaku di Server?
DURASI           : 1:30
TOPIK BERIKUTNYA : Tagihan Cloud — Gimana startup kena tagihan Rp1 miliar dalam semalam?
BAHAN / SUMBER   : - Hook: meme legendaris "works on my machine".
                   - Poin: aplikasi bisa jalan karena lingkungannya (versi bahasa, library, konfigurasi OS). Docker membungkus aplikasi + semua dependensinya menjadi image; image dijalankan sebagai container yang sama persis di laptop, CI, dan server.
                   - Beda dengan VM: container berbagi kernel OS host → lebih ringan dan cepat start; VM membawa OS lengkapnya sendiri.
                   - Analogi: peti kemas standar di pelabuhan; isinya apa pun, cara mengangkutnya sama.
                   - Sumber: https://docs.docker.com/get-started/docker-overview/
                             https://www.docker.com/resources/what-container/
```

### Day 58: Rabu, 27 Jan 2027

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : Tagihan Cloud US$72.000 dalam Semalam: Kisah Startup yang Hampir Bangkrut
DURASI           : 1:30
TOPIK BERIKUTNYA : Kubernetes — Udah pakai Docker, kenapa masih butuh "juru mudi"?
BAHAN / SUMBER   : - Kronologi (Milkie Way, 2020): menguji Cloud Run + Firebase dengan budget alert US$7. Kode yang memicu baca database berulang dijalankan dengan batas instance default (1.000) → ±116 miliar read dalam hitungan jam; tagihan ±US$72.000 (lebih dari Rp1 miliar). Google akhirnya membebaskan tagihan itu.
                   - Kenapa budget alert tidak menolong: alert hanya memberi tahu, tidak menghentikan; data billing juga terlambat sekitar sehari.
                   - Pelajaran: batasi max instances dan kuota, pasang penghentian otomatis, uji di skala kecil, waspadai loop yang memicu dirinya sendiri.
                   - Sumber: https://blog.tomilkieway.com/72k-1/
                             https://www.theregister.com/2020/12/10/google_cloud_over_run/
```

### Day 59: Kamis, 28 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Kubernetes: Udah Pakai Docker, Kenapa Masih Butuh "Juru Mudi"?
DURASI           : 1:30
TOPIK BERIKUTNYA : CI/CD — Kenapa kode dicek "robot" dulu sebelum masuk production?
BAHAN / SUMBER   : - Poin: Docker menjalankan container; Kubernetes mengatur ratusan container di banyak server: penjadwalan (taruh di server mana), self-healing (container mati → dibuat ulang), scaling, rolling update tanpa downtime, service discovery.
                   - Nama: dari bahasa Yunani "juru mudi"; K8s = K + 8 huruf + s; dibuka Google sebagai open source pada 2014.
                   - Kapan TIDAK perlu: aplikasi kecil dan tim kecil sering cukup dengan layanan terkelola atau Docker Compose.
                   - Analogi: kepala dapur yang mengatur para koki (container) di banyak dapur (server).
                   - Sumber: https://kubernetes.io/docs/concepts/overview/
                             https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
```

### Day 60: Jumat, 29 Jan 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : CI/CD: Kenapa Kode Dicek "Robot" Dulu Sebelum Masuk Production?
DURASI           : 1:30
TOPIK BERIKUTNYA : WhatsApp Down 6 Jam — Kenapa WA, IG, dan FB bisa hilang bersamaan?
BAHAN / SUMBER   : - Poin: Continuous Integration, yaitu setiap push otomatis di-build, dites, dan dicek (lint, keamanan). Continuous Delivery/Deployment: yang lolos otomatis disiapkan atau dirilis ke staging lalu production.
                   - Manfaat: bug ketahuan saat masih kecil; rilis jadi kecil dan sering (riset DORA); tidak ada lagi deploy manual jam 2 pagi (ingat Knight Capital).
                   - Contoh pipeline sederhana di GitHub Actions: checkout → install → test → build image → deploy.
                   - Analogi: pemeriksaan bertahap di bandara sebelum naik pesawat.
                   - Sumber: https://martinfowler.com/articles/continuousIntegration.html
                             https://docs.github.com/en/actions
                             https://dora.dev/
```

### Day 61: Sabtu, 30 Jan 2027

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : WhatsApp, Instagram, dan Facebook Down 6 Jam (Okt 2021): Gara-gara Satu Perintah
DURASI           : 1:45
TOPIK BERIKUTNYA : Cloud ala Nasi Goreng — IaaS, PaaS, SaaS itu bedanya apa?
BAHAN / SUMBER   : - Kronologi: 4 Okt 2021, mulai ±15:39 UTC (22:39 WIB); layanan Meta hilang dari internet sekitar 6 jam.
                   - Akar masalah (blog engineering Meta): saat maintenance rutin, perintah untuk menilai kapasitas backbone tanpa sengaja memutus semua koneksi backbone; alat audit yang seharusnya menghentikan perintah itu punya bug.
                   - Efek berantai: server DNS Meta menarik pengumuman rute BGP-nya saat tidak bisa menghubungi data center → internet "lupa" jalan ke facebook.com.
                   - Pemulihan lambat karena akses jaringan dan fisik ke data center ikut terdampak, dan layanan harus dinyalakan bertahap supaya lonjakan beban tidak memicu masalah baru.
                   - Pelajaran: otomasi dan alat audit juga perlu dites; siapkan jalur akses darurat (out-of-band).
                   - Sumber: https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/
                             https://engineering.fb.com/2021/10/04/networking-traffic/outage/
                             https://blog.cloudflare.com/october-2021-facebook-outage/
```

### Day 62: Minggu, 31 Jan 2027

```text
JENIS KONTEN     : Perbandingan
TOPIK            : IaaS vs PaaS vs SaaS: Dijelasin Pakai Analogi Nasi Goreng
DURASI           : 1:15
TOPIK BERIKUTNYA : GitLab Hapus Database — Gimana semua lapis backup bisa gagal bersamaan?
BAHAN / SUMBER   : - On-premise: masak sendiri dari belanja sampai cuci piring.
                   - IaaS (misalnya VM di AWS EC2 atau Compute Engine): sewa dapur lengkap, kamu yang masak; OS, runtime, dan aplikasi kamu urus sendiri.
                   - PaaS (misalnya App Engine, Cloud Run, Heroku): tinggal bawa resep (kode); dapur dan kompor diurus penyedia.
                   - SaaS (misalnya Gmail, Google Docs): makan di warung, tinggal pakai.
                   - Ronde: kontrol, tanggung jawab perawatan, kecepatan mulai, fleksibilitas.
                   - Definisi resmi: NIST SP 800-145.
                   - Sumber: https://csrc.nist.gov/pubs/sp/800/145/final
```

### Day 63: Senin, 1 Feb 2027

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : GitLab Menghapus Database Production Sendiri (2017): Saat Semua Lapis Backup Ternyata Gagal
DURASI           : 1:45
TOPIK BERIKUTNYA : Ransomware PDN — Kenapa cuma 2% data yang di-backup?
BAHAN / SUMBER   : - Kronologi (31 Jan 2017): beban database melonjak dan replikasi tertinggal; saat memperbaikinya, engineer menjalankan perintah hapus direktori data di server primary, padahal maksudnya di secondary. Dihentikan saat hanya tersisa ±4,5 GB dari ±300 GB.
                   - Kejutan: berbagai mekanisme backup dan replikasi ternyata tidak berjalan semestinya. Pemulihan memakai snapshot LVM ±6 jam sebelumnya → data ±6 jam hilang (issue, merge request, akun baru); repositori Git tidak terdampak.
                   - Transparansi: GitLab menyiarkan proses pemulihan secara live dan menulis postmortem terbuka tanpa menyalahkan individu.
                   - Pelajaran: backup yang tidak pernah dites restore = belum punya backup; bedakan tampilan terminal production; budaya postmortem blameless.
                   - Sumber: https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/
                             https://about.gitlab.com/blog/gitlab-dot-com-database-incident/
```

---

## Minggu 10 · Day 64–70 · 2–8 Feb 2027 — Security

### Day 64: Selasa, 2 Feb 2027

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : Ransomware Pusat Data Nasional 2024: Kenapa Cuma 2% Data yang Di-backup?
DURASI           : 2:00
TOPIK BERIKUTNYA : Hashing Password — Kenapa admin pun nggak tahu password-mu?
BAHAN / SUMBER   : - Kronologi: 20 Juni 2024, PDNS 2 di Surabaya dilumpuhkan ransomware Brain Cipher (varian LockBit 3.0 menurut BSSN). Pelaku meminta tebusan US$8 juta; pemerintah menolak membayar. Ratusan tenant instansi terdampak (awalnya disebut 210, kemudian 282), termasuk layanan publik seperti keimigrasian (cek).
                   - Fakta kunci: Kepala BSSN menyatakan hanya ±2% data di PDNS Surabaya yang di-backup; pemulihan bergantung pada backup masing-masing instansi.
                   - Cara kerja ransomware: masuk → menyebar di jaringan → mengenkripsi data (termasuk backup yang bisa dijangkau) → minta tebusan.
                   - Pelajaran: aturan backup 3-2-1 (3 salinan, 2 media berbeda, 1 di luar lokasi; idealnya ada yang offline/immutable), uji restore berkala, segmentasi jaringan, MFA.
                   - Nada: netral dan faktual; jangan menyalahkan individu.
                   - Sumber: https://www.cnnindonesia.com/teknologi/20240625062350-192-1113701/apa-itu-brain-cipher-ransomware-yang-serang-pusat-data-nasional
                             https://inet.detik.com/security/d-7409192/detik-detik-ransomware-brain-cipher-lumpuhkan-pusat-data-indonesia
                             https://www.investortrust.id/news//bssn-hanya-2-data-di-pusat-data-nasional-yang-di-backup
                             https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf
```

### Day 65: Rabu, 3 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Hashing Password: Kenapa Admin Pun Nggak Tahu Password-mu?
DURASI           : 1:30
TOPIK BERIKUTNYA : SQL Injection — Gimana hacker "ngobrol" langsung dengan database-mu?
BAHAN / SUMBER   : - Poin: password yang benar tidak disimpan, tapi diubah jadi hash (fungsi satu arah). Saat login, password yang diketik di-hash ulang lalu dibandingkan.
                   - Salt: data acak unik per pengguna, supaya password yang sama menghasilkan hash berbeda dan tabel hash siap pakai (rainbow table) tidak berguna.
                   - Hash biasa (MD5/SHA-256) terlalu cepat untuk password → pakai algoritma yang sengaja lambat: Argon2id, scrypt, atau bcrypt (rekomendasi OWASP).
                   - Bedakan: encoding (Base64, bisa dibalik siapa saja, ingat payload JWT), enkripsi (bisa dibuka dengan kunci), hashing (satu arah).
                   - Analogi: blender; buah bisa jadi jus, jus tidak bisa jadi buah lagi.
                   - Sumber: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
                             https://pages.nist.gov/800-63-4/sp800-63b.html
```

### Day 66: Kamis, 4 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : SQL Injection: Gimana Hacker "Ngobrol" Langsung dengan Database-mu?
DURASI           : 1:30
TOPIK BERIKUTNYA : Kode OTP — Kok kode OTP bisa cocok padahal HP-mu offline?
BAHAN / SUMBER   : - Hook: kolom login diisi `' OR '1'='1` dan pintu terbuka.
                   - Poin: terjadi saat input pengguna disambung langsung ke teks query, sehingga database tidak bisa membedakan data dan perintah.
                   - Fix: parameterized query/prepared statement (atau ORM yang dipakai dengan benar), validasi input, akun database dengan hak minimum.
                   - Konteks: injection masih masuk OWASP Top 10:2025 (cek peringkatnya).
                   - Humor: komik xkcd "Exploits of a Mom" (Bobby Tables).
                   - Sumber: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
                             https://owasp.org/Top10/2025/
                             https://xkcd.com/327/
```

### Day 67: Jumat, 5 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Kode OTP Authenticator: Kok Bisa Cocok dengan Server Padahal HP-mu Offline?
DURASI           : 1:30
TOPIK BERIKUTNYA : Mitos Keamanan — Mode incognito bikin kamu anonim?
BAHAN / SUMBER   : - Hook: matikan internet, kode di aplikasi authenticator tetap diterima. Sulap?
                   - Poin: saat aktivasi (scan QR), HP dan server menyimpan kunci rahasia yang sama. Kode = HMAC(kunci rahasia, waktu sekarang dibagi 30 detik), dipotong jadi 6 digit (TOTP, RFC 6238). HP dan server menghitung sendiri-sendiri → hasilnya sama selama jam keduanya sinkron (video Jam HP).
                   - Beda dengan OTP SMS: dikirim lewat jaringan → bisa telat, bisa dicegat (misalnya lewat SIM swap).
                   - Keamanan: jangan pernah bagikan kode OTP ke siapa pun; kodenya hanya berlaku singkat.
                   - Analogi: dua orang memegang buku sandi yang sama dan membuka halaman sesuai jam.
                   - Sumber: https://www.rfc-editor.org/rfc/rfc6238
                             https://www.rfc-editor.org/rfc/rfc4226
```

### Day 68: Sabtu, 6 Feb 2027

```text
JENIS KONTEN     : Mitos vs Fakta
TOPIK            : 4 Mitos Keamanan Digital yang Masih Dipercaya Banyak Orang
DURASI           : 1:15
TOPIK BERIKUTNYA : Backdoor xz — Gimana keterlambatan setengah detik membongkar backdoor di Linux?
BAHAN / SUMBER   : - Mitos 1 "incognito bikin anonim" → Fakta: incognito hanya tidak menyimpan riwayat di perangkatmu; situs, kantor/sekolah, dan penyedia internet tetap bisa melihat aktivitasmu (halaman bantuan Chrome).
                   - Mitos 2 "ada ikon gembok/HTTPS berarti situsnya aman" → Fakta: gembok hanya berarti koneksinya terenkripsi; hampir semua situs phishing juga memakai HTTPS (Chromium, 2023).
                   - Mitos 3 "password rumit yang pendek lebih kuat dari password panjang" → Fakta: panjang lebih penting; NIST menyarankan mendukung frasa sandi panjang dan tidak memaksakan aturan komposisi.
                   - Mitos 4 "akun kecil nggak bakal jadi target" → Fakta: credential stuffing dijalankan bot secara otomatis memakai password bocor dari situs lain → pakai password unik + 2FA.
                   - Ajak komen: "Mitos mana yang dulu kamu percaya?"
                   - Sumber: https://support.google.com/chrome/answer/95464
                             https://blog.chromium.org/2023/05/an-update-on-lock-icon.html
                             https://pages.nist.gov/800-63-4/sp800-63b.html
                             https://owasp.org/www-community/attacks/Credential_stuffing
```

### Day 69: Minggu, 7 Feb 2027

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : Backdoor xz (2024): Keterlambatan Setengah Detik yang Membongkar Backdoor di Linux
DURASI           : 2:00
TOPIK BERIKUTNYA : Worm npm — Kok `npm install` bisa mencuri token-mu?
BAHAN / SUMBER   : - Kronologi: 29 Mar 2024, Andres Freund (engineer Microsoft dan developer PostgreSQL) curiga login SSH memakan CPU tinggi dan lebih lambat ±0,5 detik. Ia menelusuri dan menemukan backdoor di library xz/liblzma versi 5.6.0 dan 5.6.1 (CVE-2024-3094, skor CVSS 10).
                   - Latar: pelaku beridentitas "Jia Tan" membangun kepercayaan sebagai kontributor selama ±2 tahun sampai mendapat hak rilis; backdoor disembunyikan di file uji dan proses build.
                   - Ketahuan sebelum masuk ke rilis stabil kebanyakan distro Linux.
                   - Pelajaran: keamanan supply chain open source, beban maintainer sukarelawan, dan pentingnya engineer yang penasaran pada anomali kecil.
                   - Sumber: https://www.openwall.com/lists/oss-security/2024/03/29/4
                             https://www.cisa.gov/news-events/alerts/2024/03/29/reported-supply-chain-compromise-affecting-xz-utils-data-compression-library-cve-2024-3094
                             https://en.wikipedia.org/wiki/XZ_Utils_backdoor
```

### Day 70: Senin, 8 Feb 2027

```text
JENIS KONTEN     : Berita Teknologi
TOPIK            : Worm npm 2025–2026: Kok `npm install` Bisa Mencuri Token Developer?
DURASI           : 1:30
TOPIK BERIKUTNYA : Algoritma FYP — Gimana TikTok memilih video buat kamu?
BAHAN / SUMBER   : - Latar: Sep 2025, worm Shai-Hulud menyebar sendiri lewat akun maintainer npm yang dibobol: mencuri token npm/GitHub/cloud, lalu memakai token itu untuk menerbitkan versi berbahaya paket lain. GitHub menghapus 500+ paket.
                   - Gelombang 2026 (cek detail di sumber): serangan bergaya Shai-Hulud berlanjut, misalnya lewat pipeline CI paket @tanstack/* (Mei 2026), varian yang menginfeksi ±1.300 paket, namespace @redhat-cloud-services (Jun 2026), dan AsyncAPI (Jul 2026).
                   - Konteks: OWASP Top 10:2025 memasukkan "Software Supply Chain Failures" sebagai kategori baru di peringkat 3.
                   - Yang harus dilakukan: commit lockfile dan pakai `npm ci`; pertimbangkan `--ignore-scripts`; aktifkan 2FA; pakai token granular berumur pendek atau trusted publishing; rotasi token kalau terdampak; audit dependensi.
                   - Sumber: https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/
                             https://unit42.paloaltonetworks.com/monitoring-npm-supply-chain-attacks/
                             https://thehackernews.com/2026/04/self-propagating-supply-chain-worm.html
                             https://owasp.org/Top10/2025/
```

---

## Minggu 11 · Day 71–77 · 9–15 Feb 2027 — Algoritma di Balik Aplikasi

### Day 71: Selasa, 9 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Algoritma FYP: Gimana TikTok Memilih Video Buat Kamu?
DURASI           : 1:30
TOPIK BERIKUTNYA : Google Maps — Gimana Maps tahu jalanan macet dan kapan kamu sampai?
BAHAN / SUMBER   : - Penjelasan resmi TikTok: rekomendasi dihitung dari interaksi pengguna (video yang di-like, dibagikan, dikomentari, ditonton sampai habis, di-skip; akun yang diikuti), informasi video (caption, suara, hashtag), dan pengaturan perangkat/akun (bahasa, negara). Tiap sinyal diberi bobot; menonton sampai selesai termasuk sinyal kuat.
                   - Fakta menarik: jumlah followers dan riwayat video viral bukan faktor langsung dalam rekomendasi.
                   - TikTok juga sengaja menyelipkan variasi supaya FYP tidak monoton (menghindari filter bubble).
                   - Sudut engineer: ini sistem rekomendasi; kandidat dikumpulkan, diberi skor oleh model, lalu diurutkan.
                   - Sumber: https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you
                             https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content
```

### Day 72: Rabu, 10 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Google Maps: Gimana Maps Tahu Jalanan Macet dan Kapan Kamu Sampai?
DURASI           : 1:30
TOPIK BERIKUTNYA : Ojol Cari Driver — Gimana aplikasi nemuin driver terdekat dalam hitungan detik?
BAHAN / SUMBER   : - Poin: data lokasi anonim dari banyak ponsel yang sedang bergerak → kecepatan rata-rata tiap ruas jalan saat ini; digabung dengan pola lalu lintas historis (jam dan hari yang sama), info resmi (penutupan jalan), dan laporan pengguna.
                   - AI: kolaborasi DeepMind dan Google Maps memakai Graph Neural Network (jalan dimodelkan sebagai graf) dan mengurangi ETA yang meleset hingga ±50% di sejumlah kota; Jakarta termasuk kota yang disebut (angka per kota berbeda, cek).
                   - Rute: algoritma mencari jalur tercepat (bukan terpendek) di graf jalan.
                   - Sumber: https://blog.google/products/maps/google-maps-101-how-ai-helps-predict-traffic-and-determine-routes/
                             https://deepmind.google/discover/blog/traffic-prediction-with-advanced-graph-neural-networks/
                             https://arxiv.org/abs/2108.11482
```

### Day 73: Kamis, 11 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Ojol: Gimana Aplikasi Nemuin Driver Terdekat dalam Hitungan Detik?
DURASI           : 1:30
TOPIK BERIKUTNYA : Autoscaling — Gimana aplikasi kuat diserbu order menjelang buka puasa?
BAHAN / SUMBER   : - Masalah: menghitung jarak ke ribuan driver satu per satu terlalu lambat.
                   - Poin: peta dibagi menjadi sel (grid). Contoh yang dipublikasikan: H3 dari Uber (sel heksagon berlapis). Driver dikelompokkan per sel → cukup cari di sel kamu dan sel tetangga, lalu urutkan berdasarkan perkiraan waktu tiba (bukan jarak garis lurus) dan faktor lain.
                   - Lokasi driver diperbarui setiap beberapa detik → disimpan di penyimpanan cepat (memori).
                   - Jangan klaim detail internal aplikasi ojol tertentu; pakai contoh publik (Uber H3, geohash).
                   - Analogi: mencari teman di stadion; cek tribunmu dan tribun sebelah, bukan seluruh stadion.
                   - Sumber: https://www.uber.com/blog/h3/
                             https://h3geo.org/docs/
```

### Day 74: Jumat, 12 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Autoscaling: Gimana Aplikasi Kuat Diserbu Order Menjelang Buka Puasa?
DURASI           : 1:30
TOPIK BERIKUTNYA : HP Menguping — Benarkah HP diam-diam mendengar obrolanmu buat iklan?
BAHAN / SUMBER   : - Timing: pekan pertama Ramadan.
                   - Poin: horizontal scaling = menambah atau mengurangi jumlah server/container secara otomatis berdasarkan metrik (CPU, jumlah request, panjang antrean). Scaling terjadwal/prediktif untuk lonjakan yang bisa ditebak (jam buka puasa, sahur); scaling reaktif untuk yang tak terduga.
                   - Jebakan: server baru butuh waktu siap (warm-up) → naikkan sebelum puncak; database tidak semudah itu di-scale (video Bottleneck); turunkan perlahan (cooldown).
                   - Jangan klaim angka internal aplikasi tertentu.
                   - Analogi: penjual takjil yang menambah karyawan sebelum jam lima sore.
                   - Sumber: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html
                             https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-predictive-scaling.html
                             https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/
```

### Day 75: Sabtu, 13 Feb 2027

```text
JENIS KONTEN     : Mitos vs Fakta
TOPIK            : "HP Diam-diam Menguping Obrolanmu Buat Iklan": Mitos atau Fakta?
DURASI           : 1:15
TOPIK BERIKUTNYA : Algoritma Jodoh — Algoritma pemenang Nobel di balik aplikasi kencan?
BAHAN / SUMBER   : - Mitos: "baru ngobrolin sepatu, langsung muncul iklan sepatu, pasti HP menguping."
                   - Fakta (riset Northeastern University, 2018): menguji >17.000 aplikasi Android populer, tidak menemukan aplikasi yang diam-diam mengirim rekaman audio; tapi menemukan aplikasi yang mengirim tangkapan atau rekaman layar ke pihak ketiga tanpa sepengetahuan pengguna.
                   - Kenapa iklan terasa "nyambung": riwayat pencarian dan browsing, lokasi, aplikasi yang dipakai, data orang di sekitarmu, dan model prediksi yang sangat akurat.
                   - Batasan: studinya hanya Android dan tidak membuktikan "mustahil". Android 12+ dan iOS 14+ menampilkan indikator saat mikrofon aktif.
                   - Tips: cek izin mikrofon dan hapus aplikasi yang tidak perlu.
                   - Ajak komen: "Kamu pernah merasa 'didengar' HP?"
                   - Sumber: https://news.northeastern.edu/2018/07/06/is-your-smartphone-spying-on-you/
                             https://gizmodo.com/these-academics-spent-the-last-year-testing-whether-your-phone-is-secretly-listening-to-you-1826961188
```

### Day 76: Minggu, 14 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Algoritma Jodoh: Algoritma Pemenang Nobel di Balik Aplikasi Kencan
DURASI           : 1:30
TOPIK BERIKUTNYA : Fakta QR Code — Kenapa QR tetap bisa discan walau sobek?
BAHAN / SUMBER   : - Timing: Hari Valentine.
                   - Masalah "stable matching": memasangkan dua kelompok sesuai preferensi tanpa ada dua orang yang sama-sama lebih memilih satu sama lain daripada pasangannya sekarang.
                   - Algoritma Gale–Shapley (1962): satu pihak mengajukan ke pilihan teratasnya; pihak lain menyimpan tawaran terbaik sementara dan menolak sisanya; ulangi sampai semua berpasangan → hasilnya dijamin stabil. Demo dengan 3 pasang kartu.
                   - Nobel Ekonomi 2012 untuk Alvin Roth dan Lloyd Shapley (teori alokasi stabil dan desain pasar); dipakai untuk penempatan dokter residen di AS dan penerimaan sekolah di beberapa kota.
                   - Aplikasi kencan: Hinge (2018) menyebut fitur "Most Compatible" memakai versi modifikasi Gale–Shapley.
                   - Sumber: https://www.nobelprize.org/prizes/economic-sciences/2012/summary/
                             https://www.engadget.com/2018/07/12/hinge-most-compatible-suggestions/
                             https://en.wikipedia.org/wiki/Stable_marriage_problem
```

### Day 77: Senin, 15 Feb 2027

```text
JENIS KONTEN     : Fakta Unik
TOPIK            : 4 Fakta Unik QR Code: Kenapa Tetap Bisa Discan Walau Sobek atau Ada Logo di Tengah?
DURASI           : 1:15
TOPIK BERIKUTNYA : Cara Kerja AI — Gimana ChatGPT bisa "menjawab" pertanyaanmu?
BAHAN / SUMBER   : - QR Code diciptakan Denso Wave (Jepang) tahun 1994 untuk melacak komponen di pabrik otomotif.
                   - Error correction (Reed–Solomon): level L, M, Q, H bisa memulihkan ±7%, 15%, 25%, 30% data yang rusak → logo di tengah aman selama tidak melebihi kapasitas itu.
                   - Satu QR Code bisa memuat hingga 7.089 digit angka.
                   - Denso Wave memegang paten tapi memilih tidak menerapkannya, sehingga semua orang bebas memakai QR. QRIS di Indonesia memakai standar QR pembayaran EMVCo (Bank Indonesia, 2019).
                   - Ajak komen: "Kamu sehari scan QRIS berapa kali?"
                   - Sumber: https://www.qrcode.com/en/history/
                             https://www.qrcode.com/en/about/error_correction.html
                             https://www.qrcode.com/en/about/version.html
                             https://www.qrcode.com/en/faq.html
                             https://www.bi.go.id/id/publikasi/ruang-media/news-release/Pages/sp_216219.aspx
```

---

## Minggu 12 · Day 78–84 · 16–22 Feb 2027 — AI untuk Engineer

### Day 78: Selasa, 16 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Cara Kerja AI Chatbot: Gimana ChatGPT "Menjawab" Pertanyaanmu?
DURASI           : 2:00
TOPIK BERIKUTNYA : Halusinasi AI — Kenapa AI bisa salah dengan sangat percaya diri?
BAHAN / SUMBER   : - Poin: teks dipecah menjadi token (potongan kata). Model bahasa besar (LLM) dilatih pada sangat banyak teks untuk menebak token berikutnya; jawaban dibangun satu token demi satu token.
                   - Mesinnya: arsitektur Transformer (2017) dengan mekanisme attention, yaitu tiap kata "melihat" kata lain yang relevan dalam konteks.
                   - Setelah pre-training: dilatih lagi supaya mengikuti instruksi dan lebih aman (fine-tuning dengan umpan balik manusia).
                   - Twist: LLM tidak "mencari di database", tapi menghasilkan teks yang paling mungkin. Inilah akar halusinasi (video berikutnya).
                   - Sebut generik: ChatGPT, Claude, Gemini, dan lainnya bekerja dengan prinsip serupa.
                   - Sumber: https://arxiv.org/abs/1706.03762
                             https://platform.openai.com/tokenizer
                             https://www.youtube.com/watch?v=zjkBMFhNj_g (Andrej Karpathy, "Intro to Large Language Models")
```

### Day 79: Rabu, 17 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Halusinasi AI: Kenapa AI Bisa Salah dengan Sangat Percaya Diri?
DURASI           : 1:30
TOPIK BERIKUTNYA : RAG vs Fine-tuning — Gimana bikin AI paham data perusahaanmu?
BAHAN / SUMBER   : - Kasus nyata: 2023, pengacara di New York dijatuhi sanksi (denda US$5.000) karena mengajukan dokumen pengadilan berisi kutipan kasus fiktif buatan ChatGPT (perkara Mata v. Avianca).
                   - Kenapa terjadi: model dilatih menebak teks yang paling mungkin, bukan memeriksa fakta. Riset OpenAI (Sep 2025) menjelaskan pelatihan dan evaluasi cenderung memberi nilai pada "menebak" ketimbang mengaku tidak tahu.
                   - Cara mengurangi: beri sumber/konteks (RAG, video berikutnya), minta kutipan, verifikasi manual untuk hal penting, gunakan tools.
                   - Sumber: https://openai.com/index/why-language-models-hallucinate/
                             https://www.reuters.com/legal/new-york-lawyers-sanctioned-using-fake-chatgpt-cases-legal-brief-2023-06-22/
```

### Day 80: Kamis, 18 Feb 2027

```text
JENIS KONTEN     : Perbandingan
TOPIK            : RAG vs Fine-tuning: Cara Bikin AI Paham Data Perusahaanmu Sendiri
DURASI           : 1:30
TOPIK BERIKUTNYA : AI Agent — Saat AI bukan cuma ngobrol, tapi bisa pakai tools?
BAHAN / SUMBER   : - RAG (Retrieval-Augmented Generation): dokumen dipotong dan diubah jadi embedding (vektor makna) → saat ada pertanyaan, cari potongan paling relevan → tempel ke prompt → AI menjawab berdasarkan potongan itu dan bisa menyertakan sumbernya.
                   - Fine-tuning: melatih ulang model dengan contoh-contoh supaya gaya, format, atau perilakunya berubah.
                   - Ronde: data sering berubah, butuh kutipan sumber, biaya dan waktu, mengubah gaya/format jawaban.
                   - Vonis: pengetahuan yang sering berubah → RAG; gaya/format/tugas khusus → fine-tuning; banyak sistem memakai keduanya.
                   - Analogi: ujian open book (RAG) vs belajar intensif sampai hafal pola soal (fine-tuning).
                   - Sumber: https://arxiv.org/abs/2005.11401
                             https://aws.amazon.com/what-is/retrieval-augmented-generation/
```

### Day 81: Jumat, 19 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : AI Agent & MCP: Saat AI Bukan Cuma Ngobrol, Tapi Bisa Pakai Tools
DURASI           : 1:30
TOPIK BERIKUTNYA : Prompt Injection — Gimana AI bisa "dihipnotis" lewat teks tersembunyi?
BAHAN / SUMBER   : - Poin: agent = model + tools + loop: rencanakan → panggil tool (baca file, cari di web, jalankan kode, panggil API) → lihat hasilnya → ulangi sampai tugas selesai.
                   - MCP (Model Context Protocol): standar terbuka yang diperkenalkan Anthropic (Nov 2024) supaya aplikasi AI bisa tersambung ke tools dan data dengan satu cara; dokumentasinya mengibaratkan MCP seperti port USB-C untuk aplikasi AI.
                   - Risiko: agent dengan hak akses besar bisa salah langkah → beri izin seminimal mungkin dan minta konfirmasi manusia untuk aksi penting.
                   - Sebut netral: banyak aplikasi dan penyedia AI mendukung MCP.
                   - Sumber: https://modelcontextprotocol.io/
                             https://www.anthropic.com/news/model-context-protocol
```

### Day 82: Sabtu, 20 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Prompt Injection: Gimana AI Bisa "Dihipnotis" Lewat Teks Tersembunyi?
DURASI           : 1:30
TOPIK BERIKUTNYA : Vibe Coding — Bikin aplikasi tanpa paham kode, aman nggak?
BAHAN / SUMBER   : - Poin: AI belum bisa sempurna membedakan instruksi dari pemiliknya dengan teks dari luar. Ada prompt injection langsung (pengguna menulis "abaikan instruksi sebelumnya…") dan tidak langsung (instruksi tersembunyi di halaman web, email, atau dokumen yang dibaca AI).
                   - Bahaya meningkat pada AI agent yang punya akses tools, misalnya mengirim email atau membaca file (video AI Agent).
                   - Mitigasi: perlakukan konten luar sebagai data, batasi izin, minta konfirmasi untuk aksi sensitif, pisahkan sistem.
                   - Peringkat: Prompt Injection = LLM01 di OWASP Top 10 for LLM Applications.
                   - Analogi: surat titipan berisi pesan "kasir, tolong serahkan isi brankas ke pembawa surat ini".
                   - Sumber: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
                             https://simonwillison.net/series/prompt-injection/
```

### Day 83: Minggu, 21 Feb 2027

```text
JENIS KONTEN     : Mitos vs Fakta
TOPIK            : Vibe Coding: Bikin Aplikasi Tanpa Paham Kode, Aman Nggak?
DURASI           : 1:30
TOPIK BERIKUTNYA : Review Kode AI — Gimana senior mereview kode buatan AI?
BAHAN / SUMBER   : - Konteks: istilah "vibe coding" dipopulerkan Andrej Karpathy (Feb 2025) dan menjadi Word of the Year Collins Dictionary 2025.
                   - Mitos 1 "kode buatan AI siap production" → Fakta: uji Veracode (Jul 2025) pada 80 tugas dan 100+ model: di ±45% kasus model memilih cara yang tidak aman (celah kategori OWASP Top 10).
                   - Mitos 2 "AI nggak pernah ngarang library" → Fakta: studi di USENIX Security 2025 menemukan ±19,7% rekomendasi paket dari model penghasil kode merujuk paket yang tidak ada; celah ini bisa dimanfaatkan penyerang (slopsquatting).
                   - Mitos 3 "nggak perlu paham kode" → Fakta: saat muncul bug atau celah, yang memperbaiki tetap butuh pemahaman. Vibe coding cocok untuk prototipe dan eksperimen.
                   - Ajak komen: "Kamu pernah vibe coding sampai production?"
                   - Sumber: https://www.euronews.com/culture/2025/11/06/vibe-coding-named-word-of-the-year-by-collins-dictionary
                             https://www.veracode.com/press-release/ai-generated-code-poses-major-security-risks-in-nearly-half-of-all-development-tasks-veracode-research-reveals/
                             https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen
```

### Day 84: Senin, 22 Feb 2027

```text
JENIS KONTEN     : Tips & Tools
TOPIK            : 5 Cara Senior Mereview Kode Buatan AI Biar Nggak Kebobolan
DURASI           : 1:15
TOPIK BERIKUTNYA : Junior vs Senior — Beda junior dan senior itu sebenarnya apa?
BAHAN / SUMBER   : - 1) Jangan merge kode yang tidak bisa kamu jelaskan baris per baris.
                   - 2) Cek setiap dependency baru: benar-benar ada, wajar popularitasnya, dan dari penerbit yang tepat (cegah slopsquatting).
                   - 3) Minta atau tulis test, jalankan, lalu coba kasus ekstrem (input kosong, angka negatif, data besar).
                   - 4) Cek keamanan: input divalidasi, query pakai parameter (video SQL Injection), tidak ada secret di kode, pesan error tidak membocorkan detail.
                   - 5) Kecilkan perubahan: minta AI membuat diff kecil per fitur supaya mudah direview.
                   - Sumber: https://google.github.io/eng-practices/review/reviewer/looking-for.html
                             https://owasp.org/www-project-code-review-guide/
                             https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen
```

---

## Minggu 13 · Day 85–90 · 23–28 Feb 2027 — Cara Berpikir Senior Engineer

### Day 85: Selasa, 23 Feb 2027

```text
JENIS KONTEN     : Lainnya: Karier
TOPIK            : Junior vs Senior Engineer: Bedanya Bukan di Lama Kerja
DURASI           : 1:30
TOPIK BERIKUTNYA : Balik ke Monolith — Kenapa banyak tim meninggalkan microservices?
BAHAN / SUMBER   : - Junior menyelesaikan tugas yang jelas; senior menangani masalah yang belum jelas dan memecahnya untuk tim.
                   - Senior memikirkan trade-off dan dampak jangka panjang; jawaban favoritnya "tergantung", lalu menjelaskan tergantung apa.
                   - Senior memperbesar dampak lewat orang lain: mereview, mentoring, menulis dokumentasi.
                   - Senior memegang masalah sampai tuntas: monitoring, insiden, komunikasi ke pihak non-teknis.
                   - Tambahkan contoh nyata dari pengalamanmu sendiri (personal branding).
                   - Ajak komen: "Menurutmu kamu di level mana?"
                   - Sumber: https://www.kitchensoap.com/2012/10/25/on-being-a-senior-engineer/
                             https://staffeng.com/
```

### Day 86: Rabu, 24 Feb 2027

```text
JENIS KONTEN     : Perbandingan
TOPIK            : Monolith vs Microservices: Kenapa Banyak Tim Balik ke Monolith?
DURASI           : 1:30
TOPIK BERIKUTNYA : Retry Storm — Kenapa "coba lagi" justru bikin server makin tumbang?
BAHAN / SUMBER   : - Monolith: satu aplikasi, satu deploy; sederhana dan cepat untuk tim kecil, tapi bisa membesar dan saling terikat.
                   - Microservices: banyak layanan kecil yang di-deploy terpisah; skala dan tim independen, tapi ada biayanya: jaringan, observability, konsistensi data, operasional.
                   - Kasus: tim Prime Video (2023) memindahkan layanan pemantauan kualitas video dari arsitektur microservices/serverless terdistribusi ke satu proses (monolith) dan memangkas biaya infrastrukturnya >90%. Konteksnya satu layanan, bukan seluruh Amazon.
                   - Martin Fowler, "MonolithFirst": mulai dari monolith, pecah setelah batas-batasnya jelas.
                   - Vonis: arsitektur mengikuti ukuran tim dan masalah (Conway's Law), bukan tren.
                   - Ajak komen: "Kantormu monolith atau microservices?"
                   - Sumber: https://martinfowler.com/bliki/MonolithFirst.html
                             https://www.infoq.com/news/2023/05/prime-ec2-ecs-saves-costs/
                             https://martinfowler.com/articles/microservices.html
```

### Day 87: Kamis, 25 Feb 2027

```text
JENIS KONTEN     : Cara Kerja
TOPIK            : Retry Storm: Kenapa "Coba Lagi" Justru Bikin Server Makin Tumbang?
DURASI           : 1:30
TOPIK BERIKUTNYA : Insiden GitHub — Gimana gangguan 43 detik bikin GitHub bermasalah 24 jam?
BAHAN / SUMBER   : - Poin: saat server melambat, semua klien mengulang request bersamaan → beban berlipat → makin lambat → makin banyak retry (lingkaran setan). Bisa terjadi juga saat layanan baru pulih (ingat Microsoft 365).
                   - Solusi: exponential backoff + jitter (jeda makin panjang dan acak), batas jumlah retry, timeout yang masuk akal, circuit breaker (closed → open → half-open: berhenti memanggil layanan yang sedang sakit, lalu mencoba pelan-pelan), dan load shedding.
                   - Analogi: semua orang menelepon ulang call center yang sedang sibuk.
                   - Sumber: https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/
                             https://martinfowler.com/bliki/CircuitBreaker.html
                             https://sre.google/sre-book/addressing-cascading-failures/
```

### Day 88: Jumat, 26 Feb 2027

```text
JENIS KONTEN     : Lainnya: Studi Kasus Insiden
TOPIK            : Gangguan Jaringan 43 Detik yang Bikin GitHub Bermasalah 24 Jam (2018)
DURASI           : 1:45
TOPIK BERIKUTNYA : Technical Debt — Kenapa utang kode bunganya dibayar pakai lembur?
BAHAN / SUMBER   : - Kronologi (21 Okt 2018): maintenance penggantian perangkat optik 100G memutus koneksi antara hub jaringan dan data center utama di US East selama 43 detik.
                   - Efek: sistem failover database (Orchestrator) memindahkan primary MySQL ke data center lain. Dalam 43 detik itu kedua sisi menerima tulisan yang tidak dimiliki sisi lain → tidak bisa langsung dipindah balik tanpa kehilangan data.
                   - Keputusan: GitHub memprioritaskan integritas data di atas ketersediaan → layanan menurun 24 jam 11 menit. Data repositori Git tetap aman; yang terdampak metadata seperti issue dan pull request.
                   - Konsep: CAP; saat jaringan terpisah (partition), sistem harus memilih tetap konsisten atau tetap tersedia.
                   - Sumber: https://github.blog/news-insights/company-news/oct21-post-incident-analysis/
                             https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/
```

### Day 89: Sabtu, 27 Feb 2027

```text
JENIS KONTEN     : Lainnya: Dunia Kerja
TOPIK            : Technical Debt: Utang Kode yang Bunganya Dibayar Pakai Lembur
DURASI           : 1:30
TOPIK BERIKUTNYA : Pelajaran Senior — Pelajaran apa yang bikin saya jadi senior engineer?
BAHAN / SUMBER   : - Asal istilah: Ward Cunningham (1992); kode jalan pintas ibarat berutang, bunganya = waktu ekstra setiap kali kode itu diubah.
                   - Kuadran Martin Fowler: sengaja vs tidak sengaja × ceroboh vs bijak. Tidak semua utang itu buruk, misalnya demi rilis cepat lalu segera dilunasi.
                   - Cara senior mengelola: catat dan buat terlihat (backlog), cicil sedikit demi sedikit tiap sprint, "boy scout rule" (tinggalkan kode lebih bersih dari saat ditemukan), jelaskan ke PM dalam bahasa dampak bisnis (waktu rilis, bug, insiden).
                   - Ajak komen: "Utang teknis paling parah yang pernah kamu temui?"
                   - Sumber: https://martinfowler.com/bliki/TechnicalDebt.html
                             https://martinfowler.com/bliki/TechnicalDebtQuadrant.html
                             http://c2.com/doc/oopsla92.html (Ward Cunningham, OOPSLA 1992)
```

### Day 90: Minggu, 28 Feb 2027

```text
JENIS KONTEN     : Lainnya: Karier
TOPIK            : 7 Pelajaran yang Bikin Saya Jadi Senior Engineer (Nggak Diajarin di Kampus)
DURASI           : 2:00
TOPIK BERIKUTNYA : 
BAHAN / SUMBER   : - Format personal, penutup musim 90 hari: ceritakan pengalamanmu sendiri lintas frontend, backend, DevOps, mobile, dan cloud.
                   - Kerangka poin (sesuaikan): 1) baca pesan error sampai habis; 2) ukur dulu sebelum mengoptimasi; 3) solusi paling sederhana yang benar biasanya menang; 4) tulis kode untuk pembaca berikutnya; 5) catat keputusan teknis (Architecture Decision Record); 6) insiden adalah guru terbaik, bukan aib (postmortem blameless); 7) bicara dengan bahasa dampak bisnis.
                   - Ajak penonton mengusulkan topik musim berikutnya di komentar.
                   - Sumber: https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
                             https://sre.google/sre-book/postmortem-culture/
```

---

## Topik cadangan

Untuk menukar hari yang kurang cocok atau mengisi slot berita. Tulis ulang ke format lima kolom sebelum dipakai.

- **Cara Kerja** — End-to-End Encryption: kenapa WhatsApp pun nggak bisa membaca chatmu? (Signal Protocol, whitepaper keamanan WhatsApp)
- **Berita Teknologi** — PP 33/2026, aturan turunan UU PDP: denda administratif sampai 2% pendapatan tahunan; developer wajib tahu apa? (cek status Lembaga PDP terbaru)
- **Tips & Tools** — Core Web Vitals: 3 angka (LCP, INP, CLS) yang menentukan website-mu dianggap cepat oleh Google.
- **Cara Kerja** — Serverless & cold start: kenapa request pertama selalu lebih lambat?
- **Cara Kerja** — Deep link: kok klik link toko online langsung membuka aplikasinya? (Android App Links, iOS Universal Links)
- **Cara Kerja** — Region & Availability Zone: kenapa satu data center terbakar nggak harus bikin aplikasi mati? (kebakaran OVHcloud Strasbourg, Maret 2021)
- **Perbandingan** — Concurrency vs Parallelism: sama-sama "barengan", bedanya apa?
- **Perbandingan** — REST vs GraphQL vs gRPC: pilih API yang mana?
- **Cara Kerja** — Connection pool: kenapa server bisa kehabisan koneksi database? (panduan pool sizing HikariCP)
- **Cara Kerja** — Flaky test: test yang kadang lulus kadang gagal, dan kenapa itu berbahaya (Google Testing Blog, 2016)
