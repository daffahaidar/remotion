export type SubtitleCue = {
	readonly startFrame: number;
	readonly endFrame: number;
	readonly text: string;
	readonly accent?: 'ssr' | 'csr' | 'nextjs' | 'default';
};

/**
 * Narration subtitles timed 1:1 with the 145-second (4350-frame @ 30fps) storyboard.
 * Serves both as Reels/Shorts kinetic captions and as a pacing guide when recording voice-over.
 */
export const SUBTITLE_CUES: readonly SubtitleCue[] = [
	// Scene 01 — Hook (0..360)
	{startFrame: 6, endFrame: 108, text: 'Pernah nggak, kamu buka website terus isinya langsung muncul?'},
	{startFrame: 112, endFrame: 224, text: 'Tapi di website lain, yang muncul malah loading muter-muter?'},
	{
		startFrame: 228,
		endFrame: 354,
		text: 'Nah, ini ada hubungannya sama SSR dan CSR!',
		accent: 'nextjs',
	},

	// Scene 02 — Analogi Restoran (360..810)
	{
		startFrame: 368,
		endFrame: 510,
		text: 'Sebelum kita bahas teknisnya, bayangin kamu lagi pesan makanan di restoran.',
	},
	{startFrame: 515, endFrame: 650, text: 'Ada dua cara restoran menyajikan makanan.'},
	{
		startFrame: 655,
		endFrame: 802,
		text: 'Dan ternyata, cara kerjanya mirip banget sama rendering website!',
		accent: 'ssr',
	},

	// Scene 03 — SSR (810..1410)
	{
		startFrame: 818,
		endFrame: 940,
		text: 'Pertama, Server-Side Rendering atau SSR.',
		accent: 'ssr',
	},
	{
		startFrame: 945,
		endFrame: 1085,
		text: 'Bayangin kamu pesan makanan, terus koki langsung memasak makananmu di dapur.',
		accent: 'ssr',
	},
	{
		startFrame: 1090,
		endFrame: 1225,
		text: 'Setelah selesai, pelayan langsung mengantarkannya ke meja.',
		accent: 'ssr',
	},
	{
		startFrame: 1230,
		endFrame: 1400,
		text: 'Jadi, ketika makanan datang, kamu nggak perlu menunggu lagi untuk mulai makan.',
		accent: 'ssr',
	},

	// Scene 04 — SSR Secara Teknis (1410..1860)
	{
		startFrame: 1418,
		endFrame: 1560,
		text: 'Di SSR, server memproses halaman dan menghasilkan HTML yang sudah berisi konten.',
		accent: 'ssr',
	},
	{
		startFrame: 1565,
		endFrame: 1698,
		text: 'HTML itu kemudian dikirim ke browser, sehingga pengguna bisa melihat konten lebih awal.',
		accent: 'ssr',
	},
	{
		startFrame: 1703,
		endFrame: 1852,
		text: 'Setelah itu, JavaScript melakukan hydration agar halaman menjadi interaktif.',
		accent: 'ssr',
	},

	// Scene 05 — CSR (1860..2400)
	{
		startFrame: 1868,
		endFrame: 1995,
		text: 'Nah, sekarang Client-Side Rendering atau CSR.',
		accent: 'csr',
	},
	{
		startFrame: 2000,
		endFrame: 2175,
		text: 'Kali ini, restoran memberikan bahan-bahan dan resepnya, tapi kamu sendiri yang memasak.',
		accent: 'csr',
	},
	{
		startFrame: 2180,
		endFrame: 2390,
		text: 'Jadi, ada proses tambahan sebelum makanan siap dinikmati.',
		accent: 'csr',
	},

	// Scene 06 — CSR Secara Teknis (2400..2850)
	{
		startFrame: 2408,
		endFrame: 2565,
		text: 'Pada CSR murni, browser menerima HTML awal yang minimal, lalu mengunduh & menjalankan JS.',
		accent: 'csr',
	},
	{
		startFrame: 2570,
		endFrame: 2708,
		text: 'Setelah itu, JavaScript membangun tampilan halaman di browser.',
		accent: 'csr',
	},
	{
		startFrame: 2713,
		endFrame: 2842,
		text: 'Makanya, kalau proses ini belum selesai, pengguna bisa melihat loading terlebih dahulu.',
		accent: 'csr',
	},

	// Scene 07 — Perbandingan (2850..3450)
	{
		startFrame: 2858,
		endFrame: 3045,
		text: 'Jadi apa bedanya? SSR membuat konten tersedia lebih awal karena HTML sudah disiapkan server.',
		accent: 'ssr',
	},
	{
		startFrame: 3050,
		endFrame: 3238,
		text: 'Sedangkan CSR mengandalkan browser untuk membangun tampilan setelah JavaScript dijalankan.',
		accent: 'csr',
	},
	{
		startFrame: 3243,
		endFrame: 3440,
		text: 'Tapi ingat, SSR bukan berarti selalu lebih cepat, dan CSR juga bukan berarti buruk.',
	},

	// Scene 08 — Plot Twist Next.js (3450..3900)
	{
		startFrame: 3458,
		endFrame: 3560,
		text: 'Eh, tapi ada satu hal menarik di Next.js!',
		accent: 'nextjs',
	},
	{
		startFrame: 3565,
		endFrame: 3748,
		text: 'App Router pakai Server Components default. Client Components tetap diprerender jadi HTML lalu di-hydrate!',
		accent: 'nextjs',
	},
	{
		startFrame: 3753,
		endFrame: 3892,
		text: "Jadi, 'use client' bukan berarti otomatis mematikan SSR!",
		accent: 'nextjs',
	},

	// Scene 09 — Closing (3900..4350)
	{
		startFrame: 3908,
		endFrame: 4075,
		text: 'Kesimpulannya, SSR & CSR punya kelebihan masing-masing. Pilih sesuai kebutuhan aplikasi kamu!',
	},
	{
		startFrame: 4080,
		endFrame: 4205,
		text: 'Sekarang kamu sudah tahu bedanya, kan?',
		accent: 'ssr',
	},
	{
		startFrame: 4210,
		endFrame: 4342,
		text: 'Jangan lupa follow untuk belajar teknologi lainnya!',
		accent: 'nextjs',
	},
];
