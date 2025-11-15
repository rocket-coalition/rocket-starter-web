---
title: "Color Systems"
description: "A reusable playground for experimenting with Rocket UI palettes."
summary: "Color showcase bundle that demonstrates how theming tokens roll up into UI states."
draft: false
weight: 10
aliases:
  - "/showcase/colors/"
layoutVariant: "single"
---

## Mission

This bundle acts as the canonical source for Rocket color experiments. Instead of scattering swatches inside layouts, treat this page as the single reference for palette tokens, ramp previews, and related build notes. Because it is a leaf bundle, any assets (like `palette.svg`) that we colocate here travel with the page and can be addressed via `.Resources`.

## Palette Notes

- **Primary ramp**: tuned for OKLCH-driven theming variables.
- **Accent ramp**: keeps text contrast at AA+ even when density is `compact`.
- **Surface pairings**: designed for cards, panels, and marketing sections.

Use this page to validate palette updates before shipping them across the site.

## Token Atlas

Rocket UI expresses every color through tokens so designers can modify a handful of LCH inputs and watch the entire palette regenerate. Use this section as the canonical reference for what each token represents and how it should be applied.

### Brand Inputs (LCH seeds)

| Token | Value | Notes |
| --- | --- | --- |
| `--L-primary` | `0.68` | Higher values lighten the entire primary ramp. |
| `--C-primary` | `0.17` | Controls saturation. Keep ≤ 0.22 for accessibility. |
| `--H-primary` | `250deg` | Hue rotation (240deg ≈ cobalt, 300deg ≈ magenta). |
| `--L-secondary` | `0.68` | Secondary hue shares the same brightness by default. |
| `--C-secondary` | `0.19` | Slightly stronger chroma for supporting accents. |
| `--H-secondary` | `300deg` | Default magenta/purple accent. |

Updating the values above inside `input.css` (or via a site-specific data file later) automatically regenerates the ramps below thanks to the formulas defined in `rocket-ui.css`.

### Primary Ramp

<div class="token-grid">
  <div class="token-swatch" style="--swatch-color: var(--primary-50);">
    <p class="token-swatch__label">primary-50</p>
    <p class="token-swatch__value">var(--primary-50)</p>
    <div class="token-swatch__meta">
      <p>Formula: L + 0.30 · C × 0.50</p>
      <p>Use for barely-there backgrounds and cards.</p>
    </div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--primary-100);">
    <p class="token-swatch__label">primary-100</p>
    <p class="token-swatch__value">var(--primary-100)</p>
    <div class="token-swatch__meta">
      <p>Formula: L + 0.25 · C × 0.60</p>
      <p>Use for tinted panels and hover states.</p>
    </div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--primary-200);">
    <p class="token-swatch__label">primary-200</p>
    <p class="token-swatch__value">var(--primary-200)</p>
    <div class="token-swatch__meta">
      <p>Formula: L + 0.18 · C × 0.80</p>
      <p>Supports badges, quiet dividers, and outlines.</p>
    </div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--primary-300);">
    <p class="token-swatch__label">primary-300</p>
    <p class="token-swatch__value">var(--primary-300)</p>
    <div class="token-swatch__meta">
      <p>Formula: L + 0.10 · C × 0.90</p>
      <p>Use for secondary buttons or link hover states.</p>
    </div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--primary-400);">
    <p class="token-swatch__label">primary-400</p>
    <p class="token-swatch__value">var(--primary-400)</p>
    <div class="token-swatch__meta">
      <p>Formula: L + 0.05 · C</p>
      <p>Approaches the base color for icon fills.</p>
    </div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--primary-500); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">primary-500</p>
    <p class="token-swatch__value">var(--primary-500)</p>
    <div class="token-swatch__meta">
      <p>Formula: L · C · H (base inputs)</p>
      <p>Primary call-to-action, highlights, data viz baseline.</p>
    </div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--primary-600); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">primary-600</p>
    <p class="token-swatch__value">var(--primary-600)</p>
    <div class="token-swatch__meta">
      <p>Formula: L − 0.06</p>
      <p>Hover states and deep accents.</p>
    </div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--primary-700); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">primary-700</p>
    <p class="token-swatch__value">var(--primary-700)</p>
    <div class="token-swatch__meta">
      <p>Formula: L − 0.12 · C × 0.95</p>
      <p>Use for pressed states and high-contrast text.</p>
    </div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--primary-800); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">primary-800</p>
    <p class="token-swatch__value">var(--primary-800)</p>
    <div class="token-swatch__meta">
      <p>Formula: L − 0.18 · C × 0.90</p>
      <p>Accessible text on the lighter primary tones.</p>
    </div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--primary-900); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">primary-900</p>
    <p class="token-swatch__value">var(--primary-900)</p>
    <div class="token-swatch__meta">
      <p>Formula: L − 0.24 · C × 0.85</p>
      <p>Deep backgrounds, focus outlines, and overlays.</p>
    </div>
  </div>
</div>

### Secondary Ramp

<div class="token-grid">
  <div class="token-swatch" style="--swatch-color: var(--secondary-50);">
    <p class="token-swatch__label">secondary-50</p>
    <p class="token-swatch__value">var(--secondary-50)</p>
    <div class="token-swatch__meta">L + 0.30 · C × 0.50 — tertiary backgrounds.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--secondary-100);">
    <p class="token-swatch__label">secondary-100</p>
    <p class="token-swatch__value">var(--secondary-100)</p>
    <div class="token-swatch__meta">L + 0.25 · C × 0.60 — accent dividers.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--secondary-200);">
    <p class="token-swatch__label">secondary-200</p>
    <p class="token-swatch__value">var(--secondary-200)</p>
    <div class="token-swatch__meta">L + 0.18 · C × 0.80 — badge fills.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--secondary-300);">
    <p class="token-swatch__label">secondary-300</p>
    <p class="token-swatch__value">var(--secondary-300)</p>
    <div class="token-swatch__meta">L + 0.10 · C × 0.90 — supporting CTA hover.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--secondary-400);">
    <p class="token-swatch__label">secondary-400</p>
    <p class="token-swatch__value">var(--secondary-400)</p>
    <div class="token-swatch__meta">L + 0.05 · C — brand gradients.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--secondary-500); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">secondary-500</p>
    <p class="token-swatch__value">var(--secondary-500)</p>
    <div class="token-swatch__meta">Base accent tone for links/components.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--secondary-600); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">secondary-600</p>
    <p class="token-swatch__value">var(--secondary-600)</p>
    <div class="token-swatch__meta">L − 0.06 — hover/active states.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--secondary-700); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">secondary-700</p>
    <p class="token-swatch__value">var(--secondary-700)</p>
    <div class="token-swatch__meta">L − 0.12 · C × 0.95 — dark surfaces.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--secondary-800); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">secondary-800</p>
    <p class="token-swatch__value">var(--secondary-800)</p>
    <div class="token-swatch__meta">L − 0.18 · C × 0.90 — text on bright backgrounds.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--secondary-900); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">secondary-900</p>
    <p class="token-swatch__value">var(--secondary-900)</p>
    <div class="token-swatch__meta">L − 0.24 · C × 0.85 — shadowy, luxurious panels.</div>
  </div>
</div>

### Neutral Gray Scale

<div class="token-grid">
  <div class="token-swatch" style="--swatch-color: var(--gray-50);">
    <p class="token-swatch__label">gray-50</p>
    <p class="token-swatch__value">oklch(0.98 0.005 270)</p>
    <div class="token-swatch__meta">Canvas background</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--gray-100);">
    <p class="token-swatch__label">gray-100</p>
    <p class="token-swatch__value">oklch(0.965 0.007 270)</p>
    <div class="token-swatch__meta">Panel base</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--gray-200);">
    <p class="token-swatch__label">gray-200</p>
    <p class="token-swatch__value">oklch(0.92 0.01 270)</p>
    <div class="token-swatch__meta">Card strokes</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--gray-300);">
    <p class="token-swatch__label">gray-300</p>
    <p class="token-swatch__value">oklch(0.87 0.013 270)</p>
    <div class="token-swatch__meta">Borders, muted icons</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--gray-400);">
    <p class="token-swatch__label">gray-400</p>
    <p class="token-swatch__value">oklch(0.72 0.02 270)</p>
    <div class="token-swatch__meta">Subhead text</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--gray-500);">
    <p class="token-swatch__label">gray-500</p>
    <p class="token-swatch__value">oklch(0.62 0.03 270)</p>
    <div class="token-swatch__meta">Body text on tinted backgrounds</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--gray-600); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">gray-600</p>
    <p class="token-swatch__value">oklch(0.52 0.035 270)</p>
    <div class="token-swatch__meta">Neutral buttons</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--gray-700); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">gray-700</p>
    <p class="token-swatch__value">oklch(0.43 0.03 270)</p>
    <div class="token-swatch__meta">On-dark text</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--gray-800); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">gray-800</p>
    <p class="token-swatch__value">oklch(0.34 0.025 270)</p>
    <div class="token-swatch__meta">App chrome / nav</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--gray-900); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">gray-900</p>
    <p class="token-swatch__value">oklch(0.25 0.02 270)</p>
    <div class="token-swatch__meta">Backdrop, overlays</div>
  </div>
</div>

### Status Signals

<div class="token-grid">
  <div class="token-swatch" style="--swatch-color: var(--success-500); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">success-500</p>
    <p class="token-swatch__value">oklch(0.75 0.16 150deg)</p>
    <div class="token-swatch__meta">Positive confirmations, success alerts.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--warning-500);">
    <p class="token-swatch__label">warning-500</p>
    <p class="token-swatch__value">oklch(0.82 0.17 85deg)</p>
    <div class="token-swatch__meta">Caution banners, pending states.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--error-500); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">error-500</p>
    <p class="token-swatch__value">oklch(0.64 0.21 25deg)</p>
    <div class="token-swatch__meta">Destructive actions, blocking alerts.</div>
  </div>
  <div class="token-swatch" style="--swatch-color: var(--info-500); --swatch-ink: var(--color-white);">
    <p class="token-swatch__label">info-500</p>
    <p class="token-swatch__value">Alias → var(--primary-500)</p>
    <div class="token-swatch__meta">Informational banners; inherits future primary shifts automatically.</div>
  </div>
</div>

All swatches pull directly from CSS variables, so you can rely on this page to verify how color changes cascade throughout Rocket UI without digging into compiled CSS.
