# Mascot Character Rigs (`character/man` & `character/woman`)

Folder ini berisi 2 Master Character Rig kartun 2D (vektor SVG) untuk Remotion yang berbagi antarmuka props, 32 ekspresi, 28 pose, 24 bentuk mulut (lip-sync), dan 5 siklus gerak (`idle`, `still`, `walk`, `run`, `dance`):

1. **Karakter Pria (`character/man`)**:
   - Dokumentasi: [`character/man/README.md`](./man/README.md)
   - Model Sheet: [`character/man/model-sheet.png`](./man/model-sheet.png)
   - Import:
     ```tsx
     import { Character as ManCharacter } from "../character/man";
     ```

2. **Karakter Wanita Berhijab (`character/woman`)**:
   - Dokumentasi: [`character/woman/README.md`](./woman/README.md)
   - Model Sheet: [`character/woman/model-sheet.png`](./woman/model-sheet.png)
   - Import:
     ```tsx
     import { Character as WomanCharacter } from "../character/woman";
     ```

3. **Import Gabungan dari `../character`**:
   ```tsx
   import { ManCharacter, WomanCharacter } from "../character";
   ```
