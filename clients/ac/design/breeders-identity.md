# Breeders Genetics Club — Visual Identity System

> *The Vogue of Genetics. The Vice of Science.*

---

## Brand Positioning

Breeders Genetics Club is a **media-first genetics platform** — editorial authority meets cutting-edge science. Think **Wired meets Vogue**, but for the genetics-obsessed. Bold, unapologetic, premium.

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Void Black** | `#0A0A0F` | 10, 10, 15 | Primary background, hero sections |
| **Carbon** | `#141418` | 20, 20, 24 | Card backgrounds, secondary surfaces |
| **Smoke** | `#1E1E24` | 30, 30, 36 | Elevated surfaces, modals |

### Neon Accents

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Helix Cyan** | `#00F5FF` | 0, 245, 255 | Primary accent, CTAs, links |
| **Gene Pink** | `#FF2D92` | 255, 45, 146 | Secondary accent, highlights |
| **Mutant Violet** | `#9D4EDD` | 157, 78, 221 | Tertiary accent, gradients |
| **Bio Green** | `#00FF9F` | 0, 255, 159 | Success states, DNA helix motifs |

### Neutrals

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Pure White** | `#FFFFFF` | 255, 255, 255 | Headlines, primary text |
| **Silver** | `#B8B8C0` | 184, 184, 192 | Body text, secondary copy |
| **Graphite** | `#6B6B76` | 107, 107, 118 | Muted text, placeholders |

### Gradient Systems

```css
/* Hero Gradient */
--gradient-hero: linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #0A0A0F 100%);

/* Neon Glow */
--gradient-neon: linear-gradient(90deg, #00F5FF 0%, #9D4EDD 50%, #FF2D92 100%);

/* Glass Overlay */
--gradient-glass: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
```

---

## Typography

### Primary Typeface: **Monument Extended**
*For headlines, hero text, and bold statements*

- Weight: Ultrabold (900)
- Style: All-caps for impact
- Letter-spacing: -0.02em (tight)
- Use: H1, H2, Hero titles, Feature headlines

### Secondary Typeface: **Inter**
*For body copy, UI elements, and readability*

- Weights: Regular (400), Medium (500), Semibold (600)
- Style: Normal case
- Letter-spacing: -0.01em
- Line-height: 1.6
- Use: Body text, navigation, buttons, captions

### Editorial Typeface: **Playfair Display**
*For editorial moments, pull quotes, and luxury touches*

- Weight: Regular (400), Bold (700)
- Style: Italic for quotes
- Use: Article pull quotes, magazine-style features, bylines

### Type Scale

```
Hero:        72px / 80px line-height  (Monument Extended)
H1:          56px / 64px line-height  (Monument Extended)
H2:          40px / 48px line-height  (Monument Extended)
H3:          28px / 36px line-height  (Inter Semibold)
H4:          20px / 28px line-height  (Inter Semibold)
Body Large:  18px / 28px line-height  (Inter Regular)
Body:        16px / 26px line-height  (Inter Regular)
Caption:     14px / 20px line-height  (Inter Medium)
Overline:    12px / 16px line-height  (Inter Semibold, uppercase, tracked)
```

---

## Logo Concepts

### Concept 1: **The Helix Mark**

A stylized double helix abstracted into a geometric "B" letterform:
- Two intertwining strands form the curves of a bold "B"
- Strands rendered with neon gradient (Cyan → Violet → Pink)
- Minimal, scalable, works at favicon size
- Paired with "BREEDERS" wordmark in Monument Extended

### Concept 2: **The Gene Code**

Typography-focused identity using custom letterforms:
- "BREEDERS" in Monument Extended, but with the two "E"s replaced by stylized DNA base pair symbols (≡)
- Creates: "BR≡≡DERS"
- Below: "GENETICS CLUB" in tracked Inter Semibold
- Monochrome version uses white; accent version uses neon gradient

### Concept 3: **The Club Seal** (Editorial Style)

Circular emblem inspired by heritage club crests, modernized:
- Outer ring: "BREEDERS GENETICS CLUB • EST. 2026"
- Inner: Abstract chromosome/helix icon
- Glassmorphic treatment with subtle inner glow
- Works for watermarks, stamps, membership badges

### Logo Clear Space
- Minimum clear space: Height of the "B" on all sides
- Minimum size: 32px height for digital, 12mm for print

### Logo Don'ts
- Never stretch or distort
- Never use on busy backgrounds without contrast overlay
- Never use outline-only version below 48px
- Never rotate the helix mark

---

## Glassmorphism System

### Card Styles

```css
/* Standard Glass Card */
.glass-card {
  background: rgba(20, 20, 24, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Elevated Glass */
.glass-elevated {
  background: rgba(30, 30, 36, 0.8);
  backdrop-filter: blur(32px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

/* Neon Glow Accent */
.glass-neon {
  background: rgba(0, 245, 255, 0.05);
  border: 1px solid rgba(0, 245, 255, 0.3);
  box-shadow: 
    0 0 20px rgba(0, 245, 255, 0.15),
    inset 0 0 20px rgba(0, 245, 255, 0.05);
}
```

---

## Iconography

### Style
- Line icons, 1.5px stroke weight
- Rounded caps and joins
- 24x24px base grid
- Neon accent colors for interactive states

### Core Icon Set
- DNA Helix (brand motif)
- Microscope
- Petri dish
- Chromosome
- Lab flask
- Gene sequence bars
- Cell division
- Play/Media controls (for content)
- Bookmark/Save
- Share/Export

---

## Motion Principles

### Timing
- Default easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease)
- Entrance: 300-400ms
- Exit: 200-250ms
- Micro-interactions: 150-200ms

### Signature Animations
1. **Helix Reveal**: Elements spiral in along a helix path
2. **Neon Pulse**: Subtle glow pulse on hover (opacity 0.6 → 1.0)
3. **Glass Morph**: Cards fade in with blur transitioning from 0 → 24px
4. **Sequence Cascade**: Staggered reveal mimicking DNA base pair sequencing

---

## Photography & Media Style

### Imagery
- High-contrast, cinematic lighting
- Macro shots of lab equipment, cells, DNA visualizations
- Duotone overlays using brand neons
- Editorial fashion-meets-science aesthetic
- No generic stock photos — curated or generated only

### Video
- Slow-motion microscopy
- Abstract particle/helix animations
- 4K minimum, 24fps for cinematic feel
- Sound design: ambient, electronic, scientific

---

## Voice & Tone

- **Bold**: We don't whisper. We declare.
- **Intelligent**: We respect our audience's curiosity.
- **Provocative**: We challenge conventions.
- **Exclusive**: Members-only energy.
- **Editorial**: We're publishing, not just posting.

---

## Application Examples

1. **Magazine Covers**: Full-bleed imagery, Monument Extended headlines, glass overlays
2. **Social Cards**: Dark mode, neon accents, minimal text
3. **Membership Cards**: Glassmorphic, holographic effects, embossed logo
4. **Event Posters**: Editorial grid layouts, dramatic typography
5. **Merch**: Minimal logo placements, premium materials

---

*Identity System v1.0 — Wanda Design Agent — February 2026*
