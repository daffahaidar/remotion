# Woman: Hijabi Master Character Rig (`character/woman`)

Rig karakter wanita berhijab 2D (vektor SVG) untuk Remotion. Mengenakan hijab *dusty rose* dengan ciput (*inner underscarf*), bros emas, tunik lengan panjang *teal/sage*, celana panjang *navy*, dan *sneakers* senada.

Karakter ini memiliki antarmuka props yang **100% identik** dengan karakter pria di [`../man`](../man/README.md), mendukung **32 ekspresi**, **28 pose**, **24 bentuk mulut (lip-sync)**, dan **5 siklus gerak (`idle`, `still`, `walk`, `run`, `dance`)**.

![Woman Model Sheet](model-sheet.png)

## Pemakaian dasar

```tsx
import {Character as WomanCharacter} from '../character/woman';
// atau: import {WomanCharacter} from '../character';

<WomanCharacter
  name="Co-Host"
  from={0}
  durationInFrames={3 * fps}
  pose="welcome"
  expression="happy"
  talking
  style={{translate: '880px 120px', scale: 0.9}}
/>
```

