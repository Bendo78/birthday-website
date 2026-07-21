# Plan: Romantic Birthday Website

## Context
Build a single-page, vertically scrolling birthday website for a romantic partner. The page flows through 5 thematically distinct sections. The user specified a blush pink + warm off-white aesthetic with serif headings and clean sans-serif body text. The "warm" stance from the theme tool (Aesop/Le Labo sensibility) aligns perfectly with the brief.

---

## Aesthetic Decisions

**Stance:** Warm — cream/blush ground, tactile paper textures via CSS, generous whitespace, restrained motion.

**Fonts (Google Fonts):**
- Headings: **Playfair Display** (Didone-adjacent — high contrast, romantic, editorial)
- Body: **Lato** (clean, neutral, pairs well without competing)
- Letter section: **Dancing Script** (handwritten look for the love letter)

**Tokens (blush pink / warm off-white palette):**
- `--background`: `#fdf6f0` (warm off-white)
- `--foreground`: `#3d2b2b` (deep warm brown)
- `--card`: `#fff8f5` (softer off-white for card surfaces)
- `--primary`: `#c97b84` (dusty rose / muted blush pink)
- `--primary-foreground`: `#fff8f5`
- `--secondary`: `#f2e4e1` (pale blush)
- `--muted`: `#e8d8d4`
- `--muted-foreground`: `#9e7575`
- `--accent`: `#d4a0a0` (deeper rose accent)
- `--border`: `rgba(180, 130, 130, 0.2)`
- `--radius`: `1rem`

---

## Files to Modify

### `src/styles/fonts.css`
Import from Google Fonts:
- Playfair Display (400, 400i, 600, 700)
- Lato (300, 400, 700)
- Dancing Script (400, 600, 700)

### `src/styles/theme.css`
Update `:root` token values as listed above. Preserve `.dark` block and `@theme inline` mapping intact — only change `:root` values.

### `src/app/App.tsx`
Single component with 5 sections:

---

## Section Breakdown

### 1. Hero — Full-Screen
- Full viewport height (`min-h-screen`)
- Radial gradient background: warm off-white center bleeding into blush pink edges
- Floating petal / particle decorations via CSS pseudo-elements or absolute positioned divs with low opacity
- Centered vertically and horizontally
- `<h1>` in Playfair Display: "Happy Birthday to My Love"
- Subtext in Lato italic: "Today the whole world celebrates you."
- Pill-shaped button: "Open Your Gift" — blush pink bg, white text, hover scales slightly, smooth transition
- Scroll-down chevron at bottom

### 2. Our Story — Vertical Timeline
- Section heading "Our Story" in Playfair Display
- Centered vertical line (1px, blush border-color)
- 5 alternating entries: left side has image placeholder (Unsplash romantic/couple photos), right side has date + short paragraph — alternates on each item
- Image containers: rounded-2xl, soft drop-shadow, warm bg color while loading
- Text nodes: date in small-caps Lato muted-foreground, paragraph in Lato body
- Timeline dots: small circle on center line, filled with primary color

### 3. Beautiful Memories — Masonry Gallery
- Section heading "Beautiful Memories"
- CSS column masonry (`columns-2 md:columns-3`) with 6 image cards
- Cards: rounded-2xl, shadow-md, overflow-hidden
- Each card has a small Unsplash photo (romantic/flowers/nature) with slightly different aspect ratios to create organic stagger
- Subtle hover: lift (translateY -4px) + slightly stronger shadow

### 4. Love Notes — Polaroid Grid
- Section heading "Love Notes"
- 3-column grid (collapses to 1 on mobile)
- Each polaroid card: white card bg, thick bottom border padding (like actual polaroid border), soft shadow
- Inside each: square image area (Unsplash), heart icon (Lucide `Heart`, filled pink) positioned top-right corner
- Below image: short handwritten-style note text in Dancing Script
- Subtle rotation: each card gets a tiny random CSS rotate (-2deg to +2deg) via inline style for organic feel

### 5. Love Letter — Physical Letter
- Warm beige/parchment background (`#f5ead8`) differentiating it from page bg
- Letter "paper" card: max-w-2xl centered, padding generous, subtle paper texture via box-shadow inset + border
- Top decoration: wax seal SVG / heart ornament
- Letter content in Dancing Script at 1.1-1.2rem, warm dark brown color
- Paragraph content: romantic birthday letter (3 short paragraphs)
- Signature: "Nassim" in larger Dancing Script with a decorative underline
- Horizontal rule separator (thin blush line)
- CTA button below the card: "Click for Birthday Magic" — larger pill button, primary color, with a sparkle icon (Lucide `Sparkles`), hover state with gentle pulse animation

---

## Unsplash Image Plan
Use `https://images.unsplash.com/photo-{id}?w={w}&h={h}&fit=crop&auto=format`

- Timeline (5 images): romantic/couple/flowers themed IDs
- Gallery (6 images): varied romantic/nature/flowers IDs with different heights
- Polaroids (3 images): intimate/warm themed IDs

---

## Responsive Behavior
- Timeline: on mobile, all entries stack single-column (no alternating)
- Gallery: `columns-1 sm:columns-2 md:columns-3`
- Polaroids: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`
- Hero text: scale down on mobile (`text-4xl md:text-7xl`)

---

## Verification
After implementation, run the dev server and visually confirm:
1. Hero section fills viewport with gradient background and pill button visible
2. Timeline entries alternate left/right on desktop, stack on mobile
3. Masonry gallery shows 6 cards at varied heights with hover lift
4. Polaroid grid shows 3 cards with subtle rotation and heart icons
5. Love letter section has parchment feel, Dancing Script text, signed "Nassim", and visible CTA button
