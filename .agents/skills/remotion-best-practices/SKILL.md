---
name: remotion-best-practices
description: Router for all Remotion skills
version: 4.0.543
---

## Preserve user changes

Users may make edits in the code outside of the conversation.

If you detect a surprising change made in the meanwhile, don't overwrite it, assume it was intentional or ask for confirmation.

## Creating a video

If the user asks to make, create, or build a new video or composition, load [Create a new Remotion video](./remotion-create/REFERENCE.md), whether or not a Remotion project already exists.

> **Project Visual & Animation Standard**:
> - **Animation & UI Style**: Always design video animations in **Neuromorphism (Soft UI)** style by default (soft extruded/inset dual shadows, tactile spring motion, clean soft palettes) unless explicitly requested otherwise.
> - **Mandatory UI/UX Skill**: **Always read and follow the [UI/UX Pro Max skill](../ui-ux-pro-max/SKILL.md)** whenever creating any visual display, scene card, diagram, infographic, or layout.
> - **Reusable Assets**: Use the character rigs in [`src/assets/character/`](../../../src/assets/character/README.md) and reusable props in [`src/assets/property/`](../../../src/assets/property/README.md) when characters or props are needed.

## New project setup

If no Remotion project currently exists, load [Create a new Remotion project](./remotion-create/REFERENCE.md)

## React Markup Best Practices

If you are writing Remotion React Markup, load [Remotion Markup Best Practices](./remotion-markup/REFERENCE.md)

## 2D Cartoon & Mascot Character Animation

If you are creating or animating a 2D cartoon video, mascot character scene, expressions, lip-sync, or walk cycles, load the [Remotion 2D Cartoon skill](../remotion-2d-cartoon/SKILL.md) and reference the master character rig in [character/README.md](../../../src/assets/character/README.md).

## UI/UX Design, Icons (`react-icons`), Image Assets (`Unsplash`), GSAP & Content Folder (`src/content/*`)

**MANDATORY**: Whenever creating or styling any video composition, layout, or visual display, **always load and follow the [UI/UX Pro Max skill](../ui-ux-pro-max/SKILL.md)** and use **Neuromorphism (Soft UI)** as the default video animation style (together with the installed **GSAP skills** `greensock/gsap-skills` when complex motion is needed):
- **Default Style — Neuromorphism (Soft UI)**: Use unified matte canvases (`#e8eef5` light / `#1e232c` dark), dual opposing soft shadows (raised extruded cards & pressed inset tracks/wells), tactile spring/bezier shadow elevation animations, and crisp contrast accents.
- **Content Folder (`src/content/*`)**: Always save all video content code, scenes, illustrations, and raw content inside `src/content/*` (e.g., `src/content/MyTopic.tsx` or `src/content/my-topic/*`) and import them into `src/Root.tsx`.
- **Icons**: Always use [`react-icons`](https://github.com/react-icons/react-icons) (`npm install react-icons`) instead of raw text emojis.
- **UI/UX Reference**: Follow [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) principles (`../ui-ux-pro-max/SKILL.md`: **Neuromorphism default**, Bento Grid layouts, semantic color tokens, WCAG contrast, and strong typographic hierarchy).
- **Image Assets**: Source photographic or background images from **Unsplash** (`https://images.unsplash.com/photo-...`) and render them via `<Img>` or `<CanvasImage>` from `remotion`.
- **Complex Animations (`GSAP` / `greensock/gsap-skills`)**: When a scene requires complex multi-step choreography, advanced staggers, SVG path/morph animations, or physics/elastic eases, load the installed GSAP skills:
  - [GSAP Core](../gsap-core/SKILL.md) (`gsap-core`)
  - [GSAP Timeline](../gsap-timeline/SKILL.md) (`gsap-timeline`)
  - [GSAP React](../gsap-react/SKILL.md) (`gsap-react`)
  - [GSAP Plugins](../gsap-plugins/SKILL.md) (`gsap-plugins`)
  - [GSAP Utils](../gsap-utils/SKILL.md) (`gsap-utils`)
  - [GSAP Performance](../gsap-performance/SKILL.md) (`gsap-performance`)
  - [GSAP Frameworks](../gsap-frameworks/SKILL.md) (`gsap-frameworks`)
  - [GSAP ScrollTrigger](../gsap-scrolltrigger/SKILL.md) (`gsap-scrolltrigger`)
  In Remotion, always keep GSAP timelines paused (`gsap.timeline({ paused: true })`) and drive them deterministically from `useCurrentFrame()` via `tl.seek(frame / fps)` so frame rendering stays 100% deterministic.

## Maps

For static maps, animated routes and markers, geographic explainers, Mapbox, MapLibre, MapTiler, GeoJSON, or 3D geographic flyovers, load [Remotion Maps](./remotion-maps/REFERENCE.md).

## Multimedia

For achieving multimedia tasks in the browser, such as trimming, cropping videos, or getting metadata from them, load [Remotion Multimedia](./remotion-multimedia/REFERENCE.md)

For video matting, background removal, or placing content behind a subject,
load [Remotion Markup](./remotion-markup/REFERENCE.md).

## Interactivity

New markup is editable in Studio by default. When writing or restructuring markup, load [Interactivity Best Practices](./remotion-interactivity/REFERENCE.md).

## Open the preview

If the user asks to "make" a video, "create" a video, etc.
Don't render the video by default unless they are very explicit. They want to instead see an interactive preview.
As soon as the project can run, start Studio and open the preview in the browser before building or editing the composition. Keep it open while you work so the user can watch progress and steer.

### If you are using Cursor

Run Studio without `--no-open` so it opens the browser automatically:

```bash
npx remotion studio
```

### If you are using another agent client with an in-app browser

You can use the command above to let Studio open the browser, or run:

```bash
npx remotion studio --no-open
```

This will start a long-running process and print the server URL for the preview.  
If the server is already started, it will print the URL.
If you use `--no-open`, open the exact printed URL in the in-app browser and verify that Studio loads. Once a composition exists, verify that its video preview loads. If you cannot open it there, run Studio without `--no-open`.
You can visit a specific composition by navigating to `/[composition-id]`, for example `http://localhost:3000/MapAnimation`.

:::note
The Studio supports WebMCP tools.
:::

### If you do not have an in-app browser

This will open the Studio in the browser or refocus it if it is already open.

```bash
npx remotion studio
```

### More options

To launch a project in Remotion Studio, open its exact local URL, or configure Studio CLI flags, load [Remotion Studio](./remotion-studio/REFERENCE.md).

## Render the video

Only render if the user is very explicit in asking for it.  
E.g. "Render the video", "Export", "Give me the MP4".

The preview also has a more intuitive rendering interface, so consider using it instead of the command line for rendering.

```
npx remotion render
```

For more options, see [Rendering](./remotion-render/REFERENCE.md).

For advanced rendering beyond simple `npx remotion render`, see: [Rendering Best Practices](./remotion-render/REFERENCE.md)

## Captions

When working with Captions, load [Remotion Captions](./remotion-captions/REFERENCE.md).

## Creating a SaaS, automation or application

Use the [Remotion SaaS skill](./remotion-saas/REFERENCE.md) for knowledge about Remotion-powered SaaS apps, such as `<Player>`, rendering on Lambda, Vercel, Cloudflare, via Express.js, client-side rendering, or for finding the right SaaS template.

## Looking up Remotion APIs and documentation

To find and read current Remotion documentation, load [Remotion Docs](./remotion-docs/REFERENCE.md).

## Licensing

For Remotion license information, FAQs, terms, or buying a license, load [Remotion License](./remotion-license/REFERENCE.md).

## Upgrading

To upgrade Remotion, related packages, compatible Mediabunny packages, and installed Remotion Agent Skills, load [Remotion Upgrade](./remotion-upgrade/REFERENCE.md).
