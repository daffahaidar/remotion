---
name: script-dubbing
description: MANDATORY whenever writing, revising, timing, or reviewing narration for a video in this repo — script_dubbing.md, voice-over or dubbing lines, "Detik mm:ss - mm:ss" segments, or narration-driven animation timing. Guarantees every timed line can be spoken at a calm pace inside its window (syllable budget, pauses, numbers written as words) and verifies it with src/content/shared/check-dubbing.mjs.
---

# Script dubbing: every line must fit its window

User rule (2026-11-24): whoever records the voice-over must get a realistic amount of time for every line. A window like `00:12 - 00:15` (3 s) must never hold a sentence that cannot be said in 3 s. The agent-neutral version of this rule is section 4 step 8 of `src/content/PROMPT_TECH_VIDEO.md`; keep both in sync.

## Budget

- At most **5.5 syllables per second**: a calm, clear explainer pace. Never count on the dubber rushing.
- Pauses cost time: `...` mid-line = 0.5 s; `,` `:` `;` `?` `!` or a sentence end mid-line = 0.2 s.
- Acronyms are spelled out: DNS = 3, HTTP = 4, HTTPS = 5, IP = 2, OK = 2. A dot inside a word is read ("google.com" = google dot com).
- Quick table: 1 s ≈ 5 syllables · 2 s ≈ 10 · 3 s ≈ 15 · 4 s ≈ 21 · 6 s ≈ 32 (minus ~1 per comma).
- Write numbers as spoken words ("dua ratus OK"). Never make the dubber read IPs, hashes, or long numbers: show them on screen instead.
- Expect ~1.8–2.1 words per second overall, with speech filling ~80% of the runtime. Leave the rest as natural pauses; don't pad it with extra words.

## Workflow

1. Draft one idea per line from the visual beats; on-screen text carries the details the narration drops.
2. Run `node src/content/shared/check-dubbing.mjs src/content/<slug>/script_dubbing.md`.
3. Fix every ✗ line, in this order:
   1. shorten the sentence;
   2. move the segment boundary, then shift the matching animation cue constants so each element still appears exactly when it is spoken;
   3. lengthen the scene (even seconds; update `SCENE_SECONDS`, the video's `SONGS` entry in `src/content/shared/generate-audio.mjs`, and regenerate the music).

   Never solve it by asking for faster speech.
4. Re-run until the checker prints `✓ 0 baris terlalu padat`, and put its summary line in the final report.

The checker's syllable count is an estimate (vowel groups with ai/au/oi merged). If a line passes only barely, trim one more word.

## Examples

| Window | ✗ Too dense | ✓ Fits |
| --- | --- | --- |
| 2 s | "Tahun 1983, lahirlah solusinya: DNS." (≈ 4 s) | "Lalu lahirlah **DNS**!" (the year stays on screen) |
| 2 s | "Jawabannya ada di... cara kerja internet!" (≈ 3 s) | "Ini cara kerja **internet**!" |
| 3 s | "Pertama, kamu ketik google.com, lalu tekan Enter." (≈ 3.5 s) | "Kamu ketik **google.com**, lalu **Enter**." |

The standard channel-outro narration in the playbook (section 5) already fits its windows; keep the next-topic name short (≤ ~9 syllables).
