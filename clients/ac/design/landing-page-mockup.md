# Breeders Genetics Club — Landing Page Mockup

> *Editorial. Immersive. Unapologetically Premium.*

---

## Page Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                         HERO SECTION                            │
│                    (Full viewport height)                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                     EDITORIAL TICKER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                   FEATURED STORY GRID                           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                   "THE SCIENCE" SECTION                         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                   MEMBERSHIP CTA BLOCK                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                   CONTENT CATEGORIES                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    NEWSLETTER SIGNUP                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                         FOOTER                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section Breakdowns

### 1. Navigation Bar

**Layout**: Fixed, glassmorphic, 72px height

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]     Stories  Science  Club  About     [Join] [Sign In] │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- Background: `rgba(10, 10, 15, 0.8)` with `blur(24px)`
- Border-bottom: `1px solid rgba(255,255,255,0.06)`
- Logo: Helix Mark + "BREEDERS" wordmark, Helix Cyan on hover
- Nav links: Inter Medium 14px, Silver → White on hover
- "Join" button: Solid Helix Cyan, dark text, pill-shaped
- "Sign In": Ghost button, white border

**Behavior**:
- Shrinks to 56px on scroll
- Background opacity increases on scroll
- Hamburger menu on mobile (< 768px)

---

### 2. Hero Section

**Layout**: 100vh, centered content, ambient background

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│           ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                        │
│          [AMBIENT DNA HELIX ANIMATION]                         │
│           ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                        │
│                                                                 │
│                     THE GENETICS                                │
│                    REVOLUTION IS                                │
│                     NOT COMING.                                 │
│                                                                 │
│                    ═══ IT'S HERE. ═══                          │
│                                                                 │
│     Stories, science, and culture for the genetically          │
│              curious. Membership opens soon.                    │
│                                                                 │
│               [ GET EARLY ACCESS → ]                           │
│                                                                 │
│                         ↓                                       │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- Background: Void Black with animated particle field (DNA base pairs floating)
- Central 3D helix animation: WebGL, slowly rotating, neon gradient glow
- Headline: Monument Extended Ultrabold, 72px desktop / 40px mobile
- "IT'S HERE" line: Neon gradient text (Cyan → Pink)
- Subhead: Inter Regular 20px, Silver
- CTA: Large pill button, neon cyan with glow effect
- Scroll indicator: Animated chevron with fade pulse

**Animation**:
- Headline words cascade in with stagger (0.1s delay each)
- Helix continuously rotates (60s full rotation)
- Particles drift upward slowly
- Mouse parallax on helix (subtle, 5% range)

---

### 3. Editorial Ticker

**Layout**: Full-width, 48px height, continuous scroll

```
┌─────────────────────────────────────────────────────────────────┐
│ ● CRISPR UPDATE: New FDA approval  ● FEATURE: The ethics of... │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- Background: Carbon with top/bottom 1px borders (rgba white 0.06)
- Text: Inter Medium 14px, tracked, uppercase
- Category labels: Helix Cyan
- Headlines: White
- Dividers: Gene Pink bullets
- Scroll: Continuous marquee, 60px/s, pauses on hover

---

### 4. Featured Story Grid

**Layout**: Asymmetric editorial grid, 3 stories

```
┌─────────────────────────────────────────────────────────────────┐
│  FEATURED                                                       │
├─────────────────────────────┬───────────────────────────────────┤
│                             │                                   │
│                             │    ┌───────────────────────────┐  │
│   ┌─────────────────────┐   │    │   STORY 2 (Glass Card)    │  │
│   │                     │   │    │   Smaller, square ratio   │  │
│   │   HERO STORY        │   │    │   Neon accent border      │  │
│   │   Large 16:9 image  │   │    └───────────────────────────┘  │
│   │   Glassmorphic      │   │                                   │
│   │   overlay with      │   │    ┌───────────────────────────┐  │
│   │   title at bottom   │   │    │   STORY 3 (Glass Card)    │  │
│   │                     │   │    │   Smaller, square ratio   │  │
│   └─────────────────────┘   │    │   Violet accent           │  │
│                             │    └───────────────────────────────┘  │
└─────────────────────────────┴───────────────────────────────────┘
```

**Specifications**:
- Section title: "FEATURED" — Overline style, tracked, Graphite
- Hero story: 60% width, 16:9 ratio, full-bleed image
  - Glass overlay at bottom with headline (Monument Extended 28px)
  - Category tag: Pill with neon background
  - Read time: Inter Caption, Graphite
- Side stories: 40% width, stacked, glassmorphic cards
  - Subtle left border accent (2px, neon color)
  - Thumbnail + text layout
  - Hover: Card lifts (translateY -4px), glow intensifies

**Hover States**:
- Image zoom (scale 1.05)
- Glass overlay opacity increases
- Title shifts from Silver to White
- Neon glow pulse on border

---

### 5. "The Science" Section

**Layout**: Split screen, text left / visual right

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   THE SCIENCE                        ┌─────────────────────┐   │
│   ═══════════                        │                     │   │
│                                      │   [Interactive      │   │
│   We decode the research.            │    DNA Strand       │   │
│   We translate the papers.           │    Visualization]   │   │
│   We make genetics accessible.       │                     │   │
│                                      │   Hover to explore  │   │
│   ● Peer-reviewed insights           │   gene markers      │   │
│   ● Expert contributors              │                     │   │
│   ● No jargon, just clarity          └─────────────────────┘   │
│                                                                 │
│            [ EXPLORE RESEARCH → ]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- Background: Subtle radial gradient (Carbon center → Void edges)
- Left column (50%):
  - Section title: Monument Extended 40px
  - Underline: Neon gradient, 4px, animated width
  - Body text: Inter Regular 18px, Silver
  - Bullet points: Helix Cyan bullets, white text
  - CTA: Ghost button with arrow icon
- Right column (50%):
  - Interactive WebGL/SVG DNA visualization
  - Hoverable segments that highlight and show tooltips
  - Slow idle animation (gentle wave motion)

---

### 6. Membership CTA Block

**Layout**: Full-width, high-impact visual

```
┌─────────────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░                                                        ░░░░│
│░░░░            JOIN THE CLUB                               ░░░░│
│░░░░            ═════════════                               ░░░░│
│░░░░                                                        ░░░░│
│░░░░    Exclusive access. Premium content.                  ░░░░│
│░░░░    The future of genetics, curated for you.            ░░░░│
│░░░░                                                        ░░░░│
│░░░░    ┌──────────────────────────────────────────────┐    ░░░░│
│░░░░    │           [ BECOME A MEMBER ]                │    ░░░░│
│░░░░    └──────────────────────────────────────────────┘    ░░░░│
│░░░░                                                        ░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- Background: Animated gradient mesh (Void → Carbon → subtle Violet)
- Grain texture overlay (5% opacity)
- Content: Centered, max-width 600px
- Headline: Monument Extended 48px, White
- Subhead: Inter Regular 20px, Silver
- CTA: Extra-large button (56px height), full neon gradient
  - Animated gradient shift on hover
  - Glow shadow: `0 0 40px rgba(0, 245, 255, 0.4)`
- Optional: Floating glassmorphic "membership card" preview in corner

---

### 7. Content Categories

**Layout**: Horizontal scroll carousel (desktop), vertical stack (mobile)

```
┌─────────────────────────────────────────────────────────────────┐
│  EXPLORE                                                        │
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────  │
│  │ CRISPR  │  │ ETHICS  │  │ BIOTECH │  │ CULTURE │  │ HEALTH   │
│  │         │  │         │  │         │  │         │  │         │
│  │  [icon] │  │  [icon] │  │  [icon] │  │  [icon] │  │  [icon]  │
│  │         │  │         │  │         │  │         │  │         │
│  │ 24      │  │ 18      │  │ 31      │  │ 12      │  │ 27      │
│  │ stories │  │ stories │  │ stories │  │ stories │  │ stories │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └────────  │
│                                                       → scroll  │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- Section title: "EXPLORE" — Overline style
- Cards: Glassmorphic, 200x240px
- Each card:
  - Category name: Monument Extended 16px
  - Icon: Line icon, 48px, neon accent color (unique per category)
  - Story count: Inter Caption
  - Hover: Scale 1.02, border glow in category color
- Scroll: CSS snap-x, visible scrollbar styled with neon accent
- Indicators: Dot pagination below (desktop hidden, mobile visible)

---

### 8. Newsletter Signup

**Layout**: Centered, minimal

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                   STAY IN THE SEQUENCE                          │
│                                                                 │
│       Weekly dispatches from the frontier of genetics.          │
│                                                                 │
│     ┌──────────────────────────────────┐  ┌────────────┐       │
│     │  Enter your email                │  │ SUBSCRIBE  │       │
│     └──────────────────────────────────┘  └────────────┘       │
│                                                                 │
│              We respect your privacy. Unsubscribe anytime.      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- Background: Void Black, subtle top border gradient
- Headline: Monument Extended 32px, center-aligned
- Subhead: Inter Regular 16px, Silver
- Input field: Glassmorphic, 56px height, wide
  - Placeholder: Graphite, italicized
  - Focus: Cyan border glow
- Button: Solid Helix Cyan, "SUBSCRIBE"
- Legal text: Inter Caption 12px, Graphite
- Success state: Input replaced with "✓ You're in. Welcome to the club."

---

### 9. Footer

**Layout**: Multi-column, editorial

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [LOGO]              PAGES          LEGAL          SOCIAL      │
│                                                                 │
│  The Vogue of        Stories        Terms          Twitter     │
│  Genetics.           Science        Privacy        Instagram   │
│                      Membership     Cookies        LinkedIn    │
│  © 2026 Breeders     About                         YouTube     │
│  Genetics Club       Contact                                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Built with curiosity. Powered by science.                     │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications**:
- Background: Carbon
- Top section: 4-column grid
  - Logo column: Logo + tagline + copyright
  - Link columns: Inter Regular 14px, Silver → White hover
  - Column headers: Inter Semibold 12px, tracked, Graphite
- Social icons: 24px, Silver → Neon accent on hover
- Bottom bar: Separated by 1px border, tagline centered
- Easter egg: Helix DNA animation plays on logo hover

---

## Responsive Breakpoints

| Breakpoint | Width | Key Adjustments |
|------------|-------|-----------------|
| Desktop XL | 1440px+ | Full grid, max-width containers |
| Desktop | 1024-1439px | Standard grid, scaled typography |
| Tablet | 768-1023px | 2-column grids, stacked sections |
| Mobile | < 768px | Single column, hamburger nav, vertical scroll |

---

## Interactions Summary

| Element | Trigger | Animation |
|---------|---------|-----------|
| Nav links | Hover | Underline slides in from left |
| Story cards | Hover | Lift + glow + image zoom |
| Buttons | Hover | Gradient shift + glow pulse |
| CTA buttons | Click | Ripple effect (cyan) |
| Sections | Scroll-in | Fade up + blur clear (300ms) |
| Helix | Idle | Continuous rotation |
| DNA viz | Hover | Segment highlights |

---

## Performance Notes

- Lazy load images below the fold
- Preload hero background and fonts
- WebGL animations: fallback to CSS for low-power devices
- Target: < 3s LCP, < 100ms FID
- Serve WebP/AVIF for images

---

*Landing Page Mockup v1.0 — Wanda Design Agent — February 2026*
