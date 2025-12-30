# DNA Portfolio v2 — Cinematic Scroll-Told Story

A premium, cinematic portfolio where experiences "transcribe" from a 3D DNA helix as you scroll. Inspired by [theyearofgreta.com](https://theyearofgreta.com/) with a sophisticated design system.

## Features

- **3D DNA Helix**: High-quality GLTF model that rotates and travels vertically with scroll
- **Floating Tiles**: Cinematic cards that drift and tilt with parallax effects
- **Post-Processing**: Bloom, vignette, depth of field, and subtle grain for a filmic look
- **Premium Typography**: Fraunces (serif) for headlines, Inter (grotesk) for body
- **Smooth Animations**: GSAP ScrollTrigger + Framer Motion for fluid interactions
- **Mobile Optimized**: Simplified 3D remains performant on all devices

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Three.js + @react-three/fiber + @react-three/drei
- @react-three/postprocessing (bloom, vignette, depth of field)
- GSAP + ScrollTrigger
- Framer Motion
- Zustand (global state)
- Vitest + React Testing Library

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add DNA Model

Download a DNA helix GLTF/GLB model (e.g., from [Sketchfab](https://sketchfab.com/3d-models/human-dna-746f0754e7cb45a4b54840e1b858b01d)) and place it at:

```
public/models/dna.glb
```

**Note**: If the model has a high polycount, consider decimating it in Blender or using glTF-Pipeline to optimize performance while maintaining visual quality.

### 3. Add Section Images

Add images for each portfolio section to `public/images/`:

- `about.jpg` — About Me section
- `vc-1.jpg`, `vc-2.jpg` — VC Portfolio items
- `research-1.jpg`, `research-2.jpg` — Research Portfolio items
- `design-1.jpg`, `design-2.jpg` — Design Portfolio items

**Design Tips**: 
- Prefer desaturated/monochrome images with teal accents
- Match the palette: deep blue-blacks with teal highlights
- Use high-quality images (Next.js Image will optimize)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm test` — Run tests with Vitest

## Design System

### Colors

- `--bg-0`: #0B0F14 (deep blue-black)
- `--bg-1`: #10161D
- `--ink-0`: #EAF2FF (near-white ink)
- `--ink-1`: #9FB2C8 (muted copy)
- `--accent-0`: #56D6C7 (teal/seafoam)
- `--accent-1`: #7AA7A1 (desaturated teal)

### Typography

- **Headlines**: Fraunces (700/800 weight)
- **Body/UI**: Inter (400/600 weight)

## Project Structure

```
src/
├── app/
│   ├── fonts.ts          # Google Fonts (Fraunces, Inter)
│   ├── globals.css        # Design tokens + cinematic styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main portfolio page
├── components/
│   ├── HelixScene.tsx     # 3D DNA model + post-processing
│   ├── Tile.tsx           # Floating card component
│   ├── TileCloud.tsx      # Tile orchestration
│   └── ScrollOrchestrator.tsx  # GSAP scroll control
├── data/
│   └── sections.ts        # Portfolio section data
└── store/
    └── useScrollStore.ts  # Zustand scroll state
```

## Testing

All tests pass with Vitest:

```bash
npm test
```

Tests include:
- Store state management
- Component rendering
- Image handling
- Reduced motion fallbacks

## Performance

- **3D Model**: Optimized GLTF with material caching
- **Images**: Next.js Image optimization
- **Post-Processing**: Subtle effects (bloom, vignette) for cinematic feel without performance hit
- **Mobile**: Simplified geometry maintains 60fps

## Customization

### Adjust Helix Rotation

Edit `src/components/HelixScene.tsx`:

```tsx
group.current.rotation.y = progress * Math.PI * 2 * 3.5; // Change 3.5 to desired spins
```

### Modify Tile Spacing

Edit `src/components/ScrollOrchestrator.tsx`:

```tsx
segs.push({ heightVh: Math.max(16, delta * 280), id: s.id }); // Adjust 280 for more/less space
```

### Tweak Post-Processing

Edit `src/components/HelixScene.tsx` EffectComposer settings:

```tsx
<Bloom intensity={0.2} ... />  // Adjust intensity
<Vignette darkness={0.6} ... /> // Adjust darkness
```

## License

This project is private. Ensure any 3D models you use are properly licensed.

## Credits

- Design inspiration: [theyearofgreta.com](https://theyearofgreta.com/)
- DNA model: [Sketchfab Human DNA](https://sketchfab.com/3d-models/human-dna-746f0754e7cb45a4b54840e1b858b01d) (ensure proper licensing)
