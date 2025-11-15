---
title: "Color Theory in Rocket"
description: "How Rocket UI translates perceptual color rules into theming primitives."
summary: "Explains the architectural decisions behind the primary/secondary ramps."
draft: false
weight: 20
layoutVariant: "single"
---
{{< columns profile="four-column" >}}
Here is the enriched content, expanded by over 200% with a focus on adding more structural depth, detailed examples, and a wider variety of markdown formatting to test edge cases.

-----

# 🚀 Rocket UI: A Perceptual First Design System

This document outlines the core color philosophy and token architecture of the Rocket UI design system. It is a living testbed for our markdown rendering pipeline.

## Principles

Rocket UI doesn't treat colors as arbitrary, device-dependent hex codes. Every single palette decision starts from **perceptual goals**—equal contrast steps, predictable saturation decay, and accessible defaults. This is a fundamental shift from traditional sRGB-based systems (like `rgb()`, `hsl()`, or hex) which are not perceptually uniform. *For example, in HSL, `hsl(240, 50%, 50%)` (a blue) and `hsl(60, 50%, 50%)` (a yellow) have the same "lightness" value but vastly different perceived brightness.*

By anchoring *everything* in **OKLCH**, we move the conversation from "what hex code is this?" to "how bright and intense should this feel?" We can finally speak in terms of:

1.  **L**ightness (0-1)
2.  **C**hroma (0-0.4)
3.  **H**ue (0-360deg)

...the same way lighting designers, painters, or human-computer interaction specialists do. This provides a robust, predictable, and theme-able foundation.

### The Rocket UI Core Tenets

  * **1. Perceptual by Default:** Our foundation in OKLCH ensures that `Lightness: 60%` feels like 60% light, regardless of hue. This predictability is our system's superpower.
  * **2. Generative, Not Static:** We don't define 50 static color swatches. We define **3 inputs** (`L`, `C`, `H`) and *generate* the entire theme. A new brand identity is minutes away, not weeks.
  * **3. Abstracted for Maintainability:** Developers should never, ever have to reference a raw value like `var(--blue-500)`. By using semantic tokens (`var(--action-primary)`), we can refactor the entire design system's "paint" layer without breaking a single component.
  * **4. Accessible from the Atom:** Accessibility isn't a "check" we run at the end. Our "intentional deltas" (see below) build WCAG-compliant contrast steps directly into the generative ramps, ensuring states like `hover` and `focus` are *always* compliant.

### What This Solves

This approach directly targets the most common failures of traditional design systems:

  * **The "Muddy Dark Mode" Problem:** Solved by `Chroma Damping`. Dark themes no longer look like oversaturated, muddy messes.
  * **The "Inconsistent Hover" Problem:** Solved by `Contrast Cadence`. All interactive elements feel like they respond with the same *perceptual* degree of change.
  * **The "Painful Re-branding" Problem:** Solved by our generative, H-based theme engine. Re-branding is no longer a find-and-replace nightmare; it's a configuration update.
  * **The "Is this `gray-700` or `gray-800`?" Problem:** Solved by semantic tokens. A developer just needs to ask "is this text?" (`--fg-default`) or "is this a border?" (`--border-subtle`).

-----

## The Generative Engine: Intentional Deltas

To achieve this, we don't just *use* OKLCH; we build generative rules *on top* of it. These are our "intentional deltas" that guarantee a stable and consistent user experience. This engine is the real "secret sauce" of Rocket UI.

#### 1\. Contrast Cadence

Each step in the generative color ramp (e.g., `primary-400` vs. `primary-500`) shifts lightness (`L`) by a consistent, mathematical delta of `~0.06`. This ensures that component states (like `hover`, `active`, `focus`) always feel like a consistent "step" away, whether it's a light theme button or a dark theme one.

  * **Problem (Old Way):** `button:hover { opacity: 0.8; }`. This is a *terrible* anti-pattern. An 80% opacity black button looks fine, but an 80% opacity yellow button might become invisible.
  * **Solution (Rocket UI):** `var(--action-primary-hover)` is algorithmically mapped to `var(--primary-600)`, which is guaranteed to be `L - 0.06` from its base. It is *perceptually* consistent, every time.

#### 2\. Chroma Damping

As colors get darker (Lightness `L` decreases), our system programmatically reduces the Chroma (`C`) value. This is critical for protecting contrast ratios in low-light contexts and avoiding the "muddy" or overly-vibrant dark shades common in HSL-based themes. Darker colors become *deeper*, not just *more colorful*.

  * **Problem (Old Way):** A dark theme with `blue-900` and `red-900` buttons looks like a "fruit loops" interface, with overly saturated, distracting "clown colors."
  * **Solution (Rocket UI):** As `L` approaches 0, `C` is also reduced (e.g., `calc(var(--C-primary) * 0.8)`). This drains the color of its intensity, making dark backgrounds feel *rich* and *deep*, not like a child's toy.

#### 3\. Hue Drift & Neutrality Lock

Our neutral ramps (grays) must be perfectly neutral. They are locked to a hue angle of `270°` (a slightly cool, "paper" blue) and **do not drift**. This is a common, frustrating bug in other systems where darkening a gray can cause it to shift towards purple or green. Our primaries *only* shift when explicitly re-tuned by a theme.

#### 4\. Gamut Guardrails (P3 \> sRGB)

OKLCH can create colors *outside* the sRGB gamut (what most screens can display). Our system clamps colors to the P3 gamut by default, with graceful degradation to sRGB.

> **Note:** We design in the vibrant P3 gamut first, letting the browser gracefully compress to sRGB. This provides a richer, more "luminous" experience for users with modern displays (like MacBooks or high-end phones) without penalizing users on standard monitors.

-----

## The Three-Layer Token Architecture

This systematic, primitive-first approach would be useless if it were hard to use. The second layer of Rocket UI is its **semantic token anatomy**. This three-layer abstraction is the key to our maintainability.

### Layer 1: Primitives (The "Paint")

These are the raw materials. They are *only* LCH values and have no semantic meaning. They are the "paint" in our "paint cans." Most designers and developers will never touch these.

```css
/* Primitives: The Raw LCH Inputs */
:root {
  /* --- Primary Brand --- */
  --L-primary: 0.68;
  --C-primary: 0.17;
  --H-primary: 250deg; /* Rocket Purple */
  
  /* --- Neutrals --- */
  --H-neutral: 270deg;
  --C-neutral-low: 0.01;
  --C-neutral-med: 0.02;

  /* ...then the generative engine creates... */
  --primary-50: oklch(clamp(0, calc(var(--L-primary) + 0.30), 1) ... );
  --primary-100: oklch(...);
  /* ...all the way to --primary-900 */
  --gray-50: oklch(0.98 var(--C-neutral-low) var(--H-neutral));
  --gray-100: oklch(...);
  /* ...all the way to --gray-900 */
}
```

### Layer 2: Semantics (The "Intent")

This is the most important layer. It builds the **bridge** between the "Paint" (`--primary-500`) and the "Product" (`.btn`). Semantic tokens describe *purpose*, not color. This is the "Applied Anatomy" of the system.

Each major UI surface, border, or text element references an *intent-based* semantic token, which in turn maps back to our generative ramps.

#### Token Mapping Table

| Semantic Token | Primitive Mapping (Light) | Primitive Mapping (Dark) | Purpose & Role |
| :--- | :--- | :--- | :--- |
| `--surface` | `var(--gray-50)` | `var(--gray-900)` | The main page background. Calm, paper-like. |
| `--layout-bg` | `var(--color-white)` | `var(--gray-800)` | The background for the main *layout frame*. |
| `--surface-panel` | `var(--gray-100)` | `var(--gray-700)` | For elevated sidebars, modals, etc. |
| `--action-primary` | `var(--primary-500)` | `var(--primary-500)` | Primary Call-to-Actions (CTAs). |
| `--action-primary-hover`| `var(--primary-600)` | `var(--primary-400)` | Auto-resolves to the correct contrast step. |
| `--fg-default` | `var(--gray-900)` | `var(--gray-100)` | Default foreground text color. |
| `--fg-muted` | `var(--gray-600)` | `var(--gray-400)` | Secondary or disabled text. |
| `--border-subtle` | `var(--gray-200)` | `var(--gray-700)` | Low-contrast dividers and borders. |
| `--on-primary` | `var(--color-white)` | `var(--gray-900)` | Accessible text *on top of* `--action-primary`. |

### Layer 3: Components (The "Product")

This is the final, concrete implementation. Component CSS (whether from DaisyUI or our own) *only* references semantic tokens.

Because semantic tokens are layered on top of the generative ramps, **changing the ramp recalculates every component automatically.** If you change `--H-primary` from `250deg` (blue) to `10deg` (red), your entire UI, including all hover states and focus rings, is instantly re-themed.

#### Example Implementation

```css
/* Component-Level Token Consumption */

/* 1. Button Example */
.btn-primary {
  /* * CORRECT: Use semantic tokens
   */
  background-color: var(--action-primary);
  color: var(--on-primary); /* Text color, also generated */
  transition: background-color 150ms ease-out;
  
  /* * WRONG: Don't use primitives
   * background-color: var(--primary-500); <-- BAD! BREAKS THEMING!
   */
}

.btn-primary:hover {
  background-color: var(--action-primary-hover);
}

/* 2. Card Example */
.card {
  background-color: var(--surface-panel);
  color: var(--fg-default);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}
```

-----

## Visualizing the Cascade

The diagram on the right (represented by this `![alt-text](path/to/image.png)` tag) puts all of this together. It visually traces the complete data flow of the design system's color architecture. We can represent this flow as a textual diagram:

```ascii
 
 [ LAYER 0: USER INPUTS ]
 (e.g. --L-primary: 0.68, --C-primary: 0.17, --H-primary: 250deg)
             |
             v
 [ LAYER 1: GENERATIVE ENGINE ]
 (Applies Intentional Deltas: L-0.06, C-Damping, etc.)
             |
             v
 [ LAYER 2: PRIMITIVE RAMPS ]
 (Creates --primary-50...--primary-900 and --gray-50...--gray-900)
             |
             v
 [ LAYER 3: SEMANTIC TOKENS ]
 (Maps intent to primitives, e.g., --action-primary = var(--primary-500))
             |
             v
 [ LAYER 4: COMPONENT LAYER ]
 (Components consume semantics, e.g., .btn { bg: var(--action-primary) })
 
```

This demonstrates the core "one-to-many" cascade: change *one* LCH input, and *hundreds* of final CSS values are recalculated, all while maintaining perfect perceptual relationships.

-----

## Markdown Test Suite

  * [x] Expand principles
  * [x] Add code blocks (CSS, ASCII)
  * [x) Add a table with headers
  * [x] Use nested lists (1, 2, 3...)
  * [x] Use bulleted lists (\*, -, +)
  * [x] *Test \~\~strikethrough\~\~ and ***bold/italic*** combinations*
  * [x] Add a blockquote
  * [x] Add a task list
  * [x] Reference a [placeholder link](https://www.google.com/search?q=https1.google.com/rocket-ui/docs).
  * [x] Use `####` (H3) and `###` (H2) headings.
  * [x] Use `---` (Horizontal Rules) for separation.
  * [x] Use `inline code`.

{{< /columns >}}
