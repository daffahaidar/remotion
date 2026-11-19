# Mascot Series

Template Remotion untuk seri video kartun 2D, dengan 12 rig karakter SVG dan 22 properti yang bisa dipakai ulang.

## Struktur

```
src/
├── index.ts            # registerRoot
├── Root.tsx            # semua komposisi (folder Studio: Rigs, Demo, ModelSheets, Props)
├── RigDemo.tsx         # contoh video 18 detik
├── ModelSheet.tsx      # model sheet per karakter (prop `character`)
├── PropertySheet.tsx   # katalog properti
├── content/            # taruh komposisi video/episode baru di sini
└── assets/
    ├── character/      # 12 rig karakter, lihat character/README.md
    └── property/       # 22 properti SVG, lihat property/README.md
public/audio/sfx/       # efek suara (staticFile('audio/sfx/pop.wav'))
```

Import karakter dan properti dari `src/`:

```tsx
import {BossCharacter} from './assets/character';
import {Laptop} from './assets/property';
```

## Perintah

```console
npm i                                   # install
npm run dev                             # Remotion Studio
npm run lint                            # eslint + tsc
npx remotion render RigDemo out/rig-demo.mp4
npx remotion still BossModelSheet out/boss.png
```

## Docs

- [Rig karakter](src/assets/character/README.md) · [Properti](src/assets/property/README.md)
- [Remotion fundamentals](https://www.remotion.dev/docs/the-fundamentals) · [Lisensi Remotion](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)
